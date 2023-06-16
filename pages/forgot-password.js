import React, { useState, useEffect } from "react";
import Layout from "../components/Desktop/Layout";
import LayoutMobile from "../components/Mobile/LayoutMobile";
import t from "../translation";
import { useForm } from "react-hook-form";
import api from "../services/api";
import Link from "next/link";
import { useAuth } from "../contexts/auth";
import { isMobile, isTablet } from "react-device-detect";
import HeaderMobile from "../components/Mobile/HeaderMobile";
import LoginOtpModal from "../components/Desktop/Common/LoginOtpModal";

function Forgotpassword({}) {
  const { register, handleSubmit, errors, watch } = useForm();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { openLoginModal, setOpenModal, setOpenLoginOtpModal, phoneOtp, setPhoneOtp, getLoginOtp, getResetPasswordOtp } = useAuth();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile && !isTablet);
    setOpenModal(false);
  }, []);

  const onSubmit = async (data) => {
    setIsDisabled(true);
    if (parseInt(data.mailOrPhone)) {
      setPhoneOtp(data.mailOrPhone);
      const result = await getResetPasswordOtp(data.mailOrPhone);
      if (result == "Code Sent") {
        setOpenLoginOtpModal(true);
      } else {
        alert("Số điện thoại chưa được đăng ký.");
      }
      return;
    }
    await api
      .put("customers/password", {
        email: data.mailOrPhone,
        template: "email_reset",
        webiste_id: "1",
      })
      .then(function (response) {
        if (response.data) {
          setIsSuccess(true);
        }
      })
      .catch(function (error) {
        alert("Mail chưa được dùng để đăng ký.");
        window.location.reload;
      });
    setIsDisabled(false);
  };

  return mobile ? (
    <LayoutMobile>
      <HeaderMobile />
      <main className="sec-tb page-login">
        {!isSuccess ? (
          <div className="container">
            <h1 className="text-center h3 cl1">{t("forgot_password")}</h1>
            <p className="text-center cl4"> Nhập địa chỉ email của bạn</p>
            <form className={`box-shadow pd-20 ${isDisabled ? "loading" : ""}`} onSubmit={(e) => e.preventDefault()}>
              <label className="full mb-20">
                <div className="input-title">
                  <span className="require">*</span> Email / Số Điện Thoại
                </div>
                <input
                  className="input style-2"
                  type="text"
                  name="mailOrPhone"
                  ref={register({
                    required: {
                      value: true,
                      message: "Vui lòng nhập email hoặc số điện thoại",
                    },
                  })}
                />
                {errors.mailOrPhone && <div className="error">{errors.mailOrPhone.message}</div>}
              </label>
              <p>
                <button className="btn full btn-4" onClick={handleSubmit(onSubmit)}>
                  {t("send")}
                </button>
              </p>
            </form>
          </div>
        ) : (
          <div className="container">
            <h1 className="text-center h3">Kiểm tra email của bạn</h1>
            <p className="text-center cl4">Hoasen đã gửi email đến email của bạn.</p>
            <p className="text-center">
              <Link href="/login">
                <a className="btn btn-4">Đăng nhập</a>
              </Link>
              &nbsp;{" "}
              <Link href="/">
                <a className="btn">Về trang chủ</a>
              </Link>
            </p>
          </div>
        )}
      </main>
      <LoginOtpModal />
    </LayoutMobile>
  ) : (
    <Layout>
      <main className="sec-tb page-login">
        {!isSuccess ? (
          <div className="container">
            <h1 className="text-center h3">{t("forgot_password")}</h1>
            <p className="text-center cl4"> Nhập địa chỉ email/Số điện thoại của bạn</p>
            <form className={`box-shadow pd-20 ${isDisabled ? "loading" : ""}`} onSubmit={(e) => e.preventDefault()}>
              <label className="full mb-20">
                <div className="input-title">
                  <span className="require">*</span> Email / Số Điện Thoại
                </div>
                <input
                  className="input style-2"
                  type="text"
                  name="mailOrPhone"
                  ref={register({
                    required: {
                      value: true,
                      message: "Vui lòng nhập email hoặc số điện thoại",
                    },
                  })}
                />
                {errors.mailOrPhone && <div className="error">{errors.mailOrPhone.message}</div>}
              </label>
              <p>
                <button className="btn full btn-4" onClick={handleSubmit(onSubmit)}>
                  {t("send")}
                </button>
              </p>
            </form>
          </div>
        ) : (
          <div className="container">
            <h1 className="text-center h3">Kiểm tra email của bạn</h1>
            <p className="text-center cl4">Hoasen đã gửi email đến email của bạn.</p>
            <p className="text-center">
              <Link href="/login">
                <a className="btn btn-4">Đăng nhập</a>
              </Link>
              &nbsp;{" "}
              <Link href="/">
                <a className="btn">Về trang chủ</a>
              </Link>
            </p>
          </div>
        )}

        <LoginOtpModal />
      </main>
    </Layout>
  );
}

export default Forgotpassword;
