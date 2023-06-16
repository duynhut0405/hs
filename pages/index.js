import api from '../services/api';
import { isMobile, isTablet } from 'react-device-detect';
import { useState, useEffect } from 'react';
import { useCommon } from '../contexts/common';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import PopupHome from '../components/Desktop/Home/PopupHome';
import PopupLogin from '../components/Desktop/Noti/PopupLogin';
import Cookies from 'js-cookie';
import { useAuth } from '../contexts/auth';
const BlockRender = dynamic(import('../components/Desktop/Common/BlockRender'));
const SessionTop = dynamic(import('../components/Desktop/Home/SessionTop'));
const HeaderMobile = dynamic(import('../components/Mobile/HeaderMobile'));
const BlockRenderMobile = dynamic(import('../components/Mobile/Common/BlockRenderMobile'));
const SectionSearchMobile = dynamic(import('../components/Mobile/Common/SectionSearchMobile'));
const SectionBannerMobile = dynamic(import('../components/Mobile/Home/SectionBannerMobile'));
const Layout = dynamic(import('../components/Desktop/Layout'));
const LayoutMobile = dynamic(import('../components/Mobile/LayoutMobile'));
const homeTop = require('../public/json/home.json').homeTop;
// const menu = require('../public/json/menu.json').menuItems;

function Home({ homeContent, config, menu }) {
  const { isAuthenticated, user, onSetSmallNoti } = useAuth();
  const [mobile, setMobile] = useState(true);
  const [load, setLoad] = useState(false);
  const [hide, setHide] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [hide2, setHide2] = useState(false);
  const { dataContent } = useCommon();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setMobile(isMobile && !isTablet);
    if (isMobile && !isTablet) {
      window.addEventListener('scroll', isScrolling);
      return () => window.removeEventListener('scroll', isScrolling);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      //Sau 30s mở popup home
      setLoad(true);
      setTimeout(() => {
        // Sau 5s tắt popup home
        setLoad(false);
        // Sau khi tát popup home, check và mở popup đăng nhập ngay
        if (!Cookies.get('first-login')) {
          setLoad2(true);
          Cookies.set('first-login', true);
        }
      }, 5000);
    }, 30000);
  }, []);

  const isScrolling = () => {
    setDisplay(true);
  };
  return !mobile ? (
    <>
      <Layout>
        <Head>
          <meta property='og:image' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/images/gioi-thieu.jpg '} />
          <meta property='og:image' content={'https://hoasenhome.vn/images/gioi-thieu.jpg'} />
          <meta property='og:image:secure_url' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/images/gioi-thieu.jpg'} />
        </Head>
        <SessionTop menu={menu} homeTop={homeTop} />
        <BlockRender data={dataContent ? dataContent : homeContent} config={config} />
      </Layout>
      {load && !hide ? <PopupHome handleHide={setHide} /> : null}
      {load2 && !hide2 && !isAuthenticated ? <PopupLogin handleHide={setHide2} /> : null}
    </>
  ) : (
    <>
      <LayoutMobile menu={menu} homeTop={homeTop}>
        <Head>
          <meta property='og:image' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/images/gioi-thieu.jpg'} />
          <meta property='og:image' content={'https://hoasenhome.vn/images/gioi-thieu.jpg'} />
          <meta property='og:image:secure_url' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/images/gioi-thieu.jpg'} />
        </Head>
        <div style={{ minHeight: '1500px' }}>
          <HeaderMobile />
          <SectionSearchMobile page='homeMobile' />
          <SectionBannerMobile banners={homeTop.banner.banners} menu={menu} />
          {display && <BlockRenderMobile data={dataContent ? dataContent : homeContent} menu={menu} config={config} />}
        </div>
      </LayoutMobile>
      {load && !hide ? <PopupHome handleHide={setHide} /> : null}
      {load2 && !hide2 && !isAuthenticated ? <PopupLogin handleHide={setHide2} /> : null}
    </>
  );
}

// This gets called on every request
export async function getStaticProps(context) {
  let menu = [];
  try {
    const result = await Promise.all([api.get('/service/stores/menus')]);
    menu = result[0].data[0]?.menuItems;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      menu,
    },
    revalidate: 60,
  };
}

export default Home;
