
import React, { useEffect, useState } from 'react'
import ChildMenu from '../Menu/ChildMenu'
import ChildMenuCategory from '../Menu/ChildMenuCategory'
import t from '../../../translation'

function LeftContent( {allMenu, data, handleChangePrice, handleChangeBrand, handleChangeRating, setParamsUrl, initFiltersNavigation, filters, handleChangeCustomFilters, handleChangeCat, setFilters} ) {
  const [currentPrice, setPrice] = useState(filters.price);
  const [showCategory, setShowCategory] = useState(false);
  const setFilterPrice = () => {
    setFilters({
      ...filters,
      price: currentPrice
    })
  }
  return (
    <div className="col-lg-2 col-md-3  sidebar-product">
      <div className="sidebar-inner">
        <div className="widget widget-vertical-menu">
          <ul className=" vertical-menu">
            <li className="children">
              <a href="#"><strong>{t('categories_title')}</strong></a>
              {allMenu != null} {
                <ChildMenu data={allMenu}/>
              }
            </li>
          </ul>
        </div>
        {(initFiltersNavigation != undefined && initFiltersNavigation.cat != undefined && initFiltersNavigation.cat.value != undefined) && (
          <div className="widget widget-menu-category collapse">
            <input  id="show_more_category" type="checkbox" />
              <label onClick={() => setShowCategory(!showCategory)} htmlFor="show_more_category" className="more">{showCategory ? "Thu gọn" : "Xem thêm"} <i className="icon-arrow-1"></i></label>
              <ul className="menu">
                <li>
                  <a href="#"><strong>Danh mục</strong></a>
                  <ul>
                    {initFiltersNavigation.cat.value.map((item, index) => (
                      <li key={index}>
                        <a onClick={() => handleChangeCat(item)}>{item.label ? item.label : ''}</a>
                      </li>
                    ))}
                  </ul>
                </li>
                
              </ul>
          </div>
        )}
        {filters.price != undefined && (
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
        )}
        { initFiltersNavigation.brand != undefined && (
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
        { initFiltersNavigation != undefined && (
          Object.keys(initFiltersNavigation).map((item, index) => (
            (item != 'brand' && item != 'cat' && item != 'price' && item != 'rating') && (
              <div className="widget widget-menu" key = {index}>
                <h6 className="widget-title">{initFiltersNavigation[item].label}</h6>
                {initFiltersNavigation[item].value.length > 5 &&
                  <div className="toggleAutoHeightCss">
                    <input type="checkbox" id={`toggleAutoHeightCss-${index}`} />
                    <label className="tgh-toggle" htmlFor={`toggleAutoHeightCss-${index}`}>
                      <span className="m"> {t('view_more_detail')}</span>
                      <span className="l"> {t('view_less_detail')}</span>
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
    </div>
  )
}

export default LeftContent