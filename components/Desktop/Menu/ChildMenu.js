import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function ChildMenu({ data }) {
  const accordion = (e) => {
    var parent = e.parentElement;
    parent.classList.add('parent-showsub');
  }  

  const router = useRouter();
  const [showSub, setShowSub] = useState(); 




  return (
    <div className="wrapul">
      <ul>
        {data.map((item, index) => (
          <li className={`${(item.children && item.children.length != 0) ? 'children' : ''} ${showSub == index ? 'parent-showsub' : ''}`} key={index}>
            <Link href={(item.additional_data && item.additional_data.request_path != undefined) ? `/${item.additional_data.request_path.replace(".html", "")}` : '/'} prefetch={false}>
              <a href={(item.additional_data && item.additional_data.request_path != undefined) ? `/${item.additional_data.request_path.replace(".html", "")}` : '/'}><span>{item.name}</span></a>
            </Link>
            {
              (item.children && item.children.length != 0) ? <div className="showsubmenu icon-arrow-1 ib"   onClick={() => setShowSub(index)}></div> : ''
            }            
            {(item.children && item.children.length != 0) && (
              <ChildMenu data={item.children}/>
            )}
          </li>
        ))} 
      </ul>
    </div>
  )
}

export default ChildMenu