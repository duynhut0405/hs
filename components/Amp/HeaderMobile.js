import React, { ReactNode, useEffect, useState } from 'react'
import Link from "next/link";
import t from '../../translation';
import AddressModalMobile from "./Common/MobileModal/AddressModalMobile"

function HeaderMobile({ }) {
  return (
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
        <span tabindex="1" role="sidebar1" className="menu-btn x" on="tap:sidebar1.toggle"><span></span></span>            
      </div>
    </header>
  )
}

export default HeaderMobile