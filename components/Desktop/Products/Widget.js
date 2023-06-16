import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCommon } from '../../../contexts/common';
import api from '../../../services/api';
import StoreModal from '../Common/StoreModal';
const render = [0, 1, 2];
function Widget({ commonData, sku }) {
  const { location, locationData, setActiveLocationModal } = useCommon();
  const [cities, setCities] = useState(null);

  const [store, setStore] = useState({});
  useEffect(() => {
    async function getInventory() {
      try {
        if (locationData) {
          const params = new URLSearchParams({
            city_id: locationData?.city?.value,
            district_id: locationData?.district?.value,
            ward_id: locationData?.ward?.value,
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
        }
      } catch (err) {
        console.log('🚀 ~ file: ProductInfor.js:37 ~ getInventory ~ err', err);
      }
    }

    getInventory();
  }, [locationData]);

  useEffect(() => {
    if (location) {
      setCities(location.cites);
    }
  }, [location]);

  return (
    <>
      {commonData.services && (
        <div className='widget box-shadow widget-1'>
          <h6 className='header-widget'>Ưu đãi từ Hoa Sen Home</h6>
          <ul>
            {commonData.services.map((item, index) => {
              switch (item.index) {
                case 'consult':
                  return (
                    <li key={index}>
                      <i className='icon-login2'></i> {item.title}
                    </li>
                  );
                case 'installation':
                  return (
                    <li key={index}>
                      <i className='icon-t7'></i> Tổng đài tư vấn 1800 1515
                    </li>
                  );
                case 'shipping':
                  return (
                    <li key={index}>
                      <i className='icon-t1'></i> {item.title}
                    </li>
                  );
                case 'return':
                  return (
                    <li key={index}>
                      <i className='icon-t6'></i> {item.title}
                    </li>
                  );
                case 'guarantee':
                  return (
                    <div key={index}>
                      <li>
                        <i className='icon-t3'></i> Cam kết bảo hành
                      </li>
                      <li>
                        <i className='icon-t1'></i> Giao hàng từ 2 giờ đến 5 ngày
                      </li>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </ul>
        </div>
      )}
      {Object.keys(commonData.posts).map(
        (i, index) =>
          commonData.posts[i].posts.length != 0 && (
            <div className='widget box-shadow  widget-2' style={{ marginTop: 14 }} key={index}>
              <h6 className='box-title-3'>{commonData.posts[i].label}</h6>
              <ul>
                {commonData.posts[i].posts.map((item, index2) => (
                  <li key={'000' + index2}>
                    <Link href={'/' + item.request_path}>
                      <a>{item.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
      <div className='widget box-shadow wi dget-1' style={{ marginTop: 14 }}>
        <ul>
          <li>
            <img style={{ position: 'absolute', width: 22, height: 20, left: 17 }} src='/images/noti/6.png'></img>
            <p style={{ marginLeft: 35, marginBottom: 0 }} className='red'>
              Nhập mã <strong>HOASEN88</strong> để giảm đến 500k
            </p>
          </li>
          <li>
            <img style={{ position: 'absolute', width: 22, height: 20, left: 17 }} src='/images/noti/6.png'></img>
            <p style={{ marginLeft: 35, marginBottom: 0 }} className='red'>
              Nhập mã <strong>HSH21</strong> giảm ngay 8%
              <br />
              <br />
              <Link href='/blog/post/huong-dan-su-dung-ma-giam-gia-mung-sinh-nhat-lan-thu-21'>
                <a style={{ display: 'flex', justifyContent: 'center' }}>
                  <i>(Click xem chi tiết)</i>
                </a>
              </Link>
            </p>
          </li>
        </ul>
      </div>

      <StoreModal sku={sku} />
    </>
  );
}

export default Widget;
