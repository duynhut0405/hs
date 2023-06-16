import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import t from '../../../translation';
import { useCommon } from '../../../contexts/common';
import { useAuth } from '../../../contexts/auth';
import SmallCartGuest from '../SmallCartGuest';
import SmallCart from '../SmallCart';

const propTypes = {
  data: PropTypes.array,
};

function SectionSearchMobile({ page }) {
  const { activeSearchModal, setActiveSearchModal } = useCommon();
  const { keyword, setKeyWord } = useCommon();
  const { isAuthenticated } = useAuth();

  useEffect(() => {}, [keyword]);

  return page == 'homeMobile' ? (
    <section className='sec-search'>
      <div className='item-group div'>
        <div className='item-group-content'>
          <div className='form-search-header'>
            <input
              className='btnModal'
              data-modal='modalSearch'
              type='input'
              name='keyword'
              value={keyword}
              onClick={() => {
                handleInputSeclect();
                setActiveSearchModal(true);
              }}
              onChange={(e) => setKeyWord(e.target.value)}
              placeholder='Nhập từ khoá tìm kiếm'
            />
            <button type='submit'>
              <i className='icon-search'></i>
            </button>
          </div>
        </div>
        {isAuthenticated ? (
          <div className='item-group-addon '>
            <SmallCart />
          </div>
        ) : (
          <div className='item-group-addon '>
            <SmallCartGuest />
          </div>
        )}
      </div>
    </section>
  ) : (
    <section id='header' role='banner'>
      <div className='container '>
        <div className='row center'>
          <div className='col-auto'>
            <Link href='/' prefetch={false}>
              <a id='logo'>
                {' '}
                <amp-img alt='Hoa Sen' src='/mb/images/logo.png' width='50' height='50'></amp-img>
              </a>
            </Link>
          </div>
          <div className='col'>
            <div className='item-group item-search'>
              <div className='item-group-content'>
                <form method='post' action-xhr='https://example.com/subscribe' target='_top' className='form-search-header'>
                  <input
                    className='btnModal'
                    data-modal='modalSearch'
                    type='input'
                    name='keyword'
                    value={keyword}
                    onClick={() => {
                      setActiveSearchModal(true);
                    }}
                    placeholder='Nhập từ khoá tìm kiếm'
                    onChange={(e) => setKeyWord(e.target.value)}
                  />
                  <button type='submit' name='btnsearch'>
                    <i className='icon-search'></i>
                  </button>
                </form>
              </div>
              {isAuthenticated ? (
                <div className='item-group-addon '>
                  <SmallCart />
                </div>
              ) : (
                <div className='item-group-addon '>
                  <SmallCartGuest />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const handleInputSeclect = () => {
  let el = document.querySelector(':focus');
  if (el) el.blur();
};

SectionSearchMobile.propTypes = propTypes;

export default SectionSearchMobile;
