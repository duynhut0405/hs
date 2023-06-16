import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Head from 'next/head'

import Proptypes from 'prop-types'
import FooterMobile from './FooterMobile'
import HeaderMobile from './HeaderMobile'

import MainMenu from './Menu/Mainmenu'

const propTypes = {
  children: Proptypes.node,
  menu: Proptypes.any
};



function LayoutMobile({ menu, children}) {
  return (
    <div id="wrapper">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,user-scalable=no" />
        <title>Hoa Sen Home</title>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" media='all'/>
        <meta name="viewport" content= "width=device-width, user-scalable=no"></meta>
        
        {/* <link rel="canonical" href="https://thachpham.com/web-development/html-css/cac-the-khai-bao-thong-tin-web-html-co-ban.html" />
        <meta name="description" content="Ý nghĩa của các cặp thẻ meta và các thẻ thường dùng để khai báo tài liệu website bằng HTML." /> */}
        <meta property="og:locale" content="vi_VN" />
        
        {/* <!-- META FOR FACEBOOK --> */}
        <meta property="og:site_name" content="Bhome" />
        <meta property="og:url" itemProp="url" content="http://localhost/bhome/du-an/" />
        {/* <meta property="og:image" itemProp="thumbnailUrl" content="xxx" /> */}
        <meta property="og:title" content="Hoa Sen Home" itemProp="headline" />
        <meta property="og:description" content="" itemProp="description" />
        {/* <!-- END META FOR FACEBOOK --> */}
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
      </Head>
      <HeaderMobile />
      {children}
      <FooterMobile />
      <amp-sidebar id="sidebar1" layout="nodisplay" side="right">
        <div className="sidebar-header" >
        <span className="close" tabindex="1" role="sidebar1" on="tap:sidebar1.close"><i className="icon-close"  ></i></span>
        </div>
        <MainMenu data={menu} />
      </amp-sidebar>
    </div>
  )
}




LayoutMobile.propTypes = propTypes



export default LayoutMobile