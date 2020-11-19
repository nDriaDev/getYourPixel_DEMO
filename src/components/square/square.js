import React, {Component} from 'react';

class Square extends Component{
  constructor(props){
    super(props);
    this.state={
      rows:264,
      cols:152,
      squares:40128
    }
  }

  render(){
    let row =[];
    let col =[];
    for(let i=0;i<this.state.rows;i++){
      row.push(i);
    }
    for(let i=0;i<this.state.cols;i++){
      col.push(i);
    }
    const squares=row.map((item,index) => {
      return(
        <div key={index} className="div-inline">
          {
            (col.map((el,index2) => {
              return(
                <div
                  key={index+index2}
                  className="square tooltip"
                ><span key={"sp-"+index+index2} className="tooltiptext">{"("+(index+1)+","+(index2+1)+")"}</span></div>
              )
            }))
        }
        </div>
      )
    })
    return(
        <>
          <div className="display-grid background-fusion">
            {squares}
          </div>
        </>
      )
  }
}

export default Square;
