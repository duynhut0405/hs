import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import ShowStar from '../Review/ShowStar';
import { useRouter } from 'next/router';
import ViewedProductItem from './ViewedProductItem';
import api from '../../../services/api';
import Cookie from 'js-cookie';

function ViewedProduct({}) {
  const [dataString, setDataString] = useState(typeof window !== 'undefined' ? localStorage.getItem('viewed') : '');
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    if (localStorage.getItem('viewed')) {
      let points = JSON.parse(localStorage.getItem('viewed'));
      setData(points);
      let allProductIdString = '';
      points.map((item, index) => (allProductIdString += item.id + ','));
      try {
        if (!Cookie.get('location-data')) return;
        const locationData = JSON.parse(Cookie.get('location-data'));
        let cityID = locationData.city.value;
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
        <section className=' sec-tb'>
          <div className=' entry-head'>
            <h2 className='ht'>Sản phẩm đã xem</h2>
          </div>
          <div className='row  list-item list-p-1'>
            {data.map((item, index) => (
              <div className='col-lg-2  col-4 ' key={index}>
                <ViewedProductItem item={item} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default ViewedProduct;
