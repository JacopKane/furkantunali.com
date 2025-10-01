/**
 * Import function triggers from their respective submodules:
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { launch } from "puppeteer";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

/**
 * Constructs a URL for the hosting environment
 * @param {string} path - The path to append to the base URL
 * @return {string} The complete URL
 */
function getUrl(path = "") {
  // Check if we're running in the Firebase emulator
  const isEmulator =
    process.env.FUNCTIONS_EMULATOR === "true" ||
    process.env.FIREBASE_CONFIG?.includes("localhost") ||
    !process.env.GCLOUD_PROJECT;

  if (isEmulator) {
    // Use Firebase hosting emulator URL (configured port 5002)
    const hostingPort = process.env.FIREBASE_HOSTING_EMULATOR_PORT || "5002";
    return `http://localhost:${hostingPort}${path}`;
  }

  // Production environment - use the actual hosting URL
  return `https://furkantunali.com${path}`;
}

export const downloadAsPDF = onRequest(
  {
    region: "europe-west1",
    timeoutSeconds: 300,
    memory: "512MiB",
  },
  async (request, response) => {
    logger.info("Begin downloadAsPDF", { structuredData: true });

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
      await page.setViewport({
        width: 2480,
        height: 3508,
        deviceScaleFactor: 0.2,
        isMobile: false,
      });

      const url = getUrl("/resume-doc.html");

      await page.goto(url, {
        waitUntil: "networkidle2",
      });

      logger.info("Page loaded", { structuredData: true });

      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
      );

      const buffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          left: "0",
          top: "0",
          right: "0",
          bottom: "0",
        },
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
