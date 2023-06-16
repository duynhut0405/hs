import React, { ReactNode, useEffect, useState } from 'react'
import ShowStarTestimonial from '../../Desktop/Review/ShowStarTestimonial'
import checkImageExist from '../../../utils/checkImageExist'

function SectionTestimonialMobile({ data }) {
  const setting = {
    className: "slick-res list-b-3   s-nav nav-2",
    arrows: true,
    dots: false,
    slidesToShow: 4,
    infinite: true,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplay: true,
    autoplaySpeed: 2000
  };
  return (
    <section className=" sec-tb sec-bd-bottom    lazy-hidden group-ef">
      <div className="container">
        <div className=" entry-head lazy-hidden ef ef-tx-t">
          <h2 className="ht">{data.title}</h2>
        </div>
        <div className="list-scroll-300  list-b-3  ">
          {data.details.map((item, index) => (
            <div className={`col  efch-${index} ef-img-t`} key={index}>
              <div className="item box-shadow">
                <div className="desc">{item.description}</div>
                <div className="user">
                  <div className="avatar tRes">
                    <img
                      className="lazy-hidden"
                      data-lazy-type="image"
                      data-lazy-src={item.image == undefined ? process.env.EMPTY_IMG : process.env.DOMAIN_IMAGE + "testimonial/images/" + item.image}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionTestimonialMobile