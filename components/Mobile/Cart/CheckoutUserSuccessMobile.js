import React, { useState, useEffect } from 'react'
import LayoutMobileOnlyHead from '../LayoutMobileOnlyHead'
import HeaderMobile from '../HeaderMobile'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'
import formatVND from '../../../utils/formatVND'
import Axios from 'axios'
import { useRouter } from 'next/router'
import t from '../../../translation'
import ReactHtmlParser from 'react-html-parser'
import checkImageExist from '../../../utils/checkImageExist'
import getLastSlashProduct from '../../../utils/getLastSlashProduct'

const newApiProduct = Axios.create({
  baseURL: process.env.PRODUCT_BASE_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'bearer ' + process.env.BEARER,
  }
});

const newApiCategory = Axios.create({
  baseURL: process.env.CATEGORY_BASE_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'bearer ' + process.env.BEARER,
  }
});

function CheckoutUserSuccessMobile({item}) {

  const [value, setValue] = useState(null);
  const [totalLength, setTotalLength] = useState(null);

  useEffect(() => {
    setValue(item);
    if (item?.extension_attributes?.options && item.qty_ordered) {
      const found = item.extension_attributes.options.find(element => element.label == 'Chiều dài');
      if (found) {
        let mySubString = found.value.substring(found.value.lastIndexOf(`> `) + 1, found.value.lastIndexOf(` mét </span>`));
        let length = parseFloat(mySubString);
        if (length) {
          setTotalLength(Number.isInteger(length*item.qty_ordered) ? length*item.qty_ordered : (length*item.qty_ordered).toFixed(2))
        }
      }
    }
  }, [item])

  return (
    value &&
    <div className="item ">
      <a href={value.extension_attributes.url_key ? `/product/${getLastSlashProduct(value.extension_attributes.url_key)}` : "#"} className="img tRes_68">
        <img src={value.extension_attributes.thumbnail ? value.extension_attributes.thumbnail : "/images/hoasen-product.jpg"} alt="" onError={async (e) => await checkImageExist(e)}/>
      </a>
      <div className="divtext">
        <div className="line-3 title"><a href={value.extension_attributes.url_key ? `/product/${getLastSlashProduct(value.extension_attributes.url_key)}` : "#"}>{value.name}</a></div>
        <div className="price">
          <strong>{formatVND(value.base_row_total)} đ</strong> <br />
        </div>
        {value.extension_attributes.options.map((data, index) => (
          <div className="action" key={index}>
            <span className="number">{data.label}: <span style={{color:"red"}}>{ReactHtmlParser(data.value)}</span></span>
            {(data.label == 'Chiều dài' && totalLength) && (<><br/><span style={{ fontSize: "14px", display: "inline-block" }}>Tổng chiều dài: <span style={{color: 'red'}}>{totalLength} mét</span></span></>) }
          </div>
        ))}
        <div className="action">
          <span className="number">{t('number')}: {value.qty_ordered}</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutUserSuccessMobile;