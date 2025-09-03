// Node.js script to generate data/photos.json from assets/images/Photos/
const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, '../assets/images/Photos');
const outputFile = path.join(__dirname, '../data/photos.json');

fs.readdir(photosDir, (err, files) => {
  if (err) throw err;
  const photoFiles = files
    .filter(f => f.toLowerCase().endsWith('.webp'))
    .sort((a, b) => {
      // Sort numerically by filename (e.g., 1.webp, 2.webp, ...)
      return parseInt(a) - parseInt(b);
    });
  fs.writeFileSync(outputFile, JSON.stringify(photoFiles, null, 2));
  console.log(`Generated ${outputFile} with ${photoFiles.length} photos.`);
});