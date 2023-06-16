import React, {useState, useEffect} from 'react'
import Layout from '../../../components/Desktop/Layout'
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb'
import t from '../../../translation'
import Color from '../../../components/Desktop/Tools/Color'
import Link from 'next/link'
import CategoryPaintProducts from '../../../components/Desktop/Products/CategoryPaintProducts'


function Paint({}) {
  const [activeTab, setActiveTab] = useState('1');
  const [color, setColor] = useState({Code: '', HEXCODE:'#ededed'});
  const [openColor, setOpenColor] = useState(false);
  const currentPirture = '/tool-bedroom/phong-ngu-04.jpg';
  const suggest1 = '/tool-bedroom/phong-ngu-04A.jpg';
  const suggest2 = '/tool-bedroom/phong-ngu-04B.jpg';
  const [isChoised , setChoised ] = useState(false);

  useEffect(() => {
    if (color.HEXCODE != '#ededed') {
      setChoised(true);
    }
  }, [color])

  return (
    <Layout>
      <BreadCrumb data={[{name: 'Phòng ngủ tối giản', link: '/account', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
          <div id="copied" className={`copied-custom ${isChoised ? 'active' : ''}`} style={{display: `${isChoised ? 'block': 'none'}`}}>* Bạn đã chọn: thương hiệu <strong>Toa</strong>, mã màu: <strong>{color.Code}</strong>, mã Hex: <strong>{color.HEXCODE}</strong> <span className="close close-custom"><i className="icon-close"></i></span></div>
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Phòng ngủ tối giản</h3>
                <div className="pd-20 border-bottom">
                  
                      {activeTab == '1' && (
                        <div className="colorful">
                          <img id="background-image" src={currentPirture} alt="" />
                          <div id="container" onClick={() => setOpenColor(true)}>
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 956">
                              <defs><clipPath id="clip-path"><rect className="cls-1" width="1440" height="956"/></clipPath></defs>
                              <title>Phong-ngu-04</title><g className="cls-2" style={{fill:color.HEXCODE}}><polygon points="-0.01 723.75 54.22 723.76 54.3 -0.02 0 0 -0.01 723.75"/><path d="M438.12,0l.59,681.56a73.83,73.83,0,0,0,4.48-8.25A62,62,0,0,1,451.8,660c3.42-4,5.14-8.15,8.89-11.48s8.82-7.24,11.07-10.41,5.83-10.08,11.49-14.33,8.08-5.41,16.25-8.66a127.9,127.9,0,0,0,22.25-12.25c3.67-2.67,6.75-5.58,8.58-8.92s8.17-11.58,12.75-14.5S553,573.75,564,572c3.67-.92,13.67-2.58,13.67-2.58a25.44,25.44,0,0,1,.33-6.67c.25-5-.25-7.25,1.75-9.58a38.06,38.06,0,0,1,5.46-4.83l-.21-.58V546a18.81,18.81,0,0,0-4.33-.75,20.51,20.51,0,0,1-5.08.17c-.17.33-.33-2.17,0-3s5-9.58,5-9.58l-6.17-3.58a17,17,0,0,1,3.92-3.17c1.67-.75,2.42-.5,4.08-2.5s5.25-6.17,6.42-7.33,5.42-4.83,5.42-4.83-.33-4.33,7.08-6.08,11.33-.5,11.33-.5a103.55,103.55,0,0,1,34.58-4.08c2-3.25,8.67-6.75,11.33-6.83s6.58,4.33,8.92,4,15.25-1.83,41.17-.17c0,0,.08-6.92-.25-9.58-1-3-2-4.08-2.08-11.92a54.39,54.39,0,0,0-1.67-8.75c-1.08-3.58-2.33-8.92-3.08-11.5a56.11,56.11,0,0,1-1.25-7.33s-5.08-7.17-5.67-10.33c-1-4.58-1.58-7.17-1.58-7.17a42,42,0,0,1-3.08-6.92,39.55,39.55,0,0,1-3.58-5.17,7.32,7.32,0,0,0,5.17,1.17c3.08,0,6.83.42,6.83.42s5.42-3.33,14.42-2.42,49.25,4.17,61,5,33.75,3.33,47.42.25c0,0-1.25-1.33-.92-2.33a10.67,10.67,0,0,0,.5-2.92c.08-1.17,2.33-.83,2.33-.83s1.42-1.5,4.92.25,7.58,3.5,7.58,3.5,6.25-.5,17.5,2.08a35.42,35.42,0,0,1,7.42-.5l33.5-9.25s-.75-4-1.42-8.17c-1.17-4.25-3-8.58-3-10.08s-1.08-3.42-3-6.75l1.67-1.75a2.86,2.86,0,0,0,1.92,2.42c1.83,1,9.67,3.33,16.42,6.17s21,9.83,21,9.83,11.83-3.83,35.67,6.08c0,0,7.08-.25,22.75,1.92,15.58,1.83,24.08,2.17,28.42,5.67,0,0,1.5-3.58,16.42-3.58,15-1.08,19.17-1.17,23.25-2.83a25.55,25.55,0,0,1,12.67-1.42s9.08.75,10.42.42,7.17-2.42,9.75-2.75,6,.17,9.83-1.08a113.71,113.71,0,0,1,13-5.17s2.33-3,3.67-2.58c.58,1.5-.92,3-1,4.17s0,2.83-2.67,10.58c-2.08,8.25-5.75,20.58-6.67,26.75-1.25,6.08-1.42,9.42-4.5,13.67-.25.75-.83,1.92-.58,6.08s.92,13.67.08,18.58c0,4.83-.83,23.08-.83,23.08s10.5.83,11.83,2,7,7.5,7,7.5,13.83,7.25,15.75,8.58,13,6.83,13.5,7.25,1.83,1.67,1.92,2.5a32.08,32.08,0,0,1-3.08,3.58,105,105,0,0,1-12,10.75c-1.58,1.08-6.17,4.58-6.17,4.58s9.58,1.25,15.83,7.83c0,0,6.17,5.17,9.58,10.42,1.25,1.83,3,4.5,3,4.5s3.33,1.75,2.67,3.33c.42,1.25.17,2.75-2.33,3s-7.92,1.17-7.92,1.17,14.5,5.67,29.42,10.58S1233.75,607.25,1266,615c10.25,1.5,22.25,3.25,28.5,10.25,6,7.5,18.25,23.5,27.5,32.25,10.75,10.42,22.75,30.5,26.5,37.5,3.64,6.8,10.25,19.5,18.58,28.5l11.83,0,61-.14L1440,0Z"/></g></svg>
                          </div>
                          {openColor && (
                            <div className="chosen-colors">
                              <div className="top">
                                <a className="btn-close-custom" onClick={(e) => setOpenColor(false)}><i className="icon-close"></i></a>
                                <h6 className="title">Chọn màu sơn
                                </h6>
                                {/* <select className="select" name="gender">
                                  <option value="Toa">Toa</option>
                                </select> */}
                              </div>
                              <div className="content">
                                <Color category="Toa" setColor={setColor}/>
                              </div>
                            </div>
                          )}                
                        </div>

                      )}


                      {activeTab == '2' && (
                          <div className="colorful">
                            <img  src={suggest1}   alt="" />
                          </div>
                      )}
                      {activeTab == '3' && (
                          <div className="img tRes_66">
                            <img  src={suggest2}    alt="" />
                          </div>
                      )}

                      <br />
                  <div className="wtabs-3">
                    <div className="menu-tabs">
                      <div className={`menu-tab ${activeTab == '1' ? 'active' : ''}`}  onClick={() => setActiveTab('1')}>
                        <div className="item">
                          <div className=" colorful">
                            <img id="background-image" src={currentPirture} alt="" className="img-custom"/>
                            <div id="container">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 956">
                              <defs><clipPath id="clip-path"><rect className="cls-1" width="1440" height="956"/></clipPath></defs>
                              <title>Phong-ngu-04</title><g className="cls-2" style={{fill:color.HEXCODE}}><polygon points="-0.01 723.75 54.22 723.76 54.3 -0.02 0 0 -0.01 723.75"/><path d="M438.12,0l.59,681.56a73.83,73.83,0,0,0,4.48-8.25A62,62,0,0,1,451.8,660c3.42-4,5.14-8.15,8.89-11.48s8.82-7.24,11.07-10.41,5.83-10.08,11.49-14.33,8.08-5.41,16.25-8.66a127.9,127.9,0,0,0,22.25-12.25c3.67-2.67,6.75-5.58,8.58-8.92s8.17-11.58,12.75-14.5S553,573.75,564,572c3.67-.92,13.67-2.58,13.67-2.58a25.44,25.44,0,0,1,.33-6.67c.25-5-.25-7.25,1.75-9.58a38.06,38.06,0,0,1,5.46-4.83l-.21-.58V546a18.81,18.81,0,0,0-4.33-.75,20.51,20.51,0,0,1-5.08.17c-.17.33-.33-2.17,0-3s5-9.58,5-9.58l-6.17-3.58a17,17,0,0,1,3.92-3.17c1.67-.75,2.42-.5,4.08-2.5s5.25-6.17,6.42-7.33,5.42-4.83,5.42-4.83-.33-4.33,7.08-6.08,11.33-.5,11.33-.5a103.55,103.55,0,0,1,34.58-4.08c2-3.25,8.67-6.75,11.33-6.83s6.58,4.33,8.92,4,15.25-1.83,41.17-.17c0,0,.08-6.92-.25-9.58-1-3-2-4.08-2.08-11.92a54.39,54.39,0,0,0-1.67-8.75c-1.08-3.58-2.33-8.92-3.08-11.5a56.11,56.11,0,0,1-1.25-7.33s-5.08-7.17-5.67-10.33c-1-4.58-1.58-7.17-1.58-7.17a42,42,0,0,1-3.08-6.92,39.55,39.55,0,0,1-3.58-5.17,7.32,7.32,0,0,0,5.17,1.17c3.08,0,6.83.42,6.83.42s5.42-3.33,14.42-2.42,49.25,4.17,61,5,33.75,3.33,47.42.25c0,0-1.25-1.33-.92-2.33a10.67,10.67,0,0,0,.5-2.92c.08-1.17,2.33-.83,2.33-.83s1.42-1.5,4.92.25,7.58,3.5,7.58,3.5,6.25-.5,17.5,2.08a35.42,35.42,0,0,1,7.42-.5l33.5-9.25s-.75-4-1.42-8.17c-1.17-4.25-3-8.58-3-10.08s-1.08-3.42-3-6.75l1.67-1.75a2.86,2.86,0,0,0,1.92,2.42c1.83,1,9.67,3.33,16.42,6.17s21,9.83,21,9.83,11.83-3.83,35.67,6.08c0,0,7.08-.25,22.75,1.92,15.58,1.83,24.08,2.17,28.42,5.67,0,0,1.5-3.58,16.42-3.58,15-1.08,19.17-1.17,23.25-2.83a25.55,25.55,0,0,1,12.67-1.42s9.08.75,10.42.42,7.17-2.42,9.75-2.75,6,.17,9.83-1.08a113.71,113.71,0,0,1,13-5.17s2.33-3,3.67-2.58c.58,1.5-.92,3-1,4.17s0,2.83-2.67,10.58c-2.08,8.25-5.75,20.58-6.67,26.75-1.25,6.08-1.42,9.42-4.5,13.67-.25.75-.83,1.92-.58,6.08s.92,13.67.08,18.58c0,4.83-.83,23.08-.83,23.08s10.5.83,11.83,2,7,7.5,7,7.5,13.83,7.25,15.75,8.58,13,6.83,13.5,7.25,1.83,1.67,1.92,2.5a32.08,32.08,0,0,1-3.08,3.58,105,105,0,0,1-12,10.75c-1.58,1.08-6.17,4.58-6.17,4.58s9.58,1.25,15.83,7.83c0,0,6.17,5.17,9.58,10.42,1.25,1.83,3,4.5,3,4.5s3.33,1.75,2.67,3.33c.42,1.25.17,2.75-2.33,3s-7.92,1.17-7.92,1.17,14.5,5.67,29.42,10.58S1233.75,607.25,1266,615c10.25,1.5,22.25,3.25,28.5,10.25,6,7.5,18.25,23.5,27.5,32.25,10.75,10.42,22.75,30.5,26.5,37.5,3.64,6.8,10.25,19.5,18.58,28.5l11.83,0,61-.14L1440,0Z"/></g></svg>
                            </div>
                          </div>
                          <div className="title">Tự phối màu</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '2' ? 'active' : ''}`}  onClick={() => setActiveTab('2')}>
                        <div className="item">
                          <div className="img tRes_66">
                            <img  className="lazy-hidden" data-lazy-type="image" data-lazy-src={suggest1} src="/images/no-image.svg"  alt="" />
                          </div>
                          <div className="title">Gợi ý 1</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '3' ? 'active' : ''}`}  onClick={() => setActiveTab('3')}>
                        <div className="item">
                          <div className="img tRes_66">
                            <img  className="lazy-hidden" data-lazy-type="image" data-lazy-src={suggest2} src="/images/no-image.svg"  alt="" />
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
                      <Link href="/tools/bedroom/bedroom-1">
                        <a href="/tools/bedroom/bedroom-1" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/tool-bedroom/current.jpg'} src="/images/no-image.svg" alt=""/>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/bedroom/bedroom-2">
                      <a href="/tools/bedroom/bedroom-2" className="item ">
                        <div className="img tRes_66">
                          <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/tool-bedroom/phong-ngu-02.jpg'} src="/images/no-image.svg" alt=""/>
                        </div>
                      </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/bedroom/bedroom-3">
                      <a href="/tools/bedroom/bedroom-3" className="item ">
                        <div className="img tRes_66">
                          <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/tool-bedroom/phong-ngu-03.jpg'} src="/images/no-image.svg" alt=""/>
                        </div>
                      </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/bedroom/bedroom-4">
                        <a href="/tools/bedroom/bedroom-4" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/tool-bedroom/phong-ngu-04.jpg'} src="/images/no-image.svg" alt=""/>
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
                      <li className="active">
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

export default Paint;
