import React, { useEffect, useState } from "react";
import t from "../../../translation";
import CategoryProduct from "../ProductBox/CategoryProduct";
import api from "../../../services/api";
import Link from "next/link";

const paintURL = "son-va-hoa-chat-xay-dung?brand=4672";
const data = 178;

function CategoryPaintProducts({}) {
  const [products, setProducts] = useState([]);
  const [configPrice, setConfigPrice] = useState(null);

  useEffect(async () => {
    try {
      let initParams = `searchCriteria[filterGroups][0][filters][0][field]=brand&searchCriteria[filterGroups][0][filters][0][value]=4672`;
      initParams += `&searchCriteria[filterGroups][0][filters][1}][field]=p&searchCriteria[filterGroups][0][filters][1}][value]=1`;
      const result = await api.get(`service/products?${initParams}&limit=6`);
      console.log("result", result);
      if (result.status == 200) {
        setProducts(result.data.search_result.items);
        setConfigPrice(result.data.config[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <section className="r2 sec-tb mb-30 border-bottom">
      <div className=" entry-head lazy-hidden ef ef-tx-t">
        <h2 className="ht">Sản phẩm Sơn</h2>
        <Link href={`/${paintURL.replace(".html", "")}`}>
          <a href={`/${paintURL.replace(".html", "")}`} className="viewall">
            Xem tất cả danh mục sản phẩm <i className="icon-arrow-2"></i>
          </a>
        </Link>
      </div>
      <div className="row  list-item list-p-1">
        {products.length != 0 &&
          products.map((item, index) => (
            <div className="col-lg-2  col-4 " key={index}>
              <CategoryProduct data={item} configPrice={configPrice} />
            </div>
          ))}
      </div>
    </section>
  );
}

export default CategoryPaintProducts;
