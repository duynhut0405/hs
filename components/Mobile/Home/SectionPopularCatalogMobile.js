import React, { ReactNode, useEffect, useState } from 'react'
import t from '../../../translation'
import Link from 'next/link'
import checkImageExist from '../../../utils/checkImageExist'
function SectionPopularCatalogMobile({ data, menu }) {
  var popular_cat = [];
  data.details.forEach(item => {
    var category_obj = menu.find(element => element.parentcat == item.category_id);

    popular_cat.push({
      request_path: category_obj.additional_data.request_path.replace(".html", ""),
      url: item.url,
      alt: item.alt
    })
  });

  return (
    <section className="sec-h-2 sec-t sec-bd-bottom  lazy-hidden group-ef">
      <div className="container">
        <div className=" entry-head efch-1 ef-tx-t">
          <h2 className="ht">{t('popular_catalog')}</h2>
        </div>
        <div className="row list-item list-b-2  lazy-hidden group-ef">
          {(popular_cat != undefined) && (popular_cat.map((item, index) => (
            <div className={`col-6 efch-${index} ef-img-t`} key={index} >
              <Link href={item ? "/" + item.request_path : '/'}>
                <a className="item " >
                  <div className="img tRes "><img className="lazy-hidden" data-lazy-type="image" data-lazy-src={`${process.env.DOMAIN_IMAGE + item.url}`} src="/images/no-image.svg" alt={item.alt} onError={async (e) => await checkImageExist(e)}/></div>
                  <div className="title">{item.alt}</div>
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

export default SectionPopularCatalogMobile