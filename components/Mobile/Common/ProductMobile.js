import React, { useEffect, useState } from 'react';
import ShowStar from '../../Desktop/Review/ShowStar';
import formatVND from '../../../utils/formatVND';
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import { useCommon } from '../../../contexts/common';
import checkImageExist from '../../../utils/checkImageExist';
import getLastSlashProduct from '../../../utils/getLastSlashProduct';

function ProductMobile({ data, dataIndex, config }) {
  const { user, isAuthenticated, getWishlist, wishlist, setOpenModal } = useAuth();
  const [isInWishlist, setInWishlist] = useState(false);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const { locationData, currentRegion } = useCommon();
  const [plus, setPlus] = useState(0);
  const [unit, setUnit] = useState('đ');
  const [finalPrice, setFinalPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    let group = data.price_group.group;
    // if (locationData && currentRegion) {
    //   normalPrice();
    // }
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

  const steelPipe = async () => {
    if (!data.price_group && !data.price_group.exchange_rate) {
      console.log('Không có data.price_group.exchange_rate');
      return;
    }

    if (!locationData) {
      console.log('Không có locationData');
      return;
    }

    let regionPrice = 0;
    let shippingPrice = 0;
    let cityId = locationData.city.value;

    if (config && cityId && config.pricing.tube_steel_region_flexibility.collated_fee && data.price_group.region_index) {
      regionPrice = config.pricing.tube_steel_region_flexibility.collated_fee[cityId][data.price_group.region_index];
    }

    // if (config && cityId && (config.pricing.tube_steel_shipping.collated_fee || config.pricing.tube_steel_shipping.collated_fee.length > 0) && data.price_group.shipping_index) {
    //   shippingPrice = config.pricing.tube_steel_shipping.collated_fee[cityId][data.price_group.shipping_index];
    // }

    let plusPrice = (parseInt(regionPrice) + parseInt(shippingPrice)) * 1.1;
    let price = parseFloat(data.final_price) + parseFloat(plusPrice) * parseFloat(data.price_group.exchange_rate);
    let regularPrice = parseFloat(data.regular_price) + parseFloat(plusPrice) * parseFloat(data.price_group.exchange_rate);
    setFinalPrice(parseInt(Math.ceil(price)));
    setBasePrice(parseInt(Math.ceil(regularPrice)));
  };

  const thickGalvanizedSteel = async () => {
    if (!data.price_group && !data.price_group.exchange_rate) {
      console.log('Không có data.price_group.exchange_rate');
      return;
    }
    if (!locationData) {
      console.log('Không có locationData');
      return;
    }

    let regionPrice = 0;
    let shippingPrice = 0;
    let cityId = locationData.city.value;

    // if (config && cityId && (config.pricing.iron_and_steel_region_flexibility.collated_fee || config.pricing.iron_and_steel_region_flexibility.collated_fee.length > 0) && data.price_group.region_index) {
    //   regionPrice = config.pricing.iron_and_steel_region_flexibility.collated_fee[cityId][data.price_group.region_index];
    // }

    // if (config && cityId && (config.pricing.iron_and_steel_shipping.collated_fee || config.pricing.iron_and_steel_shipping.collated_fee.length > 0) && data.price_group.shipping_index) {
    //   shippingPrice = config.pricing.iron_and_steel_shipping.collated_fee[cityId][data.price_group.shipping_index];
    // }

    let plusPrice = (parseInt(regionPrice) + parseInt(shippingPrice)) * 1.1;
    let price = parseFloat(data.final_price) + parseFloat(plusPrice) * parseFloat(data.price_group.exchange_rate);
    let regularPrice = parseFloat(data.regular_price) + parseFloat(plusPrice) * parseFloat(data.price_group.exchange_rate);
    setFinalPrice(parseInt(Math.ceil(price)));
    setBasePrice(parseInt(Math.ceil(regularPrice)));
  };

  const coldCorrugatedIron = async () => {
    if (!data.price_group && !data.price_group.exchange_rate) {
      console.log('Không có data.price_group.exchange_rate');
      return;
    }
    if (!locationData) {
      console.log('Không có locationData');
      return;
    }

    let roundFlex = 0;
    let shippingPrice = 0;
    let cityId = locationData.city.value;

    // if (config && cityId && data.price_group && data.price_group.region_index && (config.pricing.iron_and_steel_region_flexibility.collated_fee || config.pricing.iron_and_steel_region_flexibility.collated_fee.length > 0)) {
    //   let regionPrice = config.pricing.iron_and_steel_region_flexibility.collated_fee[cityId][data.price_group.region_index];
    //   let regionWeight = config.pricing.iron_and_steel_region_flexibility.weight;
    //   roundFlex = Math.round((Math.ceil(parseInt(regionPrice)) * Math.ceil(parseFloat(regionWeight))) / 100) * 100;
    // }

    // if (config && cityId && data.price_group && data.price_group.region_index && (config.pricing.iron_and_steel_shipping.collated_fee || config.pricing.iron_and_steel_shipping.collated_fee.length > 0)) {
    //   shippingPrice = config.pricing.iron_and_steel_shipping.collated_fee[cityId][data.price_group.shipping_index];
    // }

    let plusPrice = (roundFlex + parseInt(shippingPrice)) * 1.1;
    let price = parseFloat(data.final_price) + parseFloat(plusPrice) * parseFloat(data.price_group.exchange_rate);
    let regularPrice = parseFloat(data.regular_price) + parseFloat(plusPrice) * parseFloat(data.price_group.exchange_rate);
    setFinalPrice(parseInt(Math.ceil(price)));
    setBasePrice(parseInt(Math.ceil(regularPrice)));
  };

  const coldCorrugatedIronWithColor = async () => {
    if (!data.price_group && !data.price_group.exchange_rate) {
      console.log('Không có data.price_group.exchange_rate');
      return;
    }
    if (!locationData) {
      console.log('Không có locationData');
      return;
    }

    let roundFlex = 0;
    let shippingPrice = 0;
    let cityId = locationData.city.value;

    let colorPrice = 0;
    if (currentRegion && config.pricing.colour_flexibility) {
      if (currentRegion == 'central') return;
      let region = currentRegion.includes('south') ? 'south' : 'north';
      let colorObject = config.pricing.colour_flexibility[region];
      colorPrice = colorObject && colorObject.color_type.includes(data.main_color_code) ? parseInt(colorObject.color_type_fee) : 0;
      if (colorPrice == 0) {
        colorPrice = colorObject && colorObject.color.includes(data.main_color_code) ? parseInt(colorObject.color_fee) : 0;
      }
    }

    // if (config && cityId && data.price_group.region_index && (config.pricing.iron_and_steel_region_flexibility.collated_fee || config.pricing.iron_and_steel_region_flexibility.collated_fee.length > 0)) {
    //   let regionPrice = config.pricing.iron_and_steel_region_flexibility.collated_fee[cityId][data.price_group.region_index];
    //   let regionWeight = config.pricing.iron_and_steel_region_flexibility.weight;
    //   roundFlex = Math.round((parseInt(regionPrice) * parseFloat(regionWeight)) / 100) * 100;
    // }

    // if (config && cityId && data.price_group.shipping_index && (config.pricing.iron_and_steel_shipping.collated_fee || config.pricing.iron_and_steel_shipping.collated_fee.length > 0)) {
    //   shippingPrice = config.pricing.iron_and_steel_shipping.collated_fee[cityId][data.price_group.shipping_index];
    // }

    let plusPrice = (roundFlex + parseInt(shippingPrice) - colorPrice) * 1.1;
    let price = parseFloat(data.final_price) + parseFloat(plusPrice) * parseFloat(data.price_group.exchange_rate);
    let regularPrice = parseFloat(data.regular_price) + parseFloat(plusPrice) * parseFloat(data.price_group.exchange_rate);
    setFinalPrice(parseInt(Math.ceil(price)));
    setBasePrice(parseInt(Math.ceil(regularPrice)));
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

  useEffect(async () => {
    if (modalShow) {
      await setTimeout(() => {
        setModalShow(false);
      }, 1000);
    }
  }, [modalShow]);

  return (
    <div className='item box-shadow'>
      <Link href={`/product/${getLastSlashProduct(data.request_path)}`}>
        <a className='img tRes_68'>
          <img
            className='lazy-hidden'
            data-lazy-type='image'
            data-lazy-src={data.image == undefined ? process.env.EMPTY_IMG : data.image}
            src='/images/no-image.svg'
            alt={data.name == undefined ? process.env.EMPTY_IMG : data.name}
            key={dataIndex}
            onError={async (e) => await checkImageExist(e)}
          />
        </a>
      </Link>
      <div className='divtext '>
        <h3 className='line-3 title'>
          <Link href={`/product/${getLastSlashProduct(data.request_path)}`}>
            <a>{data.name}</a>
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
          {basePrice !== 0 && basePrice != finalPrice && Math.round(((finalPrice - basePrice) / basePrice) * 100) < 0 && <span className='per fs15 red'> {Math.round(((finalPrice - basePrice) / basePrice) * 100)}%</span>}
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

export default ProductMobile;
