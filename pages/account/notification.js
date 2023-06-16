import React, { useEffect, useState } from 'react';
import Layout from '../../components/Desktop/Layout';
import BreadCrumb from '../../components/Desktop/Common/BreadCrumb';
import t from '../../translation';
import MenuUser from '../../components/Desktop/Common/MenuUser';
import NotiItem from '../../components/Desktop/Noti/NotiItem';
import IsMobile from '../../utils/detectMobile';
import LayoutMobile from '../../components/Mobile/LayoutMobile';
import Pagination from 'react-js-pagination';
import Link from 'next/link';
import Axios from 'axios';
import { useAuth } from '../../contexts/auth';
import { get } from 'jquery';
import { getPageFiles } from 'next/dist/next-server/server/get-page-files';

const newApiFCM = Axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: 'bearer dxxfgvmg8dps2af7m0soo7iyehfx8d23',
  },
});

function notification({ isMobile }) {
  const { user, onSetSmallNoti } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [group, setGroup] = useState('1,2,3,4,5,6,7,8,9,10');
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  useEffect(async () => {
    if (user) {
      getPage(currentPage, group);
    }
  }, [user]);

  const handlePageChange = async (data) => {
    setCurrentPage(data);

    if (user) {
      getPage(data, group);
    }
  };

  const getPage = async (index, group) => {
    const result = await newApiFCM.get(
      `notification/getNotificationsByCustomerId?searchCriteria[currentPage]=${index}&searchCriteria[pageSize]=5&searchCriteria[filter_groups][0][filters][0][field]=customerId&searchCriteria[filter_groups][0][filters][0][value]=${user.id}&searchCriteria[filter_groups][0][filters][1][field]=notificationType&searchCriteria[filter_groups][0][filters][1][value]=${group}`
    );
    let length = result.data.length;
    if (length < 3) {
      setData([]);
      setTotal(0);
      return;
    }
    setTotal(result.data[length - 1].totalRecords);
    setData(result.data.splice(0, length - 2));
  };

  const read_all = async () => {
    const result = await newApiFCM.post('notification/markNotificationAsReadAll', {
      customerId: user.id,
    });
    if (result) {
      getPage(currentPage, group);
    }
  };

  const renderTab = () => {
    return (
      <div className='box-shadow box-product mb-20 scroll-x'>
        <div className='d-flex'>
          <h6
            className={`shrink-0 ${tabIndex === 0 ? 'box-title-3 w7 btnlike note-text-color' : 'box-title-3 btnlike w7'}`}
            onClick={() => {
              if (tabIndex !== 0) {
                setTabIndex(0);
                setCurrentPage(1);
                setGroup('1,2,3,4,5,6,7,8,9,10');
                getPage(1, '1,2,3,4,5,6,7,8,9,10');
              }
            }}
          >
            Tất cả
          </h6>
          <h6
            className={`shrink-0 ${tabIndex === 1 ? 'box-title-3 w7 btnlike note-text-color' : 'box-title-3 btnlike w7'}`}
            onClick={() => {
              if (tabIndex !== 1) {
                setTabIndex(1);
                setCurrentPage(1);
                setGroup('6,7');
                getPage(1, '6,7');
              }
            }}
          >
            Khuyến mãi
          </h6>
          <h6
            className={`shrink-0 ${tabIndex === 2 ? 'box-title-3 w7 btnlike note-text-color' : 'box-title-3 w7 btnlike'}`}
            onClick={() => {
              if (tabIndex !== 2) {
                setTabIndex(2);
                setCurrentPage(1);
                setGroup('2,3,4');
                getPage(1, '2,3,4');
              }
            }}
          >
            Đơn hàng
          </h6>
          <h6
            className={`shrink-0 ${tabIndex === 3 ? 'box-title-3 w7 btnlike note-text-color' : 'box-title-3 w7 btnlike'}`}
            onClick={() => {
              if (tabIndex !== 3) {
                setTabIndex(3);
                setCurrentPage(1);
                setGroup('10');
                getPage(1, '10');
              }
            }}
          >
            Thanh toán
          </h6>

          <h6
            className={`shrink-0 ${tabIndex === 4 ? 'box-title-3 w7 btnlike note-text-color' : 'box-title-3 w7 btnlike'}`}
            onClick={() => {
              if (tabIndex !== 4) {
                setTabIndex(4);
                setCurrentPage(1);
                setGroup('5');
                getPage(1, '5');
              }
            }}
          >
            Đánh giá sản phẩm
          </h6>

          <h6
            className={`shrink-0 ${tabIndex === 5 ? 'box-title-3 w7 btnlike note-text-color' : 'box-title-3 w7 btnlike'}`}
            onClick={() => {
              if (tabIndex !== 5) {
                setTabIndex(5);
                setCurrentPage(1);
                setGroup('9');
                getPage(1, '9');
              }
            }}
          >
            Tin tức
          </h6>

          <h6
            className={`shrink-0 ${tabIndex == 6 ? 'box-title-3 w7 btnlike note-text-color flex1' : 'box-title-3 w7 btnlike flex1'}`}
            onClick={() => {
              if (tabIndex !== 6) {
                setTabIndex(6);
                setCurrentPage(1);
                setGroup('1,8');
                getPage(1, '1,8');
              }
            }}
          >
            Khác
          </h6>
          <div className='box-title-3' onClick={() => setActive(!active)}>
            <div className={`${active ? 'toggleClass active dropdown' : ''}`} style={{ height: 0 }}>
              <img src='/images/union.png' />
              <div className='dropdown-content box-shadow box-mark-as-read'>
                <p
                  onClick={() => {
                    read_all();
                    onSetSmallNoti();
                  }}
                  className='rating-point'
                >
                  Đánh dấu đã đọc
                </p>
              </div>
            </div>
          </div>
        </div>
        {data.length !== 0 ? (
          <div className=' list-p-3'>
            {data.map((item, index) => (
              <NotiItem key={index} data={item} />
            ))}

            {total > 5 && (
              <div className='pages text-center' style={{ minHeight: '80px' }}>
                <br />
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={5}
                  totalItemsCount={total}
                  innerClass={'page-numbers pagination'}
                  linkClass={'page-numbers'}
                  hideFirstLastPages={true}
                  activeLinkClass={'page-numbers current  active'}
                  onChange={handlePageChange}
                />
              </div>
            )}
          </div>
        ) : (
          <div className='full-box justify-center d-flex align-item-center'>
            <div>
              <img src='/images/25.png' />
              <p>Chưa có thông báo mới</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return isMobile ? (
    <LayoutMobile>
      <Link href='/account'>
        <div id='header' className='page-top-heading' style={{ marginBottom: 0, borderBottom: 0 }}>
          <a className='back icon-arrow-1 ix'></a>
          <h1>Thông báo</h1>
        </div>
      </Link>
      <main className='page-user-order'>{renderTab()}</main>
    </LayoutMobile>
  ) : (
    <Layout>
      <BreadCrumb
        data={[
          { name: t('account_info'), link: '/account', isActive: false },
          { name: t('notification'), link: '/account/notification', isActive: true },
        ]}
      />
      <main className='sec-tb page-user-order'>
        <div className='container'>
          <div className='row '>
            <div className='col-md-3 sidebar-user'>
              <MenuUser />
            </div>
            <div className='col-12 col-md-9'>{renderTab()}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } };
}

export default notification;
