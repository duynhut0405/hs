import React, { useEffect, useState } from 'react';
import t from '../../../translation';
import CommonData from './CommonData';
import Description from './ChildrenBLocks/Description';
import ReviewBlock from './ChildrenBLocks/ReviewBlock';
import Question from './Question';
import ViewedProduct from '../Common/ViewedProduct';
import CommentBlock from './ChildrenBLocks/CommentBlock';

function ProductsRender({ data, extensionAttributes, productId, commonData, brand, category, brandID }) {
  const [showDes, setShowDes] = useState(true);
  useEffect(() => {
    if (data && data.length > 0) {
      let isShow = false;
      const found = data.find((element) => element.attribute_code == 'description');
      if (
        data.find((element) => element.attribute_code == 'description') ||
        data.find((element) => element.attribute_code == 'specification') ||
        data.find((element) => element.attribute_code == 'catalogue') ||
        data.find((element) => element.attribute_code == 'typical_projects')
      ) {
        isShow = true;
      }
      setShowDes(isShow);
    }
  }, [data]);
  return (
    <>
      <section className='r3 sec-b'>
        {showDes && (
          <div className=' entry-head lazy-hidden ef ef-tx-t'>
            <h2 className='ht'>{t('product_info')}</h2>
          </div>
        )}
        <div className='row'>
          <div className='col-md-8'>
            {showDes && <Description data={data} />}
            <br />
            <ReviewBlock data={extensionAttributes.review} productId={productId} isDetail={true} />
            <CommentBlock data={extensionAttributes.review} productId={productId} />
            {commonData && commonData.questions && <Question commonData={commonData} productId={productId} />}
          </div>
          <div className='col-md-4 r3-c2'>
            <CommonData data={data} category={category} brand={brand} brandID={brandID} />
          </div>
        </div>
      </section>
      <ViewedProduct />
    </>
  );
}

export default ProductsRender;
