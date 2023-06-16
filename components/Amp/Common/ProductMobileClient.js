import React, { useEffect, useState } from 'react';
import ShowStar from '../../Desktop/Review/ShowStar';
import formatVND from '../../../utils/formatVND';
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import { useCommon } from '../../../contexts/common';

function ProductMobileClient({ data, dataIndex, configPrice }) {
  const { user, isAuthenticated, getWishlist, wishlist, setOpenModal } = useAuth();
  const [isInWishlist, setInWishlist] = useState(false);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [plus, setPlus] = useState(0);
  const { locationData } = useCommon();

  useEffect(() => {
    if ((isAuthenticated, wishlist)) {
      const found = wishlist[0].find((element) => element.product_id == data.id);
      if (found) {
        setInWishlist(true);
        setCurrentWishlist(found);
      } else {
        setInWishlist(false);
      }
    }
  }, [wishlist]);
  useEffect(() => {
    if (locationData && configPrice && data.priceGroup && data.priceGroup.allow_custom_length) {
      let cityId = locationData.city.value;
      let shippingPrice = configPrice.pricing.iron_and_steel_shipping.collated_fee[cityId][data.priceGroup.shipping_index];
      let regionWeight = configPrice.pricing.iron_and_steel_region_flexibility.weight;
      let regionPrice = configPrice.pricing.iron_and_steel_region_flexibility.collated_fee[cityId][data.priceGroup.region_index];
      setPlus((Math.ceil(shippingPrice) - Math.ceil(-(regionWeight * regionPrice) / 100) * 100) * 1.1);
    } else if (locationData && configPrice && data.price_group && data.price_group.allow_custom_length) {
      let cityId = locationData.city.value;
      let shippingPrice = configPrice.pricing.iron_and_steel_shipping.collated_fee[cityId][data.price_group.shipping_index];
      let regionWeight = configPrice.pricing.iron_and_steel_region_flexibility.weight;
      let regionPrice = configPrice.pricing.iron_and_steel_region_flexibility.collated_fee[cityId][data.price_group.region_index];
      setPlus((Math.ceil(shippingPrice) - Math.ceil(-(regionWeight * regionPrice) / 100) * 100) * 1.1);
    }
  }, [locationData, configPrice]);

  const handleWishlist = async () => {
    if (isAuthenticated) {
      if (isInWishlist) {
        try {
          const result = await api.delete(`service/wishlist/delete/` + currentWishlistItem.wishlist_item_id);
          if (result.data) {
            setModalText('Đã xoá khỏi sản phẩm yêu thích của bạn');
            setModalShow(true);
            getWishlist();
          }
        } catch (error) {
          throw error;
        }
        return;
      }
      try {
        const result = await api.post('service/wishlist/add', {
          productId: data.id,
          buyRequest: {
            data: {
              productId: data.id,
            },
          },
        });
        if (result.data) {
          setModalText('Đã thêm vào wishlist của bạn');
          setModalShow(true);
          getWishlist();
        }
      } catch (error) {
        throw error;
      }
    } else {
      setOpenModal(true);
    }
  };

  return (
    <div className='item box-shadow'>
      <Link href={`/product/${data.request_path}`}>
        <a className='img tRes_68'>
          <img src={!data.image ? process.env.EMPTY_IMG : `${process.env.DOMAIN_IMAGE + 'catalog/product/' + data.image}`} alt={data.name == undefined ? process.env.EMPTY_IMG : data.name} key={dataIndex} />
        </a>
      </Link>
      <div className='divtext'>
        <h3 className='line-3 title'>
          <Link href={`/product/${data.request_path}`}>
            <a>{data.name}</a>
          </Link>
        </h3>
        <div className='ratingresult'>
          <ShowStar rating={data.rating_summary != null ? data.rating_summary : '0'} />
          <strong className='cl1'>{data.rating_summary != null ? ((data.rating_summary / 100) * process.env.MAX_NUMBER).toFixed(1) : '0'}/5</strong>
        </div>
        <div className='price'>
          <strong>{formatVND(parseInt(data.final_price + plus))} đ</strong>
          {/* <span className="per">-30%</span> */}
        </div>
        {/* <span className={`btnlike ${isInWishlist ? 'active' : ''}`}> <i className="icon-like"></i> </span> */}
        <span className={`btnlike ${isInWishlist ? 'active' : ''}`} onClick={() => handleWishlist()}>
          {' '}
          <i className='icon-like'></i>{' '}
        </span>
      </div>

      <Modal size='sm' show={modalShow} onHide={() => setModalShow(false)}>
        <div className='pd-20'>{modalText}</div>
      </Modal>
    </div>
  );
}

export default ProductMobileClient;
