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
  const currentPirture = '/gach/04/04_Gốc_2.jpg';
  const suggest1 = '/gach/04/04_Gợi-ý-1.jpg';
  const suggest2 = '/gach/04/04_Gợi-ý-2.jpg';
  const [isChoised , setChoised ] = useState(false);

  useEffect(() => {
    if (color.HEXCODE != '#ededed') {
      setChoised(true);
    }
  }, [color])

  return (
    <Layout>
      <BreadCrumb data={[{name: 'Đổi màu gạch', link: '/tools/gach', isActive: false},{name: 'Phòng bếp châu Âu', link: '/tools/gach/gach-4', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
          <div id="copied" className={`copied-custom ${isChoised ? 'active' : ''}`} style={{display: `${isChoised ? 'block': 'none'}`}}>* Bạn đã chọn mã màu: <strong>{color.Code}</strong> <span className="close close-custom"><i className="icon-close"></i></span></div>
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Phòng bếp châu Âu</h3>
                <div className="pd-20 border-bottom">
                  
                    {activeTab == '1' && (
                        <div className="colorful">
                          <img id="background-image" src={currentPirture} alt="" />
                          <div id="container" onClick={() => setOpenColor(true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440.16 956.13"><defs>
                            {/* <style>.cls-1{stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;}.cls-2{fill:none;}</style> */}
                          </defs><title>04_Solid_3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                            <polygon style={{fill:color.HEXCODE}} className="cls-1" points="0.13 793.7 0.13 956 1388.96 956 1194.3 786.64 476.5 786.64 476.5 765.32 474.47 765.32 437.92 793.75 0.13 793.7"/><rect className="cls-2" x="0.16" y="739" width="1440" height="217"/><rect className="cls-2" x="0.16" width="1440" height="956"/></g></g>
                          </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440.16 956.13"><defs>
                              {/* <style>.cls-1{stroke:#000;stroke-miterlimit:10;stroke-width:0.25px;}.cls-2{fill:none;}</style> */}
                            </defs><title>04_Solid_3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                              <polygon style={{fill:color.HEXCODE}} className="cls-1" points="0.13 793.7 0.13 956 1388.96 956 1194.3 786.64 476.5 786.64 476.5 765.32 474.47 765.32 437.92 793.75 0.13 793.7"/><rect className="cls-2" x="0.16" y="739" width="1440" height="217"/><rect className="cls-2" x="0.16" width="1440" height="956"/></g></g>
                            </svg>
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
                      <li>
                        <Link href="/tools/gach/gach-3">
                          <a href="/tools/gach/gach-3">Phòng bếp hiện đại</a>
                        </Link>
                      </li>
                      <li className="active">
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
