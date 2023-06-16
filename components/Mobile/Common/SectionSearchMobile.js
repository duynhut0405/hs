import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import t from '../../../translation';
import { useCommon } from '../../../contexts/common';
import { useAuth } from '../../../contexts/auth';
import SmallCartGuest from '../SmallCartGuest';
import SmallCart from '../SmallCart';
import SmallNoti from '../../Mobile/SmallNoti';

const propTypes = {
  data: PropTypes.array,
};

function SectionSearchMobile({ page }) {
  const { setActiveSearchModal } = useCommon();
  const { keyword, setKeyWord } = useCommon();
  const { isAuthenticated } = useAuth();

  return (
    <section className='sec-search' style={{ zIndex: 2 }}>
      <div className='item-group div'>
        <div className='item-group-content'>
          <div className='form-search-header'>
            <input
              className='btnModal'
              data-modal='modalSearch'
              type=''
              name=''
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
          <div className='item-group-addon'>
            <div className='flex'>
              <SmallNoti />
              <SmallCart />
            </div>
          </div>
        ) : (
          <div className='item-group-addon '>
            <div className='flex'>
              <SmallNoti />
              <SmallCartGuest />
            </div>
          </div>
        )}
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
