import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import ChildMenu from './ChildMenu'

function Menu({ data }) {
  const [showSub, setShowSub] = useState();
  return (

      <ul className="toggle-menu">
        {data.map((item, index) => (
          <li className={`${(item.children && item.children.length != 0) ? 'children' : ''}  `} key={index}>
            {
              (item.children && item.children.length != 0) ? <><input className="-np" type="checkbox" aria-label={item.name} /><div className="showsubmenu icon-arrow-1 ib"></div></> : ''
            }   
            <Link href={item.additional_data ? item.additional_data.request_path : '/'}>
              <a><span>{item.name}</span></a>
            </Link>
            {item.children.length != 0 && (
              <ChildMenu data={item.children}/>
            )}
          </li>
        ))} 
        
      </ul>

  )
}

export default Menu