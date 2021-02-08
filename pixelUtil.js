class PixelUtil {
  _cursore;
  _matrix;
  _pixelsRows= 264;
  _pixelsCols= 152;
  _widthPixel= 10;
  _heightPixel= 10;
  _pixelIdealArea= 25;
  _counter;

  constructor() {
    this._cursore = {row:0, col:0};
    this._matrix = [];
    for(let i=0; i<this._pixelsRows; i++) {
      this._matrix[i] = [];
      for(let j=0; j<this._pixelsCols; j++) {
        this._matrix[i][j] = 0;
      }
    }
  }

  get matrix() {
    return this._matrix;
  }

  get pixelsRows() {
    return this._pixelsRows;
  }

  get pixelsCols() {
    return this._pixelsCols;
  }

  get counter() {
    return this._counter;
  }

  //Restituisce un numero con il divisore di migliaia
  formatNumber(num) {
    let s = ""+num;
    s = s.split('').reverse().join('');
    let interval = parseInt(s.length/3);
    let range = 0;
    let split = []
    for(let i=0; i<interval; i++) {
    	split.push(s.substring(range,range+3));
        range += 3;
    }
    split.push(s.substring(range, s.length));
    s = split.join("'");
    s = s.split('').reverse().join('');
    s = s.charAt(0)=== "'" ? s.substring(1,s.length) : s;

    return s;
  }

  //Cerca una posizione di partenza valida nella matrice secondo i pixel in altezza e larghezza dell'immagine considerata
  _cercaPosizioneCursore(width,height) {
    try {
      console.log("PixelUtil - [_cercaPosizioneCursore] - START");
      for(let i=this._cursore.row; i<this._matrix.length; i++) {
        for(let j=this._cursore.col; j<this._matrix[i].length; j++) {
          if(this._matrix[i][j] === 0) {
            let trovataPorzione = true;
            for(let k=i; k<(i+(+height)); k++) {
              if(k>this._matrix.length) {
                trovataPorzione = false;
              }
              else {
                for(let l=j; l<(j+(+width)); l++) {
                  if(l>this._matrix[k].length || this._matrix[k][l] !== 0) {
                    trovataPorzione = false;
                  }
                }
              }
            }
            if(trovataPorzione) {
              return {row:i, col:j};
            }
          }
        }
      }
      return -1;
    } catch (e) {
      console.log("PixelUtil - [_cercaPosizioneCursore] - ERROR -", e.message);
      throw e;
    } finally {
      console.log("PixelUtil - [_cercaPosizioneCursore] - FINISH");
    }
  }

  //Controlla se la posizione specificata per dove inserire l'immagine è valida altrimenti restituisce -2
  _checkPosizioneScelta(width,height,initWidth,initHeight) {
    try {
      console.log("PixelUtil - [_checkPosizioneScelta] - START");
      for(let i=initWidth; i<this._matrix.length; i++) {
        for(let j=initHeight; j<this._matrix[i].length; j++) {
          if(this._matrix[i][j] === 0) {
            let trovataPorzione = true;
            for(let k=i; k<(i+(+height)); k++) {
              if(k>this._matrix.length) {
                trovataPorzione = false;
              }
              else {
                for(let l=j; l<(j+(+width)); l++) {
                  if(l>this._matrix[k].length || this._matrix[k][l] !== 0) {
                    trovataPorzione = false;
                  }
                }
              }
            }
            if(trovataPorzione) {
              return {row:i, col:j};
            }
          }
        }
      }
      return -2;
    } catch (e) {
      console.log("PixelUtil - [_checkPosizioneScelta] - ERROR -", e.message);
      throw e;
    } finally {
      console.log("PixelUtil - [_checkPosizioneScelta] - FINISH");
    }
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
    if(!this._isEstremoSup(indiceBlocco,width,height)) {
      delete this._matrix[i][j].style.borderTop;
    }
    if(!this._isEstremoDx(indiceBlocco,width,height)) {
      delete this._matrix[i][j].style.borderRight;
    }
    if(!this._isEstremoInf(indiceBlocco,width,height)) {
      delete this._matrix[i][j].style.borderBottom;
    }
    if(!this._isEstremoSx(indiceBlocco,width,height)) {
      delete this._matrix[i][j].style.borderLeft;
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
      for(let i=this._cursore.row; i<limitRow && i<this._matrix.length; i++) {
        indiceBlocco = {row:indiceBlocco.row, col:0};
        bp = {y:0, x:bp.x}
        for(let j=this._cursore.col; j<limitCol && j<this._matrix[i].length; j++) {
          this._matrix[i][j] = {
            url:image.url,
            style:{
              borderTop: this._isEstremoSup(indiceBlocco,width,height) ? '0.2px solid black' : 'unset',
              borderRight: this._isEstremoDx(indiceBlocco,width,height) ? '0.2px solid black' : 'unset',
              borderBottom: this._isEstremoInf(indiceBlocco,width,height) ? '0.2px solid black' : 'unset',
              borderLeft: this._isEstremoSx(indiceBlocco,width,height) ? '0.2px solid black' : 'unset',
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

  //costruisce la matrice inserendo l'immagine passata come parametro
  buildMatrix(image, indiceImmagine) {
    try {
      console.log("PixelUtil - [buildMatrix] - START");
      this._cursore = {row:0,col:0};
      if(image.positionRow) {
        this._cursore = this._checkPosizioneScelta(image.col, image.row, +image.positionCol, +image.positionRow);
        if(this._cursore === -2) {
          this._cursore = this._cercaPosizioneCursore(image.col, image.row);
        }
      } else {
        this._cursore = this._cercaPosizioneCursore(image.col, image.row);
      }
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

  //restituisce il totale dei pixel venduti e quelli disponibili
  countPixels(images) {
    let venduti = 0;
    for(let i in images) {
      venduti += images[i].row * images[i].col * this._pixelIdealArea;
    }
    let total = this._pixelsRows * this._pixelsCols * this._pixelIdealArea;
    this._counter = {
      venduti: this.formatNumber(venduti),
      disponibili: this.formatNumber(total - venduti)
    };
  }

  //Restituisce la matrice sotto forma di array
  matrixToArray() {
    try {
      console.log("PixelUtil - [matrixToArray] - START");
      let array = [];
      for(let i in this._matrix) {
        for(let j in this._matrix[i]) {
          array.push(this._matrix[i][j])
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
