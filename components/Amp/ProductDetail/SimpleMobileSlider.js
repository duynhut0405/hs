// import React from "react";
import React, { useState, useCallback } from 'react'

export default function SimpleMobileSlider({ data }) {


  return (
    <div className="pd-15 line-bottom">
        <amp-carousel
          width="450"
          height="300"
          layout="responsive"
          type="slides"
          role="region"
          aria-label="Basic carousel"
        >

          {data.map((item, index) => (
            <div className="item img tRes-content" key={index} >
              <amp-img
                src={`${process.env.DOMAIN_IMAGE + '/catalog/product/' + item.file}`}
                width="450"
                height="300"
              ></amp-img>

            </div>
          ))}
        </amp-carousel>
    </div>
  );
}
