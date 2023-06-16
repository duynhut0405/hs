import React, { ReactNode, useEffect, useState } from 'react'
import t from '../../../translation'
import Product from '../../Desktop/ProductBox/Product'

function SectionNewMobile({ data }) {
  return (

    <section className=" sec-tb sec-bd-bottom    lazy-hidden group-ef">
      <div className="container">
        <div className=" entry-head lazy-hidden ef ef-tx-t">
          <h2 className="ht">{t('new_product')}</h2>
        </div>
        <div className=" list-scroll-150 list-b-4 "  >
          {(data.details != undefined) && (
            data.details.map((item, index) => (
              <div className={`col  efch-${index} ef-img-t`} key={index}>
                <Product data={item} />
              </div>
            )))
          }
        </div>
      </div>
    </section>
  )
}

export default SectionNewMobile