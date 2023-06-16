import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import {useAuth} from '../../contexts/auth'
import api from '../../services/api'
import Cookies from 'js-cookie'

const propTypes = {
  data: PropTypes.array
};

function SmallCartGuest({}) {
  const { isAuthenticated } = useAuth();
  const [total, setTotal] = useState(0);

  const getCart = async () => {
    const guestId = Cookies.get('cardId');
    if (!isAuthenticated && guestId) {
      try {
        const result = await api.get(`guest-carts/${guestId}`);
        setTotal(result.data.items.length);
      } catch (error) {
        throw error
      }
    }
  }
  useEffect(async () => {
    await getCart();
  }, [])

  return (
    <Link href="/cart">
      <a href="#" className="btn-cart">
        <i className="icon-cart"></i>
        <span className="count">{total}</span>
      </a>
    </Link>
  );
}

SmallCartGuest.propTypes = propTypes;

export default SmallCartGuest;
