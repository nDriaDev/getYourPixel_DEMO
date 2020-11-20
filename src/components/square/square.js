import React from 'react';
import Tooltip from './../tooltip/tooltip';

const Square = (props) => {
  let row = Array.from({length: props.rows}, (_, index) => index + 1)
  let col = Array.from({length: props.cols}, (_, index) => index + 1)

  const squares=row.map((item,index) => {
    return(
      <div key={index} className="div-inline">
        {
          (col.map((el,index2) => {
            return(
              <div
                key={index+index2}
                className="square tooltip"
              >
                <Tooltip
                  key={"tp-" +index+index2}
                  content={"("+(index+1)+","+(index2+1)+")"}
                  direction={[1,2,3,4].includes(index2+1) ? 'right' : [149,150,151,152].includes(index2+1) ? 'left' : 'top'}
                  >
                </Tooltip>
              </div>
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

export default Square;
