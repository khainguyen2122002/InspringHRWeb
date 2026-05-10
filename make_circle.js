const Jimp = require('jimp');
const path = require('path');

async function makeCircle() {
  try {
    const faviconPath = path.join(process.cwd(), 'public/favicon.png');
    const icoPath = path.join(process.cwd(), 'app/favicon.ico');
    
    const image = await Jimp.read(faviconPath);
    image.circle().write(faviconPath);
    image.circle().write(icoPath);
    console.log('Success: Favicon converted to circle');
  } catch (err) {
    console.error('Error:', err);
  }
}

makeCircle();
