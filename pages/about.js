import Layout from '../components/Desktop/Layout'
import LayoutMobile from '../components/Mobile/LayoutMobile'
import api from '../services/api'

// import IsMobile from '../utils/detectMobile'
import { isMobile, isTablet } from 'react-device-detect';

import HeaderMobile from '../components/Mobile/HeaderMobile'
import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import About from '../components/Block/About'

function Home({ menu, homeTop, homeContent, config }) {
  const [mobile, setMobile] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setMobile(isMobile && !isTablet)
  }, [isMobile])

  return (
    !mobile ?
      <Layout>

        {/* <BlockRender data={homeContent} config={config} /> */}

        <About />


      </Layout>
      :

      <LayoutMobile menu={menu} homeTop={homeTop} homeContent={homeContent} >
        <HeaderMobile />

        <About />


      </LayoutMobile>
  )
}
// This gets called on every request
export async function getStaticProps(context) {
  // Fetch data from external API
  let menu = [];
  let homeTop = [];
  let homeContent = [];
  let config = [];
  try {
    const result = await Promise.all([
      api.get('/service/stores/menus'),
      api.get('/service/stores/home-top'),
      api.get('/service/stores/home-content')
    ])
    menu = result[0].data[0].menuItems;
    homeTop = result[1].data[0];
    homeContent = result[2].data[0].content;
    config = result[2].data[0].config;
  } catch (error) {
    console.log(error);
  }
  return { props: { menu, homeTop, homeContent, config }, revalidate: 60 * 5 }
}

export default Home;