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
  const currentPirture = '/gach/02/02_Gốc.jpg';
  const suggest1 = '/gach/02/02_Gợi-ý-1.jpg';
  const suggest2 = '/gach/02/02_Gợi-ý-2.jpg';
  const [isChoised , setChoised ] = useState(false);

  useEffect(() => {
    if (color.HEXCODE != '#ededed') {
      setChoised(true);
    }
  }, [color])

  return (
    <Layout>
      <BreadCrumb data={[{name: 'Đổi màu gạch', link: '/tools/gach', isActive: false},{name: 'Phòng bếp cổ điển', link: '/tools/gach/gach-2', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
          <div id="copied" className={`copied-custom ${isChoised ? 'active' : ''}`} style={{display: `${isChoised ? 'block': 'none'}`}}>* Bạn đã chọn mã màu: <strong>{color.Code}</strong> <span className="close close-custom"><i className="icon-close"></i></span></div>
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Phòng bếp cổ điển</h3>
                <div className="pd-20 border-bottom">
                  
                    {activeTab == '1' && (
                        <div className="colorful">
                          <img id="background-image" src={currentPirture} alt="" />
                          <div id="container" onClick={() => setOpenColor(true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>01_new_new</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><rect className="cls-1" width="1440" height="956"/><path style={{fill:color.HEXCODE}} d="M114.87,758.78l.87,9s3.43,1.24,5.74,0v-9l22.76-.36L146,791.23s3.74.47,6-.58c0-24-.09-32.23-.09-32.23h34.6l1.82,9.85s4.46.91,5.86-.74c-1.65-10.4-.71-9.11-.58-9.11h.06l64.26,0L259,798l7.13.25,5.37-3.14L1137,796l2.8,2,8,.15.3-20,186,177.36H.51V758.37l55,0-4.41,33s4.42,1,6.65-1.18c4-24,5.53-31.24,5.53-31.24"/></g></g></svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>02_Solid_1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path style={{fill:color.HEXCODE}} d="M115.26,759l1,10s4,1,5-1v-9h23l1,33s6,1,7-1V759h34l2,10s5,1,6-1l-1-9h65v39l8,1,5-3h865l3,3h9V779l183.27,177H0V759H55.26l-5,33s4,1,7-1c4-24,6-32,6-32"/><rect className="cls-1" x="0.01" width="1400" height="956"/></g></g></svg>
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
                      <li className="active">
                        <Link href="/tools/gach/gach-2">
                          <a href="/tools/gach/gach-2">Phòng bếp cổ điển</a>
                        </Link>
                      </li>
                      <li>
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
