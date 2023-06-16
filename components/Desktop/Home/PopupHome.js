import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
const PopupHome = ({ handleHide }) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(async () => {
    try {
      const result = await api.get('service/homepopups?searchCriteria[filter_groups][0][filters][0][field]=type&searchCriteria[filter_groups][0][filters][0][value]=home');
      if (result?.data) {
        setData([...result.data]);
      } else {
        setData([
          {
            url: 'https://hoasenhome.vn/blog/post/mung-sinh-nhat-chop-deal-thang-08',
            image: '/images/banner_home_new.png',
          },
        ]);
      }
    } catch (error) {
      setData([
        {
          url: 'https://hoasenhome.vn/blog/post/mung-sinh-nhat-chop-deal-thang-08',
          image: '/images/banner_home_new.png',
        },
      ]);
    }
  }, []);

  const hidePopup = () => {
    if (index + 1 > data?.length) {
      setIndex(-1);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <>
      {index !== -1 && index + 1 <= data?.length ? (
        <div key={index} className='modal-home' onClick={hidePopup}>
          <div className='modal-home-image'>
            <div className='modal-home-icon btnlike'>
              <i className='icon-close fs20'></i>
            </div>
            <a href={data[index]?.url} target='_blank' onClick={hidePopup}>
              <img src={data[index]?.image} alt='Popup' />
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PopupHome;
