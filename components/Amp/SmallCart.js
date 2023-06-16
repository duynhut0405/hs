import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {useAuth} from '../../contexts/auth'
import api from '../../services/api'

const propTypes = {
  data: PropTypes.array
};

function SmallCart({}) {
  const { isAuthenticated } = useAuth();
  const [total, setTotal] = useState(0);

  const getCart = async () => {
    if (isAuthenticated) {
      let price = 0;
      try {
        const result = await api.get('carts/mine');
        setTotal(result.data.items_qty);
        result.data.items.forEach(element => {
          price += (element.price * element.qty);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(async () => {
    getCart();
  }, [isAuthenticated])

  return (
    <Link href="/cart">
      <a href="#" className="btn-cart">
        <i className="icon-cart"></i>
        <span className="count">{total}</span>
      </a>
    </Link>
  );
}

SmallCart.propTypes = propTypes;

export default SmallCart;
