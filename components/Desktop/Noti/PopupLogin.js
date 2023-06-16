import React from "react";
const PopupLogin = ({ handleHide }) => {
  return (
    <div className="modal-home" onClick={() => handleHide(true)}>
      <div className="modal-home-login">
        <div className="btnlike" style={{ position: "absolute", top: 12, right: 12, color: "white" }}>
          <i className="icon-close fs15"></i>
        </div>
        <div style={{ height: "130px" }}>
          <img style={{ height: "100%", margin: "auto", display: "block", maxWidth: "100%" }} src="/images/gifts.png"></img>
        </div>
        <div>
          <h2 className="modal-home-login-text">ĐĂNG NHẬP NGAY</h2>
          <p className="modal-home-login-text">để nhận nhiều ưu đãi hấp dẫn!</p>
        </div>
        <div>
          <button className="btn modal-home-login-button" onClick={() => (window.location.href = "https://hoasenhome.vn/blog/post/huong-dan-dang-ki-dang-nhap-va-lay-lai-mat-khau-tren-app-hoa-sen-home")}>
            Xem hướng dẫn
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopupLogin;
