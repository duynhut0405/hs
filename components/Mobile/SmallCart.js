import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

const propTypes = {
  data: PropTypes.array,
};

function SmallCart({}) {
  const { isAuthenticated, setGetCartAgain, getCartAgain, setCurrentCartState } = useAuth();
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    if (getCartAgain) {
      await getCart();
      setGetCartAgain(false);
    }
  }, [getCartAgain]);

  const getCart = async () => {
    if (typeof window !== 'undefined') {
      if (isAuthenticated) {
        let price = 0;
        try {
          const result = await api.get('carts/mine');
          setTotal(result.data.items.length);
          setCurrentCartState(result.data.items);
          result.data.items.forEach((element) => {
            price += element.price * element.qty;
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  useEffect(async () => {
    getCart();
  }, [isAuthenticated]);

  return (
    <Link href='/cart'>
      <a href='#' className='btn-cart'>
        <i className='icon-cart'></i>
        <span className='count'>{total}</span>
      </a>
    </Link>
  );
}

SmallCart.propTypes = propTypes;

export default SmallCart;
