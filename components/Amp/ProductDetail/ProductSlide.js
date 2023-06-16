import React, { ReactNode, useEffect, useState, useRouter } from "react";
import t from "../../../translation";
import ProductMobileClient from "../Common/ProductMobileClient";
import Link from "next/link";
import api from "../../../services/api";
import ShowStar from "../../Desktop/Review/ShowStar";
import formatVND from "../../../utils/formatVND";
import { useAuth } from "../../../contexts/auth";
import Modal from "react-bootstrap/Modal";

function ProductSlide({ data, category, configPrice }) {
  const [products, setProducts] = useState([]);
  const { user, isAuthenticated, getWishlist, wishlist, setOpenModal } = useAuth();
  const [isInWishlist, setInWishlist] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);

  useEffect(() => {
    if ((isAuthenticated, wishlist)) {
      const found = wishlist[0].find((element) => element.product_id == products.id);
      if (found) {
        setInWishlist(true);
        setCurrentWishlist(found);
      } else {
        setInWishlist(false);
      }
    }
  }, [wishlist, products]);

  useEffect(async () => {
    try {
      let initParams = `searchCriteria[filterGroups][0][filters][1}][field]=p&searchCriteria[filterGroups][0][filters][1}][value]=1`;
      initParams += `&searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${data}`;

      var query = `service/products?${initParams}&limit=20`;
      const result = await api.get(query);
      if (result.status == 200) {
        var items = result.data.search_result.items;
        var products_list = [];
        items.forEach((element) => {
          var file = "";
          var rating = 0;
          if (element.media_gallery_entries.length !== 0) {
            file = element.media_gallery_entries[0].file;
          }

          if (element.extension_attributes.review.review_summary.length !== 0) {
            rating = element.extension_attributes.review.review_summary[0].rating_summary;
          }
          products_list.push({
            id: element.id,
            request_path: element.extension_attributes.request_path,
            image: file,
            name: element.name,
            rating_summary: rating,
            final_price: element.extension_attributes.pricing.final_price,
          });
        });
      }

      setProducts(products_list);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="pd-15  sec-bd-bottom">
      <h2 className="efch-1 ef-tx-t">Sản phẩm cùng danh mục</h2>
      <div className="list-scroll-150 mb-10 list-p-1">
        {products != undefined &&
          products.map((item, index) => (
            <div className={`col-6 efch-${index} ef-img-t`} key={index}>
              <ProductMobileClient data={item} dataIndex={index} />
              {/* <div className="item box-shadow">
                <Link href={`/product/${item.request_path}`}>
                  <a className="img tRes_68">
                    <img
                      className="lazy-hidden"
                      data-lazy-type="image"
                      data-lazy-src={item.image == undefined ? process.env.EMPTY_IMG : process.env.DOMAIN_PRODUCT + item.image}
                      src="/images/no-image.svg"
                      alt={data.name == undefined ? " no image" : data.name}
                      key={index}
                    />
                  </a>
                </Link>
                <div className="divtext">
                  <h3 className="line-3 title">
                    <Link href={`/product/${item.request_path}`}>
                      <a>{item.name}</a>
                    </Link>
                  </h3>
                  <div className="ratingresult">
                    <ShowStar rating={item.rating_summary != null ? item.rating_summary : "0"} />
                    <strong className="cl1">{item.rating_summary != null ? (item.rating_summary / 100) * process.env.MAX_NUMBER : "0"}/5</strong>
                  </div>
                  <div className="price">
                    <strong>{formatVND(parseInt(item.final_price))} đ</strong>
                  </div>
                  <span className={`btnlike ${isInWishlist ? "active" : ""}`} onClick={() => handleWishlist(item)}>
                    {" "}
                    <i className="icon-like"></i>{" "}
                  </span>
                </div>
              </div> */}
            </div>
          ))}
      </div>
      <Link href={category.path ? "/" + category.path.replace(".html", "") : "/"}>
        <a className="more-sec">{t("view_more_product")}</a>
      </Link>

      <Modal size="sm" show={modalShow} onHide={() => setModalShow(false)}>
        <div className="pd-20">{modalText}</div>
      </Modal>
    </div>
  );
}

export default ProductSlide;
