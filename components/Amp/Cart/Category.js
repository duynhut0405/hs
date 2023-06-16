import Link from 'next/link';
import Pagination from "react-js-pagination"
import {useEffect, useState} from 'react'
import formatVND from '../../../utils/formatVND'
import Product from './Product'
import {useAuth} from '../../../contexts/auth'
import Cookie from 'js-cookie'
import api from '../../../services/api'

function Category({ data, cate, isParentChecked, setIsDeleted, setTotalAgain, caculatedResult, setState, state }) {
  const [category, setCategory] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    if (data) {
      setCategory(data);
      data.forEach(element => {
        if (element.extension_attributes.is_buy_latter == 1) {
          setIsChecked(false);
        }
      });
    }
  }, [data])

  useEffect(() => {
    setIsChecked(isParentChecked)
  }, [isParentChecked])


  const setCategoryChecked = async (e) => {
    const cardId = Cookie.get('cardId');
    let cat = category;
    let data1 = {};
    setIsChecked(e.target.checked);
    cat.forEach(element => {
      element.extension_attributes.is_buy_latter = e.target.checked ? 0 : 1; 
      data1[element.item_id] = e.target.checked;
    });
    let body = JSON.stringify(data1);
    setState({
      ...state,
      [cate]: cat
    })
    if (isAuthenticated) {
      try {
        const result = await api.post(`carts/mine/set-buy-latter`, {
          data: body
        });
      } catch (error) {
        throw(error)
      }
    } else {
      try {
        const result = await api.post(`guest-carts/${cardId}/set-buy-latter`, {
          data: body
        });
      } catch (error) {
        throw(error)
      }
    }
    setTotalAgain();
  }

  const setItemBuylater = async (e, id) => {
    let cat = category;
    const found = cat.find(element => element.item_id == id);
    if (found) {
      let index = cat.indexOf(found);
      cat[index].extension_attributes.is_buy_latter = e.target.checked ? 0 : 1;
      setState({
        ...state,
        [cate]: cat
      })
    }
    if (!isAuthenticated) {
      const guestId = Cookie.get('cardId');
      try {
        const result = await api.post(`guest-carts/${guestId}/set-buy-latter`, {
          "data": `{\"${id}\": ${e.target.checked}}`
        });
        setTotalAgain();
      } catch (error) {
        throw error
      }
    } else {
      try {
        const result = await api.post(`carts/mine/set-buy-latter`, {
          "data": `{\"${id}\": ${e.target.checked}}`
        });
        setTotalAgain();
      } catch (error) {
        throw error
      }
    }
  }
  

  return (
    <>
      <tr className="row-title">
        <td colSpan="4">
          <label className="checkbox  ">
            <input  name="radio" type="checkbox" checked={isChecked} onChange={(e) => setCategoryChecked(e)}/>
            <span></span>
            {cate}
          </label>
        </td>
      </tr>
      {category && category.map((item, index) => (
        <Product item={item} key={index} setIsDeleted={setIsDeleted} setTotalAgain={setTotalAgain} caculatedResult={caculatedResult} setItemBuylater={setItemBuylater}/>
      ))}
    </>
  )
}

export default Category