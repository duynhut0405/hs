import React from 'react';
import Link from 'next/link';
import StoreModal from '../../Desktop/Common/StoreModal';
const render = [0, 1, 2];
function WidgetMobile({ commonData, sku }) {
  return (
    <>
      <StoreModal isMobile={true} sku={sku} />
      {commonData.services && (
        <div className='sec-bd-bottom  r1-c3 accodion accodion-1'>
          <div className='accodion-tab widget-1'>
            <input type='checkbox' id='chck_1_1' />
            <label className='accodion-title accodion-title-custom' htmlFor='chck_1_1'>
              <span>Ưu đãi từ Hoa Sen Home</span>{' '}
              <span className='triangle'>
                <i className='icon-arrow-1 ib'></i>
              </span>
            </label>
            <div className='accodion-content entry-content'>
              <div className='inner'>
                <ul>
                  {commonData.services.map((item, index) => {
                    switch (item.index) {
                      case 'consult':
                        return (
                          <li key={index}>
                            <i className='icon-login2'></i> {item.title}
                          </li>
                        );
                      case 'installation':
                        return (
                          <li key={index}>
                            <i className='icon-t7'></i> Tổng đài tư vấn 1800 1515
                          </li>
                        );
                      case 'shipping':
                        return (
                          <li key={index}>
                            <i className='icon-t1'></i> {item.title}
                          </li>
                        );
                      case 'return':
                        return (
                          <li key={index}>
                            <i className='icon-t6'></i> {item.title}
                          </li>
                        );
                      case 'guarantee':
                        return (
                          <>
                            <li key={index}>
                              <i className='icon-t3'></i> Cam kết bảo hành
                            </li>
                            <li key={index}>
                              <i className='icon-t1'></i> Giao hàng từ 2 giờ đến 5 ngày
                            </li>
                          </>
                        );
                      default:
                        return null;
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
          {Object.keys(commonData.posts).map(
            (i, index) =>
              commonData.posts[i].posts.length != 0 && (
                <div className='accodion-tab widget-2' key={index}>
                  <input type='checkbox' id='chck_1_2' />
                  <label className='accodion-title accodion-title-custom' htmlFor='chck_1_2'>
                    <span>{commonData.posts[i].label}</span>{' '}
                    <span className='triangle'>
                      <i className='icon-arrow-1 ib'></i>
                    </span>
                  </label>
                  <div className='accodion-content entry-content'>
                    <div className='inner'>
                      <ul>
                        {commonData.posts[i].posts.map((item, index) => (
                          <li key={index}>
                            <Link href={'/' + item.request_path}>
                              <a>{item.title}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
}

export default WidgetMobile;
