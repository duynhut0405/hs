import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/auth';
import api from '../services/api';

export default function addOne() {
  const { isAuthenticated, user, setLocationData } = useAuth();
  const route = useRouter();

  const getData = () => {
    const params = route?.query;
    let data = {};
    if (params.product_type === 'simple') {
      data = {
        cartItem: {
          sku: params.sku,
          qty: Number(params.qty),
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
          sku: params.sku,
          qty: Number(params.qty),
          product_option: {
            extension_attributes: {
              configurable_item_options: [
                {
                  option_id: params.option_id,
                  option_value: params.option_value,
                },
              ],
              is_buy_latter: false,
            },
          },
        },
      };

      if (params?.paint_color) {
        data.cartItem.product_option.extension_attributes['paint_color'] = params?.paint_color;
      }

      if (params?.length) {
        data.cartItem.product_option.extension_attributes['advanced_quantity'] = [
          {
            data: {
              qty: Number(params.qty),
              length: Number(params.length),
            },
          },
        ];
        data.cartItem.qty = 1;
      }
    }
    return data;
  };

  const onAddUser = async (data) => {
    try {
      const result = await api.post('service/carts/mine/items', data);
      if (result) {
        console.log('🚀  Thêm vào giỏ hàng thành công');
        alert('Thành công');
        route.push('/cart');
      } else {
        console.log('🚀  Thêm vào giỏ hàng thất bại', data);
        alert('Thất bại');
      }
    } catch (err) {
      console.log('🚀 ~ file: add-to-cart.js ~ line 73 ~ onAddUser ~ err', err);
    }
  };

  const onAddGuest = async (data) => {
    const guestId = Cookies.get('cardId');
    if (guestId) {
      try {
        const result = await api.post(`/guest-carts/${guestId}/items`, data);
        if (result) {
          console.log('🚀  Thêm vào giỏ hàng thành công');
          alert('Thành công');
          route.push('/cart');
        } else {
          console.log('🚀  Thêm vào giỏ hàng thất bại', data);
          alert('Thất bại');
        }
      } catch (err) {
        console.log('🚀 ~ file: add-to-cart.js ~ line 88 ~ onAddGuest ~ err', err);
      }
    } else {
      try {
        delete api.defaults.headers.Authorization;
        delete api.defaults.headers.Cookie;
        const result = await api.post('/guest-carts');
        Cookies.set('cardId', result.data, { expires: 7 });
        if (result?.data) {
          const rs = await api.post(`/guest-carts/${result.data}/items`, data);
          if (rs) {
            console.log('🚀  Thêm vào giỏ hàng thành công');
            alert('Thành công');
            route.push('/cart');
          } else {
            console.log('🚀  Thêm vào giỏ hàng thất bại', data);
            alert('Thất bại');
          }
        }
      } catch (error) {
        console.log('🚀 ~ file: add-to-cart.js ~ line 117 ~ onAddGuest ~ error', error);
      }
    }
  };

  const setLocation = async () => {
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

    if (isAuthenticated) {
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
        console.log('🚀 ~ file: add-to-cart.js ~ line 172 ~ setLocation ~ error', error);
        return false;
      }
    } else {
      const cardId = Cookies.get('cardId');
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
          console.log('🚀 ~ file: add-to-cart.js ~ line 201 ~ setLocation ~ error', error);
          return false;
        }
      }
    }
  };

  useEffect(() => {
    console.log('🚀 ~ file: add-to-cart.js ~ line 197 ~ addCart ~ route?.query', route?.query);
    async function addCart() {
      if (route?.query?.sku) {
        const data = getData();
        console.log('🚀 ~ file: add-to-cart.js ~ line 212 ~ addCart ~ data', data);
        const params = route?.query;
        if (params?.city_value && params?.city_label && params?.city_fullname && params?.district_value && params?.district_label && params?.district_fullname && params?.ward_value && params?.ward_label && params?.ward_fullname) {
          const result = setLocation();
          if (result) {
            if (Cookies.get('token')) {
              onAddUser(data);
            } else {
              onAddGuest(data);
            }
          }
        } else {
          alert('Sai thông tin Khu vực');
        }
      }
    }

    addCart();
  }, [route?.query]);
  return <p>ADD SIMPLE</p>;
}
