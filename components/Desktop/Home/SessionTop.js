import React, { ReactNode, useEffect, useState } from 'react';
import Menu from '../Menu';
import Banner from './Banner';
import BannerBottom from './Banner/BannerBottom';
import WidgetTop from './Widget/WidgetTop';
import WidgetBottom from './Widget/WidgetBottom';

import BannerHomePC from '../Carosels/BannerHomePC';
// const menu = require('../../../public/json/menu.json');
const homeTop = require('../../../public/json/home.json').homeTop;

function SessionTop({ menu }) {
  return (
    <section className=' sec-tb sec-h-1 sec-bd-bottom'>
      <div className='img-top-left toggle-img'>
        <img className='object-cover' src='images/banner-top-1.jpg' width={120} height={420} />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-2 c1'>
            <Menu data={menu} />
          </div>
          <div className='col-lg-7 col-md-12'>
            {homeTop && homeTop.banner && homeTop.banner.banners && <BannerHomePC data={homeTop.banner.banners} />}
            {/* <Banner banners={homeTop.banner.banners}/> */}
            <BannerBottom />
          </div>

          <div className='col-lg-3 col-md-12 c3 d-flex column'>
            {homeTop && homeTop.sidebar && homeTop.sidebar.map((item, index) => item.identify != undefined && item.identify == 'good-experience' && <WidgetTop data={item} key={index} />)}
            <WidgetBottom data={homeTop.sidebar} />
          </div>
        </div>
      </div>
      <div className='img-top-right toggle-img'>
        <img className='object-cover' src='images/banner-top-2.jpg' width={120} height={420} />
      </div>
    </section>
  );
}

export default SessionTop;
