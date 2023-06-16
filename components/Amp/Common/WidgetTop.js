import React from 'react'
import t from '../../../translation'
import Link from 'next/link'

function WidgetTop({data}) {
  return (
    
      <ul className="menu-1">
          <li ><a className="line-2 b" href="/blog">Bài viết <i className="icon-arrow-1 fs-10"></i></a></li>
            {data.details.map((item, index) => (

              <li key={index}>
                <Link href={`/blog/${item.identifier}`}>
                  <a className="line-2">{item.title}</a>
                </Link>
              </li>  
              
            ))}
        </ul>
    
  )
}

export default WidgetTop