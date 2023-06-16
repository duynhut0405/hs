import React, { ReactNode, useEffect, useState } from 'react'
import t from '../../../translation'
import Link from 'next/link'
import NormalCarosel from '../../Desktop/Carosels/NormalCarosel'
import checkImageExist from '../../../utils/checkImageExist'


function SectionBigPromotionMobile({ data }) {
  return (

    <section className=" sec-tb sec-bd-bottom    lazy-hidden group-ef">
      <div className="container">
        <div className=" entry-head lazy-hidden ef ef-tx-t">
          <h2 className="ht">{t('big_promotion')}</h2>
        </div>
        <div className=" list-scroll-150 list-b-4 "  >
          {(data.details != undefined) && (data.details.map((item, index) => (
            <div className={`col  efch-${index} ef-img-t`} key={index}>
              <Link href={`/blog/post/${item.identifier}`}>
              <a href={`/blog/post/${item.identifier}`} className="item box-shadow">
                <div className="img tRes_66">
                  <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item.featured_img == undefined ? process.env.EMPTY_IMG : process.env.DOMAIN_IMAGE + item.featured_img} src="/images/no-image.svg" alt={item.title} onError={async (e) => await checkImageExist(e)}/>
                  <span className="btn btn-3">{t('view_more')}</span>
                </div>
                <div className="divtext">
                  <div className="title">{item.title == undefined ? "" : item.title} </div>
                  <div className="date">{`${t('publish_at')} ${item.publish_time}`}</div>
                </div>
              </a>
              </Link>
            </div>
          ))
          )}
        </div>
      </div>
    </section >
  )
}

export default SectionBigPromotionMobile