import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import Cookies from 'js-cookie';

const propTypes = {
  data: PropTypes.array,
};

function SmallCartGuest({}) {
  const { isAuthenticated, setGetCartAgain, getCartAgain } = useAuth();
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    if (getCartAgain) {
      await getCart();
      setGetCartAgain(false);
    }
  }, [getCartAgain]);

  const getCart = async () => {
    const guestId = Cookies.get('cardId');
    if (!isAuthenticated && guestId) {
      try {
        const result = await api.get(`guest-carts/${guestId}`);
        setTotal(result.data.items.length);
      } catch (error) {
        Cookies.remove('cardId');
        window.location.reload();
        throw error;
      }
    }
  };
  useEffect(async () => {
    await getCart();
  }, []);

  return (
    <Link href='/cart' prefetch={false}>
      <a href='/cart' className='btn-cart'>
        <i className='icon-cart'></i>
        <span className='count'>{total}</span>
      </a>
    </Link>
  );
}

SmallCartGuest.propTypes = propTypes;

export default SmallCartGuest;
