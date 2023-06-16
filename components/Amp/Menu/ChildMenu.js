import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function ChildMenu({ data }) {
  const accordion = (e) => {
    var parent = e.parentElement;
    console.log(parent);
    parent.classList.add('parent-showsub');
  }  

  const router = useRouter();
  const [showSub, setShowSub] = useState(); 

  //console.log(router.route);



  return (
      <ul>
        {data.map((item, index) => (
          <li className={`${(item.children && item.children.length != 0) ? 'children' : ''} `} key={index}>
            {
              (item.children && item.children.length != 0) ? <><input   type="checkbox" aria-label={item.name} /><div className="showsubmenu icon-arrow-1 ib"></div></> : ''
            }               
            <Link href={(item.additional_data && item.additional_data.request_path != undefined) ? `/${item.additional_data.request_path.replace(".html", "")}` : '/'}>
              <a   href={(item.additional_data && item.additional_data.request_path != undefined) ? `/${item.additional_data.request_path.replace(".html", "")}` : '/'}><span>{item.name}</span></a>
            </Link>
            {(item.children && item.children.length != 0) && (
              <ChildMenu data={item.children}/>
            )}
          </li>
        ))} 
      </ul>
  )
}

export default ChildMenu