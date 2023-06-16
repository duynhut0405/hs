import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../contexts/auth';
import t from '../../../translation';
import Link from 'next/link';

const listMenuUser = [
  {
    name: t('account_info'),
    icon: 'icon-login2',
    link: '/account',
  },
  {
    name: t('order_manage'),
    icon: 'icon-t8',
    link: '/account/order-list',
  },
  {
    name: t('buyed_product'),
    icon: 'icon-cart1',
    link: '/account/order-product',
  },
  {
    name: t('wishlist'),
    icon: 'icon-like',
    link: '/account/wishlist',
  },
  {
    name: t('my_review'),
    icon: 'icon-t181',
    link: '/account/my-review',
  },
  {
    name: t('notification'),
    icon: 'icon-like',
    link: '/account/notification',
  },
  {
    name: t('received_location'),
    icon: 'icon-t9',
    link: '/account/user-address',
  },
];

function UserHeader({}) {
  const { user, logout } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [menuRef, setMenuRef] = useState(React.useRef(null));

  const handleClick = (e) => {
    if (menuRef.current != null && !menuRef.current.contains(e.target)) {
      setIsActive(false);
    }
  };

  const setLogout = () => {
    logout();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={`dropdown toggleClass ${isActive ? 'active' : ''}`} ref={menuRef}>
      <div className='toggle tx1 ' onClick={() => setIsActive(!isActive)}>
        <span className='img'>
          <i className='icon-login2'></i>
        </span>{' '}
        <span className='text-item btnlike'>{user.lastname}</span>
      </div>
      <div className='dropdown-content content-cart box-shadow'>
        <div className='dropdown-heading'> {t('account')} </div>
        <ul className='menu-user-info'>
          {listMenuUser.map((item, index) => (
            <li className='' key={index}>
              <Link href={item.link}>
                <a>
                  <i className={item.icon} />
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
          <li className='btnlike'>
            <a onClick={() => setLogout()}>
              <i className='icon-t10' />
              {t('log_out')}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserHeader;
