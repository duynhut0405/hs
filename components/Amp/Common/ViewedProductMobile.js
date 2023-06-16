import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProductMobile from './../Common/ProductMobile';
import api from '../../../services/api';

function ViewedProductMobile({}) {
  const [dataString, setDataString] = useState(typeof window !== 'undefined' ? localStorage.getItem('viewed') : null);
  const [data, setData] = useState(null);
  const router = useRouter();
  const [configPrice, setConfigPrice] = useState(null);

  useEffect(async () => {
    let base_url = process.env.DOMAIN_IMAGE + 'catalog/product/';
    if (localStorage.getItem('viewed')) {
      let points = JSON.parse(localStorage.getItem('viewed'));

      let products_list = [];
      points.forEach((element) => {
        let file = process.env.EMPTY_IMG;
        // var rating = 0;
        if (element.image) {
          file = base_url + element.image;
        }
        products_list.push({
          entity_id: element.id,
          request_path: element.url,
          image: file,
          name: element.name,
          rating_summary: element.review,
          min_price: element.price,
          price: element.basePrice,
          priceGroup: element.priceGroup,
        });
      });

      setData(products_list);
      try {
        const result = await api.get('/service/stores/home-content');
        setConfigPrice(result.data[0].config);
      } catch (error) {
        console.log(error);
      }
    }
  }, [dataString, router.asPath]);

  return (
    <>
      {data && (
        <div className='pd-15  sec-bd-bottom lazy-hidden group-ef'>
          <h2 className='efch-1 ef-tx-t'> Sản phẩm đã xem </h2>
          <div className='list-scroll-150  list-p-1'>
            {data != undefined &&
              data.map((item, index) => (
                <div className={`col-6 efch-${index} ef-img-t`} key={index}>
                  <ProductMobile data={item} dataIndex={index} configPrice={configPrice} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ViewedProductMobile;
