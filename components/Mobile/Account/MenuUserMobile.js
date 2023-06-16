import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { useAuth } from '../../../contexts/auth'
import t from '../../../translation'
import AcountCommonMobile from '../Account/AcountCommonMobile'
import { menuUser1, menuUser2 } from '../../../Data/menu';
import { useRouter } from 'next/router';

function MenuUser() {
  const { user, logout } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();
  return (
    <>
      {user != undefined && menuUser1 !== undefined && menuUser2 !== undefined && !showDetails && (
        <div className='box-shadow widget-user-info'>
          <div className='uname' onClick={() => setShowDetails(true)}>
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
              <li className={router?.asPath === item.link ? 'active' : ''} key={index}>
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
      {user != undefined && menuUser1 !== undefined && menuUser2 !== undefined && showDetails && (
        <>
          <a className='top-back' onClick={() => setShowDetails(false)}>
            <i className='icon-arrow-1 ix'></i> <span className='w5'>Tài khoản</span>
          </a>
          <main id='main' className='page-user-info'>
            <AcountCommonMobile />
          </main>
        </>
      )}
    </>
  );
}

export default MenuUser;
