import Link from 'next/link';
import Pagination from "react-js-pagination"
import {useEffect, useState} from 'react'
import formatVND from '../../../utils/formatVND'
import CheckoutProduct from './CheckoutProduct'

function CheckoutCategory({ data, cate }) {
  const [activePage, setActivePage] = useState(1);
  const [category, setCategory] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (data) {
      setCategory(data);
    }
  }, [data])

  return (
    <>
      <div className="group-product sec-bd-bottom">
        <div className="group-title"> {cate}</div>
        <br/>
        <div className="pd-15 list-p-3">
          {category && category.map((item, index) => (
            <CheckoutProduct item={item} key={index}/>
          ))}
        </div>
        <br/>
      </div>
    </>
  )
}

export default CheckoutCategory