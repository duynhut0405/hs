import React, {useState, useEffect} from 'react'
import CheckoutGuest from '../../components/Desktop/Cart/CheckoutGuest'
import CheckoutUser from '../../components/Desktop/Cart/CheckoutUser'
import CheckoutGuestMobile from '../../components/Mobile/Cart/CheckoutGuestMobile'
import CheckoutUserMobile from '../../components/Mobile/Cart/CheckoutUserMobile'
import {useAuth} from '../../contexts/auth'
import IsMobile from '../../utils/detectMobile'

function checkout({isMobile}) {
  const {isAuthenticated} = useAuth();

  return (
    isMobile ?
    <>
      {isAuthenticated && (
        <CheckoutUserMobile/>
      )}
      {!isAuthenticated && (
        <CheckoutGuestMobile/>
      )}
    </>
    :
    <>
      {isAuthenticated && (
        <CheckoutUser/>
      )}
      {!isAuthenticated && (
        <CheckoutGuest/>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } }
}


export default checkout;