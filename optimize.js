const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Define the path to the resume.ejs file
const filePath = path.join(__dirname, './public/ejs/resume.ejs');

// Function to read, optimize, and write the optimized resume
function optimizeResume(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    const $ = cheerio.load(data);

    // Example optimization: Compacting skills into a more compact format
    $('#skills li ul').each(function() {
      const skills = [];
      $(this).find('li').each(function() {
        skills.push($(this).text().trim());
      });

      // Replace the list with a comma-separated paragraph
      $(this).parent().replaceWith(`<p>${skills.join(', ')}</p>`);
    });

    // Perform other semantic optimizations as needed

    // Write the optimized content to a new file
    const optimizedContent = $.html();
    fs.writeFile(filePath.replace('.ejs', '-optimized.ejs'), optimizedContent, 'utf8', err => {
      if (err) {
        console.error('Error writing the optimized file:', err);
        return;
      }
      console.log('Optimized resume has been saved as resume-optimized.ejs.');
    });
  });
}

// Execute the optimization function
optimizeResume(filePath);
