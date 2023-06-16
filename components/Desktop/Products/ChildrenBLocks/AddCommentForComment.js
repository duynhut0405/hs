import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';
import { useAuth } from '../../../../contexts/auth';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

function AddCommentForComment({ reviewId, count, getAgain }) {
  const [isActive, setActive] = useState(false);
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [errorMinWord, setErrorMinWord] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [total, setTotal] = useState(() => {
    return count;
  });
  const setActiveForm = () => {
    setActive(true);
  };

  const handleComment = async (data) => {
    try {
      let text = data.inputValue;
      text = text.replace(/\n/g, ' ');
      let count = 0;

      for (const item of text.split(' ')) {
        if (item !== '') count++;
        if (count > 4) {
          break;
        }
      }

      if (count < 5) {
        setErrorMinWord('*Vui lòng nhập ít nhất 5 từ');
        setTimeout(() => {
          setErrorMinWord('');
        }, 5000);
        return;
      }
      setLoading(true);
      const result = await api.post('service/product/review/behavior', {
        review_id: reviewId,
        customer_id: user?.id ? Number(user.id) : null,
        identify: data.phone,
        type: 'comment',
        content: data.inputValue,
        post_by: data.nickname,
      });
      if (result) {
        alert('Bình luận của bạn đã được gửi đến hệ thống kiểm duyệt. Xin cảm ơn');
        setActive(false);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log('🚀 ~ file: AddCommentForComment.js ~ line 27 ~ handleComment ~ err', err);
    }
  };

  useEffect(() => {
    setTotal(count);
  }, [count]);
  return (
    <>
      <div className='ra mb-3'>
        <img src='/images/svg/chat.svg' alt='' />
        <span className='cmtr' onClick={() => setActiveForm()}>
          Bình luận
        </span>
        {count != 0 && <span>{'(' + total + ')'}</span>}
      </div>
      {isActive && (
        <form className='form-review' onSubmit={handleSubmit(handleComment)}>
          <textarea className='input mb-10' name='inputValue' placeholder='Nhập bình luận' maxLength={1000} defaultValue={''} onChange={(e) => setInputValue(e.target.value)} ref={register({ required: '*Vui lòng nhập bình luận' })}></textarea>
          {errors?.inputValue?.message && <p className='red2'>{errors?.inputValue?.message}</p>}
          {errorMinWord !== '' && <p className='red2'>{errorMinWord}</p>}
          <p>
            <span className='cl4'>{inputValue.length}/1000</span>
          </p>
          <div className='row list-item-10'>
            <div className='col-sm-4'>
              <div className='input-title'>
                <p className='label'>
                  Tên của bạn <span className='require'>*</span>
                </p>
              </div>
              <input
                onKeyPress={(e) => {
                  if (new RegExp(/[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz ]/).test(e.key)) {
                  } else e.preventDefault();
                }}
                className='input'
                defaultValue={user ? user?.lastname + ' ' + user?.firstname : ''}
                name={'nickname'}
                placeholder={'Tên của bạn'}
                ref={register({ required: '*Vui lòng nhập tên của bạn' })}
              />
              {errors?.nickname?.message && <p className='red2'>{errors?.nickname?.message}</p>}
            </div>
            <div className='col-sm-4'>
              <div className='input-title'>
                <p className='label'>
                  Số điện thoại <span className='require'>*</span>
                </p>
              </div>
              <input
                onKeyPress={(e) => {
                  if (new RegExp(/[0-9]/).test(e.key)) {
                  } else e.preventDefault();
                }}
                className='input'
                maxLength={10}
                defaultValue={user ? user?.telephone : ''}
                name={'phone'}
                placeholder={'Số điện thoại'}
                ref={register({
                  required: '*Vui lòng nhập số điện thoại',
                  pattern: {
                    value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                    message: 'Số điện thoại không hợp lệ!',
                  },
                })}
              />
              {errors?.phone?.message && <p className='red2'>{errors?.phone?.message}</p>}
            </div>
            <div className='col-sm-4 self-end'>
              <button className='btn btn-4 pull-right'>Gửi</button>
              {(errors?.phone?.message || errors?.nickname?.message) && <p style={{ color: 'white' }}>error</p>}
            </div>
          </div>
          <br />
        </form>
      )}
    </>
  );
}

export default AddCommentForComment;
