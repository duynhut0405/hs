import React, { useEffect, useState } from 'react'
import ShowStar from '../../Desktop/Review/ShowStar'
import formatVND from '../../../utils/formatVND'
import Link from 'next/link'
import { useAuth } from '../../../contexts/auth'
import api from '../../../services/api'
import Modal from 'react-bootstrap/Modal'
import {useCommon} from '../../../contexts/common'
import getLastSlashProduct from '../../../utils/getLastSlashProduct'

function CategoryProductMobile({ data , configPrice}) {
  const [isInWishlist, setInWishlist] = useState(false);
  const { isAuthenticated, getWishlist, wishlist, setOpenModal } = useAuth();
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [plus, setPlus] = useState(0);
  const {locationData} = useCommon();

  useEffect(() => {
    let priceGroup = data.extension_attributes.price_group[0];
    if (locationData && priceGroup && configPrice && configPrice.iron_and_steel_shipping) {
      let cityId = locationData.city.value;
      if (!data.extension_attributes.price_group[0].shipping_index) {
        return;
      }
      let shippingPrice = configPrice.iron_and_steel_shipping.collated_fee[cityId][data.extension_attributes.price_group[0].shipping_index];
      let regionWeight = configPrice.iron_and_steel_region_flexibility.weight;
      let regionPrice = configPrice.iron_and_steel_region_flexibility.collated_fee[cityId][data.extension_attributes.price_group[0].region_index];
      setPlus((Math.ceil(shippingPrice) - Math.ceil(-(regionWeight * regionPrice)/100)*100)*1.1)
    }
  }, [locationData])

  useEffect(() => {
    if (isAuthenticated, wishlist) {
      const found = wishlist[0].find(element => element.product_id == data.id);
      if (found) {
        setInWishlist(true);
        setCurrentWishlist(found);
      } else {
        setInWishlist(false);
      }
    }
  }, [wishlist])

  const handleWishlist = async () => {
    if (isAuthenticated) {
      if (isInWishlist) {
        try {
          const result = await api.delete(`service/wishlist/delete/` + currentWishlistItem.wishlist_item_id);
          if (result.data) {
            setModalText('Đã xoá khỏi wishlist của bạn');
            setModalShow(true);
            getWishlist();
          }
        } catch (error) {
          throw error
        }
        return
      }
      try {
        const result = await api.post('service/wishlist/add', {
          productId: data.id,
          buyRequest: {
            data: {
              productId: data.id,
            }
          }
        })
        if (result.data) {
          setModalText('Đã thêm vào wishlist của bạn');
          setModalShow(true);
          getWishlist();
        }
      } catch (error) {
        throw error
      }
    } else {
      setOpenModal(true);
    }
  }

  return (
    <div className="item box-shadow">
      <Link href={'/product/' + getLastSlashProduct(data.extension_attributes.request_path)}>
        <a className="img ">

          <amp-img
            alt={data.name == undefined ? "/images/hoasen-product.jpg" : data.name}
            src={(data.media_gallery_entries.length == 0)
              ? "/images/hoasen-product.jpg" : `${(process.env.DOMAIN_PRODUCT + data.media_gallery_entries[0].file).replace("product//", "product/")}`}
            width="800"
            height="532"
            layout="responsive"
          >
          </amp-img>

        </a>
      </Link>
      <div className="divtext">
        <h3 className="line-3 title">
          <Link href={'/product/' + getLastSlashProduct(data.extension_attributes.request_path)}>
            <a>{data.name}</a>
          </Link>
        </h3>
        <div className="ratingresult">
          <ShowStar rating={data.extension_attributes.review.review_summary[0].rating_summary != null ? data.extension_attributes.review.review_summary[0].rating_summary : '0'} />
          <strong className="cl1">{data.extension_attributes.review.review_summary[0].rating_summary != null ? parseInt((data.extension_attributes.review.review_summary[0].rating_summary / 100) * process.env.MAX_NUMBER) : '0'}/5</strong>
        </div>
        <div className="price"><strong>{formatVND(data.extension_attributes.pricing.final_price+plus)} đ</strong>
        <br/>
        {
          data.price != 0 && data.price != parseInt(data.extension_attributes.pricing.final_price) && (
            <span className="price-old">{formatVND(parseInt(data.price))} đ</span>
          )
        }
        </div>
      </div>


    </div>
  )
}

export default CategoryProductMobile