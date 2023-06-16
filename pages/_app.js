import { AuthProvider } from '../contexts/auth';
import { CommonProvider } from '../contexts/common';
import { CurrentCategoryProvider } from '../contexts/currentCategory';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
import '../public/css/common.css';
import PopupOrderStatus from '../components/Desktop/Noti/PopupOrderStatus';
import 'dayjs/locale/vi';
import IconHome from '../components/Desktop/IconHome';
import Maintenance from '../components/Maintenance';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
dayjs.locale('vi');
dayjs.extend(utc);
Router.onRouteChangeComplete = () => {
  window.scrollTo(0, 0);
  NProgress.done();
};

function MyApp({ Component, pageProps }) {
  useEffect(async () => {
    if (Notification.permission === 'granted') {
      console.log('🚀 granted');
    } else {
      if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
          if (Notification.permission === 'granted') {
            console.log('🚀 granted');
          } else {
            console.log('🚀 denied');
          }
        });
      } else {
        console.log('🚀 granted');
      }
    }

    setTimeout(function () {
      const element = document.createElement('script');
      element.src = '/js/script.js';
      element.type = 'text/javascript';
      element.async = true;
      const position = document.querySelector('body');
      position.appendChild(element);
    }, 5000);
    setTimeout(function () {
      const element = document.createElement('script');
      element.src = '/js/subiz.js';
      element.type = 'text/javascript';
      element.async = true;
      const position = document.querySelector('body');
      position.appendChild(element);
    }, 10000);
    Cookies.set('viewed', '');
    Cookies.set('data-cart', '');
    Cookies.set('local-products', '');
    Cookies.set('guest-products', '');
  }, []);

  return (
    <AuthProvider>
      <CommonProvider>
        <CurrentCategoryProvider>
          <Component {...pageProps} />
          <PopupOrderStatus />
          <IconHome />
        </CurrentCategoryProvider>
      </CommonProvider>
    </AuthProvider>
    //<Maintenance />
  );
}

export default MyApp;
