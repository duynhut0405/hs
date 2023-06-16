import Link from 'next/link';
import Pagination from "react-js-pagination"
import {useEffect, useState} from 'react'
import formatVND from '../../../utils/formatVND'
import {useAuth} from '../../../contexts/auth'
import ReactHtmlParser from 'react-html-parser'
import checkImageExist from '../../../utils/checkImageExist'
import getLastSlashProduct from '../../../utils/getLastSlashProduct';

function CheckoutProduct({ item }) {
  const [product, setProduct] = useState(null);
  const [totalLength, setTotalLength] = useState(null);
  const [productClientQty, setProductClientQty] = useState(null);
  
  useEffect(() => {
    setProduct(item);
    setProductClientQty(item.qty);
  }, [])

  useEffect(() => {
    if (product && productClientQty && product.extension_attributes && product.extension_attributes.product_options) {
      const found = product.extension_attributes.product_options.find(element => element.label == 'Chiều dài');
      if (found) {
        let mySubString = found.value.substring(found.value.lastIndexOf(`> `) + 1, found.value.lastIndexOf(` mét </span>`));
        let length = parseFloat(mySubString);
        if (length) {
          setTotalLength(Number.isInteger(length*productClientQty) ? length*productClientQty : (length*productClientQty).toFixed(2))
        }
      }
    }
  }, [productClientQty])

  return (
    <>
      {product && (
        <div className='item '>
          <Link href={'/product/' + getLastSlashProduct(product.extension_attributes.url_key)}>
            <a className='img tRes_68'>
              <img src={product.extension_attributes.thumbnail ? product.extension_attributes.thumbnail : '/images/hoasen-product.jpg'} onError={async (e) => await checkImageExist(e)} />
            </a>
          </Link>
          <div className='divtext'>
            <div className='line-3 title'>
              <Link href={'/product/' + getLastSlashProduct(product.extension_attributes.url_key)}>
                <a>{product.name}</a>
              </Link>
            </div>
            <div className='price'>
              <strong>{formatVND(product.price)} đ</strong> <br />
            </div>
            {product.extension_attributes.product_options &&
              product.extension_attributes.product_options.map((res, i) => (
                <>
                  <div>
                    <span style={{ fontSize: '14px', display: 'inline-block' }}> {res.label == 'Chiều dài' ? 'Chiều dài' : res.label}: &nbsp; </span>
                    {ReactHtmlParser(res.value)}
                    {res.label == 'Chiều dài' && totalLength && (
                      <span style={{ fontSize: '14px', display: 'inline-block' }}>
                        Tổng chiều dài: <span style={{ color: 'red' }}>{totalLength} mét</span>
                      </span>
                    )}
                  </div>
                </>
              ))}
            {product?.extension_attributes?.extra_info && (
              <div>
                <span style={{ fontSize: '14px', display: 'inline-block' }}>{'Loại sóng '}: &nbsp; </span>
                <span style={{ fontSize: '14px', display: 'inline-block' }}>
                  <span style={{ color: 'red' }}>{product?.extension_attributes?.extra_info}</span>
                </span>
              </div>
            )}
            <div className='action'>
              <span className='number'>Số lượng: {product.qty}</span>
            </div>
            {product?.extension_attributes?.messages.length != 0 && (
              <ul style={{ color: 'red' }}>
                {product.extension_attributes.messages.map((message, i) => (
                  <li key={i}>{message == 'FREE!' ? 'Quà tặng' : message}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CheckoutProduct