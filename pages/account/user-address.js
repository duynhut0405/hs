import React, { useState } from 'react'
import Layout from '../../components/Desktop/Layout'
import BreadCrumb from '../../components/Desktop/Common/BreadCrumb'
import t from '../../translation'
import MenuUser from '../../components/Desktop/Common/MenuUser'
import { useAuth } from '../../contexts/auth'
import AccountAddress from '../../components/Desktop/Account/AcountAddress'
import IsMobile from '../../utils/detectMobile'
import LayoutMobile from '../../components/Mobile/LayoutMobile'
import Link from 'next/link'

function AddressList({ isMobile, checkAddressDefault }) {

  return isMobile ? (
    <LayoutMobile>
      <Link href='/account'>
        <div id='header' className='page-top-heading'>
          <a className='back icon-arrow-1 ix'></a>
          <h1>Địa chỉ nhận hàng</h1>
        </div>
      </Link>
      <div className='box-product mb-20'>
        <AccountAddress renderBillingAddress={checkAddressDefault} />
        <div className='pd-20 wbtn'>
          {checkAddressDefault != 'true' ? (
            <Link href='/account/user-address/new'>
              <a href='/account/user-address/new' className='btn btn-4'>
                Thêm địa chỉ mới
              </a>
            </Link>
          ) : (
            <Link href='/account/address/billing-default'>
              <a href='/account/address/billing-default' className='btn btn-4'>
                Thêm địa chỉ mới
              </a>
            </Link>
          )}
        </div>
      </div>
    </LayoutMobile>
  ) : (
    <Layout>
      <BreadCrumb
        data={[
          { name: t('account_info'), link: '/account', isActive: false },
          { name: t('received_location'), link: '/account/user-address', isActive: true },
        ]}
      />
      <main className='sec-tb page-user-info'>
        <div className='container'>
          <div className='row '>
            <div className='col-md-3 sidebar-user'>
              <MenuUser />
            </div>
            <div className='col-12 col-md-9'>
              <div className='box-shadow box-product mb-20'>
                <h6 className='box-title-3'>{checkAddressDefault === 'true' ? 'Địa chỉ xuất hóa đơn' : 'Địa chỉ nhận hàng'}</h6>
                <AccountAddress renderBillingAddress={checkAddressDefault} />
                <div className='pd-20 wbtn'>
                  {checkAddressDefault != 'true' ? (
                    <Link href='/account/user-address/new'>
                      <a href='/account/user-address/new' className='btn btn-4'>
                        Thêm địa chỉ mới
                      </a>
                    </Link>
                  ) : (
                    <Link href='/account/address/billing-default'>
                      <a href='/account/address/billing-default' className='btn btn-4'>
                        Thêm địa chỉ mới
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  let checkAddressDefault = [];
  if (context.query.vat === "true") {
    checkAddressDefault = context.query.vat
  }
  // Fetch data from external API
  return { props: { isMobile, checkAddressDefault } }
}

export default AddressList;