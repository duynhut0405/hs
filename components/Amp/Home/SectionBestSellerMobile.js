import React, { ReactNode, useEffect, useState } from 'react'
import t from '../../../translation'
import Product from '../../Desktop/ProductBox/Product'

function SectionBestSellerMobile({ data }) {
  return (
    <section className="sec-h-7 sec-tb sec-bd-bottom   lazy-hidden group-ef">
      <div className="container">
        <div className=" entry-head efch-1 ef-tx-t">z</div>

        <div className="row list-item-10 list-p-1">
          {data.details != undefined &&
            data.details.map((item, index) => (
              <div className={`col-6 efch-${index} ef-img-t`} key={index}>
                <Product data={item} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default SectionBestSellerMobile