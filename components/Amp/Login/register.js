import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../contexts/auth";
import { useForm } from "react-hook-form";
import t from "../../../translation";
import "moment/locale/it.js";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import Link from 'next/link'

function RegisterBlockMobile({ }) {
  const { register, handleSubmit, errors, watch } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { counter, setCounter, phoneOtp, setPhoneOtp, resendOtp, activeOtp, signUp } = useAuth();
  const [otpCode, setOtpCode] = useState("");

  const [date, setDate] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [validatePassword, setValidatePassword] = useState({
    text: "",
    color: "",
  });

  useEffect(() => {
    // setPhoneOtp("0882777444")
  }, [phoneOtp]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleResendOtp = async () => {
    await resendOtp(phoneOtp);
  }

  const onActiveOtp = async (data) => {
    await activeOtp({ phone: phoneOtp, otp: data.otp_code });
  }

  const onSubmit = async (data) => {
    var dateString = date != "" ? date.getUTCDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear() : "";
    let newData = {
      ...data,
      dob: dateString,
    };
    setIsDisabled(true);
    let result = await signUp(newData);
    console.log(result);
    setIsDisabled(false);
  };

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

  const setOtpCodeState = (e) => {
    e.preventDefault();
    setOtpCode(e.target.value);
  }

  const setEmailState = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const setPasswordState = (e) => {
    e.preventDefault();
    const handlePassword = e.target.value.trim()
    setPassword(handlePassword);
  }

  return (
    <div className={`box-content content-tab active ${isDisabled ? "loading" : ""}`} data-actab-group="1" data-actab-id="2">
      { phoneOtp ?

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="full text-center" > Mã OTP của bạn sẽ được gửi bằng tin nhắn đến </label>
            <label className="full text-center mb-20" style={{ fontWeight: 700 }} >  {phoneOtp} </label>
            <label className="full mb-20">
              <div className="input-title"><span className="require">*</span> Mã OTP </div>
              <input  className="input style-2" name="otp_code"
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

        :

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="b">{t("account_info")}</div>
          <div className="line"></div>
          <div className="row space-20">
            <label className="col-sm-12 mb-20">
              <div className="input-title">
                <span className="require">*</span> {t("fullname")}
              </div>
              <input  className="input style-2" name="fullname"
                ref={register({
                  required: {
                    value: true,
                    message: "Vui lòng nhập họ và tên",
                  },
                  pattern: {
                    value: /\s/,
                    message: "Vui lòng nhập đầy đủ họ và tên",
                  },
                })} />
              {errors.fullname && <div className="error">{errors.fullname.message}</div>}
            </label>

            {/* <label className="col-sm-6 mb-20">
            <div className="input-title">
              <span className="require">*</span> {t('lastname')}
            </div>
            <input  className="input style-2" name="lastname" ref={register({ required: true })} />
            {errors.lastname && 'lastname is required.'}
          </label> */}

            {/* ---------------------------- ADD FIELD ----------------------------- */}
            <label className="col-sm-6 mb-20">
              <div className="input-title">{t("birthday")}</div>
              <DatePickerInput name="dob" onChange={(value) => setDate(value)} value={date} displayFormat="DD/MM/YYYY" locale="vi" />
            </label>

            <label className="col-sm-6 mb-20">
              <div className="input-title">{t("gender")}</div>
              <select className="select style-2" name="gender" ref={register({})}>
                <option value="1">{t("male")}</option>
                <option value="2">{t("female")}</option>
              </select>
            </label>

            <div className="col-12 mb-10">
              <label className="checkbox full ">
                <input  type="checkbox" name="isSubscribed" ref={register({})} defaultChecked />
                <span></span>
                {t("is_subscribed")}
              </label>
            </div>
          </div>

          <div className="line"></div>
          <div className="b">{t("login_info")}</div>
          <div className="line"></div>
          <label className="full mb-20">
            <div className="input-title">
              <span className="require">*</span> Số điện thoại{" "}
            </div>
            <input
              
              className="input style-2"
              name="telephone"
              type="number"
              ref={register({
                required: {
                  value: true,
                  message: "Vui lòng nhập số điện thoại",
                },
                pattern: {
                  value: /(03|05|07|08|09)+([0-9]{8})\b/,
                  message: "Số điện thoại không đúng",
                },
              })}
            />
            {errors.telephone && <div className="error">{errors.telephone.message}</div>}
          </label>
          <label className="full mb-20">
            <div className="input-title"> Email</div>
            <input
              
              className="input style-2"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmailState(e)}
              ref={register({
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không đúng",
                },
              })}
            />
            {errors.email && <div className="error">{errors.email.message}</div>}
          </label>
          <label className="full mb-20">
            <div className="input-title">
              <span className="require">*</span> {t("password")}
            </div>
            <input
              
              className="input style-2"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPasswordState(e)}
              ref={register({
                required: {
                  value: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              })}
            />
            {errors.password && <div className="error">{errors.password.message}</div>}
          </label>
          <div className="note-password mb-20 cl4 fs-12">
            {t("password_strength")}: <span style={{ color: validatePassword.color }}>{validatePassword.text}</span>
          </div>
          <label className="full mb-20">
            <div className="input-title">
              <span className="require">*</span> {t("re_password")}
            </div>
            <input
              
              className="input style-2"
              type="password"
              name="password_repeat"
              ref={register({
                validate: (value) => value === password || t("password_not_match"),
              })}
            />
            {errors.password_repeat && <div className="error">Mật khẩu không khớp</div>}
          </label>
          <label className="checkbox full ">
            {/* <input  type="checkbox" name="isSubscribed" ref={register({})} /> */}
            <input
              
              type="checkbox"
              name="isReaded"
              ref={register({
                required: true,
              })}
            />
            <span></span>
            {t("i_has_readed")}{" "}
            <Link href='/blog/category/chinh-sach-ho-tro'>
            <a href="#" target="_blank" className="cl1">
              {t("policy")}
            </a>
            </Link>
            {" "}
            {t("of_group")}
          </label>
          {errors.isReaded && <div className="error">Vui lòng đồng ý với điều khoản</div>}
          <br />
          <button className="btn full btn-4" type="submit" disabled={isDisabled} onClick={handleSubmit(onSubmit)}>
            {t("register")}
          </button>
        </form>
      }

    </div>
  );
}

export default RegisterBlockMobile;
