// const { createCanvas, loadImage, createImageData, Image } = require('canvas')
const jimp = require('jimp');
const imagemin = require ('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const Pixel = require('./pixelUtil');

class ImageUtil {
  _JimpCompress(buff) {
    return new Promise((resolve,reject) => {
      console.log("ImageUtil - [JimpCompress] - START");
      jimp.read(buff)
      .then(image => {
        image.quality(65); // set Image quality
        image.getBufferAsync(jimp.AUTO)
        .then(buffer => {
          resolve(buffer);
        })
        .catch(err => {
          console.log("ImageUtil - [JimpCompress - getBufferAsync] - ERROR", err.message);
          reject(err);
        })
      })
      .catch(err => {
        console.log("ImageUtil - [JimpCompress - read] - ERROR", err.message);
        reject(err);
      })
      console.log("ImageUtil - [JimpCompress] - FINISH");
    })
  }

  compress(buff, min = 0.6, max = 0.8) {
    return new Promise((resolve,reject) => {
      try {
        console.log("ImageUtil - [compress] - START");
        imagemin.buffer(buff, {
          // destination: imageminOut,
          plugins: [
            imageminJpegtran(),
            imageminPngquant({
              quality: [min, max]
            })
          ]
        })
        .then(value => {
          resolve(value);
        })
        .catch(err => {
          console.log("ImageUtil - [compress] - ERROR -",err.message);
          reject(err);
        })
      } catch (e) {
        if (e.exitCode === 99) {
          this._JimpCompress(buff)
          .then(value => {
            resolve(value);
          })
          .catch(err => {
            reject(err);
          })
        } else {
          console.log("ImageUtil - [compress] - ERROR -", e.message);
          reject(e);
        }
      }
      console.log("ImageUtil - [compress] - FINISH");
    })
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
          .then(value => {
            this.compress(value)
            .then(data => {
              file.base64 = Buffer.from(data).toString('base64');
              resolve(file);
            })
            .catch(err => {
              console.log("ImageUtil - [resize - compress] - ERROR -", err.message);
              reject(err);
            })
          })
          .catch(err => {
            console.log("ImageUtil - [resize - getBufferAsync] - ERROR -", err.message);
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

  async createMatrix(PixelBuilder, images) {
    try {
      for(let i in images) {
        images[i].file.base64 = 'data:' + images[i].file.type + ';base64,' + images[i].file.base64;
        PixelBuilder.buildMatrix(images[i], i);
      }
      return Promise.resolve(true);
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
          // Versione che torna la matrice sotto forma di unico array
          // let array = PixelBuilder.matrixToArray();
          let imgs = [];
          for(let i in images) {
            imgs.push(images[i].file.base64);
          }
          console.log("ImageUtil - [createPixels - read] - FINISH",);
          resolve({images:imgs, array: PixelBuilder.matrix});
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
