import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { useAuth } from '../../../contexts/auth'
import t from '../../../translation'
import { useForm } from 'react-hook-form'
import api from '../../../services/api'
import LayoutMobileOnlyHead from '../LayoutMobileOnlyHead'
import AcountEditPasswordMobile from './AcountEditPasswordMobile'

const propTypes = {};

function AcountEditMobile({ }) {
  const { user } = useAuth();
  const { register, handleSubmit, errors, watch } = useForm();
  const [password, setPassword] = useState('');
  const [openPassword, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: 0,
    website_id: 1,
    extension_attributes: {
      telephone: ''
    }
  })

  useEffect(() => {
    if (user) {
      let newValue = state;
      newValue.firstname = user.firstname;
      newValue.lastname = user.lastname
      newValue.extension_attributes.telephone = user.telephone;
      newValue.gender = user.gender;
      newValue.email = user.email;
      setState({
        ...state,
        newValue
      })
    }
  }, [user])

  const onSubmit = async data => {
    setIsDisabled(true);
    try {
      const result = await api.post('service/customers/update-profile', {
        "customerData": {
          "email": data.email,
          "firstname": data.firstname,
          "lastname": data.firstname,
          "dob": data.dob,
          "gender": data.gender,
          "website_id": 1,
          "extension_attributes": {
            "telephone": data.telephone
          }
        }
      })
    } catch (error) {
      throw error
    }
    window.location.href = '/account';
    setIsDisabled(false);
  };

  return (
    <>
      <LayoutMobileOnlyHead />
      {(user != undefined && !openPassword) && (
        <>
          <Link href="/account">
            <div className="page-top-heading">
              <a className="back icon-arrow-1 ix"></a>
              <h1>Chỉnh sửa thông tin tài khoản</h1>
            </div>
          </Link>
          <form className={`page-user-info ${isDisabled ? 'loading' : ''}`} onSubmit={e => e.preventDefault()}>
            <div className="pd-15">
              <div className="mb-20">
                <div className="input-title"><span className="require">*</span> Họ và tên</div>
                <input className="input style-2" name="firstname"
                  defaultValue={state.firstname} placeholder="Họ và tên" name="firstname"
                  // onChange={(e) => { setFullName(e.target.value) }}
                  ref={register({
                    required: {
                      value: true,
                      message: "Vui lòng nhập họ và tên",
                    },
                    pattern: {
                      value: /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*( [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*)+/,
                      message: "Vui lòng nhập đầy đủ họ và tên",
                    },
                  })} />
                {errors.fullname && <div className="error">Hãy nhập họ và tên của bạn</div>}
              </div>
              {/* <div className="mb-20">
                <div className="input-title"><span className="require">*</span> Họ</div>
                <input  className="input style-2" name="lastname" defaultValue={state.lastname} placeholder="Họ" ref={register({ required: true })}/>
                {errors.lastname && <div className="error">Hãy nhập họ của bạn</div>}
            </div> */}
              <div className="mb-20">
                <label className="checkbox ">
                  <input type="checkbox" />
                  <span></span>
                  Đăng ký nhận tin
                </label>
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
              <div className="mb-20">
                <div className="input-title">Ngày sinh</div>
                <input className="input style-2" type="date" name="dob"
                  ref={
                    register({
                      valueAsDate: true,
                    })
                  }
                />
              </div>
              <div className="mb-20">
                <div className="input-title">Giới tính</div>
                <select className="select style-2" name="gender" value={state.gender} ref={register({})} onChange={(e) => setState({ ...state, gender: e.target.value })}>
                  <option value="1">{t('male')}</option>
                  <option value="2">{t('female')}</option>
                </select>
              </div>
              <div >
                <div className="input-title"><span className="require">*</span> Số điện thoại</div>
                <input className="input" defaultValue={state.extension_attributes.telephone} name={'telephone'} placeholder="Điện thoại" ref={register({
                  required: true, pattern: {
                    value: /(03|05|07|08|09)+([0-9]{8})\b/,
                    message: "Số điện thoại không đúng",
                  }
                })} value={currentState.telephone} onChange={(e) => setCurrentState({ ...currentState, telephone: e.target.value })} />
                {errors.telephone && <div className="error">{errors.telephone.message}</div>}
              </div>
            </div>
            <div className="line"></div>
            <div className="pd-15">
              <a className="link-right cl1" onClick={() => setOpen(true)}>Đổi mật khẩu</a>
            </div>

            <button className="btn btn-4" onClick={handleSubmit(onSubmit)}>Lưu thay đổi</button>
          </form>
        </>
      )}
      {(user != undefined && openPassword) && (
        <AcountEditPasswordMobile setOpen={setOpen} />
      )}
    </>
  );
}

AcountEditMobile.propTypes = propTypes;

export default AcountEditMobile;
