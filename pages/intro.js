import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from "next/link";
import Cookies from 'js-cookie'
import LayoutIntro from '../components/LayoutIntro'

function Intro() {
  const videoRef = useRef();
  useEffect(() => {
    setTimeout(()=>{
        videoRef.current.play()
    },5000)
    Cookies.set('introViewed', true, { expires: 1 });
    const interval = setInterval(() => {
      const e = document.getElementById('subiz');
      console.log(e);
      if (e) {
        e.remove();
        clearInterval(interval)
      }
    }, 200);
    return () => clearInterval(interval);
  }, [])
  return (
    <LayoutIntro>
      <header id="header-intro">
        <div className="container">
          
          <a href="/" id="logo" className="c"> <img style={{ height: "55px" }} src="/images/logo.svg" alt=""/></a>
          
        </div>
      </header>
      <div className="content-intro">
        <video ref={videoRef} width="320" height="240" type="video/mp4" loop autoPlay={true}>
          <source src="/video/WEB.45S.mp4" type="video/mp4" />
          {/* <source src="/video/WEB.45S.ogg" type="video/ogg" /> */}
        Your browser does not support the video tag.
        </video>

        <div className="link-intro">
          <div className="row">
            <div className="col-md-6">
              <a href="https://hoasengroup.vn" className="item box-shadow">
                <i className="img1 icon-t181"></i>
                <div className="tx">
                  <div className="t1">THÔNG TIN HOA SEN GROUP</div>
                  <div className="t2">hoasengroup.vn</div>
                </div>
                <i className="img2 icon-t191"></i>
              </a>
            </div>
            <div className="col-md-6">
              <a href="/" className="item box-shadow">
                <i className="img1 icon-t171"></i>
                <div className="tx">
                  <div className="t1">MUA HÀNG TRỰC TUYẾN</div>
                  <div className="t2">hoasenhome.vn</div>
                </div>
                <i className="img2 icon-t191"></i>
              </a>
            </div>            
          </div>
        </div>
      </div>

    </LayoutIntro>
  )
}

export default Intro;