import IsMobile from '../../../utils/detectMobile'
import Layout from '../../../components/Desktop/Layout'
import t from '../../../translation'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import React, { useState, useRef, useEffect } from "react";
import api from '../../../services/api'
import LayoutMobile from '../../../components/Mobile/LayoutMobile'
import HeaderMobile from '../../../components/Mobile/HeaderMobile'

function CreatePassword({ isMobile }) {
  const { register, handleSubmit, errors } = useForm();
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [validatePassword, setValidatePassword] = useState({
    text: "",
    color: "",
  });
  const [successText, setSuccessText] = useState({
    text: "",
    color: "",
  });

  const setPasswordState = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }


  useEffect(() => {
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    let newText = "";
    let newColor = "";
    if (strongRegex.test(password)) {
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

  const handleResetPassword = async (data) => {
    setLoading(true);
    try {
      const result = await api.post(`/customers/resetPassword`, {
        "email": "",
        "reset_token": router.query.token,
        "new_password": data.password,
      });

      if (result.status == 200) {
        setSuccessText({ text: "Đổi mật khẩu thành công", color: "#34eb58" });
        setTimeout(function () {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    isMobile ?

      <LayoutMobile>
        <HeaderMobile />
        <main className="sec-tb page-login">
          <div className={`container ${loading ? 'loading' : ''}`}>
            <div className="h2 page-title text-center cl1 mb-20">
              XÁC NHẬN MẬT KHẨU
            </div>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div>
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
                {successText.text && (
                  <div className="note-password mb-20 text-center">
                    <span style={{ color: successText.color }}>{successText.text}</span>
                  </div>
                )}

                <p><button className="btn full btn-4" type="submit"> Xác nhận </button></p>
              </div>
            </form>
          </div>
        </main>
      </LayoutMobile>

      :

      <Layout>
        <main className="sec-tb page-login">
          <div className={`container ${loading ? 'loading' : ''}`}>
            <div className="h2 page-title text-center cl1">
              XÁC NHẬN MẬT KHẨU
            </div>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div>
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
                {successText.text && (
                  <div className="note-password mb-20 text-center">
                    <span style={{ color: successText.color }}>{successText.text}</span>
                  </div>
                )}

                <p><button className="btn full btn-4" type="submit"> Xác nhận </button></p>
              </div>
            </form>
          </div>
        </main>
      </Layout >
  )
}

export async function getServerSideProps(context) {
  // const router = useRouter();

  const isMobile = IsMobile(context);
  return { props: { isMobile } }
}


export default CreatePassword;