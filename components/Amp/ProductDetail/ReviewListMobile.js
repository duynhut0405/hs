import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import ShowStar from '../../Desktop/Review/ShowStarReview'
import ReviewComment from './../../Desktop/Products/ChildrenBLocks/ReviewComment'
import AddCommentForComment from './../../Desktop/Products/ChildrenBLocks/AddCommentForComment'
import ReactHtmlParser from 'react-html-parser';
import Pagination from "react-js-pagination";
import convertDateTime from '../../../utils/convertDateTime'

function ReviewListMobile({ productId }) {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState(null);
  useEffect(async () => {
    if (productId != null && productId != undefined) {
      try {
        const result = await api.get(`/service/product/reviews/${productId}/p/${page}`);
        if (result.status == 200) {
          setReviews(result.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [productId, page])

  const renderStar = (rating) => {
    const number = Math.ceil((rating / 100) * process.env.MAX_NUMBER);
    const item = [];
    for (let i = 0; i < number; i++) {
      item.push(<i className="icon-star rated" style={{ marginRight: "2px" }} key={i}></i>);
    }
    if (number < 5) {
      for (let i = number; i < 5; i++) {
        item.push(<i className="icon-star" style={{ marginRight: "2px" }} key={i}></i>);
      }
    }
    return item;
  }

  return (
    <div className="list">
      {reviews && (
        <>
          <ul className="ratingLst">
            {reviews.reviews && reviews.reviews.map((item, index) => (
              <li id="" className="par" key={index}>
                <div className="rh" key={index}>
                  <span className="b">{item.nickname}</span> <span className="cl4 ">- {convertDateTime(item.created_at)}</span>
                </div>
                <div className="rc">
                  <ShowStar rating={item.votes[0].percent} />
                  {/* <span className="ratingresult">
                    {renderStar(item.votes[0].percent)}
                  </span> */}
                  <p>
                    {ReactHtmlParser(item.detail.replace(/\n/g, '<br />'))}
                  </p>
                  {item.images && (item.images[0] != '') && (
                    <div className="list-thumb-comment">
                      {item.images.map((item, index) => (
                        <div className="img" key={index}>
                          <span className="tRes">
                            <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item} src="assets/images/no-image.svg" alt="" />
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <AddCommentForComment reviewId={item.id} />
                  {item.comment != 0 && (
                    <ReviewComment reviewId={item.id} commentTotal={item.comment} />
                  )}
                </div>
              </li>
            ))}

          </ul>
          {reviews.count > 0 && (
            <div className="pages">
              <Pagination
                activePage={page}
                // itemsCountPerPage={5}
                totalItemsCount={reviews.count}
                pageRangeDisplayed={0}
                innerClass={'page-numbers pagination'}
                linkClass={'page-numbers'}
                hideFirstLastPages={true}
                activeLinkClass={'page-numbers current  active'}
                onChange={setPage.bind(this)}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ReviewListMobile