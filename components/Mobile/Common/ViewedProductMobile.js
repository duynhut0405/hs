import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ViewedProductItem from '../../Desktop/Common/ViewedProductItem';
import api from '../../../services/api';
import Cookie from 'js-cookie';

function ViewedProductMobile({}) {
  const [dataString, setDataString] = useState(typeof window !== 'undefined' ? localStorage.getItem('viewed') : '');
  const [data, setData] = useState(null);
  const router = useRouter();
  const [configPrice, setConfigPrice] = useState(null);

  useEffect(async () => {
    if (localStorage.getItem('viewed')) {
      let points = JSON.parse(localStorage.getItem('viewed'));
      setData(points);
      let allProductIdString = '';
      points.map((item, index) => (allProductIdString += item.id + ','));
      let cityID = null;
      if (Cookie.get('location-data')) {
        const locationData = JSON.parse(Cookie.get('location-data'));
        cityID = locationData?.city?.value;
      }

      try {
        const result = await api.get(`service/product-information?city=${cityID}&product_ids=${allProductIdString}`);
        if (result.status == 200) {
          const price = result.data[0];
          points.forEach((element) => {
            if (price[element.id]) {
              element.regular_price = price[element.id].regular_price;
              element.final_price = price[element.id].final_price;
            }
          });
        }
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
            {data.map((item, index) => (
              <div className='col-lg-2  col-4 ' key={index}>
                <ViewedProductItem item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ViewedProductMobile;
