import React, { ReactNode, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import checkImageExist from '../../../../utils/checkImageExist'

function Banner({ banners }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="wtabs-1 ">
      <div className="content-tabs">
        {banners.map((item, index) => (
          <div className={`content-tab ${index ==  activeIndex? 'active' : ''}`} data-actab-group="0" data-actab-id={index + 1} key={index}>
            <a href="#" className="tRes_47"><img  className="lazy-img-tab" data-src={`${process.env.DOMAIN_IMAGE + item.image}`}  src="/images/no-image.svg"  alt="" onError={async (e) => await checkImageExist(e)}/></a>
          </div>
        ))}
      </div>
      <div className="box-shadow">
        <div className="menu-tabs">
          {banners.map((item, index) => (
            <div className={`menu-tab ${index ==  activeIndex? 'active' : ''}`} data-actab-group="0" data-actab-id={index + 1} key={index} onClick={() => setActiveIndex(index)}>
              {ReactHtmlParser(item.caption)}
            </div>
          ))} 
        </div>
      </div>
    </div>
  )
}

export default Banner