import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Proptypes from 'prop-types'
import lazyload from '../../../utils/lazyload'
import lazyImage from '../../../utils/lazyImage'
import AddressModalMobile from '../Common/MobileModal/AddressModalMobile'
import AddressModalDetailMobile from '../Common/MobileModal/AddressModalDetailMobile'
import { useCommon } from '../../../contexts/common'
import Link from "next/link";
import { useAuth } from '../../../contexts/auth'
import SmallCartGuest from '../SmallCartGuest'
import SmallCart from '../SmallCart'
import Modal from 'react-bootstrap/Modal'

const propTypes = {
  children: Proptypes.node
};

function LayoutProductDetailMobile({ children, menu, homeTop, homeContent }) {
  const { productDetailUserModal, setProductDetailUserModal } = useCommon();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [menuRef, setMenuRef] = useState(React.useRef(null));

  lazyload();
  lazyImage();

  const handleClick = (e) => {
    if (!menuRef.current.contains(e.target)) {
      setProductDetailUserModal(false);
      document.getElementsByTagName("body")[0].classList.remove('showMenuScrollOff');
    }
  };

  useEffect(() => {
    if (productDetailUserModal) {
      document.getElementsByTagName("body")[0].classList.add('showMenuScrollOff');
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [productDetailUserModal]);


  return (
    <div id="wrapper">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Hoa Sen Home</title>
        <link rel="shortcut icon" href="/mb/images/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" media='all'/>
        <meta property="og:locale" content="vi_VN" />

        <script async src="https://cdn.ampproject.org/v0.js"></script>

        <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></script>
        <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
        <script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
        

      </Head>
      <header id="header" role="banner">
        <div className="container ">
          <Link href="/">
            <a id="logo">
              <amp-img
                alt="Hoa Sen"
                src="/mb/images/logo.png"
                width="50"
                height="50"
              >
              </amp-img>                  
            </a>
          </Link>
          <Link href="/menu">
            <a   className="menu-btn x"  ><span></span></a>         
          </Link>   
        </div>
      </header>


      {children}




      <amp-sidebar id="sidebar1" layout="nodisplay" side="right">
        <div className="sidebar-header" >
        <span className="close" tabIndex="1" role="sidebar1" on="tap:sidebar1.close"><i className="icon-close"  ></i></span>
        </div>
        {/* <MainMenu data={menu} /> */}
      </amp-sidebar>

    </div>
  )
}

LayoutProductDetailMobile.propTypes = propTypes

export default LayoutProductDetailMobile