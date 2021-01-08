const util = require('lzutf8');
const chilkat = require('@chilkat/ck-node14-linux64');

class CompressorUtil {
  constructor() {
    this.compress = new chilkat.Compression();
    this.compress.Algorithm = "deflate";
  }
  compressChilkat(input){
      return new Promise((resolve,reject) => {
        console.log("CompressionUtil - [compressChilkat] - START");
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
          console.log("CompressionUtil - [compressChilkat] - ERROR", e.message);
          resolve(this.compress(input));
        } finally {
          console.log("CompressionUtil - [compressChilkat] - FINISH");
        }
      })
  }

  decompressChilkat(input){
      return new Promise((resolve,reject) => {
        console.log("CompressionUtil - [decompressChilkat] - START");
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
          console.log("CompressionUtil - [decompressChilkat] - ERROR", e.message);
          resolve(this.decompress(input));
        } finally {
          console.log("CompressionUtil - [decompressChilkat] - FINISH");
        }
      })
  }

  compress(input) {
    return new Promise((resolve,reject) => {
      console.log("CompressorUtil - [compress] - START");
      util.compressAsync(input, {outputEncoding:"Base64"}, (result, error) => {
        if(error) {
          console.log("CompressorUtil - [compress] - ERROR", error.message);
          reject(error);
        } else {
          console.log("CompressorUtil - [compress] - FINISH");
          resolve(result);
        }
      })
    })
  }

  decompress(input) {
    return new Promise((resolve,reject) => {
      console.log("CompressorUtil - [decompress] - START");
      util.decompressAsync(input, {inputEncoding: "Base64", outputEncoding: "String"}, (result, error) => {
        if(error) {
          console.log("CompressorUtil - [decompress] - ERROR", error.message);
          reject(error);
        } else {
          console.log("CompressorUtil - [decompress] - FINISH");
          resolve(result);
        }
      })
    })
  }
}

module.exports = new CompressorUtil();
