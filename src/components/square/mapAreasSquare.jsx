import React from 'react';

const MapAreasSquare = ({refer}) => {

  const areas = refer.areas.map((item,index) => {
    return <area key={'area-' + index} shape={item.shape} alt= {item.name} coords={item.coords} title={item.name}/>
  })

  return (
    <map name={refer.name} id={refer.name}>
      {areas}
    </map>
  )
}

export default MapAreasSquare;
