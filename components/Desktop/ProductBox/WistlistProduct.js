import React,{useEffect} from 'react'
import formatVND from '../../../utils/formatVND'
import api from '../../../services/api'
import Link from 'next/link'
import checkImageExist from '../../../utils/checkImageExist'
import getLastSlashProduct from '../../../utils/getLastSlashProduct'

function Product({ data }) {
  const removeWishlist = async () => {
    try {
      const result = await api.delete(`service/wishlist/delete/`+ data.wishlist_item_id);
      if (result.status == 200) {
        location.reload();
      }
    } catch (error) {
      throw error;
    }
  }
  return (
    <div className="item ">
      <Link href={'/product/' + getLastSlashProduct(data.product.request_path)}>
        <a className="img tRes_68">
          <img src={data.product.image} onError={async (e) => await checkImageExist(e)}></img>
        </a>      
      </Link>

      <div className="divtext">
        <a className="review" onClick={() => removeWishlist()}>Xoá</a>
        <div className="line-3 title">
          <Link href={'/product/' + getLastSlashProduct(data.product.request_path)}>
            <a>{data.product.name}</a>
          </Link>
        </div>
        <div className="price">
            <strong>{formatVND(data.product.final_price)} đ</strong> <br/> 
            {/* <span className="price-old">1.500.000 đ</span> */}
        </div>
        <div className="action">
          {/* <span className="number">Số lượng: 1</span> <br/> */}
          <Link href={`/product/${getLastSlashProduct(data.product.request_path)}`}>
            <a href={`/product/${getLastSlashProduct(data.product.request_path)}`} className="cart">Thêm vào giỏ hàng</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Product