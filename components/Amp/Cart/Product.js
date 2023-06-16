import Link from 'next/link';
import Pagination from "react-js-pagination"
import {useEffect, useState} from 'react'
import formatVND from '../../../utils/formatVND'
import {useAuth} from '../../../contexts/auth'
import api from '../../../services/api'
import Cookie from 'js-cookie'
import getLastSlashProduct from '../../../utils/getLastSlashProduct';

function Product({ item, setIsDeleted, setTotalAgain, caculatedResult, setItemBuylater }) {
  const {isAuthenticated} = useAuth();
  const [product, setProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  useEffect(() => {
    setProduct(item);
  }, [])

  useEffect(() => {
    if (caculatedResult && caculatedResult.items) {
      const found = caculatedResult.items.find(element => element.item_id == item.item_id);
      var obj = JSON.parse(found.options);
      setTotalPrice(found.base_row_total);
    }

  }, [caculatedResult])

  useEffect(async () => {
    if (product && product.qty != item.qty && product.qty != 0) {
      await updateCartItemQty();
      await setTotalAgain();
    }
  }, [product])

  const updateCartItemQty = async () => {
    const cardId = Cookie.get('cardId');
    if (!isAuthenticated && product) {
      try {
        const result = await api.post(`guest-carts/${cardId}/items`, {
          cartItem: {
            item_id: product.item_id,
            quote_id: cardId,
            sku: product.sku,
            qty: product.qty,
            product_option: {
              extension_attributes: {
                
              }
            }
          } 
        })
      } catch (error) {
        alert(error.response.data.message);
        // location.reload();
        throw error
      }
      setTotalAgain();
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
                
              }
            }
          } 
        })
      } catch (error) {
        alert("Sản phẩm không tồn tại. Vui lòng kiểm tra và thử lại.");
        throw error
      }
    }
  }

  const updateQty = (type) => {
    let qty = product.qty;
    if (qty == 1 && type == 'minus') {
      return;
    }
    setProduct({
      ...product,
      qty: type == 'minus' ? (qty-1) : (qty+1) 
    })
  }

  const deleteCartItem = async (id) => {
    const guestId = Cookie.get('cardId');
    if (!isAuthenticated) {
      try {
        const result = await api.delete(`guest-carts/${guestId}/items/` + product.item_id);
        location.reload();
      } catch (error) {
        throw error
      }
    } else {
      try {
        const result = await api.delete(`carts/mine/items/` + product.item_id);
        location.reload();
      } catch (error) {
        throw error
      }
    }
  }

  return (
    <>
    {product && (
      <tr className="item-cart" key={product.id}>
      <td className=" list-p-3">
        <label className="checkbox pull-left" style={{'width':'20px','height':'20px'}}>
          <input  name="radio" type="checkbox" checked={product.extension_attributes.is_buy_latter == 0} onChange={(e) => setItemBuylater(e, product.item_id)}/>
          <span></span>
        </label>
        <div className="item  ">
          <Link href={'/product/'+getLastSlashProduct(product.extension_attributes.url_key)}>
            <a className="img tRes_68"><img src={product.extension_attributes.thumbnail ? product.extension_attributes.thumbnail : "/images/hoasen-product.jpg"}/></a>
          </Link>
          <div className="divtext">
              <div className="title">
                <Link href={'/product/'+getLastSlashProduct(product.extension_attributes.url_key)}>
                  <a>{product.name}</a>
                </Link>
              </div>
              <div>
                <span className="price" value={product.price}>{formatVND(product.price)}</span> đ <br/>
              </div>
              <div className="wqualitys">
                <span className="t1">Số lượng:</span>
                <div className="qualitys"> 
                    <a className="minus" onClick={() => updateQty('minus')}><i className="icon-minus"></i></a>
                    <input  id={'qty_'+product.item_id} className="number" type="number" min="1" value={product.qty} onChange={(e) => setProduct({...product, qty: e.target.value})}/>
                    <a className="plus" onClick={() => updateQty('plus')}><i className="icon-plus"></i></a>
                </div>
              </div>
              
              {product.extension_attributes.product_options && product.extension_attributes.product_options.map((res, i) => (
                <><small key={i}>{res.label}: <small style={{color: "red"}}>{res.value}</small></small><br/></>
              ))}
              <div className="action-2">
                  {/* <a href="#">Sửa</a> | */}
                  <a href="#" onClick={() => deleteCartItem()}>Xoá</a>            
              </div>
          </div>
        </div>
      </td>
    </tr>
    )}
    </>
  )
}

export default Product