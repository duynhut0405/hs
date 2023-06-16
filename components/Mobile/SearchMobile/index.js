import React, { useEffect, useState } from 'react';
import t from '../../../translation';
import api from '../../../services/api';
import LayoutMobile from '../LayoutMobile';
import SectionBreadcrumbMobile from '../Common/SectionBreadcrumbMobile';
import SectionSearchMobile from '../Common/SectionSearchMobile';
import CategoryProductMobile from '../Category/CategoryProductMobile';

import { useCommon } from '../../../contexts/common';
import { useRouter } from 'next/router';
import Link from 'next/link';

const list_sort = {
  new: t('new'),
  bestsellers: t('bestsellers'),
  saving: t('saving'),
  price_asc: t('price_asc'),
  price_desc: t('price_desc'),
};

const list_rating = {
  3: t('from_3_stars'),
  4: t('from_4_stars'),
  5: t('from_5_stars'),
};

function SearchMobile({ configPrice, menu, query, initFiltersNavigation, productsData, currentFilter }) {
  const router = useRouter();
  const [filters, setFilters] = useState(currentFilter);
  const [clientSideProductsData, setClientSideProductsData] = useState(productsData);
  const [order, setOrder] = useState('');
  const { activeFilterModal, setActiveFilterModal, keyword, locationData } = useCommon();
  const [brand, setBrand] = useState({ items: [] });
  const [customFT, setcustomFT] = useState({ filter: filters.custom_filters });
  const [priceFrom, setPriceFrom] = useState(filters.price.from);
  const [priceTo, setPriceTo] = useState(filters.price.to);
  const [rating, setRating] = useState(0);
  const [activeCategory, setActiveCategory] = useState({ name: '', id: '' });

  useEffect(() => {
    setParamsUrl(false);
  }, [filters.product_list_order, filters.rating, filters.price, filters.brand, filters.custom_filters]);

  useEffect(() => {
    setParamsUrl(true);
  }, [filters.cat, query]);

  useEffect(() => {}, [priceFrom, priceTo]);

  const resetFilters = () => {
    let currentParams = {
      price_from: '',
      price_to: '',
      brand: '',
      rating: '',
      page: 1,
      custom_filters: {},
      product_list_order: '',
      cat: '',
    };
    router.push({ pathname: window.location.pathname, query: currentParams }, undefined, { shallow: true });
    let newFilters = {
      brand: [],
      custom_filters: {},
      page: 1,
      price: {
        from: '',
        to: '',
      },
      product_list_order: '',
      rating: '',
      cat: '',
    };
    setFilters(newFilters);
    // setKeyWord('')
  };

  const handleChangeOrder = (order) => {
    let data = {
      ...filters,
      product_list_order: order,
    };
    setFilters(data);
    setOrder(order);
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

  const setParamsUrl = async (isChangeCategory) => {
    let currentParams;
    if (!filters.price.from && !filters.price.to && filters.brand.length === 0 && !filters.rating && Object.keys(filters.custom_filters).length === 0 && !filters.cat) {
      if (filters.page !== 1) {
        currentParams = {
          q: query,
          page: filters.page,
        };
      } else {
        return;
      }
    } else {
      let searchBrandParams = '';
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
    if ((currentParams.rating != undefined && currentParams.rating) != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=rating&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.rating}`;
      currentIndex++;
    }

    //set cat
    if ((currentParams.cat != undefined && currentParams.cat) != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=cat&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.cat}`;
      currentIndex++;
    }

    //set price
    if (currentParams.price_from != undefined && currentParams.price_to != undefined && currentParams.price_from && currentParams.price_to) {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=price&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.price_from}-${currentParams.price_to}`;
      currentIndex++;
    }

    //set brand
    if (currentParams.brand != undefined && currentParams.brand != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=brand&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.brand}`;
      currentIndex++;
    }

    Object.keys(filters?.custom_filters).forEach((key) => {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=${key}&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${filters.custom_filters[key].value}`;
      currentIndex++;
    });

    //set product_list_order
    if (currentParams.product_list_order != undefined && currentParams.product_list_order != '') {
      initParams += `&searchCriteria[filterGroups][0][filters][${currentIndex}][field]=product_list_order&searchCriteria[filterGroups][0][filters][${currentIndex}][value]=${currentParams.product_list_order}`;
      currentIndex++;
    }

    //set city
    if (locationData) {
      initParams += `&city=${locationData.city.value}`;
      currentIndex++;
    }

    // Get clientSide
    try {
      const result = await api.get(`service/products/search/${encodeURI(query)}?${initParams}`);
      setClientSideProductsData(result.data.search_result);
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilter = () => {
    let data = {
      ...filters,
      brand: brand.items,
      cat: activeCategory.name,
      price: { from: priceFrom, to: priceTo },
      rating: rating,
      custom_filters: customFT.filter,
      product_list_order: order,
    };

    setFilters(data);
  };

  const removePriceFilter = () => {
    let price = {
      from: '',
      to: '',
    };
    let data = {
      ...filters,
      price,
    };

    setPriceFrom('');
    setPriceTo('');
    setFilters(data);
  };

  const removeBrandFilter = (item) => {
    let currentBrand = filters.brand;
    if (currentBrand.includes(item)) {
      const index = currentBrand.indexOf(item);
      if (index > -1) currentBrand.splice(index, 1);
    }

    let data = {
      ...filters,
      brand: currentBrand,
    };
    setFilters(data);
    setParamsUrl(false);
  };

  const removeCustomFilter = (item) => {
    var temp_custom_filter = customFT.filter;

    if (temp_custom_filter[item]) {
      delete temp_custom_filter[item];
    }
    setcustomFT({ filter: temp_custom_filter });
    applyFilter();
  };

  const removeRatingFilter = () => {
    setRating('');
    handleChangeRating('');
  };

  const removeCategoryFilter = (id) => {
    if (id != data.category.id) {
      setActiveCategory({ name: '', id: '' });
      applyFilter();
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
    if (item.label == activeCategory.name) {
      setActiveCategory({ name: '', id: '' });
    } else {
      setActiveCategory({ name: item.label, id: item.value });
    }
  };

  const clearFilter = (item) => {
    setPriceFrom('');
    setPriceTo('');
    setBrand({ items: [] });
    setOrder('');
    setRating(0);
    resetFilters();
    setActiveCategory({ name: '', id: 0 });

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

  return (
    <>
      <LayoutMobile menu={menu}>
        <SectionSearchMobile page='searchMobile' />
        <SectionBreadcrumbMobile data={[{ name: keyword, link: '/#', isActive: true }]} />

        <section className=''>
          <div className='row-border-bottom row-border-bottom-page-title '>
            {keyword ? (
              <h1 className='h2 page-title mb-10'>
                Kết quả tìm kiếm cho "{keyword}" <br />
                <span className='small'>( {`${t('Has')} ${clientSideProductsData?.total_count} ${t('Products')}`} )</span>
              </h1>
            ) : (
              <h1 className='h2 page-title mb-10'>
                Tìm sản phẩm <br />
              </h1>
            )}
          </div>

          {/* <div className="row-address row-border-bottom">
            <span className="t1 ">Giao hàng đến</span>
            <div className="t2">
              <span className="line-1">82 Phạm Hùng - Phường 12, Quận 10 82 Phạm Hùng - Phường 12, Quận 10…</span>
            </div>
          </div> */}

          <div className='row-border-bottom'>
            <div className='filter-category '>
              <div className='orderby'>
                <span className='title t1'>{t('sort_by')}:</span>
                <select
                  className='select'
                  onChange={(e) => {
                    handleChangeOrder(e.target[e.target.selectedIndex].value);
                  }}
                >
                  {list_sort != undefined &&
                    Object.keys(list_sort).map((item, index) => (
                      <option value={item} key={index} name={'product_list_order'}>
                        {' '}
                        {list_sort[item]}{' '}
                      </option>
                    ))}
                </select>
              </div>

              <span className='menu-btn x' onClick={() => showMenu()}>
                <span></span>
              </span>

              <a
                className='filter-btn btnModal'
                data-modal='fiterModal'
                onClick={() => {
                  setActiveFilterModal(true);
                }}
              >
                {' '}
                <i className='icon-t16'></i> Lọc
              </a>
            </div>

            <div id='wmenu-category'>
              <div className='widget widget-menu-category collapse'>
                {/* <input  id="show_more_category" type="checkbox" />
                <label htmlFor="show_more_category" className="more">{t('view_more_detail')} <i className="icon-arrow-1"></i></label> */}

                <ul className='accordion-menu accordion'>
                  {menu != undefined &&
                    menu.map((item, index) => (
                      <li className='children' key={index} onClick={() => showMenu()}>
                        <Link href={item.additional_data != undefined ? '/' + item?.additional_data?.request_path?.replace('.html', '') : '/'}>
                          <a>
                            <span> {item.name} </span>
                          </a>
                        </Link>
                        <ul>
                          {item.children != undefined &&
                            item.children.map((child, child_index) => (
                              <li key={child_index}>
                                <Link href={child.additional_data != undefined ? '/' + child.additional_data?.request_path?.replace('.html', '') : '/'}>
                                  <a>
                                    <span> {child.name} </span>
                                  </a>
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className='pd-15'>
            <div className='list-filter'>
              <span className='t1 reset' onClick={() => clearFilter()}>
                {' '}
                {t('clear_filter')}{' '}
              </span>
              {filters.cat && activeCategory && activeCategory.name && (
                <a className='t1 a'>
                  {' '}
                  {activeCategory.name}{' '}
                  <i
                    className='icon-close'
                    onClick={() => {
                      removeCategoryFilter(activeCategory.id);
                    }}
                  ></i>
                </a>
              )}

              {filters.rating != '' && rating != '' && (
                <a className='t1'>
                  {t('from')} {filters.rating} {t('stars')}{' '}
                  <i
                    className='icon-close'
                    onClick={() => {
                      removeRatingFilter();
                    }}
                  ></i>
                </a>
              )}

              {filters.price.from != '' && filters.price.to != '' && (
                <a className='t1'>
                  Từ {filters.price.from}đ đến {filters.price.to}đ{' '}
                  <i
                    className='icon-close'
                    onClick={() => {
                      removePriceFilter();
                    }}
                  ></i>
                </a>
              )}

              {filters.brand.length != 0 &&
                filters.brand.map((item, index) => (
                  <a className='t1' key={index}>
                    {item.label}{' '}
                    <i
                      className='icon-close'
                      onClick={() => {
                        removeBrandFilter(item);
                      }}
                    ></i>
                  </a>
                ))}

              {filters.custom_filters.length != 0 &&
                Object.keys(filters.custom_filters).map((item, index) => (
                  <a className='t1' key={index}>
                    {filters.custom_filters[item].label}{' '}
                    <i
                      className='icon-close'
                      onClick={() => {
                        removeCustomFilter(item, index);
                      }}
                    ></i>
                  </a>
                ))}
            </div>

            <div className='div-bd-bottom'>
              <div className='row list-item list-p-1'>
                {clientSideProductsData?.items?.length > 0 && clientSideProductsData.items != undefined
                  ? clientSideProductsData?.items?.map((item, index) => (
                      <div className='col-lg-c5 col-md-3 col-sm-4 col-6 ' key={index}>
                        <CategoryProductMobile data={item} configPrice={configPrice} />
                      </div>
                    ))
                  : '( Không tìm thấy sản phẩm )'}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------filter modal -------------------------------- */}
        {activeFilterModal && (
          <>
            <div id='fiterModal' className={`myModal fiterModal ${activeFilterModal ? 'active' : ''}`}>
              <div className='container '>
                <div className='top'>
                  <a
                    className='back btnModal icon-arrow-1 ix'
                    data-modal='fiterModal'
                    onClick={() => {
                      setActiveFilterModal(false);
                    }}
                  ></a>{' '}
                  <span className='w6'>Lọc sản phẩm</span>
                  <a
                    className='btnModal btn-close'
                    data-modal='fiterModal'
                    onClick={() => {
                      setActiveFilterModal(false);
                    }}
                  >
                    <i className='icon-close'> </i>
                  </a>
                </div>
                <div className='contentModal'>
                  <div className='widget widget-menu'>
                    <h6 className='widget-title'> {t('categories')} </h6>
                    <ul className='menu row'>
                      {initFiltersNavigation &&
                        initFiltersNavigation.cat &&
                        initFiltersNavigation.cat.value != undefined &&
                        initFiltersNavigation.cat.value.map((item, index) => (
                          <li className='col-4' key={index} value={item.value} onClick={(e) => toggleCategory(item)}>
                            <a className={activeCategory.id == item.value ? 'active' : ''}> {item.label} </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className='widget widget-price'>
                    <h6 className='widget-title'> {t('price')}</h6>
                    <div className='widget-content'>
                      <p>{t('input_price')}</p>
                      <p>
                        <input type='number' className='input style-2' value={priceFrom === undefined ? '' : priceFrom} onChange={(event) => setPriceFrom(Math.abs(event.target.value))} placeholder='Từ đ' />
                      </p>
                      <div>
                        <input type='number' className='input style-2' value={priceTo === undefined ? '' : priceTo} onChange={(event) => setPriceTo(Math.abs(event.target.value))} placeholder='Đến đ' />
                      </div>
                    </div>
                  </div>

                  {initFiltersNavigation.brand != undefined && (
                    <div className='widget widget-menu'>
                      <h6 className='widget-title'> {t('Brands')}</h6>
                      <ul className='menu row'>
                        {initFiltersNavigation.brand.value.map((item, index) => (
                          <li className='col-4' key={index}>
                            {' '}
                            <a
                              className={brand.items.includes(item) ? 'active' : ''}
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

                  <div className='widget widget-menu'>
                    <h6 className='widget-title'> {t('Rating')}</h6>
                    <ul className='menu row'>
                      {list_rating != undefined &&
                        Object.keys(list_rating).map((item, index) => (
                          <li className='col-4' key={index} onClick={() => toggleRating(item)}>
                            <a className={rating == item ? 'active' : ''}>
                              <i className='icon-star rated'></i> <span> {list_rating[item]} </span>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {initFiltersNavigation != undefined &&
                    Object.keys(initFiltersNavigation).map(
                      (item, index) =>
                        item != 'brand' &&
                        item != 'cat' &&
                        item != 'price' &&
                        item != 'rating' && (
                          <div className='widget widget-menu' key={index}>
                            <h6 className='widget-title'>{initFiltersNavigation[item].label}</h6>
                            {initFiltersNavigation[item].value.map((val, i) => (
                              <li key={i}>
                                <a
                                  className={customFT.filter[item] && customFT.filter[item] == val ? 'active' : ''}
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
                  className='bottom'
                  onClick={() => {
                    applyFilter();
                    setActiveFilterModal(false);
                  }}
                >
                  {' '}
                  {t('using')}{' '}
                </div>
              </div>
            </div>
          </>
        )}
      </LayoutMobile>
    </>
  );
}

function showMenu() {
  document.getElementsByTagName('body')[0].classList.toggle('showMenu');
}

export default SearchMobile;
