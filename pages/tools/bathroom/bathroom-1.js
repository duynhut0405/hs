import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Desktop/Layout'
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb'
import t from '../../../translation'
import Color from '../../../components/Desktop/Tools/Color'
import Link from 'next/link'
import CategoryPaintProducts from '../../../components/Desktop/Products/CategoryPaintProducts'
import Menu from '../../menu'

function Paint({ }) {
  const [activeTab, setActiveTab] = useState('1');

  const [color, setColor] = useState({ Code: '', HEXCODE: '#ededed' });
  const [openColor, setOpenColor] = useState(false);
  const currentPirture = '/bathroom/phongtam-1.jpg';
  const suggest1 = '/bathroom/phongtam-1A.jpg';
  const suggest2 = '/bathroom/phongtam-1B.jpg';
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
                <h3 className="box-title-3">Phòng tắm cổ điển</h3>
                <div className="pd-20 border-bottom">
                  {activeTab == '1' && (
                    <div className="colorful">
                      <img id="background-image" src={currentPirture} alt="" />
                      <div id="container">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1441 957" style={{ enableBackground: 'new 0 0 1441 957' }} xmlSpace="preserve">
                          <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n\t.st1{fill:#EC008C;}\n\t.st2{display:none;}\n\t.st3{display:inline;}\n\t.st4{fill:none;stroke:#EC008C;stroke-miterlimit:10;}\n" }} />
                          <g>
                            <g style={{ fill: color.HEXCODE }}>
                              <path onClick={() => setOpenColor(true)} d="M1121.53,411.61l-236.11,0.73l-0.73-296.78l22.98-38.6l127.5,2.18l-0.27,2.45l2.72-3l109.93,0.54L1145.78,0H0v466.28
			l180.8-0.82v3.81l-39.78,1.36l-0.27,19.62l-21.52,1.36l-5.45,0.27l-0.54-21.25L0,473.09V957h176.58V643.07h-15.82V568.3
			l156.01-31.63l319.81-2.64v-16.35l1.91-2.91h14.3v19.62h159.51v40.05l49.86,44.95v15.8h-15.53v48.49h20.98l-12.53-15.8v-6.54
			h14.44v5.45l18.8,20.43v2.72h-41.68l1.09,143.55l107.61-2.16l-3-56.94c0,0-1.77,2.86-14.03,3.27
			c-12.26,0.41-17.98,5.45-19.07,10.49c-1.09,5.04-0.68,13.76-0.68,13.76s3.95,2.86,1.5,12.26c0,0,3.81,1.09,3.81,3.41
			s-1.23,11.99-1.23,11.99h-4.77v-2.72h-3.68v-5.04l-2.32-1.36c0,0-5.31,1.91-10.22-1.23c-4.9-3.13-6.81-9.81-4.22-16.35
			c2.59-6.54,11.58-8.31,15.39-6.81c0,0-0.82-12.67,5.18-17.57c5.99-4.9,12.67-6.54,17.71-6.4s15.67-1.77,16.07-3.13l-5.72-40.59
			c0,0-1.23-8.04,1.5-8.45l-1.77-3.68l-5.04-76.28l-2.04-37.32c0,0-4.77-3.68-5.31-5.31s0-14.85,0-14.85s0.41-2.59,5.59-2.32
			c5.18,0.27,140.17-0.68,140.17-0.68s3.95,0.68,14.17,3.81c10.22,3.13,23.02,8.31,23.02,8.31s1.63-0.68,1.36,5.86
			s0.03,10.76,0.03,10.76s-0.58,3.41-6.71,3.68c0,0-0.82,23.29-2.18,43.45c-1.36,20.16-5.58,63.48-5.58,63.48
			s-0.68,12.53-3.68,13.76c0,0,0.95,1.15,1.5,3.3c0.54,2.15-0.54,6.78-0.54,6.78l13.21,0.68c0,0,4.9-0.41,33.78,14.03l-0.82-349.4
			L1121.53,411.61z M285.87,492.43l-1.63,2l-17.8,1.82v-54.85l19.43,0.73V492.43z M298.4,370.56l-36.14-8.54v-21.25h11.26v18.53
			l26.88,6.72l-1.82-64.84h-6.18l-9.81-4l-0.18-2h-16.53v16.89l-3.63,0.73l-12.9-3.63v-19.8l1.09-2h34.51l24.88,12.53l1.82,70.65
			H298.4z M530.16,39.28l221.22,1.45v15.98l-1.82,11.62l-72.65-0.36v15.44l-69.56-0.91V67.06h-72.11l-5.09-11.44V39.28z
			 M803.87,475.54l-480.04,2.96V107.2l482.22,7.63L803.87,475.54z" />
                              <polygon points="357.48,333.87 357.48,344.22 365.51,347.9 365.51,333.87 		" />
                              <path d="M342.36,445.03l12.35,0.36v26.15h51.58v-9.63h73.92v1.63h-14.58v6.54h22.07V222.35h8.67l29.42,39.96h194.7v207.42
			l77.01-0.36l1.09-265.54l-292.78-1.82l-59.57-86.45l-114.79-2.18v358.17h10.9V445.03z M354.89,329.79l9.94-0.27v-3.68h7.9
			l15.53,6.95l-0.14,1.23h-5.72v1.77h-3.68l-2.72-1.91h-2.04v50.4l14.98,3.54v-11.58h8.17v15.53h-6.95l-24.66-6.27v-37.6h-2.18
			l-8.45-3.27V329.79z" />
                            </g>
                            <rect className="st0" width={1441} height={957} />
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
                                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n\t.st1{fill:#EC008C;}\n\t.st2{display:none;}\n\t.st3{display:inline;}\n\t.st4{fill:none;stroke:#EC008C;stroke-miterlimit:10;}\n" }} />
                                <g>
                                  <g style={{ fill: color.HEXCODE }}>
                                    <path d="M1121.53,411.61l-236.11,0.73l-0.73-296.78l22.98-38.6l127.5,2.18l-0.27,2.45l2.72-3l109.93,0.54L1145.78,0H0v466.28
			l180.8-0.82v3.81l-39.78,1.36l-0.27,19.62l-21.52,1.36l-5.45,0.27l-0.54-21.25L0,473.09V957h176.58V643.07h-15.82V568.3
			l156.01-31.63l319.81-2.64v-16.35l1.91-2.91h14.3v19.62h159.51v40.05l49.86,44.95v15.8h-15.53v48.49h20.98l-12.53-15.8v-6.54
			h14.44v5.45l18.8,20.43v2.72h-41.68l1.09,143.55l107.61-2.16l-3-56.94c0,0-1.77,2.86-14.03,3.27
			c-12.26,0.41-17.98,5.45-19.07,10.49c-1.09,5.04-0.68,13.76-0.68,13.76s3.95,2.86,1.5,12.26c0,0,3.81,1.09,3.81,3.41
			s-1.23,11.99-1.23,11.99h-4.77v-2.72h-3.68v-5.04l-2.32-1.36c0,0-5.31,1.91-10.22-1.23c-4.9-3.13-6.81-9.81-4.22-16.35
			c2.59-6.54,11.58-8.31,15.39-6.81c0,0-0.82-12.67,5.18-17.57c5.99-4.9,12.67-6.54,17.71-6.4s15.67-1.77,16.07-3.13l-5.72-40.59
			c0,0-1.23-8.04,1.5-8.45l-1.77-3.68l-5.04-76.28l-2.04-37.32c0,0-4.77-3.68-5.31-5.31s0-14.85,0-14.85s0.41-2.59,5.59-2.32
			c5.18,0.27,140.17-0.68,140.17-0.68s3.95,0.68,14.17,3.81c10.22,3.13,23.02,8.31,23.02,8.31s1.63-0.68,1.36,5.86
			s0.03,10.76,0.03,10.76s-0.58,3.41-6.71,3.68c0,0-0.82,23.29-2.18,43.45c-1.36,20.16-5.58,63.48-5.58,63.48
			s-0.68,12.53-3.68,13.76c0,0,0.95,1.15,1.5,3.3c0.54,2.15-0.54,6.78-0.54,6.78l13.21,0.68c0,0,4.9-0.41,33.78,14.03l-0.82-349.4
			L1121.53,411.61z M285.87,492.43l-1.63,2l-17.8,1.82v-54.85l19.43,0.73V492.43z M298.4,370.56l-36.14-8.54v-21.25h11.26v18.53
			l26.88,6.72l-1.82-64.84h-6.18l-9.81-4l-0.18-2h-16.53v16.89l-3.63,0.73l-12.9-3.63v-19.8l1.09-2h34.51l24.88,12.53l1.82,70.65
			H298.4z M530.16,39.28l221.22,1.45v15.98l-1.82,11.62l-72.65-0.36v15.44l-69.56-0.91V67.06h-72.11l-5.09-11.44V39.28z
			 M803.87,475.54l-480.04,2.96V107.2l482.22,7.63L803.87,475.54z" />
                                    <polygon points="357.48,333.87 357.48,344.22 365.51,347.9 365.51,333.87 		" />
                                    <path d="M342.36,445.03l12.35,0.36v26.15h51.58v-9.63h73.92v1.63h-14.58v6.54h22.07V222.35h8.67l29.42,39.96h194.7v207.42
			l77.01-0.36l1.09-265.54l-292.78-1.82l-59.57-86.45l-114.79-2.18v358.17h10.9V445.03z M354.89,329.79l9.94-0.27v-3.68h7.9
			l15.53,6.95l-0.14,1.23h-5.72v1.77h-3.68l-2.72-1.91h-2.04v50.4l14.98,3.54v-11.58h8.17v15.53h-6.95l-24.66-6.27v-37.6h-2.18
			l-8.45-3.27V329.79z" />
                                  </g>
                                  <rect className="st0" width={1441} height={957} />
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
                      <Link href="/tools/bathroom/bathroom-1">
                        <a href="/tools/bathroom/bathroom-1" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/bathroom/phongtam-1.jpg'} src="/images/no-image.svg" alt="" />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/bathroom/bathroom-2">
                        <a href="/tools/bathroom/bathroom-2" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/bathroom/phongtam-2.jpg'} src="/images/no-image.svg" alt="" />
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
                      <li className="active">
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
