import React, { useRef, useState } from 'react';
import VoteTotalMobile from '../ProductDetail/VoteTotalMobile';
import ReviewListMobile from '../../Mobile/ProductDetail/ReviewListMobile';
import api from '../../../services/api';
import SelectStart from '../../Desktop/Products/ChildrenBLocks/SelectStart';
import { useAuth } from '../../../contexts/auth';
import FormReivewMobile from './FormReviewMobile';

function getBase64Image(dataURL) {
  return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
}

function CustomerReview({ data, productId, isModal = false, cb, isEdit = false, isDetail }) {
  const [star, setStar] = useState(() => {
    if (data) {
      if (data?.votes?.length > 0) {
        const vote = data?.votes[data?.votes?.length - 1];
        if (vote?.percent) {
          return JSON.stringify(Number(vote?.percent) / 20);
        } else return '0';
      } else return '0';
    } else return '0';
  });
  const [isLoading, setLoading] = useState(false);
  const [upImg, setUpImg] = useState(() => {
    return data?.images?.[0] ? process.env.DOMAIN_BASE + '/pub/media/review/' + data?.images?.[0] : null;
  });
  const [file, setFile] = useState(null);
  const formRef = useRef();
  const formRefStar = useRef();
  const { isAuthenticated, setOpenModal, user } = useAuth();

  const handlePost = async (dataSubmit) => {
    setLoading(true);
    let imagePath = null;
    if (upImg && file) {
      try {
        const result = await api.post('/service/media/upload', {
          entry: {
            media_path: 'review',
            field_id: 'image',
            name: file.name,
            type: file.type,
            content: getBase64Image(upImg),
          },
        });
        imagePath = result.data[0].url;
      } catch (error) {
        throw error;
      }
    }

    try {
      await api.post('/service/product/review', {
        product_id: productId,
        review: {
          title: '',
          nickname: isEdit ? data.nickname : dataSubmit.nickname,
          detail: dataSubmit.comment,
          quality_rating: star,
          price_rating: star,
          image: !imagePath ? (upImg && !file ? data?.images?.[0] : '') : imagePath.split('review/')[1],
          video: '',
          review_id: data?.review_id || null,
        },
        customerId: user?.id || null,
      });
    } catch (error) {
      throw error;
    }
    cb && cb();
    setLoading(false);
    formRef.current.reset();
    formRefStar.current.reset();
    setUpImg(null);
    setStar(0);
    alert('Đánh giá của bạn đã được gửi đến hệ thống kiểm duyệt. Xin cảm ơn');
    console.log('Bạn đã gửi comment thành công');
  };

  const handleUploadFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (!['jpg', 'jpeg', 'png'].includes(e.target.files[0]?.type?.split('/')[1])) {
        alert('Ảnh ko hợp lệ, vui lòng up dưới định dạng jpg, jpeg, png');
        setFile(null);
        setUpImg(null);
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  const onSetStart = (e) => {
    setStar(e.target.value);
    if (!isAuthenticated) {
      setOpenModal(true);
    }
  };

  return (
    <>
      <div className='pd-15 sec-bd-bottom'>
        <h3>KHÁCH HÀNG NHẬN XÉT</h3>
        <div className='comdetail'>
          <div className='boxRatingCmt' id='boxRatingCmt'>
            <div className='toprt  border-bottom'>
              <div className='d-flex center'>
                <div className='col-4'>
                  <div className='lcrt' data-gpa='4.7'>
                    <b> {(data.review_summary[0].rating_summary / 20).toFixed(1)} </b>
                    <span className='ratingresult'>
                      <i className='icon-star rated'></i>
                      <i className='icon-star rated'></i>
                      <i className='icon-star rated'></i>
                      <i className='icon-star rated'></i>
                      <i className='icon-star rated'></i>
                    </span>

                    <div>({data.review_summary[0].review_counts|| 0} nhận xét)</div>
                  </div>
                </div>
                <VoteTotalMobile data={data.review_summary[0].vote} total={data.review_summary[0].review_counts} />
              </div>
              {isDetail ? (
                <div className='bcrt'>
                  <SelectStart ref={formRefStar} star={star} onSetStart={onSetStart} />
                </div>
              ) : null}
            </div>

            {(star != 0 || star != '0') && isAuthenticated && (
              <FormReivewMobile
                defaultContent={data?.detail || ''}
                isEdit={isEdit}
                ref={formRef}
                username={user ? user.lastname + ' ' + user.firstname : ''}
                onSubmit={handlePost}
                isLoading={isLoading}
                handleUploadFile={handleUploadFile}
                upImg={upImg}
                setUpImg={setUpImg}
              />
            )}

            {/* DONE HERE --------------------------- */}

            <ReviewListMobile productId={productId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerReview;
