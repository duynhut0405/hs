import Link from 'next/link';
import Pagination from 'react-js-pagination';
import { useEffect, useState } from 'react';
import formatVND from '../../../utils/formatVND';
import Product from './Product';
import { useAuth } from '../../../contexts/auth';
import Cookie from 'js-cookie';
import api from '../../../services/api';
import Cookies from 'js-cookie';

function Category({ later, getCartLater, setLoadingCart2, setCaculating, delete_item_cart2, uncheck_item_cart1, check_item_cart2, data, cate, isParentChecked, setIsDeleted, setTotalAgain, caculatedResult, setState, state }) {
  const [category, setCategory] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(isAuthenticated ? 'local-products' : 'guest-products');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (data) {
      setCategory(data);
      data.forEach((element) => {
        if (element.extension_attributes.is_buy_latter == 1) {
          setIsChecked(false);
        }
      });
    }
  }, [data]);

  useEffect(() => {
    setIsChecked(isParentChecked);
  }, [isParentChecked]);

  const setCategoryChecked = async (e) => {
    setCaculating(true);
    const check = e.target.checked;
    if (later) {
      setLoadingCart2(true);
      check_item_cart2(category);
      return;
    }

    if (!check) {
      const list = JSON.parse(JSON.stringify(category));
      // setCategory([]);
      uncheck_item_cart1([...list]);
      setLoading(false);
      return;
    }
    const cardId = Cookie.get('cardId');
    let cat = category;
    setIsChecked(e.target.checked);

    let data1 = {};
    cat.forEach((element) => {
      element.extension_attributes.is_buy_latter = e.target.checked ? 0 : 1;
      data1[element.item_id] = e.target.checked;
    });
    let body = JSON.stringify(data1);
    setState({
      ...state,
      [cate]: cat,
    });
    if (isAuthenticated) {
      try {
        const result = await api.post(`carts/mine/set-buy-latter`, {
          data: body,
        });
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const result = await api.post(`guest-carts/${cardId}/set-buy-latter`, {
          data: body,
        });
      } catch (error) {
        throw error;
      }
    }
    setTotalAgain();
    setLoading(false);
  };

  const setItemBuylater = async (e, id, product) => {
    setCaculating(true);
    const check = e.target.checked;
    const guestId = Cookie.get('cardId');
    const url = !isAuthenticated ? `guest-carts/${guestId}/set-buy-latter/` : `carts/mine/set-buy-latter/`;
    if (later && check) {
      setLoadingCart2(true);
      await check_item_cart2([product]);
      return;
    }

    if (!check) {
      await uncheck_item_cart1([product]);
      return;
    }
    setLoading(true);
    let cat = category;
    const found = cat.find((element) => element.item_id == id);
    if (found) {
      let index = cat.indexOf(found);
      cat[index].extension_attributes.is_buy_latter = check ? 0 : 1;
      setState({
        ...state,
        [cate]: cat,
      });
    }

    try {
      const result = await api.post(url, {
        data: `{\"${id}\": ${check}}`,
      });
      setTotalAgain();
    } catch (error) {
      throw error;
    }

    setLoading(false);
  };

  return (
    <>
      <tr className='row-title'>
        <td colSpan='4'>
          <label className='checkbox  '>
            <input name='radio' type='checkbox' checked={isChecked} onChange={(e) => setCategoryChecked(e)} />
            <span></span>
            {cate}
          </label>
        </td>
      </tr>
      {category &&
        category.map((item, index) => (
          <Product
            later={later}
            delete_item_cart2={delete_item_cart2}
            getCartLater={getCartLater}
            loading={loading}
            item={item}
            key={index}
            cate={cate}
            setIsDeleted={setIsDeleted}
            setTotalAgain={setTotalAgain}
            caculatedResult={caculatedResult}
            setItemBuylater={setItemBuylater}
          />
        ))}
    </>
  );
}

export default Category;
