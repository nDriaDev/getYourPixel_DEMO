const util = require('lzutf8');
const lzma = require('lzma-native');
const chilkat = require('@chilkat/ck-node14-linux64');
const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();

class CompressorUtil {
  constructor() {
    this.compress = new chilkat.Compression();
    this.compress.Algorithm = "deflate";
  }


  compressLZMA(input){
      log.info("START");
      return new Promise((resolve,reject) => {
        try {
          lzma.compress(input,7)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            throw e;
          })
        } catch (e) {
          log.error(e);
          reject(e);
        } finally {
          log.info("FINISH")
        }
      })
  }

  decompressLZMA(input) {
    log.info("START");
    return new Promise((resolve,reject) => {
      try {
        lzma.decompress(input.buffer)
        .then(res => {
          resolve(res.toString())
        })
        .catch(e => {
          log.error(e);
          reject(e);
        })
      } catch (e) {
        log.error(e);
        reject(e);
      } finally {
        log.info("FINISH")
      }
    })
  }

  compressChilkat(input){
      return new Promise((resolve,reject) => {
        log.info("START");
        try {
          let binDat = new chilkat.BinData();
          // Load the base64 data into a BinData object.
          // This decodes the base64. The decoded bytes will be contained in the BinData.
          binDat.AppendEncoded(input,"base64");

          // Compress the BinData.
          this.compress.CompressBd(binDat);

          // Get the compressed data in base64 format:
          resolve(binDat.GetEncoded("base64"));
        } catch (e) {
          log.error(e);
          resolve(this.compress(input));
        } finally {
          log.info("FINISH");
        }
      })
  }

  decompressChilkat(input){
      return new Promise((resolve,reject) => {
        log.info("START");
        try {
          let binDat = new chilkat.BinData();
          // Load the base64 data into a BinData object.
          // This decodes the base64. The decoded bytes will be contained in the BinData.
          binDat.AppendEncoded(input,"base64");

          // Compress the BinData.
          this.compress.DecompressBd(binDat);

          // Get the compressed data in base64 format:
          resolve(binDat.GetEncoded("base64"));
        } catch (e) {
          log.error(e);
          resolve(this.decompress(input));
        } finally {
          log.info("FINISH");
        }
      })
  }

  compress(input) {
    return new Promise((resolve,reject) => {
      log.info("START");
      util.compressAsync(input, {outputEncoding:"Base64"}, (result, error) => {
        if(error) {
          log.error(error);
          reject(error);
        } else {
          log.info("FINISH");
          resolve(result);
        }
      })
    })
  }

  decompress(input) {
    return new Promise((resolve,reject) => {
      log.info("START");
      util.decompressAsync(input, {inputEncoding: "Base64", outputEncoding: "String"}, (result, error) => {
        if(error) {
          log.error(error);
          reject(error);
        } else {
          log.info("FINISH");
          resolve(result);
        }
      })
    })
  }
}

module.exports = new CompressorUtil();
