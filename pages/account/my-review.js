import React, { useEffect, useState } from 'react';
import Layout from '../../components/Desktop/Layout';
import BreadCrumb from '../../components/Desktop/Common/BreadCrumb';
import t from '../../translation';
import MenuUser from '../../components/Desktop/Common/MenuUser';
import IsMobile from '../../utils/detectMobile';
import LayoutMobile from '../../components/Mobile/LayoutMobile';
import Pagination from 'react-js-pagination';
import Link from 'next/link';
import Axios from 'axios';
import { useAuth } from '../../contexts/auth';
import ProductReview from '../../components/Desktop/Review/ProductReview';
import DetailReview from '../../components/Desktop/Review/DetailReview';

const apiData = ['review/customerReviews/All', 'product/noReviews', 'review/customerReviews/All'];

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
  const { user } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allow, setAllow] = useState(0);
  const [setDataAgain, setSetDataAgain] = useState(false);
  useEffect(async () => {
    if (user) {
      getPage(tabIndex);
    }
  }, [user]);

  useEffect(() => {
    if (setDataAgain) {
      setLoading(true);
      getPage(tabIndex, page);
      setSetDataAgain(false);
    }
  }, [setDataAgain]);

  const handlePageChange = async (p) => {
    setLoading(true);
    setPage(p);
    getPage(tabIndex, p);
  };

  const getPage = async (tab = 0, page = 1) => {
    try {
      const result = await newApiFCM.get(`service/${apiData[tab]}/${user.id}/limit/5/p/${page}`);
      setData([...result?.data?.result_data]);
      if (result?.data?.allowed_edit_in) {
        setAllow(Number(result?.data?.allowed_edit_in));
      }
      setTotal(Number(result?.data?.count));
      setLoading(false);
    } catch (err) {
      console.log('🚀 ~ file: my-review.js ~ line 60 ~ getPage ~ err', err);
      setLoading(false);
    }
  };

  const renderTab = () => {
    return (
      <div className='box-shadow box-product mb-20 scroll-x'>
        <div className='d-flex'>
          {['Đánh giá của tôi', 'Chưa đánh giá', 'Đã đánh giá'].map((item, index) => (
            <h6
              key={index}
              className={`shrink-0 ${tabIndex === index ? 'box-title-3 w7 btnlike note-text-color' : 'box-title-3 btnlike w7'}`}
              onClick={() => {
                setLoading(true);
                setTabIndex(index);
                setPage(1);
                getPage(index);
              }}
            >
              {item}
            </h6>
          ))}
        </div>
        {data.length !== 0 ? (
          <div className={`list-p-3 ${loading ? 'loading' : ''}`}>
            {data.map((item, index2) => {
              if (tabIndex !== 2) return <ProductReview page={page} cb={() => setSetDataAgain(true)} index={index2} type={tabIndex} key={index2} data={item} />;
              else return <DetailReview page={page} allow={allow} cb={() => setSetDataAgain(true)} type={tabIndex} index={index2} key={index2} data={item} />;
            })}

            {total > 5 && (
              <div className='pages text-center' style={{ minHeight: '80px' }}>
                <br />
                <Pagination
                  activePage={page}
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
