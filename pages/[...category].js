import Layout from '../components/Desktop/Layout';
import LayoutMobile from '../components/Mobile/LayoutMobile';
import api from '../services/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import RightContent from '../components/Desktop/Category/RightContent';
import LeftContent from '../components/Desktop/Category/LeftContent';
import SectionSearchMobile from '../components/Mobile/Common/SectionSearchMobile';
import SectionBreadcrumbMobile from '../components/Mobile/Common/SectionBreadcrumbMobile';
import SectionCategoryMobile from '../components/Mobile/Category/SectionCategoryMobile';
import { element } from 'prop-types';
import { useCommon } from '../contexts/common';
import { useCurrentCategory } from '../contexts/currentCategory';
import Cookies from 'js-cookie';
import { parse } from 'himalaya';
import { isMobile, isTablet } from 'react-device-detect';
import StripHtmlTag from '../utils/stripHtmlTag';
import BreadCrumb from '../components/Desktop/Common/BreadCrumb';

function gup(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regexS = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
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

function Category({ allMenu, data, initFiltersNavigation, productsData, currentFilter, configPrice, breadcrumb }) {
  const router = useRouter();
  const [filters, setFilters] = useState(currentFilter);
  const [clientSideProductsData, setClientSideProductsData] = useState(productsData);
  const { setCategory } = useCurrentCategory();
  const { locationData } = useCommon();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(isMobile && !isTablet);
    if (data?.category?.id) {
      setCategory(data.category.id);
    }
  }, []);

  useEffect(async () => {
    if (router.asPath.split('?').length > 1 && Object.keys(_objectWithoutProperties(router.query, ['category'])).length === 0) {
      return;
    }
    await setParamsUrl(false);
  }, [router?.query]);

  useEffect(() => {
    // console.log("router.query", router.query);
  }, [router.query]);

  const resetFilters = () => {
    router.push({ pathname: window.location.pathname, query: { page: 1 } }, undefined, { shallow: true });
  };
  const handleChangePrice = (event, name) => {
    let value = event.target.value.replace(/\D/g, '');
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

  const handleChangeOrder = (order) => {
    let data = {
      ...filters,
      product_list_order: order,
    };
    let params = _objectWithoutProperties(router.query, ['category']);
    router.push({ pathname: window.location.pathname, query: { ...params, product_list_order: order } }, undefined, { shallow: true });
  };

  const handleFilterApply = (ft) => {
    console.log(ft);
    let data = {
      ...filters,
      brand: ft.brand,
      price: ft.price,
      cat: ft.cat,
      rating: ft.rating,
      custom_filters: ft.custom_filters.filter,
      product_list_order: ft.product_list_order,
    };
    let params = _objectWithoutProperties(router.query, ['category']);
    if (data?.cat?.id) params.cat = data?.cat?.id;
    if (data?.price?.from && data?.price?.to) {
      params.price_from = data?.price?.from;
      params.price_to = data?.price?.to;
    }
    if (data?.brand) {
      try {
        let newBrand = '';
        data.brand.forEach((element) => {
          newBrand += element.value + ',';
        });
        params.brand = newBrand;
      } catch (error) {
        console.log('no brand');
      }
    }
    if (ft?.rating) params.rating = ft.rating;
    if (ft?.custom_filters?.filter) params.custom_filters = JSON.stringify(ft.custom_filters.filter);
    if (ft?.product_list_order) params.product_list_order = ft?.product_list_order;
    params.page = 1;
    console.log('params', params);
    router.push({ pathname: window.location.pathname, query: params }, undefined, { shallow: true });
    setFilters(data);
  };

  const handleChangeCustomFilters = (val, atrributeType) => {
    let params = _objectWithoutProperties(router.query, ['category']);
    console.log(params.custom_filters);
    if (params.custom_filters) {
      let newCustomFilter = JSON.parse(params.custom_filters) || {};
      newCustomFilter[atrributeType] = val;
      router.push({ pathname: window.location.pathname, query: { ...params, custom_filters: JSON.stringify(newCustomFilter) } }, undefined, { shallow: true });
    } else {
      let newCustomFilter = {};
      newCustomFilter[atrributeType] = val;
      router.push({ pathname: window.location.pathname, query: { ...params, custom_filters: JSON.stringify(newCustomFilter) } }, undefined, { shallow: true });
    }
  };

  const handleChangeBrand = (item) => {
    let params = _objectWithoutProperties(router.query, ['category']);
    let currentBrand = router?.query?.brand ? router?.query?.brand + ',' : '';
    router.push({ pathname: window.location.pathname, query: { ...params, brand: currentBrand + item.value } }, undefined, { shallow: true });
  };

  const handleChangeRating = (rating) => {
    let params = _objectWithoutProperties(router.query, ['category']);
    router.push({ pathname: window.location.pathname, query: { ...params, rating: rating } }, undefined, { shallow: true });
    setFilters(data);
  };

  const setParamsUrl = async (isChangeCategory) => {
    let newQuery = _objectWithoutProperties(router.query, ['category']);
    console.log('newQuery', newQuery);
    // Get Api phía client dua vao url luc nay
    let initParams = `searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${newQuery.cat ? newQuery.cat : data.category.id}`;
    let currentIndex = 1;

    //set page
    if (newQuery?.page == 1) {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=p&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=1`;
      currentIndex++;
    } else {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=p&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${newQuery?.page || 1}`;
      currentIndex++;
    }

    //set rating
    if (newQuery?.rating != '' && newQuery?.rating != undefined) {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=rating&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${newQuery?.rating}`;
      currentIndex++;
    }

    //set price
    if (newQuery?.price_from && newQuery?.price_to) {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=price&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${newQuery?.price_from}-${newQuery.price_to}`;
      currentIndex++;
    }

    //set brand
    if (newQuery?.brand != undefined && newQuery?.brand != '') {
      let lastChar = newQuery?.brand?.substr(newQuery?.brand?.length - 1);
      let brandList = lastChar === ',' ? newQuery?.brand.slice(0, -1) : newQuery?.brand;
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
    if (newQuery?.product_list_order != undefined && newQuery?.product_list_order != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=product_list_order&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${newQuery?.product_list_order}`;
      currentIndex++;
    }

    const locationData1 = Cookies.get('location-data');
    // set city
    if (locationData1) {
      const currentLocation = JSON.parse(locationData1);
      initParams += `&city=${currentLocation.city.value}`;
      currentIndex++;
    } else {
      console.log('locationData1 null');
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
    // Get clientSide
    try {
      const result = await api.get(`/service/products?${initParams}`);
      setClientSideProductsData(result.data.search_result);
    } catch (error) {
      throw error;
    }
  };

  return mobile ? (
    <LayoutMobile menu={allMenu}>
      <Head>
        {data.category.custom_attributes.map((data, index) => {
          if (data.attribute_code !== null) {
            switch (data.attribute_code) {
              case 'meta_title':
                return <title key={index}>{data.value}</title>;
              case 'meta_description':
                return <meta key={index} name='description' content={data.value} />;
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
        {data.category.custom_attributes.map((data, index) => {
          if (data.attribute_code !== null) {
            switch (data.attribute_code) {
              case 'meta_title':
                return <meta property='og:title' key={index} content={data.value} itemProp='headline' />;
              case 'meta_description':
                return <meta property='og:description' key={index} name='description' content={StripHtmlTag(data.value)} />;
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
        <meta property='og:image' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/' + 'images/gioi-thieu.jpg '} />
        <meta property='og:image' content={'https://hoasenhome.vn/' + 'images/gioi-thieu.jpg '} />
        <meta property='og:image:secure_url' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/' + 'images/gioi-thieu.jpg '} />
      </Head>
      <SectionSearchMobile page='categoryMobile' />
      <SectionBreadcrumbMobile data={breadcrumb} />
      <SectionCategoryMobile
        data={data}
        productsData={clientSideProductsData}
        menu={allMenu}
        filters={filters}
        setFilters={setFilters}
        setParamsUrl={setParamsUrl}
        resetFilters={resetFilters}
        handleChangeRating={handleChangeRating}
        handleChangeOrder={handleChangeOrder}
        handleChangePrice={handleChangePrice}
        handleFilterApply={handleFilterApply}
        handleChangeCustomFilters={handleChangeCustomFilters}
        initFiltersNavigation={initFiltersNavigation}
        configPrice={configPrice}
      />
    </LayoutMobile>
  ) : (
    <Layout>
      <Head>
        {data.category.custom_attributes.map((data, index) => {
          if (data.attribute_code !== null) {
            switch (data.attribute_code) {
              case 'meta_title':
                return <title>{data.value}</title>;
              case 'meta_description':
                return <meta name='description' content={data.value} />;
              default:
                return null;
            }
          }
        })}
        {data.category.custom_attributes.map((data, index) => {
          if (data.attribute_code !== null) {
            switch (data.attribute_code) {
              case 'meta_title':
                return <meta property='og:title' key={index} content={data.value} itemProp='headline' />;
              case 'meta_description':
                return <meta property='og:description' key={index} name='description' content={StripHtmlTag(data.value)} />;
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
        <meta property='og:image' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/' + 'images/gioi-thieu.jpg '} />
        <meta property='og:image' content={'https://hoasenhome.vn/' + 'images/gioi-thieu.jpg '} />
        <meta property='og:image:secure_url' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/' + 'images/gioi-thieu.jpg '} />
      </Head>
      <BreadCrumb data={breadcrumb} />
      <section id='main' className='sec-tb  sec-bd-bottom page-category'>
        <div className='container'>
          <div className='row end'>
            <RightContent
              data={data}
              initFiltersNavigation={initFiltersNavigation}
              productsData={clientSideProductsData}
              filters={filters}
              resetFilters={resetFilters}
              setFilters={setFilters}
              setParamsUrl={setParamsUrl}
              configPrice={configPrice ? configPrice : null}
            />
            <LeftContent
              allMenu={allMenu}
              data={data}
              handleChangePrice={handleChangePrice}
              // setParamsUrl={setParamsUrl}
              initFiltersNavigation={initFiltersNavigation}
              handleChangeBrand={handleChangeBrand}
              handleChangeRating={handleChangeRating}
              handleChangeCustomFilters={handleChangeCustomFilters}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const context = [];
  const listStaticProps = [];
  try {
    const result = await api.get('service/stores/html-sitemap');
    let newData = parse(result.data);
    let listRawCategories = newData[0].children[1].children;
    listRawCategories.forEach((element) => {
      let data = element.children[0].attributes[0].value.replace('https://admin-hoasen.mangoads.com.vn/', '');
      data = data.replace('.html', '');
      data = data.split('/');
      listStaticProps.push(data);
    });
  } catch (error) {
    console.log(error);
  }

  const paths = listStaticProps.map((e) => ({ params: { category: e } }));

  return { paths, fallback: false };
}

const getParentCategory = async (categorySinglePaths) => {
  let listParent = [];
  let data = categorySinglePaths;
  if (data.length !== 1) {
    data.splice(-1);
    for (let i = 0; i < data.length; i++) {
      let newArray = data.filter((element, index) => index <= i);
      console.log(newArray);
      const query = newArray.join('*');
      console.log(query);
      try {
        const result = await api.get(`/service/rewrite/entity/${query}`);

        const path = { name: result?.data?.category?.name || '', link: `/${query.replace('*', '/')}`, isActive: false };
        listParent.push(path);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return listParent;
};

// This gets called on every request
export async function getStaticProps(params) {
  const isMobile = false;
  // Fetch data from external API

  const category = params.params.category;

  let query = '';
  category.forEach((element) => {
    query += element + '*';
  });

  let allMenu = [];
  let data = [];
  let initFiltersNavigation = {};
  let productsData = {};
  let configPrice = null;

  //Detect category and get all menus;
  try {
    const result = await Promise.all([api.get(`/service/rewrite/entity/${query.slice(0, -1)}`), api.get('/service/stores/menus')]);

    data = result[0].data || null;
    allMenu = result[1].data[0].menuItems || null;

    if (!data || !allMenu || !data.category) {
      return {
        notFound: true,
      };
    }
    let initParams = `searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${data.category.id}`;
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
                    condition_type: 'eq',
                  },
                ],
              },
            ],
          },
        },
      }),
      api.get(`/service/products?${initParams}`),
    ]);
    initFiltersNavigation = entityResult[0].data[0];
    productsData = entityResult[1]?.data?.search_result || [];
    configPrice = entityResult[1].data.config[0] || null;
  } catch (error) {
    console.log(error);
  }

  let currentFilter = {
    price: {
      from: '',
      to: '',
    },
    brand: [],
    rating: '',
    page: 1,
    custom_filters: {},
    product_list_order: '',
    query: '',
  };
  let initBrand = 0;
  if (initFiltersNavigation.brand) {
    const brand = initFiltersNavigation.brand.value.filter((brand) => brand.value == initBrand);
    currentFilter.brand = brand;
  }
  let breadcrumb = await getParentCategory(category);
  breadcrumb.push({ name: data?.category?.name || '', link: `#`, isActive: true });

  return { props: { allMenu, data, initFiltersNavigation, productsData, currentFilter, configPrice, breadcrumb } };
}

export default Category;
