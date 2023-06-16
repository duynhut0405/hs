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
  const currentPirture = '/ton/03/03_Gốc.png';
  const suggest1 = '/ton/03/03_Gợi ý 1.png';
  const suggest2 = '/ton/03/03_Gợi ý 2.png';
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
      <BreadCrumb
        data={[
          { name: 'Đổi màu tôn', link: '/tools/ton', isActive: false },
          { name: 'Mẫu nhà cấp 4', link: '/tools/ton/ton-2', isActive: true },
        ]}
      />
      <section className=' sec-tb '>
        <div className='container'>
          <div id='copied' className={`copied-custom ${isChoised ? 'active' : ''}`} style={{ display: `${isChoised ? 'block' : 'none'}` }}>
            * Bạn đã chọn màu: <strong>{color.Code}</strong>{' '}
            <span className='close close-custom' onClick={() => setChoised(false)}>
              <i className='icon-close'></i>
            </span>
          </div>
          <div className='row end'>
            <div className='col-lg-10 col-md-9'>
              <div className='box-shadow mb-20'>
                <h3 className='box-title-3'>Mẫu nhà cấp 4</h3>
                <div className='pd-20 border-bottom'>
                  {activeTab == '1' && (
                    <div className='colorful'>
                      <img id='background-image' src={currentPirture} alt='' />
                      <div id='container' onClick={() => setOpenColor(true)}>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440.5 956'>
                          <defs></defs>
                          <title>03_Solid</title>
                          <g id='Layer_2' data-name='Layer 2'>
                            <g id='Layer_1-2' data-name='Layer 1'>
                              <rect className='cls-1' width='1440' height='956' />
                              <path
                                style={{ fill: color.HEXCODE }}
                                className='cls-2'
                                d='M123.11,107.49l-2.43.13s105.2,174.51,107,177.57C239.79,303.45,261,318.64,261,318.64s14.43-1,17.24,0c9.83-11.36,13.61-5.19,13.61-5.19l24.26-6.13,6.13,6.13L512.17,86.64l4.6,4.57h2.47l-9.45-15.12Z'
                              />
                              <path
                                style={{ fill: color.HEXCODE }}
                                className='cls-2'
                                d='M756.43,319.07l-129.36,6.29-1.7.17s34.55,70.64,34.63,71.66c.94,3.66,6,3.28,6.68,3.66-1.4,7.28,4.47,9.83,4.47,9.83l.51,13.15,3.83.13.13,7.79,11.49-.13,5.74,7,67.49-109.4H763C763.45,319.15,756.43,319.07,756.43,319.07Z'
                              />
                              <path
                                style={{ fill: color.HEXCODE }}
                                className='cls-2'
                                d='M1170.3,355.66,782.81,372.51l-1.7.43L800.94,421h13.53l-12.91.45,12.7,30.7h4.08v5.36h-2.87L820.85,469,818,484.6l-10.28-23.36h-3.44l-29.56,32.1v11.43l172.79-3.9.23,2.94h3.79L996.15,421h.5l37.89,99.26h64.53v5.23h5.1l66.71-163.08,3.95,4,1.22-.07A10.92,10.92,0,0,0,1170.3,355.66Z'
                              />
                              <polygon style={{ fill: color.HEXCODE }} className='cls-2' points='1192.86 418.13 1230.81 548.55 1253.28 548.55 1253.28 551.41 1258.9 551.41 1309.79 418.13 1305.19 414.05 1192.86 418.13' />
                              <path
                                style={{ fill: color.HEXCODE }}
                                className='cls-2'
                                d='M1334.73,510.39l13.66,52.21,12.64,6.25v13s-1-.76-6.13-3.7c-.26,20.17-4.85,23.36-4.85,23.36s-1.66-5.36-3.19-9.32c-6.52,2.56-5.49,11.62-5.49,11.62h72.76l5.24-4,15.19-48.46,5.44,24.34V510.39Z'
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                      {openColor && (
                        <div className='chosen-colors'>
                          <div className='top'>
                            <a className='btn-close-custom' onClick={(e) => setOpenColor(false)}>
                              <i className='icon-close'></i>
                            </a>
                            <h6 className='title'>Chọn Màu tôn</h6>
                          </div>
                          <div className='content'>
                            <ColorTon category='Toa' setColor={setColor} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab == '2' && (
                    <div className='colorful'>
                      <img id='background-image' src={currentPirture} alt='' />
                      <div id='container'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440.5 956'>
                          <defs></defs>
                          <title>03_Solid</title>
                          <g id='Layer_2' data-name='Layer 2'>
                            <g id='Layer_1-2' data-name='Layer 1'>
                              <rect className='cls-1' width='1440' height='956' />
                              <path
                                style={{ fill: suggestPicture1.HEXCODE }}
                                className='cls-2'
                                d='M123.11,107.49l-2.43.13s105.2,174.51,107,177.57C239.79,303.45,261,318.64,261,318.64s14.43-1,17.24,0c9.83-11.36,13.61-5.19,13.61-5.19l24.26-6.13,6.13,6.13L512.17,86.64l4.6,4.57h2.47l-9.45-15.12Z'
                              />
                              <path
                                style={{ fill: suggestPicture1.HEXCODE }}
                                className='cls-2'
                                d='M756.43,319.07l-129.36,6.29-1.7.17s34.55,70.64,34.63,71.66c.94,3.66,6,3.28,6.68,3.66-1.4,7.28,4.47,9.83,4.47,9.83l.51,13.15,3.83.13.13,7.79,11.49-.13,5.74,7,67.49-109.4H763C763.45,319.15,756.43,319.07,756.43,319.07Z'
                              />
                              <path
                                style={{ fill: suggestPicture1.HEXCODE }}
                                className='cls-2'
                                d='M1170.3,355.66,782.81,372.51l-1.7.43L800.94,421h13.53l-12.91.45,12.7,30.7h4.08v5.36h-2.87L820.85,469,818,484.6l-10.28-23.36h-3.44l-29.56,32.1v11.43l172.79-3.9.23,2.94h3.79L996.15,421h.5l37.89,99.26h64.53v5.23h5.1l66.71-163.08,3.95,4,1.22-.07A10.92,10.92,0,0,0,1170.3,355.66Z'
                              />
                              <polygon style={{ fill: suggestPicture1.HEXCODE }} className='cls-2' points='1192.86 418.13 1230.81 548.55 1253.28 548.55 1253.28 551.41 1258.9 551.41 1309.79 418.13 1305.19 414.05 1192.86 418.13' />
                              <path
                                style={{ fill: color.HEXCODE }}
                                className='cls-2'
                                d='M1334.73,510.39l13.66,52.21,12.64,6.25v13s-1-.76-6.13-3.7c-.26,20.17-4.85,23.36-4.85,23.36s-1.66-5.36-3.19-9.32c-6.52,2.56-5.49,11.62-5.49,11.62h72.76l5.24-4,15.19-48.46,5.44,24.34V510.39Z'
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  )}
                  {activeTab == '3' && (
                    <div className='colorful'>
                      <img id='background-image' src={currentPirture} alt='' />
                      <div id='container'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440.5 956'>
                          <defs></defs>
                          <title>03_Solid</title>
                          <g id='Layer_2' data-name='Layer 2'>
                            <g id='Layer_1-2' data-name='Layer 1'>
                              <rect className='cls-1' width='1440' height='956' />
                              <path
                                style={{ fill: suggestPicture2.HEXCODE }}
                                className='cls-2'
                                d='M123.11,107.49l-2.43.13s105.2,174.51,107,177.57C239.79,303.45,261,318.64,261,318.64s14.43-1,17.24,0c9.83-11.36,13.61-5.19,13.61-5.19l24.26-6.13,6.13,6.13L512.17,86.64l4.6,4.57h2.47l-9.45-15.12Z'
                              />
                              <path
                                style={{ fill: suggestPicture2.HEXCODE }}
                                className='cls-2'
                                d='M756.43,319.07l-129.36,6.29-1.7.17s34.55,70.64,34.63,71.66c.94,3.66,6,3.28,6.68,3.66-1.4,7.28,4.47,9.83,4.47,9.83l.51,13.15,3.83.13.13,7.79,11.49-.13,5.74,7,67.49-109.4H763C763.45,319.15,756.43,319.07,756.43,319.07Z'
                              />
                              <path
                                style={{ fill: suggestPicture2.HEXCODE }}
                                className='cls-2'
                                d='M1170.3,355.66,782.81,372.51l-1.7.43L800.94,421h13.53l-12.91.45,12.7,30.7h4.08v5.36h-2.87L820.85,469,818,484.6l-10.28-23.36h-3.44l-29.56,32.1v11.43l172.79-3.9.23,2.94h3.79L996.15,421h.5l37.89,99.26h64.53v5.23h5.1l66.71-163.08,3.95,4,1.22-.07A10.92,10.92,0,0,0,1170.3,355.66Z'
                              />
                              <polygon style={{ fill: suggestPicture2.HEXCODE }} className='cls-2' points='1192.86 418.13 1230.81 548.55 1253.28 548.55 1253.28 551.41 1258.9 551.41 1309.79 418.13 1305.19 414.05 1192.86 418.13' />
                              <path
                                style={{ fill: suggestPicture2.HEXCODE }}
                                className='cls-2'
                                d='M1334.73,510.39l13.66,52.21,12.64,6.25v13s-1-.76-6.13-3.7c-.26,20.17-4.85,23.36-4.85,23.36s-1.66-5.36-3.19-9.32c-6.52,2.56-5.49,11.62-5.49,11.62h72.76l5.24-4,15.19-48.46,5.44,24.34V510.39Z'
                              />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  )}
                  <br />

                  <div className='wtabs-3'>
                    <div className='menu-tabs'>
                      <div className={`menu-tab ${activeTab == '1' ? 'active' : ''}`} onClick={() => setActiveTab('1')}>
                        <div className='item'>
                          <div className=' colorful'>
                            <img id='background-image' src={currentPirture} alt='' className='img-custom' />
                            <div id='container'>
                              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440.5 956'>
                                <defs></defs>
                                <title>03_Solid</title>
                                <g id='Layer_2' data-name='Layer 2'>
                                  <g id='Layer_1-2' data-name='Layer 1'>
                                    <rect className='cls-1' width='1440' height='956' />
                                    <path
                                      style={{ fill: color.HEXCODE }}
                                      className='cls-2'
                                      d='M123.11,107.49l-2.43.13s105.2,174.51,107,177.57C239.79,303.45,261,318.64,261,318.64s14.43-1,17.24,0c9.83-11.36,13.61-5.19,13.61-5.19l24.26-6.13,6.13,6.13L512.17,86.64l4.6,4.57h2.47l-9.45-15.12Z'
                                    />
                                    <path
                                      style={{ fill: color.HEXCODE }}
                                      className='cls-2'
                                      d='M756.43,319.07l-129.36,6.29-1.7.17s34.55,70.64,34.63,71.66c.94,3.66,6,3.28,6.68,3.66-1.4,7.28,4.47,9.83,4.47,9.83l.51,13.15,3.83.13.13,7.79,11.49-.13,5.74,7,67.49-109.4H763C763.45,319.15,756.43,319.07,756.43,319.07Z'
                                    />
                                    <path
                                      style={{ fill: color.HEXCODE }}
                                      className='cls-2'
                                      d='M1170.3,355.66,782.81,372.51l-1.7.43L800.94,421h13.53l-12.91.45,12.7,30.7h4.08v5.36h-2.87L820.85,469,818,484.6l-10.28-23.36h-3.44l-29.56,32.1v11.43l172.79-3.9.23,2.94h3.79L996.15,421h.5l37.89,99.26h64.53v5.23h5.1l66.71-163.08,3.95,4,1.22-.07A10.92,10.92,0,0,0,1170.3,355.66Z'
                                    />
                                    <polygon style={{ fill: color.HEXCODE }} className='cls-2' points='1192.86 418.13 1230.81 548.55 1253.28 548.55 1253.28 551.41 1258.9 551.41 1309.79 418.13 1305.19 414.05 1192.86 418.13' />
                                    <path
                                      style={{ fill: color.HEXCODE }}
                                      className='cls-2'
                                      d='M1334.73,510.39l13.66,52.21,12.64,6.25v13s-1-.76-6.13-3.7c-.26,20.17-4.85,23.36-4.85,23.36s-1.66-5.36-3.19-9.32c-6.52,2.56-5.49,11.62-5.49,11.62h72.76l5.24-4,15.19-48.46,5.44,24.34V510.39Z'
                                    />
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div className='title'>Tự phối màu</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '2' ? 'active' : ''}`} onClick={() => setActiveTab('2')}>
                        <div className='item'>
                          <div className='colorful'>
                            <img id='background-image' src={currentPirture} alt='' />
                            <div id='container'>
                              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440.5 956'>
                                <defs></defs>
                                <title>03_Solid</title>
                                <g id='Layer_2' data-name='Layer 2'>
                                  <g id='Layer_1-2' data-name='Layer 1'>
                                    <rect className='cls-1' width='1440' height='956' />
                                    <path
                                      style={{ fill: suggestPicture1.HEXCODE }}
                                      className='cls-2'
                                      d='M123.11,107.49l-2.43.13s105.2,174.51,107,177.57C239.79,303.45,261,318.64,261,318.64s14.43-1,17.24,0c9.83-11.36,13.61-5.19,13.61-5.19l24.26-6.13,6.13,6.13L512.17,86.64l4.6,4.57h2.47l-9.45-15.12Z'
                                    />
                                    <path
                                      style={{ fill: suggestPicture1.HEXCODE }}
                                      className='cls-2'
                                      d='M756.43,319.07l-129.36,6.29-1.7.17s34.55,70.64,34.63,71.66c.94,3.66,6,3.28,6.68,3.66-1.4,7.28,4.47,9.83,4.47,9.83l.51,13.15,3.83.13.13,7.79,11.49-.13,5.74,7,67.49-109.4H763C763.45,319.15,756.43,319.07,756.43,319.07Z'
                                    />
                                    <path
                                      style={{ fill: suggestPicture1.HEXCODE }}
                                      className='cls-2'
                                      d='M1170.3,355.66,782.81,372.51l-1.7.43L800.94,421h13.53l-12.91.45,12.7,30.7h4.08v5.36h-2.87L820.85,469,818,484.6l-10.28-23.36h-3.44l-29.56,32.1v11.43l172.79-3.9.23,2.94h3.79L996.15,421h.5l37.89,99.26h64.53v5.23h5.1l66.71-163.08,3.95,4,1.22-.07A10.92,10.92,0,0,0,1170.3,355.66Z'
                                    />
                                    <polygon style={{ fill: suggestPicture1.HEXCODE }} className='cls-2' points='1192.86 418.13 1230.81 548.55 1253.28 548.55 1253.28 551.41 1258.9 551.41 1309.79 418.13 1305.19 414.05 1192.86 418.13' />
                                    <path
                                      style={{ fill: color.HEXCODE }}
                                      className='cls-2'
                                      d='M1334.73,510.39l13.66,52.21,12.64,6.25v13s-1-.76-6.13-3.7c-.26,20.17-4.85,23.36-4.85,23.36s-1.66-5.36-3.19-9.32c-6.52,2.56-5.49,11.62-5.49,11.62h72.76l5.24-4,15.19-48.46,5.44,24.34V510.39Z'
                                    />
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div className='title'>Gợi ý 1</div>
                        </div>
                      </div>
                      <div className={`menu-tab ${activeTab == '3' ? 'active' : ''}`} onClick={() => setActiveTab('3')}>
                        <div className='item'>
                          <div className='colorful'>
                            <img id='background-image' src={currentPirture} alt='' />
                            <div id='container'>
                              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440.5 956'>
                                <defs></defs>
                                <title>03_Solid</title>
                                <g id='Layer_2' data-name='Layer 2'>
                                  <g id='Layer_1-2' data-name='Layer 1'>
                                    <rect className='cls-1' width='1440' height='956' />
                                    <path
                                      style={{ fill: suggestPicture2.HEXCODE }}
                                      className='cls-2'
                                      d='M123.11,107.49l-2.43.13s105.2,174.51,107,177.57C239.79,303.45,261,318.64,261,318.64s14.43-1,17.24,0c9.83-11.36,13.61-5.19,13.61-5.19l24.26-6.13,6.13,6.13L512.17,86.64l4.6,4.57h2.47l-9.45-15.12Z'
                                    />
                                    <path
                                      style={{ fill: suggestPicture2.HEXCODE }}
                                      className='cls-2'
                                      d='M756.43,319.07l-129.36,6.29-1.7.17s34.55,70.64,34.63,71.66c.94,3.66,6,3.28,6.68,3.66-1.4,7.28,4.47,9.83,4.47,9.83l.51,13.15,3.83.13.13,7.79,11.49-.13,5.74,7,67.49-109.4H763C763.45,319.15,756.43,319.07,756.43,319.07Z'
                                    />
                                    <path
                                      style={{ fill: suggestPicture2.HEXCODE }}
                                      className='cls-2'
                                      d='M1170.3,355.66,782.81,372.51l-1.7.43L800.94,421h13.53l-12.91.45,12.7,30.7h4.08v5.36h-2.87L820.85,469,818,484.6l-10.28-23.36h-3.44l-29.56,32.1v11.43l172.79-3.9.23,2.94h3.79L996.15,421h.5l37.89,99.26h64.53v5.23h5.1l66.71-163.08,3.95,4,1.22-.07A10.92,10.92,0,0,0,1170.3,355.66Z'
                                    />
                                    <polygon style={{ fill: suggestPicture2.HEXCODE }} className='cls-2' points='1192.86 418.13 1230.81 548.55 1253.28 548.55 1253.28 551.41 1258.9 551.41 1309.79 418.13 1305.19 414.05 1192.86 418.13' />
                                    <path
                                      style={{ fill: suggestPicture2.HEXCODE }}
                                      className='cls-2'
                                      d='M1334.73,510.39l13.66,52.21,12.64,6.25v13s-1-.76-6.13-3.7c-.26,20.17-4.85,23.36-4.85,23.36s-1.66-5.36-3.19-9.32c-6.52,2.56-5.49,11.62-5.49,11.62h72.76l5.24-4,15.19-48.46,5.44,24.34V510.39Z'
                                    />
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div className='title'>Gợi ý 2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='pd-20'>
                  <h3 className='text-center'>Các hình ảnh khác</h3>
                  <div className='row  list-item list-b-10 '>
                    <div className='col-md-3 col-6 '>
                      <Link href='/tools/ton/ton-1'>
                        <a href='/tools/ton/ton-1' className='item '>
                          <div className='img tRes_66'>
                            <img className='lazy-hidden' data-lazy-type='image' data-lazy-src={'/ton/01/01_Gốc.png'} src='/images/no-image.svg' alt='' />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className='col-md-3 col-6 '>
                      <Link href='/tools/ton/ton-2'>
                        <a href='/tools/ton/ton-2' className='item '>
                          <div className='img tRes_66'>
                            <img className='lazy-hidden' data-lazy-type='image' data-lazy-src={'/ton/02/02_Gốc.jpg'} src='/images/no-image.svg' alt='' />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className='col-md-3 col-6 '>
                      <Link href='/tools/ton/ton-3'>
                        <a href='/tools/ton/ton-3' className='item '>
                          <div className='img tRes_66'>
                            <img className='lazy-hidden' data-lazy-type='image' data-lazy-src={'/ton/03/03_Gốc.png'} src='/images/no-image.svg' alt='' />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className='col-md-3 col-6 '>
                      <Link href='/tools/ton/ton-4'>
                        <a href='/tools/ton/ton-4' className='item '>
                          <div className='img tRes_66'>
                            <img className='lazy-hidden' data-lazy-type='image' data-lazy-src={'/ton/04/04_Gốc.png'} src='/images/no-image.svg' alt='' />
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-3'>
              <div className='widget box-shadow'>
                <h6 className='box-title-2 mg-0'>Công cụ</h6>
                <ul className='accordion accordion-menu-2'>
                  <li className=' children parent-showsub'>
                    <Link href='/tools/ton'>
                      <a href='/tools/ton'>Tự phối màu tôn</a>
                    </Link>
                    <ul>
                      <li>
                        <Link href='/tools/ton/ton-1'>
                          <a href='/tools/ton/ton-1'>Biệt thự sân vườn 2 tầng</a>
                        </Link>
                      </li>
                      <li>
                        <Link href='/tools/ton/ton-2'>
                          <a href='/tools/ton/ton-2'>Mẫu nhà 2 tầng</a>
                        </Link>
                      </li>
                      <li className='active'>
                        <Link href='/tools/ton/ton-3'>
                          <a href='/tools/ton/ton-3'>Mẫu nhà cấp 4</a>
                        </Link>
                      </li>
                      <li>
                        <Link href='/tools/ton/ton-4'>
                          <a href='/tools/ton/ton-4'>Mẫu biệt thự tân cổ điển</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <CategoryTonProducts />
        </div>
      </section>
    </Layout>
  );
}

export default Paint;
