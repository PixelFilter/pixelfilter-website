// Node.js script to rename all .webp images in assets/images/Photos/ to 1.webp, 2.webp, etc.
const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, '../assets/images/Photos');

fs.readdir(photosDir, (err, files) => {
  if (err) throw err;
  // Sort files to avoid overwriting issues (e.g. lexicographically)
  const photoFiles = files.filter(f => f.toLowerCase().endsWith('.webp')).sort();

  // Step 1: Copy files to temp names to avoid collisions
  const tempNames = [];
  photoFiles.forEach((file, idx) => {
    const tempName = `temp__${Date.now()}__${idx + 1}.webp`;
    tempNames.push(tempName);
    const oldPath = path.join(photosDir, file);
    const tempPath = path.join(photosDir, tempName);
    fs.copyFileSync(oldPath, tempPath);
    console.log(`Copied ${file} -> ${tempName}`);
  });

  // Step 2: Delete originals
  photoFiles.forEach((file) => {
    const oldPath = path.join(photosDir, file);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
      console.log(`Deleted original ${file}`);
    }
  });

  // Step 3: Rename temp files to final names
  tempNames.forEach((tempName, idx) => {
    const finalName = `${idx + 1}.webp`;
    const tempPath = path.join(photosDir, tempName);
    const finalPath = path.join(photosDir, finalName);
    if (fs.existsSync(finalPath)) {
      fs.unlinkSync(finalPath);
    }
    fs.renameSync(tempPath, finalPath);
    console.log(`Renamed ${tempName} -> ${finalName}`);
  });
});