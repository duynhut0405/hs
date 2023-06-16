import Layout from '../components/Desktop/Layout'
import LayoutMobile from '../components/Mobile/LayoutMobile'
import { useRouter } from 'next/router'
import SearchModule from '../components/Desktop/SearchModule'
import SearchMobile from '../components/Mobile/SearchMobile'
import IsMobile from '../utils/detectMobile'
import api from '../services/api'

function Category({ isMobile, allMenu, query, initFiltersNavigation, productsData, currentFilter, configPrice }) {
  return (
    !isMobile ?
      <Layout>
        <SearchModule configPrice={configPrice} allMenu={allMenu} query={query} initFiltersNavigation={initFiltersNavigation} productsData={productsData} currentFilter={currentFilter} />
      </Layout>

      :

      <LayoutMobile menu={allMenu} >
        <SearchMobile configPrice={configPrice} menu={allMenu} query={query} initFiltersNavigation={initFiltersNavigation} productsData={productsData} currentFilter={currentFilter} />
      </LayoutMobile>
  )
}

function getCookie(cname, cookie) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// This gets called on every request
export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  const query = context.query.q || null;
  const cat = context.query.cat || null;
  let allMenu = [];
  let initFiltersNavigation = {};
  let productsData = {};
  let configPrice = null;

  let cookie = context.req.headers.cookie;
  let locationData = getCookie(`location-data`, cookie);
  let cityId = '';
  if (locationData) {
    let decode = JSON.parse(locationData);
    cityId = decode.city && decode.city.value ? decode.city.value : '';
  }


  let initParams = '';
  let currentIndex = 0;
  initParams += `searchCriteria[filterGroups][0][filters][${currentIndex}][field]=p&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=1`;
  currentIndex++;
  if (cat != null) {
    initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=cat&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${cat}`;
  }

  try {
    if (cityId) {
      initParams += `&city=${cityId}`;
      currentIndex++;
    } else {
      console.log("locationData1 null")
    }

    const result = await Promise.all([
      api.get(`service/products/search/${encodeURI(query)}?${initParams}`),
      api.get(`service/filter/search/${encodeURI(query)}?${initParams}`),
      api.get('/service/stores/menus')
    ])
    initFiltersNavigation = result[1].data[0];
    productsData = result[0].data.search_result;
    allMenu = result[2].data[0].menuItems || [];
    configPrice = result[0].data.config[0] || null;
    console.log(result[0].data);
  } catch (error) {
    console.log(error)
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
    cat: context.query.cat || '',
    catName: '',
  }

  return { props: { isMobile, query, allMenu, initFiltersNavigation, productsData, currentFilter, configPrice } }
}

export default Category;