import React, { useEffect } from 'react'
import t from '../../../translation'
import CategoryProduct from '../ProductBox/CategoryProduct'
import Pagination from '../Category/Pagination'

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

function RightContent({ handleChangePage, productsData, filters,page,  resetFilters, setFilters, setParamsUrl, query, configPrice }) {
  const setOrder = (e, item) => {
    e.persist();
    if (item == "poisition") {
      item = "";
    }
    let newFilters = {
      ...filters,
      product_list_order: item,
    };
    setFilters(newFilters);
  };
  useEffect(() => {
    setParamsUrl(false);
  }, [filters.product_list_order, filters.page]);

  const removeCustomFilter = (item) => {
    var temp_custom_filter = filters.custom_filters;
    if (temp_custom_filter[item]) {
      delete temp_custom_filter[item];
    }

    let newFilters = { ...filters, custom_filters: temp_custom_filter };
    setFilters(newFilters);
    setParamsUrl(false);
  };

  const removeBrandFilter = (item) => {
    let currentBrand = filters.brand;
    if (currentBrand.includes(item)) {
      const index = currentBrand.indexOf(item);
      if (index > -1) currentBrand.splice(index, 1);
    }

    let data = { ...filters, brand: currentBrand };
    setFilters(data);
  };

  const removePriceFilter = () => {
    let price = { from: "", to: "" };
    let data = { ...filters, price };
    setFilters(data);
  };

  const removeRatingFilter = () => {
    let data = { ...filters, rating: "" };
    setFilters(data);
  };

  const removeCatFilter = () => {
    let data = { ...filters, cat: "" };
    setFilters(data);
  };

  return (
    <div className="col-lg-10 col-md-9">
      <h1 className="h2 page-title">
        Kết quả tìm kiếm cho "{query}" <span className="count">{`${t("Has")} ${productsData.total_count} ${t("Products")}`}</span>
      </h1>
      <div className="list-filter">
        <span className="title t1">{t("right_now_filter")}</span>
        {filters.rating != "" && (
          <a href="#" className="t1 active">
            {t("from")} {filters.rating} {t("stars")}{" "}
            <i
              className="icon-close"
              onClick={() => {
                removeRatingFilter();
              }}
            ></i>
          </a>
        )}
        {filters.cat != "" && (
          <a href="#" className="t1 active">
            {t("categories")} {filters.catName}{" "}
            <i
              className="icon-close"
              onClick={() => {
                removeCatFilter();
              }}
            ></i>
          </a>
        )}
        {filters.price.from != "" && filters.price.to != "" && (
          <a href="#" className="t1">
            Từ {filters.price.from}đ đến {filters.price.to}đ{" "}
            <i
              className="icon-close"
              onClick={() => {
                removePriceFilter();
              }}
            ></i>
          </a>
        )}
        {filters.brand.length != 0 &&
          filters.brand.map((item, index) => (
            <a href="#" className="t1" key={index}>
              {item.label}{" "}
              <i
                className="icon-close"
                onClick={() => {
                  removeBrandFilter(item);
                }}
              ></i>
            </a>
          ))}
        {filters.custom_filters != undefined &&
          Object.keys(filters.custom_filters).map((item, index) => (
            <a href="#" className="t1" key={index}>
              {filters.custom_filters[item].label}{" "}
              <i
                className="icon-close"
                onClick={() => {
                  removeCustomFilter(item);
                }}
              ></i>
            </a>
          ))}

        <span href="#" className="t1 reset" onClick={() => resetFilters()}>
          {t("delete_filter")}
        </span>
      </div>
      <div className="orderby">
        <div className="order">
          <span className="title t1">{t("sort_by")}:</span>
          <a className={`t1 ${filters.product_list_order == "" ? "active" : ""}`} name={"product_list_order"} onClick={(e) => setOrder(e, "")}>
            {t("poisition")}
          </a>
          {list_sort != undefined &&
            Object.keys(list_sort).map((item, index) => (
              <a className={`t1 ${filters.product_list_order == item ? "active" : ""}`} key={index} name={"product_list_order"} onClick={(e) => setOrder(e, item)}>
                {list_sort[item]}
              </a>
            ))}
        </div>
      </div>
      {productsData && productsData.items && (
        <div className="div-bd-bottom">
          <div className="row list-item list-p-1">
            {productsData.items.length > 0
              ? productsData.items.map((item, index) => (
                  <div className="col-lg-c5 col-md-3 col-sm-4 col-6 " key={index}>
                    <CategoryProduct data={item} key={index} configPrice={configPrice} />
                  </div>
                ))
              : "( Không tìm thấy sản phẩm )"}
          </div>
          <br></br>
          <Pagination totalCount={productsData.total_count} currentPage={page || filters.page} handlePageChange={handleChangePage} />
        </div>
      )}
    </div>
  );
}

export default RightContent