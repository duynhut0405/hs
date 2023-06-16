import Link from 'next/link'
import { isMobile, isTablet } from 'react-device-detect'
import { useState, useEffect } from 'react';
import LayoutMobileOnlyHead from '../components/Mobile/LayoutMobileOnlyHead';
import HeaderMobile from '../components/Mobile/HeaderMobile'
import { useRouter } from 'next/router'

function Distribution() {
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMobile(isMobile && !isTablet);
  }, [])

  return (
    <>
    <LayoutMobileOnlyHead/>
    <div className="page-top-heading" onClick={() => router.back()}>
      <a className="back icon-arrow-1 ix" href="#"></a>
      <h1>
        Liên hệ
      </h1>
    </div>
    <div className="container">
      <div className="row row-1">
        <div className="widget widget-about">
          <h6>CÔNG TY CỔ PHẦN TẬP ĐOÀN HOA SEN</h6>
          <div className="b cl3">Địa chỉ trụ sở chính	</div>
          <div>Số 9, Đại lộ Thống Nhất, Khu công nghiệp Sóng Thần II, Phường Dĩ An, Thành phố Dĩ An, Tỉnh Bình Dương, Việt Nam.</div>
          <div className="b cl3">Văn phòng đại diện:</div>
          <div>183 Nguyễn Văn Trỗi, Phường 10, Quận Phú Nhuận, TP. Hồ Chí Minh.</div>
          <div>Email: <strong>banhangtructuyen@hoasengroup.vn</strong></div>
          <div>Hotline: <strong>1800 1515 </strong>  </div>
        </div>
        <p className="logo-resgiter" style={{marginTop: "30px"}}>
          <img src="/images/paymen.png" alt="" />
        </p>
        <div id="copyright" >

          <div>
            Hoa Sen Group © 2021. All Rights Reserved
          </div>
          <div>
            Giấy chứng nhận kinh doanh số 3700381324,
            <br/>
            Ngày cấp: 08/08/2011
            <br/>
            Nơi cấp: tỉnh Bình Dương
          </div>



        </div>
      </div>
    </div>
    </>
  )
}

export default Distribution;
