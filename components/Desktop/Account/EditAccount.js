import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { useAuth } from '../../../contexts/auth'
import t from '../../../translation'
import formatVND from '../../../utils/formatVND'
import checkImageExist from '../../../utils/checkImageExist'
import getLastSlashProduct from '../../../utils/getLastSlashProduct';

const propTypes = {};

function AcountCommon({}) {
  const {user, orderedProducts} = useAuth();
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(null);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);
  useEffect(async () => {
    if (user != undefined && user.addresses.length != 0) {
      const billingAddress = user.addresses.find(element => (element.default_billing));
      setDefaultBillingAddress(billingAddress || null);
      const shippingAddress = user.addresses.find(element => (element.default_shipping));
      setDefaultShippingAddress(shippingAddress || null);
    }
  }, [user])

  return (
    <>
      {(user != undefined) && (
        <div className="col-12 col-md-9">
          <div className="box-shadow box-info">
            <div className="item">
              <h6 className="title">{t('account_info')}</h6>
              <div className="mb-20">
                  {(user.lastname != undefined && user.firstname != undefined) && (
                    <div className="name">{user.lastname} {user.firstname}</div>
                  )}
                  {(user.email != undefined) && (
                    <div className="email">{user.email}</div>
                  )}
              </div>
              <Link href="/account/edit">
                <a href="/account/edit" className="edit">{t('fix')}</a>
              </Link>
            </div>
            <div className="item">
              <h6 className="title">{t('default_user_billing_address')}</h6>
              {(defaultBillingAddress != undefined && defaultBillingAddress ) && (
                <div className="mb-20">
                  <div className="name">{defaultBillingAddress.lastname} {defaultBillingAddress.firstname}</div>
                  <div className="phone">{defaultBillingAddress.telephone}</div>
                  <div className="address">{defaultBillingAddress.street[0]}, {defaultBillingAddress.custom_attributes.ward.value}, {defaultBillingAddress.custom_attributes.district.value}, {defaultBillingAddress.city}</div>
                </div>
              )}
              <Link href="/account/address/billing-default">
                <a className="edit">{(defaultBillingAddress != undefined && defaultBillingAddress ) ? t('fix') : t('adding')}</a>
              </Link>
            </div>
            <div className="item">
              <h6 className="title">{t('default_user_shipping_address')}</h6>
              {(defaultShippingAddress != undefined && defaultShippingAddress ) && (
                <div className="mb-20">
                  <div className="name">{defaultShippingAddress.firstname} {defaultShippingAddress.lastname}</div>
                  <div className="phone">{defaultShippingAddress.telephone}</div>
                  <div className="address">{defaultShippingAddress.street[0]}, {defaultShippingAddress.custom_attributes.ward.value}, {defaultShippingAddress.custom_attributes.district.value}, {defaultShippingAddress.city}</div>
                </div>
              )}
              <Link href="/account/address/shipping-default">
                <a className="edit">{(defaultShippingAddress != undefined && defaultShippingAddress ) ? t('fix') : t('adding')}</a>
              </Link>
            </div>


          </div>
          <div className="box-shadow box-product">
            <h6 className="box-title">{t('ordered_product_recently')}</h6>
            <div className=" list-p-3">
            {orderedProducts && orderedProducts.length != 0 && (
              orderedProducts.map((item, index) => (
                <div className="item " key={index}>
                  <a href={item.extension_attributes.url_key ? `/product/${getLastSlashProduct(item.extension_attributes.url_key)}` : "#"} className="img tRes_68">
                    <img className="lazy-hidden" src={item.extension_attributes.thumbnail ? item.extension_attributes.thumbnail : "/images/hoasen-product.jpg" } alt={item.name || ''} onError={async (e) => await checkImageExist(e)}/>
                  </a>
                  <div className="divtext">
                  <div className="line-3 title"><a>{item.name ? item.name : 'product'}</a></div>
                    <div className="price"><strong>{formatVND(item.price)} đ</strong>
                    {/* <span className="per">-30%</span> */}
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