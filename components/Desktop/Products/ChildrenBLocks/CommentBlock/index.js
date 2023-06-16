import React, { useEffect, useRef, useState } from 'react';
import ReviewComment from './ReviewComment';
import FormComment from './FormComment';
import { isMobile, isTablet } from 'react-device-detect';

function CommentBlock({ productId }) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMobile(isMobile && !isTablet);
  }, []);
  return (
    <>
      <h3>THẢO LUẬN</h3>
      <div className={'box-shadow mb-40'}>
        <div className='comdetail'>
          <div className='boxRatingCmt' id='boxRatingCmt'>
            <div className='toprt pd-20'>
              <FormComment productId={productId} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${mobile ? '' : 'box-shadow'} mb-40`}>
        <div className='comdetail'>
          <div className='boxRatingCmt' id='boxRatingCmt'>
            {productId && <ReviewComment productId={productId} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentBlock;
