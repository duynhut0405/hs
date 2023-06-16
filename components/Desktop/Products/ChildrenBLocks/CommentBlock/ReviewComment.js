import React, { useEffect, useState, memo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Pagination from 'react-js-pagination';
import ToggleHeightContent from '../../../../Core/ToggleHeightContent';
import api from '../../../../../services/api';
import convertDateTime from '../../../../../utils/convertDateTime';

function ReviewComment({ productId }) {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState(null);
  const [total, setTotal] = useState(0);
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
        const result = await api.get(`/review/product/comment/${productId}/p/${p}/limit/5`);
        if (result.status == 200) {
          setReviews(result?.data?.comments);
          setTotal(result?.data?.total);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const _renderComment = (isAdmin, content, name, time, index) => {
    let text = '';
    content.split('\n').map((t) => {
      if (t !== '') text += `<p>${t}</p>`;
    });
    return (
      <div className={isAdmin ? 'child' : ''}>
        <div className={`rh mb-10`}>
          {isAdmin && <img src={'/Logo-Hoa-Sen.svg'} alt='logo' style={{ width: 25 }} />}
          <span className={`b ${isAdmin && 'red2'}`}>{isAdmin ? 'Hoa Sen Home' : name}</span>
          <span className='cl4'>{convertDateTime(time)}</span>
        </div>
        <div className='rc'>
          <div style={{ marginBottom: -20 }}>
            <ToggleHeightContent id={'cmt' + productId + page + index + (isAdmin ? '1' : '0')} height='60' more='left' key={index}>
              {ReactHtmlParser(text)}
            </ToggleHeightContent>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='list'>
      {reviews ? (
        <>
          <ul className='ratingLst'>
            {reviews.map((item, index) => {
              const checkAdminReply = item?.reply;
              return (
                <li className='par'>
                  <div key={index}>
                    {_renderComment(false, item.content, item.post_by, item?.created_at, index)}
                    <div className='ml-27'>{checkAdminReply && _renderComment(true, item.reply, checkAdminReply, item?.replied_at, index)}</div>
                  </div>
                </li>
              );
            })}
          </ul>
          {total > 0 && (
            <div className='pages'>
              <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={total}
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
      ) : (
        <div className='flex center mt-10'>
          <p>Chưa có bình luận nào</p>
        </div>
      )}
    </div>
  );
}

export default ReviewComment;
