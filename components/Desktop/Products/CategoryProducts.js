import React, { useEffect, useState } from 'react'
import t from '../../../translation'
import CategoryProduct from '../ProductBox/CategoryProduct'
import CategoryProductItem from '../ProductBox/CategoryProductItem'
import api from '../../../services/api'
import Link from 'next/link'
import Cookies from 'js-cookie'
import {useCurrentCategory} from '../../../contexts/currentCategory'

const render = [0, 1, 2, 3 , 4, 5];
function CategoryProducts({ data, category, configPrice, isShowModal }) {
  // const [products, setProducts] = useState([]);
  const [isFetching ,setIsFetching] = useState(false);
  const {products} = useCurrentCategory(); 

  return (
    !isShowModal ?
    <section className="r2 sec-tb mb-30 border-bottom" >
      <div className=" entry-head lazy-hidden ef ef-tx-t">
        <h2 className="ht">Sản phẩm cùng danh mục</h2>
        <Link href={`/${category.path.replace(".html","")}`}>
          <a href={`/${category.path.replace(".html","")}`} className="viewall">Xem tất cả danh mục sản phẩm <i className="icon-arrow-2"></i></a>
        </Link>
      </div>
      <div className="row  list-item list-p-1">
        {products && products.length != 0 && render.map((item, index) => (
          products[item] ?
          <div className="col-lg-2  col-4 " key={index}>
            <CategoryProduct data={products[item]} configPrice={configPrice} />
          </div>:
          null
        ))}
      </div>
    </section>
    :
    <div className="widget-mini-cart">
      <div className="dropdown-heading">Sản phẩm khác</div>
        <ul id="category_modal" className="cart-list list-p-3" style={{maxHeight: 'calc(100vh - 100px)'}}>
          {products && products.length != 0 && products.map((item, index) => (
            <li key={index}>
            <CategoryProductItem data={item} configPrice={configPrice}/>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default CategoryProducts