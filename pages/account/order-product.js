import React from 'react'
import Layout from '../../components/Desktop/Layout'
import BreadCrumb from '../../components/Desktop/Common/BreadCrumb'
import t from '../../translation'
import MenuUser from '../../components/Desktop/Common/MenuUser'
import { useAuth } from '../../contexts/auth'
import Link from 'next/link'
import formatVND from '../../utils/formatVND'
import IsMobile from '../../utils/detectMobile'
import LayoutMobile from '../../components/Mobile/LayoutMobile'
import checkImageExist from '../../utils/checkImageExist'
import getLastSlashProduct from '../../utils/getLastSlashProduct'

function OrderProduct({isMobile}) {
  const {orderedProducts} = useAuth();
  return (
    isMobile ?
    <LayoutMobile>
      <Link href="/account">
        <div id="header" className="page-top-heading">
            <a className="back icon-arrow-1 ix"></a>
            <h1>Sản phẩm đã mua</h1>
        </div>
      </Link>
      <main className="page-user-order">
        {(orderedProducts && orderedProducts.length != 0) && (
          
            <div className="box-product mb-20">
              <div className=" list-p-3">
                {orderedProducts.map((item, index) => (
                  <div className="item" key={index}>
                    <Link href={`/product/${getLastSlashProduct(item.extension_attributes.url_key)}`}>
                    <a href={`/product/${getLastSlashProduct(item.extension_attributes.url_key)}`} className="img tRes_68">
                      <img src={item.extension_attributes.thumbnail ? item.extension_attributes.thumbnail : "/images/hoasen-product.jpg" } alt="" onError={async (e) => await checkImageExist(e)}/>
                    </a>
                    </Link>
                    <div className="divtext">
                      <Link href={`/product/${getLastSlashProduct(item.extension_attributes.url_key)}`}>
                        <a href={`/product/${getLastSlashProduct(item.extension_attributes.url_key)}`} className="w5">{item.name}</a>
                      </Link>
                      <table className="table">
                        {item.extension_attributes.options && item.extension_attributes.options.map((option, i) => (
                          <tr key={i}>
                              <th>{option.label}: </th>
                              <td>{option.value}</td>
                          </tr>
                        ))}
                        <tr>
                            <th>Giá:</th>
                            <td><strong>{formatVND(item.price)} đ</strong></td>
                        </tr>
                        <tr>
                            <th>Số lượng:</th>
                            <td>{item.qty_ordered}</td>
                        </tr>
                        <tr>
                            <th>Tổng tiền:</th>
                            <td>{formatVND(item.base_row_total_incl_tax)} đ</td>
                        </tr>
                      </table>
                      <Link href={item.extension_attributes.url_key ? `/product/${getLastSlashProduct(item.extension_attributes.url_key)}` : '#'}>
                        <a href={item.extension_attributes.url_key ? `/product/${getLastSlashProduct(item.extension_attributes.url_key)}` : '#'} className="review">Xem sản phẩm</a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
        )}
      </main>
    </LayoutMobile>
    :
    <Layout>
      <BreadCrumb data={[{name: t('account_info'), link: '/account', isActive: false},{name: t('buyed_product'), link: '/account/order-product', isActive: true}]}/>
      <main className="sec-tb page-user-order">
        <div className="container">
          <div className="row ">
            <div className="col-md-3 sidebar-user">
              <MenuUser/>
            </div>
            {(orderedProducts && orderedProducts.length != 0) && (
              <div className="col-12 col-md-9">
                <div className="box-shadow box-product mb-20">
                  <h6 className="box-title-3">{t('buyed_product')}</h6>
                  <div className=" list-p-3">
                    {orderedProducts.map((item, index) => (
                      <div className="item" key={index}>
                        <Link href={item.extension_attributes.url_key ? `/product/${getLastSlashProduct(item.extension_attributes.url_key)}` : '#'}>
                        <a href={item.extension_attributes.url_key ? `/product/${getLastSlashProduct(item.extension_attributes.url_key)}` : '#'} className="img tRes_68">
                          <img src={item.extension_attributes.thumbnail ? item.extension_attributes.thumbnail : "/images/hoasen-product.jpg" } alt="" onError={async (e) => await checkImageExist(e)}/>
                        </a>
                        </Link>
                        <div className="divtext">
                          <Link href={item.extension_attributes.url_key ? `/product/${getLastSlashProduct(item.extension_attributes.url_key)}` : '#'}>
                            <a href={item.extension_attributes.url_key ? `/product/${getLastSlashProduct(item.extension_attributes.url_key)}` : '#'} className="review">Xem sản phẩm</a>
                          </Link>
                          <div className="line-3 title">
                          <Link href={`/product/${getLastSlashProduct(item.extension_attributes.url_key)}`}>
                            <a href={`/product/${getLastSlashProduct(item.extension_attributes.url_key)}`} className="w5">{item.name}</a>
                          </Link>
                          </div>
                          <div className="price">
                              <strong>{formatVND(item.price)} đ</strong> <br/>
                              {/* <span className="price-old">1.500.000 đ</span> */}
                          </div>
                          <div className="action">
                            <span className="number">Số lượng: {item.qty_ordered}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } }
}

export default OrderProduct;