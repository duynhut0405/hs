import React, { useEffect, useState } from "react";
import Head from "next/head";
import Proptypes from "prop-types";
import FooterMobile from "./FooterMobile";
import lazyload from "../../utils/lazyload";
import lazyImage from "../../utils/lazyImage";
import { useCommon } from "../../contexts/common";
import dynamic from "next/dynamic";
const LoginModal = dynamic(import("../Desktop/Common/LoginModal"));
const AddressModalDetailMobile =dynamic(import("./Common/MobileModal/AddressModalDetailMobile"));
import SearchModalDetailMobile from "./Common/MobileModal/SearchModalDetailMobile";

const propTypes = {
  children: Proptypes.node,
};

function LayoutMobile({ children, menu }) {
  lazyload();
  lazyImage();
  const {activeLocationModal, activeSearchModal} = useCommon();
  const [showModal, setShowModal] = useState(false);

  const isScrolling =()=>{
    if(!showModal){
      setShowModal(true);
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, [])

  return (
    <div id='wrapper'>
      <Head>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width,user-scalable=no' />
        <meta name='google-site-verification' content='0eqIfIUm2kG-XRc8eq6H10JZVAFGG6ArG7c0ey3KZwM' />
        <title>Hoa Sen Home</title>
        <link rel='shortcut icon' href='/Logo-Hoa-Sen.svg' />
        {/* <link rel="shortcut icon" href="/mb/images/favicon.ico" /> */}
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,400&display=swap' as='style' media='all' />
        <meta name='viewport' content='width=device-width, user-scalable=no'></meta>
        <meta property='og:locale' content='vi_VN' />
        <meta property='og:site_name' content='Hoasenhome' />
        <meta property='og:url' itemProp='url' content='https://hoasenhome.vn' />
        <meta property='og:image' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/images/gioi-thieu.jpg '} />
        <meta property='og:image' content={'https://hoasenhome.vn/images/gioi-thieu.jpg '} />
        <meta property='og:image:secure_url' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/images/gioi-thieu.jpg '} />
        <meta property='og:title' content='Hoa Sen Home' itemProp='headline' />
        <meta property='og:description' content='' itemProp='description' />
      </Head>
      {children}
      <FooterMobile />
      {activeLocationModal && <AddressModalDetailMobile />}
      <SearchModalDetailMobile menu={menu} />
      {showModal && <LoginModal />}
    </div>
  );
}

LayoutMobile.propTypes = propTypes;

export default LayoutMobile;
