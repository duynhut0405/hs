import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../Layout';
import api from '../../../services/api';
import BreadCrumb from '../Common/BreadCrumb';
import formatVND from '../../../utils/formatVND';
import Cookies from 'js-cookie';
import CheckoutCategory from './CheckoutCategory';
import { useAuth } from '../../../contexts/auth';
import { useCommon } from '../../../contexts/common';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { func } from 'prop-types';

const initCity = {
  value: '',
  label: 'Tất cả Tỉnh/Thành Phố',
  country_id: 'VN',
};

const initDistrict = {
  value: '',
  label: 'Tất cả Quận Huyện',
  city_id: '',
};

const initWard = {
  value: '',
  label: 'Tất cả Phường/Xã',
  city_id: '',
};

function CheckoutUser({}) {
  const router = useRouter();
  const [currentCart, setCurrentCart] = useState(null);
  const [listProductErr, setListProductErr] = useState([]);
  const [store, setStore] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [total, setTotal] = useState(0);
  const [notConfirm, setNotConfirm] = useState(true);
  const [currentCartInfo, setCurrentCartInfo] = useState(null);
  const [state, setState] = useState(null);
  const [cities, setCites] = useState(null);
  const [districts, setDistricts] = useState([initDistrict]);
  const [wards, setWards] = useState([initWard]);
  const [currentCity, setCurrentCity] = useState(initCity);
  const [currentDistrict, setCurrentDistrict] = useState(initDistrict);
  const [currentWard, setCurrentWard] = useState(initWard);
  const { user, setGetCartAgain } = useAuth();
  const [isAdding, setAdding] = useState(false);
  const [hasShippingAddress, setHasShippingAddress] = useState(false);
  const { location } = useCommon();
  const [commonState, setCommonState] = useState(null);
  const [shippingMethods, setShippingMethods] = useState(null);
  const [currentShippingMethod, setCurrentShippingMethod] = useState(null);
  const [paymentMethodList, setPaymentMethod] = useState(null);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [caculatedResult, setCaculatedResult] = useState(null);
  const [isCaculating, setCaculating] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const getCart = async () => {
    try {
      const result = await api.get('carts/mine');
      setCurrentCart(result.data.items);
      setTotal(result.data.items.length);
      setCurrentCartInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    //await deleteCart();
    await getCart();
    setGetCartAgain(true);
  }, []);

  useMemo(() => {
    if (currentCity?.value) {
      getInventoryCity();
    }
  }, [currentCity?.value]);

  useMemo(() => {
    // find all category
    let data = [];
    if (currentCart) {
      currentCart.forEach((element) => {
        let item = element.extension_attributes.category;
        if (!data.includes(item)) {
          data.push(item);
        }
      });
    }

    // push to an object of categories
    let categories = {};
    data.forEach((element) => {
      categories[element] = [];
    });

    //find all product and set to categories
    if (currentCart) {
      let totalProduct = 0;
      currentCart.forEach((element) => {
        let category = element.extension_attributes.category;
        if (categories[category] && element.extension_attributes.is_buy_latter == 0) {
          categories[category].push(element);
          totalProduct++;
        }
        setTotal(totalProduct);
      });
    }

    Object.keys(categories).forEach(function (key) {
      if (categories[key].length == 0) {
        delete categories[key];
      }
    });
    if (currentCart && Object.keys(categories).length === 0) {
      alert('Hãy chọn sản phẩm trong giỏ hàng');
      window.location.href = '/cart';
      return;
    }

    setState(categories);
  }, [currentCart]);

  async function getInventoryItems(store_id) {
    try {
      if (!store_id) return;
      const findStore = store.find((item) => item.store_code === store_id);
      setCurrentStore(findStore.name + ' - ' + findStore.address?.replace(new RegExp(process.env.REPLACE_LOCATION, 'g'), '') + (findStore?.phone ? ' - ' + findStore?.phone : ''));
      if (currentCart) {
        const err = [];
        await Promise.all(
          currentCart?.map(async (item) => {
            if (item.price === 0) return;
            const result = await api.get(`/ERPIntegration/inventory/getAvailableStore?city_id=${currentCity?.value}&district_id=${currentDistrict.value}&sku=${item.sku}`, {
              headers: {
                Authorization: 'bearer g7gb07cmsfdthk70re1eop4mapg17jum',
              },
            });
            if (result.data.status === '400') err.push(item.name);
            if (result.data.status === '200') {
              const find = result.data.result_data.find((item) => item.store_code === store_id);
              if (Number(item.qty) > Number(find?.total_quantity_primary) || !find) {
                err.push(item.name);
              }
            }
          })
        );
        if (err?.length > 0) setListProductErr([...err]);
        else setListProductErr([]);
      }
    } catch (err) {
      console.log('🚀 ~ file: ProductInfor.js:37 ~ getInventory ~ err', err);
    }
  }

  async function getInventoryCity() {
    try {
      const result = await api.get(`/ERPIntegration/inventory/getAvailableStore?city_id=${currentCity?.value}&district_id=${currentDistrict.value}`, {
        headers: {
          Authorization: 'bearer g7gb07cmsfdthk70re1eop4mapg17jum',
        },
      });

      if (result?.data?.status === '200') {
        setStore(result?.data?.result_data);
      }
    } catch (err) {
      console.log('🚀 getInventory ~ err', err);
    }
  }
  // Find the shipping for this checkout
  useEffect(async () => {
    if (hasShippingAddress && commonState.id && currentCartInfo) {
      await setTotalAgain();
      await estimateShippingAddressById();
      if (currentCartInfo.items.length == 0) {
        alert('Hãy chọn sản phẩm để thanh toán');
        router.back();
      }
    }
  }, [currentCartInfo]);

  // Find the payment for this checkout
  useEffect(async () => {
    if (currentShippingMethod) {
      await getPaymentMethod();
    }
  }, [currentShippingMethod]);

  const getPaymentMethod = async () => {
    try {
      const result = await api.get('carts/mine/payment-methods');
      setPaymentMethod(result.data);
      let lastPaymentmethod = Cookies.get('currentUserPayment');
      if (lastPaymentmethod && JSON.parse(lastPaymentmethod)) {
        setCurrentPayment(JSON.parse(lastPaymentmethod));
      } else {
        setCurrentPayment(result.data[0]);
        Cookies.set('currentUserPayment', result.data[0]);
      }
    } catch (error) {
      throw error;
    }
  };

  const estimateShippingAddressById = async () => {
    try {
      const result = await api.post('/carts/mine/estimate-shipping-methods-by-address-id', {
        addressId: commonState.id,
      });
      setShippingMethods(result.data);
      if (!currentCartInfo.extension_attributes.shipping_assignments[0]) {
        setCurrentShippingMethod(result.data[0]);
        changeShippingMethod(result.data[0]);
        await setTotalAgain();
        return;
      }
      let method = currentCartInfo.extension_attributes.shipping_assignments[0].shipping.method;
      if (method != null) {
        result.data.forEach((element) => {
          if (`${element.method_code}_${element.carrier_code}` == method) {
            console.log(element);
            setCurrentShippingMethod(element);
            changeShippingMethod(element);
          }
        });
      } else {
        setCurrentShippingMethod(result.data[0]);
        changeShippingMethod(result.data[0]);
      }
    } catch (error) {
      throw error;
    }
    await setTotalAgain();
  };

  const changeShippingMethod = async (item) => {
    setCurrentShippingMethod(item);
    setListProductErr([]);
    setCurrentStore(null);
    try {
      const result = await api.post(`carts/mine/shipping-information`, {
        addressInformation: {
          shipping_address: {
            city: currentCity.label,
            company: null,
            countryId: 'VN',
            customAttributes: [
              { attribute_code: 'ward_id', value: currentWard.value },
              { attribute_code: 'ward', value: currentWard.label },
              { attribute_code: 'district_id', value: currentDistrict.value },
              { attribute_code: 'district', value: currentDistrict.label },
              { attribute_code: 'city_id', value: currentCity.value },
            ],
            customerAddressId: commonState.id,
            customerId: user.id,
            fax: null,
            firstname: commonState.firstname,
            lastname: commonState.lastname,
            middlename: null,
            postcode: '12345',
            prefix: null,
            region: null,
            regionCode: null,
            saveInAddressBook: null,
            street: commonState.street,
            suffix: null,
            telephone: commonState.telephone,
            vatId: null,
          },
          shipping_carrier_code: item.method_code,
          shipping_method_code: item.carrier_code,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const setPayment = async (item) => {
    setCurrentPayment(item);
    Cookies.set('currentUserPayment', item);
  };

  const setTotalAgain = async () => {
    try {
      setCaculating(true);
      try {
        const result = await api.post(`carts/mine/totals-information`, {
          addressInformation: {
            address: {
              countryId: 'VN',
              city: currentCity.label,
              extension_attributes: {
                advanced_conditions: {
                  billing_address_country: null,
                  city: currentCity.label,
                  currency: 'VND',
                  payment_method: currentPayment ? currentPayment.code : null,
                  shipping_address_line: commonState.street,
                },
              },
              postcode: null,
              region: null,
            },
            shipping_carrier_code: currentShippingMethod ? currentShippingMethod.carrier_code : null,
            shipping_method_code: currentShippingMethod ? currentShippingMethod.method_code : null,
            extension_attributes: {
              payment_method: currentPayment ? currentPayment.code : null,
            },
          },
        });
        setCaculatedResult(result.data);
        setCaculating(false);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  const setLocationDefault = (currentLocation) => {
    setCurrentCity({
      value: currentLocation.city.value,
      label: currentLocation.city.label,
      full_name: currentLocation.city.full_name,
      country_id: 'VN',
    });
    const findingDistricts = location.districts.filter((district) => district.city_id == currentLocation.city.value);
    setDistricts(findingDistricts);
    setCurrentDistrict({
      value: currentLocation.district.value,
      label: currentLocation.district.label,
      full_name: currentLocation.district.full_name,
    });

    const findingWards = location.wards.filter((ward) => ward.district_id == currentLocation.district.value);
    setWards(findingWards);
    setCurrentWard({
      value: currentLocation.ward.value,
      label: currentLocation.ward.label,
      full_name: currentLocation.ward.full_name,
    });
  };

  useEffect(() => {
    if (user != undefined && location) {
      const shippingAddress = user.addresses.find((element) => element.default_shipping);
      setCites(location.cites);
      if (shippingAddress != undefined && Cookies.get('location-data')) {
        const locationData = Cookies.get('location-data');
        const currentLocation = JSON.parse(locationData);
        if (
          currentLocation.city.value == shippingAddress.custom_attributes.city_id.value &&
          currentLocation.district.value == shippingAddress.custom_attributes.district_id.value &&
          currentLocation.ward.value == shippingAddress.custom_attributes.ward_id.value
        ) {
          setCurrentCity({
            value: shippingAddress.custom_attributes.city_id.value,
            label: shippingAddress.city,
            country_id: 'VN',
            full_name: shippingAddress.city,
          });

          const findingDistricts = location.districts.filter((district) => district.city_id == shippingAddress.custom_attributes.city_id.value);
          setDistricts(findingDistricts);
          setCurrentDistrict({
            value: shippingAddress.custom_attributes.district_id.value,
            label: shippingAddress.custom_attributes.district.value,
            full_name: shippingAddress.custom_attributes.district.value,
          });

          const findingWards = location.wards.filter((ward) => ward.district_id == shippingAddress.custom_attributes.district_id.value);
          setWards(findingWards);
          setCurrentWard({
            value: shippingAddress.custom_attributes.ward_id.value,
            label: shippingAddress.custom_attributes.ward.value,
            full_name: shippingAddress.custom_attributes.ward.value,
          });
        } else {
          setLocationDefault(currentLocation);
        }
        let data = {
          ...commonState,
          id: shippingAddress.id,
          firstname: shippingAddress.firstname,
          lastname: shippingAddress.lastname,
          country_id: shippingAddress.country_id,
          street: shippingAddress.street,
          telephone: shippingAddress.telephone,
          city: shippingAddress.city,
          default_billing: false,
          default_shipping: true,
          custom_attributes: {
            city_id: shippingAddress.custom_attributes.city_id.value,
            district: shippingAddress.custom_attributes.district.value,
            district_id: shippingAddress.custom_attributes.district_id.value,
            ward: shippingAddress.custom_attributes.ward.value,
            ward_id: shippingAddress.custom_attributes.ward_id.value,
          },
        };
        if (locationData) {
          if (
            currentLocation.city.value == shippingAddress.custom_attributes.city_id.value &&
            currentLocation.district.value == shippingAddress.custom_attributes.district_id.value &&
            currentLocation.ward.value == shippingAddress.custom_attributes.ward_id.value
          ) {
            setCommonState(data);
            setHasShippingAddress(true);
          } else {
            let dataNew = {
              ...commonState,
              id: null,
              firstname: '',
              lastname: '',
              country_id: 'VN',
              street: [],
              telephone: '',
              city: currentLocation.city.full_name,
              default_billing: false,
              default_shipping: true,
              custom_attributes: {
                city_id: currentLocation.city.value,
                district: currentLocation.district.full_name,
                district_id: currentLocation.district.value,
                ward: currentLocation.ward.full_name,
                ward_id: currentLocation.ward.value,
              },
            };
            setCommonState(dataNew);
            setHasShippingAddress(false);
          }
        }
      } else {
        const locationData = Cookies.get('location-data');
        if (locationData) {
          const currentLocation = JSON.parse(locationData);
          setLocationDefault(currentLocation);
          let dataNew = {
            ...commonState,
            id: null,
            firstname: '',
            lastname: '',
            country_id: 'VN',
            street: [],
            telephone: '',
            city: currentLocation.city.full_name,
            default_billing: false,
            default_shipping: true,
            custom_attributes: {
              city_id: currentLocation.city.value,
              district: currentLocation.district.full_name,
              district_id: currentLocation.district.value,
              ward: currentLocation.ward.full_name,
              ward_id: currentLocation.ward.value,
            },
          };
          setCommonState(dataNew);
          setHasShippingAddress(false);
          setAdding(true);
          return;
        }
        let data = {
          ...commonState,
          id: null,
          firstname: '',
          lastname: '',
          country_id: 'VN',
          street: [],
          telephone: '',
          city: '',
          default_billing: false,
          default_shipping: true,
          custom_attributes: {
            city_id: '',
            district: '',
            district_id: '',
            ward: '',
            ward_id: '',
          },
        };
        setCommonState(data);
        setHasShippingAddress(false);
        setAdding(true);
      }
    }
  }, [user, location]);

  useEffect(async () => {
    if (commonState && currentShippingMethod) {
      await setTotalAgain();
    }
  }, [currentShippingMethod]);

  useEffect(async () => {
    if (currentPayment && currentPayment.code) {
      await setTotalAgain();
    }
  }, [currentPayment]);

  const removeCoupon = async () => {
    try {
      const result = await api.delete(`carts/mine/coupons`);
      if (result.status == 200) {
        setTotalAgain();
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  const submit = async (formData) => {
    let lname = formData.fullname.substr(0, formData.fullname.indexOf(' '));
    let fname = formData.fullname.substr(formData.fullname.indexOf(' ') + 1);
    const cityObj = await cities.find((city) => city.value == formData.city);
    const districtObj = await districts.find((district) => district.value == formData.district);
    const wardObj = await wards.find((ward) => ward.value == formData.ward);

    let data = {
      ...commonState,
      firstname: fname,
      lastname: lname,
      city: cityObj.full_name,
      custom_attributes: {
        city_id: cityObj.value,
        district: districtObj.full_name,
        district_id: districtObj.value,
        ward: wardObj.full_name,
        ward_id: wardObj.value,
      },
      street: [formData.street],
      telephone: formData.telephone,
    };
    delete data.fullname;
    let data2 = {
      city: currentCity,
      district: currentDistrict,
      ward: currentWard,
    };
    Cookies.set('location-data', data2);
    try {
      const result = await api.post('service/customers/address', { address: data });
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const changeCity = async (e) => {
    const found = await cities.find((city) => city.value == e.target.value);
    let data = {
      value: found.value,
      label: found.label,
      full_name: found.full_name,
    };
    setCurrentCity(data);

    // Find district
    const findingDistricts = location.districts.filter((district) => district.city_id == data.value || district.city_id == '');
    setDistricts(findingDistricts);
    const findingWards = location.wards.filter((ward) => ward.district_id == '');
    setWards(findingWards);
  };

  const changeDistrict = async (e) => {
    const found = await districts.find((district) => district.value == e.target.value);
    let data = {
      value: found.value,
      label: found.label,
      full_name: found.full_name,
      city_id: found.city_id,
    };
    setCurrentDistrict(data);

    // Find ward
    const findingWards = location.wards.filter((ward) => ward.district_id == data.value || ward.district_id == '');
    setWards(findingWards);
  };

  const changeWard = async (e) => {
    e.preventDefault();
    const found = await wards.find((ward) => ward.value == e.target.value);
    let data = {
      value: found.value,
      label: found.label,
      full_name: found.full_name,
      district_id: found.district_id,
    };
    setCurrentWard(data);
  };

  const applyCoupon = async () => {
    if (coupon.length > 0) {
      try {
        const result = await api.put(`/carts/mine/coupons/${coupon}`);
        setTotalAgain();
      } catch (error) {
        console.log(error.response);
        if (error.response.status == 404) {
          setCouponError('* Mã khuyến mãi không tồn tại');
        }
      }
    }
    if (coupon.length == 0) {
      setCouponError('* Hãy nhập mã khuyến mãi');
    }
  };

  const setNextConfirm = async () => {
    if (currentShippingMethod?.carrier_code === 'pickup' && !currentStore) {
      alert('Vui lòng chọn cửa hàng');
      return;
    }

    if (currentShippingMethod?.carrier_code === 'pickup' && listProductErr?.length > 0) {
      alert('Trong đơn hàng có sản phẩm không có sẵn tại của hàng. Vui lòng chọn giao hàng để đặt hàng.');
      return;
    }
    if (hasShippingAddress) {
      setNotConfirm(false);
    }
  };

  const setPayNow = async () => {
    let invalidItems = [];
    currentCart.forEach((element) => {
      if (element?.extension_attributes?.messages.length != 0 && element.extension_attributes.is_buy_latter == 0) {
        invalidItems.push(element.name);
      }
    });
    // if (invalidItems.length != 0) {
    //   let string = '';
    //   invalidItems.forEach((element, index) => {
    //     string = string + element + (index != (invalidItems.length - 1) ? ',' : '')
    //   });
    //   alert(
    //     `Xin lỗi quý khách. Sản phẩm :${string} hiện không đủ điều kiện thanh toán. Vui lòng bỏ chọn thanh toán sản phẩm nêu trên.`
    //   )
    //   router.push('/cart');
    //   return;
    // }
    let payMethod = currentPayment;
    setCaculating(true);
    if (payMethod.code == 'checkmo') {
      try {
        const result = await api.post(`carts/mine/payment-information`, {
          billingAddress: {
            email: commonState.email,
            city: currentCity.full_name,
            company: null,
            countryId: 'VN',
            customAttributes: [
              { attribute_code: 'ward_id', value: currentWard.value },
              { attribute_code: 'ward', value: currentWard.full_name },
              { attribute_code: 'district_id', value: currentDistrict.value },
              { attribute_code: 'district', value: currentDistrict.full_name },
              { attribute_code: 'city_id', value: currentCity.value },
            ],
            firstname: commonState.firstname,
            lastname: commonState.lastname,
            street: commonState.street,
            telephone: commonState.telephone,
          },
          customerAddressId: commonState.id,
          customerId: user.id,
          email: user.email,
          paymentMethod: {
            additional_data: null,
            method: 'checkmo',
            po_number: null,
          },
        });
        router.push(`/checkout/payment-success/${result.data}`);
      } catch (error) {
        alert(error.response.data.message);
        return;
      }
    } else {
      try {
        const result = await api.post(`carts/mine/set-payment-information`, {
          billingAddress: {
            city: currentCity.label,
            company: null,
            countryId: 'VN',
            customAttributes: [
              { attribute_code: 'ward_id', value: currentWard.value },
              { attribute_code: 'ward', value: currentWard.full_name },
              { attribute_code: 'district_id', value: currentDistrict.value },
              { attribute_code: 'district', value: currentDistrict.full_name },
              { attribute_code: 'city_id', value: currentCity.value },
            ],
            firstname: commonState.firstname,
            lastname: commonState.lastname,
            postcode: '12345',
            saveInAddressBook: null,
            street: commonState.street,
            suffix: null,
            telephone: commonState.telephone,
            vatId: null,
          },
          customerId: user.id,
          email: user.email,
          paymentMethod: {
            method: 'vnpay',
          },
        });
        if (result.data) {
          const result2 = await api.get(`carts/mine/vnpay?return=${encodeURI(window.location.href + '/payment-success')}`);
          document.location.href = result2.data;
        }
      } catch (error) {
        alert(error.response.data.message);
        return;
      }
    }
  };

  const setStateInput = async (e) => {
    e.persist();
    setCommonState({ ...commonState, fullname: e.target.value });
  };

  useEffect(() => {
    if (commonState && commonState.lastname && commonState.firstname && typeof commonState.fullname == 'undefined') {
      let newState = commonState;
      let fullname = commonState.lastname + ' ' + commonState.firstname;
      setCommonState({
        ...newState,
        fullname,
      });
    }
  }, [commonState]);

  return (
    <Layout>
      <BreadCrumb data={[{ name: 'Thanh toán', link: '/checkout', isActive: true }]} />
      <main className='sec-tb page-cart'>
        <div className='container'>
          <div className='entry-heading'>
            {notConfirm && (
              <div className='entry-heading'>
                <h1>
                  Thanh toán <span className='small'>({total} Sản phẩm)</span>
                </h1>
              </div>
            )}
            {!notConfirm && (
              <div className='entry-heading'>
                <h1>
                  Xác nhận <span className='small'>({total} Sản phẩm)</span>
                </h1>
              </div>
            )}
            {state && currentCartInfo && (
              <div className='row '>
                <div className='col-12 col-md-9'>
                  {hasShippingAddress && notConfirm && (
                    <div className=' box-product mb-20 box-confirm'>
                      {hasShippingAddress && commonState && (
                        <div className='box-shadow mb-20 box-cart-4'>
                          <h6 className='box-title-2'>Thông tin nhận hàng</h6>
                          <div className='pd-20'>
                            {commonState.lastname} {commonState.firstname} {commonState.telephone} <br />
                            {commonState.street}, {currentWard.label}, {currentDistrict.label}, {currentCity.label}
                          </div>
                          <div className='action'>
                            <a className='' href='#'>
                              Mặc định
                            </a>{' '}
                            |{' '}
                            <a
                              className=''
                              onClick={() => {
                                setHasShippingAddress(false);
                              }}
                            >
                              Đổi địa chỉ
                            </a>
                          </div>
                        </div>
                      )}
                      {shippingMethods && (
                        <div className='box-shadow mb-20 box-cart-3'>
                          <h6 className='box-title-2'>Hình thức vận chuyển</h6>
                          <div className='pd-20'>
                            <form>
                              {currentShippingMethod &&
                                shippingMethods.map((item, index) => (
                                  <label htmlFor={item.method_code} className='radio full' key={index}>
                                    <input name={item.method_code} type='radio' id={item.method_code} value={item.method_code} checked={item.method_code == currentShippingMethod.method_code} onChange={() => changeShippingMethod(item)} />
                                    <span></span>
                                    <img src='/images/svg/t11.svg' alt='' /> {item.method_title}
                                  </label>
                                ))}
                            </form>
                          </div>
                        </div>
                      )}
                      {currentShippingMethod?.carrier_code === 'pickup' && (
                        <div className='box-shadow mb-20 box-cart-3'>
                          <h6 className='box-title-2'>Cửa hàng</h6>
                          <div className='pd-20'>
                            <div className='row list-item-10'>
                              <div className='col-12'>
                                <select id='address_Store' className='select select-tinh' defaultValue={''} name='store' onChange={(e) => getInventoryItems(e.target.value)}>
                                  <option value={''}>Chọn cửa hàng</option>
                                  {store &&
                                    store.map((item, index) => (
                                      <option value={item.store_code} key={index}>
                                        {item.name?.split('-')[0]}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                            <p className='b mt-10'>{currentStore}</p>
                            {listProductErr?.length > 0 && currentStore ? <p className='red2'>Trong đơn hàng có sản phẩm không có sẵn tại của hàng. Vui lòng chọn giao hàng để đặt hàng.</p> : null}
                          </div>
                        </div>
                      )}
                      {paymentMethodList && (
                        <div className='box-shadow mb-20 box-cart-3'>
                          <h6 className='box-title-2'>Hình thức thanh toán</h6>
                          <div className='pd-20'>
                            {paymentMethodList.map((item, index) => (
                              <label className='radio full' key={index}>
                                <input name={item.code} type='radio' checked={currentPayment ? item.code == currentPayment.code : false} onChange={() => setPayment(item)} />
                                <span></span>
                                <img src='/images/svg/t11.svg' alt='' /> {item.title}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className='box-shadow mb-20 box-cart-3'>
                        <h6 className='box-title-2'>Danh sách sản phẩm</h6>
                        {Object.keys(state).map((item, index) => (
                          <CheckoutCategory data={state[item]} cate={item} key={index} />
                        ))}
                      </div>
                    </div>
                  )}
                  {hasShippingAddress && !notConfirm && (
                    <div className='box-shadow box-product mb-20 box-confirm '>
                      <div className='pd-20'>
                        <div className='mb-10 b w7'>Thông tin người nhận</div>
                        <div>
                          <span className='w5'>
                            {commonState.lastname} {commonState.firstname}
                          </span>{' '}
                          <br />
                          {commonState.telephone} <br />
                          {commonState.street}, {commonState.custom_attributes && commonState.custom_attributes.ward && commonState.custom_attributes.district && `${commonState.custom_attributes.ward}, ${commonState.custom_attributes.district}`},{' '}
                          {commonState.city}
                        </div>
                      </div>
                      <div className='pd-20'>
                        <div className='mb-10 b w7'>Hình thức vận chuyển</div>
                        <div>
                          <img src='/images/svg/t11.svg' alt='' /> &nbsp;
                          {currentShippingMethod.method_title}
                        </div>
                      </div>
                      {currentShippingMethod?.carrier_code === 'pickup' && (
                        <div className='pd-20'>
                          <div className='mb-10 b w7'>Cửa hàng</div>
                          <div>
                            <img src='/images/svg/t11.svg' alt='' /> &nbsp;
                            {currentStore}
                          </div>
                        </div>
                      )}
                      <div className='pd-20'>
                        <div className='mb-10 b w7'>Hình thức thanh toán</div>
                        <div>
                          <img src='/images/svg/t11.svg' alt='' /> &nbsp;
                          {currentPayment.title}
                        </div>
                      </div>
                      <div className='group-product'>
                        <h6 className='box-title-2'>Danh sách sản phẩm</h6>
                        {Object.keys(state).map((item, index) => (
                          <CheckoutCategory data={state[item]} cate={item} key={index} />
                        ))}
                        `
                      </div>
                    </div>
                  )}
                </div>
                {!hasShippingAddress && notConfirm && commonState && (
                  <div className='col-12 col-md-9'>
                    <div className='box-shadow mb-20 box-cart-5' style={{ display: 'block' }}>
                      <h6 className='box-title-2'>Thông tin nhận hàng</h6>
                      <form onSubmit={handleSubmit(submit)}>
                        <div className='pd-20'>
                          <div className='row list-item-20'>
                            <div className='col-md-12'>
                              <label className='full'>
                                <div className='input-title'>
                                  {' '}
                                  <span className='require'>*</span> Họ và tên{' '}
                                </div>
                                <input
                                  className='input style-2'
                                  placeholder='Họ và tên'
                                  defaultValue={commonState.fullname || ''}
                                  name='fullname'
                                  ref={register({
                                    required: {
                                      value: true,
                                      message: 'Vui lòng nhập họ và tên',
                                    },
                                    pattern: {
                                      value:
                                        /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*( [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*)+/,
                                      message: 'Vui lòng nhập đầy đủ họ và tên',
                                    },
                                  })}
                                />
                                {errors.fullname && <div className='error'>Hãy nhập họ và tên của bạn</div>}
                              </label>
                            </div>
                            <div className='col-md-6'>
                              <label className='full'>
                                <div className='input-title'>
                                  {' '}
                                  <span className='require'>*</span> Số điện thoại{' '}
                                </div>
                                <input
                                  className='input style-2'
                                  placeholder='Số điện thoại'
                                  name='telephone'
                                  ref={register({
                                    required: {
                                      value: true,
                                      message: 'Vui lòng nhập số điện thoại',
                                    },
                                    pattern: {
                                      value: /(03|05|07|08|09)+([0-9]{8})\b/,
                                      message: 'Số điện thoại không đúng',
                                    },
                                  })}
                                  defaultValue={commonState.telephone || ''}
                                />
                                {errors.telephone && <div className='error'>{errors.telephone.message}</div>}
                              </label>
                            </div>
                            <div className='col-md-6'>
                              <label className='full'>
                                <div className='input-title'>
                                  {' '}
                                  <span className='require'>*</span> Số nhà, tên đường{' '}
                                </div>
                                <input
                                  className='input style-2'
                                  placeholder='Số nhà, tên đường'
                                  name='street'
                                  ref={register({
                                    required: {
                                      value: true,
                                      message: 'Hãy nhập tên đường của bạn',
                                    },
                                  })}
                                  value={commonState.street[0]}
                                  onChange={(e) => setCommonState({ ...commonState, street: [`${e.target.value}`] })}
                                />
                                {errors.street && <div className='error'>{errors.street.message}</div>}
                              </label>
                            </div>
                          </div>

                          <h6 className='title'>
                            <span className='require'>*</span> Chọn khu vực
                          </h6>
                          <p className='cl4'>VUI LÒNG NHẬP THÔNG TIN CHÍNH XÁC ĐỂ CHÚNG TÔI GIAO HÀNG SỚM NHẤT CHO BẠN</p>
                          <div className='row list-item-20'>
                            <div className='col-md-4'>
                              <select id='address_Tinh' className='select select-tinh' value={currentCity.value} name='city' onChange={(e) => changeCity(e)} ref={register({ required: true })}>
                                {cities &&
                                  cities.map((item, index) => (
                                    <option value={item.value} key={index}>
                                      {item.label}
                                    </option>
                                  ))}
                              </select>
                              {errors.city && <div className='error'>Hãy nhập thành phố đúng</div>}
                            </div>
                            <div className='col-md-4'>
                              <select
                                id='address_QH'
                                className='select select-quan'
                                data-parent='address_Tinh'
                                data-child1='address_PX'
                                defaultValue={currentDistrict.value}
                                name='district'
                                onChange={(e) => changeDistrict(e)}
                                ref={register({ required: true, validate: (value) => value !== 'Tất cả Quận Huyện' })}
                              >
                                {districts.map((item, index) => (
                                  <option value={item.value} key={index}>
                                    {item.label}
                                  </option>
                                ))}
                              </select>
                              {errors.district && <div className='error'>Hãy nhập quận huyện đúng</div>}
                            </div>
                            <div className='col-md-4'>
                              <select id='address_PX' className='select select-phuong' defaultValue={currentWard.value} name='ward' onChange={(e) => changeWard(e)} ref={register({ required: true, validate: (value) => value !== 'Tất cả Phường/Xã' })}>
                                {wards.map((item, index) => (
                                  <option value={item.value} key={index}>
                                    {item.label}
                                  </option>
                                ))}
                              </select>
                              {errors.ward && <div className='error'>Hãy nhập phường xã đúng</div>}
                            </div>
                          </div>
                        </div>
                        <div className='pd-20'>
                          <div>
                            <button className='btn btn-4  ' type='submit'>
                              Giao hàng đến địa chỉ này
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {paymentMethodList && shippingMethods && caculatedResult && notConfirm && (
                  <div className='col-md-3'>
                    <div className={`box-shadow widget-total-cart ${isCaculating ? 'loading' : ''}`}>
                      <h6 className='widget-title'>Giá trị đơn hàng</h6>
                      <div className='items'>
                        {caculatedResult.total_segments.map((item, index) => {
                          switch (item.code) {
                            case 'subtotal':
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'shipping':
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{parseInt(item.value) >= 0 ? 'Phí vận chuyển' : 'Hỗ trợ vận chuyển'}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'discount':
                              if (item.value == 0) {
                                return null;
                              }
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'tax':
                              if (item.value == 0) {
                                return null;
                              }
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'quantity_discount_amount':
                              if (item.value == 0) {
                                return null;
                              }
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'vnpay_amount':
                              if (item.value == 0) {
                                return null;
                              }
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>
                      {paymentMethodList && shippingMethods && caculatedResult.coupon_code && caculatedResult.coupon_code != 0 ? (
                        <div id='coupons' className='items coupons active'>
                          <h6 className='title'>
                            Mã khuyến mãi{' '}
                            <a className='code extend' style={{ color: '#8C110A' }} onClick={() => removeCoupon()}>
                              Xoá
                            </a>
                          </h6>

                          <p className='r1 extend mb-10'>
                            <span className='pull-left cl4'>{caculatedResult.coupon_code}</span> {caculatedResult.discount_amount} đ
                          </p>
                        </div>
                      ) : (
                        <div id='coupons' className='items coupons '>
                          <h6 className='title'>Mã khuyến mãi</h6>
                          <p>
                            <input className='input style-2' placeholder='Nhập mã khuyến mãi tại đây' value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                          </p>
                          {couponError.length != 0 && <p style={{ color: 'red' }}>{couponError}</p>}
                          <span className='btn' onClick={() => applyCoupon()}>
                            Áp dụng
                          </span>
                        </div>
                      )}
                      <div className='items'>
                        <div className='r1 mb-20'>
                          <span className='pull-left b'>Tổng tiền</span>
                          <span className='b cl1'>
                            <span id='final-price'></span>
                            {caculatedResult.base_grand_total ? formatVND(caculatedResult.base_grand_total) : 0} đ
                          </span>
                        </div>

                        <button className='btn btn-4' onClick={() => setNextConfirm()}>
                          Xác nhận mua hàng
                        </button>
                        <br />
                        <br />
                        <a className='btn' href='./'>
                          Mua thêm sản phẩm
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethodList && shippingMethods && caculatedResult && !notConfirm && (
                  <div className='col-md-3'>
                    <div className={`box-shadow widget-total-cart ${isCaculating ? 'loading' : ''}`}>
                      <h6 className='widget-title'>Giá trị đơn hàng</h6>
                      <div className='items'>
                        {caculatedResult.total_segments.map((item, index) => {
                          switch (item.code) {
                            case 'subtotal':
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'shipping':
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{parseInt(item.value) >= 0 ? 'Phí vận chuyển' : 'Hỗ trợ vận chuyển'}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'discount':
                              if (item.value == 0) {
                                return null;
                              }
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'tax':
                              if (item.value == 0) {
                                return null;
                              }
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'quantity_discount_amount':
                              if (item.value == 0) {
                                return null;
                              }
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            case 'vnpay_amount':
                              if (item.value == 0) {
                                return null;
                              }
                              return (
                                <div className='r1' key={index}>
                                  <span className='pull-left cl4'>{item.title}</span>
                                  <span id='charges' className='b'>
                                    {formatVND(item.value)}
                                  </span>{' '}
                                  đ
                                </div>
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>
                      {paymentMethodList && shippingMethods && caculatedResult.coupon_code && caculatedResult.coupon_code != 0 ? (
                        <div id='coupons' className='items coupons active'>
                          <h6 className='title'>
                            Mã khuyến mãi{' '}
                            <a className='code extend' style={{ color: '#8C110A' }} onClick={() => removeCoupon()}>
                              Xoá
                            </a>
                          </h6>

                          <p className='r1 extend mb-10'>
                            <span className='pull-left cl4'>{caculatedResult.coupon_code}</span> {caculatedResult.discount_amount} đ
                          </p>
                        </div>
                      ) : (
                        <div id='coupons' className='items coupons '>
                          <h6 className='title'>Mã khuyến mãi</h6>
                          <p>
                            <input className='input style-2' placeholder='Nhập mã khuyến mãi tại đây' value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                          </p>
                          {couponError.length != 0 && <p style={{ color: 'red' }}>{couponError}</p>}
                          <span className='btn' onClick={() => applyCoupon()}>
                            Áp dụng
                          </span>
                        </div>
                      )}
                      <div className='items'>
                        <div className='r1 mb-20'>
                          <span className='pull-left b'>Tổng tiền</span>
                          <span className='b cl1'>
                            <span id='final-price'></span>
                            {caculatedResult.base_grand_total ? formatVND(caculatedResult.base_grand_total) : 0} đ
                          </span>
                        </div>

                        <button className='btn btn-4' onClick={() => setPayNow()}>
                          Mua hàng
                        </button>
                        <br />
                        <br />
                        <a className='btn' href='./'>
                          Mua thêm sản phẩm
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default CheckoutUser;
