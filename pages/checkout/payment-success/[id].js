import React, {useState, useEffect} from 'react'
import CheckoutUserSuccess from '../../../components/Desktop/Cart/CheckoutUserSuccess'
import CheckoutUserSuccessMobile from '../../../components/Mobile/Cart/CheckoutUserSuccess'
import CartUser from '../../../components/Desktop/Cart/CartUser'
import {useAuth} from '../../../contexts/auth'
import {isMobile} from 'react-device-detect'

function Success({}) {
  const {isAuthenticated} = useAuth();

  return (
    !isMobile ?
    <>
      {isAuthenticated && (
        <CheckoutUserSuccess/>
      )}
      {!isAuthenticated && (
        null
      )}
    </>
    :
    <>
      {isAuthenticated && (
        <CheckoutUserSuccessMobile/>
      )}
      {!isAuthenticated && (
        null
      )}
    </>
  )
}

export default Success;