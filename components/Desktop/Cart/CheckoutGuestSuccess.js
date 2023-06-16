import React, {useState, useEffect} from 'react'
import Layout from '../Layout'
import api from '../../../services/api'
import BreadCrumb from '../Common/BreadCrumb'
import {useAuth} from '../../../contexts/auth'
import Cookies from 'js-cookie'
import CheckoutCategory from './CheckoutCategory'
import formatVND from '../../../utils/formatVND'
import ShippingDefault from './ShippingDefault'
import { useRouter } from 'next/router'

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
  const [isLoaded, setIsLoaded] = useState(false);

  const getCart = async () => {
    const guestId = Cookies.get('cardId');
    if (guestId) {
      try {
        const result = await api.get(`guest-carts/${guestId}`);
        setCurrentCart(result.data.items);
        setTotal(result.data.items.length);
        setCurrentCartInfo(result.data);
        setCurrentShippingInfo(result.data.extension_attributes.shipping_assignments[0].shipping);
      } catch (error) {
        console.log(error)
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
    setIsLoaded(true);
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
    <Layout>
      <BreadCrumb data={[{name: 'Thanh toán', link: '/checkout', isActive: true}]}/>
      {!isLoaded ? 
        <main className={`sec-tb page-success`}>
          <div className="container loading">
            <h1>Xin Chờ</h1>
          </div>
        </main> :
        <main className={`sec-tb page-success ${!orderDetail ? 'loading': ''}`}>
        {(currentCartInfo && orderDetail) && <div className="container">
            <div className="entry-heading text-center">
                <h1>Đặt hàng thành công</h1>
                <div className="desc">Mã đơn hàng: <span className="w5">{currentCartInfo.reserved_order_id}</span>
                </div>
            </div>
            <div className="box-shadow box-product mb-20 box-confirm ">
              {shippingInfo && shippingInfo.address && <div className="pd-20">
                    <div className="mb-10 b w7">Thông tin người nhận</div>   
                    <div>
                        <span className="w5">{shippingInfo.address.lastname} {shippingInfo.address.firstname}</span> <br/>
                        {shippingInfo.address.telephone} <br/>
                        {shippingInfo.address.street[0]}, {shippingInfo.address.custom_attributes.find(element => element.attribute_code == 'ward').value}, {shippingInfo.address.custom_attributes.find(element => element.attribute_code == 'district').value},  {shippingInfo.address.city}
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
                      <span id="total-price" className="b">{orderDetail.base_subtotal ? formatVND(parseInt(orderDetail.base_subtotal)) : orderDetail.base_subtotal}</span>  đ
                  </div>
                  <div className="r1">
                      <span className="pull-left cl4">{parseInt(item.value) >=  0 ? 'Phí vận chuyển' : 'Hỗ trợ vận chuyển'}</span>
                      <span id="charges" className="b" price="150000">{formatVND(parseInt(orderDetail.payment.base_shipping_amount))}</span> đ 
                  </div>
                  <div className="r1">
                      <span className="pull-left cl4">Giảm giá</span>
                      <span id="charges" className="b" price="150000">{formatVND(orderDetail.base_discount_amount)}</span> đ 
                  </div>
                  <div className="r1">
                    <span className="pull-left cl4">Phụ Phí</span>
                    <span id="charges" className="b">{orderDetail.total_due && orderDetail.total_due != orderDetail.base_subtotal ? formatVND(orderDetail.total_due): 0}</span> đ
                </div>
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
                        <span  className="b cl1"><span id="final-price">{orderDetail.base_grand_total ? formatVND(parseInt(orderDetail.base_grand_total)) : 0}</span> đ</span>  
                    </div> 
                </div> 
              </div>
              )}
              <div className="pd-20">
                <div className="row">
                  <div className="col-sm-6">
                    <a className="btn full btn-4" href="/">Tiếp tục mua hàng</a>
                  </div>
                  <div className="col-sm-6">
                    <a className="btn full" href="/">Về trang chủ</a>
                  </div>
                </div>
              </div>
            </div>
        </div>}
        </main>
      }
    </Layout>
  )
}

export default CheckoutGuest;