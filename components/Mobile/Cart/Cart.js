import React, { useState, useEffect } from 'react';
import LayoutMobile from '../LayoutMobile';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import Cookies from 'js-cookie';
import Category from './Category';
import formatVND from '../../../utils/formatVND';
import Link from 'next/link';
import LayoutMobileOnlyHead from '../LayoutMobileOnlyHead';
import { useRouter } from 'next/router';

function CartMobile({}) {
  const { cart, isAuthenticated, setGetCartAgain } = useAuth();
  const [total, setTotal] = useState(0);
  const [currentCart, setCurrentCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [active, setActive] = useState(null);
  const [state, setState] = useState(null);
  const [state2, setState2] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [caculatedResult, setCaculatedResult] = useState(null);
  const [isCaculating, setCaculating] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const router = useRouter();

  const setTotalAgain = async () => {
    setGetCartAgain(true);
    await getCart();
    try {
      setCaculating(true);
      const guestId = Cookies.get('cardId');
      if (!isAuthenticated && guestId) {
        try {
          const result = await api.post(`guest-carts/${guestId}/totals-information`, {
            addressInformation: {
              address: {
                countryId: 'VN',
                city: '<city>',
                extension_attributes: {
                  advanced_conditions: {
                    billing_address_country: null,
                    city: '<city>',
                    currency: 'VND',
                    payment_method: null,
                    shipping_address_line: [],
                  },
                },
                postcode: null,
                region: null,
              },
              shipping_carrier_code: 'freeshipping',
              shipping_method_code: 'freeshipping',
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

  useEffect(async () => {
    await setTotalAgain();
  }, []);

  const getCart = async () => {
    const guestId = Cookies.get('cardId');
    if (!isAuthenticated && guestId) {
      setIsChecked(true);
      let price = 0;
      try {
        const result = await api.get(`guest-carts/${guestId}`);
        if (result.status == 200) {
          setCurrentCart(result.data.items);
          setTotal(result.data.items.length);
          result.data.items.forEach((element) => {
            price += element.price * element.qty;
          });
          setTotalPrice(price);
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
  }, []);

  useEffect(() => {
    // find all category
    let data = [];
    if (currentCart) {
      currentCart
        .slice(0)
        .reverse()
        .forEach((element) => {
          let item = element.extension_attributes.category;
          if (!data.includes(item)) {
            data.push(item);
          }
          if (element.extension_attributes.is_buy_latter == 1) {
            setIsChecked(false);
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
        if (categories[category]) {
          categories[category].push(element);
        }
      });
    }
    setState(categories);
  }, [currentCart]);

  const removeCoupon = async () => {
    const guestId = Cookies.get('cardId');
    if (!isAuthenticated && guestId) {
      try {
        const result = await api.delete(`guest-carts/${guestId}/coupons`);
        if (result.status == 200) {
          setTotalAgain();
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
          setTotalAgain();
        }
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

  const setCheckAll = async (e) => {
    setIsChecked(e.target.checked);
    let dataNew = state;
    let itemsAll = [];
    Object.keys(dataNew).forEach(function (key) {
      dataNew[key].forEach((element) => {
        element.extension_attributes.is_buy_latter = e.target.checked ? 0 : 1;
        itemsAll.push(element);
      });
    });
    setState(dataNew);
    const cardId = Cookies.get('cardId');
    let data1 = {};
    itemsAll.forEach((element) => {
      element.extension_attributes.is_buy_latter = e.target.checked ? 0 : 1;
      data1[element.item_id] = e.target.checked;
    });
    let body = JSON.stringify(data1);
    try {
      const result = await api.post(`guest-carts/${cardId}/set-buy-latter`, {
        data: body,
      });
    } catch (error) {
      throw error;
    }
    setTotalAgain();
  };

  const goToCheckout = () => {
    let invalidItems = [];
    currentCart.forEach((element) => {
      if (element?.extension_attributes?.messages.length != 0 && element.extension_attributes.is_buy_latter == 0) {
        invalidItems.push(element.name);
      }
    });
    // if (invalidItems.length != 0) {
    //   let string = "";
    //   invalidItems.forEach((element, index) => {
    //     string = string + element + (index != invalidItems.length - 1 ? "," : "");
    //   });
    //   alert(`Xin lỗi quý khách. Sản phẩm :${string} hiện không đủ điều kiện thanh toán. Vui lòng bỏ chọn thanh toán sản phẩm nêu trên.`);
    //   return;
    // }
    router.push('/checkout');
  };

  return (
    <>
      <LayoutMobileOnlyHead />
      <div className='page-top-heading' onClick={() => router.back()}>
        <a className='back icon-arrow-1 ix' href='#'></a>
        <h1>
          Giỏ hàng <span className='small'>({total} Sản phẩm)</span>
        </h1>
      </div>
      {state ? (
        <main className='page-cart'>
          <div className='pd-15 '>
            <label className='checkbox  '>
              <input name='radio' type='checkbox' checked={isChecked} onChange={(e) => setCheckAll(e)} />
              <span></span>
              <strong>Sản phẩm</strong>
            </label>
          </div>
          <table className='table table-line productListCart sec-bd-bottom pd-15'>
            <thead></thead>
            <tbody>
              {Object.keys(state).map((item, index) => {
                let check = true;
                state[item]?.map((sta) => {
                  if (sta.extension_attributes.is_buy_latter === 1) {
                    check = false;
                    return;
                  }
                });
                return <Category data={state[item]} cate={item} key={index} isParentChecked={check} setIsDeleted={setIsDeleted} setTotalAgain={setTotalAgain} caculatedResult={caculatedResult} setState={setState} state={state} />;
              })}
            </tbody>
          </table>
          {caculatedResult && caculatedResult.coupon_code && (
            <div className={`widget-total-cart ${isCaculating ? 'loading' : ''}`}>
              <h6 className='widget-title'>Giá trị đơn hàng</h6>
              <form action='/'>
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
                              {caculatedResult.base_grand_total ? formatVND(item.value) : 0}
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
              </form>
            </div>
          )}
          {caculatedResult && (!caculatedResult.coupon_code || caculatedResult.coupon_code.length == 0) && (
            <div className={`widget-total-cart ${isCaculating ? 'loading' : ''}`}>
              <h6 className='widget-title'>Giá trị đơn hàng</h6>
              <form action='/'>
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
                              {caculatedResult.base_grand_total ? formatVND(item.value) : 0}
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
              </form>
            </div>
          )}
        </main>
      ) : (
        <span className='red2'>Chưa có sản phảm nào cả</span>
      )}
      {caculatedResult && (
        <div className='w-final-price'>
          {caculatedResult.total_segments.map((item, index) => {
            switch (item.code) {
              case 'grand_total':
                return (
                  <div className='text-right mb-10' key={index}>
                    <span className='pull-left b'>{item.title}</span>
                    <span className='b cl1'>
                      <span id='final-price'></span>
                      {formatVND(item.value)} đ
                    </span>
                  </div>
                );
              default:
                return null;
            }
          })}
          <p className='text-vat'>(Giá bán đã bao gồm VAT)</p>
          <a onClick={() => goToCheckout()} className='btn btn-4 full'>
            Tiến hành đặt hàng
          </a>
        </div>
      )}
    </>
  );
}

export default CartMobile;
