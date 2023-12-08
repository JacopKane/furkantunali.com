/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";
import { launch } from "puppeteer";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const downloadAsPDF = functions
  .region("europe-west1")
  .https.onRequest(async (_request, response) => {
    logger.info("Begin downloadAsPDF", { structuredData: true });

    const browser = await launch({ headless: "chrome" });

    logger.info("Browser launched", { structuredData: true });

    try {
      const page = await browser.newPage();
      await page.goto("https://furkantunali-1043.web.app/resume-doc.html", {
        waitUntil: "networkidle2",
      });

      logger.info("Page loaded", { structuredData: true });

      const buffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          left: "10px",
          top: "20px",
          right: "10px",
          bottom: "20px",
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
  });
