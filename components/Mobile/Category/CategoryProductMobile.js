import React, { useEffect, useState } from "react";
import ShowStar from "../../Desktop/Review/ShowStar";
import formatVND from "../../../utils/formatVND";
import Link from "next/link";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";
import Modal from "react-bootstrap/Modal";
import { useCommon } from "../../../contexts/common";
import checkImageExist from '../../../utils/checkImageExist'
import getLastSlashProduct from "../../../utils/getLastSlashProduct";

function CategoryProductMobile({ data, configPrice }) {
  const [isInWishlist, setInWishlist] = useState(false);
  const { isAuthenticated, getWishlist, wishlist, setOpenModal } = useAuth();
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [plus, setPlus] = useState(0);
  const { locationData, currentRegion } = useCommon();
  // const [color, setColor] = useState(null);
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
    // let group = data.extension_attributes.price_group[0].group;
    // if (locationData && currentRegion) {
    //   if (group == "Tôn lạnh") {
    //     coldCorrugatedIron();
    //   } else if (group == "Tôn lạnh màu") {
    //     coldCorrugatedIronWithColor();
    //   } else if (group == "Thép dày mạ kẽm") {
    //     thickGalvanizedSteel();
    //   } else if (group == "Ống thép mạ kẽm" || group == "Ống thép đen" || group == "Ống thép nhúng nóng") {
    //     steelPipe();
    //   } else {
    //     normalPrice();
    //   }
    // } else if (!(locationData && locationData.city && locationData.city.value != "")) {
    //   normalPrice();
    // }
    normalPrice();
  }, [locationData, currentRegion, data, configPrice]);

  const normalPrice = async () => {
    if (!data.extension_attributes.price_group[0] && !data.extension_attributes.price_group[0].exchange_rate) {
      console.log("Không có data.extension_attributes.price_group[0].exchange_rate");
      return;
    }

    let plus = 0;
    if (data.region_data && currentRegion && currentRegion.includes(data.region_data[0].region)) {
      let price = parseFloat(data.region_data[0].price) + plus * parsePrice(data.price_group.exchange_rate);
      setFinalPrice(parseInt(Math.ceil(price)));
      setBasePrice(parseInt(Math.ceil(price)));
      return;
    } else {
      let price = parseFloat(data.extension_attributes.pricing.final_price) + plus * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
      let regularPrice = parseFloat(data.extension_attributes.pricing.regular_price) + plus * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
      setFinalPrice(parseInt(Math.ceil(price)));
      setBasePrice(parseInt(Math.ceil(regularPrice)));
    }
  };

  const steelPipe = async () => {
    if (!data.extension_attributes.price_group[0] && !data.extension_attributes.price_group[0].exchange_rate) {
      console.log("Không có data.extension_attributes.price_group[0].exchange_rate");
      return;
    }

    if (!locationData) {
      console.log("Không có locationData");
      return;
    }

    let regionPrice = 0;
    let shippingPrice = 0;
    let priceGroup = data.extension_attributes.price_group[0];
    let cityId = locationData.city.value;

    if (configPrice && configPrice.tube_steel_region_flexibility.collated_fee && priceGroup && priceGroup.region_index && cityId) {
      regionPrice = configPrice.tube_steel_region_flexibility.collated_fee[cityId][data.extension_attributes.price_group[0].region_index];
    }

    // if (configPrice && (configPrice.tube_steel_shipping.collated_fee || configPrice.tube_steel_shipping.collated_fee.length > 0) && priceGroup && priceGroup.shipping_index && cityId) {
    //   shippingPrice = configPrice.tube_steel_shipping.collated_fee[cityId][data.extension_attributes.price_group[0].shipping_index];
    // }

    let plusPrice = (parseInt(regionPrice) + parseInt(shippingPrice)) * 1.1;
    let price = parseFloat(data.extension_attributes.pricing.final_price) + parseFloat(plusPrice) * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
    let regularPrice = parseFloat(data.extension_attributes.pricing.regular_price) + parseFloat(plusPrice) * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
    setFinalPrice(parseInt(Math.ceil(price)));
    setBasePrice(parseInt(Math.ceil(regularPrice)));
  };

  const thickGalvanizedSteel = async () => {
    if (!data.extension_attributes.price_group[0] && !data.extension_attributes.price_group[0].exchange_rate) {
      console.log("Không có data.extension_attributes.price_group[0].exchange_rate");
      return;
    }
    if (!locationData) {
      console.log("Không có locationData");
      return;
    }

    let regionPrice = 0;
    let shippingPrice = 0;
    let priceGroup = data.extension_attributes.price_group[0];
    let cityId = locationData.city.value;

    // if (configPrice && (configPrice.iron_and_steel_region_flexibility.collated_fee || configPrice.iron_and_steel_region_flexibility.collated_fee.length > 0) && priceGroup && priceGroup.region_index && cityId) {
    //   regionPrice = configPrice.iron_and_steel_region_flexibility.collated_fee[cityId][data.extension_attributes.price_group[0].region_index];
    // }

    // if (configPrice && (configPrice.iron_and_steel_shipping.collated_fee || configPrice.iron_and_steel_shipping.collated_fee.length > 0) && priceGroup && priceGroup.shipping_index && cityId) {
    //   shippingPrice = configPrice.iron_and_steel_shipping.collated_fee[cityId][data.extension_attributes.price_group[0].shipping_index];
    // }

    let plusPrice = (parseInt(regionPrice) + parseInt(shippingPrice)) * 1.1;

    let price = parseFloat(data.extension_attributes.pricing.final_price) + parseFloat(plusPrice) * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
    let regularPrice = parseFloat(data.extension_attributes.pricing.regular_price) + parseFloat(plusPrice) * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
    setFinalPrice(parseInt(Math.ceil(price)));
    setBasePrice(parseInt(Math.ceil(regularPrice)));
  };

  const coldCorrugatedIron = async () => {
    if (!data.extension_attributes.price_group[0] && !data.extension_attributes.price_group[0].exchange_rate) {
      console.log("Không có data.extension_attributes.price_group[0].exchange_rate");
      return;
    }
    if (!locationData) {
      console.log("Không có locationData");
      return;
    }

    let roundFlex = 0;
    let shippingPrice = 0;
    let priceGroup = data.extension_attributes.price_group[0];
    let cityId = locationData.city.value;

    // console.log(configPrice.iron_and_steel_region_flexibility.collated_fee.length);

    // if (configPrice && (configPrice.iron_and_steel_region_flexibility.collated_fee || configPrice.iron_and_steel_region_flexibility.collated_fee.length > 0) && priceGroup && priceGroup.region_index && cityId) {
    //   let regionPrice = configPrice.iron_and_steel_region_flexibility.collated_fee[cityId][data.extension_attributes.price_group[0].region_index];
    //   let regionWeight = configPrice.iron_and_steel_region_flexibility.weight;
    //   roundFlex = Math.round((Math.ceil(parseInt(regionPrice)) * Math.ceil(parseFloat(regionWeight))) / 100) * 100;
    // }

    // if (configPrice && (configPrice.iron_and_steel_shipping.collated_fee || configPrice.iron_and_steel_shipping.collated_fee.length > 0) && priceGroup && priceGroup.shipping_index && cityId) {
    //   shippingPrice = configPrice.iron_and_steel_shipping.collated_fee[cityId][data.extension_attributes.price_group[0].shipping_index];
    // }

    let plusPrice = (roundFlex + parseInt(shippingPrice)) * 1.1;
    let price = parseFloat(data.extension_attributes.pricing.final_price) + parseFloat(plusPrice) * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
    let regularPrice = parseFloat(data.extension_attributes.pricing.regular_price) + parseFloat(plusPrice) * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
    setFinalPrice(parseInt(Math.ceil(price)));
    setBasePrice(parseInt(Math.ceil(regularPrice)));
  };

  const coldCorrugatedIronWithColor = async () => {
    if (!data.extension_attributes.price_group[0] && !data.extension_attributes.price_group[0].exchange_rate) {
      console.log("Không có data.extension_attributes.price_group[0].exchange_rate");
      return;
    }
    if (!locationData) {
      console.log("Không có locationData");
      return;
    }

    let roundFlex = 0;
    let shippingPrice = 0;
    let priceGroup = data.extension_attributes.price_group[0];
    let cityId = locationData.city.value;

    // if (configPrice && (configPrice.iron_and_steel_region_flexibility.collated_fee || configPrice.iron_and_steel_region_flexibility.collated_fee.length > 0) && priceGroup && priceGroup.region_index && cityId) {
    //   let regionPrice = configPrice.iron_and_steel_region_flexibility.collated_fee[cityId][data.extension_attributes.price_group[0].region_index];
    //   let regionWeight = configPrice.iron_and_steel_region_flexibility.weight;
    //   roundFlex = Math.round((parseInt(regionPrice) * parseFloat(regionWeight)) / 100) * 100;
    // }

    // if (configPrice && (configPrice.iron_and_steel_shipping.collated_fee || configPrice.iron_and_steel_shipping.collated_fee.length > 0) && priceGroup && priceGroup.shipping_index && cityId) {
    //   shippingPrice = configPrice.iron_and_steel_shipping.collated_fee[cityId][data.extension_attributes.price_group[0].shipping_index];
    // }

    let main_color = data.custom_attributes.find((element) => element.attribute_code && element.attribute_code == "main_color_code");
    let colorPrice = 0;
    if (currentRegion && configPrice.colour_flexibility && main_color.value) {
      if (currentRegion == "central") return;
      let region = currentRegion.includes("south") ? "south" : "north";
      let colorObject = configPrice.colour_flexibility[region];
      colorPrice = colorObject && colorObject.color_type.includes(main_color.value) ? parseInt(colorObject.color_type_fee) : 0;
      if (colorPrice == 0) {
        colorPrice = colorObject && colorObject.color.includes(main_color.value) ? parseInt(colorObject.color_fee) : 0;
      }
    }

    let plusPrice = (roundFlex + parseInt(shippingPrice) - colorPrice) * 1.1;
    let price = parseFloat(data.extension_attributes.pricing.final_price) + parseFloat(plusPrice) * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
    let regularPrice = parseFloat(data.extension_attributes.pricing.regular_price) + parseFloat(plusPrice) * parseFloat(data.extension_attributes.price_group[0].exchange_rate);
    setFinalPrice(parseInt(Math.ceil(price)));
    setBasePrice(parseInt(Math.ceil(regularPrice)));
  };

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
          productId: data.id,
          buyRequest: {
            data: {
              productId: data.id,
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

  const getURL = () => {
    if (data) {
      if (data.extension_attributes.request_path) {
        return "/product/" + getLastSlashProduct(data.extension_attributes.request_path);
      }

      const product = data.custom_attributes.find((item) => {
        if (item.attribute_code === "url_key") return item;
      });

      if (product) {
        return "/product/" + product.value;
      } else {
        return "#";
      }
    } else {
      return "#";
    }
  };


  return (
    <div className="item box-shadow">
      <Link href={getURL()}>
        <a href={getURL()} className="img tRes_68">
          <img
            className="lazy-hidden"
            key={data.id}
            data-lazy-type="image"
            data-lazy-src={data.media_gallery_entries.length == 0 ? "/images/hoasen-product.jpg" : `${(process.env.DOMAIN_PRODUCT + data.media_gallery_entries[0].file).replace("product//", "product/")}`}
            src="/images/no-image.svg"
            alt={data.name == undefined ? "/images/hoasen-product.jpg" : data.name}
            onError={async (e) => await checkImageExist(e)}
          />
        </a>
      </Link>
      <div className="divtext">
        <h3 className="line-3 title">
          <Link href={getURL()}>
            <a href={getURL()}>{data.name}</a>
          </Link>
        </h3>
        <div className="ratingresult">
          <ShowStar rating={data.extension_attributes.review.review_summary[0].rating_summary != null ? data.extension_attributes.review.review_summary[0].rating_summary : "0"} />
          <strong className="cl1 rating-point">{data.extension_attributes.review.review_summary[0].rating_summary != null ? parseInt((data.extension_attributes.review.review_summary[0].rating_summary / 100) * process.env.MAX_NUMBER) : "0"}/5</strong>
        </div>
        <div className="price">
          <strong className="red">
            {formatVND(finalPrice)} {data.extension_attributes.price_group[0].price_unit_text ? data.extension_attributes.price_group[0].price_unit_text : "đ"}
          </strong>
          {basePrice !== 0 && basePrice != finalPrice && Math.round(((finalPrice - basePrice) / basePrice) * 100) < 0 && <span className="per fs15 red"> {Math.round(((finalPrice - basePrice) / basePrice) * 100)}%</span>}
          <br />
          {basePrice !== 0 && basePrice != finalPrice && Math.round(((finalPrice - basePrice) / basePrice) * 100) < 0 && (
            <span className="price-old">
              {formatVND(basePrice)} {data.price_group && data.price_group.price_unit_text ? data.price_group.price_unit_text : "đ"}
            </span>
          )}
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

export default CategoryProductMobile;
