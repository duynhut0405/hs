import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useAuth } from "../../../contexts/auth";
import t from "../../../translation";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import AcountEditPassword from "./AcountEditPassword";

const propTypes = {};

function AcountCommon({}) {
  const { user } = useAuth();
  const { register, handleSubmit, errors, watch } = useForm();
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    fullname: "",
    email: "",
    dob: "",
    gender: 0,
    is_subscribed: false,
    website_id: 1,
    extension_attributes: {
      telephone: "",
    },
  });

  useEffect(() => {
    if (user) {
      let newValue = state;
      newValue.firstname = user.firstname;
      newValue.lastname = user.lastname;
      newValue.fullname = user.lastname + " " + user.firstname;
      newValue.extension_attributes.telephone = user.telephone;
      newValue.gender = user.gender;
      newValue.email = user.email;
      newValue.dob = user.dob;
      newValue.is_subscribed = user.is_subscribed;

      setState({
        ...state,
        newValue,
      });
    }
  }, [user]);

  const onSubmit = async (data) => {
    setIsDisabled(true);
    try {
      let lname = data.fullname.substr(0, data.fullname.indexOf(" "));
      let fname = data.fullname.substr(data.fullname.indexOf(" ") + 1);

      const result = await api.post("service/customers/update-profile", {
        customerData: {
          email: data.email,
          firstname: fname,
          lastname: lname,
          dob: data.dob,
          gender: data.gender,
          website_id: 1,
          extension_attributes: {
          telephone: data.telephone,
          },
        },
      });
      const result2 = await api.post("service/customers/newsletter", {
        "isSubscribed": state.is_subscribed
      })
    } catch (error) {
      alert("Cập nhật thất bại. Vui lòng kiểm tra lại thông tin");
      setIsDisabled(false);
      throw error
    }
    // window.location.reload();
    setIsDisabled(false);
  };

  return (
    <>
      {user != undefined && (
        <div className="col-12 col-md-9">
          <div className={`box-shadow box-edit ${isDisabled ? "loading" : ""}`}>
            <h6 className="box-title bd">{t("user_edit")}</h6>
            <div className="box-content">
              <form onSubmit={(e) => e.preventDefault()}>
                <p>{t("account_info")}</p>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-20">
                      <div className="input-title">
                        <span className="require">*</span> Họ và tên
                      </div>
                      <input
                        className="input"
                        name="fullname"
                        defaultValue={state.fullname}
                        placeholder="Họ và tên"
                        ref={register({
                          required: {
                            value: true,
                            message: "Vui lòng nhập họ và tên",
                          },
                          pattern: {
                            value: /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*( [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*)+/,
                            message: "Vui lòng nhập đầy đủ họ và tên",
                          },
                        })}
                      />
                      {errors.fullname && <div className="error">Hãy nhập họ và tên của bạn</div>}
                    </div>

                    <div className="mb-20">
                      <div className="input-title">
                        <span className="require">*</span> Số điện thoại
                      </div>
                      <input
                        className="input"
                        defaultValue={state.extension_attributes.telephone}
                        name={"telephone"}
                        placeholder="Điện thoại"
                        ref={register({
                            required: {
                              value: true,
                              message: "Vui lòng nhập số điện thoại của bạn",
                            },
                          pattern: {
                            value: /(03|05|07|08|09)+([0-9]{8})\b/,
                            message: "Số điện thoại không đúng",
                          },
                        })}
                      />
                      {errors.telephone && <div className="error">{errors.telephone.message}</div>}
                    </div>
                    <div className="mb-20">
                      <div className="input-title">
                        <span className="require">*</span> Email
                      </div>
                      <input
                        className="input"
                        defaultValue={state.email}
                        name={"email"}
                        placeholder="Email"
                        ref={register({
                            required: {
                              value: true,
                              message: "Vui lòng nhập email của bạn",
                            },
                        })}
                      />
                      {errors.email && <div className="error">{errors.email.message}</div>}
                    </div>
                    {/* <div className="mb-20">
                      <div className="input-title"><span className="require">*</span> Tên</div>
                      <input className="input" name="firstname" defaultValue={state.firstname} placeholder="Tên" ref={register({ required: true })} />
                    </div>
                    <div className="mb-20">
                      <div className="input-title"><span className="require">*</span> Họ</div>
                      <input className="input" name="lastname" defaultValue={state.lastname} placeholder="Họ" ref={register({ required: true })} />
                    </div> */}
                    <div className="mb-20">
                      <label className="checkbox ">
                        <input type="checkbox" name="is_subscribed" ref={register({})} checked={state.is_subscribed} onChange={(e) => setState({ ...state, is_subscribed: !state.is_subscribed })}/>
                        <span></span>
                        Đăng ký nhận tin
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-20">
                      <div className="input-title">Ngày sinh</div>
                      <input
                        className="input style-2"
                        type="date"
                        name="dob"
                        defaultValue={state.dob}
                        ref={register({
                          valueAsDate: true,
                        })}
                      />
                    </div>
                    <div className="mb-20">
                      <div className="input-title">Giới tính</div>
                      <select className="select style-2" name="gender" value={state.gender} ref={register({})} onChange={(e) => setState({ ...state, gender: e.target.value })}>
                        <option value="1">{t("male")}</option>
                        <option value="2">{t("female")}</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* <div className="line"></div> */}
                <button className="btn btn-4" onClick={handleSubmit(onSubmit)}>
                  Cập nhật
                </button>
              </form>
            </div>
          </div>
          <AcountEditPassword />
        </div>
      )}
    </>
  );
}

AcountCommon.propTypes = propTypes;

export default AcountCommon;
