/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

import * as functions from "firebase-functions";
import { launch } from "puppeteer";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const downloadAsPDF = functions
  .region("europe-west1")
  .https.onRequest(async (_request, response) => {
    const browser = await launch({ headless: "new" });

    try {
      const page = await browser.newPage();
      await page.goto("https://furkantunali-1043.web.app/resume-doc.html", {
        waitUntil: "networkidle2",
      });

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

      response.header("Content-Type", "application/pdf");
      response.header(
        "Content-Disposition",
        'attachment; filename="Furkan_Tunali_Resume.pdf"'
      );
      response.send(buffer);
    } catch (error: unknown) {
      response.status(500).send(`${error}`);
    }

    await browser.close();
  });
