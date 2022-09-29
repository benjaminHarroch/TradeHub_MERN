

import React from 'react'
import ReactLoading from 'react-loading';

export const Loading = ({ type, color,height,width }) => {


  return (
    
        <ReactLoading type={type} color={color} height={height} width={width} />

  )
}
