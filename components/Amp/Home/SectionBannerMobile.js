import React, { ReactNode, useEffect, useState } from 'react'
import t from '../../../translation';
import { useAuth } from '../../../contexts/auth'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser';
import StripHtmlTag from "../../../utils/stripHtmlTag";

import NormalCarosel from '../../Desktop/Carosels/NormalCarosel';

function SectionBannerMobile({ banners, menu }) {
  const { isAuthenticated, cart } = useAuth();
  const [keyword, setKeyWord] = useState('');
  const [searchPopular, setSearchPopular] = useState([]);
  const [menuRef, setMenuRef] = useState(React.useRef(null));
  const [activeIndex, setActiveIndex] = useState(0);

  // var menu1 = menu.slice(0, 9);
  var item_count = menu.length;
  var first_cataglog_line = 0;
  if (item_count % 2 !== 0) {
    first_cataglog_line = item_count / 2 + 1;
  } else {
    first_cataglog_line = item_count / 2;
  }
  var ctl_list = [];
  var ctl1 = menu.slice(0, first_cataglog_line);
  var ctl2 = menu.slice(first_cataglog_line);
  for (var i = 0; i < ctl1.length; i++) {
    let col = [];
    col.push(ctl1[i]);
    if (ctl2[i]) col.push(ctl2[i]);

    ctl_list.push(col);
  }

  const setting = {
    className: "banner-home  ",
    arrows: false,
    lazyLoad: true,
    dots: true,
    slidesToShow: 1,
    infinite: true,
    slidesToScroll: 1,

  };


  return (
    <section className=" sec-h-1 sec-b sec-bd-bottom" >
      <div className="container">
        <NormalCarosel setting={setting}>
          {banners.map((item, index) => (
            <div className={`content-tab ${index == activeIndex ? 'active' : ''}`} data-actab-group="0" data-actab-id={index + 1} key={index}>
              <a href="/#" className="tRes_47 mb-10"><img  src={`${process.env.DOMAIN_IMAGE + item.image}`}   alt="" /></a>
              <h2 className="desc text-center">{StripHtmlTag(item.caption)}</h2>
            </div>
          ))}
        </NormalCarosel>


        <div className=" entry-head lazy-hidden ef ef-tx-t">
          <h2 className="ht">{t('categories_title')}</h2>
        </div>
        <div className="list-scroll-74   list-b-2  lazy-hidden group-ef">
          {ctl_list.map((item, index) => {
            if (item[1]) {
              return (
                <div className={`items efch-${index} ef-img-t`} key={index} >
                  <Link href={item[0].additional_data ? "/" + item[0].additional_data.request_path.replace(".html", "") : '/'}>
                    <a className="item " >
                      <div className="img tRes "><img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item[0].additional_data ? item[0].additional_data.thumbnail_image : '/images/no-image.svg'} src="/images/no-image.svg" alt={item[0].name || ''}></img></div>
                      <div className="title line-2">  {item[0].name} </div>
                    </a>
                  </Link>
                  <Link href={item[1].additional_data ? "/" + item[1].additional_data.request_path.replace(".html", "") : '/'}>
                    <a className="item " >
                      <div className="img tRes "><img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item[1].additional_data ? item[1].additional_data.thumbnail_image : '/images/no-image.svg'} src="/images/no-image.svg" alt={item[0].name || ''} ></img></div>
                      <div className="title line-2">  {item[1].name} </div>
                    </a>
                  </Link>
                </div>
              )
            } else {
              return (
                <div className={`items efch-${index} ef-img-t`} key={index} >
                  <Link href={item[0].additional_data ? "/" + item[0].additional_data.request_path.replace(".html", "") : '/'}>
                    <a className="item " >
                      <div className="img tRes "><img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item[0].additional_data ? item[0].additional_data.thumbnail_image : '/images/no-image.svg'} src="/images/no-image.svg" alt={item[0].name || ''} ></img></div>
                      <div className="title line-2">  {item[0].name} </div>
                    </a>
                  </Link>
                </div>
              )
            }
          }
          )}
        </div>
      </div>
    </section>
  )
}

export default SectionBannerMobile