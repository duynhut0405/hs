import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useCommon } from '../contexts/common';

export default function addList() {
  const { setLocationData } = useCommon();
  const [listProduct, setListProduct] = useState({});
  const route = useRouter();
  const getData = () => {
    const params = route?.query;
    const count = route.query.count;
    let arrProduct = [];
    let paint_color = [];
    let length = [];
    let option_id = [];
    let option_value = [];
    let extra_infor = [];
    const product_type = params.product_type.split(',');
    const sku = params.sku.split(',');
    const qty = params.qty.split(',');

    if (params?.option_id && params?.option_value) {
      option_id = params.option_id.split(',');
      option_value = params.option_value.split(',');
    }
    if (params?.paint_color) {
      paint_color = params?.paint_color.split(',');
    }
    if (params?.length) {
      length = params.length.split(',');
    }
    if (params?.extra_infor) {
      extra_infor = params.extra_infor.split(',');
    }
    const list = {};
    for (let i = 0; i < count; i++) {
      list[i] = {
        status: -1,
        product_type: product_type[i],
        sku: sku[i],
      };
      let data = {};
      if (product_type[i] === 'simple') {
        data = {
          cartItem: {
            sku: sku[i],
            qty: Number(qty[i]),
            product_option: {
              extension_attributes: {
                is_buy_latter: false,
              },
            },
          },
        };
      } else {
        data = {
          cartItem: {
            sku: sku[i],
            qty: Number(qty[i]),
            product_option: {
              extension_attributes: {
                configurable_item_options: [
                  {
                    option_id: option_id[i],
                    option_value: option_value[i],
                  },
                ],
                is_buy_latter: false,
              },
            },
          },
        };
      }

      if (paint_color && paint_color?.length !== 0 && paint_color?.[i] && paint_color?.[i] !== '-1') {
        data.cartItem.product_option.extension_attributes['paint_color'] = paint_color[i];
      }

      if (length && length?.length !== 0 && length?.[i] && length?.[i] !== '-1') {
        data.cartItem.product_option.extension_attributes['advanced_quantity'] = [
          {
            data: {
              qty: Number(qty[i]),
              length: Number(length[i]),
            },
          },
        ];
        data.cartItem.qty = 1;
      }

      if (extra_infor && extra_infor?.length !== 0 && extra_infor?.[i] && extra_infor?.[i] !== '-1') {
        data.cartItem.product_option.extension_attributes['extra_info'] = extra_infor?.[i];
      }

      arrProduct.push(data);
    }

    // setListProduct(list);
    return [arrProduct, list];
  };

  const onCreateGuest = async () => {
    delete api.defaults.headers.Authorization;
    delete api.defaults.headers.Cookie;
    const result = await api.post('/guest-carts');
    Cookies.set('cardId', result.data, { expires: 7 });
    return result.data;
  };

  const onAddUser = async (data, list) => {
    try {
      const copy = JSON.parse(JSON.stringify(list));
      let i = 0;
      for (let item of data) {
        try {
          const result = await api.post('service/carts/mine/items', item);
          if (result) {
            // console.log('🚀  Thêm vào giỏ hàng thành công');
            // copy[i].status = true;
            // copy[i].message = 'Sản phẩm đã được thêm thành công vào giỏ hàng';
          } else {
            // console.log('🚀  Thêm vào giỏ hàng thất bại', item);
            // copy[i].status = false;
            // copy[i].message = 'Sản phẩm đã thêm vào giỏ hàng thất bại';
          }
        } catch (err) {
          if (err.response?.data?.message) {
            console.log('🚀 ~ err 101', err.response?.data?.message);
            alert(err.response?.data?.message);
            copy[i].status = false;
            copy[i].message = err.response?.data?.message;
          } else {
            copy[i].status = false;
            alert('Sản phẩm đã thêm vào giỏ hàng thất bại');
            copy[i].message = 'Sản phẩm đã thêm vào giỏ hàng thất bại';
          }
        }

        // setListProduct({ ...copy });
        // i++;
      }
      route.push('/cart');
    } catch (err) {
      console.log('🚀 onAddUser', err);
      alert('Thất bại');
    }
  };

  const onAddGuest = async (data, list) => {
    const guestId = Cookies.get('cardId');
    console.log('🚀 ~ file: add-list.js:153 ~ onAddGuest ~ guestId', guestId);
    if (guestId) {
      try {
        const copy = JSON.parse(JSON.stringify(list));
        let i = 0;
        for (let item of data) {
          try {
            const result = await api.post(`/guest-carts/${guestId}/items`, item);
            if (result) {
              // console.log('🚀  Thêm vào giỏ hàng thành công');
              // copy[i].status = true;
              // copy[i].message = 'Sản phẩm đã được thêm thành công vào giỏ hàng';
            } else {
              // console.log('🚀  Thêm vào giỏ hàng thất bại', item);
              // copy[i].status = false;
              // copy[i].message = 'Sản phẩm đã thêm vào giỏ hàng thất bại';
            }
          } catch (err) {
            if (err.response?.data?.message) {
              console.log('🚀 ~ err 101', err.response?.data?.message);
              alert(err.response?.data?.message);
              copy[i].status = false;
              copy[i].message = err.response?.data?.message;
            } else {
              copy[i].status = false;
              alert('Sản phẩm đã thêm vào giỏ hàng thất bại');
              copy[i].message = 'Sản phẩm đã thêm vào giỏ hàng thất bại';
            }
          }

          // setListProduct({ ...copy });
          // i++;
        }

        route.push('/cart');
      } catch (err) {
        console.log('🚀 onAddUser 133', err);
        alert('Thất bại');
      }
    }
  };

  const setLocation = async (isLogin) => {
    const params = route?.query;
    let data = {
      city: {
        value: params.city_value,
        label: params.city_label,
        country_id: 'VN',
        full_name: params.city_fullname,
      },
      district: {
        value: params.district_value,
        label: params.district_label,
        city_id: params.city_value,
        full_name: params.district_fullname,
      },
      ward: {
        value: params.ward_value,
        label: params.ward_label,
        city_id: '',
        full_name: params.ward_fullname,
        district_id: params.district_value,
      },
    };

    if (isLogin) {
      try {
        const result = await api.post('/carts/mine/location/shipping-address', {
          shippingAddress: {
            countryId: 'VN',
            customAttributes: [
              { attribute_code: 'ward_id', value: `${params.ward_value}` },
              { attribute_code: 'ward', value: `${params.ward_label}` },
              { attribute_code: 'district_id', value: `${params.district_value}` },
              { attribute_code: 'district', value: `${params.district_label}` },
              { attribute_code: 'city_id', value: `${params.city_value}` },
            ],
            city: `${params.city_label}`,
          },
        });

        if (result) {
          Cookies.set('location-data', data);
          setLocationData(data);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log('🚀  setLocation 198', error);
        return false;
      }
    } else {
      let cardId = Cookies.get('cardId');

      if (!cardId) {
        cardId = await onCreateGuest();
      }

      if (cardId) {
        try {
          const result = await api.post(`/guest-carts/${cardId}/location/shipping-address`, {
            shippingAddress: {
              countryId: 'VN',
              customAttributes: [
                { attribute_code: 'ward_id', value: `${params.ward_value}` },
                { attribute_code: 'ward', value: `${params.ward_label}` },
                { attribute_code: 'district_id', value: `${params.district_value}` },
                { attribute_code: 'district', value: `${params.district_label}` },
                { attribute_code: 'city_id', value: `${params.city_value}` },
              ],
              city: `${params.city_label}`,
            },
          });

          if (result) {
            Cookies.set('location-data', data);
            setLocationData(data);
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log('🚀 setLocation 223', error);
          return false;
        }
      }
    }
  };

  useEffect(() => {
    const checkLogin = Cookies.get('token') ? true : false;
    if (route?.query?.length !== 0) {
      console.log('🚀 ~ file: add-list.js ~ line 274 ~ useEffect ~ route?.query', route?.query);
      async function addCart() {
        if (route?.query?.count) {
          const data = getData()[0];
          const list = getData()[1];
          const params = route?.query;
          if (params?.city_value && params?.city_label && params?.city_fullname && params?.district_value && params?.district_label && params?.district_fullname && params?.ward_value && params?.ward_label && params?.ward_fullname) {
            const result = await setLocation(checkLogin);
            if (result) {
              if (Cookies.get('token')) {
                onAddUser(data, JSON.parse(JSON.stringify(list)));
              } else {
                onAddGuest(data, JSON.parse(JSON.stringify(list)));
              }
            }
          } else {
            alert('Sai thông tin Khu vực');
          }
        }
      }

      addCart();
    }
  }, [route?.query]);

  // const _renderItem = (sku, product_type, status, message) => {
  //   console.log('🚀 ~ file: add-list.js:368 ~ addList ~ status', status);
  //   return (
  //     <div className={`item ${status === -1 && 'loading'}`}>
  //       <a className='img tRes_68'>
  //         <img src={'https://hoasenhome.vn/images/logo.svg'}></img>
  //       </a>

  //       <div className='divtext'>
  //         {/* <a className='review' onClick={() => {}}>
  //           Xoá
  //         </a> */}
  //         <div className='line-3 title'>
  //           <span>
  //             SKU : <strong>{sku}</strong>
  //           </span>
  //         </div>
  //         <div className='price'>
  //           <span>
  //             Product Type : <strong>{product_type}</strong> <br />
  //           </span>
  //         </div>
  //         <div className='action'>
  //           <a className={`cart ${status !== -1 && status ? 'green' : 'red'}`}>{message}</a>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <section className={`sec-h-3 sec-b lazy-hidden group-ef`}>
      {/* <div className='container'>
        <div>
          <div className='box-shadow box-product mb-20'>
            <h6 className='box-title-3'>Danh sách sản phẩm thêm vào giỏ hàng</h6>
            <div className='list-p-3'>
              {listProduct &&
                Object.keys(listProduct).map((item, i) => {
                  return _renderItem(listProduct[item]?.sku, listProduct[item]?.product_type, listProduct[item]?.status, listProduct[item]?.message);
                })}
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
