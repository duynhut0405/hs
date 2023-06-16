import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import t from '../../../translation';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import formatVND from '../../../utils/formatVND';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import checkImageExist from '../../../utils/checkImageExist';
import getLastSlashProduct from '../../../utils/getLastSlashProduct';
import Axios from 'axios';
import Cookies from 'js-cookie';
const newApiFCM = Axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: 'bearer dxxfgvmg8dps2af7m0soo7iyehfx8d23',
  },
});

const propTypes = {
  data: PropTypes.array,
};

function SmallCart({}) {
  const { isAuthenticated, getCartAgain, setGetCartAgain, setCurrentCartState, getTotalUserInfo, caculatedResultAll } = useAuth();
  const [total, setTotal] = useState(0);
  const [currentCart, setCurrentCart] = useState(null);
  const [currentCartID, setCurrentCartID] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [active, setActive] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();

  useEffect(async () => {
    if (modalShow) {
      await setTimeout(() => {
        setModalShow(false);
      }, 1000);
    }
  }, [modalShow]);

  useEffect(() => {
    setTotalPrice(caculatedResultAll?.grand_total);
  }, [caculatedResultAll]);

  useEffect(async () => {
    if (getCartAgain) {
      await getCart();
      setGetCartAgain(false);
    }
  }, [getCartAgain]);

  const getCart = async () => {
    if (isAuthenticated) {
      let price = 0;
      try {
        const result = await api.get('carts/mine');
        setCurrentCartID(result.data.id.toString());
        setCurrentCart(result.data.items);
        setCurrentCartState(result.data.items);
        setTotal(result.data.items.length);
        await getTotalUserInfo();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteCartItem = async (id) => {
    if (isAuthenticated) {
      try {
        const result = await api.delete('carts/mine/items/' + id);
        getCart();
        if (result) {
          const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
            cartId: currentCartID,
          });
        }
        if (router.asPath == '/cart' || router.asPath == '/checkout') {
          window.location.reload();
        }
      } catch (error) {
        throw error;
      }
    }
  };
  useEffect(async () => {
    getCart();
  }, [isAuthenticated]);

  const setActiveDropDown = () => {
    if (total == 0) {
      router.push('/cart');
    } else {
      setActive(!active);
    }
  };

  return (
    <>
      <div className={` widget-mini-cart ${active ? 'toggleClass active dropdown' : ''}`} onClick={() => setActiveDropDown()}>
        <div className='toggle tx1'>
          <span className='img'>
            {' '}
            <i className='icon-cart'></i> <span className='count'>{total}</span>
          </span>
          <span className='tx2'> {t('cart')} </span>
        </div>
        <div className='dropdown-content content-cart box-shadow'>
          <div className='dropdown-heading'>{t('cart')}</div>
          <div className='top mb-15'>
            <div className='t1'>
              {t('product')}: {total ? total : 0}
            </div>
            {/* <div className="t2">{t('to_money')}</div>
          <div className="t3">{totalPrice && formatVND(totalPrice)} đ</div> */}
          </div>
          {currentCart && (
            <ul className='cart-list  list-p-3'>
              {currentCart
                .slice(0)
                .reverse()
                .map((item, index) => (
                  <li key={index}>
                    <div className='item '>
                      <Link href={item.extension_attributes ? '/product/' + getLastSlashProduct(item.extension_attributes.url_key) : '/'}>
                        <a className='img tRes_68'>
                          <img src={item.extension_attributes ? item.extension_attributes.thumbnail : 'images/product.jpg'} alt='' onError={async (e) => await checkImageExist(e)} />
                        </a>
                      </Link>
                      <div className='divtext'>
                        <div className='line-3 title'>
                          <Link href={item.extension_attributes ? '/product/' + getLastSlashProduct(item.extension_attributes.url_key) : '/'}>
                            <a>{item.name}</a>
                          </Link>
                        </div>
                        <div className='price'>
                          <strong>{formatVND(item.price)} đ</strong>
                          {/* <span className="per">-30%</span> */}
                        </div>
                        <div className='action'>
                          <span className='number'>
                            {t('qty')}: {item.qty}
                          </span>
                          <ul className='ulmeta inline bd'>
                            {/* <li><a href="#">Sửa</a></li> */}
                            <li>
                              <a onClick={() => deleteCartItem(item.item_id)}>Xoá</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
          <div className='bottom'>
            <Link href='/cart' prefetch={false}>
              <a className='btn btn-4' href='#'>
                {t('view_cart')}
              </a>
            </Link>
            <Link href='/checkout' prefetch={false}>
              <a className='btn' href='#'>
                Thanh toán
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Modal size='sm' show={modalShow} onHide={() => setModalShow(false)}>
        <div className='pd-20'>{'Chưa có sản phẩm cho giỏ hàng'}</div>
      </Modal>
    </>
  );
}

SmallCart.propTypes = propTypes;

export default SmallCart;
