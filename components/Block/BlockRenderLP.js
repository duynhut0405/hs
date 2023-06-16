import React, {useState, useEffect} from 'react';
import Html from './Html'

function BlockRenderLP({data}) {
  return (
    data.map(
      (values, index) => {
        if (values.identify == 'sdfsdf') {
          return (
            <Html data={data} key={index}/>
          )
        }
      }
    )
  );
}

export default BlockRenderLP;
