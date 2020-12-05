const split = require('img-split');
const { createCanvas, loadImage } = require('canvas')
const fs = require('fs');

const splitImage = (image,width,height) => {
  var cols = Math.ceil(image.width / width)
  var rows = Math.ceil(image.height / height)
  var images = new Array(cols * rows)
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var canvas = createCanvas(width,height);
      var context = canvas.getContext('2d')
      context.drawImage(image, -x * width, -y * height)

      images[y * cols + x] = canvas.toDataURL();
    }
  }
  return images
}

var getImgSplit = (path) => {
  return new Promise((resolve,reject)=>{
    try {
      loadImage(path).then(img=> {
        var tiles = splitImage(img, 10, 10);
        resolve(tiles);

      })
    } catch (e) {
      console.log(e);
      reject(e)
    }
  })
}

module.exports = getImgSplit;
