import * as functions from 'firebase-functions'
import {launch} from 'puppeteer'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const downloadAsPDF = functions.region('europe-west1').https.onRequest(async (request, response) => {

  const browser = await launch({ headless: true })

    try {

      const page = await browser.newPage();
      await page.goto('https://furkantunali-1043.web.app/resume-doc.html', { waitUntil: 'networkidle2' });


      const buffer = await page.pdf({
          format: "A4",
          printBackground: true,
          margin: {
              left: '10px',
              top: '20px',
              right: '10px',
              bottom: '20px'
          }
      })


      response.header('Content-Type', 'application/pdf;charset=utf-8');
      response.header('Content-Disposition', 'attachment; filename=some_file.pdf');
      response.type('application/pdf').send(buffer);

    } catch (e) {
        response.status(500).send(e.toString());
    }

    await browser.close();
});
