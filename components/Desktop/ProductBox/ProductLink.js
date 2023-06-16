import React, { useState, useEffect } from 'react';
import ShowStar from '../Review/ShowStar';
import formatVND from '../../../utils/formatVND';
import Link from 'next/link';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import checkImageExist from '../../../utils/checkImageExist';
import getLastSlashProduct from '../../../utils/getLastSlashProduct';
import Modal from 'react-bootstrap/Modal';
function Product({ data }) {
  const { isAuthenticated, wishlist, getWishlist } = useAuth();
  const [isInWishlist, setInWishlist] = useState(false);
  const [finalPrice, setFinalPrice] = useState(data?.extension_attributes?.final_price || 0);
  const [basePrice, setBasePrice] = useState(data?.extension_attributes?.price || 0);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState('');
  const [modalShow, setModalShow] = useState(false);

  useEffect(async () => {
    if (modalShow) {
      await setTimeout(() => {
        setModalShow(false);
      }, 1000);
    }
  }, [modalShow]);

  useEffect(() => {
    if ((isAuthenticated, wishlist)) {
      const found = wishlist[0].find((element) => element.product_id == data.extension_attributes.id);
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
          productId: data.extension_attributes.id,
          buyRequest: {
            data: {
              productId: data.extension_attributes.id,
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
      <Link href={'/product/' + getLastSlashProduct(data.extension_attributes.url_key)}>
        <a className='img tRes_68'>
          <img
            className='lazy-hidden'
            data-lazy-type='image'
            data-lazy-src={data.extension_attributes.image == undefined ? '/images/hoasen-product.jpg' : data.extension_attributes.image}
            src='/images/no-image.svg'
            alt={data.name == undefined ? '/images/hoasen-product.jpg' : data.name}
            onError={async (e) => await checkImageExist(e)}
          />
        </a>
      </Link>
      <div className='divtext'>
        <h3 className='line-3 title'>
          <Link href={'/product/' + getLastSlashProduct(data.extension_attributes.url_key)}>
            <a>{data?.extension_attributes?.name}</a>
          </Link>
        </h3>
        <div className='ratingresult'>
          <ShowStar rating={data.extension_attributes.rating != null ? data.extension_attributes.rating : '0'} />
          <strong className='cl1 rating-point'>{data.extension_attributes.rating != null ? (data.extension_attributes.rating / 100) * process.env.MAX_NUMBER : '0'}/5</strong>
        </div>
        <div className='price'>
          <strong>{formatVND(parseInt(finalPrice))} đ</strong>
          {/* <span className="per">-30%</span> */}
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
