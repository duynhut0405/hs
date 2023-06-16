import Link from 'next/link'

function ChildMenuCategory({category}) {
  return (
    <div className="widget widget-menu-category collapse" style={{paddingBottom:"0px"}}>
      {/* <input  id="show_more_category" type="checkbox" /> */}
        {/* <label htmlFor="show_more_category" className="more">Xem thêm <i className="icon-arrow-1"></i></label> */}
        <ul className="menu">
          <li>
            <a href="#"><strong>{category.name != undefined ? category.name : ''}</strong></a>
            <ul>
              {category.extension_attributes.sub_categories.map((item, index) => (
                <li key={index}>
                  <Link href={item.request_path ? '/'+item.request_path.replace(".html", "") : '#'}>
                    <a href={item.request_path ? '/'+item.request_path.replace(".html", "") : '#'}>{item.name ? item.name : ''}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          
        </ul>
    </div>
  )
}

export default ChildMenuCategory