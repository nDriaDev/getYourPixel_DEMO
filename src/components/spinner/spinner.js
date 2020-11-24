import React from 'react';
import {PixelSpinner} from 'react-epic-spinners';

const Spinner = (props) => {
  let isShowed = props.isHome && props.show; 
  return(
    <div align="center">
      <PixelSpinner
        size={100}
        color="#24e959"
        style={{width:'100%', paddingTop: '25%',
          visibility: isShowed ? 'visible' : 'hidden',
          position: 'absolute',
          zIndex: isShowed ? '2' : '1'
        }}
        />
    </div>
  )
}

export default Spinner;
