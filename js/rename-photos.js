// Node.js script to rename all .webp images in assets/images/Photos/ to 1.webp, 2.webp, etc.
const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, '../assets/images/Photos');

fs.readdir(photosDir, (err, files) => {
  if (err) throw err;
  const photoFiles = files.filter(f => f.toLowerCase().endsWith('.webp'));
  photoFiles.forEach((file, idx) => {
    const newName = `${idx + 1}.webp`;
    const oldPath = path.join(photosDir, file);
    const newPath = path.join(photosDir, newName);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${file} -> ${newName}`);
  });
});