import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

let blockList = ['','','','','','','',''];

function Html({}) {
  return (
    <>
    <section  className="sec-tb ">
      <div className="container">
        <Link href="!#">
        <a className="item"><img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/12/28/9e/f7b3d51fefb2805315731f4a5c018292.png" alt="LPTop.png"  /></a>
        </Link>
      </div>
    </section>

    <section  className="sec-tb ">
      <div className="container">
        <Link href="!#">
        <a className="item"><img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/0b/9d/c1/a46d98d0b8e2e898a219e705d1a49793.png" alt="LPTop.png"  /></a>
        </Link>
      </div>
    </section>

    <section  className="sec-tb ">
      <div className="container">
        <Link href="!#">
        <a className="item"><img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/08/a4/ec/7e87ed57c6c0eda2c040f2d68bd21e14.png" alt="LPTop.png"  /></a>
        </Link>
      </div>
    </section>

    <section  className="sec-tb ">
      <div className="container">
        <Link href="!#">
        <a className="item"><img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/bb/eb/13/f2d9e904085945fda2a4743ddecfba59.png" alt="LPTop.png"  /></a>
        </Link>
      </div>
    </section>

    <section  className="sec-tb ">
      <div className="container">
        <Link href="!#">
        <a className="item"><img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/ee/5a/6c/5748801caba7e93867cf0545c3d04f00.png" alt="LPTop.png"  /></a>
        </Link>
      </div>
    </section>
    <section  className="sec-tb ">
      <div className="container">
        <Link href="!#">
        <a className="item"><img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/08/a4/ec/7e87ed57c6c0eda2c040f2d68bd21e14.png" alt="LPTop.png"  /></a>
        </Link>
      </div>
    </section>
    <section  className="sec-tb ">
      <div className="container">
        <Link href="!#">
        <a className="item"><img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://salt.tikicdn.com/cache/w1240/ts/brickv2og/39/e9/e7/690d14efa24b4aa1d29633023c7a093e.png" alt="LPTop.png"  /></a>
        </Link>
      </div>
    </section>

    <section  className="sec-tb ">
      <div className="container">
        <div className="row">
          {blockList.map((item,index) => (
            <div key={index} className="col-6">
            <Link href="!#">
            <a className="item">
              <div className="img">
              <img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://salt.tikicdn.com/cache/w620/ts/brickv2og/e7/34/bd/371e401505c8c3ce26079b5e8a8b8eae.png" alt="LPTop.png"  />
              </div>
            </a>
            </Link>
           </div>
        ))}
        </div>
      </div>
    </section>


    <section  className="sec-tb ">
      <div className="container">
        <div className="row list-item justify-center">
          {blockList.map((item,index) => (
            <div key={index} className="col-lg-2 col-md-3">
            <Link href="!#">
            <a className="item text-center">
              <div className="img mb-10">
              <img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://salt.tikicdn.com/ts/brickv2og/6e/fb/c2/e71a4e50e70ebba2b78617aee542a284.png" alt="LPTop.png"  />
              </div>
              <div className="title b">Thành Viên Mới </div>
            </a>
            </Link>
           </div>
        ))}
        </div>
      </div>
    </section>

    <section  className="sec-tb ">
      <div className="container">
        <div className="row list-item list-coupon">
          {blockList.map((item,index) => (
            <div key={index} className="col-md-6">
              <div className="item box-shadow">
                <div className="row">
                  <div className="col-auto">
                    <div className="col-img bg1">
                      <div className="inner">

                        <div className="img">
                        <img className="lazy-hidden" data-lazy-type="image" data-lazy-src="https://vcdn.tikicdn.com/cache/128x128/ts/seller/52/e7/ff/1f333efa23cb994521d19e8d9f7785a0.jpg" alt="LPTop.png"  />
                        </div>
                        <div className="t1">Bảo Tín Watch</div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="col-text">
                      <h5 className="mb-10">Giảm 100K</h5>
                      <h6 className="mb-10">Mã : FA10MKI</h6>
                      <p>Cho đơn hàng từ 799K</p>

                      <div className="hsd">HSD: 28/02/21</div>
                      <div className="btn sm">Lưu</div>

                      <div className="wpopover">
                        <OverlayTrigger
                          key="top"
                          placement="top"
                          overlay={
                            <Popover id={`popover-positioned-top`}>
                              <Popover.Title as="h3">Mã : FA10MKI</Popover.Title>
                              <Popover.Content>

                              <ul className="ml-20">
                                <li>Giảm 10% tối đa 80K cho đơn hàng từ 249K.</li>
                                <li>Áp dụng cho các sản phẩm trong danh mục Thời Trang, Thời trang nữ, Thời trang nam, Giày - Dép nữ, Túi thời trang nữ, Giày - Dép nam, Túi thời trang nam, Balo và Vali, Phụ kiện thời trang, Đồng hồ và Trang sức.</li>
                                <li>Không áp dụng cho 1 số nhà bán.</li>
                                <li>Mỗi khách hàng được sử dụng tối đa 1 lần.  </li>
                              </ul>

                              </Popover.Content>
                            </Popover>
                          }
                        >
                          <span className="icon-faq"></span>
                        </OverlayTrigger>
                      </div>
                    
                    </div>
                  </div>  
                </div>            
              </div>
            </div>
        ))}
        </div>
      </div>
    </section>
    </>
  );
}


export default Html;
