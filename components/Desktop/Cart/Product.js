import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import formatVND from '../../../utils/formatVND';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import Cookie from 'js-cookie';
import ReactHtmlParser from 'react-html-parser';
import checkImageExist from '../../../utils/checkImageExist';
import getLastSlashProduct from '../../../utils/getLastSlashProduct';
import Axios from 'axios';
const newApiFCM = Axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: 'bearer dxxfgvmg8dps2af7m0soo7iyehfx8d23',
  },
});

function Product({ later, getCartLater, delete_item_cart2, item, setTotalAgain, caculatedResult, setItemBuylater, cate, loading }) {
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [productClientQty, setProductClientQty] = useState(null);
  const [isDisabled, setDisabled] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [isErrorInput, setErrorInput] = useState(null);
  const [totalLength, setTotalLength] = useState(null);
  const [isBuyLater, setIsBuyLater] = useState(false);
  const [isUpdatingQty, setIsUpdatingQty] = useState(false);
  useEffect(() => {
    setProduct(item);
    setProductClientQty(item.qty);
  }, [item]);

  useEffect(() => {
    setIsBuyLater(item.extension_attributes.is_buy_latter == 1);
  }, [item?.extension_attributes?.is_buy_latter]);

  useEffect(() => {
    if (productClientQty && product?.extension_attributes?.product_options) {
      const found = product.extension_attributes.product_options.find((element) => element.label == 'Chiều dài');
      if (found) {
        let mySubString = found.value.substring(found.value.lastIndexOf(`> `) + 1, found.value.lastIndexOf(` mét </span>`));
        let length = parseFloat(mySubString);
        if (length) {
          setTotalLength(Number.isInteger(length * productClientQty) ? length * productClientQty : (length * productClientQty).toFixed(2));
        }
      }
    }
  }, [isUpdatingQty, productClientQty]);

  const validateProductClientQty = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value == 0) {
      setErrorInput('Hãy nhập số lượng lớn hơn 0');
    } else {
      setErrorInput(null);
    }
    setProductClientQty(value);
    setIsUpdatingQty(true);
  };

  useEffect(() => {
    if (caculatedResult && caculatedResult.items) {
      const found = caculatedResult.items.find((element) => element.item_id == item.item_id);
      if (found?.options) {
        var obj = JSON.parse(found.options);
        setTotalPrice(found.base_row_total);
      }
    }
  }, [caculatedResult]);

  useEffect(async () => {
    if (product?.qty != 0 && productClientQty && isUpdatingQty) {
      await updateCartItemQty();
      await setTotalAgain();
    } else if (product && product.qty != item.qty && product.qty == 0) {
      setProduct({ ...product, qty: 1 });
      setProductClientQty(1);
      setErrorInput(null);
    }
    setDisabled(product?.extension_attributes?.is_buy_latter || false);
  }, [product]);

  const updateCartItemQty = async () => {
    const cardId = Cookie.get('cardId');
    if (!isAuthenticated && product) {
      try {
        const result = await api.post(`guest-carts/${cardId}/items`, {
          cartItem: {
            item_id: product.item_id,
            quote_id: cardId,
            sku: product.sku,
            qty: productClientQty,
            product_option: {
              extension_attributes: {
                is_buy_latter: isBuyLater,
              },
            },
          },
        });
      } catch (error) {
        alert('Lỗi server');
        window.location.reload();
      }
      // setTotalAgain();
    }
    if (isAuthenticated && product) {
      try {
        const result = await api.post(`service/carts/mine/items`, {
          cartItem: {
            item_id: product.item_id,
            sku: product.sku,
            qty: product.qty,
            product_option: {
              extension_attributes: {
                is_buy_latter: isBuyLater,
              },
            },
          },
        });

        if (result) {
          const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
            cartId: result.data.quote_id,
          });
        }
      } catch (error) {
        alert('Lỗi server');
        window.location.reload();
      }
    }
    setIsUpdatingQty(false);
  };

  const updateQty = (type) => {
    let qty = product.qty;
    if (qty == 1 && type == 'minus') {
      return;
    }
    setDisabled(true);
    setProduct({
      ...product,
      qty: type == 'minus' ? Number(qty) - 1 : Number(qty) + 1,
    });
    setProductClientQty(type == 'minus' ? Number(qty) - 1 : Number(qty) + 1);
    setIsUpdatingQty(true);
  };

  const deleteCartItem = async (id) => {
    if (later) {
      try {
        const result = await api.post(`/cart-buy-later/remove`, {
          itemIds: [product.item_id],
        });
        if (result) {
          await delete_item_cart2([product]);
        }
      } catch (error) {
        console.log('🚀 ~ file: Product.js ~ line 161 ~ deleteCartItem ~ error', error);
        throw error;
      }
      return;
    }
    const guestId = Cookie.get('cardId');
    if (!isAuthenticated) {
      try {
        const result = await api.delete(`guest-carts/${guestId}/items/` + product.item_id);
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const result = await api.delete(`carts/mine/items/` + product.item_id);
      } catch (error) {
        throw error;
      }
    }
    setTotalAgain();
  };

  return (
    <>
      {product && (
        <>
          <tr className='product-cart' key={product.id}>
            <td className=' list-p-3'>
              <label className='checkbox pull-left' style={{ width: '20px', height: '20px' }}>
                {product.price !== 0 && (
                  <>
                    <input name='radio' type='checkbox' checked={product.extension_attributes.is_buy_latter == 0} disabled={loading} onChange={(e) => setItemBuylater(e, product.item_id, product)} />
                    <span></span>
                  </>
                )}
              </label>

              <div className='product '>
                <Link href={'/product/' + getLastSlashProduct(product.extension_attributes.url_key)}>
                  <a className='img tRes_68'>
                    <img src={product.extension_attributes.thumbnail ? product.extension_attributes.thumbnail : '/images/hoasen-product.jpg'} onError={async (e) => await checkImageExist(e)} />
                  </a>
                </Link>
                <div className='divtext'>
                  <div className='title'>
                    <Link href={'/product/' + getLastSlashProduct(product.extension_attributes.url_key)}>
                      <a>{product.name}</a>
                    </Link>
                  </div>

                  {product.extension_attributes.product_options &&
                    product.extension_attributes.product_options.map((res, i) => (
                      <div key={i}>
                        <span style={{ fontSize: '14px', display: 'inline-block' }}> {res.label == 'Length' ? 'Chiều dài' : res.label}: &nbsp; </span>
                        {ReactHtmlParser(res.value)}
                        {res.label == 'Chiều dài' && totalLength && (
                          <span style={{ fontSize: '14px', display: 'inline-block' }}>
                            Tổng chiều dài: <span style={{ color: 'red' }}>{totalLength} mét</span>
                          </span>
                        )}
                      </div>
                    ))}
                  {product?.extension_attributes?.extra_info && (
                    <div>
                      <span style={{ fontSize: '14px', display: 'inline-block' }}>{'Loại sóng '}: &nbsp; </span>
                      <span style={{ fontSize: '14px', display: 'inline-block' }}>
                        <span style={{ color: 'red' }}>{product?.extension_attributes?.extra_info}</span>
                      </span>
                    </div>
                  )}
                  <div className='action-2 btnlike'>{product.price !== 0 && <a onClick={() => deleteCartItem()}>Xoá</a>}</div>
                  {product?.extension_attributes?.messages.length != 0 && (
                    <ul style={{ color: 'red' }}>
                      {product.extension_attributes.messages.map((message, i) => (
                        <li key={i}>{message == 'FREE!' ? 'Quà tặng' : message}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </td>
            <td>
              <span className='price' value={product.price}>
                {formatVND(product.price)}
              </span>{' '}
              đ <br />
            </td>
            <td>
              <div className='qualitys'>
                <button className='minus' disabled={isDisabled || product.price === 0} onClick={() => updateQty('minus')}>
                  <i className='icon-minus'></i>
                </button>
                <input
                  disabled={isDisabled || product.price === 0}
                  id={'qty_' + product.item_id}
                  className='number'
                  type='input'
                  min='1'
                  value={productClientQty}
                  onChange={(e) => validateProductClientQty(e)}
                  onBlur={(e) => setProduct({ ...product, qty: e.target.value })}
                />
                <button className='plus' disabled={isDisabled || product.price === 0} onClick={() => updateQty('plus')}>
                  <i className='icon-plus'></i>
                </button>
              </div>
              {isErrorInput && <div className='error'>{isErrorInput}</div>}
            </td>
            <td colSpan='w5'>{product.extension_attributes.is_buy_latter == 1 ? <span className='price-product'>0 đ</span> : <span className='price-product'>{totalPrice != null ? formatVND(totalPrice) : ''} đ</span>}</td>
          </tr>
        </>
      )}
    </>
  );
}

export default Product;
