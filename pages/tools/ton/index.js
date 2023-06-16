import React, {useState, useEffect} from 'react'
import Layout from '../../../components/Desktop/Layout'
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb'
import Link from 'next/link'
import CategoryTonProducts from '../../../components/Desktop/Products/CategoryTonProducts'

const room = [
  {
    link:'/tools/ton/ton-1',
    title:'Biệt thự sân vườn 2 tầng',
    img:'/ton/01/01_Gốc.png'
  },
  {
    link:'/tools/ton/ton-2',
    title:'Mẫu nhà 2 tầng',
    img:'/ton/02/02_Gốc.jpg'
  },
  {
    link:'/tools/ton/ton-3',
    title:'Mẫu nhà cấp 4',
    img:'/ton/03/03_Gốc.png'
  },
  {
    link:'/tools/ton/ton-4',
    title:'Mẫu biệt thự tân cổ điển',
    img:'/ton/04/04_Gốc.png'
  }
];

function ToolsTon({}) {
  return (
    <Layout>
      <BreadCrumb data={[{name: 'Tôn', link: '/tools/ton', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Tự phối màu Tôn</h3>
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
                    <Link href="/tools/ton">
                      <a href="/tools/ton">Tự phối màu Tôn</a>
                    </Link>
                    <ul>
                    <li>
                        <Link href="/tools/ton/ton-1">
                          <a href="/tools/ton/ton-1">Biệt thự sân vườn 2 tầng</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/ton/ton-2">
                          <a href="/tools/ton/ton-2">Mẫu nhà 2 tầng</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/ton/ton-3">
                          <a href="/tools/ton/ton-3">Mẫu nhà cấp 4</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/ton/ton-4">
                          <a href="/tools/ton/ton-4">Mẫu biệt thự tân cổ điển</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <CategoryTonProducts/>
        </div>
      </section>
    </Layout>
  )
}

export default ToolsTon;