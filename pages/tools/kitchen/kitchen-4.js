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
  const currentPirture = '/kitchen/kitchen-4.jpg';
  const suggest1 = '/kitchen/kitchen-4A.jpg';
  const suggest2 = '/kitchen/kitchen-4B.jpg';
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
                <h3 className="box-title-3">Phòng bếp hiện đại</h3>
                <div className="pd-20 border-bottom">
                  {activeTab == '1' && (
                    <div className="colorful">
                      <img id="background-image" src={currentPirture} alt="" />
                      <div id="container">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1441 957" style={{ enableBackground: 'new 0 0 1441 957' }} xmlSpace="preserve">
                          {/* <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n\t.st1{display:none;}\n\t.st2{display:inline;}\n\t.st3{fill:#EC008C;}\n\t.st4{fill:none;stroke:#EC008C;stroke-miterlimit:10;}\n" }} /> */}
                          <g>
                            <g style={{ fill: color.HEXCODE }}>
                              <path d="M1420.88,472.66c-12.73,0-16.53,19.4-16.66,29.15c0,0,2.26-0.95,2.5,0.95c0.24,1.9,0,10.35,0,10.35h4.28
			c0,0,0.71-13.21,8.21-13.45c8.56-0.27,8.45,13.45,8.45,13.45l5.24,0.48v-6.54c0,0-0.24-5.12,2.5-3.45
			C1435.4,503.6,1433.61,472.66,1420.88,472.66z" />
                              <path d="M1419.81,503.24c-3.93,0-4.76,4.16-5,9.88h9.28C1424.09,513.12,1423.74,503.24,1419.81,503.24z" />
                              <path onClick={() => setOpenColor(true)} d="M0,0v128.11h246.77l46.59,35.96v148.21l3.54,2.18v239.38l11.53-2.54h207.78v-9.81h126.23v-17.25h3.09v11.44h2.91v-29.79
			c0,0-0.54-16.16-5.63-15.44c-5.09,0.73-4.72,19.25-4.72,19.25h-4.72c0,0-0.73-23.25,10.35-24.34s8.54,29.79,8.54,29.79l0.25,20.34
			h2.84v5.81h79.01c0,0-2.09-7.81,7.36-5.9c0-1.63,0.73-5.09,5.09-4.63c0,0,0.54,1.73-0.54,1.91c-1.09,0.18-3.81,1-3.09,2.72
			c1.09,0.18,6.54-1.82,6.18,5.63h4.36c0,0-0.82-6.63,5.72-4.72c0,0,0.18-3-2.36-3.18c-0.36-0.64,0-1.91,0-1.91s3.72,0,4.36,4.99
			c0,0,6.72-3.09,7.26,4.9l3.36-0.18c0,0-1.82-6.36,6.63-4.99c0,0,0.91-1.91,0.45-4.18s3.45-0.82,2.91,0.09
			c-0.54,0.91-1.36,0.82-1.36,0.82l-0.18,3.45c0,0,7.08-1.91,7.08,4.81h103.89v-33.6l2.91-1.27h34.33v-1.63h38.32h39.05v-5.09
			l2.36-1.09l57.21,0.54l1.82,1.63v20.89h26.15l1.59,0.23h38.1v19.57h176.45l20.89,1.82c0,0,3.63-22.88-1.63-43.23l2.86-5.45
			l20.39,0.73v5.99c0,0-3.45,24.34,0,44.14l30.15,3.45v-35.05l21.7-0.64v-6.08c0,0-2.09,1.82-3.36,0.45s-1.63-36.33,18.98-39.14
			c8.54-0.54,18.85,11.62,20.07,31.51c0,0,2.72,12.71-4.18,8.72v4.9h5.4V0H0z M984.08,313.37l-16.35,9.44H487.52l-11.26-10.9V140.46
			h507.82V313.37z M1351.13,469.68h-20.78v-22.21h20.78V469.68z" />
                            </g>
                            <rect x={0} className="st0" width={1441} height={957} />
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
                                    <path onClick={() => setOpenColor(true)} d="M1420.88,472.66c-12.73,0-16.53,19.4-16.66,29.15c0,0,2.26-0.95,2.5,0.95c0.24,1.9,0,10.35,0,10.35h4.28
			c0,0,0.71-13.21,8.21-13.45c8.56-0.27,8.45,13.45,8.45,13.45l5.24,0.48v-6.54c0,0-0.24-5.12,2.5-3.45
			C1435.4,503.6,1433.61,472.66,1420.88,472.66z" />
                                    <path d="M1419.81,503.24c-3.93,0-4.76,4.16-5,9.88h9.28C1424.09,513.12,1423.74,503.24,1419.81,503.24z" />
                                    <path d="M0,0v128.11h246.77l46.59,35.96v148.21l3.54,2.18v239.38l11.53-2.54h207.78v-9.81h126.23v-17.25h3.09v11.44h2.91v-29.79
			c0,0-0.54-16.16-5.63-15.44c-5.09,0.73-4.72,19.25-4.72,19.25h-4.72c0,0-0.73-23.25,10.35-24.34s8.54,29.79,8.54,29.79l0.25,20.34
			h2.84v5.81h79.01c0,0-2.09-7.81,7.36-5.9c0-1.63,0.73-5.09,5.09-4.63c0,0,0.54,1.73-0.54,1.91c-1.09,0.18-3.81,1-3.09,2.72
			c1.09,0.18,6.54-1.82,6.18,5.63h4.36c0,0-0.82-6.63,5.72-4.72c0,0,0.18-3-2.36-3.18c-0.36-0.64,0-1.91,0-1.91s3.72,0,4.36,4.99
			c0,0,6.72-3.09,7.26,4.9l3.36-0.18c0,0-1.82-6.36,6.63-4.99c0,0,0.91-1.91,0.45-4.18s3.45-0.82,2.91,0.09
			c-0.54,0.91-1.36,0.82-1.36,0.82l-0.18,3.45c0,0,7.08-1.91,7.08,4.81h103.89v-33.6l2.91-1.27h34.33v-1.63h38.32h39.05v-5.09
			l2.36-1.09l57.21,0.54l1.82,1.63v20.89h26.15l1.59,0.23h38.1v19.57h176.45l20.89,1.82c0,0,3.63-22.88-1.63-43.23l2.86-5.45
			l20.39,0.73v5.99c0,0-3.45,24.34,0,44.14l30.15,3.45v-35.05l21.7-0.64v-6.08c0,0-2.09,1.82-3.36,0.45s-1.63-36.33,18.98-39.14
			c8.54-0.54,18.85,11.62,20.07,31.51c0,0,2.72,12.71-4.18,8.72v4.9h5.4V0H0z M984.08,313.37l-16.35,9.44H487.52l-11.26-10.9V140.46
			h507.82V313.37z M1351.13,469.68h-20.78v-22.21h20.78V469.68z" />
                                  </g>
                                  <rect x={0} className="st0" width={1441} height={957} />
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
                      <li>
                        <Link href="/tools/kitchen/kitchen-3">
                          <a href="/tools/kitchen/kitchen-3">Phòng bếp sang trọng</a>
                        </Link>
                      </li>
                      <li className="active">
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
