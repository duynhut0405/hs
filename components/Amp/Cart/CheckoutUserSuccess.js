import React, {useState, useEffect} from 'react'
import LayoutMobileOnlyHead from '../LayoutMobileOnlyHead'
import HeaderMobile from '../HeaderMobile'
import api from '../../../services/api'
import {useAuth} from '../../../contexts/auth'
import formatVND from '../../../utils/formatVND'
import Axios from 'axios'
import { useRouter } from 'next/router'
import t from '../../../translation'

const newApiProduct = Axios.create({
  baseURL: 'https://magento2.mangoads.com.vn/rest/V1/products/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'bearer wym2xk7jpenm7xa89aorsz84updxd4zo'
  }
});

const newApiCategory = Axios.create({
  baseURL: 'https://magento2.mangoads.com.vn/rest/V1/categories/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'bearer wym2xk7jpenm7xa89aorsz84updxd4zo'
  }
});

function CheckoutUserSuccess({}) {

  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [listCategoryId, SetListCategory] = useState([]);
  const [listCategoryDetails, SetCategoriesDetails] = useState([]);
  const [categoryProducts, SetCategoryProducts] = useState([]);

  //Get order base on request
  useEffect(async () => {
    let initOrder = {};
    if (user != null) {
      try {
        const result = await api.get(`/service/order/${id}`);
        if (result.status === 200) {
          initOrder = result.data;
        }
      } catch (error) {
        console.log(error);
      }
      setOrder(initOrder);
    }
  }, [user])

  //Get category id list base on order product
  useEffect(async () => {
    if (order != null) {
      var categoryIdList = [];
      await order.items.forEach(async (item, index) => {
        try {
          const result = await newApiProduct.get(`/${item.sku}`);
          if (!item.parent_item) {
            let category = {
              categoryId: result.data.extension_attributes.category_links[0].category_id,
              product: item
            }
            categoryIdList.push(category);
          }

          if (index + 1 === order.items.length) {
            SetListCategory(categoryIdList);
          }
        } catch (error) {
          console.log(error);
        }
      })
    }
  }, [order])

  //Get category details and name
  useEffect(async () => {
    var categoriesId = [];
    var categoriesDetails = [];
    listCategoryId.forEach(element => {
      if (!categoriesId.includes(element.categoryId)) {
        categoriesId.push(element.categoryId);
      }
    });
    await categoriesId.forEach(async (item, index) => {
      try {
        const result = await newApiCategory.get(`/${item}`);
        categoriesDetails.push({
          categoryName: result.data.name,
          id: item,
          products: []
        })
        if (index + 1 === categoriesId.length) {
          SetCategoriesDetails(categoriesDetails);
        }
      } catch (error) {
        console.log(error);
      }
    })
  }, [order,listCategoryId.length])

  //set result to render after sort products by categories;
  useEffect(async () => {
    if (listCategoryDetails.length != 0) {
      let resultCategoryProduct = listCategoryDetails;

      resultCategoryProduct.forEach(category => {
        listCategoryId.forEach(element => {
          if (element.categoryId === category.id) {
            category.products.push(element)
          }
        });
      });
      SetCategoryProducts(resultCategoryProduct);
    }
  }, [listCategoryDetails])

  return (
    <>
    <LayoutMobileOnlyHead/>
    <HeaderMobile/>
      {order && <main className={`sec-tb page-success`}>
        
          <div className="entry-heading text-center">
              <h1>Đặt hàng thành công</h1>
              <div className="desc">Mã đơn hàng: <span className="w5">{order.increment_id}</span>
              </div>
          </div>
          <div className="box-shadow box-product mb-20 box-confirm ">

            <div className="pd-20">
              <div className="mb-10 b w7">{t('recieved_info')}</div>
              <div>
                <span className="w5">{order.billing_address.lastname} {order.billing_address.firstname}</span> <br />
                {order.billing_address.telephone} <br />
                {order.billing_address.street} {order.billing_address.city}
              </div>
            </div>
            <div className="pd-20">
              <div className="mb-10 b w7">Hình thức thanh toán</div>
              <div>
                <img src="/images/svg/t11.svg" alt="" />&nbsp;&nbsp;
                {order.payment.additional_information[0]}
              </div>
            </div>

            <h6 className="box-title-2">Danh sách sản phẩm</h6>
            <div className=" list-p-3">
              {order.items.map((value, i) => (
                !value.parent_item &&
                <div className="item " key={i}>
                  <a href={value.extension_attributes.url_key ?  `/product/${value.extension_attributes.url_key}.html` : "#"} className="img tRes_68">
                    <img src={value.extension_attributes.thumbnail ? value.extension_attributes.thumbnail : "/images/hoasen-product.jpg"} alt="" />
                  </a>
                  <div className="divtext">
                    <div className="line-3 title"><a href={value.extension_attributes.url_key ?  `/product/${value.extension_attributes.url_key}.html` : "#"}>{value.name}</a></div>
                    <div className="price">
                      <strong>{formatVND(value.base_row_total)} đ</strong> <br />
                      {/* <span className="price-old">1.500.000 đ</span> */}
                    </div>
                    <div className="action">
                      <span className="number">{t('number')}: {value.qty_ordered}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="widget-total-cart ">
              <h6 className="widget-title">Giá trị đơn hàng</h6>
              <div className="items">
                <div className="r1">
                    <span className="pull-left cl4">Tạm tính</span>
                    <span id="total-price" className="b">{formatVND(order.subtotal)}</span>  đ
                </div>
                <div className="r1">
                    <span className="pull-left cl4">Phí vận chuyển</span>
                    <span id="charges" className="b" price="150000">{formatVND(order.shipping_amount)}</span> đ 
                </div>
                {/* <div className="r1">
                    <span className="pull-left cl4">Thuế</span>
                    <span id="charges" className="b">{order.tax_amount ? formatVND(order.tax_amount): 0}</span> đ
                </div>     */}
              </div>
              {order.coupon_code && order.coupon_code.length > 0 && (
                <div id="coupons" className="items coupons active">
                    <h6 className="title" >Mã khuyến mãi <span className="code extend">{order.coupon_code}</span></h6>
                    <p className="r1 extend mb-10">
                        <span className="pull-left cl4">Giảm</span>
                        <span id="coupon" price="50000" className="b">{order.discount_amount}</span>  đ
                    </p>     
                </div> 
              )}
              <div className="items">
                    <div className="r1">
                      <span className="pull-left b">Tổng tiền</span>
                      <span  className="b cl1"><span id="final-price">{formatVND(order.base_grand_total)}</span> đ</span>  
                  </div> 
              </div> 
            </div>
            
          </div>
      </main>}
      <div className="w-final-price">
        <a href="/" className="btn btn-4 full mb-10">Tiếp tục mua hàng</a>
        <a href="/categories" className="btn btn-4 full">Về trang chủ</a>
      </div>
    </>
  )
}

export default CheckoutUserSuccess;