import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../contexts/auth";
import { useForm } from "react-hook-form";
import t from "../../../translation";
import Modal from "react-bootstrap/Modal";
import api from "../../../services/api";
const propTypes = {
  data: PropTypes.array,
};

function LoginOtpModal({}) {
  const { openLoginOtpModal, setOpenLoginOtpModal } = useAuth();
  const { counter, setCounter, phoneOtp, getLoginOtp,getResetPasswordOtp, loginWithOtp } = useAuth();
  const [togglePasswordShow, setTogglePasswordShow] = useState(false)
  const [togglePasswordRepeatShow, setTogglePasswordRepeatShow] = useState(false)
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState({
    text: "",
    color: "",
  });
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleLoginOtp = async (data) => {
    setLoading(true);
    await loginWithOtp({ phone: phoneOtp, otp: data.otp });
    setLoading(false);
  };
  const getOtp = async () => {
    const result = await getResetPasswordOtp(phoneOtp);
    if (result == "Code Sent") {
      setLoginStep("otp-input");
    } else {
      alert("Gửi mã Otp thất bại");
    }
  };
  const setPasswordState = (e) => {
    e.preventDefault();
    const handleText = e.target.value.trim();
    setPassword(handleText);
  }
  useEffect(() => {
    const mediumRegex = new RegExp("^(?=.*[a-zA-Z0-9_])(?=.{6,})");
    const strongRegex = new RegExp("^(?=.*[a-zA-Z0-9_])(?=.{8,})");
    let newText = "";
    let newColor = "";
    if (strongRegex.test(password) && !password.includes(" ")) {
      newText = t("strong");
      newColor = "#0F9D58";
    } else if (mediumRegex.test(password)) {
      newText = t("medium");
      newColor = "#F4B400";
    } else {
      newText = t("weak");
      newColor = "#DB4437";
    }
    setValidatePassword({
      text: newText,
      color: newColor,
    });
  }, [password]);

  const onSubmit = async (data) => {
    if (validatePassword?.text != t("strong")) {
      alert("Mật khẩu của bạn bắt buộc phải chứa ít nhất 8 kí tự và không chứa khoảng trắng");
      return;
    }
    setLoading(true);
    try {
      const result = await api.post('service/customers/sms/resetPassword', {
          "phoneNumber": phoneOtp,
          "otpCode": data.otp,
          "newPassword": data.password
      })
      if (result.status == 200 && !result.data.error) {
        alert("Đổi mật khẩu thành công")
        window.location.pathname = '/login'
      }
    } catch (error) {
      alert("Vui lòng kiểm tra lại OTP");
    }
    setLoading(false);
  };
  return (
    <Modal size="sm" show={openLoginOtpModal} onHide={() => setOpenLoginOtpModal(false)} centered>
      <div className={`pd-20 ${isLoading ? "loading" : ""}`}>
        <h2 className="text-center cl4"> Đặt lại mật khẩu </h2>
        <form onSubmit={handleSubmit(handleLoginOtp)}>
          <label className="full mb-20">
            <div className="input-title">
              <span className="require">*</span> Mã Otp
            </div>
            <input
              className="input style-2"
              name="otp"
              type="text"
              ref={register({
                required: {
                  value: true,
                  message: "Vui lòng nhập mã Otp",
                },
              })}
            />
            {counter > 0 ? (
              <label className="full mb-20 mt-20" style={{ textAlign: "center", fontWeight: 500 }}>
                Vui lòng chờ{" "}
                <span className="cl1" style={{ fontWeight: 700 }}>
                  {" "}
                  &nbsp;{counter}&nbsp;{" "}
                </span>
                giây để gửi lại
              </label>
            ) : (
              <div className="text-center mb-20 mt-20">
                {" "}
                Bạn không nhận được mã ?{" "}
                <a className="cl1" onClick={getOtp}>
                  {t("resend_otp")}
                </a>
              </div>
            )}
            {errors.otp && <div className="error">{errors.otp.message}</div>}
          </label>

          <label className="full mb-20">
            <div className="input-title">
              <span className="require">*</span> {t("password")}
            </div>
            <div>
              <input
                className="input style-2"
                type={ togglePasswordShow ? "text" : "password" }
                name="password"
                defaultValue={password}
                onChange={(e) => setPasswordState(e)}
                ref={register({
                  required: {
                    value: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                  pattern: {
                    value: /(?=.{8,})(?=\S+$)(^[^\s].+[^\s])/,
                    message: "Mật khẩu không được chứa khoảng trắng và có ít nhất 8 ký tự"
                  }
                })}
              />
              <i style={{position: "absolute", right: "10%", marginTop: "12px"}} className={togglePasswordShow ? "icon-view" : "icon-view"} onClick={ () => setTogglePasswordShow(togglePasswordShow ? false : true)}></i>
            </div>
            {errors.password && <div className="error">{errors.password.message}</div>}
          </label>
          <div className="note-password mb-20 cl4 fs-12">
            {t("password_strength")}: <span style={{ color: validatePassword.color }}>{validatePassword.text}</span>
          </div>
          <label className="full mb-20">
            <div className="input-title">
              <span className="require">*</span> {t("re_password")}
            </div>
            <div>
              <input
                className="input style-2"
                type={ togglePasswordRepeatShow ? "text" : "password" }
                name="password_repeat"
                ref={register({
                  validate: (value) => value === password || t("password_not_match"),
                })}
              />
              <i style={{position: "absolute", right: "10%", marginTop: "12px"}} className={togglePasswordRepeatShow ? "icon-view" : "icon-view"} onClick={ () => setTogglePasswordRepeatShow(togglePasswordRepeatShow ? false : true)}></i>
            </div>
            {errors.password_repeat && <div className="error">Mật khẩu không khớp</div>}
          </label>
          <p>
            <button className="btn full btn-4" type="submit" onClick={handleSubmit(onSubmit)}>
              {t("confirm")}
            </button>
          </p>
        </form>
      </div>
    </Modal>
  );
}

LoginOtpModal.propTypes = propTypes;

export default LoginOtpModal;
