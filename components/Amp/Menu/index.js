import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import ChildMenu from './ChildMenu'

const MAX_ITEMS = 14;
const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];

function Menu({ data }) {
  const [showSub, setShowSub] = useState();
  const [renderMore, setRenderMore] = useState(false);
  const [newItem, setNewItem] = useState([]);
  useEffect(() => {
    if (data && data.length > 14) {
      let newData = [];
      setRenderMore(true);
      for (let index = 14; index < data.length; index++) {
        newData.push(data[index]);
      }
      setNewItem(newData);
    } 
  }, [data])
  return (
    <div className="sec-menu-category">
      {!renderMore ? 
       <ul className=" vertical-menu">
        {data.map((item, index) => (
          <li className={`${(item.children && item.children.length != 0) ? 'children' : ''}  ${showSub == index ? 'parent-showsub' : ''}`} key={index}>
            <Link href={item.additional_data ? item.additional_data.request_path : '/'}>
              <a><span>{item.name}</span></a>
            </Link>

            {
              (item.children && item.children.length != 0) ? <div className="showsubmenu icon-arrow-1 ib"   onClick={() =>   setShowSub(index)}></div> : ''
            }   

            {item.children.length != 0 && (
              <ChildMenu data={item.children}/>
            )}
          </li>
        ))} 
        
      </ul>
      :
      <ul className=" vertical-menu">
        {array.map((item, index) => (
          <li className={`${(data[item].children && data[item].children.length != 0) ? 'children' : ''}  ${showSub == index ? 'parent-showsub' : ''}`} key={index}>
            <Link href={data[item].additional_data ? data[item].additional_data.request_path : '/'}>
              <a><span>{data[item].name}</span></a>
            </Link>

            {
              (data[item].children && data[item].children.length != 0) ? <div className="showsubmenu icon-arrow-1 ib"   onClick={() =>   setShowSub(index)}></div> : ''
            }   

            {data[item].children.length != 0 && (
              <ChildMenu data={data[item].children}/>
            )}
          </li>
        ))}
        {newItem && <li className="children">
          <a><span>Xem thêm</span></a>
          {newItem.length != 0 && (
              <ChildMenu data={newItem}/>
            )}
        </li>}
      </ul>
      }
      
    </div>
  )
}

export default Menu