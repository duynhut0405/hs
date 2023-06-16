import React, { useEffect, useState } from 'react';
import ShowStar from '../Review/ShowStar';
import formatVND from '../../../utils/formatVND';
import Link from 'next/link';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import Modal from 'react-bootstrap/Modal';
import { useCommon } from '../../../contexts/common';
import checkImageExist from '../../../utils/checkImageExist';
import getLastSlashProduct from '../../../utils/getLastSlashProduct';

function Product({ data }) {
  const { isAuthenticated, getWishlist, wishlist, setOpenModal } = useAuth();
  const [isInWishlist, setInWishlist] = useState(false);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const { locationData, currentRegion } = useCommon();
  const [finalPrice, setFinalPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(async () => {
    if (modalShow) {
      await setTimeout(() => {
        setModalShow(false);
      }, 1000);
    }
  }, [modalShow]);

  useEffect(() => {
    normalPrice();
  }, [locationData, currentRegion, data.name]);

  const normalPrice = async () => {
    if (!data.price_group && !data.price_group.exchange_rate) {
      console.log('Không có data.price_group.exchange_rate');
      return;
    }

    let plus = 0;
    if (data.region_data && currentRegion && currentRegion.includes(data.region_data[0].region)) {
      let price = parseFloat(data.region_data[0].price) + plus * parsePrice(data.price_group.exchange_rate);
      setFinalPrice(parseInt(Math.ceil(price)));
      setBasePrice(parseInt(Math.ceil(price)));
      return;
    } else {
      let price = parseFloat(data.final_price) + plus * parseFloat(data.price_group.exchange_rate);
      let regularPrice = parseFloat(data.regular_price) + plus * parseFloat(data.price_group.exchange_rate);
      setFinalPrice(parseInt(Math.ceil(price)));
      setBasePrice(parseInt(Math.ceil(regularPrice)));
    }
  };

  useEffect(() => {
    if ((isAuthenticated, wishlist)) {
      const found = wishlist[0].find((element) => element.product_id == data.entity_id);
      if (found) {
        setInWishlist(true);
        setCurrentWishlist(found);
      } else {
        setInWishlist(false);
      }
    }
  }, [wishlist]);

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
          productId: data.entity_id,
          buyRequest: {
            data: {
              productId: data.entity_id,
            },
          },
        });
        if (result.data) {
          setModalText('Đã thêm vào sản phẩm yêu thích của bạn');
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
      <Link href={`/product/${getLastSlashProduct(data.request_path)}`} prefetch={false}>
        <a href={`/product/${getLastSlashProduct(data.request_path)}`} className='img tRes_68'>
          <img
            className='lazy-hidden'
            data-lazy-type='image'
            data-lazy-src={data.image == undefined ? '/images/hoasen-product.jpg' : data.image}
            src='/images/no-image.svg'
            alt={data.name == undefined ? '/images/hoasen-product.jpg' : data.name}
            onError={async (e) => await checkImageExist(e)}
          />
        </a>
      </Link>
      <div className='divtext'>
        <h3 className='line-3 title'>
          <Link href={`/product/${getLastSlashProduct(data.request_path)}`} prefetch={false}>
            <a href={`/product/${getLastSlashProduct(data.request_path)}`}>{data.name}</a>
          </Link>
        </h3>
      </div>
      <div className='divtext bottom'>
        <div className='ratingresult'>
          <ShowStar rating={data.rating_summary != null ? data.rating_summary : '0'} />
          <strong className='cl1 rating-point'>{data.rating_summary != null ? ((data.rating_summary / 100) * process.env.MAX_NUMBER).toFixed(1) : '0'}/5</strong>
        </div>
        <div className='price'>
          <strong className='red'>
            {formatVND(finalPrice)} {data.price_group && data.price_group.price_unit_text ? data.price_group.price_unit_text : 'đ'}
          </strong>

          {basePrice !== 0 && basePrice != finalPrice && Math.round(((finalPrice - basePrice) / basePrice) * 100) < 0 && <span className='per red fs15'> {Math.round(((finalPrice - basePrice) / basePrice) * 100)}%</span>}
          <br />
          {basePrice !== 0 && basePrice != finalPrice && Math.round(((finalPrice - basePrice) / basePrice) * 100) < 0 && (
            <span className='price-old'>
              {formatVND(basePrice)} {data.price_group && data.price_group.price_unit_text ? data.price_group.price_unit_text : 'đ'}
            </span>
          )}
        </div>
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

export default Product;
