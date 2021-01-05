import React from 'react';
import {PixelSpinner} from 'react-epic-spinners';

const SpinnerManage = ({visible}) => {
  return(
      <div align="center">
        <PixelSpinner
          size={100}
          color="#24e959"
          style={{width:'100%',
            paddingTop: '25%',
            paddingBottom: '14%',
            background: 'black',
            visibility: visible ? 'visible' : 'hidden',
            position: 'absolute',
            zIndex: '3'
          }}
          />
      </div>
  )
}

export default SpinnerManage;
