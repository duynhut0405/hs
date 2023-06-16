import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import LayoutMobileOnlyHead from '../LayoutMobileOnlyHead'
import api from '../../../services/api'
import {useAuth} from '../../../contexts/auth'
import Category from './Category'
import formatVND from '../../../utils/formatVND'
import { useRouter } from 'next/router'

function CartUser({}) {
  const {cart, isAuthenticated} = useAuth();
  const [total, setTotal] = useState(0);
  const [currentCart, setCurrentCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [active, setActive]= useState(null);
  const [state, setState] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [caculatedResult, setCaculatedResult] = useState(null);
  const [isCaculating, setCaculating] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const router = useRouter();

  const setTotalAgain = async () => {
    try {
      setCaculating(true);
      if (isAuthenticated) {
        try {
          const result = await api.post(`carts/mine/totals-information`, {
            "addressInformation": {
              "address": {
                "countryId": "VN",
                "city": "<city>",
                "extension_attributes": {
                  "advanced_conditions": {
                    "billing_address_country": null,
                    "city": "<city>",
                    "currency": "VND",
                    "payment_method": null,
                    "shipping_address_line": []
                  }	
                },
                "postcode": null,
                "region": null
              },
              "shipping_carrier_code": "freeshipping",
              "shipping_method_code": "freeshipping"
            }
          })
          setCaculatedResult(result.data);
          setCaculating(false);
        } catch (error) {
          throw error
        }
      }
    } catch (error) {
      throw error
    }
  }

  const getCart = async () => {
    let price = 0;
    try {
      const result = await api.get('carts/mine');
      setCurrentCart(result.data.items);
      setTotal(result.data.items_qty);
      result.data.items.forEach(element => {
        price += (element.price * element.qty);
      });
      setTotalPrice(price);
    } catch (error) {
      console.log(error);
    }
    setIsDeleted(false);
  }

  useEffect(async () => {
    if (isDeleted) (
      await getCart()
    )
  }, [isDeleted])

  useEffect(async () => {
    await getCart();
    await setTotalAgain();
  }, [])

  useEffect(() => {

    // find all category
    let data = [];
    if (currentCart) {
      currentCart.forEach(element => {
        let item = element.extension_attributes.category;
        if (!data.includes(item)) {
          data.push(item)
        }
      });
    }

    // push to an object of categories
    let categories = {};
    data.forEach(element => {
      categories[element] = []
    });
    
    //find all product and set to categories
    if (currentCart) {
      currentCart.forEach(element => {
        let category = element.extension_attributes.category;
        if (categories[category]) {
          categories[category].push(element)
        }
      });
    }
    setState(categories);

  }, [currentCart])

  const removeCoupon = async () => {
    if (isAuthenticated) {
      try {
        const result = await api.delete(`carts/mine/coupons`);
        if (result.status == 200) {
          setTotalAgain();
          return;
        }
      } catch (error) {
        throw error
      }
    }
  }

  const applyCoupon = async () => {
    if (isAuthenticated && coupon.length > 0) {
      try {
        const result = await api.put(`/carts/mine/coupons/${coupon}`);
        if (result.status == 200) {
          setCouponError('');
          setTotalAgain();
        }
      } catch (error) {
        console.log(error.response)
        if (error.response.status == 404) {
          setCouponError('* Mã khuyến mãi không tồn tại');
        }
      }
    }
    if (coupon.length == 0) {
      setCouponError('* Hãy nhập mã khuyến mãi')
    }
  }

  const setCheckAll = async (e) => {
    setIsChecked(e.target.checked)
    let dataNew = state;
    let itemsAll = [];
    Object.keys(dataNew).forEach(function(key) {
      dataNew[key].forEach(element => {
        element.extension_attributes.is_buy_latter = e.target.checked ? 0 : 1;
        itemsAll.push(element);
      });
    });
    setState(dataNew)
    let data1 = {};
    itemsAll.forEach(element => {
      element.extension_attributes.is_buy_latter = e.target.checked ? 0 : 1; 
      data1[element.item_id] = e.target.checked;
    });
    let body = JSON.stringify(data1);
    try {
      const result = await api.post(`carts/mine/set-buy-latter`, {
        data: body
      });
    } catch (error) {
      throw(error)
    }
    setTotalAgain();
  }

  return (
    <>
    <LayoutMobileOnlyHead/>
    <div className="page-top-heading" onClick={() => router.back()}>
      <a className="back icon-arrow-1 ix" href="#"></a>
      <h1>Giỏ hàng <span className="small">({total} Sản phẩm)</span></h1>
    </div>
    {state ? (
      <main className="page-cart">
        <div className="pd-15 ">
          <label className="checkbox  ">
            <input  name="radio" type="checkbox" checked={isChecked} onChange={(e) => setCheckAll(e)}/>
            <span></span>
            <strong>Sản phẩm</strong>
          </label>      
        </div>
        <table className="table table-line productListCart sec-bd-bottom pd-15">
          <thead>
          </thead>
          <tbody>
            {Object.keys(state).map((item, index) => (
              <Category data={state[item]} cate={item} key={index} isParentChecked={isChecked} setIsDeleted={setIsDeleted} setTotalAgain={setTotalAgain} caculatedResult={caculatedResult} setState={setState} state={state}/>
            ))}
          </tbody>
        </table>
        {(caculatedResult && caculatedResult.coupon_code) && 
          <div className={`widget-total-cart ${isCaculating ? 'loading' : ''}`}>
            <h6 className="widget-title">Giá trị đơn hàng</h6>
            <form action="/">
            <div className="items">
              {caculatedResult.total_segments.map((item, index) => {
                switch (item.code) {
                  case 'subtotal':
                    return (
                      <div className="r1" key={index}>
                        <span className="pull-left cl4">{item.title}</span>
                        <span id="charges" className="b">{formatVND(item.value)}</span> đ
                      </div>
                    );
                  case 'shipping':
                    return (
                      <div className="r1" key={index}>
                        <span className="pull-left cl4">Phí vận chuyển</span>
                        <span id="charges" className="b">{formatVND(item.value)}</span> đ
                      </div>
                    );
                  case 'discount':
                    return (
                      <div className="r1" key={index}>
                        <span className="pull-left cl4">{item.title}</span>
                        <span id="charges" className="b">{formatVND(item.value)}</span> đ
                      </div>
                    );
                  case 'tax':
                    if (item.value == 0) {
                      return null;
                    }
                    return (
                      <div className="r1" key={index}>
                        <span className="pull-left cl4">{item.title}</span>
                        <span id="charges" className="b">{formatVND(item.value)}</span> đ
                      </div>
                    );
                  case 'quantity_discount_amount':
                    if (item.value == 0) {
                      return null;
                    }
                    return (
                      <div className="r1" key={index}>
                        <span className="pull-left cl4">{item.title}</span>
                        <span id="charges" className="b">{formatVND(item.value)}</span> đ
                      </div>
                    );
                  default:
                    return null;
                }
              })}
              </div>    
              <div id="coupons" className="items coupons active">
                <h6 className="title" >Mã khuyến mãi <a className="code extend" style={{color: "#8C110A"}} onClick={() => removeCoupon()}>Xoá</a></h6>

                <p className="r1 extend mb-10">
                    <span className="pull-left cl4">{caculatedResult.coupon_code}</span> {caculatedResult.discount_amount} đ 
                </p>
              </div>           
            </form>
          </div>
        }
        {(caculatedResult && (!caculatedResult.coupon_code || caculatedResult.coupon_code.length == 0)) && 
          <div className={`widget-total-cart ${isCaculating ? 'loading' : ''}`}>
            <h6 className="widget-title">Giá trị đơn hàng</h6>
            <form action="/">
            <div className="items">
                {caculatedResult.total_segments.map((item, index) => {
                  switch (item.code) {
                    case 'subtotal':
                      return (
                        <div className="r1" key={index}>
                          <span className="pull-left cl4">{item.title}</span>
                          <span id="charges" className="b">{formatVND(item.value)}</span> đ
                        </div>
                      );
                    case 'shipping':
                      return (
                        <div className="r1" key={index}>
                          <span className="pull-left cl4">Phí vận chuyển</span>
                          <span id="charges" className="b">{formatVND(item.value)}</span> đ
                        </div>
                      );
                    case 'tax':
                      if (item.value == 0) {
                        return null;
                      }
                      return (
                        <div className="r1" key={index}>
                          <span className="pull-left cl4">{item.title}</span>
                          <span id="charges" className="b">{formatVND(item.value)}</span> đ
                        </div>
                      );
                    case 'quantity_discount_amount':
                      if (item.value == 0) {
                        return null;
                      }
                      return (
                        <div className="r1" key={index}>
                          <span className="pull-left cl4">{item.title}</span>
                          <span id="charges" className="b">{formatVND(item.value)}</span> đ
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>    
              <div id="coupons" className="items coupons ">
                  <h6 className="title" >Mã khuyến mãi</h6>
                  <p><input  className="input style-2" placeholder="Nhập mã khuyến mãi tại đây" value={coupon} onChange={(e) => setCoupon(e.target.value)}/></p>
                  {couponError.length != 0 && <p style={{color:'red'}}>{couponError}</p>}
                  <span className="btn" onClick={() => applyCoupon()}>Áp dụng</span>
              </div>            
            </form>
          </div>
        }
        
        </main>
    ) : (
      <span>
        Chưa có sản phảm nào cả
      </span>
    )}
    {(caculatedResult) && (
      <div className="w-final-price">
          <div className="text-right mb-10">
              <span className="pull-left b">Tổng tiền</span>
              <span  className="b cl1"><span id="final-price"></span>{caculatedResult.base_grand_total ? formatVND(caculatedResult.base_grand_total): 0} đ</span>
          </div> 
          <Link href="/checkout">
            <a href="/checkout" className="btn btn-4 full">Tiến hành đặt hàng </a>
          </Link>
      </div>
    )}
    </>
  )
}

export default CartUser;