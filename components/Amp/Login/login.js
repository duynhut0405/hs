import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/auth'
import { useForm } from 'react-hook-form'
import t from '../../../translation'
import Link from 'next/link'
// import SocialFaceBookButton from './SocialFaceBookButton'
// import SocialGoogleButton from './SocialGoogleButton'

function LoginBlockMobile({ }) {
  const { counter, setCounter, phoneOtp, setPhoneOtp, getLoginOtp, loginWithOtp, login, loginFacebookSocial, loginGoogleSocial, numberphone, resendOtp, activeOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState('phone-login');
  const [loginStep, setLoginStep] = useState("phone-input");
  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    changeLoginMethod(loginMethod)
  }, [loginMethod])

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleLogin = async (data) => {
    setLoading(true);
    if (phoneOtp && !(data.email && data.email)) {
      await loginWithOtp({ phone: phoneOtp, otp: data.otp_code });
    } else {
      await login(data.email, data.password);
    }

    setLoading(false);
  }

  const handleFacebookLogin = async (user) => {
    setLoading(true);
    await (loginFacebookSocial(user));
    setLoading(false);
  }

  const handleGoogleLogin = async (user) => {
    setLoading(true);
    await (loginGoogleSocial(user));
    setLoading(false);
  }

  const handleFacebookLoginFailure = (err) => {
    console.log("Can not login with Social");
    console.error(err);
  }
  const handleResendOtp = async () => {
    await resendOtp(phoneOtp);
  }
  const onActiveOtp = async (data) => {
    await activeOtp({ phone: phoneOtp, otp: data.otp_code });
  }
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

  const getOtp = async (data) => {
    let phonenumber = data.telephone ? data.telephone : phoneOtp;
    const result = await getLoginOtp(phonenumber);
    if (result == "Code Sent") {
      setLoginStep('opt-input');
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
    <div className={`box-content content-tab active ${isLoading ? 'loading' : ''}`} data-actab-group="1" data-actab-id="1">
      {numberphone ? <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="full text-center" style={{ fontWeight: 400 }} > Mã OTP của bạn sẽ được gửi bằng tin nhắn đến </label>
          <label className="full text-center mb-20" >  {numberphone} </label>
          <label className="full mb-20">
            <div className="input-title"><span className="require">*</span> Mã OTP </div>
            <input className="input style-2 text-center" name="otp_code"
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
            // <p><button className="btn full btn-4" onClick={handleResendOtp}>{t('resend_otp')}</button></p>
            <div className="text-center mb-20"> Bạn không nhận được mã ?  <a className="cl1" onClick={handleResendOtp}>{t('resend_otp')}</a></div>
          }
          <p><button className="btn full btn-4" onClick={handleSubmit(onActiveOtp)} >{t('confirm')}</button></p>
        </div>
      </form>
        :
        <form onSubmit={handleSubmit(handleLogin)}>
          {loginStep == "phone-input" &&
            <div className="row">
              <p className="text-left cl4 col-4">{t('login_with')}</p>
              <div className="col-8">
                <label className="checkbox col-7">
                  <input id="phone-login" type="checkbox" name="phone-login" onClick={(e) => changeLoginMethod(e.target.name)} {...loginMethod == 'phone-login' ? "checked" : ""} />
                  <span></span>
                  Số điện thoại
                </label>
                <label className="checkbox col-5">
                  <input id="email-login" type="checkbox" name="email-login" onClick={(e) => changeLoginMethod(e.target.name)} {...loginMethod == 'email-login' ? "checked" : ""} />
                  <span></span>
                  Email
                </label>
              </div>
            </div>
          }

          {/* ------------------------------------ Login tab ------------------------------------ */}
          {loginMethod == "phone-login" && loginStep == "phone-input" &&
            <div>
              <label className="full mb-20">
                <div className="input-title"><span className="require">*</span> Số điện thoại </div>
                <input type="number" className="input style-2" name="telephone"
                  ref={register({
                    required: {
                      value: true,
                      message: "Vui lòng nhập số điện thoại"
                    },
                    pattern: {
                      value: /(03|05|07|08|09)+([0-9]{8})\b/,
                      message: "Số điện thoại không đúng"
                    }
                  })} />
                {errors.telephone && <div className="error">{errors.telephone.message}</div>}
              </label>
              <p><button className="btn full btn-4" type="submit" onClick={handleSubmit(getOtp)} >{t('send_otp')}</button></p>
            </div>
          }
          {loginMethod == "email-login" &&
            <div>
              <label className="full mb-20">
                <div className="input-title"><span className="require">*</span> Email</div>
                <input className="input style-2" name="email" type="email" value={email} onChange={(e) => setEmailState(e)}
                  ref={register({
                    required: {
                      value: true,
                      message: "Vui lòng nhập email"
                    }
                  })} />
                {errors.email && <div className="error">{errors.email.message}</div>}
              </label>
              <label className="full mb-20">
                <div className="input-title">
                  <span className="require">*</span> {t('password')}
                  <Link href="/forgot-password">
                    <a className="link-right cl1">{t('forgot_password')}?</a>
                  </Link>
                </div>
                <input className="input style-2" name="password" type="password" value={password} onChange={(e) => setPasswordState(e)}
                  ref={register({
                    required: {
                      value: true,
                      message: "Vui lòng nhập password"
                    }
                  })} />
                {errors.password && <div className="error">{errors.password.message}</div>}
              </label>
              <p><button className="btn full btn-4" type="submit">{t('log_in')}</button></p>
            </div>
          }

          {loginStep == "opt-input" &&
            <div>
              <label className="full text-center" > Mã OTP của bạn sẽ được gửi bằng tin nhắn đến </label>
              <label className="full text-center mb-20" style={{ fontWeight: 700 }} >  {phoneOtp} </label>
              <label className="full mb-20">
                <div className="input-title"><span className="require">*</span> Mã OTP </div>
                <input className="input style-2" name="otp_code"
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
                  Vui lòng chờ
                  <span className="cl1" style={{ fontWeight: 700 }}> &nbsp;{counter}&nbsp; </span>
                  giây để gửi lại
                </label>
                :
                <div className="text-center mb-20"> Bạn không nhận được mã ?  <a className="cl1" onClick={getOtp}>{t('resend_otp')}</a></div>
              }
              <p><button className="btn full btn-4" type="submit">{t('log_in')}</button></p>
            </div>
          }


          {/* <p className="text-center">{t('login_with')}</p> */}
          {/* ----------------- Login tab end ------------------ */}
        </form>
      }

      {/* <div className="row">
        <div className="col-6">
          <SocialFaceBookButton
            provider='facebook'
            appId={process.env.FACEBOOK_APP_ID}
            onLoginSuccess={handleFacebookLogin}
            onLoginFailure={handleFacebookLoginFailure}
          >
            <img src="/images/svg/t13.svg" alt="" />
                Facebook
              </SocialFaceBookButton>
        </div>
        <div className="col-6">
          <SocialGoogleButton
            provider='google'
            appId={process.env.GOOGLE_CLIENT_ID}
            onLoginSuccess={handleGoogleLogin}
            onLoginFailure={handleFacebookLoginFailure}
          >
            <img src="/images/svg/t12.svg" alt="" /> Google
              </SocialGoogleButton>

        </div>
      </div> */}
    </div>
  )
}

export default LoginBlockMobile;