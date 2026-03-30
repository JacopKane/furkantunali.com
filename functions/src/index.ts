/**
 * Import function triggers from respective submodules:
 * https://firebase.google.com/docs/functions/typescript
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { launch } from "puppeteer";

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

export const downloadAsPDF = onRequest(
  {
    region: "europe-west1",
    timeoutSeconds: 300,
    memory: "1GiB",
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

      page.on("console", (msg) => {
        logger.info(`PAGE LOG: ${msg.text()}`, { structuredData: true });
      });

      await page.setViewport({
        width: 794,
        height: 1123,
        deviceScaleFactor: 1,
        isMobile: false,
      });

      const isEmulator = isEmulatorEnvironment();
      const url = getUrl("/cv", isEmulator);

      logger.info("About to navigate to URL", {
        targetUrl: url,
        path: "/cv",
        structuredData: true,
      });

      const navigationResponse = await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      await page.emulateMediaType("print");

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
        scale: 0.95,
      });

      logger.info("PDF generated", { structuredData: true });

      response.header("Content-Type", "application/pdf");
      response.header(
        "Content-Disposition",
        'attachment; filename="Furkan_Tunali_CV.pdf"',
      );

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
