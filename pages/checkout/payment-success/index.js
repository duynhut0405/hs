import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useAuth } from '../../../contexts/auth';
import { useRouter } from 'next/router';
import Layout from '../../../components/Desktop/Layout';
import LayoutMobile from '../../../components/Mobile/LayoutMobile';
import api from '../../../services/api';
import HeaderMobile from '../../../components/Mobile/HeaderMobile';

function Success({}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isFall, setFall] = useState(false);

  useEffect(async () => {
    if (isAuthenticated) {
      try {
        const result = await api.get(`vnpay/order/response?` + window.location.search.substr(1));
        if (result.status == 200) {
          router.push(`/checkout/payment-success/${result.data.entity_id}`);
        }
      } catch (error) {
        console.log(error);
        setFall(true);
      }
    }
  }, [isAuthenticated]);
  return (
    <>
      {isAuthenticated && !isMobile && (
        <Layout>
          <main className={`sec-tb page-success`}>
            {!isFall ? (
              <div className='container loading'>
                <div className='entry-heading text-center'>
                  <h1>Kết quả Đặt hàng</h1>
                </div>
              </div>
            ) : (
              <div className='container'>
                <div className='entry-heading text-center'>
                  <h1>Thanh toán thất bại</h1>
                </div>
              </div>
            )}
          </main>
        </Layout>
      )}
      {isAuthenticated && isMobile && (
        <>
          <LayoutMobile />
          <HeaderMobile />
          <main className={`sec-tb page-success`}>
            {!isFall ? (
              <div className='container loading'>
                <div className='entry-heading text-center'>
                  <h1>Kết quả Đặt hàng</h1>
                </div>
              </div>
            ) : (
              <div className='container'>
                <div className='entry-heading text-center'>
                  <h1>Thanh toán thất bại</h1>
                </div>
              </div>
            )}
          </main>
          {isFall && (
            <div className='w-final-price'>
              <a href='/' className='btn btn-4 full mb-10'>
                Tiếp tục mua hàng
              </a>
              <a href='/categories' className='btn btn-4 full'>
                Về trang chủ
              </a>
            </div>
          )}
        </>
      )}
      {!isAuthenticated && null}
    </>
  );
}

export default Success;
