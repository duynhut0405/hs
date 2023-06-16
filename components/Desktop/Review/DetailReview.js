import React, { useEffect, useState } from 'react';
import ShowStar from '../Review/ShowStar';
import checkImageExist from '../../../utils/checkImageExist';
import dynamic from 'next/dynamic';
import { Modal } from 'react-bootstrap';
import ReviewBlock from '../Products/ChildrenBLocks/ReviewBlock';
import Link from 'next/link';
import ToggleHeightContent from '../../Core/ToggleHeightContent';
import dayjs from 'dayjs';

function DetailReview({ data, page, type, cb, index, allow }) {
  const today = dayjs(new Date());
  const createDate = dayjs(data?.created_at).add(allow, 'day');
  const canEditReview = createDate?.isAfter(today);

  const [star, setStar] = useState(null);
  const [open, setOpen] = useState(false);
  const [isPreviewImage, setPreviewImage] = useState(false);
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (data) {
      const vote = JSON.parse(JSON.stringify(data))
        ?.votes?.reverse()
        ?.find((item) => item.rating_code === 'Quality');
      if (vote?.percent) setStar(Number(vote?.percent));
    }
    const link = (process.env.DOMAIN_PRODUCT + (data?.image || data?.product_image)).replace('product//', 'product/');
    setImg(link);
  }, [data]);

  return data ? (
    <div className='item'>
      <Link href={'/product/' + data?.url_key}>
        <a className='img tRes_68 cursor-pointer'>
          <img src={img} alt={'/images/hoasen-product.jpg'} onError={async (e) => await checkImageExist(e)} />
        </a>
      </Link>
      <div className='divtext'>
        <div className='d-flex align-item-center justify-between mb-10'>
          <Link href={'/product/' + data?.url_key}>
            <a>
              <strong className='cursor-pointer'>{data.product_name}</strong>
            </a>
          </Link>

          {canEditReview ? (
            <div className='d-flex align-item-center gap-8 cursor-pointer' onClick={() => setOpen(true)}>
              <img src={'/images/svg/edit.svg'} alt='' style={{ width: 20 }} />
              <span className='red2 fs16'>Sửa</span>
            </div>
          ) : null}
        </div>
        {star && type !== 1 && (
          <div className='ratingresult'>
            <ShowStar rating={star} />
            <span className='cl-date ml-10'>{data?.created_at}</span>
          </div>
        )}
        <div style={{ marginBottom: -30 }}>
          <ToggleHeightContent id={'tabreview' + data?.created_at + type + (page * 5 + index)} height='60' more='left' key={'tabreview' + data?.created_at + type + (page * 5 + index)}>
            {data?.detail && <p className='grey-p fs14 mt-10'>{data?.detail}</p>}
          </ToggleHeightContent>
        </div>

        {/* {data?.images?.[0] ? (
          <div className='list-thumb-comment'>
            <div className='img'>
              <span
                className='tRes'
                onClick={() => {
                  setPreviewImage(true);
                }}
              >
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
      </div>
      <Modal size='lg' centered show={open} onHide={() => setOpen(false)}>
        <div style={{ padding: 20 }}>
          <h3 className='red2'>KHÁCH HÀNG NHẬN XÉT</h3>
          <div className='d-flex align-canter column' style={{ padding: 20, backgroundColor: '#F5F5F5', borderRadius: 10 }}>
            <strong>{data.product_name}</strong>
            <p className='mb-0' style={{ overflow: 'hidden', overflowX: 'auto' }}>
              {data.detail}
            </p>
          </div>
          <ReviewBlock
            data={data}
            cb={() => {
              cb && cb();
              setOpen(false);
            }}
            productId={data?.product_id}
            order_id={data?.order_id}
            isModal={true}
            isEdit={true}
          />
        </div>
      </Modal>
    </div>
  ) : null;
}

export default DetailReview;
