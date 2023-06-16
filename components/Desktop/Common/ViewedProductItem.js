import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import ShowStar from "../Review/ShowStar";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";
import Modal from "react-bootstrap/Modal";
import formatVND from "../../../utils/formatVND";
import { useCommon } from "../../../contexts/common";
import checkImageExist from '../../../utils/checkImageExist'
import getLastSlashProduct from '../../../utils/getLastSlashProduct';

function ViewedProductItem({ item, configPrice }) {
  const { isAuthenticated, getWishlist, wishlist, setOpenModal } = useAuth();
  const [isInWishlist, setInWishlist] = useState(false);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const { locationData, currentRegion } = useCommon();
  const [plus, setPlus] = useState(0);
  const [colorPrice, setColorPrice] = useState(0);

  useEffect(() => {
    if ((isAuthenticated, wishlist)) {
      const found = wishlist[0].find((element) => element.product_id == item.id);
      if (found) {
        setInWishlist(true);
        setCurrentWishlist(found);
      } else {
        setInWishlist(false);
      }
    }
  }, [wishlist]);

  useEffect(() => {
    // if (configPrice && locationData && item.priceGroup && item.priceGroup.allow_custom_length && Object.keys(configPrice.pricing).length !== 0 && configPrice.pricing.iron_and_steel_shipping) {
    //   let cityId = locationData.city.value;
    //   if (!item.priceGroup.shipping_index) return;
    //   if (!item.priceGroup.region_index) return;
    //   let shippingPrice = configPrice.pricing.iron_and_steel_shipping.collated_fee[cityId][item.priceGroup.shipping_index];
    //   let regionWeight = configPrice.pricing.iron_and_steel_region_flexibility.weight;
    //   let regionPrice = configPrice.pricing.iron_and_steel_region_flexibility.collated_fee[cityId][item.priceGroup.region_index];
    //   let currentPrice = 0;
    //   if (currentRegion && item.color && configPrice.pricing.colour_flexibility) {
    //     if (currentRegion == 'central') return;
    //     let region = currentRegion.includes('south') ? 'south' : 'north';
    //     let colorObject = configPrice.pricing.colour_flexibility[region];
    //     currentPrice = colorObject && colorObject.color_type.includes(item.color) ? parseInt(colorObject.color_fee) : parseInt(colorObject.color_type_fee);
    //   }
    //   setPlus((Math.ceil(shippingPrice) - Math.ceil(-(regionWeight * regionPrice)/100)*100)*1.1)
    //   return;
    // }
    // if (locationData && item.priceGroup && configPrice && configPrice.pricing.tube_steel_shipping) {
    //   let cityId = locationData.city.value;
    //   if (!item.priceGroup.shipping_index) return;
    //   if (!item.priceGroup.region_index) return;
    //   let shippingPrice = configPrice.pricing.tube_steel_shipping.collated_fee[cityId][item.priceGroup.shipping_index];
    //   let regionPrice = configPrice.pricing.tube_steel_region_flexibility.collated_fee[cityId][item.priceGroup.region_index];
    //   let res = parseInt(shippingPrice) * 1.1 + parseInt(regionPrice) * 1.1;
    //   setPlus(res);
    // }
  }, [configPrice, locationData, currentRegion]);

  const handleWishlist = async () => {
    if (isAuthenticated) {
      if (isInWishlist) {
        try {
          const result = await api.delete(`service/wishlist/delete/` + currentWishlistItem.wishlist_item_id);
          if (result.data) {
            setModalText("Đã xoá khỏi sản phẩm yêu thích của bạn");
            setModalShow(true);
            getWishlist();
          }
        } catch (error) {
          throw error;
        }
        return;
      }
      try {
        const result = await api.post("service/wishlist/add", {
          productId: item.id,
          buyRequest: {
            data: {
              productId: item.id,
            },
          },
        });
        if (result.data) {
          setModalText("Đã thêm vào sản phẩm yêu thích của bạn");
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
    <>
      <div className="item   box-shadow">
        <Link href={"/product/" + getLastSlashProduct(item.url)} prefetch={false}>
          <a href={"/product/" + getLastSlashProduct(item.url)} className="img tRes_68">
            <img src={item.image != null ? (process.env.DOMAIN_PRODUCT + item.image).replace("product//", "product/") : "/images/hoasen-product.jpg"} alt={item.url} onError={async (e) => await checkImageExist(e)} />
          </a>
        </Link>
        <div className="divtext ">
          <h3 className="line-3 title">
            <Link href={"/product/" + getLastSlashProduct(item.url)} prefetch={false}>
              <a href={"/product/" + getLastSlashProduct(item.url)}>{item.name}</a>
            </Link>
          </h3>
        </div>
        <div className="divtext bottom">
          <div className="ratingresult">
            <ShowStar rating={item.review != null ? item.review : 0} />
            {/* <strong className="cl1">{(item.review / 100) * 5}/5</strong> */}
            <strong className="cl1 rating-point">{(item.review / 20).toFixed(1) === '5.0' ? 5 : (item.review / 20).toFixed(1) === '0.0' ? 0 : (item.review / 20).toFixed(1)}/5</strong>
          </div>
          <div className="price">
            <strong className="red">
              {formatVND(item.final_price)} {item.priceGroup.price_unit_text}
            </strong>

            {item.regular_price !== 0 && item.regular_price != item.final_price && Math.round(((item.final_price - item.regular_price) / item.regular_price) * 100) < 0 && (
              <span className="per red fs15"> {Math.round(((item.final_price - item.regular_price) / item.regular_price) * 100)}%</span>
            )}
            <br />
            {item.regular_price !== 0 && item.regular_price != item.final_price && Math.round(((item.final_price - item.regular_price) / item.regular_price) * 100) < 0 && (
              <span className="price-old">
                {formatVND(item.regular_price)} {item.priceGroup.price_unit_text}
              </span>
            )}
          </div>

          <span className={`btnlike ${isInWishlist ? "active" : ""}`} onClick={() => handleWishlist()}>
            {" "}
            <i className="icon-like"></i>{" "}
          </span>
        </div>
      </div>
      <Modal size="sm" show={modalShow} onHide={() => setModalShow(false)}>
        <div className="pd-20">{modalText}</div>
      </Modal>
    </>
  );
}

export default ViewedProductItem;
