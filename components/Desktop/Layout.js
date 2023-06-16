import React, { useEffect, useState } from "react";
import Head from "next/head";
import Proptypes from "prop-types";
import Header from "./Header";
// import Footer from "./Footer";
import lazyload from "../../utils/lazyload";
import lazyImage from "../../utils/lazyImage";
import dynamic from "next/dynamic";
const AddressModalDetail = dynamic(import("./Common/AddressModalDetail"));
const Footer = dynamic(import("./Footer"));
// import AddressModalDetail from "./Common/AddressModalDetail";
import LoginModal from "./Common/LoginModal";
import { useRouter } from "next/router";
import api from "../../services/api";
import { useCommon } from "../../contexts/common";

const propTypes = {
  children: Proptypes.node,
};

const menuData = require('../../public/json/menu.json')

function Layout({ children }) {
  lazyload();
  lazyImage();
  const [headerHeight, setHeaderHeight] = useState("70px");
  const router = useRouter();
  const [mainMenu, setMenu] = useState([]);
  const {activeLocationModal} = useCommon();

  useEffect(async () => {
    try {
      if (menuData) {
        setMenu(menuData)  
      } else {
        const result = await api.get("/service/stores/menus", {withCredentials: false});
        setMenu(result.data[0].menuItems);
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  const hideMenu = () => {
    if (document) {
      var body = document.getElementsByTagName("body")[0];
      body.classList.remove("showMenu");
    }
  };

  return (
    <div id='wrapper'>
      <Head>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <meta name='google-site-verification' content='0eqIfIUm2kG-XRc8eq6H10JZVAFGG6ArG7c0ey3KZwM' />
        <title>Hoa Sen Home</title>
        <link rel='shortcut icon' href='/Logo-Hoa-Sen.svg'></link>
        <link rel='preconnect' href='https://fonts.gstatic.com'></link>
        <link href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,400&display=swap' rel='stylesheet' media='all' />
        {router.asPath == '/' && <link rel='preload' as='image' href='https://cdn.hoasenhome.vn/magestore/bannerslider/images/b/a/banner0803-b.jpg' />}
        <link rel='canonical' content={'https://hoasenhome.vn' + router.asPath.split('?')[0]} />
        <meta name='description' content='Vật liệu xây dựng 4.0 - Công nghệ thay đổi cuộc sống' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        {router.asPath.includes('tools') && <link rel='stylesheet' href='/customCss/main.css' type='text/css' media='all' />}
        {router.asPath == '/' && <meta property='og:title' content='Hoa Sen Home' itemProp='headline' />}
        <meta property='og:locale' content='en_US' />
        <meta property='og:site_name' content='Bhome' />
        <meta property='og:url' itemProp='url' content={'https://hoasenhome.vn' + router.asPath.split('?')[0]} />
      </Head>
      <span className='menu-btn overlay'> </span>
      <Header setHeaderHeight={setHeaderHeight} mainMenu={mainMenu} />
      <div className='afterHeader' style={{ height: '70px' }}></div>
      {children}
      <Footer mainMenu={mainMenu.menuItems} />
      {activeLocationModal && <AddressModalDetail />}
      <LoginModal />
    </div>
  );
}

Layout.propTypes = propTypes;

export default Layout;
