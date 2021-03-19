const appRoot = require('app-root-path');
const log = require(appRoot + '/configs/winston').getLogger();
const { createCanvas, loadImage, Image } = require('canvas');
const fs = require('fs');

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
      log.info("START");
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
      log.error(e);
      throw e;
    } finally {
      log.info("FINISH");
    }
  }

  //Controlla se la posizione specificata per dove inserire l'immagine è valida altrimenti restituisce -2
  _checkPosizioneScelta(width,height,initWidth,initHeight) {
    try {
      log.info("START");
      let i = initWidth;
      let j = initHeight;

      if(i>=this._matrix.length || j>=this._matrix[0].length) {
        return -2;
      }
      if(this._matrix[i][j] === 0) {
        let trovataPorzione = true;
        for(let k=i; k<(i+(+height)); k++) {
          if(!trovataPorzione) {
            return -2;
          }
          if(k>=this._matrix.length) {
            trovataPorzione = false;
          }
          else {
            for(let l=j; l<(j+(+width)); l++) {
              if(l>=this._matrix[k].length || this._matrix[k][l] !== 0) {
                trovataPorzione = false;
              }
            }
          }
        }
        if(trovataPorzione) {
          return {row:i, col:j};
        }
      }
      return -2;
    } catch (e) {
      log.error(e);
      throw e;
    } finally {
      log.info("FINISH");
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
  _inserisci(image, indiceImmagine, urlsClicked) {
    try {
      log.info("START");
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

          //Set etichetta url visitati o meno se si e' loggati
          if(limitRow-i === 1 && limitCol-j === 1 && urlsClicked) {
            if(urlsClicked.includes(image.url)) {
              this._matrix[i][j].styleLabel = {
                width: (parseInt(width)*10)/3 + 'px',
                height: (parseInt(height)*10)/3 + 'px',
                background: "green"
              }
            } else {
              this._matrix[i][j].styleLabel = {
                width: (parseInt(width)*10)/3 + 'px',
                height: (parseInt(height)*10)/3 + 'px',
                background: "red"
              }
            }
          }

        }
        indiceBlocco = {row:indiceBlocco.row+1, col:0}
        bp = {y:0, x:bp.x+1}
      }
    } catch (e) {
      log.error(e);
      throw e;
    }
    log.info("FINISH");
  }

  //costruisce la matrice inserendo l'immagine passata come parametro
  buildMatrix(image, indiceImmagine, urlsClicked) {
    try {
      log.info("START");
      this._cursore = {row:0,col:0};
      if(image.positionRow !== undefined) {
        this._cursore = this._checkPosizioneScelta(image.col, image.row, +image.positionRow, +image.positionCol);
        if(this._cursore === -2) {
          this._cursore = {row:0,col:0};
          this._cursore = this._cercaPosizioneCursore(image.col, image.row);
        }
      } else {
        this._cursore = this._cercaPosizioneCursore(image.col, image.row);
      }
      if(this._cursore === -1) {
        return;
      } else {
        this._inserisci(image, indiceImmagine, urlsClicked);
      }
    } catch (e) {
      log.error(e);
      throw e;
    }
    log.info("FINISH");
  }

  /**
  * Restituisce un dataURL base64 costruito tramite canvas con tutte le immagini e coords (coordinate delle aree delle varie immagini, testo tooltip, url e indice dell'immagine relativa)
  * <numero riga: Descrizione>
  * 291: (CONSIDERARE DI LEGGERLA DA DB) Carico l'immagine del quadratino bianco: è tutto bianco, il distacco lo crea il createCanvas
  * 292: Itero sulle righe della griglia(264 righe)
  * 293-294: Ad ogni iterazione riporto il cursore di avanzamento larghezza a 0 e incremento quello di avanzamento altezza di 11 (10 del singolo quadrato in griglia e 1 di distacco)
  * 295: Itero sulle colonne della griglia(152 colonne)
  * 296: Se la matrice in quella posizione ha un url allora li ho un Immagine
  * 297: Se l'array "visited" non contiene il riferimento all'immagine vuol dire che la sto incontrando per la prima volta
  * 298-301: Costruisco le variabili temporanee per l'oggetto riferito all'immagine specifica(obj), per i quadrati in larghezza(wImg) e altezza(hImg), per il base64(a)
  * 302-310: Costrutisco la variabile temporanea img e tramite onload() creo l'immagine con il base64 e la carico nel context del canvas
  * a partire dai valori del cursore init :le dimensioni le ottengo invece moltiplicando per 11 il numero di quadrati per riga e colonna
  * e sottraendo uno; questo perché per ogni quadratino occupato (che misura 10px) devo considerare 1 pixel di distacco, e l'ultimo pixel
  * di distacco lo sottraggo perche' sara poi il cursore a inserirlo nella sua posizione (init.h a riga 273 e init.w a riga 308). In questo
  * modo non ho disallineamenti tra i quadratini
  * 311-318: costruisco i dati dell'immagine in questione: tooltip, url,image(riferimento all'immagine), e points(coordinate spaziali dell'immagine)
  * 319: avanzo il cursore di init.w di 1 per il distacco dall'immagine in questione
  * 320: avanzo la variabile di iterazione sulle colonne di quanti sono i quadratini per colonna dell'immagine in questione, poiche' queste
  * posizioni sono occupate da questa immagine, e sottraggo uno poiche il ciclo incrementera' di default di 1 la variabile alla prossima iterazione
  * 321: inserisco il riferimento all'immagine nell'array delle immagini visitate "visited"
  * 323-326: se l'array "visited" contiene il riferimento all'immagine, devo solo avanzare init.w e j dei quadratini per colonna di questa
  * immagine poiche' sono posizioni occupate dalla stessa
  * 330-343: Se la matrice in quella posizione non ha un url allora devo aggiungere un quadratino bianco come fatto per l'immagine ma le dimensioni saranno 10x10 e
  * incremento init.w di 10 + 1 per il distacco e costruisco i dati del quadratino
  * 348-352: ottengo i dati che mi servono cioe' il dataURL del canvas(un base64 che potro usare come src di um immagine) e i dati di ogni singola immagine/quadratino
  */
  createCanvas(images, squares) {
    return new Promise((resolve,reject) => {
      let canvas = createCanvas(((152*11)),((264*11)));
      let ctx = canvas.getContext('2d');
      let init = {
        w: 0,
        h:-11
      }
      let coords = [];
      let visited = [];

      try {
        for(let i in this._matrix) {
          init.h += 11;
          init.w = 0;
          for(let j=0; j<this._matrix[i].length; j++) {
            if(this._matrix[i][j].url) {
              if(!visited.includes(this._matrix[i][j].image)) {
                let obj = images[this._matrix[i][j].image];
                let wImg = +obj.col;
                let hImg = +obj.row;
                let a = obj.file.base64;
                let img = new Image();
                img.onload = () => {
                  try {
                    ctx.drawImage(img,init.w,init.h,(wImg*11)-1, (hImg*11)-1);
                  } catch (e) {
                    log.error(e);
                  }
                }
                img.src = a;
                let w = init.w + (wImg*11)-1;
                let h = init.h + (hImg*11)-1;
                coords.push({
                  name: "Vai al sito",
                  shape: 'rect',
                  image: this._matrix[i][j].image,
                  url: obj.url,
                  coords: [init.w,init.h,w,h]
                })
                init.w = w+1;
                j = j + wImg -1;
                visited.push(this._matrix[i][j].image);
              } else {
                let obj = images[this._matrix[i][j].image];
                let wImg = +obj.col;
                init.w = init.w + (wImg*11);
                j = j + wImg -1;
              }
            } else {
              //WhiteSquare
              let img = new Image();
              img.onload = () => {
                try {
                  ctx.drawImage(
                    img,
                    init.w,
                    init.h,
                    10,
                    10
                  )
                } catch (e) {
                  log.error(e);
                }
              }
              img.src = squares.white;

              let w = init.w + 10;
              let h = init.h + 10;
              coords.push({
                name: "("+ ((+i)+1) + "," + (j+1) + ")",
                coords: [init.w,init.h,w,h]
              })
              init.w = w+1;
            }
          }
        }

        let a = {
          dataURL: canvas.toDataURL(),
          refer: {
            name: 'img-map',
            areas: coords,
          }
        }
        resolve(a);
      } catch (e) {
        log.error(e);
        reject(e);
      }
    })
  }

  /**
   * Set red/green squares on canvas
   */
  setSquares(urlsClicked, squares, canvas) {
    let canva = createCanvas(((152*11)),((264*11)));
    let ctx = canva.getContext('2d');
    let img1 = new Image();
    img1.onload = () => {
      try {
        ctx.drawImage(img1,0,0);
      } catch (e) {
        log.error(e);
      }
    }
    img1.src = canvas.canvas.dataURL;
    for(let i in canvas.canvas.refer.areas) {
      if(canvas.canvas.refer.areas[i].url) {
        if(urlsClicked.includes(canvas.canvas.refer.areas[i].url)) {
          let coords = canvas.canvas.refer.areas[i].coords;
          let dim = {
            x: (coords[2] - coords[0])/3,
            y: (coords[3] - coords[1])/3
          }
          let start = {
            x: coords[2] - dim.x,
            y: coords[3] - dim.y,
          }
          let img = new Image();
          img.onload = () => {
            try {
              ctx.drawImage(img, start.x, start.y, dim.x, dim.y)
            } catch (e) {
              log.error(e);
            }
          }
          img.src = squares.green;
        } else {
          let coords = canvas.canvas.refer.areas[i].coords;
          let dim = {
            x: (coords[2] - coords[0])/3,
            y: (coords[3] - coords[1])/3
          }
          let start = {
            x: coords[2] - dim.x,
            y: coords[3] - dim.y,
          }
          let img = new Image();
          img.onload = () => {
            try {
              ctx.drawImage(img, start.x, start.y, dim.x, dim.y)
            } catch (e) {
              log.error(e);
            }
          }
          img.src = squares.red;
        }
      }
    }
    canvas.canvas.dataURL = canva.toDataURL();
    return canvas;
  }

  /**
   * restituisce una sottoMatrice di quella originale con un numero di righe pari a quelle indicate
   * @param numRows
   * @return {matrix}
   */
  subMatrix(numRows) {
    let mat = []
    for(let i in this._matrix) {
      if(i<=numRows){
        mat.push(this._matrix[i]);
      }
    }
    return mat;
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
      log.info("START");
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
      log.info("FINISH");
      return array;
    } catch (e) {
      log.error(e);
      throw e;
    }
  }
}



module.exports = PixelUtil;
