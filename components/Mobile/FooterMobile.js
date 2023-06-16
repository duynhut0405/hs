import React from 'react'
import Link from "next/link";
import t from '../../translation'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'

function FooterMobile() {
  const router = useRouter();
  const {user, isAuthenticated} = useAuth();

  return (
    <div id="footer-mb">
      <div className="row">

        <div className="col-3">
          <Link href="/" prefetch={false}>
            <a className={`item ${router.asPath == '/' ? 'active' : ''}`} >
              <span className="img">
                <i className="icon-home"></i>
              </span>
              <span className="name">{t('Home')}</span>
            </a>
          </Link>
        </div>

        <div className="col-3">
          <Link href="/categories" prefetch={false}>
            <a className={`item ${router.asPath == '/categories' ? 'active' : ''}`} >
              <span className="img"><i className="icon-t17"></i></span>
              <span className="name">{t('categories')}</span>
            </a>
          </Link>
        </div>

        <div className="col-3">
          <div className="item btnModal" data-modal="modalExigency">
            <span className="img">
              <a className="tx1" href="tel:18001515"><i className="icon-phone"></i> </a>
            </span>
            <span className="name">{t('hotline')}</span>
          </div>
        </div>

        <div className="col-3">
          {isAuthenticated ? ( 
            <Link href="/account" prefetch={false}>
              <a href="/account" className={`item ${(router.asPath == '/account' || router.asPath == '/account/edit' || router.asPath == '/account/order-list' || router.asPath == '/account/order-product' || router.asPath == '/account/wishlist') ? 'active' : ''}`}>
                <span className="img"><i className="icon-login"></i></span>
                <span className="name">{user.lastname}</span>
              </a>
            </Link>
          ): (
            <Link href="/login" prefetch={false}>
              <a className={`item ${router.asPath == '/login' ? 'active' : ''}`}>
                <span className="img"><i className="icon-login"></i></span>
                <span className="name">{t('login')}</span>
              </a>
            </Link>
          )}
        </div>

        <div className="col-3">
          <Link href="/menu" prefetch={false}>
            <a className={`item ${router.asPath == '/menu' ? 'active' : ''}`}>
              <span className="img"><i className="icon-t18"></i></span>
              <span className="name">{t('menu')}</span>
            </a>
          </Link>
        </div>

      </div >
    </div >
  )
}

export default FooterMobile