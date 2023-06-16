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

function SignUpModal({ }) {
  const [menuRef, setMenuRef] = useState(React.useRef(null));
  const { openSignUpModal, setOpenModalSignup } = useAuth();
  const { counter, setCounter, phoneOtp, getLoginOtp, activeOtpSingup, resendOtp } = useAuth();
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

  const onActiveOtp = async (data) => {
    await activeOtpSingup({ phone: phoneOtp, otp: data.otp_code });
  }

  const handleResendOtp = async () => {
    await resendOtp(phoneOtp);
  }

  return (
    <Modal
      size="sm"
      show={openSignUpModal}
      onHide={() => setOpenModalSignup(false)}
      centered>

      <div className={`pd-20 ${isLoading ? 'loading' : ''}`}>
        <p className="text-center cl4">Xác nhận</p>
        <div className="wtabs-login ">

          {activeTab == 'phone-login' && (
            <>
              <form onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="full text-center" style={{ fontWeight: 400 }} > Mã OTP của bạn sẽ được gửi bằng tin nhắn đến </label>
                  <label className="full text-center mb-20" >  {phoneOtp} </label>
                  <label className="full mb-20">
                    <div className="input-title"><span className="require">*</span> Mã OTP </div>
                    <input  className="input style-2 text-center" name="otp_code"
                      ref={register({
                        required: {
                          value: true,
                          message: "Vui lòng nhập OTP",
                        },
                      })} />
                    {errors.otp_code && <div className="error">{errors.otp_code.message}</div>}
                  </label>

                  {counter > 0 ?
                    <label className="full mb-20 mt-20" style={{ textAlign: 'center', fontWeight: 500 }} >
                      Vui lòng chờ
                    <span className="cl1" style={{ fontWeight: 700 }}> &nbsp;{counter}&nbsp; </span>
                    giây để gửi lại
                    </label>

                    :
                    <div className="text-center mb-20"> Bạn không nhận được mã ?  <a className="cl1" onClick={handleResendOtp}>{t('resend_otp')}</a></div>
                  }
                  <p><button className="btn full btn-4" onClick={handleSubmit(onActiveOtp)} >{t('confirm')}</button></p>
                </div>
              </form>
            </>
          )}

        </div>
      </div>
    </Modal >
  );
}

SignUpModal.propTypes = propTypes;

export default SignUpModal;
