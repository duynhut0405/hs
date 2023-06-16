import dynamic from 'next/dynamic';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import checkImageExist from '../../../utils/checkImageExist';

const FormReivewMobile = forwardRef(({ onSubmit, isLoading, defaultContent = '', upImg, setUpImg, username = '', handleUploadFile, isEdit = false }, ref) => {
  const { register, handleSubmit, errors } = useForm();
  return (
    <>
      <form ref={ref} className={`form-review ${isLoading ? 'loading' : ''}`} style={{ clear: 'both' }} onSubmit={handleSubmit(onSubmit)}>
        <textarea className='input mb-10' name={'comment'} defaultValue={defaultContent} placeholder={'Hãy điền review của bạn'} ref={register({ required: '*Vui lòng nhập thông tin đánh giá của bạn' })}></textarea>
        {errors.comment?.message && <p className='red2'>{errors.comment?.message}</p>}

        <div className='row list-item-10'>
          <div className='col-sm-4'>
            <input
              onKeyPress={(e) => {
                if (new RegExp(/[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz ]/).test(e.key)) {
                } else e.preventDefault();
              }}
              name={'nickname'}
              className='input mb-10'
              style={{ background: isEdit ? '#f0f0f0' : '' }}
              defaultValue={username}
              disabled={isEdit}
              placeholder={'Tên của bạn'}
              ref={register({ required: '*Vui lòng nhập tên của bạn' })}
            />
            {errors.nickname?.message && <p className='red2'>{errors.nickname?.message}</p>}
          </div>
          {/* <div className='col-6'>
            <input type='file' id='star-6' name='rating' style={{ display: 'none' }} onChange={handleUploadFile} />
            <label className='btn' htmlFor='star-6'>
              <i className='icon-t22'></i> Thêm hình ảnh
            </label>
          </div> */}
          <div className='col-6'>
            <button className='btn btn-4 pull-right'>Gửi review</button>
          </div>
        </div>

        {/* {upImg && (
          <>
            <div className='list-thumb-comment'>
              <div className='img'>
                <span className='tRes'>
                  <img src={upImg} onError={async (e) => await checkImageExist(e)} />
                </span>
                <span className='close'>
                  <i
                    className='icon-close'
                    onClick={() => {
                      setUpImg(null);
                    }}
                  ></i>{' '}
                </span>
              </div>
            </div>
          </>
        )} */}
      </form>
    </>
  );
});

export default FormReivewMobile;
