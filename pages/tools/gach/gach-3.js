import React, {useState, useEffect} from 'react'
import Layout from '../../../components/Desktop/Layout'
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb'
import t from '../../../translation'
import Color from '../../../components/Desktop/Tools/Color'
import Link from 'next/link'
import CategoryGachProducts from '../../../components/Desktop/Products/CategoryGachProducts'


function Paint({}) {
  const [activeTab, setActiveTab] = useState('1');
  const [color, setColor] = useState({Code: '', HEXCODE:'#ededed'});
  const [openColor, setOpenColor] = useState(false);
  const currentPirture = '/gach/03/Gốc.jpg';
  const suggest1 = '/gach/03/Gạch sàn bếp-07.jpg';
  const suggest2 = '/gach/03/Gạch sàn bếp-13.jpg';
  const [isChoised , setChoised ] = useState(false);

  useEffect(() => {
    if (color.HEXCODE != '#ededed') {
      setChoised(true);
    }
  }, [color])

  return (
    <Layout>
      <BreadCrumb data={[{name: 'Đổi màu gạch', link: '/tools/gach', isActive: false},{name: 'Phòng bếp hiện đại', link: '/tools/gach/gach-3', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
          <div id="copied" className={`copied-custom ${isChoised ? 'active' : ''}`} style={{display: `${isChoised ? 'block': 'none'}`}}>* Bạn đã chọn mã màu: <strong>{color.Code}</strong> <span className="close close-custom"><i className="icon-close"></i></span></div>
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Phòng bếp hiện đại</h3>
                <div className="pd-20 border-bottom">
                  
                    {activeTab == '1' && (
                        <div className="colorful">
                          <img id="background-image" src={currentPirture} alt="" />
                          <div id="container" onClick={() => setOpenColor(true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>Solid3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                            <polygon className="cls-1" style={{fill:color.HEXCODE}} points="1439.5 626 1439.5 811.92 1440 812.21 1440 626 1439.5 626"/>
                            <polygon className="cls-1" points="0.5 795.1 0.5 626 0 626 0 801.46 0.5 801.27 0.5 795.1"/><rect className="cls-1" x="0.5" width="1438.75" height="956"/>
                            <path  className="cls-1" d="M1439.25,626H.5V801.27l161.17-62V841h13.2l3-2H184s-22.35,83.37-22.35,84.39c-2,7.12,2,8.13,3,8.13,6.1,0,9.15-7.11,9.15-7.11l16.25-62h52.83s-1,9.15-1,10.16c0,5.09,4.06,5.09,5.08,5.09,3.05,0,5.08-6.1,5.08-6.1l1-9.15h52.83s5.08,54.9,5.08,57.95,1,8.13,3.05,10.17c8.12,3,9.14-7.12,9.14-7.12l-5.08-61h52.82s2,9.15,3.05,11.18c3,5.08,5.08,4.07,6.1,4.07,5.08-1,4.06-8.14,4.06-8.14l-2-7.11h32.5s-11.17,53.88-12.19,54.9c-2,7.12-1,12.2,0,13.22,5.08,4.06,9.15-6.1,9.15-6.1l14.22-62h28.44l-1,7.11c-1,8.14,3,8.14,3,8.14,4.07,0,6.1-6.1,6.1-6.1l1-9.15h79.23s8.13,60,8.13,62c0,5.08,4.06,7.11,5.08,7.11,5.08-1,5.08-8.13,5.08-8.13l-7.11-61h29.46s2,8.13,2,9.15c1,6.1,5.08,6.1,6.09,6.1,4.07-1,3-7.12,3-7.12l-2-8.13h59.93l-12.19,63c-1,5.09,3,6.1,3,6.1,3.05,0,5.08-4.06,5.08-4.06l13.21-65.07h5.08s-2,9.15-2,10.16c-1,4.07,2,5.09,2,5.09a4.4,4.4,0,0,0,4.06-2l3-13.21H780.32s10.16,63,10.16,65.07c2,4.06,3,4.06,5.08,4.06a5.47,5.47,0,0,0,3.05-6.1l-9.14-63h5.07l2,10.16c2,6.1,4.06,5.09,5.08,5.09,3-1,2-6.1,2-6.1l-1-9.15h49.78V838.94h3v3h13.2V713.88h396.19"/>
                            <path  style={{fill:color.HEXCODE}} d="M1264.89,713.88H868.7V842H855.5v-3h-3v23.39H802.67l1,9.15s1,5.08-2,6.1c-1,0-3,1-5.08-5.09l-2-10.16h-5.07l9.14,63a5.47,5.47,0,0,1-3.05,6.1c-2,0-3,0-5.08-4.06,0-2-10.16-65.07-10.16-65.07H673.66l-3,13.21a4.4,4.4,0,0,1-4.06,2s-3-1-2-5.09c0-1,2-10.16,2-10.16h-5.08L648.26,927.4s-2,4.06-5.08,4.06c0,0-4.06-1-3-6.1l12.19-63H592.39l2,8.13s1,6.1-3,7.12c-1,0-5.08,0-6.09-6.1,0-1-2-9.15-2-9.15H553.79l7.11,61s0,7.12-5.08,8.13c-1,0-5.08-2-5.08-7.11,0-2-8.13-62-8.13-62H463.38l-1,9.15s-2,6.1-6.1,6.1c0,0-4.06,0-3-8.14l1-7.11H425.79l-14.22,62s-4.07,10.16-9.15,6.1c-1-1-2-6.1,0-13.22,1-1,12.19-54.9,12.19-54.9h-32.5l2,7.11s1,7.12-4.06,8.14c-1,0-3.05,1-6.1-4.07-1-2-3.05-11.18-3.05-11.18H318.11l5.08,61s-1,10.17-9.14,7.12c-2-2-3.05-7.12-3.05-10.17s-5.08-57.95-5.08-57.95H253.09l-1,9.15s-2,6.1-5.08,6.1c-1,0-5.08,0-5.08-5.09,0-1,1-10.16,1-10.16H190.11l-16.25,62s-3.05,7.11-9.15,7.11c-1,0-5.07-1-3-8.13,0-1,22.35-84.39,22.35-84.39h-6.1l-3,2h-13.2V739.3L.5,801.27V956H1439.25V811.93Z"/>
                            </g></g></svg>
                          </div>
                          {openColor && (
                            <div className="chosen-colors">
                              <div className="top">
                                <a className="btn-close-custom" onClick={(e) => setOpenColor(false)}><i className="icon-close"></i></a>
                                <h6 className="title">Chọn Màu gạch
                                </h6>
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>Solid3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                            <polygon className="cls-1" style={{fill:color.HEXCODE}} points="1439.5 626 1439.5 811.92 1440 812.21 1440 626 1439.5 626"/>
                            <polygon className="cls-1" points="0.5 795.1 0.5 626 0 626 0 801.46 0.5 801.27 0.5 795.1"/><rect className="cls-1" x="0.5" width="1438.75" height="956"/>
                            <path  className="cls-1" d="M1439.25,626H.5V801.27l161.17-62V841h13.2l3-2H184s-22.35,83.37-22.35,84.39c-2,7.12,2,8.13,3,8.13,6.1,0,9.15-7.11,9.15-7.11l16.25-62h52.83s-1,9.15-1,10.16c0,5.09,4.06,5.09,5.08,5.09,3.05,0,5.08-6.1,5.08-6.1l1-9.15h52.83s5.08,54.9,5.08,57.95,1,8.13,3.05,10.17c8.12,3,9.14-7.12,9.14-7.12l-5.08-61h52.82s2,9.15,3.05,11.18c3,5.08,5.08,4.07,6.1,4.07,5.08-1,4.06-8.14,4.06-8.14l-2-7.11h32.5s-11.17,53.88-12.19,54.9c-2,7.12-1,12.2,0,13.22,5.08,4.06,9.15-6.1,9.15-6.1l14.22-62h28.44l-1,7.11c-1,8.14,3,8.14,3,8.14,4.07,0,6.1-6.1,6.1-6.1l1-9.15h79.23s8.13,60,8.13,62c0,5.08,4.06,7.11,5.08,7.11,5.08-1,5.08-8.13,5.08-8.13l-7.11-61h29.46s2,8.13,2,9.15c1,6.1,5.08,6.1,6.09,6.1,4.07-1,3-7.12,3-7.12l-2-8.13h59.93l-12.19,63c-1,5.09,3,6.1,3,6.1,3.05,0,5.08-4.06,5.08-4.06l13.21-65.07h5.08s-2,9.15-2,10.16c-1,4.07,2,5.09,2,5.09a4.4,4.4,0,0,0,4.06-2l3-13.21H780.32s10.16,63,10.16,65.07c2,4.06,3,4.06,5.08,4.06a5.47,5.47,0,0,0,3.05-6.1l-9.14-63h5.07l2,10.16c2,6.1,4.06,5.09,5.08,5.09,3-1,2-6.1,2-6.1l-1-9.15h49.78V838.94h3v3h13.2V713.88h396.19"/>
                            <path  style={{fill:color.HEXCODE}} d="M1264.89,713.88H868.7V842H855.5v-3h-3v23.39H802.67l1,9.15s1,5.08-2,6.1c-1,0-3,1-5.08-5.09l-2-10.16h-5.07l9.14,63a5.47,5.47,0,0,1-3.05,6.1c-2,0-3,0-5.08-4.06,0-2-10.16-65.07-10.16-65.07H673.66l-3,13.21a4.4,4.4,0,0,1-4.06,2s-3-1-2-5.09c0-1,2-10.16,2-10.16h-5.08L648.26,927.4s-2,4.06-5.08,4.06c0,0-4.06-1-3-6.1l12.19-63H592.39l2,8.13s1,6.1-3,7.12c-1,0-5.08,0-6.09-6.1,0-1-2-9.15-2-9.15H553.79l7.11,61s0,7.12-5.08,8.13c-1,0-5.08-2-5.08-7.11,0-2-8.13-62-8.13-62H463.38l-1,9.15s-2,6.1-6.1,6.1c0,0-4.06,0-3-8.14l1-7.11H425.79l-14.22,62s-4.07,10.16-9.15,6.1c-1-1-2-6.1,0-13.22,1-1,12.19-54.9,12.19-54.9h-32.5l2,7.11s1,7.12-4.06,8.14c-1,0-3.05,1-6.1-4.07-1-2-3.05-11.18-3.05-11.18H318.11l5.08,61s-1,10.17-9.14,7.12c-2-2-3.05-7.12-3.05-10.17s-5.08-57.95-5.08-57.95H253.09l-1,9.15s-2,6.1-5.08,6.1c-1,0-5.08,0-5.08-5.09,0-1,1-10.16,1-10.16H190.11l-16.25,62s-3.05,7.11-9.15,7.11c-1,0-5.07-1-3-8.13,0-1,22.35-84.39,22.35-84.39h-6.1l-3,2h-13.2V739.3L.5,801.27V956H1439.25V811.93Z"/>
                            </g></g></svg>
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
                      <Link href="/tools/gach/gach-1">
                        <a href="/tools/gach/gach-1" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/gach/01/01_Gốc_2.jpg'} src="/images/no-image.svg" alt=""/>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/gach/gach-2">
                      <a href="/tools/gach/gach-2" className="item ">
                        <div className="img tRes_66">
                          <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/gach/02/02_Gốc.jpg'} src="/images/no-image.svg" alt=""/>
                        </div>
                      </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/gach/gach-3">
                      <a href="/tools/gach/gach-3" className="item ">
                        <div className="img tRes_66">
                          <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/gach/03/Gốc.jpg'} src="/images/no-image.svg" alt=""/>
                        </div>
                      </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/gach/gach-4">
                        <a href="/tools/gach/gach-4" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/gach/04/04_Gốc_2.jpg'} src="/images/no-image.svg" alt=""/>
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
                      <li className="active">
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

export default Paint;
