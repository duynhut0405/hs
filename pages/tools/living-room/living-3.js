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
  const currentPirture = '/living-room/phongkhach-3.jpg';
  const suggest1 = '/living-room/phongkhach-3A.jpg';
  const suggest2 = '/living-room/phongkhach-3B.jpg';
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
                <h3 className="box-title-3">Phòng khách tối giản</h3>
                <div className="pd-20 border-bottom">
                  {activeTab == '1' && (
                    <div className="colorful">
                      <img id="background-image" src={currentPirture} alt="" />
                      <div id="container">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1441 957" style={{ enableBackground: 'new 0 0 1441 957' }} xmlSpace="preserve">
                          <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n\t.st1{display:none;}\n\t.st2{display:inline;}\n\t.st3{fill:#EC008C;}\n\t.st4{fill:none;stroke:#EC008C;stroke-miterlimit:10;}\n" }} />
                          <g style={{ fill: color.HEXCODE }}>
                            <path onClick={() => setOpenColor(true)} d="M130.56,0l-0.65,68.37h2.9v7.24l57.67,114.62c0,0,3.38,8.93-80.36,41.75c-83.73,32.82-77.22,20.99-77.7,18.58l91.7-176.64
		v-5.79h3.14V0H0v731.56c0,0,11.6,0.19,23.97,12c1.86,0,6.05-0.09,10.61,3.72c0.74-0.37,4.47-0.93,4.47-0.93s-2.79-3.44-6.33-4.09
		c-4-1.49-9.37-3.07-13.2-7.16c-3.18-0.74-6.81-1.67-5.78-4.37c2.05-0.28,8.84,2.14,8.84,2.14s7.91-5.21,15.07-7.07
		c-1.4-2.33-3.91-13.4,2.98-21.59c2.05,0.56,6.23,7.26,6.23,7.26l5.02,1.95c0,0,5.68-24,31.63-29.03c1.02,1.77,1.3,3.72-3.72,16.1
		c-1.4,3.63-1.12,6.98-1.49,10.79c-0.37,3.81-2.05,9.68-4.56,12.37c0,0,2.88,2.7,2.23,5.58c-0.65,2.88-3.44,3.81-3.91,6.51
		s-5.58,10.79-5.58,10.79s3.44,7.54,6.14,9.86c1.58-2.61,5.12-7.63,16-7.91l12-74.16c0,0-26.33-0.19-31.82-3.72v-11.44
		c0,0,2.88-4.28,31.82-4.37l-0.56-113.05c0,0-9.03,9.3-21.21,7.91c-2.33,2.23-4.28,5.21-6.89,5.21s-6.89,0.47-6.89,0.47
		s-1.21-1.58-0.28-6.51c0.09-4.47-0.56-8,2.14-11.44c3.35-4.84,9.96-15.45,20.19-17.86c0,0-1.02-7.26,9.03-14.51
		c0,0,0.28-2.42-1.67-2.79c0,0-7.82,0.47-12.84-0.56s-13.31-1.77-16.65-2.79c-3.35-1.02-6.33-2.14-10.33-5.77
		c-2.79-1.86-5.68-3.6-6.98-4.59c-1.4-1.27-2.42-3.5-3.26-4.06c-0.84-0.56-4.75-1.86-4.75-1.86s1.67-4.09,10.05-8
		c4.19-3.91,10.05-6.79,14.89-8.93c4.84-2.14,15.17-5.02,23.73-5.21c0,0,8.65-5.02,10.05-6.14c1.4-1.12,4.65-1.58,7.82,0
		c3.16,1.58,10.23,7.82,10.23,7.82s9.68,2.98,10.42,3.07c-1.12-2.14-8.19-14.14-9.58-18.7c-3.91-6.7-11.44-19.91-15.45-23.54
		c-3.91-5.21-8-11.44-8.37-12.19c-0.37-0.74-2.42-2.98,2.88-8.47c3.54-0.19,4.84,1.58,6.7,1.67c1.86,0.09,8.28,0.47,10.05,1.95
		c1.77,1.49,6.23,8.65,13.21,11.63c6.98,2.98,13.49,8,17.12,15.54s3.72,19.63,3.63,25.21s-1.3,10.7-1.3,10.7s4.19-3.35,8.93-4
		c0,0,0.74-13.03,0.93-17.86c0.19-4.84,0.93-11.44,5.77-21.96c0,0,3.07-10.14,4.09-12.65c1.02-2.51,4.75-12.84,5.21-14.51
		c0.47-1.67,3.44-8.19,4.65-9.77s5.3-6.61,5.77-8c0.47-1.4,3.16-5.12,5.68-4.28s1.4,4,2.98,4.56c1.58,0.56,2.88,0.65,4.93,2.51
		c2.05,1.86,3.91,6.05,6.14,9.12c2.23,3.07,3.91,7.07,3.91,14.51c0,7.44,0.09,17.4-3.16,21.68c-3.26,4.28-15.72,18.52-18.24,21.49
		c-2.51,2.98-9.03,12.37-9.03,12.37l1.86-0.19c0,0,5.21-8.47,10.05-10.79c2.88-2.51,10.23-10.14,11.91-10.7
		c1.67-0.56,6.61-0.37,6.61-0.37s15.54-8.37,21.4-8.84c5.86-0.47,11.17,0.93,11.17,0.93s-10.98,4.37-11.54,5.3
		c-0.93,1.67-0.74,3.91-9.68,4.93c-1.95,0.84-4.09,3.44-4.65,6.05s-4.28,8.09-4.28,8.09s2.98,2.88,4.09,6.42
		c1.12,3.54,3.91,5.68,3.91,5.68s14.24-1.02,24.01,3.72c2.05-0.19,12,0.74,16,4.37c-2.61-0.19-3.44,0.47-3.44,0.47
		s-1.3,1.58-3.07,2.42c-1.77,0.84-3.72,5.4-5.02,6.98c-1.3,1.58-3.07,5.12-12.28,5.21c-7.44,2.05-12,4.28-20.93,2.33
		c-1.58-0.09-5.02,2.6-5.02,2.6s11.35-1.3,14.89-0.28s4.56,5.02,4.56,5.02s12.19-4.47,20.56-5.68c8.37-1.21,15.82-4.47,22.14-1.21
		l13.49-4.65c0,0,2.33,1.86,2.88,2.23c-1.49,2.88-4.28,5.58-8.47,5.95c-4.19,0.37-21.21,3.63-28.28,5.21s-22.14,5.02-22.14,5.02
		s-2.79,4.75-5.21,4.19c-2.42-0.56-7.26-2.23-7.26-2.23s-21.49,4-23.63,6.61l-0.09,1.67c0,0,17.77-2.7,22.8,0.93
		c7.63,1.21,11.82,2.33,16.28,6.05c4.47,3.72,5.49,4.75,6.14,7.44s0.74,7.16-1.12,7.54s-4.75,1.12-4.75,1.12l-3.26-0.19l-3.54-2.42
		l-4.84,1.12V653.5c0,0,26.42,0,29.68,3.81v10.89c0,0,0.28,4-38.89,5.21l21.01,166.33h91.9c0,0-25.79-105.34-31.24-134.77
		s-10.53-58.85,6.9-65.75c17.44-6.9,39.96-5.81,44.32-5.81c4.36,0,35.96,4.72,35.96,4.72s-9.44-23.61-7.27-42.86
		c2.18-19.25,9.81-72.29,30.88-75.92c21.07-3.63,223.04-3.27,223.04-3.27s71.92-0.36,77.01-0.36c5.09,0,19.47-1.45,20.63,16.71
		c0,0,1.89-4.36,2.98-6.9c1.09-2.54-0.73-12.71,44.68-9.44c46.86,0.36,262.27,1.09,269.17,1.09c6.9,0,20.71,5.45,28.7,34.15
		c7.99,28.7,11.62,64.66,0,82.82l1.09,4c0,0,45.04-8.35,68.65-3.27c16.35,6.54,26.88,7.63,22.88,37.78c0,0-3.03,23.32-5.46,34.46
		c-2.43,11.13-30.59,131.7-30.59,131.7l117.87-0.13l55.42-145.26v-2.56c0,0-4.22,0.51-6.02-5.5c-1.79-6.02-2.82-11.01-6.4-11.01
		s-24.19-1.54-27.64-2.69c-3.84-0.26-14.72-1.15-20.35-1.66s-19.07,0.13-17.41-11.52l36.99-3.2l0.26-1.54h4.48
		c0,0-11.9-9.6-9.09-30.46c2.82-20.86,10.11-47.99,19.97-69.11l17.53-0.26c0,0,11.39,26.49,15.23,41.98l5.12-0.13
		c0,0-0.13-15.49,4.35-26.49s9.09-18.94,8.96-32.51l27.64-0.64c0,0,0.9,15.61,4.1,22.53s9.47,14.72,9.73,43.26s0,55.03,0,55.03
		s25.6-0.13,28.8,3.71c3.2,3.84-3.71,9.21-9.34,9.73c-5.63,0.51-59.26,4.35-60.02,5.25c-0.77,0.9-2.3,4.35-3.33,8.32
		c-1.02,3.97-1.66,6.66-7.68,7.42l50.55,147.69H1441V0H130.56z" />
                            <polygon points="1300.68,690.99 1300.68,694.26 1246.02,838.65 1307.04,838.65 1302.5,690.99 	" />
                            <polygon points="1312.31,838.65 1357.17,838.65 1307.04,693.9 	" />
                            <polygon points="174.43,696.26 176.79,839.74 218.56,839.74 195.13,692.26 	" />
                            <path d="M112.11,693.62l-6.27,32.08c0,0,5.31-2.86,5.99-3.47c0.68-0.61,7.9-13.96,14.23-18.66c6.33-4.7,14.78-4.29,15.05-2.59
		c-2.11,1.98-13.28,11.85-17.64,19.55c2.18,0.14,18.25,0.61,18.87,2.11c-1.5,2.52-3.34,5.31-3.95,7.63
		c-0.61,2.32-3.88,12.06-11.65,14.64c1.57,1.16,6.06,4.43,8.89,10.69c3.44,4.77,4.6,8.24,4.46,11.31c-1.43-0.61-2.93-2.11-4.46-1.57
		c-1.53,0.54-5.07,2.59-5.07,2.59s3,3.47,3.27,7.02c-4.43-2.93-11.44-6.67-11.44-6.67s-4.29-0.68-6.2,0.82
		c-1.91,1.5-5.79,3.54-9.54,7.63c-3.75,4.09-8.45,8.31-8.45,8.31s5.59-0.07,7.7,2.11c0,0,2.79-3.27,8.58-2.66
		c0,0,9.81-3.95,21.45,1.36c11.37,3.47,19.34,6.67,24.59,14.3c5.24,7.63,1.7,17.23,0.2,19.68s-3.47,4.63-3.47,4.63
		s-6.74-3.06-10.9-13.01c-4.15-9.94-12.74-15.67-14.54-15.46c1.67,2.66,5.35,8.58,6.37,12.4c1.02,3.81,0,14.85,0,14.85
		s1.7,9.74,0.61,15.67h26.63l-6.2-141.8L112.11,693.62z" />
                            <path d="M122.14,527h20.97l-2.48-4.09c0,0-9.92-0.5-12.78-0.74C126.36,522.91,122.14,527,122.14,527z" />
                            <polygon points="139.38,511.62 129.71,508.77 128.22,511 136.03,514.6 139.38,513.23 	" />
                          </g>
                          <path className="st3" d="M187.64,504.6c0,0,0-1.74-2.11-2.23c0.25-1.61,3.47-2.85,3.47-2.85h8.81l4.59-2.48l3.23,1.74
	c0,0-7.2,1.86-11.04,2.92C190.74,502.74,187.64,504.6,187.64,504.6z" />
                          <rect x={0} y={0} className="st0" width={1441} height={957} />
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
                                <g style={{ fill: color.HEXCODE }}>
                                  <path d="M130.56,0l-0.65,68.37h2.9v7.24l57.67,114.62c0,0,3.38,8.93-80.36,41.75c-83.73,32.82-77.22,20.99-77.7,18.58l91.7-176.64
		v-5.79h3.14V0H0v731.56c0,0,11.6,0.19,23.97,12c1.86,0,6.05-0.09,10.61,3.72c0.74-0.37,4.47-0.93,4.47-0.93s-2.79-3.44-6.33-4.09
		c-4-1.49-9.37-3.07-13.2-7.16c-3.18-0.74-6.81-1.67-5.78-4.37c2.05-0.28,8.84,2.14,8.84,2.14s7.91-5.21,15.07-7.07
		c-1.4-2.33-3.91-13.4,2.98-21.59c2.05,0.56,6.23,7.26,6.23,7.26l5.02,1.95c0,0,5.68-24,31.63-29.03c1.02,1.77,1.3,3.72-3.72,16.1
		c-1.4,3.63-1.12,6.98-1.49,10.79c-0.37,3.81-2.05,9.68-4.56,12.37c0,0,2.88,2.7,2.23,5.58c-0.65,2.88-3.44,3.81-3.91,6.51
		s-5.58,10.79-5.58,10.79s3.44,7.54,6.14,9.86c1.58-2.61,5.12-7.63,16-7.91l12-74.16c0,0-26.33-0.19-31.82-3.72v-11.44
		c0,0,2.88-4.28,31.82-4.37l-0.56-113.05c0,0-9.03,9.3-21.21,7.91c-2.33,2.23-4.28,5.21-6.89,5.21s-6.89,0.47-6.89,0.47
		s-1.21-1.58-0.28-6.51c0.09-4.47-0.56-8,2.14-11.44c3.35-4.84,9.96-15.45,20.19-17.86c0,0-1.02-7.26,9.03-14.51
		c0,0,0.28-2.42-1.67-2.79c0,0-7.82,0.47-12.84-0.56s-13.31-1.77-16.65-2.79c-3.35-1.02-6.33-2.14-10.33-5.77
		c-2.79-1.86-5.68-3.6-6.98-4.59c-1.4-1.27-2.42-3.5-3.26-4.06c-0.84-0.56-4.75-1.86-4.75-1.86s1.67-4.09,10.05-8
		c4.19-3.91,10.05-6.79,14.89-8.93c4.84-2.14,15.17-5.02,23.73-5.21c0,0,8.65-5.02,10.05-6.14c1.4-1.12,4.65-1.58,7.82,0
		c3.16,1.58,10.23,7.82,10.23,7.82s9.68,2.98,10.42,3.07c-1.12-2.14-8.19-14.14-9.58-18.7c-3.91-6.7-11.44-19.91-15.45-23.54
		c-3.91-5.21-8-11.44-8.37-12.19c-0.37-0.74-2.42-2.98,2.88-8.47c3.54-0.19,4.84,1.58,6.7,1.67c1.86,0.09,8.28,0.47,10.05,1.95
		c1.77,1.49,6.23,8.65,13.21,11.63c6.98,2.98,13.49,8,17.12,15.54s3.72,19.63,3.63,25.21s-1.3,10.7-1.3,10.7s4.19-3.35,8.93-4
		c0,0,0.74-13.03,0.93-17.86c0.19-4.84,0.93-11.44,5.77-21.96c0,0,3.07-10.14,4.09-12.65c1.02-2.51,4.75-12.84,5.21-14.51
		c0.47-1.67,3.44-8.19,4.65-9.77s5.3-6.61,5.77-8c0.47-1.4,3.16-5.12,5.68-4.28s1.4,4,2.98,4.56c1.58,0.56,2.88,0.65,4.93,2.51
		c2.05,1.86,3.91,6.05,6.14,9.12c2.23,3.07,3.91,7.07,3.91,14.51c0,7.44,0.09,17.4-3.16,21.68c-3.26,4.28-15.72,18.52-18.24,21.49
		c-2.51,2.98-9.03,12.37-9.03,12.37l1.86-0.19c0,0,5.21-8.47,10.05-10.79c2.88-2.51,10.23-10.14,11.91-10.7
		c1.67-0.56,6.61-0.37,6.61-0.37s15.54-8.37,21.4-8.84c5.86-0.47,11.17,0.93,11.17,0.93s-10.98,4.37-11.54,5.3
		c-0.93,1.67-0.74,3.91-9.68,4.93c-1.95,0.84-4.09,3.44-4.65,6.05s-4.28,8.09-4.28,8.09s2.98,2.88,4.09,6.42
		c1.12,3.54,3.91,5.68,3.91,5.68s14.24-1.02,24.01,3.72c2.05-0.19,12,0.74,16,4.37c-2.61-0.19-3.44,0.47-3.44,0.47
		s-1.3,1.58-3.07,2.42c-1.77,0.84-3.72,5.4-5.02,6.98c-1.3,1.58-3.07,5.12-12.28,5.21c-7.44,2.05-12,4.28-20.93,2.33
		c-1.58-0.09-5.02,2.6-5.02,2.6s11.35-1.3,14.89-0.28s4.56,5.02,4.56,5.02s12.19-4.47,20.56-5.68c8.37-1.21,15.82-4.47,22.14-1.21
		l13.49-4.65c0,0,2.33,1.86,2.88,2.23c-1.49,2.88-4.28,5.58-8.47,5.95c-4.19,0.37-21.21,3.63-28.28,5.21s-22.14,5.02-22.14,5.02
		s-2.79,4.75-5.21,4.19c-2.42-0.56-7.26-2.23-7.26-2.23s-21.49,4-23.63,6.61l-0.09,1.67c0,0,17.77-2.7,22.8,0.93
		c7.63,1.21,11.82,2.33,16.28,6.05c4.47,3.72,5.49,4.75,6.14,7.44s0.74,7.16-1.12,7.54s-4.75,1.12-4.75,1.12l-3.26-0.19l-3.54-2.42
		l-4.84,1.12V653.5c0,0,26.42,0,29.68,3.81v10.89c0,0,0.28,4-38.89,5.21l21.01,166.33h91.9c0,0-25.79-105.34-31.24-134.77
		s-10.53-58.85,6.9-65.75c17.44-6.9,39.96-5.81,44.32-5.81c4.36,0,35.96,4.72,35.96,4.72s-9.44-23.61-7.27-42.86
		c2.18-19.25,9.81-72.29,30.88-75.92c21.07-3.63,223.04-3.27,223.04-3.27s71.92-0.36,77.01-0.36c5.09,0,19.47-1.45,20.63,16.71
		c0,0,1.89-4.36,2.98-6.9c1.09-2.54-0.73-12.71,44.68-9.44c46.86,0.36,262.27,1.09,269.17,1.09c6.9,0,20.71,5.45,28.7,34.15
		c7.99,28.7,11.62,64.66,0,82.82l1.09,4c0,0,45.04-8.35,68.65-3.27c16.35,6.54,26.88,7.63,22.88,37.78c0,0-3.03,23.32-5.46,34.46
		c-2.43,11.13-30.59,131.7-30.59,131.7l117.87-0.13l55.42-145.26v-2.56c0,0-4.22,0.51-6.02-5.5c-1.79-6.02-2.82-11.01-6.4-11.01
		s-24.19-1.54-27.64-2.69c-3.84-0.26-14.72-1.15-20.35-1.66s-19.07,0.13-17.41-11.52l36.99-3.2l0.26-1.54h4.48
		c0,0-11.9-9.6-9.09-30.46c2.82-20.86,10.11-47.99,19.97-69.11l17.53-0.26c0,0,11.39,26.49,15.23,41.98l5.12-0.13
		c0,0-0.13-15.49,4.35-26.49s9.09-18.94,8.96-32.51l27.64-0.64c0,0,0.9,15.61,4.1,22.53s9.47,14.72,9.73,43.26s0,55.03,0,55.03
		s25.6-0.13,28.8,3.71c3.2,3.84-3.71,9.21-9.34,9.73c-5.63,0.51-59.26,4.35-60.02,5.25c-0.77,0.9-2.3,4.35-3.33,8.32
		c-1.02,3.97-1.66,6.66-7.68,7.42l50.55,147.69H1441V0H130.56z" />
                                  <polygon points="1300.68,690.99 1300.68,694.26 1246.02,838.65 1307.04,838.65 1302.5,690.99 	" />
                                  <polygon points="1312.31,838.65 1357.17,838.65 1307.04,693.9 	" />
                                  <polygon points="174.43,696.26 176.79,839.74 218.56,839.74 195.13,692.26 	" />
                                  <path d="M112.11,693.62l-6.27,32.08c0,0,5.31-2.86,5.99-3.47c0.68-0.61,7.9-13.96,14.23-18.66c6.33-4.7,14.78-4.29,15.05-2.59
		c-2.11,1.98-13.28,11.85-17.64,19.55c2.18,0.14,18.25,0.61,18.87,2.11c-1.5,2.52-3.34,5.31-3.95,7.63
		c-0.61,2.32-3.88,12.06-11.65,14.64c1.57,1.16,6.06,4.43,8.89,10.69c3.44,4.77,4.6,8.24,4.46,11.31c-1.43-0.61-2.93-2.11-4.46-1.57
		c-1.53,0.54-5.07,2.59-5.07,2.59s3,3.47,3.27,7.02c-4.43-2.93-11.44-6.67-11.44-6.67s-4.29-0.68-6.2,0.82
		c-1.91,1.5-5.79,3.54-9.54,7.63c-3.75,4.09-8.45,8.31-8.45,8.31s5.59-0.07,7.7,2.11c0,0,2.79-3.27,8.58-2.66
		c0,0,9.81-3.95,21.45,1.36c11.37,3.47,19.34,6.67,24.59,14.3c5.24,7.63,1.7,17.23,0.2,19.68s-3.47,4.63-3.47,4.63
		s-6.74-3.06-10.9-13.01c-4.15-9.94-12.74-15.67-14.54-15.46c1.67,2.66,5.35,8.58,6.37,12.4c1.02,3.81,0,14.85,0,14.85
		s1.7,9.74,0.61,15.67h26.63l-6.2-141.8L112.11,693.62z" />
                                  <path d="M122.14,527h20.97l-2.48-4.09c0,0-9.92-0.5-12.78-0.74C126.36,522.91,122.14,527,122.14,527z" />
                                  <polygon points="139.38,511.62 129.71,508.77 128.22,511 136.03,514.6 139.38,513.23 	" />
                                </g>
                                <path className="st3" d="M187.64,504.6c0,0,0-1.74-2.11-2.23c0.25-1.61,3.47-2.85,3.47-2.85h8.81l4.59-2.48l3.23,1.74
	c0,0-7.2,1.86-11.04,2.92C190.74,502.74,187.64,504.6,187.64,504.6z" />
                                <rect x={0} y={0} className="st0" width={1441} height={957} />
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
                      <li className="active">
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
