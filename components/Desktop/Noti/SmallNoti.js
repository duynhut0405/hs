import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import t from '../../../translation';
import { useAuth } from '../../../contexts/auth';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';
import NotiItem from './NotiItem';
const propTypes = {
  data: PropTypes.array,
};

function SmallNoti() {
  const { isAuthenticated, user, totalNoti, dataSmallNoti } = useAuth();
  const [data, setData] = useState([]);
  const [active, setActive] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();

  useEffect(async () => {
    if (modalShow) {
      await setTimeout(() => {
        setModalShow(false);
      }, 1000);
    }
  }, [modalShow]);

  const setActiveDropDown = () => {
    setActive(!active);
  };

  return (
    <>
      <div
        className={` widget-mini-cart ${active ? 'toggleClass active dropdown' : ''}`}
        onClick={() => {
          if (!isAuthenticated) {
            setActive(!active);
            return;
          }
          setActiveDropDown();
        }}
      >
        <div className='toggle tx1'>
          <span className='img'>
            <img style={{ marginLeft: 6 }} src='/images/svg/bell.svg'></img> <span className='count'>{totalNoti}</span>
          </span>
          <span className='tx2'> {t('notification')} </span>
        </div>
        <div className='dropdown-content content-cart box-shadow box-product img-small-noti' style={{ minWidth: '501px' }}>
          {isAuthenticated ? (
            <div>
              <div className='list-p-3 border-bottom'>
                {dataSmallNoti &&
                  dataSmallNoti.map((item, index) => {
                    if (index > 4) return;
                    return <NotiItem key={index} data={item} />;
                  })}
              </div>
              <div className='bottom'>
                <Link href='/account/notification' prefetch={false}>
                  <a href='/account/notification'>
                    <h5 className='modal-status-text-color text-center'>Xem tất cả</h5>
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <div className='small-noti-guest'>
              <div className='d-flex center mb-20'>
                <img src='/images/noti-guest.png' alt='Noti' />
              </div>
              <p className='rating-point'>Đăng nhập để xem thông báo</p>
            </div>
          )}
        </div>
      </div>
      <Modal size='sm' show={modalShow} onHide={() => setModalShow(false)}>
        <div className='pd-20'>{'Hiện tại không có thông báo mới'}</div>
      </Modal>
    </>
  );
}

SmallNoti.propTypes = propTypes;

export default SmallNoti;
