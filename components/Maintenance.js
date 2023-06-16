import React, { useState, useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

const Maintenance = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(isMobile && !isTablet);
  }, []);
  return (
    <div style={{ display: 'flex', height: !mobile ? '100vh' : '100%', alignItems: 'center', justifyContent: 'center', flexDirection: !mobile ? 'row' : 'column', padding: '20px' }}>
      <div style={{ textAlign: 'center', flex: 1, border: '5px solid #8c110a', padding: '15px 10px' }}>
        <h1 style={{ color: '#8c110a', fontSize: '35px' }}>THÔNG BÁO</h1>
        <h1 style={{ color: '#8c110a', fontSize: '35px' }}>NÂNG CẤP WEBSITE VÀ APP HỆ THỐNG HOA SEN HOME</h1>
        <p style={{ fontSize: '20px' }}>Hoa Sen Home trân trọng thông báo Website và App sẽ tạm dừng hoạt động nhằm nâng cấp chức năng mới cho hệ thống</p>
        <p style={{ fontSize: '20px', color: '#8c110a', fontWeight: 'bold' }}>Từ 9h30 - 12h00 ngày 25/03/2022</p>
        <p style={{ fontSize: '20px', fontStyle: 'italic' }}>Mong Quý Khách hàng thông cảm vì sự bất tiện này</p>
      </div>
      <div style={{ flex: 1 }}>
        <img src='/images/maintenance.jpg' height={'400px'} width={'100%'} />
      </div>
    </div>
  );
};

export default Maintenance;
