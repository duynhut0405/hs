import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import t from '../../../translation';
import { useCommon } from '../../../contexts/common';
import { useAuth } from '../../../contexts/auth';
import Cookie from 'js-cookie';
import api from '../../../services/api';
import { useForm } from 'react-hook-form';

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

function AddressModalDetail({}) {
  const [menuRef, setMenuRef] = useState(React.useRef(null));
  const [isActive, setActiveModal] = useState(false);
  const { location, activeLocationModal, setActiveLocationModal, setLocationData, setCheckLocationAgain } = useCommon();
  const [cities, setCites] = useState(null);
  const [districts, setDistricts] = useState([initDistrict]);
  const [wards, setWards] = useState([initWard]);
  const [currentCity, setCurrentCity] = useState(initCity);
  const [currentDistrict, setCurrentDistrict] = useState(initDistrict);
  const [currentWard, setCurrentWard] = useState(initWard);
  const { isAuthenticated } = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [position, setPoisition] = useState(null);
  const [locationString, setLocationString] = useState(null);

  const geoFindMe = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      return;
    }
    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      setPoisition({
        latitude: latitude,
        longitude: longitude,
      });
    }
    function error() {
      console.log('Unable to retrieve your location');
      Cookie.set('notShowGetCurrentLocation', true);
    }
    let isNotShow = Cookie.get('notShowGetCurrentLocation');
    if (isNotShow) {
      return;
    }
    navigator.geolocation.getCurrentPosition(success, error);
  };

  useEffect(() => {
    if (location) {
      setCites(location.cites);
      if (Cookie.get('location-data')) {
        const locationData = JSON.parse(Cookie.get('location-data'));
        if (locationData) {
          setCurrentCity(locationData.city);

          const findingDistricts = location.districts.filter((district) => district.city_id == locationData.city.value);
          setDistricts(findingDistricts);
          setCurrentDistrict(locationData.district);

          const findingWards = location.wards.filter((ward) => ward.district_id == locationData.district.value);
          setWards(findingWards);
          setCurrentWard(locationData.ward);
        }
      } else {
        geoFindMe();
      }
    }
  }, [location, activeLocationModal]);

  useEffect(async () => {
    if (position != null) {
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}6&key=${process.env.GOOGLE_MAP_KEY}&language=vi`;
      fetch(url)
        .then((res) => res.json())
        .then((response) => {
          if (response?.results[0]) {
            setLocationString(response?.results[0]);
          }
        })
        .catch((status) => {
          console.log('Request failed.  Returned status of', status);
          return null;
        });
    }
  }, [position]);

  useEffect(async () => {
    if (locationString && location) {
      try {
        // Tìm ra thành phố hiện tại
        let fullCityName = locationString.address_components.filter((element) => element?.types[0] == 'administrative_area_level_1');
        const findingCity = location?.cites?.filter((city) => city?.full_name?.includes(fullCityName[0]?.short_name))[0];
        setCurrentCity(findingCity);

        // Tìm ra các quận huyện phù hợp với thành phố
        const findingDistricts = location.districts.filter((district) => district.city_id == findingCity.value);
        setDistricts(findingDistricts);
        let fullDistrictName = locationString.address_components.filter((element) => element?.types[0] == 'administrative_area_level_2' || element?.types[0] == 'locality');
        const findingDistrict = findingDistricts.filter((district) => district?.full_name == fullDistrictName[0]?.long_name)[0] || findingDistricts[0];
        setCurrentDistrict(findingDistrict);

        // Tìm ra phường xã
        const findingWards = location.wards.filter((ward) => ward.district_id == findingDistrict.value);
        setWards(findingWards);
        let formatted_address = locationString.formatted_address;
        let list = formatted_address.split(', ');
        let wardName = list.filter((element) => element.includes('Phường') || element.includes('Xã'))[0];
        const findingWard = findingWards.filter((ward) => ward.full_name == wardName)[0] || findingWards[0];
        setCurrentWard(findingWard);

        let data = {
          city: findingCity,
          district: findingDistrict,
          ward: findingWard,
        };
        Cookie.set('location-data', data);

        if (isAuthenticated) {
          const result = await api.post('/carts/mine/location/shipping-address', {
            shippingAddress: {
              countryId: 'VN',
              customAttributes: [
                { attribute_code: 'ward_id', value: `${findingWard.value}` },
                { attribute_code: 'ward', value: `${findingWard.label}` },
                { attribute_code: 'district_id', value: `${findingDistrict.value}` },
                { attribute_code: 'district', value: `${findingDistrict.label}` },
                { attribute_code: 'city_id', value: `${findingCity.value}` },
              ],
              city: `${findingCity.label}`,
            },
          });
        } else {
          const cardId = Cookie.get('cardId');
          if (cardId) {
            const result = await api.post(`/guest-carts/${cardId}/location/shipping-address`, {
              shippingAddress: {
                countryId: 'VN',
                customAttributes: [
                  { attribute_code: 'ward_id', value: `${findingWard.value}` },
                  { attribute_code: 'ward', value: `${findingWard.label}` },
                  { attribute_code: 'district_id', value: `${findingDistrict.value}` },
                  { attribute_code: 'district', value: `${findingDistrict.label}` },
                  { attribute_code: 'city_id', value: `${findingCity.value}` },
                ],
                city: `${findingCity.label}`,
              },
            });
          }
        }
        setCheckLocationAgain(true);
      } catch (error) {
        console.log(error);
      }
    }
  }, [locationString, location]);

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
    const findingDistricts = location.districts.filter((district) => district.city_id == data.value || district.city_id == '');
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
    const findingWards = location.wards.filter((ward) => ward.district_id == data.value || ward.district_id == '');
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
              { attribute_code: 'ward', value: `${currentWard.label}` },
              { attribute_code: 'district_id', value: `${currentDistrict.value}` },
              { attribute_code: 'district', value: `${currentDistrict.label}` },
              { attribute_code: 'city_id', value: `${currentCity.value}` },
            ],
            city: `${currentCity.label}`,
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
                { attribute_code: 'ward', value: `${currentWard.label}` },
                { attribute_code: 'district_id', value: `${currentDistrict.value}` },
                { attribute_code: 'district', value: `${currentDistrict.label}` },
                { attribute_code: 'city_id', value: `${currentCity.value}` },
              ],
              city: `${currentCity.label}`,
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
    //window.location.reload();
  };

  return (
    <>
      {location && (
        <>
          <div id='modalAddress' className={`myModal modalAddress ${activeLocationModal ? 'active' : ''}`}>
            <div className='container middle'>
              <div className='contentModal' ref={menuRef}>
                <form onSubmit={handleSubmit(setLocation)}>
                  <h6 className='title'>
                    Chọn khu vực
                    <span
                      className='btnModal btn-close tx'
                      onClick={() => {
                        setActiveLocationModal(false);
                      }}
                    >
                      Thoát
                    </span>
                  </h6>
                  <p>VUI LÒNG CHỌN TỈNH, THÀNH PHỐ ĐỂ BIẾT CHÍNH XÁC GIÁ, KHUYẾN MÃI VÀ TỒN KHO</p>
                  <select id='address_Tinh' className='select select-tinh' value={currentCity.value} name='city' onChange={(e) => changeCity(e)} ref={register({ required: true })}>
                    {cities &&
                      cities.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                  </select>
                  {errors.city && <div className='error'>Hãy nhập thành phố đúng</div>}
                  <select id='address_QH' className='select select-quan' data-parent='address_Tinh' data-child1='address_PX' value={currentDistrict.value} name='district' onChange={(e) => changeDistrict(e)} ref={register({ required: true })}>
                    {districts.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.district && <div className='error'>Hãy nhập quận huyện đúng</div>}
                  <select id='address_PX' className='select select-phuong' value={currentWard.value} name='ward' onChange={(e) => changeWard(e)} ref={register({ required: true })}>
                    {wards.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.ward && <div className='error'>Hãy nhập phường xã đúng</div>}
                  <br />
                  <button className='btn btnModal full' type='submit'>
                    Giao hàng đến địa chỉ này
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

AddressModalDetail.propTypes = propTypes;

export default AddressModalDetail;
