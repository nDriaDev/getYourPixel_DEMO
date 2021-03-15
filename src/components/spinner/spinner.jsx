import React from 'react';
import {PixelSpinner} from 'react-epic-spinners';

const Spinner = React.memo(({show}) => {
  return(
    <div align="center">
      <PixelSpinner
        size={100}
        color="#28a745"
        style={{
          width:'100vw',
          height: '100vh',
          visibility: show ? 'visible' : 'hidden',
          position: 'absolute',
          zIndex: '1001',
          background: 'black'
        }}
        />
    </div>
  )
})

export default Spinner;
