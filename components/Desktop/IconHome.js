import React, { useState } from 'react';
const IconHome = () => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <div className='icon-home-voucher'>
          <div className='relative'>
            <a href='https://hoasenhome.vn/deal-soc-moi-tuan' target='_blank'>
              <img src='/images/iconhome.png' alt='icon home' width={100} height={60} />
            </a>

            <div style={{ position: 'absolute', top: -3, right: 0 }}>
              <div onClick={() => setShow(false)} className='icon-home-x'>
                <i className='icon-close fs8'></i>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default IconHome;
