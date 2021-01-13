class PixelUtil {
  _cursore;
  matrix;
  constructor() {
    this._cursore = {row:0, col:0};
    this.matrix = [];
    for(let i=0; i<264; i++) {
      this.matrix[i] = [];
      for(let j=0; j<152; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  _cercaPosizioneCursore(width,height) {
    for(let i=this._cursore.row; i<this.matrix.length; i++) {
      for(let j=this._cursore.col; j<this.matrix[i].length; j++) {
        if(this.matrix[i][j] === 0) {
          let trovataPorzione = true;
          for(let k=this._cursore.row; k<(i+height) && k<this.matrix.length; k++) {
            for(let l=this._cursore.col; l<(j+width) && l<this.matrix[k].length; l++) {
              if(this.matrix[k][l] !== 0) {
                trovataPorzione = false;
              }
            }
          }
          return trovataPorzione ? {row:i, col:j} : -1;
        }
      }
    }
  }

  _inserisci(image, width, height) {
    let index = 0;
    for(let i=this._cursore.row; i<(this._cursore.row+height) && i<this.matrix.length; i++) {
      for(let j=this._cursore.col; j<(this._cursore.col+width) && j<this.matrix[i].length; j++) {
        this.matrix[i][j] = image[index];
        index++;
      }
    }
  }

  buildMatrix(image,width, height) {
    this._cursore = {row:0,col:0};
    this._cursore = this._cercaPosizioneCursore();
    if(this._cursore === -1) {
      return;
    } else {
      this._inserisci(image, width, height);
    }
  }

  matrixToArray() {
    let array = [];
    for(let i in this.matrix.legnth) {
      for(let j in this.matrix[i].length) {
        array.push(this.matrix[i][j])
      }
    }
    return array;
  }
}



module.exports = PixelUtil;
