import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import LoginBlock from '../Login/login'
import Cookie from 'js-cookie'
import { useAuth } from '../../../contexts/auth'
import SocialFaceBookButtonModal from '../Login/SocialFaceBookButtonModal'
import SocialGoogleButtonModal from '../Login/SocialGoogleButtonModal'
import { useForm } from 'react-hook-form'
import t from '../../../translation'
import Modal from 'react-bootstrap/Modal'

const propTypes = {
  data: PropTypes.array
};

function LoginModalCheckOut({ }) {
  const [menuRef, setMenuRef] = useState(React.useRef(null));
  const { openLoginModalCheckout, setOpenModalCheckout } = useAuth();
  const { counter, setCounter, phoneOtp, getLoginOtp, loginWithOtpCheckout, loginModal } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('phone-login');
  const [loginStep, setLoginStep] = useState("otp-input");
  const [activeTab, setActiveTab] = useState('phone-login');

  useEffect(() => {
  }, [loginStep])

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  // useEffect(() => {
  //   changeLoginMethod(loginMethod)
  // }, [loginMethod])

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
  }

  // const handleLogin = async (data) => {
  //   setLoading(true);
  //   await loginModal(data.email, data.password);
  //   setOpenModal(false);
  //   setLoading(false);
  // }

  const handleLogin = async (data) => {
    setLoading(true);
    if (phoneOtp && !(data.email && data.email)) {
      await loginWithOtpCheckout({ phone: phoneOtp, otp: data.otp_code });
    } else {
      await loginModal(data.email, data.password);
    }
    // setOpenModal(false);
    setLoading(false);
  }

  const getOtp = async (data) => {
    let phonenumber = data.telephone ? data.telephone : phoneOtp;
    const result = await getLoginOtp(phonenumber);
    if (result == "Code Sent") {
      setLoginStep('otp-input');
    } else {
      alert("Gửi mã Otp thất bại")
    }
  }

  const setEmailState = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const setPasswordState = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  return (
    <Modal
      size="sm"
      show={openLoginModalCheckout}
      onHide={() => setOpenModalCheckout(false)}
      centered>

      <div className={`pd-20 ${isLoading ? 'loading' : ''}`}>
        <p className="text-center cl4">{t('login_with')}</p>
        <div className="wtabs-login ">

          {activeTab == 'phone-login' && (
            <>
              <form onSubmit={handleSubmit(handleLogin)}>
                {loginStep == "otp-input" &&
                  <div>
                    <label className="full text-center" style={{ fontWeight: 400 }} > Số điện thoại này đã được sử dụng cho một tài khoản, hãy nhập mã OTP để đăng nhập</label>
                    <label className="full text-center mb-20" >  {phoneOtp} </label>
                    <label className="full mb-20">
                      <div className="input-title"><span className="require">*</span> Mã OTP </div>
                      <input  className="input style-2 text-center" name="otp_code"
                        ref={register({
                          required: {
                            value: true,
                            message: "Vui lòng nhập OTP"
                          }
                        })} />
                      {errors.otp_code && <div className="error">{errors.otp_code.message}</div>}
                    </label>
                    {counter > 0 ?
                      <label className="full mb-20 mt-20" style={{ textAlign: 'center', fontWeight: 500 }} >
                        Vui lòng chờ <span className="cl1" style={{ fontWeight: 700 }}> &nbsp;{counter}&nbsp; </span>giây để gửi lại
                      </label>
                      :
                      <div className="text-center mb-20"> Bạn không nhận được mã ?  <a className="cl1" onClick={getOtp}>{t('resend_otp')}</a></div>
                    }
                    <p><button className="btn full btn-4" type="submit">{t('log_in')}</button></p>
                  </div>
                }
              </form>
            </>
          )}

        </div>
      </div>
    </Modal >
  );
}

LoginModalCheckOut.propTypes = propTypes;

export default LoginModalCheckOut;
