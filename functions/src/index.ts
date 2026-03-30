/**
 * Import function triggers from respective submodules:
 * https://firebase.google.com/docs/functions/typescript
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { launch } from "puppeteer";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/**
 * Constructs a URL for the hosting environment
 * @param {string} path - The path to append to the base URL
 * @param {boolean} isEmulator - Whether running in emulator environment
 * @return {string} The complete URL
 */
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
  // Debug logging
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
    // Use Firebase hosting emulator URL (configured port 8088)
    const hostingPort = process.env.FIREBASE_HOSTING_EMULATOR_PORT || "8088";
    const url = `http://localhost:${hostingPort}${path}`;
    logger.info("✅ EMULATOR MODE - Using local URL", {
      url,
      hostingPort,
      path,
      env_hosting_port: process.env.FIREBASE_HOSTING_EMULATOR_PORT,
      structuredData: true,
    });
    return url;
  }

  // Production environment - use the actual hosting URL
  const url = `https://furkantunali.com${path}`;
  logger.info("🚀 PRODUCTION MODE - Using production URL", {
    url,
    path,
    structuredData: true,
  });
  return url;
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

    const browser = await launch({
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

    logger.info("Browser launched", { structuredData: true });

    try {
      const page = await browser.newPage();

      // Enable console logging from the page
      page.on("console", (msg) => {
        logger.info(`PAGE LOG: ${msg.text()}`, { structuredData: true });
      });

      // Enable request/response logging
      page.on("request", (request) => {
        logger.info(`PAGE REQUEST: ${request.method()} ${request.url()}`, {
          structuredData: true,
        });
      });

      page.on("response", (response) => {
        logger.info(`PAGE RESPONSE: ${response.status()} ${response.url()}`, {
          structuredData: true,
        });
      });

      await page.setViewport({
        width: 794,
        height: 1123,
        deviceScaleFactor: 1,
        isMobile: false,
      });

      const isEmulator = isEmulatorEnvironment();
      const url = getUrl("/resume.html", isEmulator);

      logger.info("About to navigate to URL", {
        targetUrl: url,
        path: "/resume.html",
        structuredData: true,
      });

      const navigationResponse = await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Force print media so PDF render matches browser print preview.
      await page.emulateMediaType("print");

      // Wait for web fonts to finish loading to avoid layout shifts in PDF.
      await page.evaluate(async () => {
        await (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
      });

      logger.info("Page navigation completed", {
        finalUrl: page.url(),
        responseStatus: navigationResponse?.status(),
        responseHeaders: navigationResponse?.headers(),
        structuredData: true,
      });

      const buffer = await page.pdf({
        preferCSSPageSize: true,
        printBackground: true,
        // Tuned down from 0.97 after heyData content expansion pushed page 2.
        scale: 0.95,
      });

      logger.info("PDF generated", { structuredData: true });

      response.header("Content-Type", "application/pdf");
      response.header(
        "Content-Disposition",
        'attachment; filename="Furkan_Tunali_Resume.pdf"',
      );

      logger.info("Response headers set", { structuredData: true });

      response.send(buffer);

      logger.info("Response sent", { structuredData: true });
    } catch (error: unknown) {
      logger.error(error, { structuredData: true });
      response.status(500).send(`${error}`);
    }

    logger.info("End downloadAsPDF", { structuredData: true });
    await browser.close();
  },
);
