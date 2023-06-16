import React, { useEffect } from 'react'
import Layout from '../../components/Desktop/Layout'
import BreadCrumb from '../../components/Desktop/Common/BreadCrumb'
import t from '../../translation'
import MenuUser from '../../components/Desktop/Common/MenuUser'
import { useAuth } from '../../contexts/auth'
import WistlistProduct from '../../components/Desktop/ProductBox/WistlistProduct'
import IsMobile from '../../utils/detectMobile'
import LayoutMobile from '../../components/Mobile/LayoutMobile'
import Link from 'next/link'

function wishlistPage({isMobile}) {
  const { wishlist } = useAuth();
  useEffect(() => {
    if (wishlist != null) {
      console.log(wishlist);
    }
  }, [wishlist])
  return isMobile ? (
    <LayoutMobile>
      <Link href='/account'>
        <div id='header' className='page-top-heading'>
          <a className='back icon-arrow-1 ix'></a>
          <h1>Sản phẩm đã Like</h1>
        </div>
      </Link>
      {wishlist != null && (
        <main className='page-user-order'>
          <div className=' box-product mb-20'>
            <div className=' list-p-3'>
              {wishlist[0].map((item, index) => (
                <WistlistProduct data={item} key={index} />
              ))}
            </div>
          </div>
        </main>
      )}
    </LayoutMobile>
  ) : (
    <Layout>
      <BreadCrumb
        data={[
          { name: t('account_info'), link: '/account', isActive: false },
          { name: t('wishlist'), link: '/account/wishlist', isActive: true },
        ]}
      />
      <main className='sec-tb page-user-order'>
        <div className='container'>
          <div className='row '>
            <div className='col-md-3 sidebar-user'>
              <MenuUser />
            </div>
            {wishlist != null && (
              <div className='col-12 col-md-9'>
                <div className='box-shadow box-product mb-20'>
                  <h6 className='box-title-3'>Sản phẩm yêu thích</h6>
                  <div className=' list-p-3'>
                    {wishlist[0].map((item, index) => (
                      <WistlistProduct data={item} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } }
}

export default wishlistPage;