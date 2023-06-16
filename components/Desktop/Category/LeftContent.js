
import React, { useEffect, useState } from 'react'
import ChildMenu from '../Menu/ChildMenu'
import ChildMenuCategory from '../Menu/ChildMenuCategory'
import t from '../../../translation'
import { useRouter } from "next/router";

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function LeftContent({ allMenu, data, handleChangePrice, handleChangeBrand, handleChangeRating, setParamsUrl, initFiltersNavigation, filters, setFilters, handleChangeCustomFilters }) {
  const [showSub, setShowSub] = useState();
  const [currentPrice, setPrice] = useState(filters.price);
  const router = useRouter();

  const setFilterPrice = () => {
    var params = _objectWithoutProperties(router.query, ["category"]);
    router.push({ pathname: window.location.pathname, query: { ...params, price_from: currentPrice.from ? currentPrice.from: 0, price_to: currentPrice.to } }, undefined, { shallow: true });
  }
  return (
    <div className="col-lg-2 col-md-3  sidebar-product">
      <div className="sidebar-inner">
        <div className="widget widget-vertical-menu">
          <ul className=" vertical-menu">
            <li className={`children ${showSub == '0' ? 'parent-showsub' : ''}`}>
              <a href="#"><strong>{t('categories_title')}</strong></a>
              <div className="showsubmenu icon-arrow-1 ib" onClick={() => setShowSub('0')}></div>
                {allMenu != null} {
                  <ChildMenu data={allMenu} />
                }
            </li>
          </ul>
        </div>
        {(data != undefined && data.category != undefined && data.category.extension_attributes.sub_categories != undefined) && (
          <ChildMenuCategory category={data.category} />
        )}

          <div className="widget widget-price">
            <h6 className="widget-title">{t('price')}</h6>
            <div className="widget-content">
              <p>{t('input_price')}</p>
              <p>
                <input  className="input" type="number" placeholder="Từ đ" name="from" value={currentPrice.from === undefined ? '' : currentPrice.from} onChange={event => setPrice({...currentPrice, from: event.target.value})} />
              </p>
              <p>
                <input  className="input" type="number" placeholder="Đến đ" name="to" value={currentPrice.to === undefined ? '' : currentPrice.to} onChange={event => setPrice({...currentPrice, to: event.target.value})} />
              </p>
              <p><button className="btn" onClick={() => setFilterPrice()}>{t('using')}</button></p>
            </div>
          </div>

        {initFiltersNavigation.brand != undefined && (
          <div className="widget widget-menu">
            <h6 className="widget-title">{t('Brands')}</h6>
            <ul className="menu">
              {initFiltersNavigation.brand.value.map((item, index) => (
                <li key={index}><a onClick={() => handleChangeBrand(item)}>{item.label}</a></li>
              ))}
            </ul>
          </div>
        )}
        <div className="widget">
          <h6 className="widget-title">{t('Rating')}</h6>
          <div className="widget-content">
            <div className="ratingresult" onClick={() => handleChangeRating('5')}>
              <span className="stars">
                <i className="icon-star rated"></i>
                <i className="icon-star rated"></i>
                <i className="icon-star rated"></i>
                <i className="icon-star rated"></i>
                <i className="icon-star rated"></i>
              </span>
              <span>{t('from_5_stars')}</span>
            </div>
            <div className="ratingresult" onClick={() => handleChangeRating('4')}>
              <span className="stars">
                <i className="icon-star rated"></i>
                <i className="icon-star rated"></i>
                <i className="icon-star rated"></i>
                <i className="icon-star rated"></i>
                <i className="icon-star "></i>
              </span>
              <span>{t('from_4_stars')}</span>
            </div>
            <div className="ratingresult" onClick={() => handleChangeRating('3')}>
              <span className="stars">
                <i className="icon-star rated"></i>
                <i className="icon-star rated"></i>
                <i className="icon-star rated"></i>
                <i className="icon-star "></i>
                <i className="icon-star "></i>
              </span>
              <span>{t('from_3_stars')}</span>
            </div>
          </div>
        </div>

        {/* ----------------------- view more category ------------------- */}
        {initFiltersNavigation != undefined && (
          Object.keys(initFiltersNavigation).map((item, index) => (
            (item != 'brand' && item != 'cat' && item != 'price' && item != 'rating') && (
              <div className="widget widget-menu" key={index}>
                <h6 className="widget-title">{initFiltersNavigation[item].label}</h6>

                {initFiltersNavigation[item].value.length > 5 &&
                  <div className="toggleAutoHeightCss">
                    <input type="checkbox" id={`toggleAutoHeightCss-${index}`} />
                    <label className="tgh-toggle" htmlFor={`toggleAutoHeightCss-${index}`}>
                      <span className="m"> {t('view_more_detail')}</span>
                      <span className="l"> {t('view_less_detail')}</span>
                      {/* <i className="icon-arrow-2 ib"></i> */}
                    </label>
                    <div className="tgh-content" style={{ maxHeight: "200px" }} >
                      {initFiltersNavigation[item].value.map((val, i) => (
                        <li key={i}><a onClick={() => handleChangeCustomFilters(val, item)}>{val.label}</a></li>
                      ))}
                    </div>
                  </div>
                }

                {initFiltersNavigation[item].value.length <= 5 &&
                  initFiltersNavigation[item].value.map((val, i) => (
                    <li key={i}><a onClick={() => handleChangeCustomFilters(val, item)}>{val.label}</a></li>
                  ))
                }

              </div>
            )
          ))
        )}
      </div>
    </div >
  )
}

export default LeftContent