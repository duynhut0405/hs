import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import t from '../../../translation';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import formatVND from '../../../utils/formatVND';
import Cookies from 'js-cookie';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import checkImageExist from '../../../utils/checkImageExist';
import getLastSlashProduct from '../../../utils/getLastSlashProduct';
const propTypes = {
  data: PropTypes.array,
};

function SmallCartGuest({}) {
  const { isAuthenticated, getCartAgain, setGetCartAgain, getTotalGuestInfo, caculatedResultAll } = useAuth();
  const [total, setTotal] = useState(0);
  const [currentCart, setCurrentCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [active, setActive] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [caculatedResult, setCaculatedResult] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    if (getCartAgain) {
      await getCart();
      setGetCartAgain(false);
    }
  }, [getCartAgain]);

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

  const getCart = async () => {
    const guestId = Cookies.get('cardId');
    if (!isAuthenticated && guestId) {
      let price = 0;
      try {
        const result = await api.get(`guest-carts/${guestId}`);

        setCurrentCart(result.data.items);
        setTotal(result.data.items.length);
        result.data.items.forEach((element) => {
          price += element.price * element.qty;
        });
        await getTotalGuestInfo();
      } catch (error) {
        Cookies.remove('cardId');
        window.location.reload();
        throw error;
      }
    }
  };
  const deleteCartItem = async (id) => {
    const guestId = Cookies.get('cardId');
    if (!isAuthenticated) {
      try {
        const result = await api.delete(`guest-carts/${guestId}/items/` + id);
        if (router.asPath == '/cart' || router.asPath == '/checkout') {
          window.location.reload();
        }
        getCart();
      } catch (error) {
        throw error;
      }
    }
  };
  useEffect(async () => {
    await getCart();
  }, []);

  const setActiveDropDown = () => {
    if (total == 0) {
      router.push('/cart');
    } else {
      setActive(!active);
    }
  };

  return (
    <>
      <div className={` widget-mini-cart ${active ? 'dropdown  toggleClass active' : ''}`} onClick={() => setActiveDropDown()}>
        <div className='toggle tx1'>
          <span className='img'>
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
            {/*           <div className="t2">{t('to_money')}</div>
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
              <a className='btn btn-4'>{t('view_cart')}</a>
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

SmallCartGuest.propTypes = propTypes;

export default SmallCartGuest;
