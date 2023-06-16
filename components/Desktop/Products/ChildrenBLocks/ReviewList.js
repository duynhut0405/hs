import React, { useEffect, useState, memo } from 'react';
import api from '../../../../services/api';
import ShowStar from '../../Review/ShowStarReview';
import ReviewComment from './ReviewComment';
import AddCommentForComment from './AddCommentForComment';
import ReactHtmlParser from 'react-html-parser';
import Pagination from 'react-js-pagination';
import convertDateTime from '../../../../utils/convertDateTime';
import checkImageExist from '../../../../utils/checkImageExist';
import { useAuth } from '../../../../contexts/auth';
import { useRouter } from 'next/router';
import ToggleHeightContent from '../../../Core/ToggleHeightContent';

function ReviewList({ productId }) {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState(null);

  useEffect(async () => {
    getData();
  }, [productId]);

  const handleChangePage = (data) => {
    setPage(data);
    getData(data);
  };

  const getData = async (p = 1) => {
    if (productId != null && productId != undefined) {
      try {
        const result = await api.get(`/service/product/reviews/${productId}/limit/5/p/${p}`);
        if (result.status == 200) {
          if (result.data[0]) {
            result.data[0]?.reviews?.map((item) => {
              if (item?.detail?.length > 450) {
                item.viewmore = true;
              } else {
                item.viewmore = false;
              }
            });
            setReviews(result.data[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='list'>
      {reviews && (
        <>
          <ul className='ratingLst'>
            {reviews.reviews &&
              reviews.reviews.map((item, index) => {
                let text = '';
                item.detail.split('\n').map((t) => {
                  if (t !== '') text += `<p>${t}</p>`;
                });
                return (
                  <li key={index}>
                    <div className='rh' key={index}>
                      <span className='b'>{item.nickname}</span>
                      <span className='cl4 '>{convertDateTime(item.created_at)}</span>
                      {item?.is_bought != 0 && (
                        <div className='flex center gap-5'>
                          <img src='/images/svg/tick.svg' alt='' />
                          <span className='rh-bought'>Đã mua hàng</span>
                        </div>
                      )}
                    </div>
                    <div className='rc'>
                      <ShowStar rating={item.votes[item.votes?.length - 1 || 0].percent} />
                      <div style={{ marginBottom: -20 }}>
                        <ToggleHeightContent id={'review' + item.id} height='60' more='left' key={index}>
                          {ReactHtmlParser(text)}
                        </ToggleHeightContent>
                      </div>
                      {/* {item.images && item.images[0] != '' && (
                        <div className='list-thumb-comment'>
                          {item.images.map((item, index) => (
                            <div className='img' key={index}>
                              <span className='tRes'>
                                <img className='lazy-hidden' data-lazy-type='image' data-lazy-src={process.env.DOMAIN_BASE + '/pub/media/review/' + item} src='assets/images/no-image.svg' alt='' onError={async (e) => await checkImageExist(e)} />
                              </span>
                            </div>
                          ))}
                        </div>
                      )} */}
                      <ReviewComment count={Number(item.comment)} reviewId={item.id} />
                    </div>
                  </li>
                );
              })}
          </ul>
          {reviews.count > 0 && (
            <div className='pages'>
              <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={reviews.count}
                pageRangeDisplayed={0}
                innerClass={'page-numbers pagination'}
                linkClass={'page-numbers'}
                hideFirstLastPages={true}
                activeLinkClass={'page-numbers current  active'}
                onChange={handleChangePage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReviewList;
