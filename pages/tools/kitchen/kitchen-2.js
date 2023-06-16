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
  const currentPirture = '/kitchen/kitchen-2.jpg';
  const suggest1 = '/kitchen/kitchen-2A.jpg';
  const suggest2 = '/kitchen/kitchen-2B.jpg';
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
                <h3 className="box-title-3">Phòng bếp thanh lịch</h3>
                <div className="pd-20 border-bottom">
                  {activeTab == '1' && (
                    <div className="colorful">
                      <img id="background-image" src={currentPirture} alt="" />
                      <div id="container">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1441 957" style={{ enableBackground: 'new 0 0 1441 957' }} xmlSpace="preserve">
                          <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n\t.st1{fill:#EC008C;}\n\t.st2{fill:none;stroke:#EC008C;stroke-miterlimit:10;}\n\t.st3{display:none;}\n\t.st4{display:inline;}\n" }} />
                          <g>
                            <g style={{ fill: color.HEXCODE }}>
                              <path d="M550.56,398.69l-0.63,0.53C549.93,399.22,550.15,399.17,550.56,398.69z" />
                              <path d="M677.8,222.52c-2.84,0.36-1.01,4.25-1.01,4.25l6.7,2.43C683.48,229.21,681.27,222.09,677.8,222.52z" />
                              <path onClick={() => setOpenColor(true)} d="M0,0v584.96c0,0,41.63-14.71,54.71-16.35L52.8,451.87h-2.04v-10.08l91.95-19.62h74.78h2.59v1.63l17.84-3.81v-2.72h12.26
			v-1.77h2.45l1.36,3.13h2.72v1.5h-2.32l-0.82,1.63h12.12v-4.36h-3v-1.23l5.99-1.5V417h8.45v-1.23h4.22v3l-2.18,3.68h4.9v-5.04
			l5.72-2.72v-21.66l-9.67-11.44h8.31v-2.04h5.86v-5.45c0,0-0.14-2.59-2.59-1.63v1.77c0,0-0.54,0.82-1.63,0.82s-1.91-1.1-1.63-2.8
			c0,0,0-27.17,29.97-29.08c0,0,26.97-0.01,29.7,28.47c0,0,0.68,3.27-1.63,3.27s-2.04-2.72-2.04-2.72s-1.91,0.14-2.04,1.63
			s-0.14,3.81-0.14,3.81l4.36,0.27c0,0,2.32,0.41,0.27,2.59v33.24c0,0,5.86,0,5.99,2.32c0,0-5.58,2.72-16.89,3.41l-0.95,3.41
			l20.84-0.41v-1.91l2.18-0.27v-3.13l9.4-0.27v-1.23l2.18-0.14l0.54,4.9l0.82-1.63l3.81-1.23v1.91l-1.63,0.68l0.14,1.5l7.22-2.32
			v-1.77l-1.5,0.14v-1.63l4.63-0.95v1.63l-0.95,3.81l2.32-3.41l10.62-0.27v3.95l4.09-0.14v1.91l29.97,0.27l13.62,0.68l1.23-87.32
			h17.98l-1.63-17.16h14.44l-2.45,17.44h17.71v37.87h4.63v49.58h16.07c0,0,3.81-8.99,16.07-8.45v-12.53l0.75-0.34
			c0,0-2.45-4.29-4.77-5.86s-10.35-7.9-10.35-7.9l3.75-2.04l4.56,3.27l-3-7.56l10.69-0.34l3.54,10.49c0,0-0.07,3.34-1.57,4.84
			l2.79,4.09l5.99-0.75c0,0,1.02-4.63,0.75-7.56s-0.34-13.01,3.27-13.35c3.61-0.34,0.68,11.65-0.41,14.1
			c-1.09,2.45-1.77,6.81-1.77,6.81h4.84c0,0,2.86-5.45,3.88-8.38c1.02-2.93,2.04-7.42,2.04-7.42l2.79,1.29c0,0-1.57,6.54-3,9.6
			c-0.69,1.48-1.24,2.29-1.62,2.74l8.36-7.1c0,0,0.14-7.56,5.11-10.76c4.97-3.2,8.17-3.06,9.4-1.57c1.23,1.5,0.95,6.81-4.15,10.63
			c-5.11,3.81-9.06,3.27-9.06,3.27l-9.13,8.85l1.16,0.14v2.04h12.12v19.21h117.35v-12.26l-3.81-4.22l0.68-1.63l3.81,3.54l2.18-1.36
			v-30.38c0,0-0.95-9.94-7.49-9.94s-8.85,8.31-8.85,8.31s-2.32,1.91-5.45-1.09c0,0,3.41-13.21,13.62-13.21
			c10.22,0,13.62,9.13,13.62,14.85c0,5.72,0,31.6,0,31.6l3.54,3.81v12.26h173.54l20.07,20.07v160.65h204.78l45.04,38.87h65.39V50.16
			L1304.38,0H0z M567.98,246.59H141.89l-53.94-3.81l-2.18-180.9h468.05l14.17,20.16V246.59z M685.91,245.31
			c-3.45,1.69-8.32,1.28-8.32,1.28c-2.64-2.51-10.96-2.56-10.96-2.56l5.28-19.07l3.04,1.01c0,0-1.22-5.07,2.84-5.48
			s7.51,8.32,7.51,8.32c2.43,3.04,3.65,6.7,3.65,6.7L685.91,245.31z M721.72,237.05l-3.95,7.9c-5.5,3.18-11.21,0.73-12.85-0.82
			c-1.63-1.54-5.9-1.91-5.9-1.91c-0.27-10.99,8.08-18.71,8.08-18.71l2.18,1.91c0,0-1.54-4.99,3.36-4.96
			c4.9,0.04,6.08,8.74,6.08,8.74C721.82,232.36,721.72,237.05,721.72,237.05z M793.01,246.5c0,0-5.36-1.19-7.45-0.82
			c-2.09,0.36-7.81,0.18-9.99-4.81c0,0-2.91-5.09,2.18-12.17c5.09-7.08,6.27-6.79,6.27-6.79l1.54,0.8c0,0,1.73-4.99,4.72-3.45
			c3,1.54,5.45,8.45,5.45,8.45l2.72,3.9C798.46,231.61,798.1,242.15,793.01,246.5z M842.77,207.5l-8.93,7.2h-3.86v6.59h-6.09v-6.59
			H613.67v7.2h-6.9v-6.49h-2.23l-11.77-7.91v-7.91l59.42,0.61l-2.19-2.03l1.22-2.84l-0.41-2.64l-5.48-2.64l13.8-0.41
			c-1.42-3.25-6.94-7.71-6.94-7.71s3.69,1.42,6.33,2.43s5.28-1.22,6.7-2.03c1.42-0.81,7.1-2.23,11.77-1.22
			c4.67,1.01,7.91,4.67,10.96,2.84c3.04-1.83,6.9-2.03,6.9-2.03l-7.1,7.31l16.23,1.22l-3.45,1.83l-2.64,1.42l-1.83,1.22l0.41,4.87
			h10.96c-2.44-1.42,1.42-9.13,2.23-12.58c0.81-3.45-3.86-7.51-3.86-7.51s2.03-1.01,4.67,0.81s7.3,2.84,10.04,1.83
			c2.73-1.01,2.34-4.46,7.21-3.25c4.87,1.22,0.61,9.94-0.61,11.36s-0.81,9.33-0.81,9.33h16.44c-4.06-4.46-4.67-12.18-4.67-12.18
			l-0.41-4.06l-0.2-2.23l0.81-3.04l-1.42-1.83l41.19-5.68l3.45,16.84c0.2,5.28-3.45,12.58-3.45,12.58h64.73V207.5z M842.77,123.45
			l-9.61,14.35h-3.27v7.08h-6.54v-7.08H613.57v7.08h-6.9l0.18-7.27h-3.09l-10.99-13.8v-7.99h51.12
			c-13.99-11.08-8.35-23.25-8.35-23.25s-1.45-4-0.91-4.54c0.54-0.54,13.26-4.54,22.88-4.18c9.63,0.36,20.16,2.18,22.52,3.63
			s-0.36,6.18-0.36,6.18c5.09,13.08-9.08,22.2-9.08,22.2h41.32v-4.59h-1.36v-2.54c6.54-4,18.34-4.72,18.34-4.72v-8.9v-6.54
			c0,0,4-1.82,11.62-1.82s10.53,1.82,10.53,1.82l-0.36,6.54l3.09,0.18l7.27-14.53l6.9,0.73c-0.54,5.81-6.9,15.62-6.9,15.62v7.33
			c5.63-0.3,10.35,3.03,10.35,3.03v-1.82c10.9-2.72,18.71,0,18.71,0v10.17h52.66V123.45z" />
                              <path d="M712.37,222.5c-2.45-0.02-1.09,4.11-1.09,4.11l5.45,2.18C716.73,228.79,714.82,222.52,712.37,222.5z" />
                              <path d="M789.38,220.89c-1.63,0-1.45,3.36-1.45,3.36l5.72,2.72C793.65,226.97,791.01,220.89,789.38,220.89z" />
                              <path d="M344.05,369.97c0,0,0.26-19.97-25-23.67c-14.55-1.06-25.39,11.37-27.38,23.94c2.25-0.66,5.42,0.93,4.63,8.46h10.05
			c0,0,0.85-10.32,11.3-10.32s11.84,9.26,11.84,9.26h10.98C340.48,377.64,338.89,370.89,344.05,369.97z" />
                              <path d="M317.86,370.89c-8.73,0-8.6,7.8-8.6,7.8h17.59C326.85,378.7,326.59,370.89,317.86,370.89z" />
                            </g>
                            <rect x={0} y={0} className="st0" width={1441} height={957} />
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
                                <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\t.st0{fill:none;}\n\t.st1{fill:#EC008C;}\n\t.st2{fill:none;stroke:#EC008C;stroke-miterlimit:10;}\n\t.st3{display:none;}\n\t.st4{display:inline;}\n" }} />
                                <g>
                                  <g style={{ fill: color.HEXCODE }}>
                                    <path d="M550.56,398.69l-0.63,0.53C549.93,399.22,550.15,399.17,550.56,398.69z" />
                                    <path d="M677.8,222.52c-2.84,0.36-1.01,4.25-1.01,4.25l6.7,2.43C683.48,229.21,681.27,222.09,677.8,222.52z" />
                                    <path onClick={() => setOpenColor(true)} d="M0,0v584.96c0,0,41.63-14.71,54.71-16.35L52.8,451.87h-2.04v-10.08l91.95-19.62h74.78h2.59v1.63l17.84-3.81v-2.72h12.26
			v-1.77h2.45l1.36,3.13h2.72v1.5h-2.32l-0.82,1.63h12.12v-4.36h-3v-1.23l5.99-1.5V417h8.45v-1.23h4.22v3l-2.18,3.68h4.9v-5.04
			l5.72-2.72v-21.66l-9.67-11.44h8.31v-2.04h5.86v-5.45c0,0-0.14-2.59-2.59-1.63v1.77c0,0-0.54,0.82-1.63,0.82s-1.91-1.1-1.63-2.8
			c0,0,0-27.17,29.97-29.08c0,0,26.97-0.01,29.7,28.47c0,0,0.68,3.27-1.63,3.27s-2.04-2.72-2.04-2.72s-1.91,0.14-2.04,1.63
			s-0.14,3.81-0.14,3.81l4.36,0.27c0,0,2.32,0.41,0.27,2.59v33.24c0,0,5.86,0,5.99,2.32c0,0-5.58,2.72-16.89,3.41l-0.95,3.41
			l20.84-0.41v-1.91l2.18-0.27v-3.13l9.4-0.27v-1.23l2.18-0.14l0.54,4.9l0.82-1.63l3.81-1.23v1.91l-1.63,0.68l0.14,1.5l7.22-2.32
			v-1.77l-1.5,0.14v-1.63l4.63-0.95v1.63l-0.95,3.81l2.32-3.41l10.62-0.27v3.95l4.09-0.14v1.91l29.97,0.27l13.62,0.68l1.23-87.32
			h17.98l-1.63-17.16h14.44l-2.45,17.44h17.71v37.87h4.63v49.58h16.07c0,0,3.81-8.99,16.07-8.45v-12.53l0.75-0.34
			c0,0-2.45-4.29-4.77-5.86s-10.35-7.9-10.35-7.9l3.75-2.04l4.56,3.27l-3-7.56l10.69-0.34l3.54,10.49c0,0-0.07,3.34-1.57,4.84
			l2.79,4.09l5.99-0.75c0,0,1.02-4.63,0.75-7.56s-0.34-13.01,3.27-13.35c3.61-0.34,0.68,11.65-0.41,14.1
			c-1.09,2.45-1.77,6.81-1.77,6.81h4.84c0,0,2.86-5.45,3.88-8.38c1.02-2.93,2.04-7.42,2.04-7.42l2.79,1.29c0,0-1.57,6.54-3,9.6
			c-0.69,1.48-1.24,2.29-1.62,2.74l8.36-7.1c0,0,0.14-7.56,5.11-10.76c4.97-3.2,8.17-3.06,9.4-1.57c1.23,1.5,0.95,6.81-4.15,10.63
			c-5.11,3.81-9.06,3.27-9.06,3.27l-9.13,8.85l1.16,0.14v2.04h12.12v19.21h117.35v-12.26l-3.81-4.22l0.68-1.63l3.81,3.54l2.18-1.36
			v-30.38c0,0-0.95-9.94-7.49-9.94s-8.85,8.31-8.85,8.31s-2.32,1.91-5.45-1.09c0,0,3.41-13.21,13.62-13.21
			c10.22,0,13.62,9.13,13.62,14.85c0,5.72,0,31.6,0,31.6l3.54,3.81v12.26h173.54l20.07,20.07v160.65h204.78l45.04,38.87h65.39V50.16
			L1304.38,0H0z M567.98,246.59H141.89l-53.94-3.81l-2.18-180.9h468.05l14.17,20.16V246.59z M685.91,245.31
			c-3.45,1.69-8.32,1.28-8.32,1.28c-2.64-2.51-10.96-2.56-10.96-2.56l5.28-19.07l3.04,1.01c0,0-1.22-5.07,2.84-5.48
			s7.51,8.32,7.51,8.32c2.43,3.04,3.65,6.7,3.65,6.7L685.91,245.31z M721.72,237.05l-3.95,7.9c-5.5,3.18-11.21,0.73-12.85-0.82
			c-1.63-1.54-5.9-1.91-5.9-1.91c-0.27-10.99,8.08-18.71,8.08-18.71l2.18,1.91c0,0-1.54-4.99,3.36-4.96
			c4.9,0.04,6.08,8.74,6.08,8.74C721.82,232.36,721.72,237.05,721.72,237.05z M793.01,246.5c0,0-5.36-1.19-7.45-0.82
			c-2.09,0.36-7.81,0.18-9.99-4.81c0,0-2.91-5.09,2.18-12.17c5.09-7.08,6.27-6.79,6.27-6.79l1.54,0.8c0,0,1.73-4.99,4.72-3.45
			c3,1.54,5.45,8.45,5.45,8.45l2.72,3.9C798.46,231.61,798.1,242.15,793.01,246.5z M842.77,207.5l-8.93,7.2h-3.86v6.59h-6.09v-6.59
			H613.67v7.2h-6.9v-6.49h-2.23l-11.77-7.91v-7.91l59.42,0.61l-2.19-2.03l1.22-2.84l-0.41-2.64l-5.48-2.64l13.8-0.41
			c-1.42-3.25-6.94-7.71-6.94-7.71s3.69,1.42,6.33,2.43s5.28-1.22,6.7-2.03c1.42-0.81,7.1-2.23,11.77-1.22
			c4.67,1.01,7.91,4.67,10.96,2.84c3.04-1.83,6.9-2.03,6.9-2.03l-7.1,7.31l16.23,1.22l-3.45,1.83l-2.64,1.42l-1.83,1.22l0.41,4.87
			h10.96c-2.44-1.42,1.42-9.13,2.23-12.58c0.81-3.45-3.86-7.51-3.86-7.51s2.03-1.01,4.67,0.81s7.3,2.84,10.04,1.83
			c2.73-1.01,2.34-4.46,7.21-3.25c4.87,1.22,0.61,9.94-0.61,11.36s-0.81,9.33-0.81,9.33h16.44c-4.06-4.46-4.67-12.18-4.67-12.18
			l-0.41-4.06l-0.2-2.23l0.81-3.04l-1.42-1.83l41.19-5.68l3.45,16.84c0.2,5.28-3.45,12.58-3.45,12.58h64.73V207.5z M842.77,123.45
			l-9.61,14.35h-3.27v7.08h-6.54v-7.08H613.57v7.08h-6.9l0.18-7.27h-3.09l-10.99-13.8v-7.99h51.12
			c-13.99-11.08-8.35-23.25-8.35-23.25s-1.45-4-0.91-4.54c0.54-0.54,13.26-4.54,22.88-4.18c9.63,0.36,20.16,2.18,22.52,3.63
			s-0.36,6.18-0.36,6.18c5.09,13.08-9.08,22.2-9.08,22.2h41.32v-4.59h-1.36v-2.54c6.54-4,18.34-4.72,18.34-4.72v-8.9v-6.54
			c0,0,4-1.82,11.62-1.82s10.53,1.82,10.53,1.82l-0.36,6.54l3.09,0.18l7.27-14.53l6.9,0.73c-0.54,5.81-6.9,15.62-6.9,15.62v7.33
			c5.63-0.3,10.35,3.03,10.35,3.03v-1.82c10.9-2.72,18.71,0,18.71,0v10.17h52.66V123.45z" />
                                    <path d="M712.37,222.5c-2.45-0.02-1.09,4.11-1.09,4.11l5.45,2.18C716.73,228.79,714.82,222.52,712.37,222.5z" />
                                    <path d="M789.38,220.89c-1.63,0-1.45,3.36-1.45,3.36l5.72,2.72C793.65,226.97,791.01,220.89,789.38,220.89z" />
                                    <path d="M344.05,369.97c0,0,0.26-19.97-25-23.67c-14.55-1.06-25.39,11.37-27.38,23.94c2.25-0.66,5.42,0.93,4.63,8.46h10.05
			c0,0,0.85-10.32,11.3-10.32s11.84,9.26,11.84,9.26h10.98C340.48,377.64,338.89,370.89,344.05,369.97z" />
                                    <path d="M317.86,370.89c-8.73,0-8.6,7.8-8.6,7.8h17.59C326.85,378.7,326.59,370.89,317.86,370.89z" />
                                  </g>
                                  <rect x={0} y={0} className="st0" width={1441} height={957} />
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
                      <li className="active">
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
