import React, {useState, useEffect} from 'react'
import LayoutMobileOnlyHead from '../LayoutMobileOnlyHead'
import api from '../../../services/api'
import {useAuth} from '../../../contexts/auth'
import Cookies from 'js-cookie'
import CheckoutCategory from './CheckoutCategory'
import formatVND from '../../../utils/formatVND'
import { useRouter } from 'next/router'
import HeaderMobile from '../HeaderMobile'

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function CheckoutGuest({}) {
  const router = useRouter();
  const [currentCart, setCurrentCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentCartInfo, setCurrentCartInfo] = useState(null);
  const [caculatedResult, setCaculatedResult] = useState(null);
  const [isCaculating, setCaculating] = useState(false);
  const [state, setState] = useState(null);
  const [shippingInfo, setCurrentShippingInfo] = useState(null);
  const [orderDetail, setOrder] = useState(null);
  const {isAuthenticated, createCartForGuest} = useAuth();

  const getCart = async () => {
    const guestId = Cookies.get('cardId');
    if (guestId) {
      try {
        const result = await api.get(`guest-carts/${guestId}`);
        setCurrentCart(result.data.items);
        setTotal(result.data.items_qty);
        setCurrentCartInfo(result.data);
        setCurrentShippingInfo(result.data.extension_attributes.shipping_assignments[0].shipping);
      } catch (error) {
        window.location.pathname = '/'
      }
    }
    try {
      const result = await api.get(`vnpay/order/response?`+ window.location.search.substr(1));
      Cookies.remove('cardId');
      if (result.data.extension_attributes.masked_id) {
        Cookies.set('cardId', result.data.extension_attributes.masked_id);
      } else {
        createCartForGuest();
      }
      setOrder(result.data);
    } catch (error) {
      window.location.pathname = '/'
    }
  }

  useEffect( async () => {
    await getCart();

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
        if (categories[category] && element.extension_attributes.is_buy_latter == 0) {
          categories[category].push(element);
        }
      });
    }

    Object.keys(categories).forEach(function(key) {
      if (categories[key].length == 0) {
        delete categories[key];
      }
    });
    
    setState(categories);

  }, [currentCart])

  return (
    <>
    <LayoutMobileOnlyHead/>
      <HeaderMobile/>
      <main className={`page-success ${!orderDetail ? 'loading': ''}`}>
      {(currentCartInfo && orderDetail) && <>
          <div className="pd-15 entry-heading text-center">
              <h1>Đặt hàng thành công</h1>
              <div className="desc">Mã đơn hàng: <span className="w5">{currentCartInfo.reserved_order_id}</span>
              </div>
          </div>
          <div className="box-shadow box-product mb-20 box-confirm ">
            {shippingInfo && shippingInfo.address && <div className="pd-20">
                  <div className="mb-10 b w7">Thông tin người nhận</div>   
                  <div>
                      <span className="w5">{shippingInfo.address.firstname} {shippingInfo.address.lastname}</span> <br/>
                      {shippingInfo.address.telephone} <br/>
                      {shippingInfo.address.street[0]} {shippingInfo.address.city}
                  </div>
            </div>}
            <div className="pd-20">
              <div className="mb-10 b w7">Hình thức thanh toán</div>   
              {orderDetail && <div>
                  <img src="/images/svg/t11.svg"  alt="" /> &nbsp; 
                  {orderDetail.payment.additional_information[0]}
              </div>}
            </div>
            
            <h6 className="box-title-2">Danh sách sản phẩm</h6>
            {Object.keys(state).map((item, index) => (
              <CheckoutCategory data={state[item]} cate={item} key={index}/>
            ))}
            {orderDetail && (
              <div className="widget-total-cart ">
              <h6 className="widget-title">Giá trị đơn hàng</h6>
              <div className="items">
                <div className="r1">
                    <span className="pull-left cl4">Tạm tính</span>
                    <span id="total-price" className="b">{formatVND(orderDetail.base_subtotal)}</span>  đ
                </div>
                <div className="r1">
                    <span className="pull-left cl4">Phí vận chuyển</span>
                    <span id="charges" className="b" price="150000">{formatVND(orderDetail.payment.base_shipping_amount)}</span> đ 
                </div>
                {/* <div className="r1">
                    <span className="pull-left cl4">Thuế</span>
                    <span id="charges" className="b">{orderDetail.payment.tax_amount ? formatVND(orderDetail.payment.tax_amount): 0}</span> đ
                </div> */}
              </div>
              {orderDetail.coupon_code && orderDetail.coupon_code.length > 0 && (
                <div id="coupons" className="items coupons active">
                    <h6 className="title" >Mã khuyến mãi <span className="code extend">{orderDetail.coupon_code}</span></h6>
                    <p className="r1 extend mb-10">
                        <span className="pull-left cl4">Giảm</span>
                        <span id="coupon" price="50000" className="b">{orderDetail.discount_amount}</span>  đ
                    </p>     
                </div> 
              )}
              <div className="items">
                    <div className="r1">
                      <span className="pull-left b">Tổng tiền</span>
                      <span  className="b cl1"><span id="final-price">{formatVND(orderDetail.base_grand_total)}</span> đ</span>  
                  </div> 
              </div> 
            </div>
            )}
          </div>
      </>}
      </main>
      <div className="w-final-price">
        <a href="/" className="btn btn-4 full mb-10">Tiếp tục mua hàng</a>
        <a href="/" className="btn btn-4 full">Về trang chủ</a>
      </div>
    </>
  )
}

export default CheckoutGuest;