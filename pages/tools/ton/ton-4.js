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
  const currentPirture = '/ton/04/04_Gốc.png';
  const suggest1 = '/ton/04/04_Gợi ý 1.png';
  const suggest2 = '/ton/04/04_Gợi ý 2.png';
  const [isChoised , setChoised ] = useState(false);

  useEffect(() => {
    if (color.HEXCODE != '#ededed') {
      setChoised(true);
    }
  }, [color])

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

  return (
    <Layout>
      <BreadCrumb data={[{name: 'Đổi màu tôn', link: '/tools/ton', isActive: false},{name: 'Mẫu biệt thự tân cổ điển', link: '/tools/ton/ton-4', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
        <div id="copied" className={`copied-custom ${isChoised ? 'active' : ''}`} style={{display: `${isChoised ? 'block': 'none'}`}}>* Bạn đã chọn màu: <strong>{color.Code}</strong> <span className="close close-custom" onClick={() => setChoised(false)}><i className="icon-close"></i></span></div>
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Mẫu biệt thự tân cổ điển</h3>
                <div className="pd-20 border-bottom">
                  
                    {activeTab == '1' && (
                        <div className="colorful">
                          <img id="background-image" src={currentPirture} alt="" />
                          <div id="container" onClick={() => setOpenColor(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs>
                              <title>04_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                                <rect className="cls-1" width="1440" height="956" />
                                <polygon style={{fill:color.HEXCODE}} className="cls-2" points="791.66 233.93 768 249.25 730.05 253.5 712.86 270.36 850.9 290.78 1009.71 135.42 1139.15 238.25 1144.52 238.25 1016.94 135.72 1018.39 133.25 1012.43 127.55 811.41 114.95 635.92 45.67 239.79 207.16 579.75 262.19 791.66 233.93"/>
                                <polygon style={{fill:color.HEXCODE}} className="cls-2" points="921.54 327.89 915.68 333.59 915.68 336.42 877.83 374.27 877.83 378.48 864.56 392.52 861.75 392.27 838.9 416.14 973.45 446.14 1048.39 359.72 1051.77 359.72 1056.37 354.23 1060.9 357.36 1062.75 355.44 1056.52 350.19 921.54 327.89"/>
                                <path style={{fill:color.HEXCODE}} className="cls-2" d="M1121.92,352.31h-5.36v4.21l-2.94,1.66-3.06-3.06-36.51,10.21,50.93,36h5.24v4h-1.34a26.58,26.58,0,0,1,0,3.89h-2.24v6.45l-20.55,6.58h-8.55V421h-10.22v40.34c6.26-.12,7.66,2.56,7.66,2.56l165.19-53.49Z"/>
                                <path className="cls-2" style={{fill:color.HEXCODE}} d="M862.51,583.12l-36.12-27.57v-2.94l-71.92-53.49-8.13-9.45h-5.1L737,494.52,600.81,591.67v2.17s-14.3,11.75-14.68,11.75-29.74-11-29.74-11v-3L314.85,501.29l-3.44,2.81-18.26-7-24.89,16.51,470,185.87,191.06-75.1-59.23-44.81Z"/></g></g>
                            </svg>
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
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs>
                                <title>04_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                                  <rect className="cls-1" width="1440" height="956" />
                                  <polygon style={{fill:suggestPicture1.HEXCODE}} className="cls-2" points="791.66 233.93 768 249.25 730.05 253.5 712.86 270.36 850.9 290.78 1009.71 135.42 1139.15 238.25 1144.52 238.25 1016.94 135.72 1018.39 133.25 1012.43 127.55 811.41 114.95 635.92 45.67 239.79 207.16 579.75 262.19 791.66 233.93"/>
                                  <polygon style={{fill:suggestPicture1.HEXCODE}} className="cls-2" points="921.54 327.89 915.68 333.59 915.68 336.42 877.83 374.27 877.83 378.48 864.56 392.52 861.75 392.27 838.9 416.14 973.45 446.14 1048.39 359.72 1051.77 359.72 1056.37 354.23 1060.9 357.36 1062.75 355.44 1056.52 350.19 921.54 327.89"/>
                                  <path style={{fill:suggestPicture1.HEXCODE}} className="cls-2" d="M1121.92,352.31h-5.36v4.21l-2.94,1.66-3.06-3.06-36.51,10.21,50.93,36h5.24v4h-1.34a26.58,26.58,0,0,1,0,3.89h-2.24v6.45l-20.55,6.58h-8.55V421h-10.22v40.34c6.26-.12,7.66,2.56,7.66,2.56l165.19-53.49Z"/>
                                  <path className="cls-2" style={{fill:suggestPicture1.HEXCODE}} d="M862.51,583.12l-36.12-27.57v-2.94l-71.92-53.49-8.13-9.45h-5.1L737,494.52,600.81,591.67v2.17s-14.3,11.75-14.68,11.75-29.74-11-29.74-11v-3L314.85,501.29l-3.44,2.81-18.26-7-24.89,16.51,470,185.87,191.06-75.1-59.23-44.81Z"/></g></g>
                              </svg>
                            </div>
                          </div>
                      )}
                      {activeTab == '3' && (
                          <div className="colorful">
                            <img id="background-image" src={currentPirture} alt="" />
                            <div id="container">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs>
                                <title>04_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                                  <rect className="cls-1" width="1440" height="956" />
                                  <polygon style={{fill:suggestPicture2.HEXCODE}} className="cls-2" points="791.66 233.93 768 249.25 730.05 253.5 712.86 270.36 850.9 290.78 1009.71 135.42 1139.15 238.25 1144.52 238.25 1016.94 135.72 1018.39 133.25 1012.43 127.55 811.41 114.95 635.92 45.67 239.79 207.16 579.75 262.19 791.66 233.93"/>
                                  <polygon style={{fill:suggestPicture2.HEXCODE}} className="cls-2" points="921.54 327.89 915.68 333.59 915.68 336.42 877.83 374.27 877.83 378.48 864.56 392.52 861.75 392.27 838.9 416.14 973.45 446.14 1048.39 359.72 1051.77 359.72 1056.37 354.23 1060.9 357.36 1062.75 355.44 1056.52 350.19 921.54 327.89"/>
                                  <path style={{fill:suggestPicture2.HEXCODE}} className="cls-2" d="M1121.92,352.31h-5.36v4.21l-2.94,1.66-3.06-3.06-36.51,10.21,50.93,36h5.24v4h-1.34a26.58,26.58,0,0,1,0,3.89h-2.24v6.45l-20.55,6.58h-8.55V421h-10.22v40.34c6.26-.12,7.66,2.56,7.66,2.56l165.19-53.49Z"/>
                                  <path className="cls-2" style={{fill:suggestPicture2.HEXCODE}} d="M862.51,583.12l-36.12-27.57v-2.94l-71.92-53.49-8.13-9.45h-5.1L737,494.52,600.81,591.67v2.17s-14.3,11.75-14.68,11.75-29.74-11-29.74-11v-3L314.85,501.29l-3.44,2.81-18.26-7-24.89,16.51,470,185.87,191.06-75.1-59.23-44.81Z"/></g></g>
                              </svg>
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
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs>
                                <title>04_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                                  <rect className="cls-1" width="1440" height="956" />
                                  <polygon style={{fill:color.HEXCODE}} className="cls-2" points="791.66 233.93 768 249.25 730.05 253.5 712.86 270.36 850.9 290.78 1009.71 135.42 1139.15 238.25 1144.52 238.25 1016.94 135.72 1018.39 133.25 1012.43 127.55 811.41 114.95 635.92 45.67 239.79 207.16 579.75 262.19 791.66 233.93"/>
                                  <polygon style={{fill:color.HEXCODE}} className="cls-2" points="921.54 327.89 915.68 333.59 915.68 336.42 877.83 374.27 877.83 378.48 864.56 392.52 861.75 392.27 838.9 416.14 973.45 446.14 1048.39 359.72 1051.77 359.72 1056.37 354.23 1060.9 357.36 1062.75 355.44 1056.52 350.19 921.54 327.89"/>
                                  <path style={{fill:color.HEXCODE}} className="cls-2" d="M1121.92,352.31h-5.36v4.21l-2.94,1.66-3.06-3.06-36.51,10.21,50.93,36h5.24v4h-1.34a26.58,26.58,0,0,1,0,3.89h-2.24v6.45l-20.55,6.58h-8.55V421h-10.22v40.34c6.26-.12,7.66,2.56,7.66,2.56l165.19-53.49Z"/>
                                  <path className="cls-2" style={{fill:color.HEXCODE}} d="M862.51,583.12l-36.12-27.57v-2.94l-71.92-53.49-8.13-9.45h-5.1L737,494.52,600.81,591.67v2.17s-14.3,11.75-14.68,11.75-29.74-11-29.74-11v-3L314.85,501.29l-3.44,2.81-18.26-7-24.89,16.51,470,185.87,191.06-75.1-59.23-44.81Z"/></g></g>
                              </svg>
                            </div>
                          </div>
                          <div className="title">Tự phối màu</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '2' ? 'active' : ''}`}  onClick={() => setActiveTab('2')}>
                        <div className="item">
                            <div className="colorful">
                              <img id="background-image" src={currentPirture} alt="" />
                              <div id="container">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs>
                                  <title>04_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                                    <rect className="cls-1" width="1440" height="956" />
                                    <polygon style={{fill:suggestPicture1.HEXCODE}} className="cls-2" points="791.66 233.93 768 249.25 730.05 253.5 712.86 270.36 850.9 290.78 1009.71 135.42 1139.15 238.25 1144.52 238.25 1016.94 135.72 1018.39 133.25 1012.43 127.55 811.41 114.95 635.92 45.67 239.79 207.16 579.75 262.19 791.66 233.93"/>
                                    <polygon style={{fill:suggestPicture1.HEXCODE}} className="cls-2" points="921.54 327.89 915.68 333.59 915.68 336.42 877.83 374.27 877.83 378.48 864.56 392.52 861.75 392.27 838.9 416.14 973.45 446.14 1048.39 359.72 1051.77 359.72 1056.37 354.23 1060.9 357.36 1062.75 355.44 1056.52 350.19 921.54 327.89"/>
                                    <path style={{fill:suggestPicture1.HEXCODE}} className="cls-2" d="M1121.92,352.31h-5.36v4.21l-2.94,1.66-3.06-3.06-36.51,10.21,50.93,36h5.24v4h-1.34a26.58,26.58,0,0,1,0,3.89h-2.24v6.45l-20.55,6.58h-8.55V421h-10.22v40.34c6.26-.12,7.66,2.56,7.66,2.56l165.19-53.49Z"/>
                                    <path className="cls-2" style={{fill:suggestPicture1.HEXCODE}} d="M862.51,583.12l-36.12-27.57v-2.94l-71.92-53.49-8.13-9.45h-5.1L737,494.52,600.81,591.67v2.17s-14.3,11.75-14.68,11.75-29.74-11-29.74-11v-3L314.85,501.29l-3.44,2.81-18.26-7-24.89,16.51,470,185.87,191.06-75.1-59.23-44.81Z"/></g></g>
                                </svg>
                              </div>
                            </div>
                          <div className="title">Gợi ý 1</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '3' ? 'active' : ''}`}  onClick={() => setActiveTab('3')}>
                        <div className="item">
                          <div className="colorful">
                            <img id="background-image" src={currentPirture} alt="" />
                            <div id="container">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 956"><defs></defs>
                                <title>04_Solid</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">
                                  <rect className="cls-1" width="1440" height="956" />
                                  <polygon style={{fill:suggestPicture2.HEXCODE}} className="cls-2" points="791.66 233.93 768 249.25 730.05 253.5 712.86 270.36 850.9 290.78 1009.71 135.42 1139.15 238.25 1144.52 238.25 1016.94 135.72 1018.39 133.25 1012.43 127.55 811.41 114.95 635.92 45.67 239.79 207.16 579.75 262.19 791.66 233.93"/>
                                  <polygon style={{fill:suggestPicture2.HEXCODE}} className="cls-2" points="921.54 327.89 915.68 333.59 915.68 336.42 877.83 374.27 877.83 378.48 864.56 392.52 861.75 392.27 838.9 416.14 973.45 446.14 1048.39 359.72 1051.77 359.72 1056.37 354.23 1060.9 357.36 1062.75 355.44 1056.52 350.19 921.54 327.89"/>
                                  <path style={{fill:suggestPicture2.HEXCODE}} className="cls-2" d="M1121.92,352.31h-5.36v4.21l-2.94,1.66-3.06-3.06-36.51,10.21,50.93,36h5.24v4h-1.34a26.58,26.58,0,0,1,0,3.89h-2.24v6.45l-20.55,6.58h-8.55V421h-10.22v40.34c6.26-.12,7.66,2.56,7.66,2.56l165.19-53.49Z"/>
                                  <path className="cls-2" style={{fill:suggestPicture2.HEXCODE}} d="M862.51,583.12l-36.12-27.57v-2.94l-71.92-53.49-8.13-9.45h-5.1L737,494.52,600.81,591.67v2.17s-14.3,11.75-14.68,11.75-29.74-11-29.74-11v-3L314.85,501.29l-3.44,2.81-18.26-7-24.89,16.51,470,185.87,191.06-75.1-59.23-44.81Z"/></g></g>
                              </svg>
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
                      <li>
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
                      <li className="active">
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
