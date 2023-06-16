import React from 'react'
import t from '../../../../translation'
import Link from 'next/link'

function WidgetTop({data}) {
  return (
    <div className="widget widget-menu box-shadow">
      <ul className="menu">
        <li >
          <Link  href="/blog/category/clip-quang-cao-san-pham" prefetch={false}>
            <a className="line-2 b"  href="/blog/category/clip-quang-cao-san-pham">{data.title ? data.title : t('good_experience')} <i className="icon-arrow-1 fs-10"></i></a>  
          </Link>
        </li>
        {data.details.map((item, index) => (
          (index<1) && (
          <li key={index}>
            <Link href={`blog/post/${item.identifier}`} prefetch={false}>
              <a href={`blog/post/${item.identifier}`} className="line-2">{item.title}</a>
            </Link>
          </li>  
          )          
        ))}
        <li>
            <a href={`/distribution`} className="line-2 b">Hệ thống siêu thị toàn quốc <i className="icon-arrow-1 fs-10"></i></a>
        </li>

      </ul>
    </div>
  )
}

export default WidgetTop