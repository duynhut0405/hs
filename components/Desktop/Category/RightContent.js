import React, { useEffect, useState } from 'react'
import NormalCarosel from '../Carosels/NormalCarosel'
import t from '../../../translation'
import CategoryProduct from '../ProductBox/CategoryProduct'
import Pagination from './Pagination'
import ViewedProductCategogry from '../Common/ViewedProductCategogry'
import checkImageExist from '../../../utils/checkImageExist'
import { useRouter } from "next/router";

const setting = {
  className: "category-banner list-b-4",
  arrows: true,
  dots: true,
  slidesToShow: 1,
  infinite: true,
  slidesToScroll: 1,
  speed: 500,
  autoplay: true,
  autoplay: true,
  autoplaySpeed: 2000,
  lazyLoad: true,
};

const list_sort = {
  new: t('new'),
  bestsellers: t('bestsellers'),
  saving: t('saving'),
  price_asc: t('price_asc'),
  price_desc: t('price_desc')
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function RightContent({ data, productsData, initFiltersNavigation, resetFilters, setFilters, setParamsUrl, configPrice }) {
  const router =useRouter();
  const [filters, setFilter] = useState(null);

  useEffect(() => {
    console.log(router.query);
    if (router.query) {
      let query = router.query;
      let newPrice = {
        from: '',
        to: ''
      }
      let newFilter = {}
      if(query.price_from) newPrice.from = query.price_from;
      if(query.price_to) newPrice.to = query.price_to;
      newFilter.price = newPrice;
      let newBrand = [];
      if (initFiltersNavigation?.brand?.value) {
        try {
          let listBrand = query?.brand?.split(',');
          initFiltersNavigation?.brand?.value.forEach(brand => {
            if(listBrand.includes(brand.value)) newBrand.push(brand)
          }); 
        } catch (error) {
          console.log('not has brand')
        }
      }
      newFilter.brand = newBrand;
      if (query.rating) newFilter.rating = query.rating;
      if (query.custom_filters) newFilter.custom_filters = JSON.parse(query.custom_filters);
      if (query.product_list_order) newFilter.product_list_order = query.product_list_order;
      if (query.page) newFilter.page = query.page;
      if (query.query) {newFilter.query = query.query} else { newFilter.query = '' };
      setFilter(newFilter)
    }
  }, [router.query]);

  const showFilter = () => {
    if (document) {
      var body = document.getElementsByTagName('body')[0];
      if (body.classList.contains("showFilter")) {
        body.classList.remove("showFilter");
        return
      }
      body.classList.add("showFilter");
    }
  }

  const setOrder = (e, item) => {
    e.persist();
    if (item == 'poisition') {
      item = ''
    }
    let params = _objectWithoutProperties(router.query, ["category"]);
    router.push({ pathname: window.location.pathname, query: { ...params, product_list_order: item } }, undefined, { shallow: true });
  }
  // useEffect(() => {
  //   setParamsUrl(false);
  // }, [filters.product_list_order, filters.page]);

  const handlePageChange = (pageNumber) => {
    let params = _objectWithoutProperties(router.query, ["category"]);
    router.push({ pathname: window.location.pathname, query: { ...params, page: pageNumber } }, undefined, { shallow: true });
  }

  const removePriceFilter = () => {
    let price = { from: '', to: '' }
    let data = { ...filters, price };
    let params = _objectWithoutProperties(router.query, ["category"]);
    router.push({ pathname: window.location.pathname, query: { ...params, price_from: '', price_to: '' } }, undefined, { shallow: true });
    setFilter(data);
  }

  const removeBrandFilter = (item) => {
    let params = _objectWithoutProperties(router.query, ["category"]);
    let listBrand = params?.brand?.split(',');
    var index = listBrand.indexOf(item.value);
    if (index > -1) {
      listBrand.splice(index, 1);
    }
    router.push({ pathname: window.location.pathname, query: { ...params, brand: listBrand.join() } }, undefined, { shallow: true });
  }

  const removeCustomFilter = (item) => {
    var temp_custom_filter = filters.custom_filters;
    if (temp_custom_filter[item]) {
      delete temp_custom_filter[item];
    }
    console.log(temp_custom_filter)
    let params = _objectWithoutProperties(router.query, ["category"]);
    const currentCustomFilter = JSON.parse(params.custom_filters);
    delete currentCustomFilter[item];
    if (currentCustomFilter && currentCustomFilter !== 'null' && currentCustomFilter !== 'undefined') {
      router.push({ pathname: window.location.pathname, query: { ...params, custom_filters: JSON.stringify(currentCustomFilter) } }, undefined, { shallow: true });
    } else {
      router.push({ pathname: window.location.pathname, query: { ...params, custom_filters: '' } }, undefined, { shallow: true });
    }
  }

  const removeRatingFilter = () => {
    let params = _objectWithoutProperties(router.query, ["category"]);
    delete params?.rating;
    router.push({ pathname: window.location.pathname, query: params }, undefined, { shallow: true });
  }

  const setFilterQuery = (value) => {
    setFilter({...filters, query: value})
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      let params = _objectWithoutProperties(router.query, ["category"]);
      router.push({ pathname: window.location.pathname, query: {...params, query: filters.query } }, undefined, { shallow: true });
    }
  }

  const searchNow = () => {
    let params = _objectWithoutProperties(router.query, ["category"]);
      router.push({ pathname: window.location.pathname, query: {...params, query: filters.query } }, undefined, { shallow: true });
  }

  return (
    <div className="col-lg-10 col-md-9">
      <h1 className="h2 page-title">
        {data.category.name} <span className="count">{`${t('Has')} ${productsData.total_count} ${t('Products')}`}</span>
        <span className="filter-btn" onClick={() => showFilter()}> <i className="icon-t16"></i> Lọc</span>
      </h1>
      <NormalCarosel setting={setting}>
        {data.category.extension_attributes.sliders[0] != undefined && (
          data.category.extension_attributes.sliders[0].banners.map((item, index) =>
            <a className="tRes_33" key={index}><img src={`${process.env.DOMAIN_IMAGE + item.image}`} alt="" onError={async (e) => await checkImageExist(e)}/></a>
          ))
        }
      </NormalCarosel>
      <div className="list-filter">
        <span className="title t1">{t('right_now_filter')}</span>
        {filters?.rating && (
          <a className="t1 active">{t('from')} {filters?.rating} {t('stars')} <i className="icon-close" onClick={() => { removeRatingFilter() }} ></i></a>
        )}
        {(filters?.price?.from != '' && filters?.price?.to != '') && (
          <a className="t1" >Từ {filters?.price?.from}đ đến {filters?.price?.to}đ <i className="icon-close" onClick={() => { removePriceFilter() }}></i></a>
        )}

        {(filters?.brand?.length != 0) && (
          filters?.brand.map((item, index) => (
            <a className="t1" key={index}>{item.label} <i className="icon-close" onClick={() => { removeBrandFilter(item) }}></i></a>
          ))
        )}
        {filters?.custom_filters != undefined && (
          Object.keys(filters?.custom_filters).map((item, index) => (
            <a className="t1" key={index}>{filters?.custom_filters[item].label} <i className="icon-close" onClick={() => { removeCustomFilter(item) }} ></i></a>
          ))
        )}

        <span className="t1 reset" onClick={() => resetFilters()}>{t('delete_filter')}</span>
      </div>
      <div className="orderby">
        <div className="form-search">
          <input type="text" name="" placeholder={`${t('find_in')} ${data.category.name}`} value={filters?.query} onKeyDown={handleKeyDown} onChange={(e) => setFilterQuery(e.target.value)} />
          <button type="submit" onClick={() => searchNow()}><i className="icon-search"></i></button>
        </div>
        <div className="order">
          <span className="title t1" >{t('sort_by')}:</span>
          {/* <a className={`t1 ${filters?.product_list_order == '' ? 'active' : ''}`} name={'product_list_order'} onClick={(e) => setOrder(e, '')}>{t('poisition')}</a> */}
          {list_sort != undefined && (
            Object.keys(list_sort).map((item, index) => (
              <a className={`t1 ${filters?.product_list_order == item ? 'active' : ''}`} key={index} name={'product_list_order'} onClick={(e) => setOrder(e, item)}>{list_sort[item]}</a>
            ))
          )}
        </div>
      </div>
      <div className="div-bd-bottom">
        <div className="row list-item list-p-1 not-scroll">
          {productsData?.items?.length > 0 ? (productsData.items.map((item, index) => (
            <div className="col-lg-c5 col-md-3 col-sm-4 col-6 " key={index}>
              <CategoryProduct data={item} key={index} configPrice={configPrice} />
            </div>
          )))

            :

            "( Không tìm thấy sản phẩm )"
          }
        </div>
        <br></br>
        <Pagination totalCount={productsData.total_count} currentPage={filters?.page || 1} handlePageChange={handlePageChange} />
      </div>
      <ViewedProductCategogry />
    </div>
  )
}

export default RightContent