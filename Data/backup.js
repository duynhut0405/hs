import Layout from '../components/Desktop/Layout';
import api from '../services/api';
import BreadCrumb from '../components/Desktop/Common/BreadCrumb';
import React, { useEffect, useState } from 'react';
import AsNavFor from '../components/Desktop/Carosels/AsNavFor';
import SimpleMobileSlider from '../components/Desktop/Carosels/SimpleMobileSlider';
import t from '../translation';
import ReactHtmlParser from 'react-html-parser';
import ShowStar from '../components/Desktop/Review/ShowStar';
import formatVND from '../utils/formatVND';
import ProductLink from '../components/Desktop/Products/ProductsLink';
import Widget from '../components/Desktop/Products/Widget';
import WidgetMobile from '../components/Mobile/ProductDetail/WidgetMobile';
import CategoryProducts from '../components/Desktop/Products/CategoryProducts';
import ProductsRender from '../components/Desktop/Products/ProductsRender';
import { useAuth } from '../contexts/auth';
import AsNavForChild from '../components/Desktop/Carosels/AsNavForChild';
import IsMobile from '../utils/detectMobile';
import LayoutProductDetailMobile from '../components/Mobile/ProductDetail/LayoutProductDetailMobile';
import Cookies from 'js-cookie';
import Modal from 'react-bootstrap/Modal';
import ProductSlide from '../components/Mobile/ProductDetail/ProductSlide';
import SummaryInfo from '../components/Mobile/ProductDetail/SummaryInfo';
import DetailInfo from '../components/Mobile/ProductDetail/DetailInfo';
import CustomerReview from '../components/Mobile/ProductDetail/CustomerReview';
import QuestionMobile from '../components/Mobile/ProductDetail/QuestionMobile';
import ViewedProductMobile from '../components/Mobile/Common/ViewedProductMobile';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoginModal from '../components/Desktop/Common/LoginModal';
import Head from 'next/head';
import { element } from 'prop-types';
import { useCommon } from '../contexts/common';
import { useCurrentCategory } from '../contexts/currentCategory';
import { HuePicker } from 'react-color';
import SuggestColor from '../utils/suggestColor';
import ToggleHeightContent from '../components/Core/ToggleHeightContent';
import StripHtmlTag from '../utils/stripHtmlTag';
import FourOhFour from '../pages/404';
import Axios from 'axios';
const newApiFCM = Axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: 'bearer dxxfgvmg8dps2af7m0soo7iyehfx8d23',
  },
});

function ProductDetail({ statusCode, isMobile, data, optionPrice, productOptions, productVarients, isReviewError, reviewMessageError, configPrice, priceGroup, category }) {
  const [finalPrice, SetFinalPrice] = useState(data?.extension_attributes?.pricing?.final_price);
  const [basePrice, SetBasePrice] = useState(data?.extension_attributes?.pricing?.regular_price);
  const [qty, setQty] = useState(1);
  const [square, setSquare] = useState(1);
  const [qtyBrick, setQtyBrick] = useState(1);
  const [currentOptions, setCurrentOptions] = useState(null);
  const { isAuthenticated, getWishlist, wishlist, setOpenModal, setGetCartAgain, getCartAgain } = useAuth();
  const { setCategory } = useCurrentCategory();
  const [isLoading, setIsLoading] = useState(false);
  const [isInWishlist, setInWishlist] = useState(false);
  const [currentChildProducts, setCurrentChildProducts] = useState({ items: [] });
  const [choisingOptions, setChosingOptions] = useState({});
  const [canAddToCart, setAddToCart] = useState(false);
  const [childImages, setImagesList] = useState(null);
  const [currentWishlistItem, setCurrentWishlist] = useState(null);
  const [modalText, setModalText] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalTonShow, setModalShowTon] = useState(false);
  const router = useRouter();
  const [plus, setPlus] = useState(0);
  const [media, setMedia] = useState(null);
  const [unit, setUnit] = useState('đ');
  const { locationData } = useCommon();
  const [rate, setRate] = useState(1);
  const [state, setState] = useState({
    items: [
      {
        value: 1,
        qty: 1,
      },
    ],
  });
  const [optionPriceClient, setOptionPriceClient] = useState(optionPrice);
  const [exchangeBrick, setExchangeBrick] = useState(null);
  const [commonData, setCommonData] = useState(null);
  const [brandID, setBrandID] = useState(0);
  const [color, setColor] = useState(null);
  const [paintColor, setPaintColor] = useState({ hex: '#88ff00', hsl: { h: 88.05405405405406, s: 1, l: 0.5, a: 1 }, hsv: { h: 88.05405405405406, s: 1, v: 1, a: 1 }, oldHue: 88.05405405405405, rgb: { r: 136, g: 255, b: 0, a: 1 } });
  const [productPaintColor, setProductPaintColor] = useState({ color: '', id: '', label: '' });
  const [suggestColorList, setSuggestColorList] = useState(null);
  const [typeAllColor, setTypeAllColor] = useState('all');
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);
  const [qtyBrickExchange, setQtyBrickExchange] = useState(1);

  const handleTypeColorSelect = async (value) => {
    setTypeAllColor(value);
    if (value == 'white') {
      await handleChangeColor({ hex: '#FFFFFF' });
    } else if (value == 'black') {
      await handleChangeColor({ hex: '#111111' });
    }
  };

  useEffect(() => {
    setModalShowTon(false);
    if (data?.extension_attributes?.category_links[0]?.category_id) {
      setCategory(data?.extension_attributes.category_links[0].category_id);

      const index = data?.custom_attributes.findIndex((item) => item.attribute_code === 'h3d_product_url');
      const mediaProps = JSON.parse(JSON.stringify(data?.media_gallery_entries));
      if (index !== -1) {
        mediaProps.push({
          media_type: '3D',
          link: data?.custom_attributes[index].value,
        });
      }

      setMedia(mediaProps);
    }
  }, [router]);

  useEffect(() => {
    if (!isLoading && getCartAgain) {
      setModalText('Đã thêm vào giỏ hàng');
      setModalShow(true);
    }
  }, [isLoading, getCartAgain]);

  useEffect(() => {
    //tinh lai gia
    SetFinalPrice(data?.extension_attributes.pricing.final_price);
    SetBasePrice(data?.extension_attributes.pricing.regular_price);

    if (data?.extension_attributes.colors) {
      handleChangeColor({ hex: '#88ff00' });
    }
  }, [data?.name]);

  useEffect(async () => {
    if (locationData && locationData.city.value) {
      let cityId = locationData.city.value;
      let allProductIds = [];
      let allProductIdString = '';
      Object.keys(optionPrice)?.forEach((key) => {
        if (optionPrice[key].final_price && optionPrice[key].regular_price) {
          allProductIds.push(key);
          allProductIdString += key + ',';
        }
      });
      console.log(allProductIdString, 'data', data);

      if (allProductIdString != '') {
        try {
          const result = await api.get(`service/product-information?city=${cityId}&product_ids=${allProductIdString}`);
          setOptionPriceClient(result.data[0]);
          let productList = result.data[0];
          let currentPriceKey = Object.keys(productList)[0];
          if (productOptions && productOptions?.length == 1 && productOptions[0].values?.length == 1) {
            SetFinalPrice(productList[currentPriceKey].final_price);
            SetBasePrice(productList[currentPriceKey].regular_price);
            return;
          }
          Object.keys(productList)?.forEach((key) => {
            if (productList.currentPriceKey.final_price > productList[key].final_price) {
              currentPriceKey = key;
            }
          });
          // lấy giá ban đầu khi call
          SetFinalPrice(productList.currentPriceKey.final_price);
          SetBasePrice(productList.currentPriceKey.regular_price);
        } catch (error) {
          console.log(error);
        }
      }
      if (productVarients?.length == 0) {
        try {
          const result = await api.get(`service/product-information?city=${cityId}&product_ids=${data?.id}`);
          setOptionPriceClient(result.data[0]);
          let productList = result.data[0];
          // lấy giá ban đầu khi call
          SetFinalPrice(productList[currentPriceKey].final_price);
          SetBasePrice(productList[currentPriceKey].regular_price);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setOptionPriceClient(optionPrice);
      SetFinalPrice(data?.extension_attributes.pricing.final_price);
      SetBasePrice(data?.extension_attributes.pricing.regular_price);
    }
  }, [locationData, optionPrice, data?.name]);

  useEffect(() => {
    //tinh so luong gach mua
    if (qtyBrick != 1 && (unit != '₫/m²' || unit != '₫/M2')) {
      let index = qtyBrick;
      if (square >= qtyBrick) {
        index = Math.ceil(square / qtyBrick) * qtyBrick;
      }
      setQtyBrickExchange(index);
      setQty(square);
    }
  }, [square, qtyBrick, unit]);

  useEffect(() => {
    //set default gia tri cho filter option
    if (productOptions && productOptions?.length == 1 && productOptions[0].values?.length == 1) {
      Object.keys(productVarients)?.forEach(function (key) {
        const filters = Array.from(document.getElementsByClassName('filter-option'));
        let res = {};
        if (filters && filters[0]) {
          Object.keys(productVarients)?.forEach(function (productId) {
            setCurrentChildProducts({ items: [productId] });
            filters[0].value = productOptions[0].values[0].value_index;
            res = productVarients[productId];
          });
          setChosingOptions(res);
        }
      });
    }
  }, [currentOptions]);

  const saveViewedProduct = async () => {
    if (typeof window !== 'undefined') {
      let res2 = data?.custom_attributes.find((element) => element.attribute_code && element.attribute_code == 'code_main_color');
      let obj = {
        id: data?.id,
        // price: data?.extension_attributes.pricing.final_price,
        regular_price: data?.price,
        final_price: data?.extension_attributes.pricing.final_price,
        basePrice: data?.price,
        image: data?.media_gallery_entries[0] ? data?.media_gallery_entries[0].file : null,
        url: data?.extension_attributes.request_path,
        review: data?.extension_attributes.review.review_summary[0].rating_summary,
        name: data?.name,
        priceGroup: priceGroup,
        color: res2 ? res2.value : null,
      };
      let points = [];
      if (localStorage.getItem('viewed')) {
        points = JSON.parse(localStorage.getItem('viewed'));
        const found = points.find((element) => element.id == data?.id);
        if (found != undefined) {
          return;
        }
        if (points?.length == 6) {
          points.pop();
          points.unshift(obj);
          // console.log(points);
          localStorage.setItem('viewed', JSON.stringify(points));
          return;
        }
      }
      points.push(obj);
      localStorage.setItem('viewed', JSON.stringify(points));
    }
  };

  useEffect(() => {
    if (data?.custom_attributes) {
      let brand = data?.custom_attributes.find((element) => element.attribute_code && element.attribute_code == 'brand');
      if (brand) setBrandID(brand.value);
      let res = data?.custom_attributes.find((element) => element.attribute_code && element.attribute_code == 'exchange_brick');
      if (res) setExchangeBrick(res.value);
      let qtyBrickData = data?.custom_attributes.find((element) => element.attribute_code && element.attribute_code == 'quantity_brick');
      if (qtyBrickData) setQtyBrick(parseInt(qtyBrickData.value));
      let res3 = data?.custom_attributes.find((element) => element.attribute_code && element.attribute_code == 'color_ton');
      if (res3) setColor(res3.value);
    }
  }, [data?.custom_attributes]);

  useEffect(() => {
    if (data) {
      setUnit(data?.extension_attributes.price_group[0].price_unit_text);
    }
  }, [data?.name]);

  useEffect(() => {
    if (Object.keys(choisingOptions)?.length == productOptions?.length) {
      setAddToCart(true);
    } else {
      setAddToCart(false);
    }
  }, [choisingOptions]);

  useEffect(() => {
    if (optionPriceClient && currentChildProducts.items?.length > 0 && optionPriceClient[currentChildProducts.items[0]]) {
      let lowestPrice = optionPriceClient[currentChildProducts.items[0]].final_price;
      currentChildProducts.items?.forEach((item) => {
        if (optionPriceClient[item].final_price < lowestPrice) {
          lowestPrice = optionPriceClient[item].final_price;
        }
      });
      let productIds = currentChildProducts.items;
      let images = data?.extension_attributes.configurable_config.images[0];
      if (images && Object.keys(images)?.length > 0) {
        productIds?.forEach((element) => {
          setImagesList(images[element]);
        });
      } else {
        setImagesList(null);
      }
    }
  }, [currentChildProducts.items, optionPriceClient]);

  // Lựa chọn option
  const handleOption = (e, index) => {
    const filters = Array.from(document.getElementsByClassName('filter-option'));
    const res = {};
    filters?.forEach((element, i) => {
      if (i == index + 1 && index != productOptions?.length - 1) {
        element.disabled = false;
        element.value = 'reset';
      }
      if (i > index + 1 && index != productOptions?.length - 1) {
        element.disabled = true;
        element.value = 'reset';
      }
      if (element.value != 'reset') {
        res[element.name] = element.value;
      }
    });
    setChosingOptions(res);

    if (e.target.value != 'reset') {
      if (currentOptions.values?.length - 1 == index) {
        Object.keys(productVarients)?.forEach(function (productId) {
          if (JSON.stringify(productVarients[productId]) === JSON.stringify(res)) {
            if (optionPriceClient[productId].final_price) SetFinalPrice(optionPriceClient[productId].final_price);
            if (optionPriceClient[productId].regular_price) SetBasePrice(optionPriceClient[productId].regular_price);
            if (data?.extension_attributes?.configurable_config?.group_prices[0]) {
              setUnit(data?.extension_attributes.configurable_config.group_prices[0][productId].price_unit_text);
            }
            setCurrentChildProducts({ items: [productId] });
          }
        });
        return;
      }

      let initOptions = data?.extension_attributes.configurable_product_options;
      let attributeId = currentOptions.values[index].attribute_id;
      let nextAtributeId = currentOptions.values[index + 1].attribute_id;
      let atrributeIdValue = e.target.value;
      let currentNextOptions = initOptions[index + 1].values;

      for (let i = index; i < productOptions?.length; i++) {
        if (productOptions[i + 1]) {
          delete res[productOptions[i + 1].attribute_id];
        }
      }

      let newValidProducts = [];
      Object.keys(productVarients)?.forEach(function (productId) {
        let product = productVarients[productId];
        let isPush = true;

        Object.keys(res)?.forEach(function (resKey) {
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
      newValidProducts?.forEach((element) => {
        if (productVarients[element][attributeId] == atrributeIdValue) {
          if (!validNextOptions.includes(productVarients[element][nextAtributeId])) {
            validNextOptions.push(productVarients[element][nextAtributeId]);
          }
        }
      });

      // Tạo options mới cho filter tiếp theo
      let nextOptions = [];
      validNextOptions?.forEach((valueIndex) => {
        currentNextOptions?.forEach((element) => {
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
      filterOptions?.forEach((element) => {
        element.selectedIndex = 0;
      });
      setChosingOptions({});
      resetFilter();
    }
  };

  // reset filters
  const resetFilter = () => {
    let options = productOptions;
    options?.forEach((element, index) => {
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
    if (data) {
      try {
        const result = await api.get(`service/product/${data?.id}/static-content`);
        setCommonData(result.data[0]);
      } catch (error) {
        throw error;
      }
    }
  }, []);

  useEffect(async () => {
    if (data) {
      await saveViewedProduct();
    }
  }, [data?.id]);

  useEffect(() => {
    if (wishlist) {
      const found = wishlist[0].find((element) => element.product_id == data?.id);
      if (found) {
        setInWishlist(true);
        setCurrentWishlist(found);
      } else {
        setInWishlist(false);
      }
    }
  }, [wishlist, data?.id]);

  const setFalseAll = async () => {
    const guestId = Cookies.get('cardId');
    const apibuyLatter = isAuthenticated ? `carts/mine/set-buy-latter` : `guest-carts/${guestId}/set-buy-latter`;
    const listItems = await api.get('carts/mine');
    if (listItems?.data?.items?.length !== 0) {
      const data_check = {};
      listItems.data.items.map(async (item) => {
        data_check[item.item_id] = false;
      });
      const result_setByLatter = await api.post(apibuyLatter, {
        data: JSON.stringify(data_check),
      });
    }
  };

  const handleWishlist = async () => {
    if (isAuthenticated) {
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
          productId: data?.id,
          buyRequest: {
            data: {
              productId: data?.id,
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
    setIsLoading(true);
    if (productOptions?.length == 0) {
      if (!isAuthenticated) {
        let cardId = Cookies.get('cardId');
        try {
          const dataLocal = {
            cartItem: {
              quote_id: cardId,
              sku: data?.sku,
              qty: qty,
              product_option: {
                ...(productPaintColor.id != '' && {
                  extension_attributes: {
                    paint_color: productPaintColor.id,
                  },
                  ...{
                    extension_attributes: {
                      is_buy_latter: false,
                    },
                  },
                }),
              },
            },
          };

          const result = await api.post(`/guest-carts/${cardId}/items`, dataLocal);
          setGetCartAgain(true);
          setIsLoading(false);
        } catch (error) {
          alert(error.response.data?.message);
          setIsLoading(false);
          return;
        }
        return;
      } else {
        try {
          const dataLocal = {
            cartItem: {
              sku: data?.sku,
              qty: qty,
              product_option: {
                ...(productPaintColor.id != '' && {
                  extension_attributes: {
                    paint_color: productPaintColor.id,
                  },
                }),
                ...{
                  extension_attributes: {
                    is_buy_latter: false,
                  },
                },
              },
            },
          };

          const result = await api.post('service/carts/mine/items', dataLocal);

          if (result) {
            const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
              cartId: result.data.quote_id,
            });
          }
          // location.reload();
          setGetCartAgain(true);
          setIsLoading(false);
        } catch (error) {
          console.log('🚀 ~ file: index.js ~ line 626 ~ addToCart ~ error', error);
          alert(error?.response?.data?.message);
          setIsLoading(false);
          return;
        }
        return;
      }
    }
    if (!canAddToCart) {
      alert('Hãy chọn hết Phân loại sản phẩm');
      setIsLoading(false);
      return;
    }
    let currentProduct = currentChildProducts.items[0];
    let options = [];
    Object.keys(choisingOptions)?.forEach(function (option) {
      options.push({
        option_id: option,
        option_value: choisingOptions[option],
      });
    });

    if (isAuthenticated && currentProduct) {
      try {
        const dataLocal = {
          cartItem: {
            sku: data?.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                ...(productPaintColor.id != '' && {
                  paint_color: productPaintColor.id,
                }),
                is_buy_latter: false,
              },
            },
          },
        };

        const result = await api.post('service/carts/mine/items', dataLocal);

        if (result) {
          const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
            cartId: result.data.quote_id,
          });
        }
        // location.reload();
        setGetCartAgain(true);
        setIsLoading(false);
      } catch (error) {
        alert(error.response.data?.message);
        setIsLoading(false);
        return;
      }
    } else if (!isAuthenticated && currentProduct) {
      let cardId = Cookies.get('cardId');
      try {
        const dataLocal = {
          cartItem: {
            quote_id: cardId,
            sku: data?.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                ...(productPaintColor.id != '' && {
                  paint_color: productPaintColor.id,
                }),
                is_buy_latter: false,
              },
            },
          },
        };

        const result = await api.post(`/guest-carts/${cardId}/items`, dataLocal);
        // location.reload();
        setGetCartAgain(true);
        setIsLoading(false);
      } catch (error) {
        alert(error.response.data?.message);
        setIsLoading(false);
        return;
      }
    }
  };

  const checkOut = async () => {
    setIsLoading(true);
    setFalseAll();
    if (productOptions?.length == 0) {
      if (!isAuthenticated) {
        let cardId = Cookies.get('cardId');
        try {
          const result = await api.post(`/guest-carts/${cardId}/items`, {
            cartItem: {
              quote_id: cardId,
              sku: data?.sku,
              qty: qty,
              product_option: {
                ...(productPaintColor.id != '' && {
                  extension_attributes: {
                    paint_color: productPaintColor.id,
                  },
                }),
                ...{
                  extension_attributes: {
                    is_buy_latter: false,
                  },
                },
              },
            },
          });
        } catch (error) {
          alert(error.response.data?.message);
          setIsLoading(false);
          return;
        }
      } else {
        try {
          const result = await api.post('service/carts/mine/items', {
            cartItem: {
              sku: data?.sku,
              qty: qty,
              product_option: {
                ...(productPaintColor.id != '' && {
                  extension_attributes: {
                    paint_color: productPaintColor.id,
                  },
                  ...{
                    extension_attributes: {
                      is_buy_latter: false,
                    },
                  },
                }),
              },
            },
          });

          if (result) {
            const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
              cartId: result.data.quote_id,
            });
          }
        } catch (error) {
          alert(error.response.data?.message);
          setIsLoading(false);
          return;
        }
      }
      router.push('/checkout');
    }
    if (!canAddToCart) {
      alert('Hãy chọn hết Phân loại sản phẩm');
      setIsLoading(false);
      return;
    }
    let currentProduct = currentChildProducts.items[0];
    let options = [];
    Object.keys(choisingOptions)?.forEach(function (option) {
      options.push({
        option_id: option,
        option_value: choisingOptions[option],
      });
    });

    if (isAuthenticated && currentProduct) {
      try {
        const result = await api.post('service/carts/mine/items', {
          cartItem: {
            sku: data?.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                ...(productPaintColor.id != '' && {
                  paint_color: productPaintColor.id,
                }),
                is_buy_latter: false,
              },
            },
          },
        });

        if (result) {
          const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
            cartId: result.data.quote_id,
          });
        }
      } catch (error) {
        alert(error.response.data?.message);
        setIsLoading(false);
        return;
      }
    } else if (!isAuthenticated && currentProduct) {
      let cardId = Cookies.get('cardId');
      try {
        const result = await api.post(`/guest-carts/${cardId}/items`, {
          cartItem: {
            quote_id: cardId,
            sku: data?.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                ...(productPaintColor.id != '' && {
                  paint_color: productPaintColor.id,
                }),
                is_buy_latter: false,
              },
            },
          },
        });
      } catch (error) {
        alert(error.response.data?.message);
        setIsLoading(false);
        return;
      }
    }
    router.push('/checkout');
  };

  const handleQty = (type) => {
    if (type == 'minus') {
      let data = qty;
      if (data > 1) {
        data--;
      }
      setQty(data);
    }
    if (type == 'plus') {
      let data = qty;
      data++;
      setQty(data);
    }
  };

  const handleSquare = (type) => {
    let data = square;
    if (type == 'minus') {
      if (data > 0) {
        data--;
      }
      setSquare(data);
    }
    if (type == 'plus') {
      if (data > 0) {
        data++;
      }
      setSquare(data);
    }
  };

  const setValueState = (e, index) => {
    let items = state.items;
    // let value = e.target.value.replace(/[^\d.-]/g, '');

    let value = e.target.value;
    let afterZero = value.split('.')[1];
    if (afterZero && afterZero?.length > 1) {
      return;
    }

    if (priceGroup.group === 'Dây cáp điện') {
      items[index].value = value > 100 ? 100 : value;
    } else {
      items[index].value = value > 10 && priceGroup.group_code != 'tube_plastic' ? 10 : value;
    }
    setState({
      ...state,
      items,
    });
  };

  const checkValueState = (e, index) => {
    let items = state.items;
    if (!e.target.value || e.target.value == 0) {
      items[index].value = 1;
      setState({
        ...state,
        items,
      });
    }
  };

  const setQtyState = (e, index) => {
    let items = state.items;
    items[index].qty = e.target.value > 999 ? 999 : e.target.value.replace(/\D/g, '');
    setState({
      ...state,
      items,
    });
  };

  const setQtyClient = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value > 999) {
      value = 999;
    }
    if (value == '0') {
      value = 1;
    }
    setQty(value);
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
    setIsLoading(true);
    if (productOptions?.length == 0) {
      if (!isAuthenticated) {
        let cardId = Cookies.get('cardId');
        let advanceQuantity = [];
        state.items?.forEach((element) => {
          advanceQuantity.push({
            data: {
              qty: element.qty,
              length: element.value,
            },
          });
        });
        try {
          const dataLocal = {
            cartItem: {
              quote_id: cardId,
              sku: data?.sku,
              qty: qty,
              product_option: {
                extension_attributes: {
                  advanced_quantity: advanceQuantity,
                  ...(productPaintColor.id != '' && {
                    paint_color: productPaintColor.id,
                  }),
                  is_buy_latter: false,
                },
              },
            },
          };
          const result = await api.post(`/guest-carts/${cardId}/items`, dataLocal);
          setGetCartAgain(true);
          setIsLoading(false);
        } catch (error) {
          alert(error.response.data?.message);
          setIsLoading(false);
          return;
        }
        return;
      } else {
        try {
          const dataLocal = {
            cartItem: {
              sku: data?.sku,
              qty: qty,
              product_option: {
                extension_attributes: {
                  advanced_quantity: advanceQuantity,
                  ...(productPaintColor.id != '' && {
                    paint_color: productPaintColor.id,
                  }),
                  is_buy_latter: false,
                },
              },
            },
          };
          const result = await api.post('service/carts/mine/items', dataLocal);

          if (result) {
            const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
              cartId: result.data.quote_id,
            });
          }
          // location.reload();
          setGetCartAgain(true);
          setIsLoading(false);
        } catch (error) {
          alert(error.response.data?.message);
          setIsLoading(false);
          return;
        }
        return;
      }
    }
    if (!canAddToCart) {
      alert('Hãy chọn hết Phân loại sản phẩm');
      setIsLoading(false);
      return;
    }
    let currentProduct = currentChildProducts.items[0];
    let options = [];
    Object.keys(choisingOptions)?.forEach(function (option) {
      options.push({
        option_id: option,
        option_value: choisingOptions[option],
      });
    });
    let advanceQuantity = [];
    state.items?.forEach((element) => {
      advanceQuantity.push({
        data: {
          qty: element.qty,
          length: element.value,
        },
      });
    });
    if (isAuthenticated && currentProduct) {
      try {
        const dataLocal = {
          cartItem: {
            sku: data?.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                advanced_quantity: advanceQuantity,
                ...(productPaintColor.id != '' && {
                  paint_color: productPaintColor.id,
                }),
                is_buy_latter: false,
              },
            },
          },
        };

        const result = await api.post('service/carts/mine/items', dataLocal);

        if (result) {
          const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
            cartId: result.data.quote_id,
          });
        }
        // location.reload();
        setGetCartAgain(true);
        setIsLoading(false);
      } catch (error) {
        alert(error.response.data?.message);
        setIsLoading(false);
        return;
      }
    } else if (!isAuthenticated && currentProduct) {
      let cardId = Cookies.get('cardId');
      try {
        const dataLocal = {
          cartItem: {
            quote_id: cardId,
            sku: data?.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                advanced_quantity: advanceQuantity,
                ...(productPaintColor.id != '' && {
                  paint_color: productPaintColor.id,
                }),
                is_buy_latter: false,
              },
            },
          },
        };

        const result = await api.post(`/guest-carts/${cardId}/items`, dataLocal);
        setGetCartAgain(true);
        setIsLoading(false);
      } catch (error) {
        alert(error.response.data?.message);
        setIsLoading(false);
        return;
      }
    }
  };

  const handleChangeColor = async (color) => {
    setPaintColor(color);
    const result = await SuggestColor(color.hex, data?.extension_attributes.colors);
    if (result) {
      setSuggestColorList(result);
      if (firstTimeLoad) {
        setProductPaintColor({ color: result[0].color, id: result[0].id, label: result[0].label });
        setFirstTimeLoad(false);
      }
    }
  };

  const checkoutWithOptions = async () => {
    setIsLoading(true);
    setFalseAll();
    if (productOptions?.length == 0) {
      if (!isAuthenticated) {
        let cardId = Cookies.get('cardId');
        let advanceQuantity = [];
        state.items?.forEach((element) => {
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
              sku: data?.sku,
              qty: qty,
              product_option: {
                extension_attributes: {
                  advanced_quantity: advanceQuantity,
                  ...(productPaintColor.id != '' && {
                    paint_color: productPaintColor.id,
                  }),
                  is_buy_latter: false,
                },
              },
            },
          });
          router.push('/checkout');
        } catch (error) {
          alert(error.response.data?.message);
          setIsLoading(false);
          return;
        }
        return;
      } else {
        try {
          const result = await api.post('service/carts/mine/items', {
            cartItem: {
              sku: data?.sku,
              qty: qty,
              product_option: {
                extension_attributes: {
                  advanced_quantity: advanceQuantity,
                  ...(productPaintColor.id != '' && {
                    paint_color: productPaintColor.id,
                  }),
                  is_buy_latter: false,
                },
              },
            },
          });

          if (result) {
            const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
              cartId: result.data.quote_id,
            });
          }
          router.push('/checkout');
        } catch (error) {
          alert(error.response.data?.message);
          setIsLoading(false);
          return;
        }
        return;
      }
    }
    if (!canAddToCart) {
      alert('Hãy chọn hết Phân loại sản phẩm');
      setIsLoading(false);
      return;
    }
    let currentProduct = currentChildProducts.items[0];
    let options = [];
    Object.keys(choisingOptions)?.forEach(function (option) {
      options.push({
        option_id: option,
        option_value: choisingOptions[option],
      });
    });
    let advanceQuantity = [];
    state.items?.forEach((element) => {
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
            sku: data?.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                advanced_quantity: advanceQuantity,
                ...(productPaintColor.id != '' && {
                  paint_color: productPaintColor.id,
                }),
                is_buy_latter: false,
              },
            },
          },
        });

        if (result) {
          const result2 = await newApiFCM.post(`notification/updateCartReminderFlag`, {
            cartId: result.data.quote_id,
          });
        }
      } catch (error) {
        alert(error.response.data?.message);
        setIsLoading(false);
        return;
      }
      window.location.href = '/checkout';
    } else if (!isAuthenticated && currentProduct) {
      let cardId = Cookies.get('cardId');
      try {
        const result = await api.post(`/guest-carts/${cardId}/items`, {
          cartItem: {
            quote_id: cardId,
            sku: data?.sku,
            qty: qty,
            product_option: {
              extension_attributes: {
                configurable_item_options: options,
                advanced_quantity: advanceQuantity,
                ...(productPaintColor.id != '' && {
                  paint_color: productPaintColor.id,
                }),
                is_buy_latter: false,
              },
            },
          },
        });
      } catch (error) {
        alert(error.response.data?.message);
        setIsLoading(false);
        return;
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
      closeElements?.forEach((element) => {
        element.addEventListener('click', function () {
          elements[0].classList.add('widget-container--hide');
          document.body.classList.remove('showModal');
        });
      });
    }
  };
  if (statusCode == 404) {
    return <FourOhFour />;
  }
  return isMobile ? (
    <LayoutProductDetailMobile data={data}>
      <Head>
        <link rel='stylesheet' href='/customCss/main.css' type='text/css' media='all' />
        <title>{data?.name}</title>
        <meta property='og:image' content={data?.media_gallery_entries[0]?.file ? `${(process.env.DOMAIN_IMAGE + 'catalog/product/' + data?.media_gallery_entries[0].file).replace('product//', 'product/')}` : '/images/banner.jpg'} />
        <meta
          property='og:image'
          itemProp='thumbnailUrl'
          content={data?.media_gallery_entries[0]?.file ? `${(process.env.DOMAIN_IMAGE + 'catalog/product/' + data?.media_gallery_entries[0].file).replace('product//', 'product/')}` : '/images/banner.jpg'}
        />
        <meta property='og:image:secure_url' content={data?.media_gallery_entries[0]?.file ? `${(process.env.DOMAIN_IMAGE + 'catalog/product/' + data?.media_gallery_entries[0].file).replace('product//', 'product/')}` : '/images/banner.jpg'} />
        {data?.custom_attributes.map((data, index) => {
          if (data?.attribute_code !== null) {
            switch (data?.attribute_code) {
              case 'short_description':
                return <meta key={index} name='description' content={StripHtmlTag(data?.value)} />;
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
        <meta property='og:title' content={data?.name} itemProp='headline' />
        {data?.custom_attributes.map((data, index) => {
          if (data?.attribute_code !== null) {
            switch (data?.attribute_code) {
              case 'short_description':
                return <meta property='og:description' key={index} name='description' content={StripHtmlTag(data?.value)} />;
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
      </Head>
      <main id='main' className='page-product-detail'>
        {media && <SimpleMobileSlider promotion={data?.extension_attributes?.promo_banners[0]} data={media}></SimpleMobileSlider>}
        <div className='pd-15 line-bottom'>
          {data?.extension_attributes && data?.extension_attributes.brand && (
            <div className='mb-10'>
              {t('Brands')}
              <Link href={`/${category.path}?brand=${brandID}&page=1`}>
                <span className='cl1 b'> {data?.extension_attributes.brand.name}</span>
              </Link>
            </div>
          )}
          <h1 className='h3'>{data?.name}</h1>
          <>
            {data?.custom_attributes.map((values, index) => {
              if (values.attribute_code !== null) {
                switch (values.attribute_code) {
                  case 'short_description':
                    return (
                      <ToggleHeightContent key={index} id='sort' height='100' more='left'>
                        {ReactHtmlParser(values.value)}
                      </ToggleHeightContent>
                    );
                  default:
                    return null;
                }
              } else {
                return null;
              }
            })}
          </>
          <div className='ratingresult mb-10'>
            <ShowStar rating={data?.extension_attributes.review.review_summary[0].rating_summary != null ? data?.extension_attributes.review.review_summary[0].rating_summary : '0'} />
          </div>
          <div className='price-group'>
            <span className='price red'>
              {formatVND((finalPrice + plus) * rate)} <span>{unit}</span>
            </span>
            {parseInt(basePrice) !== 0 && parseInt(basePrice) != parseInt(finalPrice) && (
              <>
                <span className='price-old'>{formatVND(basePrice)}</span>
                <span className='off red fs15'>{Math.round(((finalPrice - basePrice) / basePrice) * 100)} % </span>
              </>
            )}
            <span className={`btnlike ${isInWishlist ? 'active' : ''}`} onClick={() => handleWishlist()}>
              {' '}
              <i className='icon-like'></i>{' '}
            </span>
          </div>
        </div>
        {data?.extension_attributes && data?.extension_attributes.colors && (
          <div className='colorful box-shadow ' style={{ position: 'relative' }}>
            <img id='background-image' style={{ display: 'block' }} src={'/tool-bedroom/phong-ngu-03.jpg'} alt='' />
            <div id='container' style={{ position: 'absolute' }}>
              <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 1440 956'>
                <defs>
                  <clipPath id='clip-path'>
                    <rect className='cls-1' x='0.01' y='0.38' width='1440' height='956' />
                  </clipPath>
                </defs>
                <title>Phong-ngu-03</title>
                <g id='Layer_2' data-name='Layer 2'>
                  <g id='Layer_1-2' data-name='Layer 1'>
                    <g className='cls-2' style={{ fill: productPaintColor.color }}>
                      <path d='M233.44,547.25l26.5.5s-.25-1.25-3.25-1.62c-3.37-1.12-9.87-5-14.5-7.25s-13.37-8.25-16.5-13c-2-.25-4.37,2-6.5,3.13s-6.12,2-7.62,1.25l-1.87,2.38.38,1.88a2.49,2.49,0,0,1,2.5,1.25C214.56,536.25,228.06,537.13,233.44,547.25Z' />
                      <path d='M71.69,655.31c-1.87-.62-1-3.5-.56-4.25,5.38-2.5,6.19-.62,7.38.94a16,16,0,0,0,3.44,3.38c-3.19-11.69,1.29-19.52,1.29-19.52l-83.14.29L0,697.69l7.56.38.88-20.81-1.62-1.5L7,666.31c.31-1.19,3.06-2.5,18.69-4.25s37.56-.31,47.38.56S82.63,666,82.63,666s-.5,8.69-.5,9-1.81.5-1.81.5l-.19,9.88a97.35,97.35,0,0,1,13.44-1.19c-9.44-12.25-10.12-22.25-10.69-25.25C80.38,655.31,73.56,655.94,71.69,655.31Z' />
                      <path d='M89.88,649.06l-.69-13-3.81-.12s-.44,12.38,1,12.31C86.56,647.19,88.44,647.5,89.88,649.06Z' />
                      <path d='M109.63,635.69a18.38,18.38,0,0,1-1.56-3.69l-1.62.38a103.87,103.87,0,0,0,2.5,11.31c.94,2.75,3,16,3,16l1.94.44s-2.75-9.06-3.5-12.56S109.63,637.31,109.63,635.69Z' />
                      <path d='M122.88,621.25,119,622.56a21,21,0,0,1,.44,3.88c.19,2.75,1.25,7.88,1.25,7.88s1.06-1.62,2.25-3.31A47.74,47.74,0,0,1,122.88,621.25Z' />
                      <path d='M167.44,672.63s-4.25.88-5.37,3-4.62,8.63-4.62,8.63,3.88-.62,4.13,1-.25,15.13-.25,15.13l8.5.13S167.31,681.38,167.44,672.63Z' />
                      <path d='M166.19,647.88s-5.62,4.5-7.37,5.63l-2.5,5s1.5-.37,1.38.88a19.9,19.9,0,0,1-1.5,4.13l.25,4.25s6.88-10,10.13-13.5Z' />
                      <path d='M200.19,535.75c-2.62.38-15.87,3.25-30.87,12.75l37.25-.75-.5-5.5S202.06,536,200.19,535.75Z' />
                      <path d='M211.56,536.5l-1.87.88c-1.12,8.88,1,10.25,1,10.25l7-.12s-4.25-6-4.75-8.25S211.56,536.5,211.56,536.5Z' />
                      <polygon points='211.56 517.13 214.31 516.5 211.81 513.13 211.56 517.13' />
                      <path d='M209.69,508.88s-2.12-6-3-6.75c-1,1.63-.5,4.63,2.38,9.63Z' />
                      <path d='M202.56,474.13c-2.5-.87-7.37-.75-7.37-.75a24.22,24.22,0,0,0,6.5,3.5c3.88,1.38,9.5,6.88,10.75,10.25,0,0,.88-3.87-1.12-5.87S205.06,475,202.56,474.13Z' />
                      <path d='M.06,0s.27,496.52,0,496.76l10-1.14s11.49-2.57,13.49-3.19,5.12-2.35,6.75-2.85c2.13-.62,7.75-2,8.75-1.42s2.37,4.73,2.12,7.85-1.63,8.36-1.88,11.36-.5,8.74-2.25,13.37c-.62,2.13-1,7.87-1.13,9.75s-3.88,10.87-3.88,10.87,1.44,12.62.69,20.25c.88,1.25,2.31,8.5,2.31,8.5V563s1.5-1.62,5.88-1.87,44.75-1.12,51.25-.75,16.88.88,17.88,2.38V572a.91.91,0,0,1-.75,1.17l.54,26.33s5.94-.83,16.6,1.25c0,0,2.84-6.58,5.68-9.75a55.68,55.68,0,0,1,6.63-7.67c.5-.58,2.36-3.08,2.36-3.08a14.56,14.56,0,0,0-.65,3.17c.08.75.76,4.25-.24,6.17s-1.83,9.75-1.83,9.75a78.46,78.46,0,0,0,2.58-7.5,11.08,11.08,0,0,1,2.92-5.33A10.64,10.64,0,0,0,146,583s1.25.25-1,4.58c-.92,1.92-2.67,9.42-2.83,10.08s-1.42,4.75-.58,5.17c.83-1,3.58-4.92,3.58-4.92s.83-1.42,1.08-1.08.42,3.75-3.17,12.42a27,27,0,0,1-8,19.58c.08,1.5,1.58,7.08,1.17,10.42-1.08,2.75-2.5,8.75-2.17,12.25a9.2,9.2,0,0,1,1.75-3.58l.58,2.17s8.75-25.42,12.25-22.92c0,0,2.83-5.67,2.92-6.5a20.33,20.33,0,0,1,.58-4.67c.5-1.25,1.92-3.58,2.5-3.08s-2,6.92-1.83,7.58,1.33,10.5,1.33,10.5,2.25-.42,0,2.83c-.08,2.58-1.75,17-1.75,17s2.17-8.42,13.08-16.67c0,0-.42-34.67-.58-42.83s-2.17-41.33.17-41.83c0,0-2.83-3.17,6.5-9.75s18.08-6.42,26-5.08a21.06,21.06,0,0,1,4.42,1c1.17.58,3.08,3.5,4.5,4.33,0,0,.33-7,.42-9.83-1.25-1.83-3.58-6.58-5-7.25-1.75-.67-9.58-1.5-9.58-1.5s-12.83,5.5-15.75,6.67-4.83,2-6.67,1.92l-.83,2.42-.08-2.58s-3-1.58-3.25-2.92-.58-5.5,7.08-9.25,10.08-2.58,12.17-2.17,9.58,4.08,9.58,4.08,11.42-1.83,12.08,1.5c0,1-2.83,1.08-2.67,1.5s2.17,4.17,3.58,5.08l1.17-13.17A29.23,29.23,0,0,1,204,502.83a40.78,40.78,0,0,1-8.5-7.83,33.55,33.55,0,0,0-11.67-9.17,58.33,58.33,0,0,1-14.25-9,32,32,0,0,0-8.25,3.5c-3.42,1.75-9,4.25-11,7.25a2.63,2.63,0,0,0-.58-2.42c-.33-1.67.25-2.92,3.58-5.33s10.33-4.92,12.58-5.08c0,0-.17-1.75-4.25-2.75-.25-1.08,4.42.5,5.33.33s3.92-1.75,12.17-1.5c1.17-.75,3.83-3.92,17,.58,2.83.17,8.17.17,9,2.58,1.33,1.08,7.92,6.75,7.92,6.75s1.5-.92,2-14.25-.33-13.92-.33-13.92a53.22,53.22,0,0,1-11.08-8.25,62.94,62.94,0,0,1-8.5,1c-2.83,0-5.75-1-6.08,2.58-.67-2,.25-2.83-1.58-3.58s-5-1.67-6.58-6.42c-.67-2.42,5.33-3.92,8.92-3.5s8.92,1.25,8.92,1.25-3.92-12.75,9.58-17.08c0,0,1.25.25-6.83-8.58s-14.83-23.33-15.58-25.67-1.17-4.08.17-4.83a32.71,32.71,0,0,1,6.08.75c1.75.58,13.67,5.08,21.08,16.58s6.83,18.83,5.83,21.42a16.83,16.83,0,0,1,10.17,5.25c2.75-1.67,9.75-6.42,14.08-7.33,4.25-2,7.92-4.17,11.33-4.83,3.5-1.08,8.33-3.08,11.75-2.42,2.67-.33,6.67-.67,6.83,1.42a10.07,10.07,0,0,0-5.33.67,88,88,0,0,0-8.67,1.75c-3.08.92-13.83,4.5-15.5,5.42s-12.83,7.92-12.83,7.92,4,7.42-.42,13.83-12.33,11.83-12.33,11.83l-.75,18.42s.58.25,1.5-.5,8-5.58,12.42-4.42a28.82,28.82,0,0,1,11.92-1.5,41.66,41.66,0,0,1,17.67,1.67c6.5,2.17,9.58,1.67,9.83,7.42A12.64,12.64,0,0,1,272.4,476s-1.67-3.5-6.83-4.75a123.1,123.1,0,0,0-29.5-4.58c-6.42-.25-13.58-.5-19.08,6.08-.33,3.92-1.75,11.17-1.75,13s-.75,6,0,5.83,7-3.92,6.5-4.92-1.83-3.42-.83-3.83,5.92-1.33,14.75,0c8.75.92,17.5,2.17,21.92,4.42,5.33,1.25,16.17,4.83,18.83,7.33-.08.42-.75.42-.75.42a5.14,5.14,0,0,1,.92,2.67s-.42-2.67-4.75-4.08c-3.42-.25-16.58-1-21.33-1.42s-21.58-2.92-26.17-4.58c-1.17.08-8.17,5.17-9.17,7.42a15.78,15.78,0,0,0-.75,5.08,20.74,20.74,0,0,0,4.08.5c.83-.17,7.92-.48,10.75,4.68a19.41,19.41,0,0,1,1.91,11.07s12.92-4.17,19.08,2.42,10.92,11.25,12.33,14.83,3.42,9.25-1.5,12.67c-.67.42-.25,1.42-.25,1.42s12.67-.58,13.5,1.83c-.08,2.33-3,64.67-3,64.67s3.67-5.25,4.83-6.42,6.25-5.58,10.83-7.42c4.67-2.92,23.75-15.83,25.83-17.25s13.5-8.92,25.33-12.83c11.58-4.83,28.17-12.08,30.5-13.08s11.75-4.5,11.75-4.5-.08-105.17.17-113.17-.75-46.75-1.25-57-1.25-23.75,1.25-27c0,0,.12-2.77,5.49-3.45,5.51-.13,22.17.27,26.07-.13s19.35-1.75,25.26,3.09c1.88-3.09,7.12-4.43,13.71-4.43s12,.67,16.66.67,14.92-1.21,18.55,2.82c1.75-3.23,7.39-3.76,14.24-3.09,7.53,0,21,0,24.32.27s9.81,2,11.83,5.24c1.61-3.76,7.53-5.11,12.5-5.11s29,.4,30.51.67,6.58.81,7.93,3.23a6,6,0,0,1,5.11-3.9c4-.4,21.77.4,24.73.4s17.87-.4,22,4c0,0,1.48-3.23,8.87-3.49s29-.67,32.66,0a71.85,71.85,0,0,1,8.33,2.28s.54-2.55,6.32-3,31-.13,34-.13,9.68.94,11.29,3.49c0,0,1.21-3,6.32-3.36s22.71-1.07,26.21-.94,15.19.94,18.81,4c0,0,1.21-2.69,5.91-3.09s33.33-.54,36-.4,6.72,1.61,8.06,3a7.21,7.21,0,0,1,5.91-3.09c4.17-.13,28.09-.4,35.08.54s10.62,3.76,10.62,3.76,2.69-4.7,12.9-4.7,23.65,0,27.82.27,9.94,2.82,10.89,4.3c0,0,.94-2.69,8.74-3.63s31.31.4,35.75.94,7.93.81,8.33,1.61a4.13,4.13,0,0,1,3.36-1.88c2.55-.27,21-.81,26.34-1.21s19.49,1.08,22.31,3.09,2.82,10.21,2.55,25.94.13,48.92.4,66.66.67,59.53.54,70.69,0,43.68,0,43.68,10.21-.13,16,.54a76.49,76.49,0,0,1,11.56,2.42l.24-102.07-1.1-.6-.1-7.58,41.6-.08s-12.53-3.76-12.53-19.08,9.86-19.49,15.37-21.23,9.64-1.48,10.31-2.55.43-6,.43-6l11.47.13v3s1,2.51,3.31,2.91,24.56,3.23,24.56,22.18S1161,455,1161,455h66l9-69.41,59-.51,2.15,1.56-7.39,64.14s-.87,2.51-2,3.18l152.2-.1V0ZM1366.93,298,1194,299.86l3.34-233.42,174.79-2.23Z' />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        )}
        {color && (
          <div className='pd-15'>
            <div className='colorful box-shadow '>
              <img id='background-image' src={'/images/ton_vn.jpg'} alt='' />
              <div id='container'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 956'>
                  <defs></defs>
                  <title>04_Solid</title>
                  <g id='Layer_2' data-name='Layer 2'>
                    <g id='Layer_1-2' data-name='Layer 1'>
                      <rect class='cls-1' width='1440' height='956' />
                      <polygon
                        style={{ fill: color }}
                        class='cls-2'
                        points='791.66 233.93 768 249.25 730.05 253.5 712.86 270.36 850.9 290.78 1009.71 135.42 1139.15 238.25 1144.52 238.25 1016.94 135.72 1018.39 133.25 1012.43 127.55 811.41 114.95 635.92 45.67 239.79 207.16 579.75 262.19 791.66 233.93'
                      />
                      <polygon
                        style={{ fill: color }}
                        class='cls-2'
                        points='921.54 327.89 915.68 333.59 915.68 336.42 877.83 374.27 877.83 378.48 864.56 392.52 861.75 392.27 838.9 416.14 973.45 446.14 1048.39 359.72 1051.77 359.72 1056.37 354.23 1060.9 357.36 1062.75 355.44 1056.52 350.19 921.54 327.89'
                      />
                      <path
                        style={{ fill: color }}
                        class='cls-2'
                        d='M1121.92,352.31h-5.36v4.21l-2.94,1.66-3.06-3.06-36.51,10.21,50.93,36h5.24v4h-1.34a26.58,26.58,0,0,1,0,3.89h-2.24v6.45l-20.55,6.58h-8.55V421h-10.22v40.34c6.26-.12,7.66,2.56,7.66,2.56l165.19-53.49Z'
                      />
                      <path
                        class='cls-2'
                        style={{ fill: color }}
                        d='M862.51,583.12l-36.12-27.57v-2.94l-71.92-53.49-8.13-9.45h-5.1L737,494.52,600.81,591.67v2.17s-14.3,11.75-14.68,11.75-29.74-11-29.74-11v-3L314.85,501.29l-3.44,2.81-18.26-7-24.89,16.51,470,185.87,191.06-75.1-59.23-44.81Z'
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
        {priceGroup && priceGroup.allow_custom_length && 'Tôn lạnh,Tôn lạnh màu,Tôn PU lạnh màu,Tôn Hoa Sen Gold'.includes(priceGroup.group) && (
          <div className='pd-20 group-addcart'>
            <h5>Lựa chọn màu khác</h5>
            <button className='btn btn-6 addtocart' onClick={() => setModalShowTon(true)}>
              Danh sách sản phẩm
            </button>
          </div>
        )}
        {productOptions != null && productOptions?.length != 0 && currentOptions && (
          <div className='pd-15 line-bottom'>
            <h5>Phân loại sản phẩm</h5>
            <div className='row list-item-10'>
              {currentOptions.values.map((item, index) => (
                <div className='col-6' key={index}>
                  <div className='input-title'>{item.label}</div>
                  <select className='select filter-option' disabled={!item.active} defaultValue={'reset'} id={`filter-option` + index} name={item.attribute_id} onChange={(e) => handleOption(e, index)}>
                    <option value={'reset'}>Lựa chọn</option>

                    {item.values.map((data, i) => {
                      let check = false;
                      const list_option = Object?.values(productVarients)?.map((item) => Object?.values(item)[index]);

                      list_option?.map((id_option) => {
                        if (id_option === data?.value_index) {
                          check = true;
                          return;
                        }
                      });

                      if (check) {
                        return (
                          <option value={data?.value_index} key={'000' + i}>
                            {data?.label}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.extension_attributes && data?.extension_attributes.colors && (
          <div className='pd-20'>
            <h5>Chọn màu sơn</h5>
            <div className='orderby' style={{ display: 'flex', whiteSpace: 'nowrap', overflow: 'auto', paddingBottom: '10px' }}>
              <div className='order'>
                <a className={`t1 ${typeAllColor == 'all' ? 'active underline' : ''}`} style={{ marginRight: '20px' }} onClick={() => handleTypeColorSelect('all')}>
                  Màu khác
                </a>
                <a className={`t1 ${typeAllColor == 'white' ? 'active underline' : ''}`} style={{ marginRight: '20px' }} onClick={() => handleTypeColorSelect('white')}>
                  Màu trắng
                </a>
                <a className={`t1 ${typeAllColor == 'black' ? 'active underline' : ''}`} style={{ marginRight: '20px' }} onClick={() => handleTypeColorSelect('black')}>
                  Màu đen
                </a>
              </div>
            </div>
            <br />
            {typeAllColor == 'all' && (
              <>
                <div className='row'>
                  <HuePicker width='100%' color={paintColor} onChangeComplete={handleChangeColor}></HuePicker>
                </div>
                <br />
              </>
            )}

            {suggestColorList && (
              <div>
                <h6> Bảng màu sản phầm</h6>
                <div className='row'>
                  {suggestColorList &&
                    suggestColorList.map((item, index) => (
                      <div className='col-1' key={index} style={{ padding: '5px' }}>
                        <div className='item tRes' style={{ backgroundColor: item.color }} onClick={() => setProductPaintColor({ color: item.color, id: item.id, label: item.label })}>
                          <span className='t1'></span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <br />

            {productPaintColor.color && (
              <div>
                <h6>Màu đã chọn </h6>
                <div className='row'>
                  <div className='col-6 text-center'> Mã màu : {productPaintColor.label} </div>
                  <div className='col-3' style={{ height: '25px', backgroundColor: productPaintColor.color }}></div>
                </div>
              </div>
            )}
          </div>
        )}

        {!data?.extension_attributes.price_group[0].allow_custom_length && (
          <>
            {!exchangeBrick && (!data?.extension_attributes?.category?.name?.includes('Gạch' || 'gạch') || unit != '₫/Viên') ? (
              <div className='pd-15 group-addcart sec-bd-bottom'>
                <h5>{t('qty')}</h5>
                <div className='items'>
                  <div className='qualitys'>
                    <a className='minus' onClick={() => handleQty('minus')}>
                      <i className='icon-minus'></i>
                    </a>
                    <input
                      className='number'
                      type='input'
                      value={qty}
                      onChange={(e) => {
                        setQtyClient(e);
                      }}
                    />
                    <a className='plus' onClick={() => handleQty('plus')}>
                      <i className='icon-plus'></i>
                    </a>
                  </div>
                </div>
              </div>
            ) : (unit == '₫/m²' || unit == '₫/M2') && exchangeBrick ? (
              <div className='pd-20 group-addcart'>
                <h5>{t('detail')}</h5>
                <div className='table-group-addcart cart-gach-mb'>
                  <div className=' w5'>{unit == '₫/Viên' ? 'Số viên cần ốp' : 'Diện tích cần lát gạch (m²)'}</div>
                  <div className='qualitys mb-10'>
                    <a className='minus' onClick={() => handleQty('minus')}>
                      <i className='icon-minus'></i>
                    </a>
                    <input
                      className='number'
                      type='number'
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                    />
                    <a className='plus' onClick={() => handleQty('plus')}>
                      <i className='icon-plus'></i>
                    </a>
                  </div>
                  <div className=' w5 mb-10'>
                    {unit == '₫/Viên' ? 'Số viên quy đổi ra thùng' : 'Số thùng quy đổi'} : <span className='cl1'>{Math.ceil(qty / exchangeBrick)}</span> thùng
                  </div>
                  <div className=' w5'>
                    {unit == '₫/Viên' && (
                      <>
                        {' '}
                        Diện tích thực tế : <span className=''>{(Math.ceil(qty / exchangeBrick) * exchangeBrick).toFixed(2)}</span> m²
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className='pd-20 group-addcart'>
                <h5>{t('detail')}</h5>
                <div className='table-group-addcart cart-gach-mb'>
                  <div className=' w5'>{unit == '₫/Viên' ? 'Số viên cần ốp' : 'Diện tích cần lát gạch (m²)'}</div>
                  <div className='qualitys mb-10'>
                    <a className='minus' onClick={() => handleSquare('minus')}>
                      <i className='icon-minus'></i>
                    </a>
                    <input
                      className='number'
                      type='number'
                      value={square}
                      onChange={(e) => {
                        setSquare(e.target.value);
                      }}
                    />
                    <a className='plus' onClick={() => handleSquare('plus')}>
                      <i className='icon-plus'></i>
                    </a>
                  </div>
                  <div className=' w5 mb-10'>
                    {unit == '₫/Viên' ? 'Số viên quy đổi ra thùng' : 'Số thùng quy đổi'} : <span className='cl1'>{qtyBrickExchange}</span> viên{' '}
                  </div>
                  {unit != '₫/Viên' && (
                    <div className=' w5'>
                      Diện tích thực tế : <span className='cl1'>{(Math.ceil(square / exchangeBrick) * exchangeBrick).toFixed(2)}</span> m²
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {priceGroup && priceGroup.allow_custom_length && (
          <>
            <div className='pd-20 group-addcart'>
              <h5>{t('detail')}</h5>
              <table className='table-group-addcart mmmm'>
                <tr className=''>
                  <td className='c1'> Chiều dài (m)</td>
                  <td className='c2'>
                    Số lượng
                    {priceGroup && 'Dây cáp điện'.includes(priceGroup.group) && ' (dây)'}
                    {priceGroup && 'Thép dày mạ kẽm'.includes(priceGroup.group) && ' (cây)'}
                    {priceGroup && 'Tôn lạnh,Tôn lạnh màu,Tôn PU lạnh màu,Tôn Hoa Sen Gold'.includes(priceGroup.group) && ' (tấm)'}
                    {priceGroup && 'Thép xây dựng'.includes(priceGroup.group) && ' (m)'}
                  </td>
                  <td className='c3'> Tổng</td>
                  <td className='c4'> </td>
                </tr>
                {state &&
                  state.items.map((item, index) => (
                    <tr className='' key={index}>
                      <td className='c1'>
                        <input className='number input' type='number' value={item.value} onChange={(e) => setValueState(e, index)} onBlur={(e) => checkValueState(e, index)} />
                      </td>
                      <td className='c2'>
                        <div className='qualitys'>
                          <a className='minus' onClick={() => updateStateQty(index, 'minus')}>
                            <i className='icon-minus'></i>
                          </a>
                          <input className='number' type='input' value={item.qty} onChange={(e) => setQtyState(e, index)} />
                          <a className='plus' onClick={() => updateStateQty(index, 'plus')}>
                            <i className='icon-plus'></i>
                          </a>
                        </div>
                      </td>

                      <td className='c3 total b cl1'>
                        <span className=''>{Number.isInteger(item.value * item.qty) ? item.value * item.qty : (item.value * item.qty).toFixed(2)}</span> m
                      </td>
                      <td>
                        {index == 0 && (
                          <span className='abtn more' onClick={() => addToState()}>
                            Thêm
                          </span>
                        )}
                        {index != 0 && (
                          <span className='abtn remove' onClick={() => removeToState(index)}>
                            Xoá
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </>
        )}

        {/* ------------------------------ Ưu đãi từ Hoa Sen Group --------------------------------- */}
        {commonData && <WidgetMobile commonData={commonData} />}

        {/* ------------------------------ Sản phẩm cùng danh mục --------------------------------- */}
        {data?.extension_attributes.category_links && data?.extension_attributes.category_links[0] && data?.extension_attributes.category_links[0].category_id && (
          <ProductSlide data={data?.extension_attributes.category_links[0].category_id} category={category} configPrice={configPrice.pricing ? configPrice.pricing : null} />
        )}

        {/* ------------------------------ Thông tin chung / Thông tin sản phẩm --------------------------------- */}

        <SummaryInfo brandID={brandID} data={data?.custom_attributes} category={category} brand={data?.extension_attributes.brand ? data?.extension_attributes.brand : null} />

        <DetailInfo data={data?.custom_attributes} extensionAttributes={data?.extension_attributes} productId={data?.id} commonData={commonData} category={category} brand={data?.extension_attributes.brand ? data?.extension_attributes.brand : null} />

        <CustomerReview data={data?.extension_attributes.review} productId={data?.id} />

        {commonData && commonData.questions && <QuestionMobile productId={data?.id} commonData={commonData} />}

        <ViewedProductMobile />
        <LoginModal />
        <Modal size='sm' show={modalShow} onHide={() => setModalShow(false)}>
          <div className='pd-20'>{modalText}</div>
        </Modal>
      </main>
      {!data?.extension_attributes.price_group[0].allow_custom_length && (
        <div className='action-detail'>
          <a className='item item-1' onClick={() => setOpenChatBox()}>
            <i className='icon-t26'></i> Live chat
          </a>
          <button
            className='item addtocart item-2'
            onClick={() => {
              addToCart();
            }}
          >
            <i className='icon-cart2'></i> Thêm vào giỏ hàng
          </button>
          <a
            className='item item-3'
            onClick={() => {
              checkOut();
            }}
          >
            Mua ngay
          </a>
        </div>
      )}
      {data?.extension_attributes.price_group[0].allow_custom_length && (
        <div className='action-detail'>
          <a className='item item-1' onClick={() => setOpenChatBox()}>
            <i className='icon-t26'></i> Live chat
          </a>
          <button
            className='item addtocart item-2'
            onClick={() => {
              addToCartWithOptions();
            }}
          >
            <i className='icon-cart2'></i> Thêm vào giỏ hàng
          </button>
          <a
            className='item item-3'
            onClick={() => {
              checkoutWithOptions();
            }}
          >
            Mua ngay
          </a>
        </div>
      )}
      <Modal show={modalTonShow} onHide={() => setModalShowTon(false)} scrollable={true}>
        <CategoryProducts data={data?.extension_attributes.category_links[0].category_id} category={category} configPrice={configPrice.pricing ? configPrice.pricing : null} isShowModal={true} />
      </Modal>
    </LayoutProductDetailMobile>
  ) : (
    <Layout>
      <Head>
        <link rel='stylesheet' href='/customCss/main.css' type='text/css' media='all' />
        <title>{data?.name}</title>
        {data?.custom_attributes.map((data, index) => {
          if (data?.attribute_code !== null) {
            switch (data?.attribute_code) {
              case 'short_description':
                return <meta key={index} name='description' content={StripHtmlTag(data?.value)} />;
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
        <meta property='og:title' content={data?.name} itemProp='headline' />
        {data?.custom_attributes.map((data, index) => {
          if (data?.attribute_code !== null) {
            switch (data?.attribute_code) {
              case 'short_description':
                return <meta property='og:description' key={index} name='description' content={StripHtmlTag(data?.value)} />;
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
        <meta property='og:image' content={data?.media_gallery_entries[0]?.file ? `${(process.env.DOMAIN_IMAGE + 'catalog/product/' + data?.media_gallery_entries[0].file).replace('product//', 'product/')}` : '/images/banner.jpg'} />
        <meta
          property='og:image'
          itemProp='thumbnailUrl'
          content={data?.media_gallery_entries[0]?.file ? `${(process.env.DOMAIN_IMAGE + 'catalog/product/' + data?.media_gallery_entries[0].file).replace('product//', 'product/')}` : '/images/banner.jpg'}
        />
        <meta property='og:image:secure_url' content={data?.media_gallery_entries[0]?.file ? `${(process.env.DOMAIN_IMAGE + 'catalog/product/' + data?.media_gallery_entries[0].file).replace('product//', 'product/')}` : '/images/banner.jpg'} />
      </Head>
      <BreadCrumb
        data={[
          { name: category.name, link: `/${category.path}`, isActive: false },
          { name: data?.name, link: '/account', isActive: true },
        ]}
      />
      <main id='main' className='sec-tb page-product-detail'>
        <div className='container'>
          <section className='r1 sec-b'>
            <div className='row '>
              <div className='col-lg-5 r1-c1 sss'>
                {!childImages ? media && <AsNavFor promotion={data?.extension_attributes?.promo_banners[0]} data={media}></AsNavFor> : <AsNavForChild promotion={data?.extension_attributes?.promo_banners[0]} data={childImages} />}
                {data?.product_links && data?.product_links?.length != 0 && <ProductLink data={data?.product_links} />}
                {data?.extension_attributes && data?.extension_attributes.colors && (
                  <div className='colorful box-shadow '>
                    <img id='background-image' src={'/tool-bedroom/phong-ngu-03.jpg'} alt='' />
                    <div id='container'>
                      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 1440 956'>
                        <defs>
                          <clipPath id='clip-path'>
                            <rect className='cls-1' x='0.01' y='0.38' width='1440' height='956' />
                          </clipPath>
                        </defs>
                        <title>Phong-ngu-03</title>
                        <g id='Layer_2' data-name='Layer 2'>
                          <g id='Layer_1-2' data-name='Layer 1'>
                            <g className='cls-2' style={{ fill: productPaintColor.color }}>
                              <path d='M233.44,547.25l26.5.5s-.25-1.25-3.25-1.62c-3.37-1.12-9.87-5-14.5-7.25s-13.37-8.25-16.5-13c-2-.25-4.37,2-6.5,3.13s-6.12,2-7.62,1.25l-1.87,2.38.38,1.88a2.49,2.49,0,0,1,2.5,1.25C214.56,536.25,228.06,537.13,233.44,547.25Z' />
                              <path d='M71.69,655.31c-1.87-.62-1-3.5-.56-4.25,5.38-2.5,6.19-.62,7.38.94a16,16,0,0,0,3.44,3.38c-3.19-11.69,1.29-19.52,1.29-19.52l-83.14.29L0,697.69l7.56.38.88-20.81-1.62-1.5L7,666.31c.31-1.19,3.06-2.5,18.69-4.25s37.56-.31,47.38.56S82.63,666,82.63,666s-.5,8.69-.5,9-1.81.5-1.81.5l-.19,9.88a97.35,97.35,0,0,1,13.44-1.19c-9.44-12.25-10.12-22.25-10.69-25.25C80.38,655.31,73.56,655.94,71.69,655.31Z' />
                              <path d='M89.88,649.06l-.69-13-3.81-.12s-.44,12.38,1,12.31C86.56,647.19,88.44,647.5,89.88,649.06Z' />
                              <path d='M109.63,635.69a18.38,18.38,0,0,1-1.56-3.69l-1.62.38a103.87,103.87,0,0,0,2.5,11.31c.94,2.75,3,16,3,16l1.94.44s-2.75-9.06-3.5-12.56S109.63,637.31,109.63,635.69Z' />
                              <path d='M122.88,621.25,119,622.56a21,21,0,0,1,.44,3.88c.19,2.75,1.25,7.88,1.25,7.88s1.06-1.62,2.25-3.31A47.74,47.74,0,0,1,122.88,621.25Z' />
                              <path d='M167.44,672.63s-4.25.88-5.37,3-4.62,8.63-4.62,8.63,3.88-.62,4.13,1-.25,15.13-.25,15.13l8.5.13S167.31,681.38,167.44,672.63Z' />
                              <path d='M166.19,647.88s-5.62,4.5-7.37,5.63l-2.5,5s1.5-.37,1.38.88a19.9,19.9,0,0,1-1.5,4.13l.25,4.25s6.88-10,10.13-13.5Z' />
                              <path d='M200.19,535.75c-2.62.38-15.87,3.25-30.87,12.75l37.25-.75-.5-5.5S202.06,536,200.19,535.75Z' />
                              <path d='M211.56,536.5l-1.87.88c-1.12,8.88,1,10.25,1,10.25l7-.12s-4.25-6-4.75-8.25S211.56,536.5,211.56,536.5Z' />
                              <polygon points='211.56 517.13 214.31 516.5 211.81 513.13 211.56 517.13' />
                              <path d='M209.69,508.88s-2.12-6-3-6.75c-1,1.63-.5,4.63,2.38,9.63Z' />
                              <path d='M202.56,474.13c-2.5-.87-7.37-.75-7.37-.75a24.22,24.22,0,0,0,6.5,3.5c3.88,1.38,9.5,6.88,10.75,10.25,0,0,.88-3.87-1.12-5.87S205.06,475,202.56,474.13Z' />
                              <path d='M.06,0s.27,496.52,0,496.76l10-1.14s11.49-2.57,13.49-3.19,5.12-2.35,6.75-2.85c2.13-.62,7.75-2,8.75-1.42s2.37,4.73,2.12,7.85-1.63,8.36-1.88,11.36-.5,8.74-2.25,13.37c-.62,2.13-1,7.87-1.13,9.75s-3.88,10.87-3.88,10.87,1.44,12.62.69,20.25c.88,1.25,2.31,8.5,2.31,8.5V563s1.5-1.62,5.88-1.87,44.75-1.12,51.25-.75,16.88.88,17.88,2.38V572a.91.91,0,0,1-.75,1.17l.54,26.33s5.94-.83,16.6,1.25c0,0,2.84-6.58,5.68-9.75a55.68,55.68,0,0,1,6.63-7.67c.5-.58,2.36-3.08,2.36-3.08a14.56,14.56,0,0,0-.65,3.17c.08.75.76,4.25-.24,6.17s-1.83,9.75-1.83,9.75a78.46,78.46,0,0,0,2.58-7.5,11.08,11.08,0,0,1,2.92-5.33A10.64,10.64,0,0,0,146,583s1.25.25-1,4.58c-.92,1.92-2.67,9.42-2.83,10.08s-1.42,4.75-.58,5.17c.83-1,3.58-4.92,3.58-4.92s.83-1.42,1.08-1.08.42,3.75-3.17,12.42a27,27,0,0,1-8,19.58c.08,1.5,1.58,7.08,1.17,10.42-1.08,2.75-2.5,8.75-2.17,12.25a9.2,9.2,0,0,1,1.75-3.58l.58,2.17s8.75-25.42,12.25-22.92c0,0,2.83-5.67,2.92-6.5a20.33,20.33,0,0,1,.58-4.67c.5-1.25,1.92-3.58,2.5-3.08s-2,6.92-1.83,7.58,1.33,10.5,1.33,10.5,2.25-.42,0,2.83c-.08,2.58-1.75,17-1.75,17s2.17-8.42,13.08-16.67c0,0-.42-34.67-.58-42.83s-2.17-41.33.17-41.83c0,0-2.83-3.17,6.5-9.75s18.08-6.42,26-5.08a21.06,21.06,0,0,1,4.42,1c1.17.58,3.08,3.5,4.5,4.33,0,0,.33-7,.42-9.83-1.25-1.83-3.58-6.58-5-7.25-1.75-.67-9.58-1.5-9.58-1.5s-12.83,5.5-15.75,6.67-4.83,2-6.67,1.92l-.83,2.42-.08-2.58s-3-1.58-3.25-2.92-.58-5.5,7.08-9.25,10.08-2.58,12.17-2.17,9.58,4.08,9.58,4.08,11.42-1.83,12.08,1.5c0,1-2.83,1.08-2.67,1.5s2.17,4.17,3.58,5.08l1.17-13.17A29.23,29.23,0,0,1,204,502.83a40.78,40.78,0,0,1-8.5-7.83,33.55,33.55,0,0,0-11.67-9.17,58.33,58.33,0,0,1-14.25-9,32,32,0,0,0-8.25,3.5c-3.42,1.75-9,4.25-11,7.25a2.63,2.63,0,0,0-.58-2.42c-.33-1.67.25-2.92,3.58-5.33s10.33-4.92,12.58-5.08c0,0-.17-1.75-4.25-2.75-.25-1.08,4.42.5,5.33.33s3.92-1.75,12.17-1.5c1.17-.75,3.83-3.92,17,.58,2.83.17,8.17.17,9,2.58,1.33,1.08,7.92,6.75,7.92,6.75s1.5-.92,2-14.25-.33-13.92-.33-13.92a53.22,53.22,0,0,1-11.08-8.25,62.94,62.94,0,0,1-8.5,1c-2.83,0-5.75-1-6.08,2.58-.67-2,.25-2.83-1.58-3.58s-5-1.67-6.58-6.42c-.67-2.42,5.33-3.92,8.92-3.5s8.92,1.25,8.92,1.25-3.92-12.75,9.58-17.08c0,0,1.25.25-6.83-8.58s-14.83-23.33-15.58-25.67-1.17-4.08.17-4.83a32.71,32.71,0,0,1,6.08.75c1.75.58,13.67,5.08,21.08,16.58s6.83,18.83,5.83,21.42a16.83,16.83,0,0,1,10.17,5.25c2.75-1.67,9.75-6.42,14.08-7.33,4.25-2,7.92-4.17,11.33-4.83,3.5-1.08,8.33-3.08,11.75-2.42,2.67-.33,6.67-.67,6.83,1.42a10.07,10.07,0,0,0-5.33.67,88,88,0,0,0-8.67,1.75c-3.08.92-13.83,4.5-15.5,5.42s-12.83,7.92-12.83,7.92,4,7.42-.42,13.83-12.33,11.83-12.33,11.83l-.75,18.42s.58.25,1.5-.5,8-5.58,12.42-4.42a28.82,28.82,0,0,1,11.92-1.5,41.66,41.66,0,0,1,17.67,1.67c6.5,2.17,9.58,1.67,9.83,7.42A12.64,12.64,0,0,1,272.4,476s-1.67-3.5-6.83-4.75a123.1,123.1,0,0,0-29.5-4.58c-6.42-.25-13.58-.5-19.08,6.08-.33,3.92-1.75,11.17-1.75,13s-.75,6,0,5.83,7-3.92,6.5-4.92-1.83-3.42-.83-3.83,5.92-1.33,14.75,0c8.75.92,17.5,2.17,21.92,4.42,5.33,1.25,16.17,4.83,18.83,7.33-.08.42-.75.42-.75.42a5.14,5.14,0,0,1,.92,2.67s-.42-2.67-4.75-4.08c-3.42-.25-16.58-1-21.33-1.42s-21.58-2.92-26.17-4.58c-1.17.08-8.17,5.17-9.17,7.42a15.78,15.78,0,0,0-.75,5.08,20.74,20.74,0,0,0,4.08.5c.83-.17,7.92-.48,10.75,4.68a19.41,19.41,0,0,1,1.91,11.07s12.92-4.17,19.08,2.42,10.92,11.25,12.33,14.83,3.42,9.25-1.5,12.67c-.67.42-.25,1.42-.25,1.42s12.67-.58,13.5,1.83c-.08,2.33-3,64.67-3,64.67s3.67-5.25,4.83-6.42,6.25-5.58,10.83-7.42c4.67-2.92,23.75-15.83,25.83-17.25s13.5-8.92,25.33-12.83c11.58-4.83,28.17-12.08,30.5-13.08s11.75-4.5,11.75-4.5-.08-105.17.17-113.17-.75-46.75-1.25-57-1.25-23.75,1.25-27c0,0,.12-2.77,5.49-3.45,5.51-.13,22.17.27,26.07-.13s19.35-1.75,25.26,3.09c1.88-3.09,7.12-4.43,13.71-4.43s12,.67,16.66.67,14.92-1.21,18.55,2.82c1.75-3.23,7.39-3.76,14.24-3.09,7.53,0,21,0,24.32.27s9.81,2,11.83,5.24c1.61-3.76,7.53-5.11,12.5-5.11s29,.4,30.51.67,6.58.81,7.93,3.23a6,6,0,0,1,5.11-3.9c4-.4,21.77.4,24.73.4s17.87-.4,22,4c0,0,1.48-3.23,8.87-3.49s29-.67,32.66,0a71.85,71.85,0,0,1,8.33,2.28s.54-2.55,6.32-3,31-.13,34-.13,9.68.94,11.29,3.49c0,0,1.21-3,6.32-3.36s22.71-1.07,26.21-.94,15.19.94,18.81,4c0,0,1.21-2.69,5.91-3.09s33.33-.54,36-.4,6.72,1.61,8.06,3a7.21,7.21,0,0,1,5.91-3.09c4.17-.13,28.09-.4,35.08.54s10.62,3.76,10.62,3.76,2.69-4.7,12.9-4.7,23.65,0,27.82.27,9.94,2.82,10.89,4.3c0,0,.94-2.69,8.74-3.63s31.31.4,35.75.94,7.93.81,8.33,1.61a4.13,4.13,0,0,1,3.36-1.88c2.55-.27,21-.81,26.34-1.21s19.49,1.08,22.31,3.09,2.82,10.21,2.55,25.94.13,48.92.4,66.66.67,59.53.54,70.69,0,43.68,0,43.68,10.21-.13,16,.54a76.49,76.49,0,0,1,11.56,2.42l.24-102.07-1.1-.6-.1-7.58,41.6-.08s-12.53-3.76-12.53-19.08,9.86-19.49,15.37-21.23,9.64-1.48,10.31-2.55.43-6,.43-6l11.47.13v3s1,2.51,3.31,2.91,24.56,3.23,24.56,22.18S1161,455,1161,455h66l9-69.41,59-.51,2.15,1.56-7.39,64.14s-.87,2.51-2,3.18l152.2-.1V0ZM1366.93,298,1194,299.86l3.34-233.42,174.79-2.23Z' />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}
                {color && (
                  <div className='colorful box-shadow '>
                    <img id='background-image' src={'/images/ton_vn.jpg'} alt='' />
                    <div id='container'>
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 956'>
                        <defs></defs>
                        <title>04_Solid</title>
                        <g id='Layer_2' data-name='Layer 2'>
                          <g id='Layer_1-2' data-name='Layer 1'>
                            <rect class='cls-1' width='1440' height='956' />
                            <polygon
                              style={{ fill: color }}
                              class='cls-2'
                              points='791.66 233.93 768 249.25 730.05 253.5 712.86 270.36 850.9 290.78 1009.71 135.42 1139.15 238.25 1144.52 238.25 1016.94 135.72 1018.39 133.25 1012.43 127.55 811.41 114.95 635.92 45.67 239.79 207.16 579.75 262.19 791.66 233.93'
                            />
                            <polygon
                              style={{ fill: color }}
                              class='cls-2'
                              points='921.54 327.89 915.68 333.59 915.68 336.42 877.83 374.27 877.83 378.48 864.56 392.52 861.75 392.27 838.9 416.14 973.45 446.14 1048.39 359.72 1051.77 359.72 1056.37 354.23 1060.9 357.36 1062.75 355.44 1056.52 350.19 921.54 327.89'
                            />
                            <path
                              style={{ fill: color }}
                              class='cls-2'
                              d='M1121.92,352.31h-5.36v4.21l-2.94,1.66-3.06-3.06-36.51,10.21,50.93,36h5.24v4h-1.34a26.58,26.58,0,0,1,0,3.89h-2.24v6.45l-20.55,6.58h-8.55V421h-10.22v40.34c6.26-.12,7.66,2.56,7.66,2.56l165.19-53.49Z'
                            />
                            <path
                              class='cls-2'
                              style={{ fill: color }}
                              d='M862.51,583.12l-36.12-27.57v-2.94l-71.92-53.49-8.13-9.45h-5.1L737,494.52,600.81,591.67v2.17s-14.3,11.75-14.68,11.75-29.74-11-29.74-11v-3L314.85,501.29l-3.44,2.81-18.26-7-24.89,16.51,470,185.87,191.06-75.1-59.23-44.81Z'
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className='col-lg-4 r1-c2'>
                <div className='box-shadow '>
                  <div className='pd-20'>
                    {data?.extension_attributes && data?.extension_attributes.brand && (
                      <div className='mb-10'>
                        {t('Brands')} &nbsp;
                        <Link href={`/${category.path}?brand=${brandID}&page=1`}>
                          <span className='cl1 b'>{data?.extension_attributes.brand.name}</span>
                        </Link>
                      </div>
                    )}
                    <h1 className='h3'>{data?.name}</h1>

                    {data?.custom_attributes.map((values, index) => {
                      if (values.attribute_code !== null) {
                        switch (values.attribute_code) {
                          case 'short_description':
                            return (
                              <ToggleHeightContent id='sort' height='100' more='left' key={index}>
                                {ReactHtmlParser(values.value)}
                              </ToggleHeightContent>
                            );
                          default:
                            return null;
                        }
                      } else {
                        return null;
                      }
                    })}
                    <div className='ratingresult mb-10'>
                      <ShowStar rating={data?.extension_attributes.review.review_summary[0].rating_summary != null ? data?.extension_attributes.review.review_summary[0].rating_summary : '0'} />
                    </div>
                    <div className='price-group mb-10'>
                      <span className='price red'>
                        {formatVND((finalPrice + plus) * rate)} <span>{unit}</span>
                      </span>
                      {basePrice != 0 && parseInt(basePrice) != parseInt(finalPrice) && (
                        <>
                          <span className='price-old'>{formatVND(basePrice)}</span>
                          <span className='off fs15 red'>{Math.round(((finalPrice - basePrice) / basePrice) * 100)} % </span>
                        </>
                      )}
                      <span className={`btnlike ${isInWishlist ? 'active' : ''}`} onClick={() => handleWishlist()}>
                        <i className='icon-like'></i>
                      </span>
                    </div>
                    <div className='box-choose-store'>
                      <img src='/images/svg/store.svg' alt='' />
                      <p className='red2'>Xem cửa hàng có hàng trưng bày</p>
                    </div>
                  </div>
                  {priceGroup && priceGroup.allow_custom_length && 'Tôn lạnh,Tôn lạnh màu,Tôn PU lạnh màu,Tôn Hoa Sen Gold'.includes(priceGroup.group) && (
                    <div className='pd-20 group-addcart'>
                      <h5>Lựa chọn màu khác</h5>
                      <button className='btn btn-6 addtocart' onClick={() => setModalShowTon(true)}>
                        Danh sách sản phẩm
                      </button>
                    </div>
                  )}
                  {productOptions != null && productOptions?.length != 0 && currentOptions && (
                    <div className='pd-20'>
                      <h5>Phân loại sản phẩm</h5>
                      <div className='row list-item-10'>
                        {currentOptions.values.map((item, index) => (
                          <div className='col-6' key={index}>
                            <div className='input-title'>{item.label}</div>
                            <select className='select filter-option' disabled={!item.active} defaultValue={'reset'} id={`filter-option` + index} name={item.attribute_id} onChange={(e) => handleOption(e, index)}>
                              <option value={'reset'}>Lựa chọn</option>
                              {item.values.map((data, i) => {
                                let check = false;
                                const list_option = Object?.values(productVarients)?.map((item) => Object?.values(item)[index]);

                                list_option?.map((id_option) => {
                                  if (id_option === data?.value_index) {
                                    check = true;
                                    return;
                                  }
                                });

                                if (check) {
                                  return (
                                    <option value={data?.value_index} key={'000' + i}>
                                      {data?.label}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data?.extension_attributes && data?.extension_attributes.colors && (
                    <div className='pd-20'>
                      <h5>Chọn màu sơn</h5>
                      <div className='orderby'>
                        <div className='order'>
                          <a className={`t1 ${typeAllColor == 'all' ? 'active underline' : ''}`} onClick={() => handleTypeColorSelect('all')}>
                            Tự chọn mã màu
                          </a>
                        </div>
                      </div>
                      <div className='orderby'>
                        <div className='order'>
                          <a className={`t1 ${typeAllColor == 'all' ? 'active underline' : ''}`} onClick={() => handleTypeColorSelect('all')}>
                            Màu khác
                          </a>
                          <a className={`t1 ${typeAllColor == 'white' ? 'active underline' : ''}`} onClick={() => handleTypeColorSelect('white')}>
                            Màu trắng
                          </a>
                          <a className={`t1 ${typeAllColor == 'black' ? 'active underline' : ''}`} onClick={() => handleTypeColorSelect('black')}>
                            Màu đen
                          </a>
                        </div>
                      </div>
                      {typeAllColor == 'all' && (
                        <div className='row'>
                          <HuePicker width='100%' color={paintColor} onChangeComplete={handleChangeColor}></HuePicker>
                        </div>
                      )}

                      <br />

                      {suggestColorList && (
                        <div>
                          <h6> Bảng màu sản phầm</h6>
                          <div className='row'>
                            {suggestColorList &&
                              suggestColorList.map((item, index) => (
                                <div className='col-1' key={index} style={{ padding: '5px' }}>
                                  <div className='item tRes' style={{ backgroundColor: item.color }} onClick={() => setProductPaintColor({ color: item.color, id: item.id, label: item.label })}>
                                    <span className='t1'></span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      <br />

                      {productPaintColor.color && (
                        <div>
                          <h6>Màu đã chọn </h6>
                          <div className='row'>
                            <div className='col-6 text-center'> Mã màu : {productPaintColor.label} </div>
                            <div className='col-3' style={{ height: '25px', backgroundColor: productPaintColor.color }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {!data?.extension_attributes.price_group[0].allow_custom_length && (
                    <>
                      {!exchangeBrick && (!data?.extension_attributes?.category?.name?.includes('Gạch' || 'gạch') || unit != '₫/Viên') ? (
                        <div className='pd-20 group-addcart'>
                          <h5>{t('qty')}</h5>
                          <div className='items'>
                            <div className='qualitys'>
                              <a className='minus' onClick={() => handleQty('minus')}>
                                <i className='icon-minus'></i>
                              </a>
                              <input
                                className='number'
                                type='input'
                                value={qty}
                                onChange={(e) => {
                                  setQtyClient(e);
                                }}
                              />
                              <a className='plus' onClick={() => handleQty('plus')}>
                                <i className='icon-plus'></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (unit == '₫/m²' || unit == '₫/M2') && exchangeBrick ? (
                        <div className='pd-20 group-addcart'>
                          <h5>{t('detail')}</h5>
                          <div className='table-group-addcart cart-gach-mb'>
                            <div className=' w5'>{unit == '₫/Viên' ? 'Số viên cần ốp' : 'Diện tích cần lát gạch (m²)'}</div>
                            <div className='qualitys mb-10'>
                              <a className='minus' onClick={() => handleQty('minus')}>
                                <i className='icon-minus'></i>
                              </a>
                              <input
                                className='number'
                                type='number'
                                value={qty}
                                onChange={(e) => {
                                  setQty(e.target.value);
                                }}
                              />
                              <a className='plus' onClick={() => handleQty('plus')}>
                                <i className='icon-plus'></i>
                              </a>
                            </div>
                            <div className=' w5 mb-10'>
                              {unit == '₫/Viên' ? 'Số viên quy đổi ra thùng' : 'Số thùng quy đổi'} : <span className='cl1'>{Math.ceil(qty / exchangeBrick)}</span> thùng
                            </div>
                            {unit != '₫/Viên' && (
                              <div className=' w5'>
                                Diện tích thực tế : <span className=''>{(Math.ceil(qty / exchangeBrick) * exchangeBrick).toFixed(2)}</span> m²
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className='pd-20 group-addcart'>
                          <h5>{t('detail')}</h5>
                          <div className='table-group-addcart cart-gach'>
                            <div className=' w5'>{unit == '₫/Viên' ? 'Số viên cần ốp' : 'Diện tích cần lát gạch (m²)'}</div>
                            <div className='qualitys mb-10'>
                              <a className='minus' onClick={() => handleSquare('minus')}>
                                <i className='icon-minus'></i>
                              </a>
                              <input
                                className='number'
                                type='number'
                                value={square}
                                onChange={(e) => {
                                  setSquare(e.target.value);
                                }}
                              />
                              <a className='plus' onClick={() => handleSquare('plus')}>
                                <i className='icon-plus'></i>
                              </a>
                            </div>
                            <div className=' w5 mb-10'>
                              {unit == '₫/Viên' ? 'Số viên quy đổi ra thùng' : 'Số thùng quy đổi'} : <span className='cl1'>{qtyBrickExchange}</span> viên{' '}
                            </div>
                            {unit != '₫/Viên' && (
                              <div className=' w5'>
                                Diện tích thực tế : <span className='cl1'>{(Math.ceil(square / exchangeBrick) * exchangeBrick).toFixed(2)}</span> m²
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className='pd-20'>
                        <div className={`row ${isLoading ? 'loading' : ''}`}>
                          <div className='col-6'>
                            <button
                              className='btn btn-6 addtocart'
                              onClick={() => {
                                addToCart();
                              }}
                            >
                              <i className='icon-cart2'></i> Thêm vào giỏ
                            </button>
                          </div>
                          <div className='col-6'>
                            <a
                              href='#'
                              className='btn btn-4'
                              onClick={() => {
                                checkOut();
                              }}
                            >
                              Mua ngay
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {priceGroup && priceGroup.allow_custom_length && (
                    <>
                      <div className='pd-20 group-addcart'>
                        <h5>{t('detail')}</h5>
                        <table className='table-group-addcart'>
                          <tr className=''>
                            <td className='c1'> Chiều dài (m)</td>
                            <td className='c2'>
                              Số lượng
                              {priceGroup && 'Dây cáp điện'.includes(priceGroup.group) && ' (dây)'}
                              {priceGroup && 'Thép dày mạ kẽm'.includes(priceGroup.group) && ' (cây)'}
                              {priceGroup && 'Tôn lạnh,Tôn lạnh màu,Tôn PU lạnh màu,Tôn Hoa Sen Gold'.includes(priceGroup.group) && ' (tấm)'}
                              {priceGroup && 'Thép xây dựng'.includes(priceGroup.group) && ' (m)'}
                            </td>
                            <td className='c3'> Tổng</td>
                            <td className='c4'> </td>
                          </tr>
                          {state &&
                            state.items.map((item, index) => (
                              <tr className='' key={index}>
                                <td className='c1'>
                                  <input className='number input' type='number' value={item.value} onChange={(e) => setValueState(e, index)} onBlur={(e) => checkValueState(e, index)} />
                                </td>
                                <td className='c2'>
                                  <div className='qualitys'>
                                    <a className='minus' onClick={() => updateStateQty(index, 'minus')}>
                                      <i className='icon-minus'></i>
                                    </a>
                                    <input className='number' type='input' value={item.qty} onChange={(e) => setQtyState(e, index)} />
                                    <a className='plus' onClick={() => updateStateQty(index, 'plus')}>
                                      <i className='icon-plus'></i>
                                    </a>
                                  </div>
                                </td>

                                <td className='c3 total b cl1'>
                                  <span className=''>{Number.isInteger(item.value * item.qty) ? item.value * item.qty : (item.value * item.qty).toFixed(2)}</span> m
                                </td>
                                <td>
                                  {index == 0 && (
                                    <span className='abtn more' onClick={() => addToState()}>
                                      Thêm
                                    </span>
                                  )}
                                  {index != 0 && (
                                    <span className='abtn remove' onClick={() => removeToState(index)}>
                                      Xoá
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </table>
                      </div>
                      <div className='pd-20'>
                        <div className={`row ${isLoading ? 'loading' : ''}`}>
                          <div className='col-sm-6'>
                            <button
                              className='btn btn-6 addtocart'
                              onClick={() => {
                                addToCartWithOptions();
                              }}
                            >
                              <i className='icon-cart2'></i> Thêm vào giỏ
                            </button>
                          </div>
                          <div className='col-sm-6'>
                            <a
                              href='#'
                              className='btn btn-4'
                              onClick={() => {
                                checkoutWithOptions();
                              }}
                            >
                              Mua ngay
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className='col-lg-3 r1-c3'>{commonData && <Widget commonData={commonData} />}</div>
            </div>
          </section>
          {data?.extension_attributes?.category_links[0]?.category_id && <CategoryProducts data={data?.extension_attributes.category_links[0].category_id} category={category} configPrice={configPrice.pricing ? configPrice.pricing : null} />}
          <ProductsRender
            data={data?.custom_attributes}
            extensionAttributes={data?.extension_attributes}
            productId={data?.id}
            commonData={commonData}
            category={category}
            brand={data?.extension_attributes.brand ? data?.extension_attributes.brand : null}
            brandID={brandID}
          />
        </div>
      </main>
      <Modal size='sm' show={modalShow} onHide={() => setModalShow(false)}>
        <div className='pd-20'>{modalText}</div>
      </Modal>
      <Modal show={modalTonShow} onHide={() => setModalShowTon(false)} scrollable={true}>
        <CategoryProducts data={data?.extension_attributes.category_links[0].category_id} category={category} configPrice={configPrice.pricing ? configPrice.pricing : null} isShowModal={true} />
      </Modal>
    </Layout>
  );
}

function getCookie(cname, cookie) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca?.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name?.length, c?.length);
    }
  }
  return '';
}

// This gets called on every request
export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  if (context.query.id.length > 1) {
    return {
      redirect: {
        permanent: false,
        destination: `/product/${context.query.id.at(-1)}`,
      },
    };
  }
  let statusCode = false;
  // Fetch data from external API
  let data = null;
  let configPrice = null;
  api.defaults.headers['X-Requested-Details'] = true;
  let isReviewError = false;
  let reviewMessageError = '';
  let cookie = context.req.headers.cookie;
  let reviewParam = getCookie(`reviewParam`, cookie);
  let locationData = getCookie(`location-data`, cookie);

  let cityId = '';
  if (locationData) {
    let decode = JSON.parse(locationData);
    cityId = decode.city && decode.city.value ? decode.city.value : '';
  }

  if (reviewParam && reviewParam?.length != 0) {
    api.defaults.headers['Cookie'] = `PHPSESSID=${getCookie('PHPSESSID', cookie)}`;
    api.defaults.headers['Authorization'] = getCookie(`token`, cookie);
    try {
      const result = await api.post('service/product/review/behavior' + encodeURI(reviewParam));
      if (result.data[0].errors) {
        isReviewError = true;
        reviewMessageError = result.data[0].message;
      }
    } catch (error) {
      console.log(error);
      isReviewError = true;
      reviewMessageError = error.response.data?.message;
    }
  }
  let query = '';
  context.query.id?.forEach((element) => {
    query += element + '*';
  });
  query = query.slice(0, -1);
  if (cityId) query += `?city=${cityId}`;
  try {
    const result = await api.get(`service/rewrite/entity/${query}`);
    data = result.data ? result.data?.product : null;
    configPrice = result.data?.config ? result.data?.config[0] : null;
  } catch (error) {
    console.log(error);
    // throw error
  }

  if (!data) {
    context.res.statusCode = 404;
    statusCode = 404;
    return {
      props: { statusCode },
    };
  }
  api.defaults.headers['X-Requested-Details'] = false;
  let optionPrice = {};
  let productOptions = [];
  let productVarients = [];

  if (data && data?.extension_attributes && data?.extension_attributes.configurable_config && data?.extension_attributes.configurable_product_options) {
    optionPrice = data?.extension_attributes.configurable_config.option_prices[0];
    productOptions = data?.extension_attributes.configurable_product_options;
    productVarients = data?.extension_attributes.configurable_config.index[0];
  }
  let priceGroup = data && data?.extension_attributes ? data?.extension_attributes.price_group[0] : {};
  let category = data && data?.extension_attributes ? data?.extension_attributes.category : {};

  return { props: { isMobile, data, optionPrice, productOptions, productVarients, isReviewError, reviewMessageError, configPrice, priceGroup, category } };
}

export default ProductDetail;
