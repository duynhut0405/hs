import React from 'react'
import Link from "next/link";
import t from '../../../translation'

function ProductDetailFooterMobile() {
  return (
    <div className="action-detail">
      <Link href="#" >
        <a className="item item-1"><i className="icon-t26"></i> Live chat</a>
      </Link>
      <button className="item addtocart item-2"><i className="icon-cart2"></i> Thêm vào giỏ hàng</button>
      <Link href="#" >
        <a className="item item-3">Mua ngay</a>
      </Link>
    </div>
  )
}

export default ProductDetailFooterMobile