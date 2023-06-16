import React from 'react';
import Link from 'next/link';
import t from '../../translation';
import AddressModalMobile from './Common/MobileModal/AddressModalMobile';
import Image from 'next/image';

function HeaderMobile({}) {
  return (
    <header id='header' role='banner'>
      <div className='container '>
        <div className='row center'>
          <div className='col-auto'>
            <Link href='/' prefetch={false}>
              <a id='logo'>
                <img height={50} width={50} src='/images/logo.svg' alt='hoasen logo' />
              </a>
            </Link>
          </div>
          <div className='col'>
            <div className='pull-right'>
              <AddressModalMobile showLocation={true} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderMobile;
