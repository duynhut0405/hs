import React, { useState, useEffect } from 'react';
import LayoutMobileOnlyHead from '../LayoutMobileOnlyHead';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import Cookies from 'js-cookie';
import CheckoutCategory from './CheckoutCategory';
import formatVND from '../../../utils/formatVND';
import ShippingDefault from './ShippingDefault';
import { useRouter } from 'next/router';
import HeaderMobile from '../HeaderMobile';

function CheckoutGuest({}) {
  const router = useRouter();
  const { isAuthenticated, createCartForGuest } = useAuth();
  const [total, setTotal] = useState(0);
  const [currentCart, setCurrentCart] = useState(null);
  const [state, setState] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [caculatedResult, setCaculatedResult] = useState(null);
  const [isCaculating, setCaculating] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [currentCartInfo, setCurrentCartInfo] = useState(null);
  const [notConfirm, setNotConfirm] = useState(true);
  const [checkoutSuccess, setCheckoutSuccess] = useState(null);
  const [isPayNow, setIsPayNow] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(async () => {
    if (!notConfirm) {
      Cookies.get('');
    }
  }, [notConfirm]);

  useEffect(async () => {
    if (shippingAddress) {
      setTotalAgain2(shippingAddress);
    }
  }, [shippingAddress]);

  const setTotalAgain2 = async (shippingAddress) => {
    try {
      setCaculating(true);
      const guestId = Cookies.get('cardId');
      if (!isAuthenticated && guestId) {
        try {
          const result = await api.post(`guest-carts/${guestId}/totals-information`, {
            addressInformation: {
              address: {
                countryId: 'VN',
                city: shippingAddress.city,
                extension_attributes: {
                  advanced_conditions: {
                    billing_address_country: null,
                    city: shippingAddress.city,
                    currency: 'VND',
                    payment_method: shippingAddress.payment_method ? shippingAddress.payment_method.code : null,
                    shipping_address_line: shippingAddress.shipping_address_line,
                  },
                },
                postcode: null,
                region: null,
              },
              shipping_carrier_code: shippingAddress.shipping_carrier_code,
              shipping_method_code: shippingAddress.shipping_method_code,
              extension_attributes: {
                payment_method: shippingAddress.payment_method ? shippingAddress.payment_method.code : null,
              },
            },
          });
          setCaculatedResult(result.data);
          setCaculating(false);
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const setTotalAgain = async () => {
    try {
      setCaculating(true);
      const guestId = Cookies.get('cardId');
      if (!isAuthenticated && guestId) {
        try {
          const result = await api.post(`guest-carts/${guestId}/totals-information`, {
            addressInformation: {
              address: {
                countryId: 'VN',
                postcode: null,
                region: null,
              },
            },
          });
          setCaculatedResult(result.data);
          setCaculating(false);
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const getCart = async () => {
    const guestId = Cookies.get('cardId');
    if (!isAuthenticated && guestId) {
      try {
        const result = await api.get(`guest-carts/${guestId}`);
        setCurrentCart(result.data.items);
        setTotal(result.data.items.length);
        setCurrentCartInfo(result.data);
        if (!result.data.items_qty) {
          alert('Hãy chọn mặt hàng');
          router.back();
        }
      } catch (error) {
        throw error;
      }
    }
    setIsDeleted(false);
  };

  useEffect(async () => {
    if (isDeleted) await getCart();
  }, [isDeleted]);

  useEffect(async () => {
    await getCart();
    await setTotalAgain();
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
    setState(categories);
  }, [currentCart]);

  const removeCoupon = async () => {
    const guestId = Cookies.get('cardId');
    if (!isAuthenticated && guestId) {
      try {
        const result = await api.delete(`guest-carts/${guestId}/coupons`);
        if (result.status == 200) {
          location.reload();
          return;
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const applyCoupon = async () => {
    const guestId = Cookies.get('cardId');
    if (!isAuthenticated && guestId && coupon.length > 0) {
      try {
        const result = await api.put(`guest-carts/${guestId}/coupons/${coupon}`);
        if (result.status == 200) {
          setCouponError('');
          location.reload();
        }
      } catch (error) {
        if (error.response.status == 404) {
          setCouponError('* Mã khuyến mãi không tồn tại');
        }
      }
    }
    if (coupon.length == 0) {
      setCouponError('* Hãy nhập mã khuyến mãi');
    }
  };

  return (
    <>
      <LayoutMobileOnlyHead />
      {notConfirm && !checkoutSuccess && (
        <div className='page-top-heading' onClick={() => router.back()}>
          <a className='back icon-arrow-1 ix' href='#'></a>
          <h1>
            Thanh toán <span className='small'>({total} Sản phẩm)</span>
          </h1>
        </div>
      )}
      {!notConfirm && !checkoutSuccess && (
        <div className='page-top-heading' onClick={() => setNotConfirm(true)}>
          <a className='back icon-arrow-1 ix' href='#'></a>
          <h1>
            Xác nhận <span className='small'>({total} Sản phẩm)</span>
          </h1>
        </div>
      )}
      {!checkoutSuccess && (
        <>
          <main className={`page-cart ${isDeleted ? 'loading' : ''}`}>
            {state ? (
              <>
                {currentCartInfo != null && currentCartInfo.extension_attributes && currentCartInfo.extension_attributes.shipping_assignments && currentCartInfo.extension_attributes.shipping_assignments[0] && (
                  <ShippingDefault
                    setCaculating={setCaculating}
                    data={currentCartInfo.extension_attributes.shipping_assignments[0].shipping}
                    notConfirm={notConfirm}
                    category={state}
                    setCheckoutSuccess={setCheckoutSuccess}
                    isPayNow={isPayNow}
                    setShippingAddress={setShippingAddress}
                    setNotConfirm={setNotConfirm}
                  />
                )}
                {notConfirm && (
                  <>
                    <div className='pd-15 '>
                      <h6 className='box-title-2'>Danh sách sản phẩm</h6>
                    </div>
                    {Object.keys(state).map((item, index) => (
                      <CheckoutCategory data={state[item]} cate={item} key={index} />
                    ))}
                  </>
                )}

                {!notConfirm && caculatedResult && caculatedResult.coupon_code && (
                  <div className={`widget-total-cart ${isCaculating ? 'loading' : ''}`}>
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
                  </div>
                )}
                {!notConfirm && caculatedResult && (!caculatedResult.coupon_code || caculatedResult.coupon_code.length == 0) && (
                  <div className={`widget-total-cart ${isCaculating ? 'loading' : ''}`}>
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
                  </div>
                )}
                {notConfirm && caculatedResult && caculatedResult.coupon_code && (
                  <div className={`widget-total-cart ${isCaculating ? 'loading' : ''}`}>
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
                  </div>
                )}
                {notConfirm && caculatedResult && (!caculatedResult.coupon_code || caculatedResult.coupon_code.length == 0) && (
                  <div className={`widget-total-cart ${isCaculating ? 'loading' : ''}`}>
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
                  </div>
                )}
              </>
            ) : (
              <span className='red2'>Chưa có sản phảm nào cả</span>
            )}
          </main>
          {!notConfirm && caculatedResult && caculatedResult.coupon_code && (
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
                  <a className='btn btn-4 full' onClick={() => setIsPayNow(true)}>
                    Mua Hàng
                  </a>
                </div>
                <div className='col-6'>
                  <a className='btn full' href='./'>
                    Mua thêm
                  </a>
                </div>
              </div>
            </div>
          )}
          {!notConfirm && caculatedResult && (!caculatedResult.coupon_code || caculatedResult.coupon_code.length == 0) && (
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
                  <a className='btn btn-4 full' onClick={() => setIsPayNow(true)}>
                    Mua Hàng
                  </a>
                </div>
                <div className='col-6'>
                  <a className='btn full' href='./'>
                    Mua thêm
                  </a>
                </div>
              </div>
            </div>
          )}
          {notConfirm && caculatedResult && caculatedResult.coupon_code && (
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
                  <a className='btn btn-4 full' onClick={() => setNotConfirm(false)}>
                    Xác nhận
                  </a>
                </div>
                <div className='col-6'>
                  <a className='btn full' href='./'>
                    Mua thêm
                  </a>
                </div>
              </div>
            </div>
          )}
          {notConfirm && caculatedResult && (!caculatedResult.coupon_code || caculatedResult.coupon_code.length == 0) && (
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
                  <a className='btn btn-4 full' onClick={() => setNotConfirm(false)}>
                    Xác nhận
                  </a>
                </div>
                <div className='col-6'>
                  <a className='btn full' href='./'>
                    Mua thêm
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {checkoutSuccess && (
        <>
          <HeaderMobile />
          <main className='sec-tb page-success'>
            <div className='entry-heading text-center'>
              <h1>Đặt hàng thành công</h1>
              <div className='desc'>
                Mã đơn hàng: <span className='w5'>{checkoutSuccess.increment_id}</span>
              </div>
            </div>
            <div className='box-shadow box-product mb-20 box-confirm '>
              <div className='pd-20'>
                <div className='mb-10 b w7'>Thông tin người nhận</div>
                <div>
                  <span className='w5'>
                    {checkoutSuccess.customer_lastname} {checkoutSuccess.customer_firstname}
                  </span>{' '}
                  <br />
                  {checkoutSuccess.billing_address.telephone} <br />
                  {checkoutSuccess.billing_address.street[0]} {checkoutSuccess.billing_address.city}
                </div>
              </div>
              <div className='pd-20'>
                <div className='mb-10 b w7'>Hình thức thanh toán</div>
                <div>
                  <img src='/images/svg/t11.svg' alt='' /> &nbsp;
                  {checkoutSuccess.payment.additional_information[0]}
                </div>
              </div>
              <>
                <div className='pd-15 '>
                  <h6 className='box-title-2'>Danh sách sản phẩm</h6>
                </div>
                {Object.keys(state).map((item, index) => (
                  <CheckoutCategory data={state[item]} cate={item} key={index} />
                ))}
              </>
              <div className='widget-total-cart '>
                <h6 className='widget-title'>Giá trị đơn hàng</h6>
                <div className='items'>
                  <div className='r1'>
                    <span className='pull-left cl4'>Tạm tính</span>
                    <span id='total-price' className='b'>
                      {formatVND(checkoutSuccess.base_subtotal)}
                    </span>{' '}
                    đ
                  </div>
                  <div className='r1'>
                    <span className='pull-left cl4'>{parseInt(item.value) >= 0 ? 'Phí vận chuyển' : 'Hỗ trợ vận chuyển'}</span>
                    <span id='charges' className='b' price='150000'>
                      {formatVND(checkoutSuccess.payment.base_shipping_amount)}
                    </span>{' '}
                    đ
                  </div>
                  {/* <div className="r1">
                      <span className="pull-left cl4">Thuế</span>
                      <span id="charges" className="b">{checkoutSuccess.payment.tax_amount ? formatVND(checkoutSuccess.payment.tax_amount): 0}</span> đ
                  </div>     */}
                </div>
                {checkoutSuccess.coupon_code && checkoutSuccess.coupon_code.length > 0 && (
                  <div id='coupons' className='items coupons active'>
                    <h6 className='title'>
                      Mã khuyến mãi <span className='code extend'>{checkoutSuccess.coupon_code}</span>
                    </h6>
                    <p className='r1 extend mb-10'>
                      <span className='pull-left cl4'>Giảm</span>
                      <span id='coupon' price='50000' className='b'>
                        {checkoutSuccess.discount_amount}
                      </span>{' '}
                      đ
                    </p>
                  </div>
                )}
                <div className='items'>
                  <div className='r1'>
                    <span className='pull-left b'>Tổng tiền</span>
                    <span className='b cl1'>
                      <span id='final-price'>{formatVND(checkoutSuccess.base_grand_total)}</span> đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div className='w-final-price'>
            <a className='btn full btn-4' href='/'>
              Tiếp tục mua hàng
            </a>
            <a className='btn full' href='/'>
              Về trang chủ
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default CheckoutGuest;
