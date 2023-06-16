import React, {useState, useEffect} from 'react'
import Layout from '../../../components/Desktop/Layout'
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb'
import t from '../../../translation'
import ColorTon from '../../../components/Desktop/Tools/ColorTon'
import Link from 'next/link'
import CategoryTonProducts from '../../../components/Desktop/Products/CategoryTonProducts'


function Paint({}) {
  const [activeTab, setActiveTab] = useState('1');
  const [color, setColor] = useState({Code: '', HEXCODE:'#ededed'});
  const [openColor, setOpenColor] = useState(false);
  const currentPirture = '/ton/01/01_Gốc.png';
  const suggest1 = '/ton/01/01_Gợi ý 1.png';
  const suggest2 = '/ton/01/01_Gợi ý 2.png';
  const [isChoised , setChoised ] = useState(false);

  const suggestPicture1 = {
    HEXCODE: '#85989c',
    Code: 'MDL01'
  }

  const suggestPicture2 = {
    HEXCODE: '#7a5751',
    Code: 'MRL03'
  }

  useEffect(() => {
    if (activeTab == '1') setColor({Code: '', HEXCODE:'#ededed'});
    if (activeTab == '2') setColor(suggestPicture1);
    if (activeTab == '3') setColor(suggestPicture2);
  }, [activeTab])
  

  useEffect(() => {
    if (color.HEXCODE != '#ededed') {
      setChoised(true);
    }
  }, [color])

  return (
    <Layout>
      <BreadCrumb data={[{name: 'Đổi màu tôn', link: '/tools/ton', isActive: false},{name: 'Biệt thự sân vườn 2 tầng', link: '/tools/ton/ton-1', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
          <div id="copied" className={`copied-custom ${isChoised ? 'active' : ''}`} style={{display: `${isChoised ? 'block': 'none'}`}}>* Bạn đã chọn màu: <strong>{color.Code}</strong> <span className="close close-custom" onClick={() => setChoised(false)}><i className="icon-close"></i></span></div>
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Biệt thự sân vườn 2 tầng</h3>
                <div className="pd-20 border-bottom">
                  
                    {activeTab == '1' && (
                        <div className="colorful">
                          <img id="background-image" src={currentPirture} alt="" />
                          <div id="container" onClick={() => setOpenColor(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>01_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1" style={{fill:color.HEXCODE}} ><rect className="cls-1" width="1440" height="956"/><path d="M1200.34,504,956.6,413.13l-197.36,84.1c-11.66,8,2.47,10.2,2.47,10.2H1192C1204.77,508.19,1200.34,504,1200.34,504Z"/><path d="M113.11,472.72H266V435.51c-1.64-17.11,2.57-23.23,2.57-23.23v-5.69h0L100.77,464.7C99.07,472.7,113.11,472.72,113.11,472.72Z"/><path d="M865.51,382.79l-27.12,22.85h2.81l31.48-25.87L615.24,268,328.51,377.13l5.2,6.89-56.32,19.51v8.68c4.78,9.9,2.7,23.13,2.7,23.13v37.38H602.34c1.73.19,22.17,5.28,22.17,5.28v-4.28L434,382.79Z"/></g></g></svg>
                          </div>
                          {openColor && (
                            <div className="chosen-colors">
                              <div className="top">
                                <a className="btn-close-custom" onClick={(e) => setOpenColor(false)}><i className="icon-close"></i></a>
                                <h6 className="title">Chọn Màu tôn
                                </h6>
                              </div>
                              <div className="content">
                                <ColorTon category="Toa" setColor={setColor}/>
                              </div>
                            </div>
                          )}                
                        </div>

                        )}

                      {activeTab == '2' && (
                          <div className="colorful">
                            <img id="background-image" src={currentPirture} alt="" />
                            <div id="container">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>01_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1" style={{fill:suggestPicture1.HEXCODE}} ><rect className="cls-1" width="1440" height="956"/><path d="M1200.34,504,956.6,413.13l-197.36,84.1c-11.66,8,2.47,10.2,2.47,10.2H1192C1204.77,508.19,1200.34,504,1200.34,504Z"/><path d="M113.11,472.72H266V435.51c-1.64-17.11,2.57-23.23,2.57-23.23v-5.69h0L100.77,464.7C99.07,472.7,113.11,472.72,113.11,472.72Z"/><path d="M865.51,382.79l-27.12,22.85h2.81l31.48-25.87L615.24,268,328.51,377.13l5.2,6.89-56.32,19.51v8.68c4.78,9.9,2.7,23.13,2.7,23.13v37.38H602.34c1.73.19,22.17,5.28,22.17,5.28v-4.28L434,382.79Z"/></g></g></svg>
                            </div>             
                          </div>
                      )}
                      {activeTab == '3' && (
                          <div className="colorful">
                            <img id="background-image" src={currentPirture} alt="" />
                            <div id="container">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>01_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1" style={{fill:suggestPicture2.HEXCODE}} ><rect className="cls-1" width="1440" height="956"/><path d="M1200.34,504,956.6,413.13l-197.36,84.1c-11.66,8,2.47,10.2,2.47,10.2H1192C1204.77,508.19,1200.34,504,1200.34,504Z"/><path d="M113.11,472.72H266V435.51c-1.64-17.11,2.57-23.23,2.57-23.23v-5.69h0L100.77,464.7C99.07,472.7,113.11,472.72,113.11,472.72Z"/><path d="M865.51,382.79l-27.12,22.85h2.81l31.48-25.87L615.24,268,328.51,377.13l5.2,6.89-56.32,19.51v8.68c4.78,9.9,2.7,23.13,2.7,23.13v37.38H602.34c1.73.19,22.17,5.28,22.17,5.28v-4.28L434,382.79Z"/></g></g></svg>
                            </div>             
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>01_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1" style={{fill:color.HEXCODE}} ><rect className="cls-1" width="1440" height="956"/><path d="M1200.34,504,956.6,413.13l-197.36,84.1c-11.66,8,2.47,10.2,2.47,10.2H1192C1204.77,508.19,1200.34,504,1200.34,504Z"/><path d="M113.11,472.72H266V435.51c-1.64-17.11,2.57-23.23,2.57-23.23v-5.69h0L100.77,464.7C99.07,472.7,113.11,472.72,113.11,472.72Z"/><path d="M865.51,382.79l-27.12,22.85h2.81l31.48-25.87L615.24,268,328.51,377.13l5.2,6.89-56.32,19.51v8.68c4.78,9.9,2.7,23.13,2.7,23.13v37.38H602.34c1.73.19,22.17,5.28,22.17,5.28v-4.28L434,382.79Z"/></g></g></svg>
                            </div>
                          </div>
                          <div className="title">Tự phối màu</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '2' ? 'active' : ''}`}  onClick={() => setActiveTab('2')}>
                        <div className="item">
                          <div className=" colorful">
                            <img id="background-image" src={currentPirture} alt="" className="img-custom"/>
                            <div id="container">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>01_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1" style={{fill:suggestPicture1.HEXCODE}} ><rect className="cls-1" width="1440" height="956"/><path d="M1200.34,504,956.6,413.13l-197.36,84.1c-11.66,8,2.47,10.2,2.47,10.2H1192C1204.77,508.19,1200.34,504,1200.34,504Z"/><path d="M113.11,472.72H266V435.51c-1.64-17.11,2.57-23.23,2.57-23.23v-5.69h0L100.77,464.7C99.07,472.7,113.11,472.72,113.11,472.72Z"/><path d="M865.51,382.79l-27.12,22.85h2.81l31.48-25.87L615.24,268,328.51,377.13l5.2,6.89-56.32,19.51v8.68c4.78,9.9,2.7,23.13,2.7,23.13v37.38H602.34c1.73.19,22.17,5.28,22.17,5.28v-4.28L434,382.79Z"/></g></g></svg>
                            </div>
                          </div>
                          <div className="title">Gợi ý 1</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '3' ? 'active' : ''}`}  onClick={() => setActiveTab('3')}>
                        <div className="item">
                          <div className=" colorful">
                            <img id="background-image" src={currentPirture} alt="" className="img-custom"/>
                            <div id="container">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs><title>01_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1" style={{fill:suggestPicture2.HEXCODE}} ><rect className="cls-1" width="1440" height="956"/><path d="M1200.34,504,956.6,413.13l-197.36,84.1c-11.66,8,2.47,10.2,2.47,10.2H1192C1204.77,508.19,1200.34,504,1200.34,504Z"/><path d="M113.11,472.72H266V435.51c-1.64-17.11,2.57-23.23,2.57-23.23v-5.69h0L100.77,464.7C99.07,472.7,113.11,472.72,113.11,472.72Z"/><path d="M865.51,382.79l-27.12,22.85h2.81l31.48-25.87L615.24,268,328.51,377.13l5.2,6.89-56.32,19.51v8.68c4.78,9.9,2.7,23.13,2.7,23.13v37.38H602.34c1.73.19,22.17,5.28,22.17,5.28v-4.28L434,382.79Z"/></g></g></svg>
                            </div>
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
                      <Link href="/tools/ton/ton-1">
                        <a href="/tools/ton/ton-1" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/ton/01/01_Gốc.png'} src="/images/no-image.svg" alt=""/>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/ton/ton-2">
                      <a href="/tools/ton/ton-2" className="item ">
                        <div className="img tRes_66">
                          <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/ton/02/02_Gốc.jpg'} src="/images/no-image.svg" alt=""/>
                        </div>
                      </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/ton/ton-3">
                      <a href="/tools/ton/ton-3" className="item ">
                        <div className="img tRes_66">
                          <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/ton/03/03_Gốc.png'} src="/images/no-image.svg" alt=""/>
                        </div>
                      </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/ton/ton-4">
                        <a href="/tools/ton/ton-4" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/ton/04/04_Gốc.png'} src="/images/no-image.svg" alt=""/>
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
                    <Link href="/tools/ton">
                      <a href="/tools/ton">Tự phối màu tôn</a>
                    </Link>
                    <ul>
                      <li className="active">
                        <Link href="/tools/ton/ton-1">
                          <a href="/tools/ton/ton-1">Biệt thự sân vườn 2 tầng</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/ton/ton-2">
                          <a href="/tools/ton/ton-2">Mẫu nhà 2 tầng</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/ton/ton-3">
                          <a href="/tools/ton/ton-3">Mẫu nhà cấp 4</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tools/ton/ton-4">
                          <a href="/tools/ton/ton-4">Mẫu biệt thự tân cổ điển</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <CategoryTonProducts/>
        </div>
      </section>
    </Layout>
  )
}

export default Paint;
