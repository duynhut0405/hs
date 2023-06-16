import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { useAuth } from '../../../contexts/auth'
import t from '../../../translation'
import formatVND from '../../../utils/formatVND'
import api from '../../../services/api'

const propTypes = {};
function AcountAddress({ renderBillingAddress }) {
  const { user } = useAuth();
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(null);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(async () => {
    if (user != undefined && user.addresses.length != 0) {
      const billingAddress = user.addresses.find(element => (element.default_billing));
      setDefaultBillingAddress(billingAddress || {});
      const shippingAddress = user.addresses.find(element => (element.default_shipping));
      setDefaultShippingAddress(shippingAddress || {});
    }
  }, [user])

  const deleteWishlist = async (item) => {
    setLoading(true);
    try {
      const result = await api.delete(`service/addresses/${item.id}`);
    } catch (error) {
      throw error;
    }
    setLoading(false);
    window.location.reload();
  }

  const setDefaultShipping = async (item) => {
    setLoading(true);
    try {
      const result = await api.post(`service/customers/address`, {
        "address": {
          "id": item.id,
          "default_shipping": true
        }
      });
    } catch (error) {
      throw error;
    }
    window.location.reload();
    setLoading(false);
  }
  const render = () => {
    const listFilter = user.addresses.filter((address) => {
      return address.default_billing === true
    })
    if (listFilter.length !== 0) {
      return (
        <div className="item ">
          <div className="divtext">
            {/*            <a className="review" onClick={() => deleteWishlist(item)}>Xoá</a> */}
            {(user.lastname != undefined && user.firstname != undefined) && (
              <div className="w5">{listFilter[0].lastname ? listFilter[0].lastname : ''} {listFilter[0].firstname ? listFilter[0].firstname : ''}</div>
            )}
            <p>
              {listFilter[0].telephone} <br />
              {listFilter[0].street[0]}, {listFilter[0].custom_attributes.ward.value}, {listFilter[0].custom_attributes.district.value}, {listFilter[0].city}
            </p>
          </div>
        </div>
      )
    }
  }
  return (
    <>
      {(user != undefined) && (
        <div className={`list-p-3 ${loading ? 'loading' : ''}`}>
          {renderBillingAddress == "true" ? render() :
            (user.addresses && user.addresses.length != 0) && (
              user.addresses.map((item, index) => (
                <div className="item " key={index}>
                  <div className="divtext">
                    <a className="review" onClick={() => deleteWishlist(item)}>Xoá</a>
                    {(user.lastname != undefined && user.firstname != undefined) && (
                      <div className="w5">{item.lastname ? item.lastname : ''} {item.firstname ? item.firstname : ''}</div>
                    )}
                    <p>
                      {item.telephone} <br />
                      {item.street[0]}, {item.custom_attributes.ward.value}, {item.custom_attributes.district.value}, {item.city}
                    </p>
                    <div className="action-2">
                      <Link href={`/account/user-address/${item.id}`} prefetch={false}>
                        <a href={`/account/user-address/${item.id}`}>Sửa địa chỉ</a>
                      </Link>
                      {!item.default_shipping && (<a onClick={() => setDefaultShipping(item)}>| Đặt mặc định</a>)}
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </div>
      )}
    </>
  );
}

AcountAddress.propTypes = propTypes;
export default AcountAddress;
