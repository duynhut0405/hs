import React from 'react';
import t from '../../../translation';
import Product from '../ProductBox/ProductLink';
const render = [0, 1, 2];
function ProductLink({ data }) {
  return (
    <div>
      <div className=' entry-head lazy-hidden ef ef-tx-t'>
        <h5 className='ht'>{t('usually_purchased_together')}</h5>
      </div>
      <div className='row  list-item list-p-1'>
        {data?.map((item, index) => (
          <div className=' col-4 ' key={index}>
            <Product data={item} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductLink;
