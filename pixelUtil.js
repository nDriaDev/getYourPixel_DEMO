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

  //Cerca una posizione di partenza valida nella matrice secondo i pixel in altezza e larghezza dell'immagine considerata
  _cercaPosizioneCursore(width,height) {
    try {
      console.log("PixelUtil - [_cercaPosizioneCursore] - START");
      for(let i=this._cursore.row; i<this.matrix.length; i++) {
        for(let j=this._cursore.col; j<this.matrix[i].length; j++) {
          if(this.matrix[i][j] === 0) {
            let trovataPorzione = true;
            for(let k=i; k<(i+(+height)) && k<this.matrix.length; k++) {
              for(let l=j; l<(j+(+width)) && l<this.matrix[k].length; l++) {
                if(this.matrix[k][l] !== 0) {
                  trovataPorzione = false;
                }
              }
            }
            return trovataPorzione ? {row:i, col:j} : -1;
          }
        }
      }
    } catch (e) {
      console.log("PixelUtil - [_cercaPosizioneCursore] - ERROR -", e.message);
      throw e;
    }
    console.log("PixelUtil - [_cercaPosizioneCursore] - FINISH");
  }

  //restituisce true se la porzione di immagine in esame deve avere il borso superiore
  _isEstremoSup(i, width, height) {
    return i.row === 0;
  }

  //restituisce true se la porzione di immagine in esame deve avere il borso destro
  _isEstremoDx(i, width, height) {
    return (width - i.col - 1) === 0;
  }

  //restituisce true se la porzione di immagine in esame deve avere il borso inferiore
  _isEstremoInf(i, width, height) {
    return (height - i.row - 1) === 0;
  }

  //restituisce true se la porzione di immagine in esame deve avere il borso sinistro
  _isEstremoSx(i, width, height) {
    return i.col === 0;
  }

  //rimuove i bordi superflui
  _removeBorder(indiceBlocco,width,height,i,j) {
    if(this._isEstremoSup(indiceBlocco,width,height)) {
      delete this.matrix[i][j].style.borderTop;
    }
    if(this._isEstremoDx(indiceBlocco,width,height)) {
      delete this.matrix[i][j].style.borderRight;
    }
    if(this._isEstremoInf(indiceBlocco,width,height)) {
      delete this.matrix[i][j].style.borderBottom;
    }
    if(this._isEstremoSx(indiceBlocco,width,height)) {
      delete this.matrix[i][j].style.borderLeft;
    }
  }

  //inserisce la struttura del pixel secondo i valori di cursore
  _inserisci(image, indiceImmagine) {
    try {
      console.log("PixelUtil - [_inserisci] - START");
      let width = image.col;
      let height = image.row;
      let bp= {y:0,x:0};
      let indiceBlocco = {row:0, col:0};
      let limitRow = this._cursore.row+(+height);
      let limitCol = this._cursore.col+(+width);
      for(let i=this._cursore.row; i<limitRow && i<this.matrix.length; i++) {
        indiceBlocco = {row:indiceBlocco.row, col:0};
        bp = {y:0, x:bp.x}
        for(let j=this._cursore.col; j<limitCol && j<this.matrix[i].length; j++) {
          this.matrix[i][j] = {
            url:image.url,
            style:{
              borderTop: this._isEstremoSup(indiceBlocco,width,height) ? 'solid 0.2px black !important' : 'unset',
              borderRight: this._isEstremoDx(indiceBlocco,width,height) ? 'solid 0.2px black !important' : 'unset',
              borderBottom: this._isEstremoInf(indiceBlocco,width,height) ? 'solid 0.2px black !important' : 'unset',
              borderLeft: this._isEstremoSx(indiceBlocco,width,height) ? 'solid 0.2px black !important' : 'unset',
              // backgroundImage: 'url(' + image.file.base64 + ')',
              backgroundPosition: '-' + (bp.y*10) + 'px -' + (bp.x*10) + 'px'
            },
            image: indiceImmagine
          }
          this._removeBorder(indiceBlocco,width,height,i,j);
          indiceBlocco = {row:indiceBlocco.row, col:indiceBlocco.col+1}
          bp = {y:bp.y+1, x:bp.x}
        }
        indiceBlocco = {row:indiceBlocco.row+1, col:0}
        bp = {y:0, x:bp.x+1}
      }
    } catch (e) {
        console.log("PixelUtil - [_inserisci] - Error -", e.message);
        throw e;
    }
    console.log("PixelUtil - [_inserisci] - FINISH");
  }

  buildMatrix(image, indiceImmagine) {
    try {
      console.log("PixelUtil - [buildMatrix] - START");
      this._cursore = {row:0,col:0};
      this._cursore = this._cercaPosizioneCursore(image.col, image.row);
      if(this._cursore === -1) {
        return;
      } else {
        this._inserisci(image, indiceImmagine);
      }
    } catch (e) {
      console.log("PixelUtil - [buildMatrix] - ERROR -", e.message);
      throw e;
    }
    console.log("PixelUtil - [buildMatrix] - FINISH");
  }

  //Restituisce la matrice sotto forma di array
  matrixToArray() {
    try {
      console.log("PixelUtil - [matrixToArray] - START");
      let array = [];
      for(let i in this.matrix) {
        for(let j in this.matrix[i]) {
          array.push(this.matrix[i][j])
        }
      }
      //Versione Chuncked ToArray
      // let obj = {};
      // for(let i=0,j=0; i<array.length;i+=2508,j++) {
      //   obj[j]= array.slice(i,i+2508);
      // }
      // return obj;
      console.log("PixelUtil - [matrixToArray] - FINISH");
      return array;
    } catch (e) {
      console.log("PixelUtil - [matrixToArray] - ERROR -", e.message);
      throw e;
    }
  }
}



module.exports = PixelUtil;
