import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Desktop/Layout'
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb'
import t from '../../../translation'
import Color from '../../../components/Desktop/Tools/Color'
import Link from 'next/link'
import CategoryPaintProducts from '../../../components/Desktop/Products/CategoryPaintProducts'

function Paint({ }) {
  const [activeTab, setActiveTab] = useState('1');

  const [color, setColor] = useState({ Code: '', HEXCODE: '#ededed' });
  const [openColor, setOpenColor] = useState(false);
  const currentPirture = '/kitchen/kitchen-1.jpg';
  const suggest1 = '/kitchen/kitchen-1A.jpg';
  const suggest2 = '/kitchen/kitchen-1B.jpg';
  const [isChoised, setChoised] = useState(false);

  useEffect(() => {
    if (color.HEXCODE != '#ededed') {
      setChoised(true);
    }
  }, [color])

  return (
    <Layout>
      <BreadCrumb data={[{ name: 'Phòng bếp', link: '/account', isActive: true }]} />
      <section className=" sec-tb " >
        <div className="container">
          <div id="copied" className={`copied-custom ${isChoised ? 'active' : ''}`} style={{ display: `${isChoised ? 'block' : 'none'}` }}>* Bạn đã chọn: thương hiệu <strong>Toa</strong>, mã màu: <strong>{color.Code}</strong>, mã Hex: <strong>{color.HEXCODE}</strong> <span className="close close-custom" onClick={() => setChoised(false)}><i className="icon-close"></i></span></div>
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Phòng bếp tối giản</h3>
                <div className="pd-20 border-bottom">
                  {activeTab == '1' && (
                    <div className="colorful">
                      <img id="background-image" src={currentPirture} alt="" />
                      <div id="container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1441 957">
                          <defs>
                            {/* <style>.cls-1{isolation:isolate;}.cls-2{mix - blend - mode:multiply;}.cls-3{fill:none;}</style> */}
                          </defs>
                          <g className="cls-1"><g id="Layer_1" data-name="Layer 1">
                            <g className="cls-2" style={{ fill: color.HEXCODE }}>
                              <path onClick={() => setOpenColor(true)} d="M1225.28,67.87V262.94l-32.69,12.71H1076.71V217.53l-17.43,67.93h-16l-2.9,10.17H837.33l-3.27-9.08H819.17L815.53,272,823.16,166l76.28-.73V67.87H811.9v194.7l-5.45,13.81H686.94l-1.45-15.62V67.87H0V784.93H608V524.2L620.35,519h21.32v-2.79H643s-3.28-19.93,5.65-33c7.29-10.69,15.46-13.69,15.46-13.69v-4.63l5-4.9v-2h2.39s-.28-5.66,2-6.27c0,0-1-12.6,2.45-12.87,0,0,1.5-4.09,5.38-4s11,4,15.26,23.36c0,0-.34,4.22-5.65,4.56,0,0-4.57.41-5.18-3.33l-2.11-6.2v7s4.22,1,5.24,6.88c0,0,17.48,2.64,25.41,19.21,6.29,13.14,4.29,30.1,4.29,30.1h1v2.52h42.84v-1.29h24l-3.95-8.45h7.83v-.81h4s-.2-.89,0-.89h17v1.16h1.5v.61h2.32v4.91h5.38V506.9h2.11v7h1v-6.2h1.7V509h3.48v-.89h4.49v.95H834v-1.63h17.77v2.38l-3.88,5.59v2.25h25.54V516.1l-4.49-6v-1.84H857.31V507h6.2V460.73l-1-2.39s-2.18-1.43.14-2.52H867v-6.6s-.82-3.07-3.47-1.78v2a1.72,1.72,0,0,1-1.64,1.5c-1.43,0-2.38-.68-2.38-2.11s-1.71-38,40.32-41.07c0,0,36-.23,39.77,37,0,0,1.28,6.83-1.9,6.83s-2.64-4.36-2.64-4.36h-1.63s-1.09.1-1.09,3.46v5.17H937a1.35,1.35,0,0,1,1.27,1.36c0,1.28-1.81,1.37-1.81,1.37v1.18h14.8l-14.8,19.61v26.52h6.9v2h-6.45v2.27l-4.18,5.54v1.27H954.3v-2.36l-2.73-4.72v-2.55h15.26v1.82h1.36V508H972v-1.45h3.55v2.27h2.27v-1.09h3.63V509h4.9V507.4h15.8v2l-3.08,5.45h6.72v-3.54h-2.18v-2.63h6.54V515h6.9l2.45-4.18H1018v-2.08h25v2.63l-5.09,5.09v2.36h33.51l-4.27-28.25h5.55s-.91-7.72-3.75-10.12c-3.56-1.94-6.79-2.84-8.54-2.26a8.17,8.17,0,0,1-4.14-.52s2.91-2,5.11-1.87,7,1,7,1-.39-4-.78-4.07-2.65-2.2-9.76-2.46c2.65-.71,8.66,0,8.66,0l-.84-5.3s-3.62-4.59-6.85-5l3.23-.45s-2.13-5-1.42-5.63c2-.78,6.27-3.1,6.27-3.1l.65.9,2.39-1.81s-3.17-12.67-3.3-15.52c1.62,1.75,5.69,7.18,5.69,7.18s-1.74-2.59-1.48-4.78c2.13,1.29,8.27,7.43,8.27,7.43s5.63-2.58,7.5-2.52c-1.61,1.88-4.27,5.69-4.27,5.69l2.78,4.27,2.14-2.85v-3.75s-1.68-1-1.29-1.55a.74.74,0,0,1,1-.19l.33-7.89s3.3,2.26,3.88,11.31c2,1.94,3.68,3.82,4.33,9.18a18.65,18.65,0,0,0,3.1-1.74,9.59,9.59,0,0,1-2.32,4.2v1.42s3-4.13,6.27-5.43a9.54,9.54,0,0,1,1.36-3.17l1.42,1s3.81-6.07,13-5.69c-1.61.91-8.27,1-12.09,6.92,1.81,1.81,5.76,6.6-.19,15.71l1-.25s.59-3.11,8.28-5.18c-.13,1.68-3.1,4.66-3.1,4.66l1.87.13s-.39,3-5.24,5.56c-.32.9-2.71,8.92-3.49,10.73s-2.07,5.37-2.07,5.37h8.41l-8.27,29.09h93.17l40.32,3.45H1359l42.32,2.91V500l1.63-2.18L1389.83,488l2.36-2,12.9,9.26,2.91-4.54V426.76s-.37-21.07-21.07-21.07c-18,3.09-20.89,16.89-20.89,16.89a3.76,3.76,0,0,1-4,1.28c-2.54-.73-8.53-2.37-8.17-5.27,1.27-3.45,10.72-24.52,33.42-24.52s34.33,20,34.33,35.42v62.84l6.17,8.17v27.25l13.21,1.63V67.87Z" />
                              <rect x="989.53" y="67.87" width="87.18" height="96.99" />
                              <path d="M901.26,412.05c-16.16-.18-33.42,9.44-37.6,32.69,1.82-.91,5.82.73,6,4.18v6.9h14.89s1.64-13.8,15.62-13.8,14.89,13.8,14.89,13.8h15.08v-6.9a4.57,4.57,0,0,1,4.9-4S935,416.77,901.26,412.05Z" />
                              <path d="M899.76,444.83c-10.49,0-12.12,11-12.12,11h24.25S910.25,444.83,899.76,444.83Z" />
                              <polygon points="889.55 510.13 886.55 510.13 888.73 514.22 898.63 514.22 898.63 509.04 889.55 509.04 889.55 510.13" />
                              <polygon points="903.99 509.04 902.08 509.04 902.08 510.04 901.08 510.04 901.08 514.22 904.8 514.22 904.8 510.86 903.99 510.86 903.99 509.04" />
                              <polygon points="915.88 509.04 907.71 509.04 907.71 514.22 916.7 514.22 918.7 510.4 915.88 510.4 915.88 509.04" />
                              <path d="M1105.14,476.16l-3.46,3.18s0,5.45-2.27,7.63l-1.09,3.36h3.36l3.09-7.9Z" />
                            </g>
                            <rect className="cls-3" width="1441" height="957" /></g></g>
                        </svg>
                      </div>
                      {openColor && (
                        <div className="chosen-colors">
                          <div className="top">
                            <a className="btn-close-custom" onClick={(e) => setOpenColor(false)}><i className="icon-close"></i></a>
                            <h6 className="title">Chọn màu sơn
                            </h6>
                            <select className="select" name="gender">
                              <option value="Toa">Toa</option>
                            </select>
                          </div>
                          <div className="content">
                            <Color category="Toa" setColor={setColor} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab == '2' && (
                    <div className="colorful">
                      <img src={suggest1} alt="" />
                    </div>
                  )}
                  {activeTab == '3' && (
                    <div className="img tRes_66">
                      <img src={suggest2} alt="" />
                    </div>
                  )}
                  <br />
                  <div className="wtabs-3">
                    <div className="menu-tabs">
                      <div className={`menu-tab ${activeTab == '1' ? 'active' : ''}`} onClick={() => setActiveTab('1')}>
                        <div className="item">
                          <div className=" colorful">
                            <img id="background-image" src={currentPirture} alt="" className="img-custom" />
                            <div id="container">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1441 957">
                                <defs>
                                  {/* <style>.cls-1{isolation:isolate;}.cls-2{mix - blend - mode:multiply;}.cls-3{fill:none;}</style> */}
                                </defs>
                                <g className="cls-1"><g id="Layer_1" data-name="Layer 1">
                                  <g className="cls-2" style={{ fill: color.HEXCODE }}>
                                    <path d="M1225.28,67.87V262.94l-32.69,12.71H1076.71V217.53l-17.43,67.93h-16l-2.9,10.17H837.33l-3.27-9.08H819.17L815.53,272,823.16,166l76.28-.73V67.87H811.9v194.7l-5.45,13.81H686.94l-1.45-15.62V67.87H0V784.93H608V524.2L620.35,519h21.32v-2.79H643s-3.28-19.93,5.65-33c7.29-10.69,15.46-13.69,15.46-13.69v-4.63l5-4.9v-2h2.39s-.28-5.66,2-6.27c0,0-1-12.6,2.45-12.87,0,0,1.5-4.09,5.38-4s11,4,15.26,23.36c0,0-.34,4.22-5.65,4.56,0,0-4.57.41-5.18-3.33l-2.11-6.2v7s4.22,1,5.24,6.88c0,0,17.48,2.64,25.41,19.21,6.29,13.14,4.29,30.1,4.29,30.1h1v2.52h42.84v-1.29h24l-3.95-8.45h7.83v-.81h4s-.2-.89,0-.89h17v1.16h1.5v.61h2.32v4.91h5.38V506.9h2.11v7h1v-6.2h1.7V509h3.48v-.89h4.49v.95H834v-1.63h17.77v2.38l-3.88,5.59v2.25h25.54V516.1l-4.49-6v-1.84H857.31V507h6.2V460.73l-1-2.39s-2.18-1.43.14-2.52H867v-6.6s-.82-3.07-3.47-1.78v2a1.72,1.72,0,0,1-1.64,1.5c-1.43,0-2.38-.68-2.38-2.11s-1.71-38,40.32-41.07c0,0,36-.23,39.77,37,0,0,1.28,6.83-1.9,6.83s-2.64-4.36-2.64-4.36h-1.63s-1.09.1-1.09,3.46v5.17H937a1.35,1.35,0,0,1,1.27,1.36c0,1.28-1.81,1.37-1.81,1.37v1.18h14.8l-14.8,19.61v26.52h6.9v2h-6.45v2.27l-4.18,5.54v1.27H954.3v-2.36l-2.73-4.72v-2.55h15.26v1.82h1.36V508H972v-1.45h3.55v2.27h2.27v-1.09h3.63V509h4.9V507.4h15.8v2l-3.08,5.45h6.72v-3.54h-2.18v-2.63h6.54V515h6.9l2.45-4.18H1018v-2.08h25v2.63l-5.09,5.09v2.36h33.51l-4.27-28.25h5.55s-.91-7.72-3.75-10.12c-3.56-1.94-6.79-2.84-8.54-2.26a8.17,8.17,0,0,1-4.14-.52s2.91-2,5.11-1.87,7,1,7,1-.39-4-.78-4.07-2.65-2.2-9.76-2.46c2.65-.71,8.66,0,8.66,0l-.84-5.3s-3.62-4.59-6.85-5l3.23-.45s-2.13-5-1.42-5.63c2-.78,6.27-3.1,6.27-3.1l.65.9,2.39-1.81s-3.17-12.67-3.3-15.52c1.62,1.75,5.69,7.18,5.69,7.18s-1.74-2.59-1.48-4.78c2.13,1.29,8.27,7.43,8.27,7.43s5.63-2.58,7.5-2.52c-1.61,1.88-4.27,5.69-4.27,5.69l2.78,4.27,2.14-2.85v-3.75s-1.68-1-1.29-1.55a.74.74,0,0,1,1-.19l.33-7.89s3.3,2.26,3.88,11.31c2,1.94,3.68,3.82,4.33,9.18a18.65,18.65,0,0,0,3.1-1.74,9.59,9.59,0,0,1-2.32,4.2v1.42s3-4.13,6.27-5.43a9.54,9.54,0,0,1,1.36-3.17l1.42,1s3.81-6.07,13-5.69c-1.61.91-8.27,1-12.09,6.92,1.81,1.81,5.76,6.6-.19,15.71l1-.25s.59-3.11,8.28-5.18c-.13,1.68-3.1,4.66-3.1,4.66l1.87.13s-.39,3-5.24,5.56c-.32.9-2.71,8.92-3.49,10.73s-2.07,5.37-2.07,5.37h8.41l-8.27,29.09h93.17l40.32,3.45H1359l42.32,2.91V500l1.63-2.18L1389.83,488l2.36-2,12.9,9.26,2.91-4.54V426.76s-.37-21.07-21.07-21.07c-18,3.09-20.89,16.89-20.89,16.89a3.76,3.76,0,0,1-4,1.28c-2.54-.73-8.53-2.37-8.17-5.27,1.27-3.45,10.72-24.52,33.42-24.52s34.33,20,34.33,35.42v62.84l6.17,8.17v27.25l13.21,1.63V67.87Z" />
                                    <rect x="989.53" y="67.87" width="87.18" height="96.99" />
                                    <path d="M901.26,412.05c-16.16-.18-33.42,9.44-37.6,32.69,1.82-.91,5.82.73,6,4.18v6.9h14.89s1.64-13.8,15.62-13.8,14.89,13.8,14.89,13.8h15.08v-6.9a4.57,4.57,0,0,1,4.9-4S935,416.77,901.26,412.05Z" />
                                    <path d="M899.76,444.83c-10.49,0-12.12,11-12.12,11h24.25S910.25,444.83,899.76,444.83Z" />
                                    <polygon points="889.55 510.13 886.55 510.13 888.73 514.22 898.63 514.22 898.63 509.04 889.55 509.04 889.55 510.13" />
                                    <polygon points="903.99 509.04 902.08 509.04 902.08 510.04 901.08 510.04 901.08 514.22 904.8 514.22 904.8 510.86 903.99 510.86 903.99 509.04" />
                                    <polygon points="915.88 509.04 907.71 509.04 907.71 514.22 916.7 514.22 918.7 510.4 915.88 510.4 915.88 509.04" />
                                    <path d="M1105.14,476.16l-3.46,3.18s0,5.45-2.27,7.63l-1.09,3.36h3.36l3.09-7.9Z" />
                                  </g>
                                  <rect className="cls-3" width="1441" height="957" /></g></g>
                              </svg>
                            </div>
                          </div>
                          <div className="title">Tự phối màu</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '2' ? 'active' : ''}`} onClick={() => setActiveTab('2')}>
                        <div className="item">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={suggest1} src="/images/no-image.svg" alt="" />
                          </div>
                          <div className="title">Gợi ý 1</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '3' ? 'active' : ''}`} onClick={() => setActiveTab('3')}>
                        <div className="item">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={suggest2} src="/images/no-image.svg" alt="" />
                          </div>
                          <div className="title">Gợi ý 2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pd-20">
                  <h3 className="text-center">Các hình ảnh khác</h3>
                  <div className="row  list-item list-b-10 ">
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/kitchen/kitchen-1">
                        <a href="/tools/kitchen/kitchen-1" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/kitchen/kitchen-1.jpg'} src="/images/no-image.svg" alt="" />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/kitchen/kitchen-2">
                        <a href="/tools/kitchen/kitchen-2" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/kitchen/kitchen-2.jpg'} src="/images/no-image.svg" alt="" />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/kitchen/kitchen-3">
                        <a href="/tools/kitchen/kitchen-3" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/kitchen/kitchen-3.jpg'} src="/images/no-image.svg" alt="" />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/kitchen/kitchen-4">
                        <a href="/tools/kitchen/kitchen-4" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/kitchen/kitchen-4.jpg'} src="/images/no-image.svg" alt="" />
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
                      <li className="active">
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
                          <a href="/tools/living-room/living-2">Phòng khách thanh lịch</a>
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
          <CategoryPaintProducts />
        </div>
      </section>
    </Layout>
  )
}

export default Paint;
