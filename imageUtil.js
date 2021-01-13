// const { createCanvas, loadImage, createImageData, Image } = require('canvas')
const jimp = require('jimp');
const Pixel = require('./pixelUtil');

class ImageUtil {
  cloneObject(obj) {
      let newObj = obj;
      for(let i in obj) {
        if(typeof obj[i] === 'object') {
          newObj[i] = obj[i];
          newObj[i] = this.cloneObject(newObj[i]);
        }
      }
      return newObj;
  }

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
            console.log("ImageUtil - [resize] - ERROR -", err.message);
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

  async cropImage(image,i,j,dim1,dim2) {
    try {
      await image.crop(i,j,dim1,dim2);
      return Promise.resolve(image);
    } catch (e) {
      console.log("ImageUtil - [createPixels - crop] - ERROR -", e.message);
    }
  }

  async createMatrix(PixelBuilder, images) {
    try {
      for(let i in images) {
        let image = await jimp.read(Buffer.from(images[i].file.base64, 'base64'));
        let imageCropped = [];
        let height = images[i].row*10;
        let width = images[i].col*10;
        for(let k=0; k<height; k+=10){
          for(let j=0; j<width; j+=10) {
            let img = this.cloneObject(image); //---> non fa una copia profonda 
            await img.crop(j,k,10,10); //--> per colpa dell'aliasing il crop fallisce dopo la prima iterazione
            let data = await img.getBufferAsync(jimp.AUTO)
            let base64 = 'data:' + images[i].file.type + ';base64,' + Buffer.from(data).toString('base64');
            imageCropped.push(base64);
            PixelBuilder.buildMatrix(imageCropped,images[i].row,images[i].col);
          }
        }
        return Promise.resolve(true);
      }
    } catch (e) {
      console.log("ImageUtil - [createPixels - createMatrix] - ERROR -", e.message);
      return Promise.reject(e);
    }
  }

  createPixels(images) {
    return new Promise((resolve,reject) => {
      try {
        console.log("ImageUtil - [createPixels] - START");
        const PixelBuilder = new Pixel();
        this.createMatrix(PixelBuilder, images)
        .then(value => {
          let result = PixelBuilder.matrixToArray();
          console.log("ImageUtil - [createPixels - read] - FINISH",);
          resolve(result);
        })
        .catch(err => {
          console.log("ImageUtil - [createPixels] - ERROR -", err.message);
          reject(err)
        })
      } catch (e) {
        console.log("ImageUtil - [createPixels - generic] - ERROR -", e.message);
        reject(e);
      }
    })
  }
}


module.exports = new ImageUtil();
