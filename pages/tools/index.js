import React, {useState, useEffect} from 'react'
import Layout from '../../components/Desktop/Layout'
import BreadCrumb from '../../components/Desktop/Common/BreadCrumb'
import Link from 'next/link'
import CategoryPaintProducts from '../../components/Desktop/Products/CategoryPaintProducts'

const room = [
  {
    link:'/tools/bedroom/bedroom-1',
    title:'Phòng ngủ cho con',
    img:'/tool-bedroom/current.jpg'
  },
  {
    link: '/tools/bedroom/bedroom-2',
    title:'Phòng ngủ gia đình',
    img:'/tool-bedroom/phong-ngu-02.jpg'
  },
  {
    link:'/tools/bedroom/bedroom-3',
    title:'Phòng ngủ hiện đại',
    img:'/tool-bedroom/phong-ngu-03.jpg'
  },
  {
    link:'/tools/bedroom/bedroom-4',
    title:'Phòng ngủ tối giản',
    img:'/tool-bedroom/phong-ngu-04.jpg'
  },
  {
    link: '/tools/kitchen/kitchen-1',
    title: 'Phòng bếp tối giản',
    img: '/kitchen/kitchen-1.jpg'
  },
  {
    link: '/tools/kitchen/kitchen-2',
    title: 'Phòng bếp thanh lịch',
    img: '/kitchen/kitchen-2.jpg'
  },
  {
    link: '/tools/kitchen/kitchen-3',
    title: 'Phòng bếp sang trọng',
    img: '/kitchen/kitchen-3.jpg'
  },
  {
    link: '/tools/kitchen/kitchen-4',
    title: 'Phòng bếp hiện đại',
    img: '/kitchen/kitchen-4.jpg'
  },
  {
    link: '/tools/living-room/living-1',
    title: 'Phòng khách thanh lịch',
    img: '/living-room/phongkhach-1.jpg'
  },
  {
    link: '/tools/living-room/living-2',
    title: 'Phòng khách hiện đại',
    img: '/living-room/phongkhach-2.jpg'
  },
  {
    link: '/tools/living-room/living-3',
    title: 'Phòng khách tối giản',
    img: '/living-room/phongkhach-3.jpg'
  },
  {
    link: '/tools/bathroom/bathroom-1',
    title: 'Phòng tắm cổ điển',
    img: '/bathroom/phongtam-1.jpg'
  },
  {
    link: '/tools/bathroom/bathroom-2',
    title: 'Phòng tắm sang trọng',
    img: '/bathroom/phongtam-2.jpg'
  },
];

function Tools({}) {
  return (
    <Layout>
      <BreadCrumb data={[ {name: 'Tự phối màu sơn', link: '/tools', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Tự phối màu sơn</h3>
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
                    <Link href="/tools">
                      <a href="/tools">Tự phối màu sơn</a>
                    </Link>
                    <ul>
                      <li>
                        <Link href="/tools/bedroom/bedroom-1">
                          <a href="/tools/bedroom/bedroom-1">Phòng ngủ cho con</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/bedroom/bedroom-2">
                          <a href="/tools/bedroom/bedroom-2">Phòng ngủ gia đình</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/bedroom/bedroom-3">
                          <a href="/tools/bedroom/bedroom-3">Phòng ngủ hiện đại</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/bedroom/bedroom-4">
                          <a href="/tools/bedroom/bedroom-4">Phòng ngủ tối giản</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/kitchen/kitchen-1">
                          <a href="/tools/kitchen/kitchen-1">Phòng bếp tối giản</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/kitchen/kitchen-2">
                          <a href="/tools/kitchen/kitchen-2">Phòng bếp thanh lịch</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/kitchen/kitchen-3">
                          <a href="/tools/kitchen/kitchen-3">Phòng bếp sang trọng</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/kitchen/kitchen-4">
                          <a href="/tools/kitchen/kitchen-4">Phòng bếp hiện đại</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/living-room/living-1">
                          <a href="/tools/living-room/living-1">Phòng khách thanh lịch</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/living-room/living-2">
                          <a href="/tools/living-room/living-2">Phòng khách hiện đại</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/living-room/living-3">
                          <a href="/tools/living-room/living-3">Phòng khách tối giản</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/bathroom/bathroom-1">
                          <a href="/tools/bathroom/bathroom-1">Phòng tắm cổ điển</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/bathroom/bathroom-2">
                          <a href="/tools/bathroom/bathroom-2">Phòng tắm sang trọng</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <CategoryPaintProducts/>
        </div>
      </section>
    </Layout>
  )
}

export default Tools;