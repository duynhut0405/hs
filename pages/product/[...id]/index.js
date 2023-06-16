import Layout from '../../../components/Desktop/Layout';
import api from '../../../services/api';
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb';
import React, { useEffect, useState } from 'react';
import AsNavFor from '../../../components/Desktop/Carosels/AsNavFor';
import SimpleMobileSlider from '../../../components/Desktop/Carosels/SimpleMobileSlider';
import t from '../../../translation';
import ReactHtmlParser from 'react-html-parser';
import ShowStar from '../../../components/Desktop/Review/ShowStar';
import formatVND from '../../../utils/formatVND';
import ProductLink from '../../../components/Desktop/Products/ProductsLink';
import Widget from '../../../components/Desktop/Products/Widget';
import WidgetMobile from '../../../components/Mobile/ProductDetail/WidgetMobile';
import CategoryProducts from '../../../components/Desktop/Products/CategoryProducts';
import ProductsRender from '../../../components/Desktop/Products/ProductsRender';
import { useAuth } from '../../../contexts/auth';
import AsNavForChild from '../../../components/Desktop/Carosels/AsNavForChild';
import IsMobile from '../../../utils/detectMobile';
import LayoutProductDetailMobile from '../../../components/Mobile/ProductDetail/LayoutProductDetailMobile';
import Cookies from 'js-cookie';
import Modal from 'react-bootstrap/Modal';
import ProductSlide from '../../../components/Mobile/ProductDetail/ProductSlide';
import SummaryInfo from '../../../components/Mobile/ProductDetail/SummaryInfo';
import DetailInfo from '../../../components/Mobile/ProductDetail/DetailInfo';
import CustomerReview from '../../../components/Mobile/ProductDetail/CustomerReview';
import QuestionMobile from '../../../components/Mobile/ProductDetail/QuestionMobile';
import ViewedProductMobile from '../../../components/Mobile/Common/ViewedProductMobile';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoginModal from './../../../components/Desktop/Common/LoginModal';
import Head from 'next/head';
import { element } from 'prop-types';
import { useCommon } from '../../../contexts/common';
import { useCurrentCategory } from '../../../contexts/currentCategory';
import { HuePicker } from 'react-color';
import SuggestColor from '../../../utils/suggestColor';
import ToggleHeightContent from '../../../components/Core/ToggleHeightContent';
import StripHtmlTag from '../../../utils/stripHtmlTag';
import FourOhFour from '../../404';
import Axios from 'axios';
import ChangeBedroomColor from '../../../components/Desktop/Products/Detail/ChangeBedroomColor';
import ImageHouse from '../../../components/Desktop/Products/Detail/ImageHouse';
import ProductInfor from '../../../components/Desktop/Products/Detail/ProductInfor';
import RenderOptions from '../../../components/Desktop/Products/Detail/RenderOptions';
import RenderOptionsMobile from '../../../components/Mobile/ProductDetail/RenderOptionsMobile';
import CommentBlock from '../../../components/Desktop/Products/ChildrenBLocks/CommentBlock';
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
  console.log('🚀 ~ file: index.js:58 ~ ProductDetail ~ data:', data);
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
  const [choisingCustomOptions, setChosingCustomOptions] = useState(null);
  const [canAddToCart, setCanAddToCart] = useState(false);
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
  const [customOptions, setCustomOptions] = useState([]);
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
    if (data?.extension_attributes?.category_links?.[0]?.category_id) {
      setCategory(data?.extension_attributes.category_links?.[0].category_id);

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
          let currentPriceKey = Object.keys(productList)[0];
          // lấy giá ban đầu khi call
          SetFinalPrice(productList[currentPriceKey].final_price);
          SetBasePrice(productList[currentPriceKey].regular_price);
        } catch (error) {
          console.log(error);
        }
      }
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
      if (res3) {
        setColor(res3.value);
      } else setColor(null);

      const indexOptions = data?.custom_attributes?.findIndex((item) => item.attribute_code === 'loai_song_ton_lanh_mau');
      if (indexOptions !== -1) {
        setCustomOptions(data?.custom_attributes[indexOptions]?.value?.split(','));
      }
    }
  }, [data?.custom_attributes]);

  useEffect(() => {
    if (data) {
      setUnit(data?.extension_attributes.price_group[0].price_unit_text);
    }
  }, [data?.name]);

  useEffect(() => {
    if (Object.keys(choisingOptions)?.length == productOptions?.length) {
      setCanAddToCart(true);
    } else {
      setCanAddToCart(false);
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
    if (customOptions?.length !== 0) {
      setChosingCustomOptions(e.target.value);
      setCanAddToCart(true);
      return;
    }
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
    const listItems = await api.get(isAuthenticated ? 'carts/mine' : 'guest-carts/' + guestId);
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

  const addToCart = async (isTon = false) => {
    setIsLoading(true);
    try {
      let cardId = Cookies.get('cardId');
      let currentProduct = currentChildProducts?.items?.[0];

      // Check đã chọn options hay chưa
      if ((productOptions?.length !== 0 && !canAddToCart) || (customOptions?.length !== 0 && choisingCustomOptions == null)) {
        alert('Hãy chọn hết Phân loại sản phẩm');
        setIsLoading(false);
        return;
      }

      const ex_attributes = {
        is_buy_latter: false,
      };

      // Check có chọn màu sơn hay không
      if (productPaintColor.id) {
        ex_attributes.paint_color = productPaintColor.id;
      }

      // Nếu sản phẩm có option
      if (productOptions?.length !== 0 && customOptions?.length === 0) {
        let options = [];
        Object.keys(choisingOptions)?.forEach(function (option) {
          options.push({
            option_id: option,
            option_value: choisingOptions[option],
          });
        });

        ex_attributes.configurable_item_options = options;
      }

      if (customOptions?.length !== 0) {
        ex_attributes.extra_info = choisingCustomOptions;
      }

      if (isTon) {
        let advanceQuantity = [];
        state.items?.forEach((element) => {
          advanceQuantity.push({
            data: {
              qty: element.qty,
              length: element.value,
            },
          });
        });
        ex_attributes.advanced_quantity = advanceQuantity;
      }

      const dataAdd = {
        cartItem: {
          ...(!isAuthenticated && { quote_id: cardId }),
          sku: data?.sku,
          qty: qty,
          product_option: {
            extension_attributes: ex_attributes,
          },
        },
      };

      let result = null;

      if (!isAuthenticated) {
        result = await api.post(`/guest-carts/${cardId}/items`, dataAdd);
      }

      if (isAuthenticated) {
        result = await api.post('service/carts/mine/items', dataAdd);
        if (result) {
          await newApiFCM.post(`notification/updateCartReminderFlag`, {
            cartId: result.data.quote_id,
          });
        }
      }

      if (result) {
        setModalText('Đã thêm vào giỏ hàng');
        setModalShow(true);
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      setIsLoading(false);
      return;
    }

    setGetCartAgain(true);
    setIsLoading(false);
  };

  const checkOut = async (isTon = false) => {
    setIsLoading(true);
    await setFalseAll();
    await addToCart(isTon);
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
          <div className='pd-15'>
            <ChangeBedroomColor color={productPaintColor.color} />
          </div>
        )}

        {color && (
          <div className='pd-15'>
            <ImageHouse color={color} />
          </div>
        )}

        <RenderOptionsMobile
          unit={unit}
          qtyBrickExchange={qtyBrickExchange}
          handleSquare={handleSquare}
          square={square}
          setQtyState={setQtyState}
          setQty={setQty}
          renderTon={priceGroup && priceGroup.allow_custom_length}
          renderGach={!data?.extension_attributes.price_group[0].allow_custom_length}
          renderChooseColor={data?.extension_attributes && data?.extension_attributes.colors}
          renderCategoriesProduct={productOptions != null && productOptions?.length != 0 && currentOptions && customOptions?.length === 0}
          renderCustomOptions={customOptions}
          renderAnotherColorTon={priceGroup && priceGroup.allow_custom_length && 'Tôn lạnh,Tôn lạnh màu,Tôn PU lạnh màu,Tôn Hoa Sen Gold'.includes(priceGroup.group)}
          priceGroup={priceGroup}
          productOptions={productOptions}
          currentOptions={currentOptions}
          setModalShowTon={setModalShowTon}
          attributes={data?.extension_attributes}
          productPaintColor={productPaintColor}
          exchangeBrick={exchangeBrick}
          handleTypeColorSelect={handleTypeColorSelect}
          paintColor={paintColor}
          handleChangeColor={handleChangeColor}
          typeAllColor={typeAllColor}
          suggestColorList={suggestColorList}
          setProductPaintColor={setProductPaintColor}
          handleQty={handleQty}
          setQtyClient={setQtyClient}
          qty={qty}
          state={state}
          updateStateQty={updateStateQty}
          handleOption={handleOption}
          productVarients={productVarients}
          setSquare={setSquare}
          checkOut={checkOut}
          addToCart={addToCart}
          isLoading={isLoading}
          addToState={addToState}
          removeToState={removeToState}
          setValueState={setValueState}
          checkValueState={checkValueState}
        />

        {/* ------------------------------ Ưu đãi từ Hoa Sen Group --------------------------------- */}
        {commonData && <WidgetMobile sku={data.sku} commonData={commonData} />}

        {/* ------------------------------ Sản phẩm cùng danh mục --------------------------------- */}
        {data?.extension_attributes.category_links && data?.extension_attributes.category_links?.[0] && data?.extension_attributes.category_links?.[0].category_id && (
          <ProductSlide data={data?.extension_attributes.category_links?.[0].category_id} category={category} configPrice={configPrice.pricing ? configPrice.pricing : null} />
        )}

        {/* ------------------------------ Thông tin chung / Thông tin sản phẩm --------------------------------- */}

        <SummaryInfo brandID={brandID} data={data?.custom_attributes} category={category} brand={data?.extension_attributes.brand ? data?.extension_attributes.brand : null} />

        <DetailInfo data={data?.custom_attributes} extensionAttributes={data?.extension_attributes} productId={data?.id} commonData={commonData} category={category} brand={data?.extension_attributes.brand ? data?.extension_attributes.brand : null} />

        <CustomerReview data={data?.extension_attributes.review} productId={data?.id} />

        <div className='pd-15 sec-bd-bottom'>
          <CommentBlock productId={data?.id} />
        </div>

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
              addToCart(true);
            }}
          >
            <i className='icon-cart2'></i> Thêm vào giỏ hàng
          </button>
          <a
            className='item item-3'
            onClick={() => {
              checkOut(true);
            }}
          >
            Mua ngay
          </a>
        </div>
      )}
      <Modal show={modalTonShow} onHide={() => setModalShowTon(false)} scrollable={true}>
        <CategoryProducts data={data?.extension_attributes.category_links?.[0].category_id} category={category} configPrice={configPrice.pricing ? configPrice.pricing : null} isShowModal={true} />
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
                {data?.extension_attributes && data?.extension_attributes.colors && <ChangeBedroomColor color={productPaintColor.color} />}
                {color && <ImageHouse color={color} />}
              </div>

              <div className='col-lg-4 r1-c2'>
                <div className='box-shadow '>
                  <ProductInfor
                    name={data?.name}
                    isInWishlist={isInWishlist}
                    handleWishlist={handleWishlist}
                    unit={unit}
                    plus={plus}
                    rate={rate}
                    attributes={data?.extension_attributes}
                    custom_attributes={data?.custom_attributes}
                    category={category}
                    brandID={brandID}
                    basePrice={basePrice}
                    finalPrice={finalPrice}
                  />

                  <RenderOptions
                    unit={unit}
                    qtyBrickExchange={qtyBrickExchange}
                    handleSquare={handleSquare}
                    square={square}
                    setQtyState={setQtyState}
                    setQty={setQty}
                    renderTon={priceGroup && priceGroup.allow_custom_length}
                    renderGach={!data?.extension_attributes.price_group[0].allow_custom_length}
                    renderChooseColor={data?.extension_attributes && data?.extension_attributes.colors}
                    renderCategoriesProduct={productOptions != null && productOptions?.length != 0 && currentOptions && customOptions?.length === 0}
                    renderCustomOptions={customOptions}
                    renderAnotherColorTon={priceGroup && priceGroup.allow_custom_length && 'Tôn lạnh,Tôn lạnh màu,Tôn PU lạnh màu,Tôn Hoa Sen Gold'.includes(priceGroup.group)}
                    priceGroup={priceGroup}
                    productOptions={productOptions}
                    currentOptions={currentOptions}
                    setModalShowTon={setModalShowTon}
                    attributes={data?.extension_attributes}
                    productPaintColor={productPaintColor}
                    exchangeBrick={exchangeBrick}
                    handleTypeColorSelect={handleTypeColorSelect}
                    paintColor={paintColor}
                    handleChangeColor={handleChangeColor}
                    typeAllColor={typeAllColor}
                    suggestColorList={suggestColorList}
                    setProductPaintColor={setProductPaintColor}
                    handleQty={handleQty}
                    setQtyClient={setQtyClient}
                    qty={qty}
                    state={state}
                    updateStateQty={updateStateQty}
                    handleOption={handleOption}
                    productVarients={productVarients}
                    setSquare={setSquare}
                    checkOut={checkOut}
                    addToCart={addToCart}
                    isLoading={isLoading}
                    addToState={addToState}
                    removeToState={removeToState}
                    setValueState={setValueState}
                    checkValueState={checkValueState}
                  />
                </div>
              </div>
              <div className='col-lg-3 r1-c3'>{commonData && <Widget sku={data.sku} commonData={commonData} />}</div>
            </div>
          </section>
          {data?.extension_attributes?.category_links?.[0]?.category_id && <CategoryProducts data={data?.extension_attributes.category_links?.[0].category_id} category={category} configPrice={configPrice.pricing ? configPrice.pricing : null} />}
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
        <CategoryProducts data={data?.extension_attributes.category_links?.[0].category_id} category={category} configPrice={configPrice.pricing ? configPrice.pricing : null} isShowModal={true} />
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
    productVarients = data?.extension_attributes.configurable_config.index[0];
    productOptions = data?.extension_attributes.configurable_product_options;
  }
  let priceGroup = data && data?.extension_attributes ? data?.extension_attributes.price_group[0] : {};
  let category = data && data?.extension_attributes ? data?.extension_attributes?.category : {};

  return { props: { isMobile, data, optionPrice, productOptions, productVarients, isReviewError, reviewMessageError, configPrice, priceGroup, category: category ? category : {} } };
}

export default ProductDetail;
