import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import t from '../../../translation'
import { useCommon } from '../../../contexts/common'
import { useAuth } from '../../../contexts/auth'
import Cookie from 'js-cookie'

const propTypes = {
  data: PropTypes.array
};

const initCity = {
  value: "", label: "Tất cả Tỉnh/Thành Phố", country_id: "VN"
}

const initDistrict = {
  value: "",
  label: "Tất cả Quận Huyện",
  city_id: ""
}

const initWard = {
  value: "",
  label: "Tất cả Phường/Xã",
  city_id: ""
}

function AddressModal({ }) {
  const [menuRef, setMenuRef] = useState(React.useRef(null));
  const { location, setActiveLocationModal, activeLocationModal, checkLocationAgain } = useCommon();
  const [cities, setCites] = useState(null);
  const [districts, setDistricts] = useState([initDistrict]);
  const [wards, setWards] = useState([initWard]);
  const [currentCity, setCurrentCity] = useState(initCity);
  const [currentDistrict, setCurrentDistrict] = useState(initDistrict);
  const [currentWard, setCurrentWard] = useState(initWard);

  useEffect(() => {
    if (location) {
      setCites(location.cites);
      if (Cookie.get("location-data")) {
        const locationData = JSON.parse(Cookie.get("location-data"));
        if (locationData) {
          setCurrentCity(locationData.city);

          const findingDistricts = location.districts.filter(district => district.city_id == locationData.city.value);
          setDistricts(findingDistricts);

          const findingWards = location.wards.filter(ward => ward.district_id == locationData.district.value);
          setWards(findingWards);
          setCurrentDistrict(locationData.district);
          setCurrentWard(locationData.ward);
        }
      }
    }
  }, [location, activeLocationModal, checkLocationAgain])

  return (
    <>
      <div className="item-group-addon">
        <span className="t1">{t('choise_area')}</span>
        <span id="inputAddress" className="loadcity  btnModal" onClick={() => { setActiveLocationModal(true) }}>
          {currentCity.label}
        </span>
      </div>
    </>
  );
}

AddressModal.propTypes = propTypes;

export default AddressModal;
