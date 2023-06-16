import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import LoginBlock from "../Login/login";
import Cookie from "js-cookie";
import { useAuth } from "../../../contexts/auth";
import SocialFaceBookButtonModal from "../Login/SocialFaceBookButtonModal";
import SocialGoogleButtonModal from "../Login/SocialGoogleButtonModal";
import { useForm } from "react-hook-form";
import t from "../../../translation";
import Modal from "react-bootstrap/Modal";

const propTypes = {
  data: PropTypes.array,
};

function LoginModal({}) {
  const [menuRef, setMenuRef] = useState(React.useRef(null));
  const { openLoginModal, setOpenModal } = useAuth();
  const { counter, setCounter, phoneOtp, setPhoneOtp, getLoginOtp, loginWithOtp, loginModal, loginSocialModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("phone-login");
  const [loginStep, setLoginStep] = useState("phone-input");
  const [activeTab, setActiveTab] = useState("phone-login");

  useEffect(() => {}, [loginStep]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    changeLoginMethod(loginMethod);
  }, [loginMethod]);

  const changeLoginMethod = (name) => {
    let phone = document.getElementById("phone-login");
    let email = document.getElementById("email-login");

    if (name == "phone-login" && phone && email) {
      document.getElementById("phone-login").checked = true;
      document.getElementById("email-login").checked = false;
      setLoginMethod(name);
    } else if (name == "email-login" && phone && email) {
      document.getElementById("email-login").checked = true;
      document.getElementById("phone-login").checked = false;
      setLoginMethod(name);
    }
  };

  // const handleLogin = async (data) => {
  //   setLoading(true);
  //   await loginModal(data.email, data.password);
  //   setOpenModal(false);
  //   setLoading(false);
  // }

  const handleLogin = async (data) => {
    setLoading(true);
    // if (phoneOtp && !(data.email && data.email)) {
    //   await loginWithOtp({ phone: phoneOtp, otp: data.otp_code });
    // } else {
    //   await loginModal(data.email, data.password);
    // }
    await loginModal(data.email, data.password);
    // setOpenModal(false);
    setLoading(false);
  };

  const getOtp = async (data) => {
    let phonenumber = data.telephone ? data.telephone : phoneOtp;
    const result = await getLoginOtp(phonenumber);
    if (result == "Code Sent") {
      setLoginStep("otp-input");
    } else {
      alert("Gửi mã Otp thất bại");
    }
  };

  const setEmailState = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const setPasswordState = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <Modal size="sm" show={openLoginModal} onHide={() => setOpenModal(false)} centered>
      <div className={`pd-20 ${isLoading ? "loading" : ""}`}>
        <h2 className="text-center cl4"> Đăng Nhập </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <label className="full mb-20">
            <div className="input-title">
              <span className="require">*</span> Email / Số Điện Thoại
            </div>
            <input
              className="input style-2"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmailState(e)}
              ref={register({
                required: {
                  value: true,
                  message: "Vui lòng nhập email hoặc số điện thoại",
                },
              })}
            />
            {errors.email && <div className="error">{errors.email.message}</div>}
          </label>
          <label className="full mb-20">
            <div className="input-title">
              <span className="require">*</span> {t("password")}
              <Link href="/forgot-password">
                <a className="link-right cl1">{t("forgot_password")}?</a>
              </Link>
            </div>
            <input
              className="input style-2"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPasswordState(e)}
              ref={register({
                required: {
                  value: true,
                  message: "Vui lòng nhập password",
                },
              })}
            />
            {errors.password && <div className="error">{errors.password.message}</div>}
          </label>
          <p>
            <button className="btn full btn-4" type="submit">
              {t("log_in")}
            </button>
          </p>
        </form>
      </div>
    </Modal>
  );
}

LoginModal.propTypes = propTypes;

export default LoginModal;
