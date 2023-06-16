import React, { ReactNode, useEffect, useState, useRouter } from "react";
import t from "../../../translation";
import ProductMobileClientInDetail from "../Common/ProductMobileClientInDetail";
import Link from "next/link";
import api from "../../../services/api";
import ShowStar from "../../Desktop/Review/ShowStar";
import formatVND from "../../../utils/formatVND";
import { useAuth } from "../../../contexts/auth";
import Modal from "react-bootstrap/Modal";

function ProductSlide({ data, category, configPrice }) {
  const [products, setProducts]= useState([]);

  useEffect(async () => {
    try {
      let initParams = `searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${data}`;
      initParams += `&searchCriteria[filterGroups][0][filters][1}][field]=p&searchCriteria[filterGroups][0][filters][1}][value]=1`;
      const result = await api.get(`service/products?${initParams}&limit=6`);
      if (result.status == 200) {
        setProducts(result.data.search_result.items);
      }
    } catch (error) {
    }
  },[data])

  return (
    <div className="pd-15  sec-bd-bottom">
      <h2 className="efch-1 ef-tx-t">Sản phẩm cùng danh mục</h2>
      <div className="list-scroll-150 mb-10 list-p-1">
        {products != undefined &&
          products.map((item, index) => (
            <div className={`col-6 efch-${index} ef-img-t`} key={index}>
              <ProductMobileClientInDetail data={item} configPrice={configPrice}/>
            </div>
          ))}
      </div>
      {/* <Link href={`/${category.path.replace(".html", "") : '/'}`}> */}
      <Link href={category.path ? "/" + category.path.replace(".html", "") : '/'}>
        <a className="more-sec">{t("view_more_product")}</a>
      </Link>
    </div>
  );
}

export default ProductSlide;
