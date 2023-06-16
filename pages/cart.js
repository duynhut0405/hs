import React, { useState, useEffect } from 'react'
import Cart from '../components/Desktop/Cart/Cart'
import CartUser from '../components/Desktop/Cart/CartUser'
import { useAuth } from '../contexts/auth'
import IsMobile from '../utils/detectMobile'
import CartMobile from '../components/Mobile/Cart/Cart'
import CartUserMobile from '../components/Mobile/Cart/CartUser'

function cart({ isMobile }) {
  const { isAuthenticated } = useAuth();

  return (
    isMobile ?
      <>
        {!isAuthenticated && (
          <CartMobile />
        )}
        {isAuthenticated && (
          <CartUserMobile />
        )}
      </>

      :

      <>
        {!isAuthenticated && (
          <Cart />
        )}
        {isAuthenticated && (
          <CartUser />
        )}
      </>
  )
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } }
}

export default cart;