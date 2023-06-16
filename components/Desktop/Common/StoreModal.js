import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useCommon } from '../../../contexts/common';
import api from '../../../services/api';

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

function StoreModal({ sku, isMobile = false }) {
  const { location, locationData } = useCommon();
  const [cities, setCites] = useState(null);
  const [districts, setDistricts] = useState([initDistrict]);
  const [currentLocation, setCurrentLocation] = useState({ city: initCity, district: initDistrict });
  const [store, setStore] = useState({});
  const { register } = useForm();
  const [more, setMore] = useState(false);
  const [open, setOpen] = useState(false);

  const changeCity = (e) => {
    const found = cities.find((city) => city.value == e.target.value);
    setCurrentLocation((pre) => {
      return {
        city: {
          ...pre.city,
          value: found.value,
          label: found.label,
          full_name: found.full_name,
        },
        district: initDistrict,
      };
    });

    // Find district
    const findingDistricts = location.districts.filter((district) => district.city_id == found.value || district.city_id == '');
    setDistricts(findingDistricts);
  };

  const changeDistrict = (e) => {
    const found = districts.find((district) => district.value == e.target.value);

    setCurrentLocation((pre) => {
      return {
        ...pre,
        district: {
          ...pre.district,
          value: found.value,
          label: found.label,
          full_name: found.full_name,
          city_id: found.city_id,
        },
      };
    });
  };

  useEffect(() => {
    if (location) {
      setCites(location.cites);
      if (Cookies.get('location-data')) {
        const locationData = JSON.parse(Cookies.get('location-data'));
        if (locationData) {
          setCurrentLocation({ city: locationData.city, district: locationData.district });
          const findingDistricts = location.districts.filter((district) => district.city_id == locationData.city.value);
          setDistricts(findingDistricts);
        }
      }
    }
  }, [location, locationData]);

  async function getInventory() {
    try {
      if (currentLocation?.city?.value) {
        const params = new URLSearchParams({
          city_id: currentLocation?.city?.value,
          ...(currentLocation.district.value && { district_id: currentLocation.district.value }),
          sku,
        }).toString();

        // api.defaults.headers['Authorization'] = 'Bearer wym2xk7jpenm7xa89aorsz84updxd4zo';
        const result = await api.get(`/ERPIntegration/inventory/getAvailableStore?${params}`, {
          headers: {
            Authorization: 'bearer g7gb07cmsfdthk70re1eop4mapg17jum',
          },
        });

        if (result?.data) {
          setStore(result.data);
        }
      } else {
        setStore(null);
      }
    } catch (err) {
      console.log('🚀 ~ file: ProductInfor.js:37 ~ getInventory ~ err', err);
    }
  }

  useEffect(() => {
    getInventory();
  }, [currentLocation]);

  const _renderPC = () => {
    return (
      <div className='widget box-shadow wi dget-1' style={{ marginTop: 14 }}>
        <div style={{ padding: 10 }}>
          {currentLocation?.city?.value ? (
            <p className='mb-10'>
              Xem hàng trưng bày tại{' '}
              <span className='red2 b underline cursor-pointer' onClick={() => setOpen(true)}>
                {currentLocation?.city?.label}
              </span>
            </p>
          ) : (
            <p className='mb-0 b underline red2 cursor-pointer' onClick={() => setOpen(true)}>
              Xem hàng trưng bày
            </p>
          )}
          {/* <div className='row list-item-10'>
            <div className='col-12'>
              <select id='address_Tinh' className='select select-tinh' defaultValue={''} name='city' onChange={(e) => setCurrentCity(e.target.value)}>
                {cities &&
                  cities.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </div>
          </div> */}

          {store?.status === '400' ? <p>{store?.error_message}</p> : null}

          {store?.status === '200' && store?.result_data?.length > 0 ? (
            <>
              <p className='mb-10 red2'>Có {store?.result_data?.length} cửa hàng còn hàng trưng bày</p>
              {store?.result_data?.slice(0, more ? store?.result_data?.length : 1)?.map((item, index) => {
                return (
                  <div key={index} style={{ textAlign: 'justify' }}>
                    <p className='mb-10 red2'>
                      <strong>- {item.name?.split(/–|-/g)[0]}</strong>
                    </p>
                    <p className='mb-10'>
                      <strong>Đ/c</strong> : <span>{item.address?.replace(new RegExp(new RegExp(process.env.REPLACE_LOCATION, 'g'), 'g'), '')}</span>
                    </p>
                    <p>
                      <strong>Số ĐT</strong> : <span>{item?.phone || 'Không có số ĐT'}</span>
                    </p>
                  </div>
                );
              })}
            </>
          ) : null}

          {store?.result_data?.length > 1 ? (
            <p className='red2 underline cursor-pointer' onClick={() => setOpen(true)}>
              {!more ? 'Mở rộng' : 'Thu gọn'}
            </p>
          ) : null}
        </div>
      </div>
    );
  };

  const _renderMobile = () => {
    return (
      <div className='sec-bd-bottom '>
        <div style={{ padding: 10 }}>
          {locationData ? (
            <p className='mb-10'>
              Các cửa hàng tại{' '}
              <span className='red2 b underline cursor-pointer' onClick={() => setOpen(true)}>
                {locationData?.city?.label}
              </span>
            </p>
          ) : (
            <p className='mb-0 b underline red2 cursor-pointer' onClick={() => setOpen(true)}>
              Xem cửa hàng
            </p>
          )}
          {/* <div className='row list-item-10'>
            <div className='col-12'>
              <select id='address_Tinh' className='select select-tinh' defaultValue={''} name='city' onChange={(e) => setCurrentCity(e.target.value)}>
                {cities &&
                  cities.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </div>
          </div> */}

          {store?.status === '400' ? <p>{store?.error_message}</p> : null}

          {store?.status === '200' && store?.result_data?.length > 0 ? (
            <>
              <p className='mb-10 red2'>Có {store?.result_data?.length} cửa hàng còn hàng trưng bày</p>
              {store?.result_data?.slice(0, more ? store?.result_data?.length : 1)?.map((item, index) => {
                return (
                  <div key={index}>
                    <p className='mb-10 red2'>
                      <strong>- {item.name?.split(/–|-/g)[0]}</strong>
                    </p>
                    <p className='mb-10'>
                      <strong>Đ/c</strong> : <span>{item.address?.replace(new RegExp(process.env.REPLACE_LOCATION, 'g'), '')}</span>
                    </p>
                    <p>
                      <strong>Số ĐT</strong> : <span>{item.phone}</span>
                    </p>
                  </div>
                );
              })}
            </>
          ) : null}

          {store?.result_data?.length > 1 ? (
            <p className='red2 underline cursor-pointer' onClick={() => setMore(!more)}>
              {!more ? 'Mở rộng' : 'Thu gọn'}
            </p>
          ) : null}
        </div>
      </div>
    );
  };
  return (
    <>
      {!isMobile ? _renderPC() : _renderMobile()}

      <Modal size='lg' centered show={open} onHide={() => setOpen(false)}>
        <div className='pd-20'>
          <form onSubmit={() => {}}>
            <div className='d-flex align-item-center pb-20 justify-between'>
              <h6 className='title mb-0'>Chọn khu vực</h6>
              <span
                className='btnModal btn-close tx cursor-pointer red2'
                onClick={() => {
                  setOpen(false);
                }}
              >
                Thoát
              </span>
            </div>
            <p>Vui lòng chọn Tỉnh, Thành Phố để biết chính xác thông tin hàng trưng bày gần nhất</p>
            <div className='d-flex gap-5'>
              <select id='address_Tinh' className='select select-tinh' value={currentLocation.city.value} name='city' onChange={(e) => changeCity(e)} ref={register({ required: true })}>
                {cities &&
                  cities.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
              </select>
              <select id='address_QH' className='select select-quan' data-parent='address_Tinh' data-child1='address_PX' value={currentLocation.district.value} name='district' onChange={(e) => changeDistrict(e)} ref={register({ required: true })}>
                {districts.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <div className='mt-10' style={{ height: 200, overflowY: 'scroll', borderTop: '1px solid #cccccc', paddingTop: 10 }}>
            {store?.status === '400' ? <p>{store?.error_message}</p> : null}

            {store?.status === '200' && store?.result_data?.length > 0 ? (
              <>
                <p className='mb-10 red2'>{store?.result_data?.length} Cửa hàng có hàng trưng bày</p>
                {store?.result_data?.map((item, index) => {
                  return (
                    <div key={index} style={{ textAlign: 'justify' }}>
                      <p className='mb-10 red2'>
                        <strong>- {item.name?.split(/–|-/g)[0]}</strong>
                      </p>
                      <p className='mb-10'>
                        <strong>Đ/c</strong> : <span>{item.address?.replace(new RegExp(new RegExp(process.env.REPLACE_LOCATION, 'g'), 'g'), '')}</span>
                      </p>
                      <p>
                        <strong>Số ĐT</strong> : <span>{item?.phone || 'Không có số ĐT'}</span>
                      </p>
                    </div>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default StoreModal;
