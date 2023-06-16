import React, { useEffect, useState } from 'react';

import Link from 'next/link';

function ToggleHeightContent({ children, id, height, more }) {
  const [collapsed, setCollapsed] = useState(false);
  const [checkHeight, setCheckHeight] = useState(false);

  useEffect(() => {
    const contentID = document.getElementById('tgh' + id);
    if ('tgh' + id === 'tghcmt57210') {
      console.log('🚀 ~ file: ToggleHeightContent.js ~ line 16 ~ mount ~ contentID.offsetHeight', contentID.offsetHeight);
      console.log('🚀 ~ file: ToggleHeightContent.js ~ line 16 ~ mount ~ height', height);
      console.log(height && contentID && contentID.offsetHeight > Number(height));
    }
    if (height && contentID && contentID.offsetHeight > Number(height)) {
      setCheckHeight(true);
      contentID.style.maxHeight = height + `px`;
      contentID.style.overflow = `hidden`;
    }
  }, []);

  return (
    <div className={`toggleHeightContent  ${collapsed || !checkHeight ? ' active ' : ''} ${more ? more : 'center'}`}>
      <div id={`tgh${id}`} className={`tgh-content`}>
        {children}
      </div>
      {'tgh' + id === 'tghcmt57210' && console.log('🚀 checkHeight', checkHeight)}
      {checkHeight && (
        <div className='tgh-toggle' onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <span className={`red2`}>
              Thu gọn <i className='icon-arrow-2 it'></i>
            </span>
          ) : (
            <span className={`red2`}>
              Xem thêm <i className='icon-arrow-2 ib'></i>{' '}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
export default ToggleHeightContent;
