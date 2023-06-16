import Link from 'next/link';
import Pagination from 'react-js-pagination';
import { useEffect, useState } from 'react';
import formatVND from '../../../utils/formatVND';
import CheckoutProduct from './CheckoutProduct';

function CheckoutCategory({ data, cate }) {
  const [activePage, setActivePage] = useState(1);
  const [category, setCategory] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (data) {
      setCategory(data);
    }
  }, [data]);

  return (
    <>
      <div className='group-product'>
        <div className='group-title'> {cate}</div>
        <div className=' list-p-3'>{category && category.map((item, index) => <CheckoutProduct item={item} key={item.item_id} />)}</div>
      </div>
    </>
  );
}

export default CheckoutCategory;
