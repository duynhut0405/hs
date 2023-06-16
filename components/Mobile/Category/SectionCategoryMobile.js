import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import t from "../../../translation";
import CategoryProductMobile from "../Category/CategoryProductMobile";
import Link from "next/link";
import api from "../../../services/api";
import { useCommon } from "../../../contexts/common";
import checkImageExist from "../../../utils/checkImageExist";
import NormalCarosel from "../../Desktop/Carosels/NormalCarosel";
import Cookies from "js-cookie";

const list_sort = {
  new: t("new"),
  bestsellers: t("bestsellers"),
  saving: t("saving"),
  price_asc: t("price_asc"),
  price_desc: t("price_desc"),
};

const list_rating = {
  3: t("from_3_stars"),
  4: t("from_4_stars"),
  5: t("from_5_stars"),
};
const setting = {
  className: "category-banner list-b-4",
  arrows: false,
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

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function SectionCategoryMobile({ data, menu, productsData, filters, setFilters, setParamsUrl, handleChangeRating, handleChangeOrder, handleFilterApply, initFiltersNavigation, resetFilters, configPrice }) {
  const { activeFilterModal, setActiveFilterModal } = useCommon();
  const [brand, setBrand] = useState({ items: [] });
  const [customFT, setcustomFT] = useState({ filter: filters?.custom_filters });
  const [order, setOrder] = useState("");
  const [priceFrom, setPriceFrom] = useState(filters?.price?.from);
  const [priceTo, setPriceTo] = useState(filters?.price?.to);
  const [rating, setRating] = useState(0);
  const [activeCategory, setActiveCategory] = useState({ name: data.category.name, id: data.category.id });
  const [isFetching, setIsFetching] = useState(false);
  const [newData, setNewData] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    let params = _objectWithoutProperties(router.query, ["category"]);
    if (router.query) {
      let query = router.query;
      let newPrice = {
        from: "",
        to: "",
      };
      let newFilter = {};
      if (query.price_from) newPrice.from = query.price_from;
      if (query.price_to) newPrice.to = query.price_to;
      newFilter.price = newPrice;
      let newBrand = [];
      if (initFiltersNavigation?.brand?.value) {
        try {
          let listBrand = query?.brand?.split(",");
          initFiltersNavigation?.brand?.value.forEach((brand) => {
            if (listBrand.includes(brand.value)) newBrand.push(brand);
          });
        } catch (error) {
          console.log("not has brand");
        }
      }
      newFilter.brand = newBrand;
      if (query.rating) newFilter.rating = query.rating;
      if (query.custom_filters) newFilter.custom_filters = JSON.parse(query.custom_filters);
      if (query.product_list_order) newFilter.product_list_order = query.product_list_order;
      if (query.page) newFilter.page = query.page;
      if (query.query) {
        newFilter.query = query.query;
      } else {
        newFilter.query = "";
      }
      if (query.cat && initFiltersNavigation?.cat?.value) newFilter.cat = initFiltersNavigation?.cat?.value.find((element) => element.value == query.cat) || data.category.id;
      setFilters(newFilter);
    }
  }, [router]);

  const applyFilter = () => {
    var item = {
      price: { from: priceFrom, to: priceTo },
      brand: brand.items,
      rating: rating,
      cat: activeCategory,
      product_list_order: order,
      custom_filters: customFT,
    };
    handleFilterApply(item);
  };
  const removePriceFilter = () => {
    let price = {
      from: "",
      to: "",
    };
    let data = {
      ...filters,
      price,
    };

    setPriceFrom("");
    setPriceTo("");
    let params = _objectWithoutProperties(router.query, ["category"]);
    router.push({ pathname: window.location.pathname, query: { ...params, price_from: "", price_to: "" } }, undefined, { shallow: true });
  };

  const removeBrandFilter = (item) => {
    let params = _objectWithoutProperties(router.query, ["category"]);
    let listBrand = params?.brand?.split(",");
    var index = listBrand.indexOf(item.value);
    if (index > -1) {
      listBrand.splice(index, 1);
    }
    router.push({ pathname: window.location.pathname, query: { ...params, brand: listBrand.join() } }, undefined, { shallow: true });
  };

  const removeCustomFilter = (item) => {
    var temp_custom_filter = customFT.filter;

    if (temp_custom_filter[item]) {
      delete temp_custom_filter[item];
    }
    setcustomFT({ filter: temp_custom_filter });
    if (temp_custom_filter[item]) {
      delete temp_custom_filter[item];
    }
    let params = _objectWithoutProperties(router.query, ["category"]);
    const currentCustomFilter = JSON.parse(params.custom_filters);
    delete currentCustomFilter[item];
    if (currentCustomFilter && currentCustomFilter !== "null" && currentCustomFilter !== "undefined") {
      router.push({ pathname: window.location.pathname, query: { ...params, custom_filters: JSON.stringify(currentCustomFilter) } }, undefined, { shallow: true });
    } else {
      router.push({ pathname: window.location.pathname, query: { ...params, custom_filters: "" } }, undefined, { shallow: true });
    }
  };

  const removeRatingFilter = () => {
    let params = _objectWithoutProperties(router.query, ["category"]);
    router.push({ pathname: window.location.pathname, query: { ...params, rating: "" } }, undefined, { shallow: true });
  };

  const removeCategoryFilter = (id) => {
    if (id != data.category.id) {
      let params = _objectWithoutProperties(router.query, ["category"]);
      let newParams = _objectWithoutProperties(params, ["cat"]);
      router.push({ pathname: window.location.pathname, query: newParams }, undefined, { shallow: true });
    }
  };

  const toggleBrandFilter = (item) => {
    let currentBrand = brand.items;
    if (!currentBrand.includes(item)) {
      currentBrand.push(item);
    } else {
      const index = currentBrand.indexOf(item);
      if (index > -1) currentBrand.splice(index, 1);
    }
    setBrand({
      ...brand,
      items: currentBrand,
    });
  };

  const toggleRating = (item) => {
    if (rating == item) {
      setRating(0);
    } else {
      setRating(item);
    }
  };

  const toggleCategory = (item) => {
    if (item.name == activeCategory.name) {
      setActiveCategory({ name: data.category.name, id: data.category.id });
    } else {
      setActiveCategory({ name: item.name, id: item.id });
    }
  };

  const clearFilter = (item) => {
    setPriceFrom("");
    setPriceTo("");
    setBrand({ items: [] });
    setOrder("");
    setRating(0);
    resetFilters();
    setActiveCategory({ name: "", id: 0 });
    for (const element in customFT.filter) {
      delete customFT.filter[element];
    }
  };

  const toggleCustomFilter = (item, value) => {
    var temp_custom_filter = customFT.filter;

    if (temp_custom_filter[item] && temp_custom_filter[item] == value) {
      delete temp_custom_filter[item];
    } else {
      temp_custom_filter[item] = value;
    }
    setcustomFT({ filter: temp_custom_filter });
  };

  var category_obj = menu.find((element) => element.parentcat == data.category.id);

  var filter_brand = [];
  var banner_img = "";

  if (data.category.extension_attributes.sliders[0] && data.category.extension_attributes.sliders[0].banners && data.category.extension_attributes.sliders[0].banners[0] && typeof data.category.extension_attributes.sliders[0].banners[0].image) {
    banner_img = process.env.DOMAIN_IMAGE + data.category.extension_attributes.sliders[0].banners[0].image;
  }

  if (category_obj) {
    category_obj.children.forEach((element) => {
      let link = "/#";
      if (element.additional_data) link = element.additional_data.request_path.replace(".html", "");
      filter_brand.push({ name: element.name, id: element.id, link: link });
    });
  } else {
    filter_brand.push({ name: data?.category?.name, id: data.category.id });
    let img_obj = data.category.custom_attributes.find((element) => element.attribute_code == "thumbnail_image");
  }

  const isScrolling = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      setIsFetching(false);
      return;
    }
    setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  useEffect(async () => {
    if (isFetching) {
      await setNextParamsUrl();
    }
  }, [isFetching]);

  const setNextParamsUrl = async () => {
    try {
      let currentParams = _objectWithoutProperties(router.query, ["category"]);
      let newQuery = _objectWithoutProperties(router.query, ["category"]);
      // Get Api phía client dua vao url luc nay
      let initParams = `searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${newQuery.cat ? newQuery.cat : data.category.id}`;
      let currentIndex = 1;

      //set page
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=p&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${page + 1}`;
      setPage(page + 1);
      currentIndex++;

      //set rating
      if (newQuery?.rating != "" && newQuery?.rating != undefined) {
        initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=rating&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${newQuery?.rating}`;
        currentIndex++;
      }

      //set price
      if (newQuery?.price_from && newQuery?.price_to) {
        initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=price&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${newQuery?.price_from}-${newQuery.price_to}`;
        currentIndex++;
      }

      //set brand
      if (newQuery?.brand != undefined && newQuery?.brand != "") {
        let lastChar = newQuery?.brand?.substr(newQuery?.brand?.length - 1);
        let brandList = lastChar === "," ? newQuery?.brand.slice(0, -1) : newQuery?.brand;
        initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=brand&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${brandList}`;
        currentIndex++;
      }
      if (newQuery?.custom_filters) {
        let custom_filters = JSON.parse(newQuery?.custom_filters);
        Object.keys(custom_filters).forEach((key) => {
          initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=${key}&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${custom_filters[key].value}`;
          currentIndex++;
        });
      }

      //set product_list_order
      if (newQuery?.product_list_order != undefined && newQuery?.product_list_order != "") {
        initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=product_list_order&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${newQuery?.product_list_order}`;
        currentIndex++;
      }

      const locationData1 = Cookies.get("location-data");
      // set city
      if (locationData1) {
        const currentLocation = JSON.parse(locationData1);
        initParams += `&city=${currentLocation.city.value}`;
        currentIndex++;
      } else {
        console.log("locationData1 null");
      }

      if (newQuery?.query) {
        try {
          const result = await api.get(`service/products/search/${newQuery?.query}?${initParams}`);
          setClientSideProductsData(result.data.search_result);
        } catch (error) {
          throw error;
        }
        return;
      }
      let res = newData;

      // Get clientSide
      try {
        const result = await api.get(`/service/products?${initParams}`);
        if (result.data?.search_result?.items?.length == 0) {
          setIsFetching(false);
          setPage(0);
          return;
        }
        Array.prototype.push.apply(res, result.data.search_result.items);
        res = res.concat(result.data.search_result.items);
        setNewData(res);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="">
        <div className="container">
          <h1 className="h2 page-title"> {data?.category?.name}</h1>
          {/* {category2.extension_attributes.sliders[0] && data.category.extension_attributes.sliders[0].banners && data.category.extension_attributes.sliders[0].banners[0] && typeof data.category.extension_attributes.sliders[0].banners[0].image && (
            <a className="banner tRes_33 ">
              <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={`${banner_img}`} src={`${banner_img}`} alt="" onError={async (e) => await checkImageExist(e)} ></img>
            </a>)
          } */}
          <NormalCarosel setting={setting}>
            {data.category.extension_attributes.sliders[0] != undefined &&
              data.category.extension_attributes.sliders[0].banners?.map((item, index) => (
                <a className="tRes_33" key={index}>
                  <img src={`${process.env.DOMAIN_IMAGE + item.image}`} alt="" onError={async (e) => await checkImageExist(e)} />
                </a>
              ))}
          </NormalCarosel>

          <div className="filter-category">
            <div className="orderby">
              <span className="title t1">{t("sort_by")}:</span>
              <select
                className="select"
                value={filters.product_list_order}
                onChange={(e) => {
                  handleChangeOrder(e.target[e.target.selectedIndex].value);
                  setOrder(e.target[e.target.selectedIndex].value);
                }}
              >
                {list_sort != undefined &&
                  Object.keys(list_sort)?.map((item, index) => (
                    <option value={item} key={index} name={"product_list_order"}>
                      {" "}
                      {list_sort[item]}{" "}
                    </option>
                  ))}
              </select>
            </div>

            <span className="menu-btn x" onClick={() => showMenu()}>
              <span></span>
            </span>

            <a
              className="filter-btn btnModal"
              data-modal="fiterModal"
              onClick={() => {
                setActiveFilterModal(true);
              }}
            >
              {" "}
              <i className="icon-t16"></i> Lọc
            </a>
          </div>
          <div id="wmenu-category">
            <div className="widget widget-menu-category collapse" style={{ paddingBottom: data && data.category && data.category.extension_attributes && data.category.extension_attributes.sub_categories.length > 6 ? "25px" : "0px" }}>
              {data && data.category && data.category.extension_attributes && data?.category?.extension_attributes?.sub_categories?.length > 6 && (
                <>
                  <input id="show_more_category" type="checkbox" />
                  <label htmlFor="show_more_category" className="more">
                    Xem thêm <i className="icon-arrow-1"></i>
                  </label>
                </>
              )}
              <ul className="accordion-menu accordion">
                {data != undefined &&
                  data.category != undefined &&
                  data.category.extension_attributes.sub_categories != undefined &&
                  data.category.extension_attributes.sub_categories?.map((item, index) => (
                    <li key={index} onClick={() => showMenu()}>
                      <Link href={item != undefined ? "/" + item.request_path.replace(".html", "") : "/"}>
                        <a>
                          <span> {item.name} </span>
                        </a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="list-filter">
            <span className="t1 reset" onClick={() => clearFilter()}>
              {" "}
              {t("clear_filter")}{" "}
            </span>
            {filters?.cat && activeCategory && activeCategory.name && activeCategory.name != data.category.name && (
              <a className="t1">
                {" "}
                {activeCategory.name}{" "}
                <i
                  className="icon-close"
                  onClick={() => {
                    removeCategoryFilter(activeCategory.id);
                  }}
                ></i>
              </a>
            )}

            {filters?.rating && filters?.rating != "" && rating != "" && (
              <a className="t1">
                {t("from")} {filters?.rating} {t("stars")}{" "}
                <i
                  className="icon-close"
                  onClick={() => {
                    removeRatingFilter();
                  }}
                ></i>
              </a>
            )}
            {filters?.price?.from != "" && filters?.price?.to != "" && (
              <a className="t1">
                Từ {filters?.price?.from}đ đến {filters?.price?.to}đ{" "}
                <i
                  className="icon-close"
                  onClick={() => {
                    removePriceFilter();
                  }}
                ></i>
              </a>
            )}

            {filters?.brand?.length != 0 &&
              filters?.brand?.map((item, index) => (
                <a className="t1" key={index}>
                  {item.label}{" "}
                  <i
                    className="icon-close"
                    onClick={() => {
                      removeBrandFilter(item);
                    }}
                  ></i>
                </a>
              ))}

            {filters?.custom_filters != undefined &&
              Object.keys(filters?.custom_filters)?.map(
                (item, index) =>
                  filters?.custom_filters[item].label != "" && (
                    <a className="t1" key={index}>
                      {filters?.custom_filters[item].label}{" "}
                      <i
                        className="icon-close"
                        onClick={() => {
                          removeCustomFilter(item, index);
                        }}
                      ></i>
                    </a>
                  )
              )}
          </div>

          <div className="div-bd-bottom">
            <div className="row list-item list-p-1">
              {productsData?.items?.length > 0 && productsData.items != undefined
                ? productsData.items?.map((item, index) => (
                    <div className="col-lg-c5 col-md-3 col-sm-4 col-6 item-custom" key={index}>
                      <CategoryProductMobile data={item} configPrice={configPrice} />
                    </div>
                  ))
                : "( Không tìm thấy sản phẩm )"}
            </div>
          </div>
          {newData?.length != 0 && (
            <div className="row list-item list-p-1">
              {newData?.map((item, index) => (
                <div className="col-lg-c5 col-md-3 col-sm-4 col-6 item-custom" key={index}>
                  <CategoryProductMobile data={item} configPrice={configPrice} />
                </div>
              ))}
            </div>
          )}
        </div>
        {isFetching && <div className="loading" style={{ height: "50px", marginBottom: "40px" }}></div>}
      </section>

      {activeFilterModal && (
        <>
          <div id="fiterModal" className={`myModal fiterModal ${activeFilterModal ? "active" : ""}`}>
            <div className="container ">
              <div className="top">
                <a
                  className="back btnModal icon-arrow-1 ix"
                  data-modal="fiterModal"
                  onClick={() => {
                    setActiveFilterModal(false);
                  }}
                ></a>{" "}
                <span className="w6">Lọc sản phẩm</span>
                <a
                  className="btnModal btn-close"
                  data-modal="fiterModal"
                  onClick={() => {
                    setActiveFilterModal(false);
                  }}
                >
                  <i className="icon-close"> </i>
                </a>
              </div>
              <div className="contentModal">
                <div className="widget widget-menu">
                  <h6 className="widget-title"> {t("categories")} </h6>
                  <ul className="menu row">
                    {filter_brand != undefined &&
                      filter_brand?.map((item, index) => (
                        <li className="col-4" key={index} value={item.id} onClick={(e) => toggleCategory(item)}>
                          <a className={activeCategory.id == item.id ? "active" : ""}> {item.name} </a>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="widget widget-price">
                  <h6 className="widget-title"> {t("price")}</h6>
                  <div className="widget-content">
                    <p>{t("input_price")}</p>
                    <p>
                      <input
                        type="number"
                        className="input style-2"
                        value={priceFrom === undefined ? "" : priceFrom}
                        onChange={(event) => setPriceFrom(Math.abs(event.target.value))}
                        // onChange={event => handleChangePrice(event, 'from')}
                        placeholder="Từ đ"
                      />
                    </p>
                    <div>
                      <input
                        type="number"
                        className="input style-2"
                        value={priceTo === undefined ? "" : priceTo}
                        onChange={(event) => setPriceTo(Math.abs(event.target.value))}
                        // onChange={event => handleChangePrice(event, 'to')}
                        placeholder="Đến đ"
                      />
                    </div>
                  </div>
                </div>

                {initFiltersNavigation.brand != undefined && (
                  <div className="widget widget-menu">
                    <h6 className="widget-title"> {t("Brands")}</h6>
                    <ul className="menu row">
                      {initFiltersNavigation.brand.value?.map((item, index) => (
                        <li className="col-4" key={index}>
                          {" "}
                          <a
                            className={brand.items.includes(item) ? "active" : ""}
                            onClick={() => {
                              toggleBrandFilter(item);
                            }}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="widget widget-menu">
                  <h6 className="widget-title"> {t("Rating")}</h6>
                  <ul className="menu row">
                    {list_rating != undefined &&
                      Object.keys(list_rating)?.map((item, index) => (
                        <li className="col-4" key={index} onClick={() => toggleRating(item)}>
                          <a className={rating == item ? "active" : ""}>
                            <i className="icon-star rated"></i> <span> {list_rating[item]} </span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                {initFiltersNavigation != undefined &&
                  Object.keys(initFiltersNavigation)?.map(
                    (item, index) =>
                      item != "brand" &&
                      item != "cat" &&
                      item != "price" &&
                      item != "rating" && (
                        <div className="widget widget-menu" key={index}>
                          <h6 className="widget-title">{initFiltersNavigation[item].label}</h6>
                          {initFiltersNavigation[item].value?.map((val, i) => (
                            <li key={i}>
                              <a
                                className={customFT.filter[item] && customFT.filter[item] == val ? "active" : ""}
                                onClick={() => {
                                  toggleCustomFilter(item, val);
                                }}
                              >
                                {val.label}
                              </a>
                            </li>
                          ))}
                        </div>
                      )
                  )}
              </div>
              <div
                className="bottom"
                onClick={() => {
                  applyFilter();
                  setActiveFilterModal(false);
                }}
              >
                {" "}
                {t("using")}{" "}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function showMenu() {
  document.getElementsByTagName("body")[0].classList.toggle("showMenu");
}

export default SectionCategoryMobile;
