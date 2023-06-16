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
      <section className="sec-tb ">
        <div className="container">
          <div className="wtabs-1">
            <div className="menu-tabs">
              <div className="menu-tab " data-actab-group="0" data-actab-id="1">
                <p>Tân trang nhà cửa</p>
              </div>
              <div className="menu-tab " data-actab-group="0" data-actab-id="2">
                <p>Sale lớn mừng xuân</p>
              </div>
              <div className="menu-tab " data-actab-group="0" data-actab-id="3">
                <p>Ưu đãi mừng xuân</p>
              </div>
              <div className="menu-tab active" data-actab-group="0" data-actab-id="4">
                <p>New year new home</p>
              </div>
              <div className="menu-tab " data-actab-group="0" data-actab-id="5">
                <p>Thắp sáng niềm tin mới</p>
              </div>
            </div>
          </div>

          <div className="row list-item list-p-1">
            {blockList.map((item, index) => (
              <div key={index} className="col-md-2 col-4 ">
                <div className="item   box-shadow">
                  <a href="03_product_detail.php" className="img tRes_68">
                    <img
                      className="lazy-hidden"
                      data-lazy-type="image"
                      data-lazy-src="https://magento2.mangoads.com.vn/pub/media/catalog/product/cache/fa2b041f099710ccb95ab5f36aa218fd/c/2/c26000061_be7gc1aerbvjreme.jpg"
                      src="assets/images/no-image.svg"
                      alt=""
                    />
                  </a>

                  <div className="divtext">
                    <h3 className="line-3 title">
                      <a href="03_product_detail.php">Sơn KOVA - K-109. Sơn lót kháng kiềm</a>
                    </h3>
                    <div className="ratingresult">
                      <span className="stars">
                        <i className="icon-star rated"></i>
                        <i className="icon-star rated"></i>
                        <i className="icon-star rated"></i>
                        <i className="icon-star rated"></i>
                        <i className="icon-star "></i>
                      </span>
                      <strong className="cl1 rating-point">4/5</strong>
                    </div>

                    <div className="price">
                      <strong>1.185.000 đ</strong> <span className="per">-30%</span>
                    </div>
                    <span className="btnlike <?php if($i%2==0) echo 'active'; ?>">
                      {" "}
                      <i className="icon-like"></i>{" "}
                    </span>
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
