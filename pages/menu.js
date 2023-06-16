import React, {useState, useEffect} from 'react'
import Layout from '../components/Desktop/Layout'
import LoginBlock from '../components/Desktop/Login/login' 
import RegisterBlock from '../components/Desktop/Login/register'
import LayoutMobile from '../components/Mobile/LayoutMobile'
import {useAuth} from '../contexts/auth'
import IsMobile from '../utils/detectMobile'
import HeaderMobile from '../components/Mobile/HeaderMobile'
import { useRouter } from 'next/router'
import Link from 'next/link'
import api from '../services/api'
import WidgetTop from '../components/Mobile/Common/WidgetTop'

function Menu({isMobile, homeTop}) {
  const { isAuthenticated } = useAuth();
  return (
   isMobile ?
    <LayoutMobile>
      <HeaderMobile />
      <ul className="menu-user-info sec-bd-bottom">
        <li className="active ">
          <Link href="/">
            <a href="/"><i className="icon-home "></i>Trang chủ </a>
          </Link>
        </li>
        <li className=" ">
          <Link href="/categories">
            <a href="/categories"><i className="icon-t20"></i>Sản phẩm</a>
          </Link>
        </li>
        <li className=" ">
          <Link href="/about">
            <a href="#"><i className="icon-t21 "></i>Về chúng tôi</a>
          </Link>
        </li>
        <li className=" ">
          <a href="/distribution"><i className="icon-t1 "></i>Phân phối</a>
        </li>
        <li className=" ">
          <Link href="/contact">
            <a href="/contact"><i className="icon-phone "></i>Liên hệ</a>
          </Link>
        </li>
          {isAuthenticated && (
            <li className="">
              <Link href="/account/user-address">
                <a href="/account/user-address"><i className="icon-t9 "></i>Địa chỉ nhận hàng</a>
              </Link>
            </li>
          )}
        <li className="">
          <Link href="/blog">
            <a href="/blog"><i className="icon-t19 "></i>Tin tức</a>
          </Link>
        </li>
        <li className="">
          <Link href="/blog/category/chinh-sach-ho-tro">
            <a href="/blog/category/chinh-sach-ho-tro"><i className="icon-t3"></i>Chính sách hỗ trợ</a>
          </Link>
        </li>
      </ul>
      <section className="sec-bd-bottom" >
        {homeTop.sidebar.map((item, index) => (
          ((item.identify != undefined && item.identify == 'good-experience') && (
            <WidgetTop data={item} key={index}/>
          )
        )))}
      </section> 
    </LayoutMobile>
   :
    <Layout>
     
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  let homeTop = [];
  try {
    const result = await api.get('/service/stores/home-top');
    homeTop = result.data[0];
  } catch (error) {
    console.log(error);
  }
  // Fetch data from external API
  return { props: { isMobile, homeTop } }
}


export default Menu;