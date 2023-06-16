import Layout from '../components/Desktop/Layout'

import Link from 'next/link'
import { isMobile, isTablet } from 'react-device-detect'
import { useState, useEffect } from 'react';
import LayoutMobile from '../components/Mobile/LayoutMobile';
import HeaderMobile from '../components/Mobile/HeaderMobile'
function Distribution() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(isMobile && !isTablet);
  }, [])

  return (
    !mobile ?
    <Layout>
      <main className="sec-tb">
        <div className="container">

          <div className="row list-item">
            <div className="col-6">
              <select id="addressVung" className="select dist-select-vung" data-child1="addressTinh" data-child2="addressChinhanh">
                <option value="1">Miền Bắc</option>
                <option value="2">Miền Trung</option>
                <option value="3">Miền Nam</option>
              </select>            
            </div>
            <div className="col-6">
              <select id="addressTinh" className="select dist-select-tinh" data-parent="address_Tinh" data-child1="address_PX">
              </select>             
            </div>
          </div>
          <div className="row">
            <div  className="col-lg-5  ">
                <div  className="content-list-store"    >
                  <div id="addressBranch" className="list-item   map-list-store"    >


                  </div>

                </div>
            </div>      
            <div className="col-lg-7 col-map">
              <div id="map" style={{height: "600px"}} ></div>
            </div>
          </div>

        </div>
    </main>
    </Layout>
    :
    <LayoutMobile>
    <HeaderMobile />
    <main className="sec-tb">
      <div className="container">

        <div className="row list-item">
          <div className="col-6">
            <select id="addressVung" className="select dist-select-vung" data-child1="addressTinh" data-child2="addressChinhanh">
              <option value="1">Miền Bắc</option>
              <option value="2">Miền Trung</option>
              <option value="3">Miền Nam</option>
            </select>            
          </div>
          <div className="col-6">
            <select id="addressTinh" className="select dist-select-tinh" data-parent="address_Tinh" data-child1="address_PX">
            </select>             
          </div>
        </div>
        <div className="row">
          <div  className="col-lg-5  ">
              <div  className="content-list-store"    >
                <div id="addressBranch" className="list-item   map-list-store"    >


                </div>

              </div>
          </div>      
          <div className="col-lg-7 col-map">
            <div id="map" style={{height: "600px"}} ></div>
          </div>
        </div>

      </div>
  </main>
    </LayoutMobile>
  )
}

export default Distribution;
