const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    if (ext === '.png' && originalSize > 10000) { // Only optimize files > 10KB
      const buffer = await sharp(filePath)
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer();

      fs.writeFileSync(filePath, buffer);
      const newSize = buffer.length;
      const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`✓ ${path.basename(filePath)}: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${saved}% saved)`);
    }
  } catch (err) {
    console.log(`⚠ Skipped ${path.basename(filePath)}: ${err.message}`);
  }
}

async function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await walkDir(filePath);
    } else if (file.endsWith('.png')) {
      await optimizeImage(filePath);
    }
  }
}

console.log('🖼️  Optimizing images...\n');
walkDir(PUBLIC_DIR).then(() => {
  console.log('\n✅ Done!');
});
