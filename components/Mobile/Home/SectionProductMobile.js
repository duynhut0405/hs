import React, { ReactNode, useEffect, useState, useRouter } from 'react';
import t from '../../../translation';
import ProductMobile from '../Common/ProductMobile';
import ProductMobileClient from '../Common/ProductMobileClient';
import Link from 'next/link';
import api from '../../../services/api';
import intergrationApi from '../../../services/intergrationApi';
import checkImageExist from '../../../utils/checkImageExist';

function SectionProductMobile({ data, menu, config }) {
  const MAIN_ACTIVE = -1;
  const [list_product, setListProduct] = useState(data.details);
  const [isActive, setActive] = useState(-1);
  const [isLoadClient, setClient] = useState(false);
  const [categoryObj, setCategoryObj] = useState(null);
  const [viewMoreUrl, setViewMoreUrl] = useState(data.link);
  const [catMap, setCatMap] = useState();

  useEffect(() => {
    getCategoryPath();
  }, [catMap]);

  useEffect(() => {
    if (menu && data) {
      let match = data.conditions_encoded.match(/\d+/g);
      let category_id = match[match.length - 1];
      let category_obj = menu.find((element) => element.parentcat && element.parentcat == category_id);
      setCategoryObj(category_obj);
    }

    const categoryMap = {};
    menu.forEach((element1) => {
      categoryMap[element1.id] = element1?.additional_data?.request_path?.replace('.html', '');
      if (element1.children && element1.children.length > 0) {
        element1.children.forEach((element2) => {
          categoryMap[element2.id] = element2?.additional_data?.request_path?.replace('.html', '');
          if (element2.children && element2.children.length > 0) {
            element2.children.forEach((element3) => {
              categoryMap[element3.id] = element3?.additional_data?.request_path?.replace('.html', '');
            });
          }
        });
      }
    });

    setCatMap(categoryMap);
  }, [menu]);

  useEffect(() => {
    setListProduct(data.details);
  }, [isActive]);

  const getCategoryPath = async () => {
    let match = data.conditions_encoded.match(/\d+/g);
    let category_id = match[match.length - 1];

    try {
      setViewMoreUrl(catMap[category_id]);
    } catch (error) {
    } finally {
      if (data.link && data.link.charAt(0) == '/') setViewMoreUrl(data.link.substring(1));
    }
  };

  const loadProductCategory = async (e, id, index) => {
    setActive(index);
    setClient(true);
    let initParams = `searchCriteria[filterGroups][0][filters][1}][field]=p&searchCriteria[filterGroups][0][filters][1}][value]=1`;

    // not MAIN product
    let select_category = categoryObj.category;
    if (index != MAIN_ACTIVE) {
      select_category = id;
    }

    initParams += `&searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${id}`;

    var query = `service/products?${initParams}&limit=20`;
    const result = await api.get(query);
    if (result.status == 200) {
      var items = result.data.search_result.items;
      var products_list = [];
      items.forEach((element) => {
        var file = '';
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
          priceGroup: element.extension_attributes.price_group,
        });
      });
    }

    var query = `categories/${select_category}`;
    const result_cat = await intergrationApi.get(query);
    if (result_cat.status == 200) {
      let path = result_cat.data.custom_attributes.find((element) => element.attribute_code && element.attribute_code == 'url_path');
      setViewMoreUrl(path.value);
    }

    setListProduct(products_list);
  };

  return (
    <>
      {list_product && list_product?.length > 0 ? (
        <section className='sec-h-4 sec-t sec-bd-bottom   lazy-hidden group-ef'>
          <div className='container'>
            <div className={`entry-head efch-1 ef-tx-t`}>
              {data.title === 'DEAL SỐC MỖI TUẦN' ? (
                <img style={{ objectFit: 'contain' }} width={500} height={50} src='images/deal.png' alt='icon' />
              ) : data.title === 'COMBO GIÁ TỐT' ? (
                <img style={{ objectFit: 'contain' }} width={500} height={50} src='images/combo.jpg' alt='icon' />
              ) : (
                <h2 className='ht'>{data.title}</h2>
              )}
            </div>
            {categoryObj && (
              <a className='banner'>
                <img
                  className='lazy-hidden'
                  data-lazy-type='image'
                  data-lazy-src={categoryObj && categoryObj.additional_data && categoryObj.additional_data.thumbnail_image == undefined ? '/images/hoasen-product.jpg' : process.env.DOMAIN_BASE + categoryObj.additional_data.thumbnail_image}
                  src='/images/no-image.svg'
                  alt=''
                  onError={async (e) => await checkImageExist(e)}
                />
              </a>
            )}
            <div className='sec-filter-category'>
              {categoryObj && categoryObj.children != undefined && (
                <span className={isActive === -1 ? 'active' : ''} key='-1' onClick={(e) => loadProductCategory(e, null, -1)}>
                  Tất cả
                </span>
              )}
              {categoryObj &&
                categoryObj.children != undefined &&
                categoryObj.children.map((item, index) => (
                  <span className={isActive === index ? 'active' : ''} key={index} onClick={(e) => loadProductCategory(e, item.id, index)}>
                    {' '}
                    {item.name}{' '}
                  </span>
                ))}
            </div>
            {!isLoadClient && (
              <div className='list-scroll-150  list-p-1'>
                {list_product != undefined ? (
                  list_product.map((item, index) => (
                    <div className={`col-6 efch-${index} ef-img-t`} key={index}>
                      <ProductMobile data={item} dataIndex={index} config={config} />
                    </div>
                  ))
                ) : (
                  <div className={`col-6 efch-0 ef-img-t`} key={index}>
                    Không tìm thấy sản phẩm
                  </div>
                )}
              </div>
            )}

            {isLoadClient && (
              <div className='list-scroll-150  list-p-1'>
                {list_product != undefined ? (
                  list_product.map((item, index) => (
                    <div className={`col-6 efch-${index} ef-img-t`} key={index}>
                      <ProductMobileClient data={item} dataIndex={index} config={config} />
                    </div>
                  ))
                ) : (
                  <div className={`col-6 efch-0 ef-img-t`} key={index}>
                    Không tìm thấy sản phẩm
                  </div>
                )}
              </div>
            )}
          </div>

          <Link href={viewMoreUrl ? '/' + viewMoreUrl.replace('.html', '') : '/'}>
            <a className='more-sec'>{t('view_more_product')}</a>
          </Link>
        </section>
      ) : null}
    </>
  );
}

export default SectionProductMobile;
