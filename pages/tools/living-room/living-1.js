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
  const currentPirture = '/living-room/phongkhach-1.jpg';
  const suggest1 = '/living-room/phongkhach-1A.jpg';
  const suggest2 = '/living-room/phongkhach-1B.jpg';
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
                <h3 className="box-title-3">Phòng khách thanh lịch</h3>
                <div className="pd-20 border-bottom">
                  {activeTab == '1' && (
                    <div className="colorful">
                      <img id="background-image" src={currentPirture} alt="" />
                      <div id="container">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1441 957" style={{ enableBackground: 'new 0 0 1441 957' }} xmlSpace="preserve">
                          <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n\t.st1{display:none;}\n\t.st2{display:inline;}\n\t.st3{fill:#EC008C;}\n\t.st4{fill:none;stroke:#EC008C;stroke-miterlimit:10;}\n" }} />
                          <g>
                            <g style={{ fill: color.HEXCODE }}>
                              <path onClick={() => setOpenColor(true)} d="M1229.46,606.59c0,0,0.89-0.07-0.68,4.02l2.11-0.2c0,0,0.41-78.53,0-89.97c-0.41-11.44-3.13-75.74-4.22-92.63
			c-1.09-16.89-13.08-147.12-13.62-222.31C1212.5,130.3,1213.59,0,1213.59,0H0.08l-0.16,66.33l253.95,3.53l2.52-1.77h21.2
			l0.76,404.15l0.96-2.76l126.1,0.54l1.34,3.76l-18.9,107.2l31.61-118.22h2.15l0.54-10.84l3.94-0.18v-3.05
			c0,0-49.26,0.27-57.77-5.19l12.72-85.53c0,0,8.13-5.37,53.09-4.01c44.95,1.36,53.67,8.17,53.67,8.17l1.36,86.09
			c0,0-19.6,3.58-56.08,1.01l-0.23,2.45c0,0,3.61,0,4.2,0.7l-0.23,10.84l3.15-0.35l42.31,138.23c0,0,0.93,3.5-1.05,5.24h5.36v-6.06
			l7.34-4.2v2.1H505l5.24-2.45h5.01v2.1h10.37l3.03-2.21h4.2v2.21h9.67l3.03-1.98h3.03v1.86h10.84l3.5-2.33h3.85v1.75h13.99
			l3.15-1.98h3.5v1.86h10.37l1.63-0.47l3.38,0.33c0,0-3.09,57.58-7.45,72.65c1.63,10.17,4.18,28.15,4.18,28.15h55.21
			c0,0,5.27-3.27,6.72-12.9h-38.69c0,0-0.73-1.09-1.09-3.45V400.01c0,0,0.18-1.27,2.72-1.27c2.54,0,487.3-1.09,487.3-1.09
			s2.36-0.91,2.36,7.81s3.09,277.16,3.09,277.16s0.18,1.45-4.18,1.27s-38.87-0.36-38.87-0.36s0.36,11.44,8.9,14.17
			c8.9-0.18,90.63-0.91,90.63-0.91l-9.44-69.74l12.9-0.54c0,0-4-5.45-19.43-10.53c-11.44-4.9-15.07-6.36-18.53-5.27
			c-1.82,1.45-2.91,1.27-2.72,0c0.18-1.27,1.63-1.09,4.18-2s6.72-1.45,6.18-2.36c-0.54-0.91-6.54-4.36-9.99-3.81
			c-1.09-0.91,1.09-7.63,17.98-2.18c11.26,2.54,28.88,13.44,32.69,18.53c0,0-2.36-21.98-1.82-32.33c0,0,0.91-30.33,2.91-38.32
			l-0.54-27.52c0,0-3-4.63-3.27-7.76c0,0-6.4,0.95-6.67-11.17c0,0-5.86-0.82-5.31-5.72s3.41-5.04,3.41-5.04s-3.41-1.09-4.22-0.61
			c-0.82,0.48-0.68,1.57-0.68,2.18s-0.95,2.86-2.11,1.5c-1.16-1.36-1.84-3,0.48-3.34c0,0,1.09-0.89-0.82-2.11
			c-1.91-1.23-4.43-1.98-5.04-1.63c-0.61,0.34-1.23,2.25-2.66,1.63c-1.43-0.61-1.63-2.66,0.2-2.86c0,0-1.16-1.77,0-2.11
			s2.45,1.57,2.45,1.57l2.52,0.34c0,0-0.27-1.63-1.5-2.04c-1.23-0.41-1.16-2.79,0.61-3.13c1.77-0.34,3.06,1.63,1.98,3.41
			c0,0,0.2,2.32,0.75,2.59c0.54,0.27,2.59,1.77,3.47,1.98c0.89,0.2,4.22,0.75,4.22,0.75s0.82-4.29-0.75-4.9s-3.27-1.98-2.72-4.09
			c0.54-2.11,1.98-3.2,4.02-2.25c2.04,0.95,3.13,4.7,0.61,5.79c0,0,0.75,3.81,0.34,5.52c0,0,3.34,0.41,3.68,0.41
			c0.34,0,4.15-0.34,4.15-1.29c0-0.95-1.43-9.33-1.43-9.33s-4.22,0.07-5.45-0.89c-1.23-0.95-3.27-2.79,1.57-4.22
			c0,0,0.89-1.63-0.41-1.91c0,0-12.4-1.16-12.06-13.83c0,0-2.72-0.48-4.97,0c-2.25,0.48-11.78,1.63-12.26,0.27
			c-0.48-1.36,0.82-5.52,8.24-4.97c0,0,1.57-0.61-0.68-1.43c-2.25-0.82-4.5-4.09-4.09-4.77c0.41-0.68,3.95,3,5.11,2.93
			c0,0-1.23-5.99,0.95-7.02c2.18-1.02,4.09-2.18,5.31-2.38s1.84-0.68-0.2-2.25c-2.04-1.57-3.95-3.75-4.02-7.76
			c0,0-9.88-0.48-15.53-7.7c0,0,2.38-1.63,8.38-0.07c0,0,0.54-2.04,2.45-2.32c1.91-0.27,1.43-1.29,1.77-2.11s1.09-1.91,2.45-2.45
			c1.36-0.54,0.68-1.98,2.38-2.18s3.27-0.48,3.27-0.48s-0.2-2.45-1.91-3.2c-1.7-0.75-2.11-4.77-0.41-5.99
			c1.7-1.23,5.04-2.11,7.08-1.63c0,0-0.27-2.45,1.29-2.25c0,0,0.2-2.11-3.06-3.41c-3.27-1.29-6.33-10.01-4.5-11.44
			c0,0,2.11,4.43,2.86,5.18c0.75,0.75,2.72,3.81,3.47,3.06c0.75-0.75-0.27-3.13-0.54-4.29c-0.27-1.16-0.89-4.97,0.14-5.58
			c1.02-0.61,4.77-1.57,6.2,1.5c0,0,1.63-0.54,3.34-0.68s4.09,0.82,4.9,3c0,0,1.84-2.11,3.27-1.43c1.43,0.68,2.79,4.02,2.18,7.02
			c0,0,2.32,1.02,3.13,0.95c0.82-0.07,3.06-0.95,2.59-2.04s-0.54-1.57-0.54-1.57s3.34-0.48,3.75,2.72c0.41,3.2,0.89,1.43,1.29,1.84
			c0.41,0.41-0.89,1.16,0,1.57c0.89,0.41,1.36-0.54,1.84,0.07c0.48,0.61,1.29,1.57,1.43,1.84c0.14,0.27,0.34,1.16-0.41,1.77
			c-0.75,0.61-1.36,1.02-1.91,1.29c-0.54,0.27-2.52,0.95-2.72,0.95s-2.93,0-2.93,0s-0.48,0.54-0.34,0.89s0.34,3.06-0.95,4.9
			c0,0,0.54,3.61-2.72,4.22l-0.75,1.7c0,0,2.11,1.84-1.29,3.47c-3.41,1.63-8.31,1.84-8.31,1.84h-2.25c0,0-0.48,4.02-1.84,4.77
			s-1.09,3.47-1.09,3.47l1.02,2.25c0,0,4.63,0.34,6.33,1.36c1.7,1.02,1.7,0.34,1.7,0.34s1.16-2.52,0.82-4.15
			c-0.34-1.63-2.18-3.2-3.41-0.48c0,0,1.16-3.47,2.86-3.27s1.36-1.29,1.7-1.43s0.95,0.54,1.23,0.95s2.38,0.75,2.66,0.95
			s2.25,0.54,2.25,0.54l0.27,0.89l-0.07,4.15l0.82,1.23c0,0,6.4-3.61,8.72-6.13s3.54-1.43,1.02,1.36c-2.52,2.79-6.74,6.4-9.88,7.97
			c-3.13,1.57-2.45,2.66,0.68,1.98c3.13-0.68,12.46-5.11,13.01-5.79c0.54-0.68,2.86-0.89,1.23,1.16c-1.63,2.04-9.94,5.93-14.03,6.4
			c0,0,0.82,1.57-0.89,2.04s-1.77,0.89-1.77,0.89s-3.75,2.32-9.67-0.2s-0.89,2.18-0.89,2.18s3.47,3.68,0.68,5.93l-1.77,5.04
			l0.89,2.52l1.43,5.04c0,0,3.81-2.86,8.45-1.77c4.63,1.09,4.63-0.34,4.29-1.63s0.54-2.18,1.57-1.23c1.02,0.95,2.38,4.77,2.38,4.77
			s5.45,2.79,5.99,3.2c0.54,0.41,2.45,1.09,2.45,1.09s-2.59,4.15-7.42,4.77c-4.84,0.61-5.04,2.04-5.04,2.04l-4.84,2.59l-3.41,1.29
			l-1.09,1.43l1.36,8.31c0,0,4.43-2.59,6.27,2.72c1.84,5.31,0.41,7.49,0.41,7.49s5.79-1.36,7.9,3.34c2.11,4.7,0.82,9.74,0.82,9.74
			l2.59,1.57c0,0,13.15-1.02,15.12,6.2c1.98,7.22-13.42,4.09-13.42,4.09s-1.77,0.95-0.68,2.18c1.09,1.23,8.79,8.1,4.7,10.62
			s-12.8-7.49-12.8-7.49l-1.7-4.63l-3,0.75c0,0-0.82,10.62-2.04,14.58c-0.07,5.79-0.48,22.41-0.48,22.41s0.95,12.33,1.57,20.57
			c0.61,8.24,1.43,27.79,1.43,27.79l-0.14,15.6h10.15C1204.53,624.03,1220.74,604.82,1229.46,606.59z" />
                              <path d="M1220.13,627.23c0,0,0.54,1.36,0.27,4.09c-0.27,2.72-5.99,66.38-5.99,66.38l16.66-1.27v-73.29L1220.13,627.23z" />
                              <polygon points="410.72,606.25 418.34,513.35 392.74,606.25 		" />
                              <polygon points="431.97,486.92 423.25,606.25 472.56,606.25 435.78,486.92 		" />
                              <path d="M892.8,686.89h-48.77l-1.23-2.45l-168.09-0.14c2.72,9.54,6.81,9.54,6.81,9.54l44.54-2.59l2.86,3.27l0.27,3.18h266.04
			l0.27-3.18l3.54-3.27c0,0,36.92,1.36,48.9,2.59c10.63,1.5,12.12-10.22,12.12-10.22L894.7,684.3L892.8,686.89z" />
                              <path d="M1176.54,457.5c0,0-1.27,1.36-2.45,2s-4.9-1.36-4.9-1.36s-0.73,4.72,2.27,7.63c3,2.91,5.9,3.63,9.26,4.81
			c0,0-2.27-4.27-1.91-6.08C1178.17,461.86,1176.54,457.5,1176.54,457.5z" />
                            </g>
                            <rect x="-0.08" y={0} className="st0" width={1441} height={957} />
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
                                    <path d="M1229.46,606.59c0,0,0.89-0.07-0.68,4.02l2.11-0.2c0,0,0.41-78.53,0-89.97c-0.41-11.44-3.13-75.74-4.22-92.63
			c-1.09-16.89-13.08-147.12-13.62-222.31C1212.5,130.3,1213.59,0,1213.59,0H0.08l-0.16,66.33l253.95,3.53l2.52-1.77h21.2
			l0.76,404.15l0.96-2.76l126.1,0.54l1.34,3.76l-18.9,107.2l31.61-118.22h2.15l0.54-10.84l3.94-0.18v-3.05
			c0,0-49.26,0.27-57.77-5.19l12.72-85.53c0,0,8.13-5.37,53.09-4.01c44.95,1.36,53.67,8.17,53.67,8.17l1.36,86.09
			c0,0-19.6,3.58-56.08,1.01l-0.23,2.45c0,0,3.61,0,4.2,0.7l-0.23,10.84l3.15-0.35l42.31,138.23c0,0,0.93,3.5-1.05,5.24h5.36v-6.06
			l7.34-4.2v2.1H505l5.24-2.45h5.01v2.1h10.37l3.03-2.21h4.2v2.21h9.67l3.03-1.98h3.03v1.86h10.84l3.5-2.33h3.85v1.75h13.99
			l3.15-1.98h3.5v1.86h10.37l1.63-0.47l3.38,0.33c0,0-3.09,57.58-7.45,72.65c1.63,10.17,4.18,28.15,4.18,28.15h55.21
			c0,0,5.27-3.27,6.72-12.9h-38.69c0,0-0.73-1.09-1.09-3.45V400.01c0,0,0.18-1.27,2.72-1.27c2.54,0,487.3-1.09,487.3-1.09
			s2.36-0.91,2.36,7.81s3.09,277.16,3.09,277.16s0.18,1.45-4.18,1.27s-38.87-0.36-38.87-0.36s0.36,11.44,8.9,14.17
			c8.9-0.18,90.63-0.91,90.63-0.91l-9.44-69.74l12.9-0.54c0,0-4-5.45-19.43-10.53c-11.44-4.9-15.07-6.36-18.53-5.27
			c-1.82,1.45-2.91,1.27-2.72,0c0.18-1.27,1.63-1.09,4.18-2s6.72-1.45,6.18-2.36c-0.54-0.91-6.54-4.36-9.99-3.81
			c-1.09-0.91,1.09-7.63,17.98-2.18c11.26,2.54,28.88,13.44,32.69,18.53c0,0-2.36-21.98-1.82-32.33c0,0,0.91-30.33,2.91-38.32
			l-0.54-27.52c0,0-3-4.63-3.27-7.76c0,0-6.4,0.95-6.67-11.17c0,0-5.86-0.82-5.31-5.72s3.41-5.04,3.41-5.04s-3.41-1.09-4.22-0.61
			c-0.82,0.48-0.68,1.57-0.68,2.18s-0.95,2.86-2.11,1.5c-1.16-1.36-1.84-3,0.48-3.34c0,0,1.09-0.89-0.82-2.11
			c-1.91-1.23-4.43-1.98-5.04-1.63c-0.61,0.34-1.23,2.25-2.66,1.63c-1.43-0.61-1.63-2.66,0.2-2.86c0,0-1.16-1.77,0-2.11
			s2.45,1.57,2.45,1.57l2.52,0.34c0,0-0.27-1.63-1.5-2.04c-1.23-0.41-1.16-2.79,0.61-3.13c1.77-0.34,3.06,1.63,1.98,3.41
			c0,0,0.2,2.32,0.75,2.59c0.54,0.27,2.59,1.77,3.47,1.98c0.89,0.2,4.22,0.75,4.22,0.75s0.82-4.29-0.75-4.9s-3.27-1.98-2.72-4.09
			c0.54-2.11,1.98-3.2,4.02-2.25c2.04,0.95,3.13,4.7,0.61,5.79c0,0,0.75,3.81,0.34,5.52c0,0,3.34,0.41,3.68,0.41
			c0.34,0,4.15-0.34,4.15-1.29c0-0.95-1.43-9.33-1.43-9.33s-4.22,0.07-5.45-0.89c-1.23-0.95-3.27-2.79,1.57-4.22
			c0,0,0.89-1.63-0.41-1.91c0,0-12.4-1.16-12.06-13.83c0,0-2.72-0.48-4.97,0c-2.25,0.48-11.78,1.63-12.26,0.27
			c-0.48-1.36,0.82-5.52,8.24-4.97c0,0,1.57-0.61-0.68-1.43c-2.25-0.82-4.5-4.09-4.09-4.77c0.41-0.68,3.95,3,5.11,2.93
			c0,0-1.23-5.99,0.95-7.02c2.18-1.02,4.09-2.18,5.31-2.38s1.84-0.68-0.2-2.25c-2.04-1.57-3.95-3.75-4.02-7.76
			c0,0-9.88-0.48-15.53-7.7c0,0,2.38-1.63,8.38-0.07c0,0,0.54-2.04,2.45-2.32c1.91-0.27,1.43-1.29,1.77-2.11s1.09-1.91,2.45-2.45
			c1.36-0.54,0.68-1.98,2.38-2.18s3.27-0.48,3.27-0.48s-0.2-2.45-1.91-3.2c-1.7-0.75-2.11-4.77-0.41-5.99
			c1.7-1.23,5.04-2.11,7.08-1.63c0,0-0.27-2.45,1.29-2.25c0,0,0.2-2.11-3.06-3.41c-3.27-1.29-6.33-10.01-4.5-11.44
			c0,0,2.11,4.43,2.86,5.18c0.75,0.75,2.72,3.81,3.47,3.06c0.75-0.75-0.27-3.13-0.54-4.29c-0.27-1.16-0.89-4.97,0.14-5.58
			c1.02-0.61,4.77-1.57,6.2,1.5c0,0,1.63-0.54,3.34-0.68s4.09,0.82,4.9,3c0,0,1.84-2.11,3.27-1.43c1.43,0.68,2.79,4.02,2.18,7.02
			c0,0,2.32,1.02,3.13,0.95c0.82-0.07,3.06-0.95,2.59-2.04s-0.54-1.57-0.54-1.57s3.34-0.48,3.75,2.72c0.41,3.2,0.89,1.43,1.29,1.84
			c0.41,0.41-0.89,1.16,0,1.57c0.89,0.41,1.36-0.54,1.84,0.07c0.48,0.61,1.29,1.57,1.43,1.84c0.14,0.27,0.34,1.16-0.41,1.77
			c-0.75,0.61-1.36,1.02-1.91,1.29c-0.54,0.27-2.52,0.95-2.72,0.95s-2.93,0-2.93,0s-0.48,0.54-0.34,0.89s0.34,3.06-0.95,4.9
			c0,0,0.54,3.61-2.72,4.22l-0.75,1.7c0,0,2.11,1.84-1.29,3.47c-3.41,1.63-8.31,1.84-8.31,1.84h-2.25c0,0-0.48,4.02-1.84,4.77
			s-1.09,3.47-1.09,3.47l1.02,2.25c0,0,4.63,0.34,6.33,1.36c1.7,1.02,1.7,0.34,1.7,0.34s1.16-2.52,0.82-4.15
			c-0.34-1.63-2.18-3.2-3.41-0.48c0,0,1.16-3.47,2.86-3.27s1.36-1.29,1.7-1.43s0.95,0.54,1.23,0.95s2.38,0.75,2.66,0.95
			s2.25,0.54,2.25,0.54l0.27,0.89l-0.07,4.15l0.82,1.23c0,0,6.4-3.61,8.72-6.13s3.54-1.43,1.02,1.36c-2.52,2.79-6.74,6.4-9.88,7.97
			c-3.13,1.57-2.45,2.66,0.68,1.98c3.13-0.68,12.46-5.11,13.01-5.79c0.54-0.68,2.86-0.89,1.23,1.16c-1.63,2.04-9.94,5.93-14.03,6.4
			c0,0,0.82,1.57-0.89,2.04s-1.77,0.89-1.77,0.89s-3.75,2.32-9.67-0.2s-0.89,2.18-0.89,2.18s3.47,3.68,0.68,5.93l-1.77,5.04
			l0.89,2.52l1.43,5.04c0,0,3.81-2.86,8.45-1.77c4.63,1.09,4.63-0.34,4.29-1.63s0.54-2.18,1.57-1.23c1.02,0.95,2.38,4.77,2.38,4.77
			s5.45,2.79,5.99,3.2c0.54,0.41,2.45,1.09,2.45,1.09s-2.59,4.15-7.42,4.77c-4.84,0.61-5.04,2.04-5.04,2.04l-4.84,2.59l-3.41,1.29
			l-1.09,1.43l1.36,8.31c0,0,4.43-2.59,6.27,2.72c1.84,5.31,0.41,7.49,0.41,7.49s5.79-1.36,7.9,3.34c2.11,4.7,0.82,9.74,0.82,9.74
			l2.59,1.57c0,0,13.15-1.02,15.12,6.2c1.98,7.22-13.42,4.09-13.42,4.09s-1.77,0.95-0.68,2.18c1.09,1.23,8.79,8.1,4.7,10.62
			s-12.8-7.49-12.8-7.49l-1.7-4.63l-3,0.75c0,0-0.82,10.62-2.04,14.58c-0.07,5.79-0.48,22.41-0.48,22.41s0.95,12.33,1.57,20.57
			c0.61,8.24,1.43,27.79,1.43,27.79l-0.14,15.6h10.15C1204.53,624.03,1220.74,604.82,1229.46,606.59z" />
                                    <path d="M1220.13,627.23c0,0,0.54,1.36,0.27,4.09c-0.27,2.72-5.99,66.38-5.99,66.38l16.66-1.27v-73.29L1220.13,627.23z" />
                                    <polygon points="410.72,606.25 418.34,513.35 392.74,606.25 		" />
                                    <polygon points="431.97,486.92 423.25,606.25 472.56,606.25 435.78,486.92 		" />
                                    <path d="M892.8,686.89h-48.77l-1.23-2.45l-168.09-0.14c2.72,9.54,6.81,9.54,6.81,9.54l44.54-2.59l2.86,3.27l0.27,3.18h266.04
			l0.27-3.18l3.54-3.27c0,0,36.92,1.36,48.9,2.59c10.63,1.5,12.12-10.22,12.12-10.22L894.7,684.3L892.8,686.89z" />
                                    <path d="M1176.54,457.5c0,0-1.27,1.36-2.45,2s-4.9-1.36-4.9-1.36s-0.73,4.72,2.27,7.63c3,2.91,5.9,3.63,9.26,4.81
			c0,0-2.27-4.27-1.91-6.08C1178.17,461.86,1176.54,457.5,1176.54,457.5z" />
                                  </g>
                                  <rect x="-0.08" y={0} className="st0" width={1441} height={957} />
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
                      <Link href="/tools/living-rom/living-1">
                        <a href="/tools/living-rom/living-1" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/living-room/phongkhach-1.jpg'} src="/images/no-image.svg" alt="" />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/living-rom/living-2">
                        <a href="/tools/living-rom/living-2" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/living-room/phongkhach-2.jpg'} src="/images/no-image.svg" alt="" />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="col-md-3 col-6 ">
                      <Link href="/tools/living-rom/living-3">
                        <a href="/tools/living-rom/living-3" className="item ">
                          <div className="img tRes_66">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={'/living-room/phongkhach-3.jpg'} src="/images/no-image.svg" alt="" />
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
                      <li className="active">
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
