import { forwardRef } from 'react';

const SelectStart = forwardRef(({ onSetStart, star }, ref) => {
  return (
    <>
      <div>Chọn đánh giá của bạn</div>
      <form ref={ref} className='d-flex center'>
        <fieldset className='fieldset-rating'>
          <input defaultChecked={star === '5'} type='radio' id='star-5' name='rating' value='5' onChange={onSetStart} />
          <label className='full icon-star' htmlFor='star-5' data-toggle='tooltip' title='5 sao'></label>

          <input defaultChecked={star === '4'} type='radio' id='star-4' name='rating' value='4' onChange={onSetStart} />
          <label className='full icon-star' htmlFor='star-4' data-toggle='tooltip' title='4 sao'></label>

          <input defaultChecked={star === '3'} type='radio' id='star-3' name='rating' value='3' onChange={onSetStart} />
          <label className='full icon-star' htmlFor='star-3' data-toggle='tooltip' title='3 sao'></label>

          <input defaultChecked={star === '2'} type='radio' id='star-2' name='rating' value='2' onChange={onSetStart} />
          <label className='full icon-star' htmlFor='star-2' data-toggle='tooltip' title='2 sao'></label>

          <input defaultChecked={star === '1'} type='radio' id='star-1' name='rating' value='1' onChange={onSetStart} />
          <label className='full icon-star' htmlFor='star-1' data-toggle='tooltip' title='1 sao'></label>
        </fieldset>
      </form>
    </>
  );
});

export default SelectStart;
