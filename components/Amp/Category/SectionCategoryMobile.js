import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import t from '../../../translation'
import CategoryProductMobile from '../Category/CategoryProductMobile'
import Link from 'next/link'
import api from '../../../services/api'
import { useCommon } from '../../../contexts/common'



const list_sort = {
  new: t('new'),
  bestsellers: t('bestsellers'),
  saving: t('saving'),
  price_asc: t('price_asc'),
  price_desc: t('price_desc')
}

const list_rating = {
  3: t('from_3_stars'),
  4: t('from_4_stars'),
  5: t('from_5_stars')
}


function SectionCategoryMobile({
  data, menu, productsData, filters, setFilters, setParamsUrl, handleChangeRating, handleChangeOrder,
  handleFilterApply, initFiltersNavigation, resetFilters, configPrice
}) {
  const { activeFilterModal, setActiveFilterModal } = useCommon();
  const [brand, setBrand] = useState({ items: [] })
  const [customFT, setcustomFT] = useState({ filter: filters.custom_filters })
  const [order, setOrder] = useState('')
  const [priceFrom, setPriceFrom] = useState(filters.price.from)
  const [priceTo, setPriceTo] = useState(filters.price.to)
  const [rating, setRating] = useState(0)
  const [activeCategory, setActiveCategory] = useState({ name: data.category.name, id: data.category.id })
  const [isFetching, setIsFetching] = useState(false);
  const [newData, setNewData] = useState([]);
  const [page, setPage] = useState(1);

  const applyFilter = () => {
    var item = {
      price: { from: priceFrom, to: priceTo },
      brand: brand.items,
      rating: rating,
      cat: activeCategory,
      product_list_order: order,
      custom_filters: customFT,
    }
    handleFilterApply(item)
  };

  const removePriceFilter = () => {
    let price = {
      from: '',
      to: ''
    }
    let data = {
      ...filters,
      price
    };

    setPriceFrom('');
    setPriceTo('');
    setFilters(data);
  }

  const removeBrandFilter = (item) => {
    let currentBrand = filters.brand;
    if (currentBrand.includes(item)) {
      const index = currentBrand.indexOf(item);
      if (index > -1) currentBrand.splice(index, 1);
    }

    let data = {
      ...filters,
      brand: currentBrand
    };
    setFilters(data);
    setParamsUrl(false);
  }

  const removeCustomFilter = (item) => {
    var temp_custom_filter = customFT.filter;

    if (temp_custom_filter[item]) {
      delete temp_custom_filter[item];
    }
    setcustomFT({ filter: temp_custom_filter });
    applyFilter();
  }

  const removeRatingFilter = () => {
    setRating('')
    handleChangeRating('');
  }

  const removeCategoryFilter = (id) => {
    if (id != data.category.id) {
      setActiveCategory({ name: data.category.name, id: data.category.id })
      applyFilter();
    }
  }

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
      items: currentBrand
    });
  };

  const toggleRating = (item) => {
    if (rating == item) {
      setRating(0)
    } else {
      setRating(item)
    }
  };

  const toggleCategory = (item) => {
    if (item.name == activeCategory.name) {
      setActiveCategory({ name: data.category.name, id: data.category.id })
    } else {
      setActiveCategory({ name: item.name, id: item.id })
    }
  };


  const clearFilter = (item) => {
    setPriceFrom('');
    setPriceTo('');
    setBrand({ items: [] });
    setOrder('');
    setRating(0);
    resetFilters();
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



  var category_obj = menu.find(element => element.parentcat == data.category.id);

  var filter_brand = [];
  var banner_img = process.env.DOMAIN_BASE + "/pub/media/catalog/product/cache/fa2b041f099710ccb95ab5f36aa218fd/placeholder/image.jpg";

  if (category_obj) {
    category_obj.children.forEach(element => {
      let link = "/#";
      if (element.additional_data) link = element.additional_data.request_path.replace(".html", "");
      filter_brand.push({ name: element.name, id: element.id, link: link });
    });
    banner_img = process.env.DOMAIN_BASE + category_obj.additional_data.thumbnail_image;
  } else {
    filter_brand.push({ name: data.category.name, id: data.category.id });
    let img_obj = data.category.custom_attributes.find(element => element.attribute_code == "thumbnail_image")
    if (img_obj) banner_img = process.env.DOMAIN_BASE + img_obj.value;
  }
  banner_img.replace('https://admin.hoasenhome.vn', '');

  const isScrolling =()=>{
    if(window.innerHeight + document.documentElement.scrollTop!==document.documentElement.offsetHeight){
      setIsFetching(false);
      return;
    }
    setIsFetching(true)
  }

  useEffect(()=>{
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, [])

  useEffect(async () => {
    if (isFetching){ 
      await setNextParamsUrl();
    }
  }, [isFetching]);

  const setNextParamsUrl = async () => {
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
      currentParams.page = page + 1;
      setPage(page+1);
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
    console.log(currentParams)

    // Get Api phía client dua vao url luc nay
    let initParams = `searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${data.category.id}`;
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
    let res = newData;

    // Get clientSide
    try {
      const result = await api.get(`/service/products?${initParams}`)
      if(result.data.search_result.items.length == 0) {
        setIsFetching(false);
        setPage(0)
        return; 
      }
      Array.prototype.push.apply(res,result.data.search_result.items)
      res = res.concat(result.data.search_result.items)
      setNewData(res)
    } catch (error) {
      throw error
    }
  }

 
  // console.log(menu);

  return (
    <div>
      <section className="" >
        <div className="container">
          <h1 className="h2 page-title"> {data.category.name}
          </h1>
          <a href="#!" className="banner  ">

            <amp-img
                alt="Hoa Sen"
                src={`${banner_img}`}
                width="1000"
                height="400"
                layout="responsive"
              >
              </amp-img>   

          </a>
          <br />
          <div className="div-bd-bottom">
            <div className="row list-item list-p-1">
              {(productsData.items != undefined) && (productsData.items.map((item, index) => (
                <div className="col-lg-c5 col-md-3 col-sm-4 col-6 item-custom" key={index}>
                  <CategoryProductMobile data={item} configPrice={configPrice}/>
                </div>
              )))}
            </div>


          </div>
        </div>
        {isFetching && (
          <div className="loading" style={{height: "50px", marginBottom:"40px"}}>
          </div>
        )}
      </section>
    </div >
  )
}



export default SectionCategoryMobile