import React, { ReactNode, useEffect, useState } from 'react'
import t from '../../../translation'
import Product from '../ProductBox/Product'
import Link from 'next/link'
import NormalCarosel from '../Carosels/NormalCarosel'
import checkImageExist from '../../../utils/checkImageExist'

function SessionBigPromotion({ data }) {
  const setting = {
    className: "slick-res list-b-4  s-nav nav-2 slide-item-shadow slick-initialized slick-slider",
    arrows: true,
    dots: false,
    slidesToShow: 4,
    infinite: true,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]    
  };
  return (
    <section className="sec-h-4 sec-b sec-bd-bottom  lazy-hidden group-ef">
      <div className="container">
        <div className=" entry-head efch-1 ef-tx-t">
          <h2 className="ht">{t('big_promotion')}</h2>
          <Link href="/blog/category/chuong-trinh-khuyen-mai">
            <a className="viewall">{t('view_all')} <i className="icon-arrow-2"></i></a>
          </Link>
        </div>
        {(data.details != undefined) && (
          <NormalCarosel setting={setting}>
            {data.details.map((item, index) => (

                <div className="item box-shadow" key={index}>
                  <Link href={`/blog/post/${item.identifier}`}>
                    <div className="img tRes_66">
                      <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item.featured_img == undefined ? "/images/hoasen-product.jpg" : process.env.DOMAIN_IMAGE + item.featured_img} src="/images/no-image.svg"  alt="" onError={async (e) => await checkImageExist(e)} />
                      {/* <Image layout="responsive" src={item.featured_img == undefined ? "/images/hoasen-product.jpg" : process.env.DOMAIN_IMAGE + item.featured_img} alt={item.title}/> */}
                      <span className="btn btn-3">{t('view_more')}</span>
                    </div>                  
                  </Link>

                  <div className="divtext">
                    <div className="title">{item.title == undefined ? "" : item.title}</div>
                    <div className="date">{`${t('publish_at')} ${item.publish_time}`}</div>
                  </div>
                </div>

            ))}
            {data.details.map((item, index) => (

                <div className="item box-shadow" key={index}>
                  <Link href={`/blog/post/${item.identifier}`}>
                    <div className="img tRes_66">
                      <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item.featured_img == undefined ? "/images/hoasen-product.jpg" : process.env.DOMAIN_IMAGE + item.featured_img} src="/images/no-image.svg"  alt={item.title} onError={async (e) => await checkImageExist(e)} />
                      {/* <Image layout="responsive" src={item.featured_img == undefined ? "/images/hoasen-product.jpg" : process.env.DOMAIN_IMAGE + item.featured_img} alt={item.title}/> */}
                      <span className="btn btn-3">{t('view_more')}</span>
                    </div>                  
                  </Link>

                  <div className="divtext">
                    <div className="title">{item.title == undefined ? "" : item.title}</div>
                    <div className="date">{`${t('publish_at')} ${item.publish_time}`}</div>
                  </div>
                </div>

            ))}
          </NormalCarosel>
        )}
      </div>
    </section>
  )
}

export default SessionBigPromotion