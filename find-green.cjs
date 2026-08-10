const sharp = require('sharp');
const path = require('path');

const imagePath = path.resolve('public/assets/Setup.png');

async function findGreenScreen() {
  try {
    const image = sharp(imagePath);
    const { width, height } = await image.metadata();
    
    // Get raw pixel data
    const rawData = await image.raw().toBuffer();
    
    let minX = width, maxX = 0, minY = height, maxY = 0;
    let found = false;

    // Iterate through pixels (3 channels: R, G, B)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const offset = (y * width + x) * 3; // Assuming RGB, sharp raw() without alpha is 3 channels
        const r = rawData[offset];
        const g = rawData[offset + 1];
        const b = rawData[offset + 2];
        
        // Define "pure bright green" (chroma key style)
        // High green, low red, low blue
        if (g > 150 && r < 100 && b < 100) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (found) {
      console.log('Green screen bounds found:');
      console.log(`X: ${minX} to ${maxX} (Width: ${maxX - minX})`);
      console.log(`Y: ${minY} to ${maxY} (Height: ${maxY - minY})`);
      
      const leftPct = (minX / width) * 100;
      const topPct = (minY / height) * 100;
      const widthPct = ((maxX - minX) / width) * 100;
      const heightPct = ((maxY - minY) / height) * 100;

      console.log('\nCSS Percentages:');
      console.log(`top: '${topPct.toFixed(2)}%',`);
      console.log(`left: '${leftPct.toFixed(2)}%',`);
      console.log(`width: '${widthPct.toFixed(2)}%',`);
      console.log(`height: '${heightPct.toFixed(2)}%',`);
    } else {
      console.log('No green screen found.');
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

findGreenScreen();
