import React from 'react';
import Tooltip from './../tooltip/tooltip';

let row = Array.from({length: 264}, (_, index) => index + 1)
let col = Array.from({length: 152}, (_, index) => index + 1)
const squares=row.map((item,index) => {
  return(
    <div key={index} className="span-cols-square mx-auto">
      {
        (col.map((el,index2) => {
          return(
            <div
              key={index+index2}
              className="square my-tooltip"
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

const Square = (props) => {
  return(
    <>
      <div className="span-rows-square  mx-auto">
        {squares}
      </div>
    </>
  )
}

export default Square;
