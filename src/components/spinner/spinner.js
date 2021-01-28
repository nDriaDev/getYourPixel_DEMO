import React from 'react';
import {PixelSpinner} from 'react-epic-spinners';

const Spinner = (props) => {
  let isShowed = props.show;
  return(
    <div align="center">
      <PixelSpinner
        size={100}
        color="#28a745"
        style={{width:'100%', paddingTop: '25%',
          visibility: isShowed ? 'visible' : 'hidden',
          position: 'absolute',
          zIndex: isShowed ? '3' : '1'
        }}
        />
    </div>
  )
}

export default Spinner;
