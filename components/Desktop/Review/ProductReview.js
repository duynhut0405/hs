import React, { useEffect, useState } from 'react';
import ShowStar from '../Review/ShowStar';
import Link from 'next/link';
import checkImageExist from '../../../utils/checkImageExist';
import Modal from 'react-bootstrap/Modal';
import ReviewBlock from '../Products/ChildrenBLocks/ReviewBlock';
import ToggleHeightContent from '../../Core/ToggleHeightContent';

function ProductReview({ data, type, cb, index, page }) {
  const [star, setStar] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (data) {
      const vote = JSON.parse(JSON.stringify(data))
        ?.votes?.reverse()
        ?.find((item) => item.rating_code === 'Quality');
      if (vote?.percent) setStar(Number(vote?.percent));
    }
  }, [data]);
  return (
    data && (
      <>
        <div className='item'>
          <Link href={'/product/' + data?.url_key}>
            <a className='img tRes_68 cursor-pointer'>
              <img src={(process.env.DOMAIN_PRODUCT + (data?.image || data?.product_image)).replace('product//', 'product/')} alt={'/images/hoasen-product.jpg'} onError={async (e) => await checkImageExist(e)} />
            </a>
          </Link>
          <div className='divtext'>
            <h3 className='line-3 title cursor-pointer'>
              <Link href={'/product/' + data?.url_key}>
                <a>
                  <strong>{data?.product_name || data?.name}</strong>
                </a>
              </Link>
            </h3>
            {star && type !== 1 && (
              <div className='ratingresult'>
                <ShowStar rating={star} />
                <span className='cl-date ml-10'>{data?.created_at}</span>
              </div>
            )}
            {data?.detail && (
              <div style={{ marginBottom: -20 }}>
                <ToggleHeightContent id={'tabreview' + data?.created_at + type + (page * 5 + index)} height='60' more='left' key={'tabreview' + data?.created_at + type + (page * 5 + index)}>
                  <p className='grey-p fs14'>{data?.detail}</p>
                </ToggleHeightContent>
              </div>
            )}
            {/* {data?.images?.length > 0 ? (
              <div className='list-thumb-comment'>
                <div className='img'>
                  <span className='tRes'>
                    <img
                      src={(process.env.DOMAIN_BASE + '/pub/media/review/' + data?.images?.[0]).replace('product//', 'product/')}
                      onError={async (e) => {
                        return await checkImageExist(e);
                      }}
                    />
                  </span>
                </div>
              </div>
            ) : null} */}
            {type === 1 && (
              <button className='btn btn-4 pull-right' style={{ marginTop: 60 }} onClick={() => setOpen(true)}>
                Đánh giá ngay
              </button>
            )}
          </div>
          <Modal size='lg' centered show={open} onHide={() => setOpen(false)}>
            <div style={{ padding: 20 }}>
              <h3 className='red2'>KHÁCH HÀNG NHẬN XÉT</h3>
              <div style={{ padding: 20, backgroundColor: '#F5F5F5', borderRadius: 10 }}>
                <strong>{data?.name}</strong>
              </div>
              <ReviewBlock
                cb={() => {
                  cb && cb();
                  setOpen(false);
                }}
                productId={data?.id}
                order_id={data?.order_id}
                isModal={true}
              />
            </div>
          </Modal>
        </div>
      </>
    )
  );
}

export default ProductReview;
