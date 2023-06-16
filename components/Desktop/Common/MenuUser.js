import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useAuth } from "../../../contexts/auth";
import t from "../../../translation";
import { useRouter } from 'next/router';
import { menuUser1, menuUser2 } from '../../../Data/menu';

function MenuUser({  checkActive }) {
  const [check, setCheck] = useState('');
  const handleClick = async (params) => {
    setCheck(params);
  };

  const router = useRouter();
  const { user, logout } = useAuth();
  return (
    <>
      {user != undefined && menuUser1 !== undefined && menuUser2 !== undefined && (
        <div className='box-shadow widget-user-info mb-20'>
          <div className='uname'>
            <span className='img tRes'>
              <img width='30' height='30' src='/images/logo.svg' alt='' />
            </span>
            <div className='text'>
              {user.lastname != undefined && user.firstname != undefined && (
                <div className='t1'>
                  {user.lastname} {user.firstname}
                </div>
              )}
              {user.email != undefined && <div className='t2'>{user.email}</div>}
            </div>
          </div>
          <ul className='menu-user-info'>
            {menuUser1.map((item, index) => (
              <li className={router?.asPath === item.link ? 'active' : ''} key={index}>
                <Link href={item.link}>
                  <a>
                    {item.icon === 'bell' ? <img className='icon-bell' src='/images/svg/bell.svg'></img> : <i className={item.icon} />}
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <ul className='menu-user-info'>
            {menuUser2.map((item, index) => (
              <li
                className={router?.asPath === item.link ? 'active' : ''}
                key={index}
                onClick={() => {
                  handleClick(item.icon);
                }}
              >
                <Link href={item.link}>
                  <a>
                    <i className={item.icon} />
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
            <li>
              <a onClick={() => logout()}>
                <i className={'icon-t10'} />
                {t('log_out')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default MenuUser;
