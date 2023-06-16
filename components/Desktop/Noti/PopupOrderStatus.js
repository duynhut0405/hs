import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { isMobile, isTablet } from 'react-device-detect';
import { useAuth } from '../../../contexts/auth';
import ReactHtmlParser from 'react-html-parser';
const PopupOrderStatus = () => {
  const { showNoti, setShowNoti } = useAuth();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile && !isTablet);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowNoti(null);
    }, 10000);
  }, [showNoti]);

  const onClickNoti = () => {
    try {
      if (!showNoti.data.dataUrl.includes('https://')) {
        window.location.href = process.env.URL_NOTIFICATION + showNoti.data.dataUrl;
        return;
      }

      if (!showNoti.data.dataUrl) {
        window.location.href = process.env.URL_NOTIFICATION;
        return;
      }

      window.location.href = showNoti.data.dataUrl;
    } catch (err) {
      window.location.href = process.env.URL_NOTIFICATION + 'account/notification';
    }
  };
  return (
    <>
      {!!showNoti && Object.keys(showNoti).length !== 0 ? (
        <div className={`modal-status ${isMobile ? 'mb-62' : ''}`}>
          <div>
            <div className='modal-status-icon btnlike'>
              <i
                onClick={() => {
                  setShowNoti(null);
                }}
                className='icon-close fs10'
              ></i>
            </div>
            <div className={!mobile ? 'flex modal-status-row justify-content-between' : 'modal-status-row justify-content-between'}>
              <div>
                <img className='modal-status-img' src={`/images/noti/${JSON.parse(showNoti.data.dataInfo).notification_type === '1' ? 9 : JSON.parse(showNoti.data.dataInfo).notification_type}.png`}></img>
              </div>
              <div className='ml-20'>
                {!mobile ? (
                  <h4 className='modal-status-text modal-status-text-color fs12'>{showNoti?.notification?.title}</h4>
                ) : (
                  <h4 className='modal-status-text modal-status-text-color fs12'>
                    {showNoti?.notification?.title}
                    <span onClick={() => onClickNoti()} className='modal-status-text-more btnlike'>
                      {'  Chi tiết>>'}
                    </span>
                  </h4>
                )}
              </div>
            </div>
            {!mobile && (
              <div>
                <div className='modal-status-row'>
                  <p className='modal-status-text w5'>{ReactHtmlParser(showNoti?.notification?.body)}</p>
                </div>
                <div className='modal-status-row'>
                  <button onClick={() => onClickNoti()} className='modal-status-button btnlike'>
                    Chi tiết
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PopupOrderStatus;
