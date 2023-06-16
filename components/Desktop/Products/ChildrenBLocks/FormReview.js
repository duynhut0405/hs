import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const FormReivew = forwardRef(({ errorMinWord, onSubmit, isLoading, defaultContent = '', upImg, setUpImg, username = '', handleUploadFile, isEdit = false }, ref) => {
  const { register, handleSubmit, errors } = useForm();
  const [isPreviewImage, setPreviewImage] = useState(false);
  return (
    <>
      <form ref={ref} className={`form-review ${isLoading ? 'loading' : ''}`} style={{ clear: 'both' }} onSubmit={handleSubmit(onSubmit)}>
        <textarea className='input mb-10' name={'comment'} defaultValue={defaultContent} placeholder={'Hãy điền review của bạn'} ref={register({ required: '*Vui lòng nhập thông tin đánh giá của bạn' })}></textarea>
        {errors.comment?.message && <p className='red2'>{errors.comment?.message}</p>}
        {errorMinWord !== '' && <p className='red2'>{errorMinWord}</p>}
        <div className='row'>
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
              className='input mb-10'
              name={'nickname'}
              style={{ background: isEdit ? '#f0f0f0' : '' }}
              defaultValue={username}
              disabled={isEdit}
              placeholder={'Tên của bạn'}
              ref={register({ required: '*Vui lòng nhập tên của bạn' })}
            />
            {errors.nickname?.message && <p className='red2'>{errors.nickname?.message}</p>}
          </div>
          {/* <div className='col-sm-4 self-end'>
            <input type='file' id='star-6' name='rating' style={{ display: 'none' }} onChange={handleUploadFile} />
            <label className='btn mb-10' htmlFor='star-6'>
              <i className='icon-t22'></i> Thêm hình ảnh
            </label>
            {errors.nickname?.message && <p className='color-white'>error</p>}
          </div> */}
          <div className='col-sm-4 self-end'>
            <button className='btn btn-4 pull-right mb-10'>Gửi review</button>
            {errors.nickname?.message && <p className='color-white'>error</p>}
          </div>
        </div>
      </form>
      {/* {upImg && (
        <>
          <div className='list-thumb-comment'>
            <div className='img'>
              <span
                className='tRes'
                onClick={() => {
                  setPreviewImage(true);
                }}
              >
                <img
                  src={upImg}
                  onError={async (e) => {
                    await checkImageExist(e);
                    setUpImg(null);
                  }}
                />
              </span>
              {!isEdit ? (
                <span className='close'>
                  <i
                    className='icon-close'
                    onClick={() => {
                      setUpImg(null);
                    }}
                  ></i>
                </span>
              ) : null}
            </div>
          </div>
        </>
      )} */}
    </>
  );
});

export default FormReivew;
