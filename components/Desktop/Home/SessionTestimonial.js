import React, { ReactNode, useEffect, useState } from 'react'
import NormalCarosel from '../Carosels/NormalCarosel'
import ShowStarTestimonial from '../Review/ShowStarTestimonial'
import checkImageExist from '../../../utils/checkImageExist'

function SessionTestimonial({ data }) {
  const setting = {
    className: "slick-res list-b-3   s-nav nav-2",
    arrows: true,
    dots: false,
    slidesToShow: 4,
    infinite: true,
    slidesToScroll: 1,
    speed: 500,
    autoplay: false,
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
    <section className="sec-h-5 sec-b ddd lazy-hidden group-ef">
      <div className="container">
        <div className=" entry-head efch-1 ef-tx-t">
          <h2 className="ht">{data.title}</h2>
        </div>
        {data.details != undefined && (
          <NormalCarosel setting={setting}>
            {data.details.map((item, index) => (
              <div className="item" key={index}>
                <div className="desc">{item.description}</div>
                <div className="user">
                  <div className="avatar tRes">
                    <img
                      className="lazy-hidden"
                      data-lazy-type="image"
                      data-lazy-src={item.image == undefined ? "/images/hoasen-product.jpg" : process.env.DOMAIN_IMAGE + "testimonial/images/" + item.image}
                      src="/images/no-image.svg"
                      alt={item.title}
                      onError={async (e) => await checkImageExist(e)}
                    />
                  </div>
                  <div className="ratingresult">
                    <ShowStarTestimonial rating={item.rating != null ? item.rating : 0} />
                    <strong className="cl1 rating-point">{item.rating != null ? item.rating : "0"}/5</strong>
                  </div>
                  <div className="t1 ">{item.contact_name}</div>
                  <div className="t2">{item.company_name}</div>
                </div>
              </div>
            ))}
            {data.details.map((item, index) => (
              <div className="item" key={index}>
                <div className="desc">{item.description}</div>
                <div className="user">
                  <div className="avatar tRes">
                    <img
                      className="lazy-hidden"
                      data-lazy-type="image"
                      data-lazy-src={item.image == undefined ? "/images/hoasen-product.jpg" : process.env.DOMAIN_IMAGE + "testimonial/images/" + item.image}
                      src="/images/no-image.svg"
                      alt={item.description}
                      onError={async (e) => await checkImageExist(e)}
                    />
                  </div>
                  <div className="ratingresult">
                    <ShowStarTestimonial rating={item.rating != null ? item.rating : 0} />
                    <strong className="cl1 rating-point">{item.rating != null ? item.rating : "0"}/5</strong>
                  </div>
                  <div className="t1 ">{item.contact_name}</div>
                  <div className="t2">{item.company_name}</div>
                </div>
              </div>
            ))}
          </NormalCarosel>
        )}
      </div>
    </section>
  );
}

export default SessionTestimonial