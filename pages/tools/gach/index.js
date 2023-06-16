import React, {useState, useEffect} from 'react'
import Layout from '../../../components/Desktop/Layout'
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb'
import Link from 'next/link'
import CategoryGachProducts from '../../../components/Desktop/Products/CategoryGachProducts'

const room = [
  {
    link:'/tools/gach/gach-1',
    title:'Phòng bếp cao cấp',
    img:'/gach/01/01_Gốc_2.jpg'
  },
  {
    link:'/tools/gach/gach-2',
    title:'Phòng bếp cổ điển',
    img:'/gach/02/02_Gốc.jpg'
  },
  {
    link:'/tools/gach/gach-3',
    title:'Phòng bếp hiện đại',
    img:'/gach/03/Gốc.jpg'
  },
  {
    link:'/tools/gach/gach-4',
    title:'Phòng bếp châu Âu',
    img:'/gach/04/04_Gốc_2.jpg'
  }
];

function ToolsGach({}) {
  return (
    <Layout>
      <BreadCrumb data={[{name: 'Tự phối màu gạch', link: '/tools/gach', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Tự phối màu gạch</h3>
                <div className="pd-20">
                  <div className="row  list-item list-b-9">
                    {room.map((item, index) => (
                      <div className="col-md-3 col-6 " key={index}>
                        <Link href={item.link}>
                          <a href={item.link} className="item ">
                            <div className="img tRes_66">
                              <img  className="lazy-hidden" data-lazy-type="image" data-lazy-src={item.img} src="/images/no-image.svg"  alt="" />
                            </div>
                            <div className="divtext">
                              <div className="title">{item.title}</div>
                            </div>
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* <p>Bạn cần tư vấn về phối màu sơn cho các loại hình khác như <strong>văn phòng, cửa hàng, trường học</strong>, …?<br />       Hãy đăng ký thông tin tư vấn phía dưới, chúng tôi sẽ hỗ trợ tư vấn miễn phí trong 24h</p> */}
            </div>
            <div className="col-lg-2 col-md-3">
              <div className="widget box-shadow">
                <h6 className="box-title-2 mg-0">Công cụ</h6>
                <ul className="accordion accordion-menu-2">
                  <li className=" children parent-showsub">
                    <Link href="/tools/gach">
                      <a href="/tools/gach">Tự phối màu gạch</a>
                    </Link>
                    <ul>
                    <li>
                        <Link href="/tools/gach/gach-1">
                          <a href="/tools/gach/gach-1">Phòng bếp cao cấp</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/gach/gach-2">
                          <a href="/tools/gach/gach-2">Phòng bếp cổ điển</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/gach/gach-3">
                          <a href="/tools/gach/gach-3">Phòng bếp hiện đại</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/gach/gach-4">
                          <a href="/tools/gach/gach-4">Phòng bếp châu Âu</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <CategoryGachProducts/>
        </div>
      </section>
    </Layout>
  )
}

export default ToolsGach;