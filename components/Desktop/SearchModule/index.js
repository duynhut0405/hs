import React, { useEffect, useState } from "react";
import BreadCrumb from "../Common/BreadCrumb";
import t from "../../../translation";
import api from "../../../services/api";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import { useRouter } from "next/router";
import { useCommon } from "../../../contexts/common";
function SearchModule({ allMenu, query, initFiltersNavigation, productsData, currentFilter, configPrice }) {
  const router = useRouter();
  const [filters, setFilters] = useState(currentFilter);
  const [page, setPage] = useState(currentFilter.page);
  const [cfPrice, setCfPrice] = useState();
  const { keyword } = useCommon();
  const [clientSideProductsData, setClientSideProductsData] = useState(productsData);
  useEffect(() => {
    setParamsUrl(false);
  }, [filters.rating, filters.price, filters.brand, filters.custom_filters]);

  useEffect(() => {
    setParamsUrl(true);
  }, [filters.cat]);

  useEffect(() => {
    setClientSideProductsData(productsData);
    if (!router.query.custom_filters) {
      let newFilters = {
        brand: [],
        custom_filters: {},
        page: 1,
        price: {
          from: "",
          to: "",
        },
        product_list_order: "",
        rating: "",
        cat: "",
      };
      setFilters(newFilters);
    }
  }, [router.query]);

  const resetFilters = () => {
    let currentParams = {
      price_from: "",
      price_to: "",
      brand: "",
      rating: "",
      page: 1,
      custom_filters: {},
      product_list_order: "",
      cat: "",
    };
    router.push({ pathname: window.location.pathname, query: currentParams }, undefined, { shallow: true });
    let newFilters = {
      brand: [],
      custom_filters: {},
      page: 1,
      price: {
        from: "",
        to: "",
      },
      product_list_order: "",
      rating: "",
      cat: "",
    };
    setFilters(newFilters);
  };

  const handleChangePrice = (event, name) => {
    let value = event.target.value.replace(/\D/g, "");
    let price = {
      ...filters.price,
      [name]: value,
    };
    let data = {
      ...filters,
      price,
    };
    setFilters(data);
  };

  const handleChangeCustomFilters = (val, atrributeType) => {
    let newValueFilters = filters.custom_filters;
    newValueFilters[atrributeType] = val;
    let newFilters = {
      ...filters,
      custom_filters: newValueFilters,
    };
    setFilters(newFilters);
    setParamsUrl(false);
  };

  const handleChangeBrand = (item) => {
    let currentBrand = filters.brand;
    if (!currentBrand.includes(item)) {
      currentBrand.push(item);
    }
    let data = {
      ...filters,
      brand: currentBrand,
    };
    setFilters(data);
    setParamsUrl(false);
  };

  const handleChangeRating = (rating) => {
    let data = {
      ...filters,
      rating: rating,
    };
    setFilters(data);
  };

  const handleChangeCat = (cat) => {
    let data = {
      ...filters,
      cat: cat.value,
      catName: cat.label,
    };
    setFilters(data);
    setParamsUrl(false);
  };

  const handleChangePage = (page) => {
    let data = {
      ...filters,
      page,
    };
    setPage(page);
    setFilters(data);
    setParamsUrl(false);
  };

  const setParamsUrl = async (isChangeCategory) => {
    let currentParams;
    if (!filters.price.from && !filters.price.to && filters.brand.length === 0 && !filters.rating && Object.keys(filters.custom_filters).length === 0 && !filters.cat) {
      if (filters.page !== 1) {
        currentParams = {
          q: query,
          page: filters.page
        };
      } else {
        return;
      }
    } else {
      let searchBrandParams = "";
      filters.brand.forEach((element) => {
        searchBrandParams += `${element.value},`;
      });
      currentParams = {
        q: query,
        price_from: filters.price.from,
        price_to: filters.price.to,
        brand: searchBrandParams.slice(0, -1),
        rating: filters.rating,
        page: filters.page,
        custom_filters: JSON.stringify(filters.custom_filters),
        product_list_order: filters.product_list_order,
        cat: filters.cat,
      };
    }

    // Set lại Params cho url
    router.push({ pathname: window.location.pathname, query: currentParams }, undefined, { shallow: true });
    // Get Api phía client dua vao url luc nay
    let initParams = ``;
    let currentIndex = 1;
    //set page
    if (currentParams.page == 1) {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=p&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=1`;
      currentIndex++;
    } else {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=p&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.page}`;
      currentIndex++;
    }
    //set rating
    if (currentParams.rating != undefined && currentParams.rating != "") {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=rating&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.rating}`;
      currentIndex++;
    }
    //set cat
    if (currentParams.cat != undefined && currentParams.cat != "") {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=cat&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.cat}`;
      currentIndex++;
    }
    //set price
    if (currentParams.price_from != undefined && currentParams.price_to != undefined && currentParams.price_from && currentParams.price_to) {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=price&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.price_from}-${currentParams.price_to}`;
      currentIndex++;
    }
    //set brand
    if (currentParams.brand != undefined && currentParams.brand != "") {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=brand&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.brand}`;
      currentIndex++;
    }
    Object.keys(filters?.custom_filters).forEach((key) => {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=${key}&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${filters.custom_filters[key].value}`;
      currentIndex++;
    });
    //set product_list_order
    if (currentParams.product_list_order != undefined && currentParams.product_list_order != "") {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=product_list_order&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.product_list_order}`;
      currentIndex++;
    }
    // Get clientSide
    try {
      const result = await api.get(`service/products/search/${encodeURI(query)}?${initParams}`);
      setClientSideProductsData(result.data.search_result);
      configPrice = result.data.config[0];
      setCfPrice(configPrice);
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <BreadCrumb data={[{ name: keyword, link: "/search", isActive: true }]} />
      <section className="sec-tb  sec-bd-bottom">
        <div className="container">
          <div className="row end">
            <RightContent
              handleChangePage={handleChangePage}
              productsData={clientSideProductsData}
              filters={filters}
              page={page}
              resetFilters={resetFilters}
              setFilters={setFilters}
              setParamsUrl={setParamsUrl}
              query={keyword}
              configPrice={cfPrice ? cfPrice : null}
            />
            <LeftContent
              allMenu={allMenu}
              handleChangePrice={handleChangePrice}
              setParamsUrl={setParamsUrl}
              initFiltersNavigation={initFiltersNavigation}
              handleChangeBrand={handleChangeBrand}
              handleChangeRating={handleChangeRating}
              handleChangeCustomFilters={handleChangeCustomFilters}
              handleChangeCat={handleChangeCat}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default SearchModule;
