import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { useAuth } from '../../../contexts/auth'
import t from '../../../translation'
import { useForm } from 'react-hook-form'
import api from '../../../services/api'

const propTypes = {};

function AcountEditPassword({ }) {
  const { user } = useAuth();
  const { register, handleSubmit, errors, watch } = useForm();
  const [password, setPassword] = useState('');
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
  const [validatePassword, setValidatePassword] = useState({
    text: '',
    color: ''
  })

  useEffect(() => {
    const mediumRegex = new RegExp("^(?=.*[a-zA-Z0-9_])(?=.{6,})");
    const strongRegex = new RegExp("^(?=.*[a-zA-Z0-9_])(?=.{8,})");
    let newText = '';
    let newColor = '';
    if (strongRegex.test(password) && !password.includes(" ")) {
      newText = t('strong');
      newColor = '#0F9D58';
    } else if (mediumRegex.test(password)) {
      newText = t('medium');
      newColor = '#F4B400';
    } else {
      newText = t('weak');
      newColor = '#DB4437';
    }
    setValidatePassword({
      text: newText,
      color: newColor
    })
  }, [password])

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
      const result = await api.post('service/customers/update-password', {
        "email": user.email,
        "current_password": data.old_password,
        "new_password": data.password
      })

      if (result.status == 200) {
        alert("Đổi mật khẩu thành công");
        setIsDisabled(false);
        window.location.reload();
      }
    } catch (error) {
      // throw error
      console.log(error)
      alert("Đổi mật khẩu thất bại");
      setIsDisabled(false);
    }
  };

  return (
    <>
      {(user != undefined) && (
        <div className={`box-shadow box-edit ${isDisabled ? 'loading' : ''}`}>
          <h6 className="box-title bd">{t('change_password')}</h6>
          <div className="box-content">
            <form onSubmit={e => e.preventDefault()}>
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb-20">
                    <div className="input-title"><span className="require">*</span> {t('old_password')}</div>
                    <input  className="input" type="password" name="old_password" ref={register({ required: true })} />
                    {errors.old_password && <div className="error">{t('required')}</div>}
                  </div>
                  <div className="mb-20">
                    <div className="input-title"><span className="require">*</span> {t('password')}</div>
                    <input  className="input style-2" type="password" name="password" defaultValue={password} onChange={(e) => (setPassword(e.target.value.trim()))}
                      ref={register({
                        required: true
                      })}
                    />
                    {errors.password && <div className="error">{t('required')}</div>}
                  </div>
                  <div className="note-password mb-20 cl4 fs-12">
                    {t("password_strength")}: <span style={{ color: validatePassword.color }}>{validatePassword.text}</span>
                  </div>
                  <div className="mb-20">
                    <div className="input-title"><span className="require">*</span> {t('re_password')}</div>
                    <input  className="input style-2" type="password" name="password_repeat"
                      ref={register({
                        validate: value =>
                          value === password || t('password_not_match')
                      })}
                    />
                    {errors.password_repeat && <div className="error">{errors.password_repeat.message}</div>}
                  </div>
                </div>
              </div>
              <button className="btn btn-4" onClick={handleSubmit(onSubmit)}>Cập nhật</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

AcountEditPassword.propTypes = propTypes;

export default AcountEditPassword;
