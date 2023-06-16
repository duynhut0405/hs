import React, {useState, useEffect} from 'react';
import Link from 'next/link'


function Html({data,key}) {
  return (
    <a className="item">
      {data.image && (
      <div className="img"><img className="lazy-hidden" data-lazy-type="image" data-lazy-src={data.image} alt={data.title}  /></div>
      )}
      {data.title && (
        <div className="title">{data.title}</div>
      )}
    </a>

  );
}


export default Html;
