/**
 * Import function triggers from respective submodules:
 * https://firebase.google.com/docs/functions/typescript
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { createHash } from "crypto";
import { Browser, launch } from "puppeteer";

function isEmulatorEnvironment() {
  return (
    process.env.FUNCTIONS_EMULATOR === "true" ||
    process.env.FIREBASE_CONFIG?.includes("localhost") ||
    !process.env.GCLOUD_PROJECT ||
    process.env.NODE_ENV === "development" ||
    process.env.FIREBASE_EMULATOR_HUB !== undefined
  );
}

function getUrl(path = "", isEmulator = false) {
  logger.info("Environment detection", {
    FUNCTIONS_EMULATOR: process.env.FUNCTIONS_EMULATOR,
    FIREBASE_CONFIG: process.env.FIREBASE_CONFIG,
    GCLOUD_PROJECT: process.env.GCLOUD_PROJECT,
    NODE_ENV: process.env.NODE_ENV,
    FIREBASE_EMULATOR_HUB: process.env.FIREBASE_EMULATOR_HUB,
    isEmulator: isEmulator,
    structuredData: true,
  });

  if (isEmulator) {
    const hostingPort = process.env.FIREBASE_HOSTING_EMULATOR_PORT || "8088";
    const url = `http://localhost:${hostingPort}${path}`;
    logger.info("EMULATOR MODE - Using local URL", {
      url,
      hostingPort,
      path,
      env_hosting_port: process.env.FIREBASE_HOSTING_EMULATOR_PORT,
      structuredData: true,
    });
    return url;
  }

  const url = `https://furkantunali.com${path}`;
  logger.info("PRODUCTION MODE - Using production URL", {
    url,
    path,
    structuredData: true,
  });
  return url;
}

const PDF_CACHE_TTL_MS = 5 * 60 * 1000;

type PdfCacheEntry = {
  buffer: Buffer;
  etag: string;
  expiresAt: number;
  generatedAt: string;
};

let browserPromise: Promise<Browser> | null = null;
let pdfCache: PdfCacheEntry | null = null;
let pdfRenderPromise: Promise<PdfCacheEntry> | null = null;

function createBrowser() {
  return launch({
    headless: true,
    timeout: 20000,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--window-size=2480,3508",
    ],
  });
}

async function getBrowser() {
  if (!browserPromise) {
    browserPromise = createBrowser();
  }

  try {
    const browser = await browserPromise;
    if (!browser.isConnected()) {
      browserPromise = createBrowser();
      return await browserPromise;
    }

    return browser;
  } catch (error) {
    browserPromise = null;
    throw error;
  }
}

function setPdfResponseHeaders(
  response: { header: (name: string, value: string) => void },
  etag: string,
) {
  response.header("Content-Type", "application/pdf");
  response.header(
    "Content-Disposition",
    'attachment; filename="Furkan_Tunali_CV.pdf"',
  );
  response.header(
    "Cache-Control",
    "public, max-age=300, s-maxage=300, stale-while-revalidate=60",
  );
  response.header("ETag", etag);
}

function getFreshPdfCache() {
  if (!pdfCache) {
    return null;
  }

  if (Date.now() > pdfCache.expiresAt) {
    pdfCache = null;
    return null;
  }

  return pdfCache;
}

function createPdfCacheEntry(buffer: Buffer) {
  return {
    buffer,
    etag: `"${createHash("sha1").update(buffer).digest("hex")}"`,
    expiresAt: Date.now() + PDF_CACHE_TTL_MS,
    generatedAt: new Date().toISOString(),
  };
}

function requestHasMatchingETag(
  request: { headers: Record<string, string | string[] | undefined> },
  etag: string,
) {
  const ifNoneMatch = request.headers["if-none-match"];
  if (!ifNoneMatch) {
    return false;
  }

  if (Array.isArray(ifNoneMatch)) {
    return ifNoneMatch.includes(etag);
  }

  return ifNoneMatch
    .split(",")
    .map((value) => value.trim())
    .includes(etag);
}

async function renderPdf(browser: Browser, url: string) {
  // Use an isolated incognito context so cookies, cache, and any service-worker
  // state from a previous render cannot bleed into this one.
  const context = await browser.createBrowserContext();
  let page = null;

  try {
    page = await context.newPage();

    page.on("console", (msg) => {
      logger.info(`PAGE LOG: ${msg.text()}`, { structuredData: true });
    });

    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 1,
      isMobile: false,
    });

    const navigationResponse = await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    await page.waitForSelector("body", { timeout: 10000 });
    await page.emulateMediaType("print");

    await page.evaluate(async () => {
      await (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
    });

    const qrLoaded = await page.evaluate(async () => {
      const getQrState = (img: HTMLImageElement | null) => {
        return Boolean(
          img &&
            img.complete &&
            typeof img.naturalWidth === "number" &&
            img.naturalWidth > 0,
        );
      };

      const waitForImage = (img: HTMLImageElement) => {
        return new Promise<boolean>((resolve) => {
          let settled = false;
          const finish = (value: boolean) => {
            if (!settled) {
              settled = true;
              resolve(value);
            }
          };

          const timeoutId = window.setTimeout(() => finish(false), 20000);

          const onLoad = () => {
            window.clearTimeout(timeoutId);
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
            finish(getQrState(img));
          };

          const onError = () => {
            window.clearTimeout(timeoutId);
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
            finish(false);
          };

          img.addEventListener("load", onLoad, { once: true });
          img.addEventListener("error", onError, { once: true });

          if (getQrState(img)) {
            onLoad();
          }
        });
      };

      const qrImg = document.getElementById(
        "page-url-qr-image",
      ) as HTMLImageElement | null;

      if (!qrImg) {
        // The QR element is only present on the CV page. If it is missing we
        // are almost certainly on the wrong page (e.g. the catch-all index.html
        // was served instead of cv.html). Fail hard so no bad PDF is cached.
        return false;
      }

      if (getQrState(qrImg)) {
        return true;
      }

      const currentSrc = qrImg.src;
      if (currentSrc) {
        const cacheBypassedSrc = `${currentSrc}${
          currentSrc.includes("?") ? "&" : "?"
        }pdfts=${Date.now()}`;
        qrImg.src = cacheBypassedSrc;
      }

      const loaded = await waitForImage(qrImg);
      return loaded && getQrState(qrImg);
    });

    if (!qrLoaded) {
      throw new Error(
        "QR image did not load successfully; refusing to render stale PDF",
      );
    }

    // Sanity-check: ensure we are still on the CV page and did not land on the
    // index or any other fallback page due to a routing/redirect issue.
    const finalUrl = page.url();
    if (!finalUrl.includes("/cv")) {
      throw new Error(
        `Navigation ended on wrong page; expected /cv but got: ${finalUrl}`,
      );
    }

    logger.info("Page navigation completed", {
      finalUrl: page.url(),
      responseStatus: navigationResponse?.status(),
      responseHeaders: navigationResponse?.headers(),
      structuredData: true,
    });

    const buffer = await page.pdf({
      preferCSSPageSize: true,
      printBackground: true,
      scale: 0.95,
    });

    logger.info("PDF generated", { structuredData: true });

    return createPdfCacheEntry(buffer);
  } finally {
    if (page) {
      await page.close();
    }
    await context.close();
  }
}

export const downloadAsPDF = onRequest(
  {
    region: "europe-west1",
    timeoutSeconds: 300,
    memory: "512MiB",
  },
  async (request, response) => {
    logger.info("Begin downloadAsPDF", {
      requestUrl: request.url,
      requestHeaders: request.headers,
      structuredData: true,
    });

    const forceRefresh =
      request.query.refresh === "1" || request.query.refresh === "true";

    if (!forceRefresh) {
      const cachedEntry = getFreshPdfCache();
      if (cachedEntry) {
        setPdfResponseHeaders(response, cachedEntry.etag);
        response.header("X-PDF-Cache", "hit");
        response.header("X-PDF-Generated-At", cachedEntry.generatedAt);

        if (requestHasMatchingETag(request, cachedEntry.etag)) {
          response.status(304).send();
          return;
        }

        response.send(cachedEntry.buffer);
        return;
      }
    }

    const browser = await getBrowser();
    const isEmulator = isEmulatorEnvironment();
    const url = getUrl("/cv", isEmulator);

    logger.info("About to navigate to URL", {
      targetUrl: url,
      path: "/cv",
      forceRefresh,
      structuredData: true,
    });

    const activeRenderPromise =
      forceRefresh || !pdfRenderPromise
        ? renderPdf(browser, url)
        : pdfRenderPromise;

    if (forceRefresh || !pdfRenderPromise) {
      pdfRenderPromise = activeRenderPromise;
    }

    try {
      const rendered = await activeRenderPromise;
      pdfCache = rendered;

      setPdfResponseHeaders(response, rendered.etag);
      response.header("X-PDF-Cache", forceRefresh ? "refresh" : "miss");
      response.header("X-PDF-Generated-At", rendered.generatedAt);

      if (requestHasMatchingETag(request, rendered.etag)) {
        response.status(304).send();
        return;
      }

      response.send(rendered.buffer);
      logger.info("Response sent", { structuredData: true });
    } catch (error: unknown) {
      logger.error(error, { structuredData: true });
      response.status(500).send(`${error}`);
    } finally {
      if (pdfRenderPromise === activeRenderPromise) {
        pdfRenderPromise = null;
      }
    }

    logger.info("End downloadAsPDF", { structuredData: true });
  },
);
