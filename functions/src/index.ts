import * as functions from 'firebase-functions'
import {launch} from 'puppeteer'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.region('europe-west1').https.onRequest(async (request, response) => {

  const browser = await launch({ headless: true })

    try {

      const page = await browser.newPage();
      await page.goto('https://furkantunali.com/resume-doc.html', { waitUntil: 'networkidle2' });


        const buffer = await page.pdf({
          width: 700,
          height: 1200,
            printBackground: true,
            margin: {
                left: '0px',
                top: '0px',
                right: '0px',
                bottom: '0px'
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
