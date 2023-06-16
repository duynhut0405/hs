import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Proptypes from 'prop-types'
import lazyload from '../../utils/lazyload'
import lazyImage from '../../utils/lazyImage'
const propTypes = {
  children: Proptypes.node
};

function LayoutMobileOnlyHead({}) {
  lazyload();
  lazyImage();
  const [headerHeight, setHeaderHeight] = useState("70px");

  return (
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,user-scalable=no" />
        <title>Hoa Sen Home</title>
        <link rel="shortcut icon" href="/mb/images/favicon.ico" />
        <link rel='stylesheet' href='/mb/fonts/icomoon/style.css' type='text/css' media='all' />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" media='all'/>
        <meta property="og:locale" content="vi_VN" />
        {/* <!-- META FOR FACEBOOK --> */}
        <meta property="og:site_name" content="Bhome" />
        <meta property="og:url" itemProp="url" content="http://localhost/bhome/du-an/" />
        {/* <meta property="og:image" itemProp="thumbnailUrl" content="xxx" /> */}
        <meta property="og:title" content="Hoa Sen Home" itemProp="headline" />
        <meta property="og:description" content="" itemProp="description" />
        {/* <!-- END META FOR FACEBOOK --> */}
      </Head>
  )
}

LayoutMobileOnlyHead.propTypes = propTypes

export default LayoutMobileOnlyHead