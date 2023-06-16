import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';
import Pagination from 'react-js-pagination';
import ReactHtmlParser from 'react-html-parser';
import AddCommentForComment from './AddCommentForComment';
import ToggleHeightContent from '../../../Core/ToggleHeightContent';

function ReviewComment({ reviewId, count }) {
  const [page, setPage] = useState(1);
  const [commentData, setCommentData] = useState(null);

  useEffect(async () => {
    if (count > 0) {
      getData();
    }
  }, [reviewId]);

  const getData = async (p = 1) => {
    try {
      const result = await api.get(`service/product/review/comments/${reviewId}/p/${p}`);
      if (!result.data[0].error) {
        setCommentData(result.data[0].data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChangePage = (data) => {
    setPage(data);
    getData(data);
  };

  const _renderComment = (isAdmin, content, name, time, index) => {
    let text = '';
    content.split('\n').map((t) => {
      if (t !== '') text += `<p>${t}</p>`;
    });
    return (
      <div className='child ml-27'>
        <div className={`rh mb-5`}>
          {isAdmin && <img src={'/Logo-Hoa-Sen.svg'} alt='logo' style={{ width: 25 }} />}
          <span className={`b ${isAdmin && 'red2'}`}>{isAdmin ? 'Hoa Sen Home' : name}</span>
          <span className=''>{time?.split(', ')[1]}</span>
        </div>
        <div className='rc'>
          <div style={{ marginBottom: -30 }}>
            <ToggleHeightContent id={'cmt' + time + (page * 5 + index)} height='60' more='left' key={'cmt' + time + (page * 5 + index)}>
              {ReactHtmlParser(text)}
            </ToggleHeightContent>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <AddCommentForComment getAgain={() => getData(page)} count={count} reviewId={reviewId} />
      {commentData &&
        commentData.comments.map((item, index) => {
          const check = item.type === 'admin_comment';
          const checkAdminReply = item?.admin_reply_id;
          return (
            <div key={index}>
              {_renderComment(check, item.content, item.post_by, !check ? item?.created_at : item?.replied_at, index)}
              <div className='ml-27'>{checkAdminReply && _renderComment(true, item.reply, checkAdminReply, item?.replied_at, index)}</div>
            </div>
          );
        })}
      {count > 5 && (
        <div className='pages'>
          <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={parseInt(count)}
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
  );
}

export default ReviewComment;
