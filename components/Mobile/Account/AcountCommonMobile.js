import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { useAuth } from '../../../contexts/auth'
import t from '../../../translation'
import formatVND from '../../../utils/formatVND'
import checkImageExist from '../../../utils/checkImageExist'
import getLastSlashProduct from '../../../utils/getLastSlashProduct';

const propTypes = {};

function AcountCommon({ }) {
  const { user, orderedProducts } = useAuth();
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(null);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);
  const [check, setCheck] = useState(null);
  const [telephone, setTelephone] = useState(null);
  useEffect(async () => {
    if (user != undefined && user.addresses.length != 0) {
      const billingAddress = user.addresses.find(element => (element.default_billing));
      setDefaultBillingAddress(billingAddress || null);
      const shippingAddress = user.addresses.find(element => (element.default_shipping));
      setDefaultShippingAddress(shippingAddress || null);
    }
  }, [user])
  useEffect(async () => {
    if (user) {
      if (user.email.split("@")[1] === "example.com") {
        setCheck(user.telephone);
      } else {
        setCheck(user.email)
        setTelephone(user.telephone)
      }
    }
  }, [user])
  const convertDateTime = (datetime) => {
    return datetime.split("-").reverse().join("/");
  }
  return (
    <>
      {(user != undefined) && (
        <div className="">
          <div className="sec-bd-bottom  box-info">

            <div className="item">
              <h6 className="title">{t('account_info')}</h6>
              <div className="mb-20">
                {(user.lastname != undefined && user.firstname != undefined) && (
                  <div className="name">{t('fullname')}: {user.lastname} {user.firstname}</div>
                )}
                {(check != undefined) && (
                  <div className="email">{`${telephone !== null ? t('email') : t('phone')}`}: {check}</div>
                )}
                {(user.dob != undefined) && (
                  <div className="email">{`${t('birthday')}: ${convertDateTime(user.dob)}`}</div>
                )}
                {(telephone != undefined) && (
                  <div className="email">{t('phone')}: {telephone}</div>
                )}
                {(user.gender != undefined) && (
                  <div className="email">{`${t('gender')}: ${user.gender === "1" ? "Nam" : "Nữ"}`}</div>
                )}
              </div>
              <div className="wbtn">
                  <Link href="/account/edit">
                    <a href="/account/edit" className="btn-custom btn-4">{t('fix')}</a>
                  </Link>
              </div>
            </div>
            <div className="item">
              <h6 className="title">{t('default_user_billing_address')}</h6>
              {(defaultBillingAddress != undefined && defaultBillingAddress) && (
                <div className="mb-20">
                  <div className="name">{defaultBillingAddress.firstname} {defaultBillingAddress.lastname}</div>
                  <div className="phone">{defaultBillingAddress.telephone}</div>
                  <div className="address">{defaultBillingAddress.street[0]}, {defaultBillingAddress.custom_attributes.ward.value}, {defaultBillingAddress.custom_attributes.district.value}, {defaultBillingAddress.city}</div>
                </div>
              )}
              <div className="wbtn">
                  <Link href="/account/address/billing-default">
                    <a href="/account/address/billing-default" className="btn-custom btn-4">{(defaultBillingAddress != undefined && defaultBillingAddress) ? t('fix') : t('adding')}</a>
                  </Link>
              </div>
            </div>
            
            <div className="item">
              <h6 className="title">{t('default_user_shipping_address')}</h6>
              {(defaultShippingAddress != undefined && defaultShippingAddress) && (
                <div className="mb-20">
                  <div className="name">{defaultShippingAddress.firstname} {defaultShippingAddress.lastname}</div>
                  <div className="phone">{defaultShippingAddress.telephone}</div>
                  <div className="address">{defaultShippingAddress.street[0]}, {defaultShippingAddress.custom_attributes.ward.value}, {defaultShippingAddress.custom_attributes.district.value}, {defaultShippingAddress.city}</div>
                </div>
              )}
              <div className="wbtn">
                  <Link href="/account/address/shipping-default">
                    <a href="/account/address/shipping-default" className="btn-custom btn-4">{(defaultBillingAddress != undefined && defaultBillingAddress) ? t('fix') : t('adding')}</a>
                  </Link>
              </div>
            </div>
          </div>
          <div className="box-product">
            <h6 className="box-title">{t('ordered_product_recently')}</h6>
            <div className=" list-p-3">
              {orderedProducts && orderedProducts.length != 0 && (
                orderedProducts.map((item, index) => (
                  <div className="item " key={index}>
                    <a href={item.extension_attributes.url_key ? `/product/${getLastSlashProduct(item.extension_attributes.url_key)}` : "#"} className="img tRes_68">
                      <img className="lazy-hidden" src={item.extension_attributes.thumbnail ? item.extension_attributes.thumbnail : "/images/hoasen-product.jpg"} alt="" onError={async (e) => await checkImageExist(e)} />
                    </a>
                    <div className="divtext">
                      <div className="line-3 title"><a>{item.name ? item.name : 'product'}</a></div>
                      <div className="price"><strong>{formatVND(item.price)} đ</strong>
                      </div>

                      <div className="action">
                        <span className="number">{t('number')}: {item.qty_ordered}</span>
                        <Link href={`/product/${getLastSlashProduct(item.extension_attributes.url_key)}`}>
                          <a className="more" href="#">{t('view_more')}</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

AcountCommon.propTypes = propTypes;

export default AcountCommon;
