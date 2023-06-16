import React, { useEffect, useState } from 'react'
import ShowStar from '../../Desktop/Review/ShowStar'
import formatVND from '../../../utils/formatVND'
import Modal from 'react-bootstrap/Modal'
import Link from 'next/link'
import { useAuth } from '../../../contexts/auth'
import api from '../../../services/api'
import { useCommon } from '../../../contexts/common'
import checkImageExist from '../../../utils/checkImageExist'
import getLastSlashProduct from '../../../utils/getLastSlashProduct'

function ProductMobileClientInDetail({ data, configPrice }) {
  const { isAuthenticated, wishlist, getWishlist, setOpenModal } = useAuth();
  const [isInWishlist, setInWishlist] = useState(false);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [imageRef, setImageRef] = useState(React.useRef(null));
  const [currentSrc, setCurrentSrc] = useState('/images/no-image.svg');
  const { locationData, currentRegion } = useCommon();
  const [plus, setPlus] = useState(0);
  const [color, setColor] = useState(null);
  const [finalPrice, SetFinalPrice] = useState(data.extension_attributes.pricing.final_price);

  useEffect(() => {
    if (data.custom_attributes) {
      let res2 = data.custom_attributes.find(element => (element.attribute_code && element.attribute_code == "code_main_color"));
      if (res2) setColor(res2.value);
    }
  }, [data.custom_attributes])


  useEffect(() => {
    if (data.media_gallery_entries[0] && data.media_gallery_entries[0].file) {
      setCurrentSrc((process.env.DOMAIN_PRODUCT + data.media_gallery_entries[0].file).replace('product//','product/'));
    } else {
      setCurrentSrc('/images/hoasen-product.jpg')
    }
  }, [data.media_gallery_entries])

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
            setModalText('Đã xoá khỏi sản phẩm yêu thích của bạn');
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
          setModalText('Đã thêm vào sản phẩm yêu thích của bạn');
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

  useEffect(async () => {
    if (modalShow) {
      await setTimeout(()=>{
        setModalShow(false)
      },1000)
    }
  }, [modalShow])

  return (
    <div className="item box-shadow">
      <Link href={"/product/" + getLastSlashProduct(data.extension_attributes.request_path)}>
        <a className="img tRes_68">
          <img
            ref={imageRef}
            className="lazy-hidden"
            key={data.id}
            data-lazy-type="image"
            data-lazy-src={data.media_gallery_entries.length == 0 ? "/images/hoasen-product.jpg" : `${(process.env.DOMAIN_PRODUCT + data.media_gallery_entries[0].file).replace("product//", "product/")}`}
            src={currentSrc}
            alt={data.name == undefined ? "/images/hoasen-product.jpg" : data.name}
            onError={async (e) => await checkImageExist(e)}
          />
        </a>
      </Link>
      <div className="divtext">
        <h3 className="line-3 title">
          <Link href={"/product/" + getLastSlashProduct(data.extension_attributes.request_path)}>
            <a>{data.name}</a>
          </Link>
        </h3>
        <div className="ratingresult">
          <ShowStar rating={data.extension_attributes.review.review_summary[0].rating_summary != null ? data.extension_attributes.review.review_summary[0].rating_summary : "0"} />
          <strong className="cl1 rating-point">{data.extension_attributes.review.review_summary[0].rating_summary != null ? parseInt((data.extension_attributes.review.review_summary[0].rating_summary / 100) * process.env.MAX_NUMBER) : "0"}/5</strong>
        </div>
        <div className="price">
          <strong className="red">
            {formatVND(data.extension_attributes.pricing.final_price + plus)} {data.extension_attributes.price_group[0].price_unit_text ? data.extension_attributes.price_group[0].price_unit_text : "đ"}
          </strong>
          {data.price != 0 && data.price != parseInt(data.extension_attributes.pricing.final_price) && <span className="per fs15 red"> -{100 - Math.ceil((data.extension_attributes.pricing.final_price / data.price) * 100)}%</span>}
          {data.price == 0 && data.extension_attributes.pricing.final_price != data.extension_attributes.pricing.regular_price && (
            <span className="per fs15 red"> {100 - Math.ceil((data.extension_attributes.pricing.regular_price / data.extension_attributes.pricing.final_price) * 100)}%</span>
          )}
          <br />
          {data.price != 0 && data.price != parseInt(data.extension_attributes.pricing.final_price) && <span className="price-old">{formatVND(parseInt(data.price))} đ</span>}
          {data.price == 0 && data.extension_attributes.pricing.final_price != data.extension_attributes.pricing.regular_price && <span className="price-old">{formatVND(parseInt(data.extension_attributes.pricing.regular_price))} đ</span>}
        </div>
        <span className={`btnlike ${isInWishlist ? "active" : ""}`} onClick={() => handleWishlist()}>
          {" "}
          <i className="icon-like"></i>{" "}
        </span>
      </div>
      <Modal size="sm" show={modalShow} onHide={() => setModalShow(false)}>
        <div className="pd-20">{modalText}</div>
      </Modal>
    </div>
  );
}

export default ProductMobileClientInDetail