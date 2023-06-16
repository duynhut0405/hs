import React from 'react'
import Layout from '../../components/Desktop/Layout'
import BreadCrumb from '../../components/Desktop/Common/BreadCrumb'
import t from '../../translation'
import MenuUser from '../../components/Desktop/Common/MenuUser'
import AcountEdit from '../../components/Desktop/Account/AcountEdit'
import LayoutMobile from '../../components/Mobile/LayoutMobile'
import HeaderMobile from '../../components/Mobile/HeaderMobile'
import IsMobile from '../../utils/detectMobile'
import MenuUserMobile from '../../components/Mobile/Account/MenuUserMobile'
import AcountEditMobile from '../../components/Mobile/Account/AcountEditMobile'

function Account({isMobile}) {
  return (
    isMobile ?
      <AcountEditMobile/>
    :
    <Layout>
      <BreadCrumb data={[{name: t('account_info'), link: '/account', isActive: true}]}/>
      <main className="sec-tb page-user-info">
        <div className="container">
          <div className="row ">
            <div className="col-md-3 sidebar-user">
              <MenuUser/>
            </div>
            <AcountEdit />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } }
}

export default Account;
