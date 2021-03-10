// const { createCanvas, loadImage, createImageData, Image } = require('canvas')
const appRoot = require('app-root-path');
const jimp = require('jimp');
const imagemin = require ('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const Pixel = require(appRoot + '/utils/pixelUtil');
const resizeImg = require('resize-image-buffer');
var sizeOf = require('buffer-image-size');
const log = require(appRoot + '/configs/winston').getLogger();

class ImageUtil {
  _JimpCompress(buff) {
    return new Promise((resolve,reject) => {
      log.info("START");
      jimp.read(buff)
      .then(image => {
        image.quality(65); // set Image quality
        image.getBufferAsync(jimp.AUTO)
        .then(buffer => {
          resolve(buffer);
        })
        .catch(err => {
          log.error(err);
          reject(err);
        })
      })
      .catch(err => {
        log.error(err);
        reject(err);
      })
      log.info("FINISH");
    })
  }

  compress(buff, min = 0.6, max = 0.8) {
    return new Promise((resolve,reject) => {
      try {
        log.info("START");
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
          log.error(err);
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
          log.error(e);
          reject(e);
        }
      }
      log.info("FINISH");
    })
  }

  resize(file, row, col) {
    return new Promise((resolve,reject) => {
      try {
        log.info("START");

        let width = (col * 10);
        // width = col === 1 ? (width - 3) : col === 2 ? (width - 2) : width;
        let height = (row * 10);
        // height = row === 1 ? (height - 3) : row === 2 ? (height - 2) : height;
        let buff = Buffer.from(file.base64, 'base64');
        var dimensions = sizeOf(buff)
        if(Math.abs(dimensions.width-width) < 2.1 && Math.abs(dimensions.height - height) < 2.1) {
          this.compress(buff)
          .then(data => {
            file.base64 = Buffer.from(data).toString('base64');
            log.info("FINISH");
            resolve(file);
          })
          .catch(err => {
            log.error(err);
            reject(err);
          })
        } else {
          resizeImg(buff, {
            width: width,
            height: height,
          })
          // jimp.read(buff).then(image => {
            //   image.resize(width,height, jimp.RESIZE_NEAREST_NEIGHBOR);
            //   image.getBufferAsync(jimp.AUTO)
          .then(value => {
            this.compress(value)
            .then(data => {
              file.base64 = Buffer.from(data).toString('base64');
              log.info("FINISH");
              resolve(file);
            })
            .catch(err => {
              log.error(err);
              reject(err);
            })
          })
          .catch(err => {
            log.error(err);
            reject(err);
          })
        }
      } catch (e) {
        log.error(e);
        reject(e);
        log.info("FINISH");
      }
    })
  }

  async createMatrix(PixelBuilder, images, urls) {
    try {
      for(let i in images) {
        images[i].file.base64 = 'data:' + images[i].file.type + ';base64,' + images[i].file.base64;
        PixelBuilder.buildMatrix(images[i], i, urls);
      }
      return Promise.resolve(true);
    } catch (e) {
      log.error(e);
      return Promise.reject(e);
    }
  }

  createPixels(images, urls) {
    return new Promise((resolve,reject) => {
      try {
        log.info("START");
        const PixelBuilder = new Pixel();
        this.createMatrix(PixelBuilder, images, urls)
        .then(value => {
          // Versione che torna la matrice sotto forma di unico array
          // let array = PixelBuilder.matrixToArray();

          /**
           * Build a canvas DataURL
           *
           */
          // debugger;
          // let dataUrl = PixelBuilder.createCanvas(images);

          let imgs = [];
          for(let i in images) {
            imgs.push(images[i].file.base64);
          }

          PixelBuilder.countPixels(images);

          log.info("FINISH");
          resolve({images:imgs, array: PixelBuilder.subMatrix(100), counter: PixelBuilder.counter});
        })
        .catch(err => {
          log.error(err);
          reject(err)
        })
      } catch (e) {
        log.error(e);
        reject(e);
      }
    })
  }
}


module.exports = new ImageUtil();
