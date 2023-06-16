import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import ShowStar from '../Review/ShowStar';
import { useRouter } from 'next/router';
import ViewedProductItem from '../Common/ViewedProductItem';

function RelatedProduct({}) {
  const [dataString, setDataString] = useState(typeof window !== 'undefined' ? localStorage.getItem('viewed') : null);
  const [data, setData] = useState(null);
  const router = useRouter();
  const [configPrice, setConfigPrice] = useState(null);

  useEffect(async () => {
    if (localStorage.getItem('viewed')) {
      let points = JSON.parse(localStorage.getItem('viewed'));
      setData(points);
    }
    try {
      const result = await api.get('/service/stores/home-content');
      setConfigPrice(result.data[0].config);
    } catch (error) {
      console.log(error);
    }
  }, [dataString, router.asPath]);
  return (
    <>
      {data && (
        <section className=' sec-h-3 sec-b  group-ef loaded'>
          <div className='container'>
            <div className=' entry-head lazy-hidden ef ef-tx-t'>
              <h2 className='ht'>Sản phẩm đã xem</h2>
            </div>
            <div className='row  list-item list-p-1'>
              {data.map((item, index) => (
                <div className='col-lg-2  col-4 ' key={index}>
                  <ViewedProductItem item={item} configPrice={configPrice} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default RelatedProduct;
