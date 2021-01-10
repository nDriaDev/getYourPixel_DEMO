const jimp = require('jimp');

class ImageUtil {
  resize(file, row, col) {
    return new Promise((resolve,reject) => {
      try {
        console.log("ImageUtil - [resize] - START");

        let width = col * 10;
        let height = row * 10;
        let buff = Buffer.from(file.base64, 'base64');
        jimp.read(buff).then(image => {
          image.resize(width,height, jimp.RESIZE_NEAREST_NEIGHBOR);
          image.getBufferAsync(jimp.AUTO)
          .then(data => {
            file.base64 = Buffer.from(data).toString('base64');
            resolve(file);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          })
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
