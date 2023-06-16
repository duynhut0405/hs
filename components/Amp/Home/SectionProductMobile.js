import React, { ReactNode, useEffect, useState, useRouter } from 'react'
import t from '../../../translation'
import ProductMobile from '../Common/ProductMobile'
import ProductMobileClient from '../Common/ProductMobileClient'
import Link from 'next/link'
import api from '../../../services/api'

function SectionProductMobile({ data, menu, config }) {
  const MAIN_ACTIVE = -1;
  const [list_product, setListProduct] = useState(data.details);
  const [isActive, setActive] = useState(-1);
  const [isLoadClient, setClient] = useState(false);
  const [categoryObj, setCategoryObj] = useState(null);

  useEffect(() => {
    if (menu && data) {
      let match = data.conditions_encoded.match(/\d+/g)
      let category_id = match[match.length - 1];
      let category_obj = menu.find(element => (element.parentcat && element.parentcat == category_id));
      setCategoryObj(category_obj);
    }
  }, [menu])

  // useEffect(() => {
  //   console.log(data.details)
  //   setListProduct(data.details)
  // }, [isActive])

  const loadProductCategory = async (e, id, index) => {
    setActive(index)
    setClient(true);
    let initParams = `searchCriteria[filterGroups][0][filters][1}][field]=p&searchCriteria[filterGroups][0][filters][1}][value]=1`;

    // not MAIN product
    if (index != MAIN_ACTIVE) {
      initParams += `&searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${id}`;
    } else {
      initParams += `&searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${categoryObj.category}`;
    }

    var query = `service/products?${initParams}&limit=20`;
    const result = await api.get(query);
    if (result.status == 200) {
      var items = result.data.search_result.items;
      var products_list = [];
      items.forEach(element => {
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
          priceGroup: element.extension_attributes.price_group
        });
      });
    }
    setListProduct(products_list)
  }

  return (

    <section className="sec-h-4 sec-t sec-bd-bottom   lazy-hidden group-ef">
      <div className="container">

        <div className=" entry-head efch-1 ef-tx-t">
          <h2 className="ht"> {data.title} </h2>
        </div>
        {categoryObj && (

          <a className="banner">
            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={(categoryObj && categoryObj.additional_data && categoryObj.additional_data.thumbnail_image == undefined) ?
              "/images/hoasen-product.jpg" : process.env.DOMAIN_BASE + categoryObj.additional_data.thumbnail_image} src="/images/no-image.svg" alt="" />
          </a>

        )}
        <div className="sec-filter-category">
          <span className={isActive === -1 ? "active" : ""} key="-1" onClick={(e) => loadProductCategory(e, null, -1)} >Tất cả</span>
          {(categoryObj && categoryObj.children != undefined) && (
            categoryObj.children.map((item, index) => (
              <span className={isActive === index ? "active" : ""} key={index} onClick={(e) => loadProductCategory(e, item.id, index)} > {item.name} </span>
            ))
          )}
        </div>
        {!isLoadClient && <div className="list-scroll-150  list-p-1">
          {list_product != undefined ?
            list_product.map((item, index) => (
              <div className={`col-6 efch-${index} ef-img-t`} key={index}>
                <ProductMobile data={item} dataIndex={index} configPrice={config}/>
              </div>
            ))
            :
            <div className={`col-6 efch-0 ef-img-t`} key={index}>
              Không tìm thấy sản phẩm
            </div>
          }
        </div>}

        {isLoadClient && <div className="list-scroll-150  list-p-1">
          {list_product != undefined ?
            list_product.map((item, index) => (
              <div className={`col-6 efch-${index} ef-img-t`} key={index}>
                <ProductMobileClient data={item} dataIndex={index} configPrice={config}/>
              </div>
            ))
            :
            <div className={`col-6 efch-0 ef-img-t`} key={index}>
              Ko tim thay san pham
            </div>
          }
        </div>}
      </div>
      {categoryObj && (
        <Link href={categoryObj.additional_data ? "/" + categoryObj.additional_data.request_path.replace(".html", "") : '/'}>
          <a className="more-sec">{t('view_more_product')}</a>
        </Link>
      )}
    </section>
  )
}

export default SectionProductMobile