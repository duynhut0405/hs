import React, { useState } from 'react'
import VoteTotalMobile from '../ProductDetail/VoteTotalMobile'
import ReviewListMobile from '../../Mobile/ProductDetail/ReviewListMobile'
import { useForm } from 'react-hook-form'
import api from '../../../services/api'

function getBase64Image(dataURL) {
  return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
}

function CustomerReview({ data, productId }) {
  const [currentStar, setStar] = useState(0);
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [upImg, setUpImg] = useState(null);
  const [isPreviewImage, setPreviewImage] = useState(false);
  const [file, setFile] = useState(null);
  // const [totalStar, setTotalStar] = useState(0);

  const handlePost = async (data) => {
    setLoading(true);
    let imagePath = '';
    if (upImg) {
      try {
        const result = await api.post('/service/media/upload', {
          entry: {
            media_path: "review",
            field_id: "image",
            name: file.name,
            type: file.type,
            content: getBase64Image(upImg)
          }
        })
        imagePath = result.data[0].url;
      } catch (error) {
        throw error;
      }
    }
    if (imagePath.length == 0) {
      try {
        const result = await api.post('/service/product/review', {
          product_id: productId,
          review: {
            title: "",
            nickname: data.nickname,
            detail: data.comment,
            quality_rating: currentStar,
            price_rating: currentStar,
            video: ""
          },
          "customerId": null
        });
      } catch (error) {
        throw error
      }
      setLoading(false);
      location.reload();
      return;
    }
    try {
      const result = await api.post('/service/product/review', {
        product_id: productId,
        review: {
          title: "",
          nickname: data.nickname,
          detail: data.comment,
          quality_rating: currentStar,
          price_rating: currentStar,
          image: imagePath,
          video: ""
        },
        "customerId": null
      });
    } catch (error) {
      throw error
    }
    setLoading(false);
    location.reload();
    console.log("Bạn đã gửi comment thành công");
  }

  const handleUploadFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <>
      <div className="pd-15 sec-bd-bottom">
        <h3>Khách hàng nhận xét</h3>
        <div className="comdetail">
          <div className="boxRatingCmt" id="boxRatingCmt">
            <div className="toprt  border-bottom">
              <div className="crt row center">
                <div className="col-4">
                  <div className="lcrt" data-gpa="4.7">
                    <b> {((data.review_summary[0].rating_summary / 20)).toFixed(1)} </b>
                    <span className="ratingresult">
                      <i className="icon-star rated"></i>
                      <i className="icon-star rated"></i>
                      <i className="icon-star rated"></i>
                      <i className="icon-star rated"></i>
                      <i className="icon-star rated"></i>
                    </span>

                    <div>({data.review_summary[0].review_counts} nhận xét)</div>
                  </div>
                </div>
                <VoteTotalMobile data={data.review_summary[0].vote} total={data.review_summary[0].review_counts} />
              </div>
              <div className="bcrt">
                <div>Chọn đánh giá của bạn</div>
                <fieldset className="fieldset-rating">
                  <input  type="radio" id="star-5" name="rating" value="5" onChange={(e) => setStar(e.target.value)} />
                  <label className="full icon-star" htmlFor="star-5" data-toggle="tooltip" title="5 sao"></label>

                  <input  type="radio" id="star-4" name="rating" value="4" onChange={(e) => setStar(e.target.value)} />
                  <label className="full icon-star" htmlFor="star-4" data-toggle="tooltip" title="4 sao"></label>

                  <input  type="radio" id="star-3" name="rating" value="3" onChange={(e) => setStar(e.target.value)} />
                  <label className="full icon-star" htmlFor="star-3" data-toggle="tooltip" title="3 sao"></label>

                  <input  type="radio" id="star-2" name="rating" value="2" onChange={(e) => setStar(e.target.value)} />
                  <label className="full icon-star" htmlFor="star-2" data-toggle="tooltip" title="2 sao"></label>

                  <input  type="radio" id="star-1" name="rating" value="1" onChange={(e) => setStar(e.target.value)} />
                  <label className="full icon-star" htmlFor="star-1" data-toggle="tooltip" title="1 sao"></label>
                </fieldset>
              </div>
            </div>

            {currentStar != 0 && (
              <form className={`form-review ${isLoading ? 'loading' : ''}`} style={{ clear: "both" }} onSubmit={handleSubmit(handlePost)}>

                <textarea className="input" name={"comment"} placeholder={"Hãy điền review của bạn"} ref={register({ required: true })} ></textarea><br /><br />
                <div className="row list-item-10">
                  <div className="col-sm-4">
                    <input  className="input" name={"nickname"} placeholder={"Tên của bạn"} ref={register({ required: true })} />
                  </div>
                  <div className="col-6">
                    <input  type="file" id="star-6" name="rating" style={{ display: "none" }} onChange={handleUploadFile} />
                    <label className="btn" htmlFor="star-6"><i className="icon-t22"></i> Thêm hình ảnh</label>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-4 pull-right">Gửi câu hỏi</button>
                  </div>
                </div>

                {upImg && (
                  <>
                    <div className="list-thumb-comment">
                      <div className="img">
                        <span className="tRes" onClick={() => { setPreviewImage(true) }}><img src={upImg} /></span>
                        <span className="close"><i className="icon-close" onClick={() => { setUpImg(null) }}></i> </span>
                      </div>
                    </div>
                  </>
                )}

              </form>
            )}


            {/* DONE HERE --------------------------- */}

            <ReviewListMobile productId={productId} />

          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerReview