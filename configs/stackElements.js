const path = require('path');

// class V8StackElements {
//     static get stack() {
//         return this.customStack;
//     }
//
//     constructor(callerIndex) {
//
//         // Use V8's feature to get a structured stack trace
//         const oldStackTrace = Error.prepareStackTrace;
//         const oldLimit = Error.stackTraceLimit;
//         try {
//             Error.stackTraceLimit = callerIndex + 1; // <- we only want the top couple of elements
//             Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
//             Error.captureStackTrace(this);
//             this.customStack = this.stack; // <- invoke the getter for 'stack'
//         } finally {
//             Error.stackTraceLimit = oldLimit;
//             Error.prepareStackTrace = oldStackTrace;
//         }
//     }
// }


class Trace {
  //   static _getTraceFromError(file,text) {
  //
  //   let filename = "";
  //   if(file.includes("index")) {
  //     let path = file.split("/");
  //     filename = path[path.length-2] + "/" + path[path.length-1];
  //   } else {
  //     filename = path.basename(file);
  //   }
  //
  //   const STACK_FUNC_NAME = new RegExp(/at\s+((\S+)\s)?\((\S+):(\d+):(\d+)\)/);
  //   let err = new Error();
  //
  //   Error.captureStackTrace(err);
  //
  //   //stack[1] e' sempre questionello che chiama il log
  //   let stacks = err.stack.split('\n').slice(1);
  //
  //   // old javascript version
  //   // let callerInfo = null;
  //   // for (let i = 0; i < stacks.length; i++) {
  //   // 	callerInfo = STACK_FUNC_NAME.exec(stacks[i]);
  //   //
  //   // 	if (callerInfo[2] === caller) {
  //   // 		return {
  //   // 			filename: callerInfo[3],
  //   // 			line: callerInfo[4],
  //   // 			column: callerInfo[5],
  //   // 		};
  //   // 	}
  //   // }
  //
  //   let info = STACK_FUNC_NAME.exec(stacks[0]);
  //   if(info && info[1] && !info[1].includes("<anonymous>") && info[4] && info[5]) {
  //     return '[ ' + filename + ':' + info[1] + ':' + info[4] + ':' + info[5] + " ] -  " + text
  //   }
  //   return '[' + filename + '] - ' + text;
  // }
  static _getCustomFilename(file) {
    try {
      let filename = "";
      if(file.includes("index")) {
        let path = file.split("/");
        filename = path[path.length-2] + "/" + path[path.length-1];
      } else {
        filename = path.basename(file);
      }
      return filename;
    } catch (e) {
      return file ? file : 'unrecognized file'
    }
  }

  static _getTraceFromError(e, text) {
    const STACK_FUNC_NAME = new RegExp(/at\s+((\S+)\s)?\((\S+):(\d+):(\d+)\)/);

    let mess = e.message ? e.message : '';

    let stacks = e.stack ? e.stack.split('\n').slice(1) : null;
    if(!stacks) {
      return 'Unhandled error' + (text ? ' - '+ text : '') + (mess ? ' : ' + mess : '');
    }
    let info = STACK_FUNC_NAME.exec(stacks[0]);
    if(info && info[1] && !info[1].includes("<anonymous>") && info[4] && info[5]) {
      return '[' + info[1] + ' - ' + this._getCustomFilename(info[3]) + ': ' + info[4] + ':' + info[5] + ']' + (text ? ' - ' + text : '') + (mess ? ' : ' + mess : '');
    }
  }

  static getTrace(e, text) {

    const oldStackTrace = Error.prepareStackTrace;
    try {
      if(e) {
        return this._getTraceFromError(e, text)
      }
      Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;
      Error.captureStackTrace(this);
      let callSites = this.stack;
      if(callSites.length > 0) {
        if(callSites[3].getFunctionName()) {
          return ('[' + callSites[3].getFunctionName() + ' - ' + this._getCustomFilename(callSites[3].getFileName()) + ': ' + callSites[3].getLineNumber() + ":" + callSites[3].getColumnNumber() + ']' + (text ? ' - ' + text : ''));
        } else if(callSites[5] && callSites[5].getFunctionName() && callSites[5].getFunctionName().indexOf('Module') < 0){
          return ('[' + callSites[5].getFunctionName() + ' - ' + this._getCustomFilename(callSites[3].getFileName()) + ': ' + callSites[3].getLineNumber() + ":" + callSites[3].getColumnNumber() + ']' + (text ? ' - ' + text : ''));
        } else {
          let stack = [];
          for(let i in callSites) {
            stack.push(callSites[i].getFunctionName() + "-" + callSites[i].getFileName() + "-" + callSites[i].getLineNumber() + "-" + callSites[i].getColumnNumber());
          }
          return ('[Class log - ' + this._getCustomFilename(callSites[3].getFileName()) + ': ' + callSites[3].getLineNumber() + ":" + callSites[3].getColumnNumber() + ']' + ( text ? ' - ' + text : ''));
        }
      }
    } finally {
        Error.prepareStackTrace = oldStackTrace;
    }
  }
}

class StackElements {
    static getFormatedStackTraceElement(text, e = null) {
      return Trace.getTrace(e, text);
      // let stack = new V8StackElements(file).stack;
      // let textStack = [];
      // for(let i in stack) {
      //   let element = stack[i];
      //   let fileName = '';
      //   let filePath = typeof element.getFileName() === 'string' ? path.basename(element.getFileName()) : null;
      //   if(filePath && filePath.includes("index")) {
      //     let path = filePath.split("/");
      //     fileName = path[path.length-2] + "/" + path[path.length-1];
      //   } else {
      //     fileName = path.basename(filePath);
      //   }
      //   textStack.push(element.getFunctionName() + "(" + fileName + ":" + element.getLineNumber() + ")");
      // }
    }
}

module.exports = StackElements;
