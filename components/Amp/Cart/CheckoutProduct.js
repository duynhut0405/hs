import Link from 'next/link';
import Pagination from "react-js-pagination"
import {useEffect, useState} from 'react'
import formatVND from '../../../utils/formatVND'
import {useAuth} from '../../../contexts/auth'

function CheckoutProduct({ item }) {
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    setProduct(item);
  }, [])

  return (
    <>
    {product && (
      <div className="item ">
        <Link href={'/product/'+product.extension_attributes.url_key+''}>
          <a className="img tRes_68"><img src={product.extension_attributes.thumbnail ? product.extension_attributes.thumbnail : "/images/hoasen-product.jpg"}/></a>
        </Link>
        <div className="divtext">
            <div className="line-3 title">
              <Link href={'/product/'+product.extension_attributes.url_key+'.html'}>
                <a>{product.name}</a>
              </Link>
            </div>
            <div className="price">
                <strong>{formatVND(product.price)}</strong> <br/>
            </div>
            <div className="action">
              <span className="number">Số lượng: {product.qty}</span>
            </div>
        </div>
    </div>
    )}
    </>
  )
}

export default CheckoutProduct