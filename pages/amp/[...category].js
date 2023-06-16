export const config = { amp: true };

import LayoutMobile from '../../components/Amp/LayoutMobile'
import api from '../../services/api'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import IsMobile from '../../utils/detectMobile'
import SectionBreadcrumbMobile from '../../components/Amp/Common/SectionBreadcrumbMobile'
import SectionCategoryMobile from '../../components/Amp/Category/SectionCategoryMobile'
import StyleCategory from '../../components/Amp/style/category'



function Category({ isMobile, allMenu, data, initFiltersNavigation, productsData, currentFilter, configPrice }) {
  const router = useRouter();
  const [filters, setFilters] = useState(currentFilter);
  const [clientSideProductsData, setClientSideProductsData] = useState(productsData);
  useEffect(() => {
    setClientSideProductsData(productsData)
  }, [router.query.category])

  useEffect(() => {
    setParamsUrl(false);
  }, [filters.rating, filters.price, filters.brand, filters.custom_filters, filters.product_list_order])

  const resetFilters = () => {
    let currentParams = {
      price_from: '',
      price_to: '',
      brand: '',
      rating: '',
      page: 1,
      custom_filters: {},
      product_list_order: '',

    };
    router.push({ pathname: window.location.pathname, query: { page: 1 } }, undefined, { shallow: true });
    let newFilters = {
      brand: [],
      custom_filters: {},
      page: 1,
      price: {
        from: '',
        to: ''
      },
      product_list_order: '',
      rating: '',

    }
    setFilters(newFilters);
  }
  const handleChangePrice = (event, name) => {
    let value = event.target.value.replace(/\D/g, '');
    let price = {
      ...filters.price,
      [name]: value
    }
    let data = {
      ...filters,
      price
    };
    setFilters(data);
  };

  const handleChangeOrder = (order) => {
    let data = {
      ...filters,
      product_list_order: order
    };
    setFilters(data);
  };

  const handleFilterApply = (ft) => {
    let data = {
      ...filters,
      brand: ft.brand,
      price: ft.price,
      cat: ft.cat,
      rating: ft.rating,
      custom_filters: ft.custom_filters.filter,
      product_list_order: ft.product_list_order,
    };

    setFilters(data);
  };

  const handleChangeCustomFilters = (val, atrributeType) => {
    let newValueFilters = filters.custom_filters;
    newValueFilters[atrributeType] = val;
    let newFilters = {
      ...filters,
      custom_filters: newValueFilters
    };
    setFilters(newFilters);
    setParamsUrl(false);
  }

  const handleChangeBrand = item => {
    let currentBrand = filters.brand;
    if (!currentBrand.includes(item)) {
      currentBrand.push(item);
    }

    let data = {
      ...filters,
      brand: currentBrand
    };
    setFilters(data);
    setParamsUrl(false);
  };

  const handleChangeRating = rating => {
    let data = {
      ...filters,
      rating: rating
    };
    setFilters(data);
  }

  const setParamsUrl = async (isChangeCategory) => {
    let searchBrandParams = '';
    filters.brand.forEach(element => {
      searchBrandParams += `${element.value},`;
    });
    let currentParams = {};
    if (filters.price.from) {
      currentParams.price_from = filters.price.from;
    }
    if (filters.price.to) {
      currentParams.price_to = filters.price.to;
    }
    if (searchBrandParams != '') {
      currentParams.brand = searchBrandParams.slice(0, -1);
    }
    if (filters.rating) {
      currentParams.rating = filters.rating;
    }
    if (filters.page) {
      currentParams.page = filters.page;
    }
    if (filters.custom_filters && Object.keys(filters.custom_filters).length !== 0) {
      currentParams.custom_filters = JSON.stringify(filters.custom_filters);
    }
    if (filters.product_list_order) {
      currentParams.product_list_order = filters.product_list_order;
    }
    if (filters.cat) {
      currentParams.cat = filters.cat;
    }

    if (filters.query) {
      currentParams.query = filters.query;
    }

    // Set lại Params cho url
    if (!isChangeCategory) {
      router.push({ pathname: window.location.pathname, query: currentParams }, undefined, { shallow: true });
    }
    // Get Api phía client dua vao url luc nay
    let initParams = `searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${currentParams.cat && currentParams.cat.id ? currentParams.cat.id : data.category.id}`;
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
    if (currentParams.rating != '' && currentParams.rating != undefined) {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=rating&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.rating}`;
      currentIndex++;
    }


    //set price
    if (currentParams.price_from && currentParams.price_to) {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=price&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.price_from}-${currentParams.price_to}`;
      currentIndex++;
    }

    //set brand
    if (currentParams.brand != undefined && currentParams.brand != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=brand&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.brand}`;
      currentIndex++;
    }

    Object.keys(filters.custom_filters).forEach(key => {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=${key}&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${filters.custom_filters[key].value}`;
      currentIndex++;
    });

    //set product_list_order
    if (currentParams.product_list_order != undefined && currentParams.product_list_order != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=product_list_order&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.product_list_order}`;
      currentIndex++;
    }

    if (currentParams.query) {
      try {
        const result = await api.get(`service/products/search/${currentParams.query}?${initParams}`);
        setClientSideProductsData(result.data.search_result);
      } catch (error) {
        throw error
      }
      return;
    }
    // Get clientSide
    try {
      const result = await api.get(`/service/products?${initParams}`)
      setClientSideProductsData(result.data.search_result);
    } catch (error) {
      throw error
    }
  }



  return (
    <LayoutMobile menu={allMenu} >
      <StyleCategory />
      <Head>
        {data.category.custom_attributes.map(
          (data, index) => {
            if (data.attribute_code !== null) {
              switch (data.attribute_code) {
                case 'meta_title':
                  return <title key={index}>{data.value}</title>
                case 'meta_description':
                  return <meta key={index} name="description" content={data.value} />
                default:
                  return null;
              }
            } else {
              return null;
            }
          }
        )}
        {data.category.custom_attributes.map(
          (data, index) => {
            if (data.attribute_code !== null) {
              switch (data.attribute_code) {
                case 'meta_title':
                  return <meta property="og:title" key={index} content={data.value} itemProp="headline" />
                case 'meta_description':
                  return <meta property="og:description" key={index} name="description" content={data.value} />
                default:
                  return null;
              }
            } else {
              return null;
            }
          }
        )}
      </Head>
      {/* <SectionSearchMobile page='categoryMobile' /> */}

      <SectionBreadcrumbMobile data={[{ name: data.category.name, link: "/#", isActive: true }]} />
      <SectionCategoryMobile data={data} productsData={clientSideProductsData} menu={allMenu}
        filters={filters}
        setFilters={setFilters}
        setParamsUrl={setParamsUrl}
        resetFilters={resetFilters}
        handleChangeRating={handleChangeRating}
        handleChangeOrder={handleChangeOrder}
        handleChangePrice={handleChangePrice}
        handleFilterApply={handleFilterApply}
        handleChangeCustomFilters={handleChangeCustomFilters}
        initFiltersNavigation={initFiltersNavigation} configPrice={configPrice} />

    </LayoutMobile>

  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  const { category } = context.query;

  let query = '';
  category.forEach(element => {
    query += element + '*'
  });

  let allMenu = [];
  let data = [];
  let initFiltersNavigation = {};
  let productsData = {};
  let configPrice = null;

  //Detect category and get all menus;
  try {
    const result = await Promise.all([
      api.get(`/service/rewrite/entity/${query}`),
      api.get('/service/stores/menus')
    ])


    data = result[0].data || null;
    allMenu = result[1].data[0].menuItems || null;

    if (!data || !allMenu) {
      return {
        notFound: true,
      }
    }
    let initParams = `searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${data.category.id}`;
    let currentIndex = 1;
    //set page
    if (context.query.page == undefined || context.query.page == '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=p&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=1`;
      currentIndex++;
    } else {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=p&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${context.query.page}`;
      currentIndex++;
    }

    //set rating
    if (context.query.rating && context.query.rating != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=rating&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${context.query.rating}`;
      currentIndex++;
    }

    //set price
    if (context.query.price_from && context.query.price_to) {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=price&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${context.query.price_from}-${context.query.price_to}`;
      currentIndex++;
    }

    //set brand
    if (context.query.brand != undefined && context.query.brand != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=brand&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${context.query.brand}`;
      currentIndex++;
    }

    if (context.query.custom_filters != undefined && context.query.custom_filters != '') {
      let customFilters = JSON.parse(context.query.custom_filters);
      Object.keys(customFilters).forEach(key => {
        initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=${key}&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${customFilters[key].value}`;
        currentIndex++;
      });
    }

    //set product_list_order
    if (context.query.product_list_order != undefined && context.query.product_list_order != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=product_list_order&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${context.query.product_list_order}`;
      currentIndex++;
    }

    //get filter of category and products
    const entityResult = await Promise.all([
      api.get(`/service/filter/category/${data.category.id}`, {
        params: {
          searchCriteria: {
            filter_groups: [
              {
                filters: [
                  {
                    field: 'p',
                    value: '1',
                    condition_type: 'eq'
                  }
                ]
              }
            ]
          }
        }
      }),
      api.get(`/service/products?${initParams}`)
    ])
    initFiltersNavigation = entityResult[0].data[0];
    productsData = entityResult[1].data.search_result;
    console.log(entityResult[1].data.config)
    configPrice = entityResult[1].data.config[0] || null;

  } catch (error) {
    throw error;
  }

  let currentFilter = {
    price: {
      from: context.query.price_from || '',
      to: context.query.price_to || ''
    },
    brand: [],
    rating: context.query.rating || '',
    page: context.query.page || 1,
    custom_filters: {},
    product_list_order: context.query.product_list_order || '',
    query: ''
  }

  return { props: { isMobile, allMenu, data, initFiltersNavigation, productsData, currentFilter, configPrice } }
}

export default Category;