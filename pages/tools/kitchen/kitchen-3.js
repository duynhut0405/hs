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
  const currentPirture = '/kitchen/kitchen-3.jpg';
  const suggest1 = '/kitchen/kitchen-3A.jpg';
  const suggest2 = '/kitchen/kitchen-3B.jpg';
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
                <h3 className="box-title-3">Phòng bếp sang trọng</h3>
                <div className="pd-20 border-bottom">
                  {activeTab == '1' && (
                    <div className="colorful">
                      <img id="background-image" src={currentPirture} alt="" />
                      <div id="container">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1441 957" style={{ enableBackground: 'new 0 0 1441 957' }} xmlSpace="preserve">
                          <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n\t.st1{display:none;}\n\t.st2{display:inline;}\n\t.st3{fill:#EC008C;}\n\t.st4{fill:none;stroke:#EC008C;stroke-miterlimit:10;}\n" }} />
                          <g>
                            <g style={{ fill: color.HEXCODE }}>
                              <path onClick={() => setOpenColor(true)} d="M1405.45,224.79H989.17V17.74l14.17-18.53L438.12,0.94l9.53,12.44l-0.45,208.14H0v548.15h173.67V494.69l69.38-3.45h375.06
			c0,0-1.5-19.75,5.18-26.15l-7.08-6.27l-1.09,2.59c0,0-3.41-0.54-4.5-2.04l3.13-6.13l0.14-2.18c0,0,12.94-23.57,37.73-21.93
			l5.72-0.08v6.62h-2.59v16.35c0,0,13.08-0.68,22.88,5.31l1.63-0.95c0,0,5.86,1.09,8.72,4.63l-3,5.86c0,0,4.22,2.32,4.22,24.38
			h237.11v-4.54c0,0-1.45-6.36-1.63-20.34v-19.98h4v19.8c0,0,11.81-5.09,23.43-2.91c0,0-0.36,17.25-2,27.79h22.34v-2h2.36
			c0,0-2.18-8.17-12.9-15.44l0.73-1.63c0,0,9.81,5.81,14.17,16.35h2.36v-6.18h1.63v6.18h12.9v2.72h10.44h73.01v-30.15h11.71
			c0,0,0-1.41,1.23-2.5v-2.11c0,0-2.18,0-2.45-1.36c-0.27-1.36,0.14-4.84,9.19-4.84c9.06,0,11.58,2.38,11.58,4.9
			c0,1.5-2.66,1.36-2.66,1.36v1.77c0,0,2.66,1.23,2.66,3.54s0,13.83,0,13.83h2.25v-13.83c0,0,0-2.79,2.79-3.2v-1.91
			c0,0-2.25-0.27-2.45-2.25c-0.2-1.98,2.72-4.9,9.26-5.38c6.54-0.48,10.22,2.18,10.62,4.56c0.41,2.38-2.32,2.66-2.32,2.66v2.11
			c0,0,1.79,0.54,2.36,1.77c0.57,1.23,0,15.32,0,15.32h2.96v-14.71c0,0,0.27-2.18,2.38-2.32v-1.98c0,0-2.52,0.07-2.72-1.98
			s4.09-5.31,9.67-5.31s11.03,1.91,11.03,4.84s-2.59,2.52-2.59,2.52v1.5c0,0,2.18,0.48,2.59,2.66h13.76v37.05h12.12v-5.31h56.67
			v-3.27h-12.53v-10.49h2.45v-13.08h5.31v12.94h4.77v-42.91c0,0-1.63-6.48-5.45-6.48c-3.81,0-36.37,0-36.37,0s-4.9,1.44-4.9,5.8
			c0,4.36,0,12.94,0,12.94h-5.86v-14.44c0,0,0.95-10.9,10.76-10.9c9.81,0,38.82,0,38.82,0s8.72,0.41,8.72,11.99s0,44.27,0,44.27
			h5.72v-3.27h1.5v3.27h3.54v10.08h-10.76v5.58l112.52,3.27v272.03H1441v-563.4L1405.45,224.79z" />
                              <path d="M618.29,455.1l6.36,7.45c0,0,8.35-10.9,25.97-10.72v-16.16C650.62,435.66,633.18,432.76,618.29,455.1z" />
                            </g>
                            <rect x={0} y="0.78" className="st0" width={1441} height={957} />
                          </g>
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
                              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1441 957" style={{ enableBackground: 'new 0 0 1441 957' }} xmlSpace="preserve">
                                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n\t.st1{display:none;}\n\t.st2{display:inline;}\n\t.st3{fill:#EC008C;}\n\t.st4{fill:none;stroke:#EC008C;stroke-miterlimit:10;}\n" }} />
                                <g>
                                  <g style={{ fill: color.HEXCODE }}>
                                    <path d="M1405.45,224.79H989.17V17.74l14.17-18.53L438.12,0.94l9.53,12.44l-0.45,208.14H0v548.15h173.67V494.69l69.38-3.45h375.06
			c0,0-1.5-19.75,5.18-26.15l-7.08-6.27l-1.09,2.59c0,0-3.41-0.54-4.5-2.04l3.13-6.13l0.14-2.18c0,0,12.94-23.57,37.73-21.93
			l5.72-0.08v6.62h-2.59v16.35c0,0,13.08-0.68,22.88,5.31l1.63-0.95c0,0,5.86,1.09,8.72,4.63l-3,5.86c0,0,4.22,2.32,4.22,24.38
			h237.11v-4.54c0,0-1.45-6.36-1.63-20.34v-19.98h4v19.8c0,0,11.81-5.09,23.43-2.91c0,0-0.36,17.25-2,27.79h22.34v-2h2.36
			c0,0-2.18-8.17-12.9-15.44l0.73-1.63c0,0,9.81,5.81,14.17,16.35h2.36v-6.18h1.63v6.18h12.9v2.72h10.44h73.01v-30.15h11.71
			c0,0,0-1.41,1.23-2.5v-2.11c0,0-2.18,0-2.45-1.36c-0.27-1.36,0.14-4.84,9.19-4.84c9.06,0,11.58,2.38,11.58,4.9
			c0,1.5-2.66,1.36-2.66,1.36v1.77c0,0,2.66,1.23,2.66,3.54s0,13.83,0,13.83h2.25v-13.83c0,0,0-2.79,2.79-3.2v-1.91
			c0,0-2.25-0.27-2.45-2.25c-0.2-1.98,2.72-4.9,9.26-5.38c6.54-0.48,10.22,2.18,10.62,4.56c0.41,2.38-2.32,2.66-2.32,2.66v2.11
			c0,0,1.79,0.54,2.36,1.77c0.57,1.23,0,15.32,0,15.32h2.96v-14.71c0,0,0.27-2.18,2.38-2.32v-1.98c0,0-2.52,0.07-2.72-1.98
			s4.09-5.31,9.67-5.31s11.03,1.91,11.03,4.84s-2.59,2.52-2.59,2.52v1.5c0,0,2.18,0.48,2.59,2.66h13.76v37.05h12.12v-5.31h56.67
			v-3.27h-12.53v-10.49h2.45v-13.08h5.31v12.94h4.77v-42.91c0,0-1.63-6.48-5.45-6.48c-3.81,0-36.37,0-36.37,0s-4.9,1.44-4.9,5.8
			c0,4.36,0,12.94,0,12.94h-5.86v-14.44c0,0,0.95-10.9,10.76-10.9c9.81,0,38.82,0,38.82,0s8.72,0.41,8.72,11.99s0,44.27,0,44.27
			h5.72v-3.27h1.5v3.27h3.54v10.08h-10.76v5.58l112.52,3.27v272.03H1441v-563.4L1405.45,224.79z" />
                                    <path d="M618.29,455.1l6.36,7.45c0,0,8.35-10.9,25.97-10.72v-16.16C650.62,435.66,633.18,432.76,618.29,455.1z" />
                                  </g>
                                  <rect x={0} y="0.78" className="st0" width={1441} height={957} />
                                </g>
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
                      <li className="active">
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
          <CategoryPaintProducts />
        </div>
      </section>
    </Layout>
  )
}

export default Paint;
