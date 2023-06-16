export const config = { amp: true };
import api from '../../../../services/api';
import React, { useEffect, useState } from 'react';
import SimpleMobileSlider from '../../../../components/Amp/ProductDetail/SimpleMobileSlider';
import t from '../../../../translation';
import ReactHtmlParser from 'react-html-parser';
import ShowStar from '../../../../components/Desktop/Review/ShowStar';
import formatVND from '../../../../utils/formatVND';
import WidgetMobile from '../../../../components/Amp/ProductDetail/WidgetMobile';
import { useAuth } from '../../../../contexts/auth';
import IsMobile from '../../../../utils/detectMobile';
import LayoutProductDetailMobile from '../../../../components/Amp/ProductDetail/LayoutProductDetailMobile';
import Cookies from 'js-cookie';
import Modal from 'react-bootstrap/Modal';
import ProductSlide from '../../../../components/Amp/ProductDetail/ProductSlide';
import SummaryInfo from '../../../../components/Amp/ProductDetail/SummaryInfo';
import DetailInfo from '../../../../components/Amp/ProductDetail/DetailInfo';
import QuestionMobile from '../../../../components/Amp/ProductDetail/QuestionMobile';
import ViewedProductMobile from '../../../../components/Amp/Common/ViewedProductMobile';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { element } from 'prop-types';
import { useCommon } from '../../../../contexts/common';

import StyleDetail from '../../../../components/Amp/style/detail';

function ProductDetail({ isMobile, data, optionPrice, productOptions, productVarients, isReviewError, reviewMessageError, configPrice, priceGroup, category }) {
  const [finalPrice, SetFinalPrice] = useState(data.extension_attributes.pricing.final_price);
  const [basePrice, SetBasePrice] = useState(data.price);
  const [qty, setQty] = useState(1);
  const [currentOptions, setCurrentOptions] = useState(null);
  const { isAuthenticated, getWishlist, wishlist, setOpenModal } = useAuth();
  const [isInWishlist, setInWishlist] = useState(false);
  const [currentChildProducts, setCurrentChildProducts] = useState({ items: [] });
  const [choisingOptions, setChosingOptions] = useState({});
  const [canAddToCart, setAddToCart] = useState(false);
  const [childImages, setImagesList] = useState(null);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();
  const [plus, setPlus] = useState(0);
  const { locationData } = useCommon();
  const [state, setState] = useState({
    items: [
      {
        value: 1,
        qty: 1,
      },
    ],
  });
  const [commonData, setCommonData] = useState(null);
  const [brandID, setBrandID] = useState(0);

  useEffect(() => {
    if (locationData && priceGroup && priceGroup.allow_custom_length && Object.keys(configPrice.pricing).length !== 0) {
      let cityId = locationData.city.value;
      let shippingPrice = configPrice.pricing.iron_and_steel_shipping.collated_fee[cityId][priceGroup.shipping_index];
      let regionWeight = configPrice.pricing.iron_and_steel_region_flexibility.weight;
      let regionPrice = configPrice.pricing.iron_and_steel_region_flexibility.collated_fee[cityId][priceGroup.region_index];
      setPlus(Math.ceil(shippingPrice) + Math.ceil(Math.ceil((regionWeight * regionPrice) / 100) * 100));
    }
  }, [locationData]);

  const saveViewedProduct = async () => {
    if (typeof window !== 'undefined') {
      let obj = {
        id: data.id,
        price: data.extension_attributes.pricing.final_price,
        basePrice: data.price,
        image: data.media_gallery_entries[0] ? data.media_gallery_entries[0].file : null,
        url: data.extension_attributes.request_path,
        review: data.extension_attributes.review.review_summary[0].rating_summary,
        name: data.name,
        priceGroup: priceGroup,
      };
      let points = [];
      if (localStorage.getItem('viewed')) {
        points = JSON.parse(localStorage.getItem('viewed'));
        const found = points.find((element) => element.id == data.id);
        if (found != undefined) {
          return;
        }
        if (points.length == 6) {
          points.pop();
          points.unshift(obj);
          localStorage.setItem('viewed', JSON.stringify(points));
          return;
        }
      }
      points.push(obj);
      localStorage.setItem('viewed', JSON.stringify(points));
    }
  };

  useEffect(() => {
    if (data.custom_attributes) {
      let brand = data.custom_attributes.find((element) => element.attribute_code && element.attribute_code == 'brand');
      if (brand) setBrandID(brand.value);
    }
  }, [data.custom_attributes]);

  useEffect(() => {
    if (data) {
      SetFinalPrice(data.extension_attributes.pricing.final_price);
    }
  }, [data.name]);

  useEffect(() => {
    if (Object.keys(choisingOptions).length == productOptions.length) {
      setAddToCart(true);
    } else {
      setAddToCart(false);
    }
  }, [choisingOptions]);

  useEffect(() => {
    if (currentChildProducts.items.length > 0) {
      let lowestPrice = optionPrice[currentChildProducts.items[0]].finalPrice;
      currentChildProducts.items.forEach((item) => {
        if (optionPrice[item].finalPrice < lowestPrice) {
          lowestPrice = optionPrice[item].finalPrice;
        }
      });
      SetFinalPrice(lowestPrice);
      let productIds = currentChildProducts.items;
      let images = data.extension_attributes.configurable_config.images[0];
      if (images && Object.keys(images).length > 0) {
        productIds.forEach((element) => {
          setImagesList(images[element]);
        });
      } else {
        setImagesList(null);
      }
    }
  }, [currentChildProducts.items]);

  // Lựa chọn option
  const handleOption = (e, index) => {
    const filters = Array.from(document.getElementsByClassName('filter-option'));
    const res = {};
    filters.forEach((element, i) => {
      if (i == index + 1 && index != productOptions.length - 1) {
        element.disabled = false;
        element.value = 'reset';
      }
      if (i > index + 1 && index != productOptions.length - 1) {
        element.disabled = true;
        element.value = 'reset';
      }
      if (element.value != 'reset') {
        res[element.name] = element.value;
      }
    });
    setChosingOptions(res);

    if (e.target.value != 'reset') {
      if (currentOptions.values.length - 1 == index) {
        Object.keys(productVarients).forEach(function (productId) {
          if (JSON.stringify(productVarients[productId]) === JSON.stringify(res)) {
            SetFinalPrice(optionPrice[productId].finalPrice);
            setCurrentChildProducts({ items: [productId] });
          }
        });
        return;
      }

      let initOptions = data.extension_attributes.configurable_product_options;
      let attributeId = currentOptions.values[index].attribute_id;
      let nextAtributeId = currentOptions.values[index + 1].attribute_id;
      let atrributeIdValue = e.target.value;
      let currentNextOptions = initOptions[index + 1].values;

      for (let i = index; i < productOptions.length; i++) {
        if (productOptions[i + 1]) {
          delete res[productOptions[i + 1].attribute_id];
        }
      }

      let newValidProducts = [];
      Object.keys(productVarients).forEach(function (productId) {
        let product = productVarients[productId];
        let isPush = true;

        Object.keys(res).forEach(function (resKey) {
          if (res[resKey] != product[resKey]) {
            isPush = false;
          }
        });

        if (isPush) {
          newValidProducts.push(productId);
        }
      });
      setCurrentChildProducts({ items: newValidProducts });

      let validNextOptions = [];
      newValidProducts.forEach((element) => {
        if (productVarients[element][attributeId] == atrributeIdValue) {
          if (!validNextOptions.includes(productVarients[element][nextAtributeId])) {
            validNextOptions.push(productVarients[element][nextAtributeId]);
          }
        }
      });

      // Tạo options mới cho filter tiếp theo
      let nextOptions = [];
      validNextOptions.forEach((valueIndex) => {
        currentNextOptions.forEach((element) => {
          if (!nextOptions.includes(element) && element.value_index == valueIndex) {
            nextOptions.push(element);
          }
        });
      });

      //Update currentOptions.values
      let newValues = currentOptions.values;
      newValues[index + 1].active = true;
      newValues[index + 1].values = nextOptions;
      let result = {
        ...currentOptions,
        values: newValues,
      };
      setCurrentOptions(result);
    } else {
      resetFilter();
      const filterOptions = Array.from(document.getElementsByClassName('filter-option'));
      filterOptions.forEach((element) => {
        element.selectedIndex = 0;
      });
      setChosingOptions({});
      resetFilter();
    }
  };

  // reset filters
  const resetFilter = () => {
    let options = productOptions;
    options.forEach((element, index) => {
      element.active = index == 0;
    });
    let data = {
      ...currentOptions,
      values: options,
    };
    setCurrentOptions(data);
    setImagesList(null);
  };

  useEffect(() => {
    resetFilter();
  }, [productOptions]);

  useEffect(async () => {
    Cookies.remove('reviewParam');
    if (isReviewError) {
      alert(reviewMessageError);
    }
    try {
      const result = await api.get(`service/product/${data.id}/static-content`);
      setCommonData(result.data[0]);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(async () => {
    await saveViewedProduct();
  }, [data.id]);

  useEffect(() => {
    if (wishlist) {
      const found = wishlist[0].find((element) => element.product_id == data.id);
      if (found) {
        setInWishlist(true);
        setCurrentWishlist(found);
      } else {
        setInWishlist(false);
      }
    }
  }, [wishlist, data.id]);

  const handleWishlist = async () => {
    console.log('isAuthenticated' + isAuthenticated);
    if (isAuthenticated) {
      console.log('isInWishlist' + isInWishlist);
      if (isInWishlist) {
        try {
          const result = await api.delete(`service/wishlist/delete/` + currentWishlistItem.wishlist_item_id);
          if (result.data) {
            setModalText('Đã xoá khỏi sản phẩm yêu thích của bạn');
            setModalShow(true);
            getWishlist();
          }
          console.log('result' + result.data);
        } catch (error) {
          throw error;
        }
        return;
      }
      try {
        const result = await api.post('service/wishlist/add', {
          productId: data.id,
          buyRequest: {
            data: {
              productId: data.id,
            },
          },
        });
        if (result.data) {
          setModalText('Đã thêm vào sản phẩm yêu thích của bạn');
          setModalShow(true);
          getWishlist();
        }
      } catch (error) {
        throw error;
      }
    } else {
      setOpenModal(true);
    }
  };

  useEffect(async () => {
    if (modalShow) {
      await setTimeout(() => {
        setModalShow(false);
      }, 1000);
    }
  }, [modalShow]);

  const addToCart = async () => {
    if (productOptions.length == 0) {
      if (!isAuthenticated) {
        let cardId = Cookies.get('cardId');
        try {
          const result = await api.post(`/guest-carts/${cardId}/items`, {
            cartItem: {
              quote_id: cardId,
              sku: data.sku,
              qty: qty,
              product_option: {},
            },
          });
          location.reload();
        } catch (error) {
          throw error;
        }
        return;
      } else {
        try {
          const result = await api.post('service/carts/mine/items', {
            cartItem: {
              sku: data.sku,
              qty: qty,
              product_option: {},
            },
          });
          location.reload();
        } catch (error) {
          throw error;
        }
        return;
      }
    }
    if (!canAddToCart) {
      alert('Hãy chọn hết Phân loại sản phẩm');
      return;
    }
    let currentProduct = currentChildProducts.items[0];
    let options = [];
    Object.keys(choisingOptions).forEach(function (option) {
      options.push({
        option_id: option,
        option_value: choisingOptions[option],
      });
    });

    if (isAuthenticated && currentProduct) {
      try {
        const result = await api.post('service/carts/mine/items', {
          cartItem: {
            sku: data.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
              },
            },
          },
        });
        location.reload();
      } catch (error) {
        throw error;
      }
    } else if (!isAuthenticated && currentProduct) {
      let cardId = Cookies.get('cardId');
      try {
        const result = await api.post(`/guest-carts/${cardId}/items`, {
          cartItem: {
            quote_id: cardId,
            sku: data.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
              },
            },
          },
        });
        location.reload();
      } catch (error) {
        throw error;
      }
    }
  };

  const checkOut = async () => {
    if (productOptions.length == 0) {
      if (!isAuthenticated) {
        let cardId = Cookies.get('cardId');
        try {
          const result = await api.post(`/guest-carts/${cardId}/items`, {
            cartItem: {
              quote_id: cardId,
              sku: data.sku,
              qty: qty,
              product_option: {},
            },
          });
        } catch (error) {
          throw error;
        }
      } else {
        try {
          const result = await api.post('service/carts/mine/items', {
            cartItem: {
              sku: data.sku,
              qty: qty,
              product_option: {},
            },
          });
        } catch (error) {
          throw error;
        }
      }
      router.push('/checkout');
    }
    if (!canAddToCart) {
      alert('Hãy chọn hết Phân loại sản phẩm');
      return;
    }
    let currentProduct = currentChildProducts.items[0];
    let options = [];
    Object.keys(choisingOptions).forEach(function (option) {
      options.push({
        option_id: option,
        option_value: choisingOptions[option],
      });
    });

    if (isAuthenticated && currentProduct) {
      try {
        const result = await api.post('service/carts/mine/items', {
          cartItem: {
            sku: data.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
              },
            },
          },
        });
      } catch (error) {
        throw error;
      }
    } else if (!isAuthenticated && currentProduct) {
      let cardId = Cookies.get('cardId');
      try {
        const result = await api.post(`/guest-carts/${cardId}/items`, {
          cartItem: {
            quote_id: cardId,
            sku: data.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
              },
            },
          },
        });
      } catch (error) {
        throw error;
      }
    }
    router.push('/checkout');
  };

  const handleQty = (type) => {
    if (type == 'minus') {
      let data = qty;
      if (data > 0) {
        data--;
      }
      setQty(data);
    }
    if (type == 'plus') {
      let data = qty;
      if (data > 0) {
        data++;
      }
      setQty(data);
    }
  };

  const setValueState = (e, index) => {
    let items = state.items;
    items[index].value = e.target.value;
    setState({
      ...state,
      items,
    });
  };

  const setQtyState = (e, index) => {
    let items = state.items;
    items[index].qty = e.target.value;
    setState({
      ...state,
      items,
    });
  };

  const updateStateQty = (index, type) => {
    let items = state.items;
    let qty = items[index].qty;
    if (type == 'plus') {
      qty++;
    } else {
      if (qty == 1) {
        return;
      }
      qty--;
    }
    items[index].qty = qty;
    setState({
      ...state,
      items,
    });
  };

  const addToState = () => {
    let items = state.items;
    items.push({
      label: '',
      value: 1,
      qty: 1,
    });
    setState({
      ...state,
      items,
    });
  };

  const removeToState = (index) => {
    let items = state.items;
    items.splice(index, 1);
    setState({
      ...state,
      items,
    });
  };

  const addToCartWithOptions = async () => {
    if (productOptions.length == 0) {
      if (!isAuthenticated) {
        let cardId = Cookies.get('cardId');
        let advanceQuantity = [];
        state.items.forEach((element) => {
          advanceQuantity.push({
            data: {
              qty: element.qty,
              length: element.value,
            },
          });
        });
        try {
          const result = await api.post(`/guest-carts/${cardId}/items`, {
            cartItem: {
              quote_id: cardId,
              sku: data.sku,
              qty: qty,
              product_option: {
                extension_attributes: {
                  advanced_quantity: advanceQuantity,
                },
              },
            },
          });
          location.reload();
        } catch (error) {
          throw error;
        }
        return;
      } else {
        try {
          const result = await api.post('service/carts/mine/items', {
            cartItem: {
              sku: data.sku,
              qty: qty,
              product_option: {
                extension_attributes: {
                  advanced_quantity: advanceQuantity,
                },
              },
            },
          });
          location.reload();
        } catch (error) {
          throw error;
        }
        return;
      }
    }
    if (!canAddToCart) {
      alert('Hãy chọn hết Phân loại sản phẩm');
      return;
    }
    let currentProduct = currentChildProducts.items[0];
    let options = [];
    Object.keys(choisingOptions).forEach(function (option) {
      options.push({
        option_id: option,
        option_value: choisingOptions[option],
      });
    });
    let advanceQuantity = [];
    state.items.forEach((element) => {
      advanceQuantity.push({
        data: {
          qty: element.qty,
          length: element.value,
        },
      });
    });
    if (isAuthenticated && currentProduct) {
      try {
        const result = await api.post('service/carts/mine/items', {
          cartItem: {
            sku: data.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                advanced_quantity: advanceQuantity,
              },
            },
          },
        });
        location.reload();
      } catch (error) {
        throw error;
      }
    } else if (!isAuthenticated && currentProduct) {
      let cardId = Cookies.get('cardId');
      try {
        const result = await api.post(`/guest-carts/${cardId}/items`, {
          cartItem: {
            quote_id: cardId,
            sku: data.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                advanced_quantity: advanceQuantity,
              },
            },
          },
        });
        location.reload();
      } catch (error) {
        throw error;
      }
    }
  };

  const checkoutWithOptions = async () => {
    if (productOptions.length == 0) {
      if (!isAuthenticated) {
        let cardId = Cookies.get('cardId');
        let advanceQuantity = [];
        state.items.forEach((element) => {
          advanceQuantity.push({
            data: {
              qty: element.qty,
              length: element.value,
            },
          });
        });
        try {
          const result = await api.post(`/guest-carts/${cardId}/items`, {
            cartItem: {
              quote_id: cardId,
              sku: data.sku,
              qty: qty,
              product_option: {
                extension_attributes: {
                  advanced_quantity: advanceQuantity,
                },
              },
            },
          });
          router.push('/checkout');
        } catch (error) {
          throw error;
        }
        return;
      } else {
        try {
          const result = await api.post('service/carts/mine/items', {
            cartItem: {
              sku: data.sku,
              qty: qty,
              product_option: {
                extension_attributes: {
                  advanced_quantity: advanceQuantity,
                },
              },
            },
          });
          router.push('/checkout');
        } catch (error) {
          throw error;
        }
        return;
      }
    }
    if (!canAddToCart) {
      alert('Hãy chọn hết Phân loại sản phẩm');
      return;
    }
    let currentProduct = currentChildProducts.items[0];
    let options = [];
    Object.keys(choisingOptions).forEach(function (option) {
      options.push({
        option_id: option,
        option_value: choisingOptions[option],
      });
    });
    let advanceQuantity = [];
    state.items.forEach((element) => {
      advanceQuantity.push({
        data: {
          qty: element.qty,
          length: element.value,
        },
      });
    });
    if (isAuthenticated && currentProduct) {
      try {
        const result = await api.post('service/carts/mine/items', {
          cartItem: {
            sku: data.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                advanced_quantity: advanceQuantity,
              },
            },
          },
        });
      } catch (error) {
        throw error;
      }
      window.location.href = '/checkout';
    } else if (!isAuthenticated && currentProduct) {
      let cardId = Cookies.get('cardId');
      try {
        const result = await api.post(`/guest-carts/${cardId}/items`, {
          cartItem: {
            quote_id: cardId,
            sku: data.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                advanced_quantity: advanceQuantity,
              },
            },
          },
        });
      } catch (error) {
        throw error;
      }
      window.location.href = '/checkout';
    }
  };

  const setOpenChatBox = () => {
    const elements = document.getElementsByClassName('widget-container widget-container--right');
    if (elements[0]) {
      elements[0].classList.remove('widget-container--hide');
      document.body.classList.add('showModal');
      let closeElements = Array.from(document.getElementsByClassName('widget-header--button widget-header--button-close'));
      closeElements.forEach((element) => {
        element.addEventListener('click', function () {
          elements[0].classList.add('widget-container--hide');
          document.body.classList.remove('showModal');
        });
      });
    }
  };

  return (
    <LayoutProductDetailMobile data={data}>
      <StyleDetail />
      <Head>
        <title>{data.name}</title>
        {data.custom_attributes.map((data, index) => {
          if (data.attribute_code !== null) {
            switch (data.attribute_code) {
              case 'short_description':
                return <meta key={index} name='description' content={data.value} />;
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
        <meta property='og:title' content={data.name} itemProp='headline' />
        {data.custom_attributes.map((data, index) => {
          if (data.attribute_code !== null) {
            switch (data.attribute_code) {
              case 'short_description':
                return <meta property='og:description' key={index} name='description' content={data.value} />;
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
      </Head>
      <main id='main' className='page-product-detail'>
        <SimpleMobileSlider data={data.media_gallery_entries}></SimpleMobileSlider>

        <div className='pd-15 line-bottom'>
          {data.extension_attributes && data.extension_attributes.brand && (
            <div className='mb-10'>
              {t('Brands')}
              <Link href={`/${category.path}?brand=${brandID}&page=1`}>
                <span className='cl1 b'>{data.extension_attributes.brand.name}</span>
              </Link>
            </div>
          )}
          <h1 className='h3'>{data.name}</h1>
          <div className='toggleAutoHeightCss-2 mb-20'>
            <input type='checkbox' id='toggleAutoHeightCss-3' />
            <label className='tgh-toggle' htmlFor='toggleAutoHeightCss-3'>
              <span className='m'> Xem thêm</span>
              <span className='l'> Thu gọn</span>
            </label>
            <div className='tgh-content'>
              <>
                {data.custom_attributes.map((values) => {
                  if (values.attribute_code !== null) {
                    switch (values.attribute_code) {
                      case 'short_description':
                        return ReactHtmlParser(values.value);
                      default:
                        return null;
                    }
                  } else {
                    return null;
                  }
                })}
              </>
            </div>
          </div>
          <br />

          <div className='ratingresult mb-10'>
            <ShowStar rating={data.extension_attributes.review.review_summary[0].rating_summary != null ? data.extension_attributes.review.review_summary[0].rating_summary : '0'} />
          </div>
          <div className='price-group'>
            <span className='price'>
              {formatVND(finalPrice + plus)} <span className='underline'>{data.extension_attributes.price_group[0].price_unit_text ? data.extension_attributes.price_group[0].price_unit_text : 'đ'}</span>
            </span>
            {parseInt(data.price) !== 0 && parseInt(data.price) != parseInt(data.extension_attributes.pricing.final_price) && (
              <>
                <span className='price-old'>
                  {formatVND(parseInt(data.price) + plus)} {data.extension_attributes.price_group[0].price_unit_text ? data.extension_attributes.price_group[0].price_unit_text : 'đ'}
                </span>
                <span className='off'>{`-${parseInt(100 - parseInt(finalPrice / data.price) * 100)}%`}</span>
              </>
            )}
            <span className={`btnlike ${isInWishlist ? 'active' : ''}`} onClick={() => handleWishlist()}>
              {' '}
              <i className='icon-like'></i>{' '}
            </span>
          </div>
        </div>

        {/* ------------------------------ Ưu đãi từ Hoa Sen Group --------------------------------- */}
        {commonData && <WidgetMobile commonData={commonData} />}

        {/* ------------------------------ Thông tin chung / Thông tin sản phẩm --------------------------------- */}

        <SummaryInfo brandID={brandID} data={data.custom_attributes} category={category} brand={data.extension_attributes.brand ? data.extension_attributes.brand : null} />

        <DetailInfo data={data.custom_attributes} extensionAttributes={data.extension_attributes} productId={data.id} commonData={commonData} category={category} brand={data.extension_attributes.brand ? data.extension_attributes.brand : null} />

        {commonData && commonData.questions && <QuestionMobile productId={data.id} commonData={commonData} />}
      </main>

      <div className='action-detail'>
        <a className='item item-3' id='buynow'>
          Mua ngay
        </a>
      </div>
    </LayoutProductDetailMobile>
  );
}

function getCookie(cname, cookie) {
  var name = cname + '=';
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
  return '';
}

// This gets called on every request
export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  let data = null;
  let configPrice = null;
  api.defaults.headers['X-Requested-Details'] = true;
  let isReviewError = false;
  let reviewMessageError = '';
  let cookie = context.req.headers.cookie;
  let reviewParam = getCookie(`reviewParam`, cookie);

  if (reviewParam && reviewParam.length != 0) {
    api.defaults.headers['Cookie'] = `PHPSESSID=${getCookie('PHPSESSID', cookie)}`;
    api.defaults.headers['Authorization'] = getCookie(`token`, cookie);
    try {
      const result = await api.post('service/product/review/behavior' + encodeURI(reviewParam));
      if (result.data[0].errors) {
        isReviewError = true;
        reviewMessageError = result.data[0].message;
      }
    } catch (error) {
      isReviewError = true;
      reviewMessageError = error.response.data.message;
    }
  }
  let query = '';
  context.query.id.forEach((element) => {
    query += element + '*';
  });
  try {
    const result = await api.get(`service/rewrite/entity/${query}`);
    data = result.data.product;
    configPrice = result.data.config ? result.data.config[0] : null;
  } catch (error) {
    throw error;
  }
  api.defaults.headers['X-Requested-Details'] = false;
  let optionPrice = {};
  let productOptions = [];
  let productVarients = [];

  if (data && data.extension_attributes && data.extension_attributes.configurable_config && data.extension_attributes.configurable_product_options) {
    optionPrice = data.extension_attributes.configurable_config.option_prices[0];
    productOptions = data.extension_attributes.configurable_product_options;
    productVarients = data.extension_attributes.configurable_config.index[0];
  }
  let priceGroup = data.extension_attributes.price_group[0] || null;
  let category = data.extension_attributes.category || null;
  return { props: { isMobile, data, optionPrice, productOptions, productVarients, isReviewError, reviewMessageError, configPrice, priceGroup, category } };
}

export default ProductDetail;
