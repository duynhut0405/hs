import React, { ReactNode, useEffect, useState } from 'react'
import t from '../../../translation'
import Link from 'next/link'
import checkImageExist from '../../../utils/checkImageExist'

function SessionPopularCatalog({ data }) {
  return (
    <section className="sec-h-2 sec-b lazy-hidden group-ef">
      <div className="container">
        <div className=" entry-head lazy-hidden ef ef-tx-t">
          <h2 className="ht">{t('popular_catalog')}</h2>
        </div>
        <div className="row list-item list-b-2">
          {(data.details != undefined) && (
            data.details.map((item, index) => (
              <div className="col-6" key={index}>
                <Link href={item.request_path}>
                <a className="item tRes_66" href="#">
                  <img  className="lazy-hidden" data-lazy-type="image" data-lazy-src={`${process.env.DOMAIN_IMAGE + item.url}`} src="/images/no-image.svg"  alt={item.alt} onError={async (e) => await checkImageExist(e)}/>
                  <div className="divtext"> 
                    <div className="title">{item.alt}</div>
                  </div>
                </a>
                </Link>
              </div>
            ))
          )}
        </div> 
      </div>
    </section>
  )
}

export default SessionPopularCatalog