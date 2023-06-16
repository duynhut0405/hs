import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import ChildMenu from './ChildMenu';
const menuData = require('../../../public/json/menu.json');
function Menu({ data }) {
  const [showSub, setShowSub] = useState();
  return (
    <ul className='menu accordion'>
      {menuData &&
        menuData?.menuItems?.map((item, index) => (
          <li className={`${item.children && item.children.length != 0 ? 'children' : ''}  ${showSub == index ? 'parent-showsub' : ''}`} key={index}>
            <Link href={item.additional_data ? item.additional_data.request_path.replace('.html', '') : '/'}>
              <a>
                <span>{item.name}</span>
              </a>
            </Link>
            {item.children && item.children.length != 0 ? <div className='showsubmenu icon-arrow-1 ib' onClick={() => setShowSub(index)}></div> : ''}
            {item.children.length != 0 && <ChildMenu data={item.children} />}
          </li>
        ))}
    </ul>
  );
}

export default Menu;
