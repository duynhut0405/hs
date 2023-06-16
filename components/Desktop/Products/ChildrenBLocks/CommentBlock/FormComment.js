import dynamic from 'next/dynamic';
import { forwardRef, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../../contexts/auth';
import api from '../../../../../services/api';

const FormComment = ({ productId }) => {
  const { register, handleSubmit, errors } = useForm();
  const [inputValue, setInputValue] = useState('');
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const [errorMinWord, setErrorMinWord] = useState('');
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
      const result = await api.post('review/product/comment', {
        customer_id: user?.id ? Number(user.id) : null,
        identify: data.phone,
        product_id: productId,
        content: data.inputValue,
        post_by: data.nickname,
      });
      if (result) {
        alert('Bình luận của bạn đã được gửi đến hệ thống kiểm duyệt. Xin cảm ơn');
        setLoading(false);
        formRef.current.reset();
      }
    } catch (err) {
      console.log('🚀 ~ file: AddCommentForComment.js ~ line 27 ~ handleComment ~ err', err);
      setLoading(false);
      formRef.current.reset();
    }
  };

  return (
    <>
      <form ref={formRef} className='form-review' onSubmit={handleSubmit(handleComment)}>
        <textarea
          onFocus={() => setShow(true)}
          className='input mb-10'
          name='inputValue'
          placeholder='Thêm bình luận'
          maxLength={1000}
          defaultValue={''}
          onChange={(e) => setInputValue(e.target.value)}
          ref={register({ required: '*Vui lòng nhập bình luận' })}
        ></textarea>
        {errors?.inputValue?.message && <p className='red2'>{errors?.inputValue?.message}</p>}
        {errorMinWord !== '' && <p className='red2'>{errorMinWord}</p>}
        <p>
          <span className='cl4'>{inputValue.length}/1000</span>
        </p>
        {show ? (
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
        ) : null}
      </form>
    </>
  );
};

export default FormComment;
