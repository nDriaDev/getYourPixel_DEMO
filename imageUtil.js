const sharp = require('sharp');

class ImageUtil {
  resize(file, row, col) {
    return new Promise((resolve,reject) => {
      try {
        console.log("ImageUtil - [resize] - START");

        let width = col * 10;
        let height = row * 10;
        let buff = Buffer.from(file.base64, 'base64');
        sharp(buff)
        .resize(width, height,{fit:'contain'})
        .toBuffer((err, data, info) => {
          if(err) {
            console.log("ImageUtil - [resize] - ERROR -", err.message);
            reject(err);
          } else {
            file.base64 = Buffer.from(data).toString('base64');
            resolve(file);
          }
        })

        console.log("ImageUtil - [resize] - FINISH");
      } catch (e) {
        console.log("ImageUtil - [resize] - ERROR -", e.message);
        reject(e);
        console.log("ImageUtil - [reducesize] - FINISH");
      }
    })
  }
}


module.exports = new ImageUtil();
