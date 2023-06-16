import React, { ReactNode, useEffect, useState } from 'react'
import t from '../../../translation'
import Product from '../ProductBox/Product'

function SessionNew({ data }) {
  return (
    <section className="sec-h-3 sec-b  lazy-hidden group-ef">
      <div className="container">
      <div className=" entry-head efch-1 ef-tx-t">
        <h2 className="ht">{t('new_product')}</h2>
      </div>
      <div className="row list-item list-p-1">
        {(data.details != undefined) && (
          data.details.map((item, index) => (
            <div className="col-md-2 col-4  ef-tx-t" key={index}>
              <Product data={item}/>
            </div>
          ))
        )}
      </div>
      </div>
    </section>
  )
}

export default SessionNew