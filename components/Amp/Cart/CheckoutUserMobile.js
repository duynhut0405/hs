import React, { useState, useEffect } from 'react';
import LayoutMobileOnlyHead from '../LayoutMobileOnlyHead';
import api from '../../../services/api';
import formatVND from '../../../utils/formatVND';
import Cookies from 'js-cookie';
import CheckoutCategory from './CheckoutCategory';
import { useAuth } from '../../../contexts/auth';
import { useCommon } from '../../../contexts/common';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

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
  const { user } = useAuth();
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
      setTotal(result.data.items_qty);
      setCurrentCartInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await getCart();
  }, []);

  useEffect(() => {
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
      currentCart.forEach((element) => {
        let category = element.extension_attributes.category;
        if (categories[category] && element.extension_attributes.is_buy_latter == 0) {
          categories[category].push(element);
        }
      });
    }

    Object.keys(categories).forEach(function (key) {
      if (categories[key].length == 0) {
        delete categories[key];
      }
    });
    setState(categories);
  }, [currentCart]);

  // Find the shipping for this checkout
  useEffect(async () => {
    if (hasShippingAddress && commonState.id && currentCartInfo) {
      await estimateShippingAddressById();
      await setTotalAgain();
      if (currentCartInfo.items.length == 0) {
        alert('Hãy chọn sản phẩm để thanh toán');
        router.push('/');
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
    await setTotalAgain();
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
      country_id: 'VN',
    });
    const findingDistricts = location.districts.filter((district) => district.city_id == currentLocation.city.value);
    setDistricts(findingDistricts);
    setCurrentDistrict({
      value: currentLocation.district.value,
      label: currentLocation.district.label,
    });

    const findingWards = location.wards.filter((ward) => ward.district_id == currentLocation.district.value);
    setWards(findingWards);
    setCurrentWard({
      value: currentLocation.ward.value,
      label: currentLocation.ward.label,
    });
  };

  useEffect(async () => {
    if (user != undefined && location) {
      const shippingAddress = user.addresses.find((element) => element.default_shipping);
      setCites(location.cites);
      if (shippingAddress != undefined) {
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
          });

          const findingDistricts = location.districts.filter((district) => district.city_id == shippingAddress.custom_attributes.city_id.value);
          setDistricts(findingDistricts);
          setCurrentDistrict({
            value: shippingAddress.custom_attributes.district_id.value,
            label: shippingAddress.custom_attributes.district.value,
          });

          const findingWards = location.wards.filter((ward) => ward.district_id == shippingAddress.custom_attributes.district_id.value);
          setWards(findingWards);
          setCurrentWard({
            value: shippingAddress.custom_attributes.ward_id.value,
            label: shippingAddress.custom_attributes.ward.value,
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
        setCommonState(data);
        setHasShippingAddress(true);
        // if (locationData) {
        //   if (currentLocation.city.value == shippingAddress.custom_attributes.city_id.value && currentLocation.district.value == shippingAddress.custom_attributes.district_id.value && currentLocation.ward.value == shippingAddress.custom_attributes.ward_id.value) {
        //     setCommonState(data);
        //     setHasShippingAddress(true);
        //   } else {
        //     let dataNew = {
        //       ...commonState,
        //       id: null,
        //       firstname: '',
        //       lastname: '',
        //       country_id: 'VN',
        //       street: [],
        //       telephone: '',
        //       city: currentLocation.city.label,
        //       default_billing: false,
        //       default_shipping: true,
        //       custom_attributes: {
        //         city_id: currentLocation.city.value,
        //         district: currentLocation.district.label,
        //         district_id: currentLocation.district.value,
        //         ward: currentLocation.ward.label,
        //         ward_id: currentLocation.ward.value,
        //       }
        //     }
        //     setCommonState(dataNew);
        //     setHasShippingAddress(false);
        //   }
        // }
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
            city: currentLocation.city.label,
            default_billing: false,
            default_shipping: true,
            custom_attributes: {
              city_id: currentLocation.city.value,
              district: currentLocation.district.label,
              district_id: currentLocation.district.value,
              ward: currentLocation.ward.label,
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
    if (commonState && currentShippingMethod && currentPayment) {
      await setTotalAgain();
    }
  }, [currentShippingMethod, currentPayment]);

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

  const submit = async () => {
    let data = {
      ...commonState,
      city: currentCity.label,
      default_shipping: true,
      custom_attributes: {
        city_id: currentCity.value,
        district: currentDistrict.label,
        district_id: currentDistrict.value,
        ward: currentWard.label,
        ward_id: currentWard.value,
      },
    };
    try {
      console.log(data);
      const result = await api.post('service/customers/address', { address: data });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const changeCity = (e) => {
    const found = cities.find((city) => city.value == e.target.value);
    let data = {
      ...currentCity,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
    };
    setCurrentCity(data);

    // Find district
    const findingDistricts = location.districts.filter((district) => district.city_id == data.value);
    setDistricts(findingDistricts);
  };

  const changeDistrict = (e) => {
    const found = districts.find((district) => district.value == e.target.value);
    let data = {
      ...currentDistrict,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
      city_id: found.city_id,
    };
    setCurrentDistrict(data);

    // Find ward
    const findingWards = location.wards.filter((ward) => ward.district_id == data.value);
    setWards(findingWards);
  };

  const changeWard = (e) => {
    const found = wards.find((ward) => ward.value == e.target.value);
    let data = {
      ...currentWard,
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
  };

  const setNextConfirm = async () => {
    if (hasShippingAddress) {
      setNotConfirm(false);
    }
  };

  const setPayNow = async () => {
    let payMethod = currentPayment;
    setCaculating(true);
    if (payMethod.code == 'checkmo') {
      try {
        const result = await api.post(`carts/mine/payment-information`, {
          billingAddress: {
            email: commonState.email,
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
        window.location.href = `/checkout/payment-success/${result.data}`;
      } catch (error) {
        throw error;
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
              { attribute_code: 'ward', value: currentWard.label },
              { attribute_code: 'district_id', value: currentDistrict.value },
              { attribute_code: 'district', value: currentDistrict.label },
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
      } catch (error) {
        alert('Vui lòng kiểm tra lại thông tin thanh toán');
        return;
      }
      await api
        .get(`carts/mine/vnpay?return=${encodeURI(window.location.href + '/payment-success')}`)
        .then((res) => {
          document.location.href = res.data;
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return (
    <>
      <LayoutMobileOnlyHead />
      {notConfirm && (
        <div className='page-top-heading' onClick={() => router.back()}>
          <a className='back icon-arrow-1 ix' href='#'></a>
          <h1>
            Thanh toán <span className='small'>({total} Sản phẩm)</span>
          </h1>
        </div>
      )}
      {!notConfirm && (
        <div className='page-top-heading' onClick={() => setNotConfirm(true)}>
          <a className='back icon-arrow-1 ix' href='#'></a>
          <h1>
            Xác nhận <span className='small'>({total} Sản phẩm)</span>
          </h1>
        </div>
      )}
      <main className='page-cart'>
        {state && currentCartInfo && (
          <>
            {hasShippingAddress && notConfirm && (
              <>
                {hasShippingAddress && commonState && (
                  <div className='pd-15   sec-bd-bottom box-cart-4'>
                    <h6 className='box-title-2'>Thông tin nhận hàng</h6>
                    <span className='w5'>
                      {commonState.lastname} {commonState.firstname}
                    </span>
                    <br /> {commonState.telephone} <br />
                    {commonState.street}, {currentWard.label}, {currentDistrict.label}, {currentCity.label}
                    <div className='action'>
                      <a
                        className='cl1'
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
                  <div className='pd-15 sec-bd-bottom box-cart-3'>
                    <h6 className='box-title-2'>Hình thức vận chuyển</h6>
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
                )}
                {paymentMethodList && (
                  <div className='pd-15 sec-bd-bottom box-cart-3'>
                    <h6 className='box-title-2'>Hình thức thanh toán</h6>
                    {paymentMethodList.map((item, index) => (
                      <label className='radio full' key={index}>
                        <input name={item.code} type='radio' checked={currentPayment ? item.code == currentPayment.code : false} onChange={() => setPayment(item)} />
                        <span></span>
                        <img src='/images/svg/t11.svg' alt='' /> {item.title}
                      </label>
                    ))}
                  </div>
                )}
                <div className='box-shadow mb-20 box-cart-3'>
                  <h6 className='box-title-2'>Danh sách sản phẩm</h6>
                  {Object.keys(state).map((item, index) => (
                    <CheckoutCategory data={state[item]} cate={item} key={index} />
                  ))}
                </div>
              </>
            )}
            {hasShippingAddress && !notConfirm && (
              <div className='box-shadow box-product mb-20 box-confirm '>
                <div className='pd-20'>
                  <div className='mb-10 b w7'>Thông tin người nhận</div>
                  <div>
                    <span className='w5'>
                      {commonState.firstname} {commonState.lastname}
                    </span>{' '}
                    <br />
                    {commonState.telephone} <br />
                    {commonState.street}, {commonState.city}
                  </div>
                </div>
                <div className='pd-20'>
                  <div className='mb-10 b w7'>Hình thức vận chuyển</div>
                  <div>
                    <img src='/images/svg/t11.svg' alt='' /> &nbsp;
                    {currentShippingMethod.method_title}
                  </div>
                </div>
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

            {!hasShippingAddress && notConfirm && commonState && (
              <div className='box-shadow mb-20 box-cart-5' style={{ display: 'block' }}>
                <h6 className='box-title-2'>Thông tin nhận hàng</h6>
                <form onSubmit={handleSubmit(submit)}>
                  <div className='pd-20'>
                    <div className='row list-item-20'>
                      <div className='col-md-6'>
                        <label className='full'>
                          <div className='input-title'>
                            {' '}
                            <span className='require'>*</span> Tên
                          </div>
                          <input className='input style-2' placeholder='Tên' name='firstname' ref={register({ required: true })} value={commonState.firstname} onChange={(e) => setCommonState({ ...commonState, firstname: e.target.value })} />
                          {errors.firstname && <div className='error'>Hãy nhập tên của bạn</div>}
                        </label>
                      </div>
                      <div className='col-md-6'>
                        <label className='full'>
                          <div className='input-title'>
                            {' '}
                            <span className='require'>*</span> Họ{' '}
                          </div>
                          <input className='input style-2' placeholder='Họ' name='lastname' ref={register({ required: true })} value={commonState.lastname} onChange={(e) => setCommonState({ ...commonState, lastname: e.target.value })} />
                          {errors.lastname && <div className='error'>Hãy nhập họ của bạn</div>}
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
                              required: true,
                              pattern: {
                                value: /(03|05|07|08|09)+([0-9]{8})\b/,
                                message: 'Số điện thoại không đúng',
                              },
                            })}
                            value={commonState.telephone}
                            onChange={(e) => setCommonState({ ...commonState, telephone: e.target.value })}
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
                            defaultValue={commonState.street[0] || ''}
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
                        <select id='address_QH' className='select select-quan' data-parent='address_Tinh' data-child1='address_PX' value={currentDistrict.value} name='district' onChange={(e) => changeDistrict(e)} ref={register({ required: true })}>
                          {districts.map((item, index) => (
                            <option value={item.value} key={index}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                        {errors.district && <div className='error'>Hãy nhập quận huyện đúng</div>}
                      </div>
                      <div className='col-md-4'>
                        <select id='address_PX' className='select select-phuong' value={currentWard.value} name='ward' onChange={(e) => changeWard(e)} ref={register({ required: true })}>
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
            )}
            {caculatedResult && notConfirm && (
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
                            <span className='pull-left cl4'>Phí vận chuyển</span>
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
                      default:
                        return null;
                    }
                  })}
                </div>
                {caculatedResult.coupon_code && caculatedResult.coupon_code != 0 ? (
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
              </div>
            )}
            {caculatedResult && !notConfirm && (
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
                            <span className='pull-left cl4'>Phí vận chuyển</span>
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
                      default:
                        return null;
                    }
                  })}
                </div>
                {caculatedResult.coupon_code && caculatedResult.coupon_code != 0 ? (
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
              </div>
            )}
          </>
        )}
      </main>
      {caculatedResult && notConfirm && (
        <div className={`w-final-price ${isCaculating ? 'loading' : ''}`}>
          <div className='text-right mb-10'>
            <span className='pull-left b'>Tổng tiền</span>
            <span className='b cl1'>
              <span id='final-price'></span>
              {caculatedResult.base_grand_total ? formatVND(caculatedResult.base_grand_total) : 0} đ
            </span>
          </div>
          <div className='row'>
            <div className='col-6'>
              <a className='btn btn-4 full' onClick={() => setNextConfirm()}>
                Xác nhận
              </a>
            </div>
            <div className='col-6'>
              <a className='btn full' href='/'>
                Mua thêm
              </a>
            </div>
          </div>
        </div>
      )}
      {caculatedResult && !notConfirm && (
        <div className={`w-final-price ${isCaculating ? 'loading' : ''}`}>
          <div className='text-right mb-10'>
            <span className='pull-left b'>Tổng tiền</span>
            <span className='b cl1'>
              <span id='final-price'></span>
              {caculatedResult.base_grand_total ? formatVND(caculatedResult.base_grand_total) : 0} đ
            </span>
          </div>
          <div className='row'>
            <div className='col-6'>
              <a className='btn btn-4 full' onClick={() => setPayNow()}>
                Mua hàng
              </a>
            </div>
            <div className='col-6'>
              <a className='btn full' href='/'>
                Mua thêm
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckoutUser;
