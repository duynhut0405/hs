import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import t from '../../../../translation';
import { useCommon } from '../../../../contexts/common';
import Cookie from 'js-cookie';
import { useAuth } from '../../../../contexts/auth';
import api from '../../../../services/api';

const propTypes = {
  data: PropTypes.array,
};

const initCity = {
  value: '',
  label: 'Tất cả Tỉnh/Thành Phố',
  country_id: 'VN',
};

const initDistrict = {
  value: '',
  label: 'Tất cả Quận Huyện',
  city_id: '',
};

const initWard = {
  value: '',
  label: 'Tất cả Phường/Xã',
  city_id: '',
};

function AddressModalDetailMobile({}) {
  const [menuRef, setMenuRef] = useState(React.useRef(null));
  const [isActive, setActiveModal] = useState(false);
  const { location, activeLocationModal, setActiveLocationModal, setLocationData } = useCommon();
  const [cities, setCites] = useState(null);
  const [districts, setDistricts] = useState([initDistrict]);
  const [wards, setWards] = useState([initWard]);
  const [currentCity, setCurrentCity] = useState(initCity);
  const [currentDistrict, setCurrentDistrict] = useState(initDistrict);
  const [currentWard, setCurrentWard] = useState(initWard);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (location) {
      setCites(location.cites);
      if (Cookie.get('location-data')) {
        const locationData = JSON.parse(Cookie.get('location-data'));
        if (locationData) {
          setCurrentCity(locationData.city);

          const findingDistricts = location.districts.filter((district) => district.city_id == locationData.city.value);
          setDistricts(findingDistricts);

          const findingWards = location.wards.filter((ward) => ward.district_id == locationData.district.value);
          setWards(findingWards);
          setCurrentDistrict(locationData.district);
          setCurrentWard(locationData.ward);
        }
      }
    }
  }, [location, activeLocationModal]);

  const changeCity = (e) => {
    const found = cities.find((city) => city.value == e.target.value);
    let data = {
      ...currentCity,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
    };
    setCurrentCity(data);

    // Find district
    const findingDistricts = location.districts.filter((district) => district.city_id == data.value);
    setDistricts(findingDistricts);
    setWards([initWard]);
  };

  const changeDistrict = (e) => {
    const found = districts.find((district) => district.value == e.target.value);
    let data = {
      ...currentDistrict,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
      city_id: found.city_id,
    };
    setCurrentDistrict(data);

    // Find ward
    const findingWards = location.wards.filter((ward) => ward.district_id == data.value);
    setWards(findingWards);
  };

  const changeWard = (e) => {
    const found = wards.find((ward) => ward.value == e.target.value);
    let data = {
      ...currentWard,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
      district_id: found.district_id,
    };
    setCurrentWard(data);
  };

  const setLocation = async () => {
    let data = {
      city: currentCity,
      district: currentDistrict,
      ward: currentWard,
    };
    if (isAuthenticated) {
      try {
        const result = await api.post('/carts/mine/location/shipping-address', {
          shippingAddress: {
            countryId: 'VN',
            customAttributes: [
              { attribute_code: 'ward_id', value: `${currentWard.value}` },
              { attribute_code: 'ward', value: `${currentWard.full_name}` },
              { attribute_code: 'district_id', value: `${currentDistrict.value}` },
              { attribute_code: 'district', value: `${currentDistrict.full_name}` },
              { attribute_code: 'city_id', value: `${currentCity.value}` },
            ],
            city: `${currentCity.full_name}`,
          },
        });
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      const cardId = Cookie.get('cardId');
      if (cardId) {
        try {
          const result = await api.post(`/guest-carts/${cardId}/location/shipping-address`, {
            shippingAddress: {
              countryId: 'VN',
              customAttributes: [
                { attribute_code: 'ward_id', value: `${currentWard.value}` },
                { attribute_code: 'ward', value: `${currentWard.full_name}` },
                { attribute_code: 'district_id', value: `${currentDistrict.value}` },
                { attribute_code: 'district', value: `${currentDistrict.full_name}` },
                { attribute_code: 'city_id', value: `${currentCity.value}` },
              ],
              city: `${currentCity.full_name}`,
            },
          });
        } catch (error) {
          alert(error.response.data.message);
          return;
        }
      }
    }
    Cookie.set('location-data', data);
    setLocationData(data);
    setActiveLocationModal(false);
    window.location.reload();
  };

  return (
    <>
      {location && (
        <>
          <div id='modalAddress' className={`myModal modalAddress ${activeLocationModal ? 'active' : ''}`}>
            <div className='container'>
              <div className='contentModal' ref={menuRef}>
                <h6 className='title'>
                  {t('choise_area')}
                  <span
                    className='btnModal btn-close tx'
                    onClick={() => {
                      setActiveLocationModal(false);
                    }}
                  >
                    {t('exit')}
                  </span>
                </h6>
                <p>{t('input_message_description')}</p>
                <select id='address_Tinh' className='select select-tinh' value={currentCity.value} name='city' onChange={(e) => changeCity(e)}>
                  {cities &&
                    cities.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    ))}
                </select>
                <select id='address_QH' className='select select-quan' data-parent='address_Tinh' data-child1='address_PX' value={currentDistrict.value} name='district' onChange={(e) => changeDistrict(e)}>
                  {districts.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <select id='address_PX' className='select select-phuong' value={currentWard.value} name='ward' onChange={(e) => changeWard(e)}>
                  {wards.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <br />
                <a className='btn btnModal full' onClick={() => setLocation()}>
                  {t('ship_to_this_address')}
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

AddressModalDetailMobile.propTypes = propTypes;

export default AddressModalDetailMobile;
