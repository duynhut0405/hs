import React, {useState, useEffect} from 'react'
import Layout from '../../../components/Desktop/Layout'
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb'
import t from '../../../translation'
import Color from '../../../components/Desktop/Tools/Color'
import Link from 'next/link'
import CategoryTonProducts from '../../../components/Desktop/Products/CategoryTonProducts'


function Paint({}) {
  const [activeTab, setActiveTab] = useState('1');
  const [color, setColor] = useState({Code: '', HEXCODE:'#ededed'});
  const [openColor, setOpenColor] = useState(false);
  const currentPirture = '/Ngoai-that-Hoa-sen/Ngoai-that-01/Ngoai-that-01.jpg';
  const suggest1 = '/tool-bedroom/phong-ngu-3A.jpg';
  const suggest2 = '/tool-bedroom/phong-ngu-3B.jpg';
  const [isChoised , setChoised ] = useState(false);

  useEffect(() => {
    if (color.HEXCODE != '#ededed') {
      setChoised(true);
    }
  }, [color])

  return (
    <Layout>
      <BreadCrumb data={[{name: 'Ngoại thất', link: '/', isActive: true}]}/>
      <section className=" sec-tb " >
        <div className="container">
          <div id="copied" className={`copied-custom ${isChoised ? 'active' : ''}`} style={{display: `${isChoised ? 'block': 'none'}`}}>* Bạn đã chọn: thương hiệu <strong>Toa</strong>, mã màu: <strong>{color.Code}</strong>, mã Hex: <strong>{color.HEXCODE}</strong> <span className="close close-custom"><i className="icon-close"></i></span></div>
          <div className="row end">
            <div className="col-lg-10 col-md-9">
              <div className="box-shadow mb-20">
                <h3 className="box-title-3">Ngoại thất</h3>
                <div className="pd-20 border-bottom">
                      {activeTab == '1' && (
                        <div className="colorful">
                          <img id="background-image" src={currentPirture} alt="" />
                          <div id="container" onClick={() => setOpenColor(true)}>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 956">
                              <defs><clipPath id="clip-path"><rect className="cls-1" x="0.01" y="0.38" width="1440" height="956"/></clipPath></defs>
                              <title>Phong-ngu-03</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g className="cls-2" style={{fill:color.HEXCODE}}><path d="M233.44,547.25l26.5.5s-.25-1.25-3.25-1.62c-3.37-1.12-9.87-5-14.5-7.25s-13.37-8.25-16.5-13c-2-.25-4.37,2-6.5,3.13s-6.12,2-7.62,1.25l-1.87,2.38.38,1.88a2.49,2.49,0,0,1,2.5,1.25C214.56,536.25,228.06,537.13,233.44,547.25Z"/><path d="M71.69,655.31c-1.87-.62-1-3.5-.56-4.25,5.38-2.5,6.19-.62,7.38.94a16,16,0,0,0,3.44,3.38c-3.19-11.69,1.29-19.52,1.29-19.52l-83.14.29L0,697.69l7.56.38.88-20.81-1.62-1.5L7,666.31c.31-1.19,3.06-2.5,18.69-4.25s37.56-.31,47.38.56S82.63,666,82.63,666s-.5,8.69-.5,9-1.81.5-1.81.5l-.19,9.88a97.35,97.35,0,0,1,13.44-1.19c-9.44-12.25-10.12-22.25-10.69-25.25C80.38,655.31,73.56,655.94,71.69,655.31Z"/><path d="M89.88,649.06l-.69-13-3.81-.12s-.44,12.38,1,12.31C86.56,647.19,88.44,647.5,89.88,649.06Z"/><path d="M109.63,635.69a18.38,18.38,0,0,1-1.56-3.69l-1.62.38a103.87,103.87,0,0,0,2.5,11.31c.94,2.75,3,16,3,16l1.94.44s-2.75-9.06-3.5-12.56S109.63,637.31,109.63,635.69Z"/><path d="M122.88,621.25,119,622.56a21,21,0,0,1,.44,3.88c.19,2.75,1.25,7.88,1.25,7.88s1.06-1.62,2.25-3.31A47.74,47.74,0,0,1,122.88,621.25Z"/><path d="M167.44,672.63s-4.25.88-5.37,3-4.62,8.63-4.62,8.63,3.88-.62,4.13,1-.25,15.13-.25,15.13l8.5.13S167.31,681.38,167.44,672.63Z"/><path d="M166.19,647.88s-5.62,4.5-7.37,5.63l-2.5,5s1.5-.37,1.38.88a19.9,19.9,0,0,1-1.5,4.13l.25,4.25s6.88-10,10.13-13.5Z"/><path d="M200.19,535.75c-2.62.38-15.87,3.25-30.87,12.75l37.25-.75-.5-5.5S202.06,536,200.19,535.75Z"/><path d="M211.56,536.5l-1.87.88c-1.12,8.88,1,10.25,1,10.25l7-.12s-4.25-6-4.75-8.25S211.56,536.5,211.56,536.5Z"/><polygon points="211.56 517.13 214.31 516.5 211.81 513.13 211.56 517.13"/><path d="M209.69,508.88s-2.12-6-3-6.75c-1,1.63-.5,4.63,2.38,9.63Z"/><path d="M202.56,474.13c-2.5-.87-7.37-.75-7.37-.75a24.22,24.22,0,0,0,6.5,3.5c3.88,1.38,9.5,6.88,10.75,10.25,0,0,.88-3.87-1.12-5.87S205.06,475,202.56,474.13Z"/><path d="M.06,0s.27,496.52,0,496.76l10-1.14s11.49-2.57,13.49-3.19,5.12-2.35,6.75-2.85c2.13-.62,7.75-2,8.75-1.42s2.37,4.73,2.12,7.85-1.63,8.36-1.88,11.36-.5,8.74-2.25,13.37c-.62,2.13-1,7.87-1.13,9.75s-3.88,10.87-3.88,10.87,1.44,12.62.69,20.25c.88,1.25,2.31,8.5,2.31,8.5V563s1.5-1.62,5.88-1.87,44.75-1.12,51.25-.75,16.88.88,17.88,2.38V572a.91.91,0,0,1-.75,1.17l.54,26.33s5.94-.83,16.6,1.25c0,0,2.84-6.58,5.68-9.75a55.68,55.68,0,0,1,6.63-7.67c.5-.58,2.36-3.08,2.36-3.08a14.56,14.56,0,0,0-.65,3.17c.08.75.76,4.25-.24,6.17s-1.83,9.75-1.83,9.75a78.46,78.46,0,0,0,2.58-7.5,11.08,11.08,0,0,1,2.92-5.33A10.64,10.64,0,0,0,146,583s1.25.25-1,4.58c-.92,1.92-2.67,9.42-2.83,10.08s-1.42,4.75-.58,5.17c.83-1,3.58-4.92,3.58-4.92s.83-1.42,1.08-1.08.42,3.75-3.17,12.42a27,27,0,0,1-8,19.58c.08,1.5,1.58,7.08,1.17,10.42-1.08,2.75-2.5,8.75-2.17,12.25a9.2,9.2,0,0,1,1.75-3.58l.58,2.17s8.75-25.42,12.25-22.92c0,0,2.83-5.67,2.92-6.5a20.33,20.33,0,0,1,.58-4.67c.5-1.25,1.92-3.58,2.5-3.08s-2,6.92-1.83,7.58,1.33,10.5,1.33,10.5,2.25-.42,0,2.83c-.08,2.58-1.75,17-1.75,17s2.17-8.42,13.08-16.67c0,0-.42-34.67-.58-42.83s-2.17-41.33.17-41.83c0,0-2.83-3.17,6.5-9.75s18.08-6.42,26-5.08a21.06,21.06,0,0,1,4.42,1c1.17.58,3.08,3.5,4.5,4.33,0,0,.33-7,.42-9.83-1.25-1.83-3.58-6.58-5-7.25-1.75-.67-9.58-1.5-9.58-1.5s-12.83,5.5-15.75,6.67-4.83,2-6.67,1.92l-.83,2.42-.08-2.58s-3-1.58-3.25-2.92-.58-5.5,7.08-9.25,10.08-2.58,12.17-2.17,9.58,4.08,9.58,4.08,11.42-1.83,12.08,1.5c0,1-2.83,1.08-2.67,1.5s2.17,4.17,3.58,5.08l1.17-13.17A29.23,29.23,0,0,1,204,502.83a40.78,40.78,0,0,1-8.5-7.83,33.55,33.55,0,0,0-11.67-9.17,58.33,58.33,0,0,1-14.25-9,32,32,0,0,0-8.25,3.5c-3.42,1.75-9,4.25-11,7.25a2.63,2.63,0,0,0-.58-2.42c-.33-1.67.25-2.92,3.58-5.33s10.33-4.92,12.58-5.08c0,0-.17-1.75-4.25-2.75-.25-1.08,4.42.5,5.33.33s3.92-1.75,12.17-1.5c1.17-.75,3.83-3.92,17,.58,2.83.17,8.17.17,9,2.58,1.33,1.08,7.92,6.75,7.92,6.75s1.5-.92,2-14.25-.33-13.92-.33-13.92a53.22,53.22,0,0,1-11.08-8.25,62.94,62.94,0,0,1-8.5,1c-2.83,0-5.75-1-6.08,2.58-.67-2,.25-2.83-1.58-3.58s-5-1.67-6.58-6.42c-.67-2.42,5.33-3.92,8.92-3.5s8.92,1.25,8.92,1.25-3.92-12.75,9.58-17.08c0,0,1.25.25-6.83-8.58s-14.83-23.33-15.58-25.67-1.17-4.08.17-4.83a32.71,32.71,0,0,1,6.08.75c1.75.58,13.67,5.08,21.08,16.58s6.83,18.83,5.83,21.42a16.83,16.83,0,0,1,10.17,5.25c2.75-1.67,9.75-6.42,14.08-7.33,4.25-2,7.92-4.17,11.33-4.83,3.5-1.08,8.33-3.08,11.75-2.42,2.67-.33,6.67-.67,6.83,1.42a10.07,10.07,0,0,0-5.33.67,88,88,0,0,0-8.67,1.75c-3.08.92-13.83,4.5-15.5,5.42s-12.83,7.92-12.83,7.92,4,7.42-.42,13.83-12.33,11.83-12.33,11.83l-.75,18.42s.58.25,1.5-.5,8-5.58,12.42-4.42a28.82,28.82,0,0,1,11.92-1.5,41.66,41.66,0,0,1,17.67,1.67c6.5,2.17,9.58,1.67,9.83,7.42A12.64,12.64,0,0,1,272.4,476s-1.67-3.5-6.83-4.75a123.1,123.1,0,0,0-29.5-4.58c-6.42-.25-13.58-.5-19.08,6.08-.33,3.92-1.75,11.17-1.75,13s-.75,6,0,5.83,7-3.92,6.5-4.92-1.83-3.42-.83-3.83,5.92-1.33,14.75,0c8.75.92,17.5,2.17,21.92,4.42,5.33,1.25,16.17,4.83,18.83,7.33-.08.42-.75.42-.75.42a5.14,5.14,0,0,1,.92,2.67s-.42-2.67-4.75-4.08c-3.42-.25-16.58-1-21.33-1.42s-21.58-2.92-26.17-4.58c-1.17.08-8.17,5.17-9.17,7.42a15.78,15.78,0,0,0-.75,5.08,20.74,20.74,0,0,0,4.08.5c.83-.17,7.92-.48,10.75,4.68a19.41,19.41,0,0,1,1.91,11.07s12.92-4.17,19.08,2.42,10.92,11.25,12.33,14.83,3.42,9.25-1.5,12.67c-.67.42-.25,1.42-.25,1.42s12.67-.58,13.5,1.83c-.08,2.33-3,64.67-3,64.67s3.67-5.25,4.83-6.42,6.25-5.58,10.83-7.42c4.67-2.92,23.75-15.83,25.83-17.25s13.5-8.92,25.33-12.83c11.58-4.83,28.17-12.08,30.5-13.08s11.75-4.5,11.75-4.5-.08-105.17.17-113.17-.75-46.75-1.25-57-1.25-23.75,1.25-27c0,0,.12-2.77,5.49-3.45,5.51-.13,22.17.27,26.07-.13s19.35-1.75,25.26,3.09c1.88-3.09,7.12-4.43,13.71-4.43s12,.67,16.66.67,14.92-1.21,18.55,2.82c1.75-3.23,7.39-3.76,14.24-3.09,7.53,0,21,0,24.32.27s9.81,2,11.83,5.24c1.61-3.76,7.53-5.11,12.5-5.11s29,.4,30.51.67,6.58.81,7.93,3.23a6,6,0,0,1,5.11-3.9c4-.4,21.77.4,24.73.4s17.87-.4,22,4c0,0,1.48-3.23,8.87-3.49s29-.67,32.66,0a71.85,71.85,0,0,1,8.33,2.28s.54-2.55,6.32-3,31-.13,34-.13,9.68.94,11.29,3.49c0,0,1.21-3,6.32-3.36s22.71-1.07,26.21-.94,15.19.94,18.81,4c0,0,1.21-2.69,5.91-3.09s33.33-.54,36-.4,6.72,1.61,8.06,3a7.21,7.21,0,0,1,5.91-3.09c4.17-.13,28.09-.4,35.08.54s10.62,3.76,10.62,3.76,2.69-4.7,12.9-4.7,23.65,0,27.82.27,9.94,2.82,10.89,4.3c0,0,.94-2.69,8.74-3.63s31.31.4,35.75.94,7.93.81,8.33,1.61a4.13,4.13,0,0,1,3.36-1.88c2.55-.27,21-.81,26.34-1.21s19.49,1.08,22.31,3.09,2.82,10.21,2.55,25.94.13,48.92.4,66.66.67,59.53.54,70.69,0,43.68,0,43.68,10.21-.13,16,.54a76.49,76.49,0,0,1,11.56,2.42l.24-102.07-1.1-.6-.1-7.58,41.6-.08s-12.53-3.76-12.53-19.08,9.86-19.49,15.37-21.23,9.64-1.48,10.31-2.55.43-6,.43-6l11.47.13v3s1,2.51,3.31,2.91,24.56,3.23,24.56,22.18S1161,455,1161,455h66l9-69.41,59-.51,2.15,1.56-7.39,64.14s-.87,2.51-2,3.18l152.2-.1V0ZM1366.93,298,1194,299.86l3.34-233.42,174.79-2.23Z"/></g></g></g>
                            </svg> */}
                            
                            
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
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 956">
                              <defs><clipPath id="clip-path"><rect className="cls-1" x="0.01" y="0.38" width="1440" height="956"/></clipPath></defs>
                              <title>Phong-ngu-03</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g className="cls-2" style={{fill:color.HEXCODE}}><path d="M233.44,547.25l26.5.5s-.25-1.25-3.25-1.62c-3.37-1.12-9.87-5-14.5-7.25s-13.37-8.25-16.5-13c-2-.25-4.37,2-6.5,3.13s-6.12,2-7.62,1.25l-1.87,2.38.38,1.88a2.49,2.49,0,0,1,2.5,1.25C214.56,536.25,228.06,537.13,233.44,547.25Z"/><path d="M71.69,655.31c-1.87-.62-1-3.5-.56-4.25,5.38-2.5,6.19-.62,7.38.94a16,16,0,0,0,3.44,3.38c-3.19-11.69,1.29-19.52,1.29-19.52l-83.14.29L0,697.69l7.56.38.88-20.81-1.62-1.5L7,666.31c.31-1.19,3.06-2.5,18.69-4.25s37.56-.31,47.38.56S82.63,666,82.63,666s-.5,8.69-.5,9-1.81.5-1.81.5l-.19,9.88a97.35,97.35,0,0,1,13.44-1.19c-9.44-12.25-10.12-22.25-10.69-25.25C80.38,655.31,73.56,655.94,71.69,655.31Z"/><path d="M89.88,649.06l-.69-13-3.81-.12s-.44,12.38,1,12.31C86.56,647.19,88.44,647.5,89.88,649.06Z"/><path d="M109.63,635.69a18.38,18.38,0,0,1-1.56-3.69l-1.62.38a103.87,103.87,0,0,0,2.5,11.31c.94,2.75,3,16,3,16l1.94.44s-2.75-9.06-3.5-12.56S109.63,637.31,109.63,635.69Z"/><path d="M122.88,621.25,119,622.56a21,21,0,0,1,.44,3.88c.19,2.75,1.25,7.88,1.25,7.88s1.06-1.62,2.25-3.31A47.74,47.74,0,0,1,122.88,621.25Z"/><path d="M167.44,672.63s-4.25.88-5.37,3-4.62,8.63-4.62,8.63,3.88-.62,4.13,1-.25,15.13-.25,15.13l8.5.13S167.31,681.38,167.44,672.63Z"/><path d="M166.19,647.88s-5.62,4.5-7.37,5.63l-2.5,5s1.5-.37,1.38.88a19.9,19.9,0,0,1-1.5,4.13l.25,4.25s6.88-10,10.13-13.5Z"/><path d="M200.19,535.75c-2.62.38-15.87,3.25-30.87,12.75l37.25-.75-.5-5.5S202.06,536,200.19,535.75Z"/><path d="M211.56,536.5l-1.87.88c-1.12,8.88,1,10.25,1,10.25l7-.12s-4.25-6-4.75-8.25S211.56,536.5,211.56,536.5Z"/><polygon points="211.56 517.13 214.31 516.5 211.81 513.13 211.56 517.13"/><path d="M209.69,508.88s-2.12-6-3-6.75c-1,1.63-.5,4.63,2.38,9.63Z"/><path d="M202.56,474.13c-2.5-.87-7.37-.75-7.37-.75a24.22,24.22,0,0,0,6.5,3.5c3.88,1.38,9.5,6.88,10.75,10.25,0,0,.88-3.87-1.12-5.87S205.06,475,202.56,474.13Z"/><path d="M.06,0s.27,496.52,0,496.76l10-1.14s11.49-2.57,13.49-3.19,5.12-2.35,6.75-2.85c2.13-.62,7.75-2,8.75-1.42s2.37,4.73,2.12,7.85-1.63,8.36-1.88,11.36-.5,8.74-2.25,13.37c-.62,2.13-1,7.87-1.13,9.75s-3.88,10.87-3.88,10.87,1.44,12.62.69,20.25c.88,1.25,2.31,8.5,2.31,8.5V563s1.5-1.62,5.88-1.87,44.75-1.12,51.25-.75,16.88.88,17.88,2.38V572a.91.91,0,0,1-.75,1.17l.54,26.33s5.94-.83,16.6,1.25c0,0,2.84-6.58,5.68-9.75a55.68,55.68,0,0,1,6.63-7.67c.5-.58,2.36-3.08,2.36-3.08a14.56,14.56,0,0,0-.65,3.17c.08.75.76,4.25-.24,6.17s-1.83,9.75-1.83,9.75a78.46,78.46,0,0,0,2.58-7.5,11.08,11.08,0,0,1,2.92-5.33A10.64,10.64,0,0,0,146,583s1.25.25-1,4.58c-.92,1.92-2.67,9.42-2.83,10.08s-1.42,4.75-.58,5.17c.83-1,3.58-4.92,3.58-4.92s.83-1.42,1.08-1.08.42,3.75-3.17,12.42a27,27,0,0,1-8,19.58c.08,1.5,1.58,7.08,1.17,10.42-1.08,2.75-2.5,8.75-2.17,12.25a9.2,9.2,0,0,1,1.75-3.58l.58,2.17s8.75-25.42,12.25-22.92c0,0,2.83-5.67,2.92-6.5a20.33,20.33,0,0,1,.58-4.67c.5-1.25,1.92-3.58,2.5-3.08s-2,6.92-1.83,7.58,1.33,10.5,1.33,10.5,2.25-.42,0,2.83c-.08,2.58-1.75,17-1.75,17s2.17-8.42,13.08-16.67c0,0-.42-34.67-.58-42.83s-2.17-41.33.17-41.83c0,0-2.83-3.17,6.5-9.75s18.08-6.42,26-5.08a21.06,21.06,0,0,1,4.42,1c1.17.58,3.08,3.5,4.5,4.33,0,0,.33-7,.42-9.83-1.25-1.83-3.58-6.58-5-7.25-1.75-.67-9.58-1.5-9.58-1.5s-12.83,5.5-15.75,6.67-4.83,2-6.67,1.92l-.83,2.42-.08-2.58s-3-1.58-3.25-2.92-.58-5.5,7.08-9.25,10.08-2.58,12.17-2.17,9.58,4.08,9.58,4.08,11.42-1.83,12.08,1.5c0,1-2.83,1.08-2.67,1.5s2.17,4.17,3.58,5.08l1.17-13.17A29.23,29.23,0,0,1,204,502.83a40.78,40.78,0,0,1-8.5-7.83,33.55,33.55,0,0,0-11.67-9.17,58.33,58.33,0,0,1-14.25-9,32,32,0,0,0-8.25,3.5c-3.42,1.75-9,4.25-11,7.25a2.63,2.63,0,0,0-.58-2.42c-.33-1.67.25-2.92,3.58-5.33s10.33-4.92,12.58-5.08c0,0-.17-1.75-4.25-2.75-.25-1.08,4.42.5,5.33.33s3.92-1.75,12.17-1.5c1.17-.75,3.83-3.92,17,.58,2.83.17,8.17.17,9,2.58,1.33,1.08,7.92,6.75,7.92,6.75s1.5-.92,2-14.25-.33-13.92-.33-13.92a53.22,53.22,0,0,1-11.08-8.25,62.94,62.94,0,0,1-8.5,1c-2.83,0-5.75-1-6.08,2.58-.67-2,.25-2.83-1.58-3.58s-5-1.67-6.58-6.42c-.67-2.42,5.33-3.92,8.92-3.5s8.92,1.25,8.92,1.25-3.92-12.75,9.58-17.08c0,0,1.25.25-6.83-8.58s-14.83-23.33-15.58-25.67-1.17-4.08.17-4.83a32.71,32.71,0,0,1,6.08.75c1.75.58,13.67,5.08,21.08,16.58s6.83,18.83,5.83,21.42a16.83,16.83,0,0,1,10.17,5.25c2.75-1.67,9.75-6.42,14.08-7.33,4.25-2,7.92-4.17,11.33-4.83,3.5-1.08,8.33-3.08,11.75-2.42,2.67-.33,6.67-.67,6.83,1.42a10.07,10.07,0,0,0-5.33.67,88,88,0,0,0-8.67,1.75c-3.08.92-13.83,4.5-15.5,5.42s-12.83,7.92-12.83,7.92,4,7.42-.42,13.83-12.33,11.83-12.33,11.83l-.75,18.42s.58.25,1.5-.5,8-5.58,12.42-4.42a28.82,28.82,0,0,1,11.92-1.5,41.66,41.66,0,0,1,17.67,1.67c6.5,2.17,9.58,1.67,9.83,7.42A12.64,12.64,0,0,1,272.4,476s-1.67-3.5-6.83-4.75a123.1,123.1,0,0,0-29.5-4.58c-6.42-.25-13.58-.5-19.08,6.08-.33,3.92-1.75,11.17-1.75,13s-.75,6,0,5.83,7-3.92,6.5-4.92-1.83-3.42-.83-3.83,5.92-1.33,14.75,0c8.75.92,17.5,2.17,21.92,4.42,5.33,1.25,16.17,4.83,18.83,7.33-.08.42-.75.42-.75.42a5.14,5.14,0,0,1,.92,2.67s-.42-2.67-4.75-4.08c-3.42-.25-16.58-1-21.33-1.42s-21.58-2.92-26.17-4.58c-1.17.08-8.17,5.17-9.17,7.42a15.78,15.78,0,0,0-.75,5.08,20.74,20.74,0,0,0,4.08.5c.83-.17,7.92-.48,10.75,4.68a19.41,19.41,0,0,1,1.91,11.07s12.92-4.17,19.08,2.42,10.92,11.25,12.33,14.83,3.42,9.25-1.5,12.67c-.67.42-.25,1.42-.25,1.42s12.67-.58,13.5,1.83c-.08,2.33-3,64.67-3,64.67s3.67-5.25,4.83-6.42,6.25-5.58,10.83-7.42c4.67-2.92,23.75-15.83,25.83-17.25s13.5-8.92,25.33-12.83c11.58-4.83,28.17-12.08,30.5-13.08s11.75-4.5,11.75-4.5-.08-105.17.17-113.17-.75-46.75-1.25-57-1.25-23.75,1.25-27c0,0,.12-2.77,5.49-3.45,5.51-.13,22.17.27,26.07-.13s19.35-1.75,25.26,3.09c1.88-3.09,7.12-4.43,13.71-4.43s12,.67,16.66.67,14.92-1.21,18.55,2.82c1.75-3.23,7.39-3.76,14.24-3.09,7.53,0,21,0,24.32.27s9.81,2,11.83,5.24c1.61-3.76,7.53-5.11,12.5-5.11s29,.4,30.51.67,6.58.81,7.93,3.23a6,6,0,0,1,5.11-3.9c4-.4,21.77.4,24.73.4s17.87-.4,22,4c0,0,1.48-3.23,8.87-3.49s29-.67,32.66,0a71.85,71.85,0,0,1,8.33,2.28s.54-2.55,6.32-3,31-.13,34-.13,9.68.94,11.29,3.49c0,0,1.21-3,6.32-3.36s22.71-1.07,26.21-.94,15.19.94,18.81,4c0,0,1.21-2.69,5.91-3.09s33.33-.54,36-.4,6.72,1.61,8.06,3a7.21,7.21,0,0,1,5.91-3.09c4.17-.13,28.09-.4,35.08.54s10.62,3.76,10.62,3.76,2.69-4.7,12.9-4.7,23.65,0,27.82.27,9.94,2.82,10.89,4.3c0,0,.94-2.69,8.74-3.63s31.31.4,35.75.94,7.93.81,8.33,1.61a4.13,4.13,0,0,1,3.36-1.88c2.55-.27,21-.81,26.34-1.21s19.49,1.08,22.31,3.09,2.82,10.21,2.55,25.94.13,48.92.4,66.66.67,59.53.54,70.69,0,43.68,0,43.68,10.21-.13,16,.54a76.49,76.49,0,0,1,11.56,2.42l.24-102.07-1.1-.6-.1-7.58,41.6-.08s-12.53-3.76-12.53-19.08,9.86-19.49,15.37-21.23,9.64-1.48,10.31-2.55.43-6,.43-6l11.47.13v3s1,2.51,3.31,2.91,24.56,3.23,24.56,22.18S1161,455,1161,455h66l9-69.41,59-.51,2.15,1.56-7.39,64.14s-.87,2.51-2,3.18l152.2-.1V0ZM1366.93,298,1194,299.86l3.34-233.42,174.79-2.23Z"/></g></g></g>
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
                      <li className="active"><a href="#">Ngoại thất</a></li>
                      <li><a href="#">Phòng khách</a></li>
                      <li>
                        <Link href="/tools/bedroom/bedroom-1">
                          <a href="/tools/bedroom/bedroom-1">Phòng ngủ</a>
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
