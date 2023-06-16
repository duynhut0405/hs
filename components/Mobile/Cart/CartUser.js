import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LayoutMobileOnlyHead from '../LayoutMobileOnlyHead';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import Category from './Category';
import formatVND from '../../../utils/formatVND';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
function CartUser({}) {
  const { cart, isAuthenticated, setCurrentCartState, setGetCartAgain, user } = useAuth();
  const [total, setTotal] = useState(0);
  const [currentCart, setCurrentCart] = useState(null);
  const [laterCart, setLaterCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [active, setActive] = useState(null);
  const [state, setState] = useState(null);
  const [state2, setState2] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [caculatedResult, setCaculatedResult] = useState(null);
  const [loadingCart2, setLoadingCart2] = useState(false);
  const [isCaculating, setCaculating] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const router = useRouter();

  const setTotalAgain = async () => {
    setGetCartAgain(true);
    await getCart();
    try {
      setCaculating(true);
      if (isAuthenticated) {
        try {
          const result = await api.post(`carts/mine/totals-information`, {
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

  const getCart = async () => {
    if (typeof window !== 'undefined') {
      let price = 0;
      try {
        setIsChecked(true);
        const result = await api.get('carts/mine');
        setCurrentCart(result.data.items);
        setTotal(result.data.items.length);
        result.data.items.forEach((element) => {
          price += element.price * element.qty;
        });
        setTotalPrice(price);
      } catch (error) {
        console.log(error);
      }
      setIsDeleted(false);
    }
  };

  const getCartLater = async (id) => {
    if (!!id) {
      try {
        const result = await api.get('/cart-buy-later/get?token=' + id);
        const data = result.data.items;
        if (data) {
          data.map((item) => {
            item['extension_attributes'] = JSON.parse(item['attributes']);
            delete item['attributes'];
            return item;
          });
          setLaterCart([...data]);
        } else {
          setLaterCart([]);
        }
      } catch (error) {
        console.log('🚀 ~ file: CartUser.js ~ line 79 ~ getCartLater ~ error', error);
      }
    }
  };

  useEffect(async () => {
    if (isDeleted) await getCart();
  }, [isDeleted]);

  useEffect(async () => {
    async function getData() {
      await setTotalAgain();
      await getCartLater();
    }
    getData();
  }, []);

  useEffect(() => {
    if (user?.id) {
      getCartLater(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (currentCart?.length !== 0) {
      setCate(currentCart, 'v1');
    } else {
      setState(null);
    }
  }, [currentCart]);

  useEffect(() => {
    if (laterCart?.length !== 0) {
      setCate(laterCart, 'v2');
    } else {
      setState2(null);
    }
  }, [laterCart]);

  const setCate = (list, type) => {
    // find all category
    let data = [];
    if (list) {
      if (list.length == 0) return;
      list
        .slice(0)
        .reverse()
        .forEach((element) => {
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
    if (list) {
      list.forEach((element) => {
        // if (element.price === 0) {
        //   categories['Quà Tặng'].push(element);
        //   return;
        // }
        let category = element.extension_attributes.category;
        if (categories[category]) {
          categories[category].push(element);
        }
      });
    }
    if (type === 'v1') {
      setState(categories);
    } else {
      setState2(categories);
    }
  };

  const removeCoupon = async () => {
    if (isAuthenticated) {
      try {
        const result = await api.delete(`carts/mine/coupons`);
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
    if (isAuthenticated && coupon.length > 0) {
      try {
        const result = await api.put(`/carts/mine/coupons/${coupon}`);
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

  const setCheckAll = async (e, type, cartID) => {
    const check = e.target.checked;
    if (type === 'cart-2' && check) {
      setCaculating(true);
      check_item_cart2(laterCart);
      return;
    }

    if (type === 'cart-1' && !check) {
      const data = JSON.parse(JSON.stringify(currentCart));
      setCurrentCart([]);
      uncheck_item_cart1(data, cartID);
      return;
    }
    setIsChecked(e.target.checked);
    let dataNew = state;
    let itemsAll = [];
    Object.keys(dataNew).forEach(async function (key) {
      dataNew[key].forEach((element) => {
        element.extension_attributes.is_buy_latter = e.target.checked ? 0 : 1;
        itemsAll.push(element);
      });
    });
    setState(dataNew);
    let data1 = {};
    itemsAll.forEach((element) => {
      element.extension_attributes.is_buy_latter = e.target.checked ? 0 : 1;
      data1[element.item_id] = e.target.checked;
    });
    let body = JSON.stringify(data1);
    try {
      const result = await api.post(`carts/mine/set-buy-latter`, {
        data: body,
      });
    } catch (error) {
      throw error;
    }
    setTotalAgain();
  };

  const delete_item_cart2 = (list) => {
    const copy = JSON.parse(JSON.stringify(laterCart));
    list.map((prod) => {
      const index = copy.findIndex((item) => item.item_id === prod.item_id);
      copy.splice(index, 1);
    });
    setLaterCart([...copy]);
  };

  const uncheck_item_cart1 = async (list, userID) => {
    const guestId = Cookies.get('cardId');
    const urlDel = !isAuthenticated ? `guest-carts/${guestId}/items/` : `carts/mine/items/`;
    try {
      const arr = [];
      list.map(async (product) => {
        if (product.price === 0) return;
        const data = { ...product };
        data['token'] = userID.toString();
        data.extension_attributes.is_buy_latter = 1;
        data['attributes'] = product.extension_attributes;
        delete data['extension_attributes'];
        delete data['quote_id'];
        arr.push(data);
      });

      const result = await api.post('/cart-buy-later/add', {
        items: arr,
      });
      if (result) {
        await getCartLater(userID);
        for (let pro of list) {
          if (pro.price !== 0) {
            const re = await api.delete(urlDel + pro.item_id);
          }
        }
      }
      setTotalAgain();
      return;
    } catch (err) {
      console.log('🚀 ~ file: Category.js ~ line 79 ~ setItemBuylater ~ err', err);
    }
  };

  const check_item_cart2 = async (list) => {
    const guestId = Cookies.get('cardId');
    const urlAddCart1 = !isAuthenticated ? `guest-carts/${guestId}/items/` : `service/carts/mine/items`;
    delete_item_cart2(list);
    const resultDel = await api.post(`/cart-buy-later/remove`, {
      itemIds: list.map((product) => product.item_id),
    });

    for (let product of list) {
      const data = {
        cartItem: {
          sku: product.sku,
          qty: Number(product.qty),
          quote_id: product.quote_id,
          product_option: {
            extension_attributes: {
              is_buy_latter: false,
            },
          },
        },
      };

      if (product.product_type !== 'simple') {
        Object.keys(product.extension_attributes.options).map((item) => {
          const item_val = product.extension_attributes.options[item];
          if (item === 'advanced_quantity' && item_val) {
            data.cartItem.product_option.extension_attributes['advanced_quantity'] = [
              {
                data: {
                  qty: Number(product.qty),
                  length: Number(item_val),
                },
              },
            ];
            data.cartItem.qty = 1;
          }

          if (item === 'configurable_item_options' && item_val) {
            const parse = JSON.parse(item_val);
            data.cartItem.product_option.extension_attributes['configurable_item_options'] = [{ option_id: Object.keys(parse)[0], option_value: Object.values(parse)[0] }];
          }

          if (item === 'paint_color' && item_val) {
            data.cartItem.product_option.extension_attributes['paint_color'] = item_val;
          }
        });
      }

      try {
        const result = await api.post(urlAddCart1, data);
        if (result?.message) {
          alert(result.message);
        }
      } catch (err) {
        if (err.response?.data?.message) {
          console.log('🚀 ~ file: Category.js ~ line 133 ~ setItemBuylater ~ err', err.response?.data?.message);
          alert(err.response?.data?.message);
        }
      }
    }
    setTotalAgain();
    setLoadingCart2(false);
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
      {state || state2 ? (
        <main className='page-cart'>
          {state ? (
            <>
              <div className='pd-15 '>
                <label className='checkbox  '>
                  <input name='radio' type='checkbox' checked={isChecked} onChange={(e) => setCheckAll(e, 'cart-1', user?.id)} />
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
                    return (
                      <Category
                        getCartLater={() => getCartLater(user?.id)}
                        data={state[item]}
                        cate={item}
                        key={index}
                        setCaculating={setCaculating}
                        isParentChecked={check}
                        setIsDeleted={setIsDeleted}
                        setTotalAgain={setTotalAgain}
                        caculatedResult={caculatedResult}
                        uncheck_item_cart1={(data) => {
                          setCaculating(true);
                          uncheck_item_cart1(data, user.id);
                        }}
                        setState={setState}
                        state={state}
                      />
                    );
                  })}
                </tbody>
                )
              </table>
            </>
          ) : (
            <span className='red2 pd-15'>Chưa có sản phảm nào cả</span>
          )}

          {state2 && (
            <>
              <div className='pd-15 '>
                <label className='checkbox  '>
                  <input name='radio' type='checkbox' checked={isChecked2} onChange={(e) => setCheckAll(e, 'cart-2', user?.id)} />
                  <span></span>
                  <strong>Sản phẩm mua sau</strong>
                </label>
              </div>
              <table className='table table-line productListCart sec-bd-bottom pd-15'>
                <thead></thead>
                <tbody>
                  {Object.keys(state2).map((item, index) => {
                    let check = true;
                    state2[item]?.map((sta) => {
                      if (sta.extension_attributes.is_buy_latter === 1) {
                        check = false;
                        return;
                      }
                    });
                    return (
                      <Category
                        later
                        getCartLater={() => getCartLater(user?.id)}
                        data={state2[item]}
                        cate={item}
                        key={index}
                        isParentChecked={check}
                        setLoadingCart2={setLoadingCart2}
                        setIsDeleted={setIsDeleted}
                        setTotalAgain={setTotalAgain}
                        setCaculating={setCaculating}
                        caculatedResult={caculatedResult}
                        setState={setState}
                        state={state2}
                        delete_item_cart2={delete_item_cart2}
                        check_item_cart2={(data) => check_item_cart2(data, cart.id)}
                        cart={cart}
                      />
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
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
          <div className='text-right mb-10'>
            <span className='pull-left b'>Tổng tiền</span>
            <span className='b cl1'>
              <span id='final-price'></span>
              {caculatedResult.base_grand_total ? formatVND(caculatedResult.base_grand_total) : 0} đ
            </span>
          </div>
          <p className='text-vat'>(Giá bán đã bao gồm VAT)</p>
          <Link href='/checkout'>
            <a href='/checkout' className='btn btn-4 full'>
              Tiến hành đặt hàng
            </a>
          </Link>
        </div>
      )}
    </>
  );
}

export default CartUser;
