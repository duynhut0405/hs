import React, {useState, useEffect} from 'react'
import CheckoutGuestSuccess from '../../components/Mobile/Cart/CheckoutGuestSuccess'
import CheckoutGuestSuccessDesktop from '../../components/Desktop/Cart/CheckoutGuestSuccess'
import {useAuth} from '../../contexts/auth'
import { useRouter } from 'next/router'
import IsMobile from '../../utils/detectMobile'

function Success({isMobile}) {
  const {isAuthenticated} = useAuth();
  const router = useRouter();
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push(`/`);
  //   }
  // }, [isAuthenticated])
  return (
    <>
      {!isAuthenticated && isMobile && (
        <CheckoutGuestSuccess/>
      )}
      {!isAuthenticated && !isMobile && (
        <CheckoutGuestSuccessDesktop/>
      )}
      {isAuthenticated && (
        null
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } }
}

export default Success;