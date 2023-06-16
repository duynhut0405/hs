import React, {useEffect, useState} from 'react'
import t from '../../../translation'
import CategoryProduct from '../ProductBox/CategoryProduct'
import api from '../../../services/api'
import Link from 'next/link'

const paintURL = "ton-hoa-sen";
const data = 178;

function CategoryTonProducts({}) {
  const [products, setProducts] = useState([]);
  const [configPrice, setConfigPrice] = useState(null);

  useEffect(async () => {
    try {
      const result1 = await api.get(`/service/rewrite/entity/${paintURL}`);
      console.log("result1", result1);
      if (result1.data.category) {
        let initParams = `searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${result1.data.category.id}`;
        initParams += `&searchCriteria[filterGroups][0][filters][1}][field]=p&searchCriteria[filterGroups][0][filters][1}][value]=1`;
        const result = await api.get(`service/products?${initParams}&limit=6`);
        if (result.status == 200) {
          setProducts(result.data.search_result.items);
          setConfigPrice(result.data.config[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <section className="r2 sec-tb mb-30 border-bottom">
      <div className=" entry-head lazy-hidden ef ef-tx-t">
        <h2 className="ht">Sản phẩm Tôn</h2>
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

export default CategoryTonProducts