import React, { useEffect, useState } from "react";
import ShowStar from "../Review/ShowStar";
import formatVND from "../../../utils/formatVND";
import Link from "next/link";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";
import Modal from "react-bootstrap/Modal";
import { useCommon } from "../../../contexts/common";
import checkImageExist from "../../../utils/checkImageExist"
import getLastSlashProduct from "../../../utils/getLastSlashProduct";
import { getURL } from "next/dist/next-server/lib/utils";

function CategoryProduct({ data, configPrice }) {
  const { isAuthenticated, wishlist, getWishlist, setOpenModal } = useAuth();
  const [isInWishlist, setInWishlist] = useState(false);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [imageRef, setImageRef] = useState(React.useRef(null));
  const [currentSrc, setCurrentSrc] = useState("/images/no-image.svg");
  const { locationData, currentRegion } = useCommon();
  const [plus, setPlus] = useState(0);
  const [color, setColor] = useState(null);
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

  useEffect(() => {
    if (data?.media_gallery_entries[0]?.file) {
      let src = (process.env.DOMAIN_PRODUCT + data.media_gallery_entries[0].file).replace("product//", "product/");
      setCurrentSrc(src);
    } else {
      setCurrentSrc("/images/hoasen-product.jpg");
    }
  }, [data?.media_gallery_entries]);

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
    data && (
      <div className="item box-shadow">
        <Link href={getURL()} prefetch={false}>
          <a href={getURL()} className="img tRes_68">
            <img
              ref={imageRef}
              className="lazy-hidden"
              key={data.id}
              data-lazy-type="image"
              data-lazy-src={data.media_gallery_entries.length == 0 ? "/images/hoasen-product.jpg" : `${currentSrc}`}
              src={currentSrc}
              alt={data.name == undefined ? "/images/hoasen-product.jpg" : data.name}
              onError={async (e) => await checkImageExist(e)}
            />
          </a>
        </Link>
        <div className="divtext">
          <h3 className="line-3 title">
            <Link href={getURL()} prefetch={false}>
              <a href={getURL()}>{data.name}</a>
            </Link>
          </h3>
        </div>
        <div className="divtext bottom">
          <div className="ratingresult">
            <ShowStar rating={data.extension_attributes.review.review_summary[0].rating_summary != null ? data.extension_attributes.review.review_summary[0].rating_summary : "0"} />
            <strong className="cl1 rating-point">
              {data.extension_attributes.review.review_summary[0].rating_summary != null ? parseInt((data.extension_attributes.review.review_summary[0].rating_summary / 100) * process.env.MAX_NUMBER) : "0"}/5
            </strong>
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
    )
  );
}

export default CategoryProduct;
