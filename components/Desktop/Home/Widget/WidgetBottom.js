import React from 'react';
import t from '../../../../translation';
import Link from 'next/link';

const listToolKey = [1, 2, 3];
const listUrl = ['/tools/ton', '/tools', '/tools/gach'];
const listImage = ['/images/ton-small.jpg', '/images/son-ngoai-that-small.jpg', '/images/gach-small.jpg'];
const listBeautyImage = ['/images/ton.jpg', '/images/son-ngoai-that.jpg', '/images/gach.jpg'];

function WidgetBottom({ data }) {
  return (
    <div className='widget list-b-1 flex1'>
      {/* {data && listToolKey.map((item, index) => (
          <div className="witem " key={index}>
          <Link href={listUrl[index]} prefetch={false}>
              <a className="item tRes_30" href="#">
                <img  className="lazy-hidden" data-lazy-type="image" data-lazy-src={`${listBeautyImage[index]}`} src={`${listImage[index]}`}  alt={data[item].alt}/>
                <div className="divtext"> 
                  <div className="title">
                    {item == 1 && 'Công cụ thay đổi mái'}
                    {item == 2 && 'Tự phối màu sơn'}
                    {item == 3 && 'Lựa chọn gạch cho nhà bạn'}
                  </div>
                </div>
              </a>
          </Link>
          </div>
        ))} */}
      <a className='item tRes_30 ' href='https://s6.h3d.app' target='_blank' rel='noopener noreferrer' style={{ height: '100%' }}>
        <img src={'/Ngoai-that-Hoa-sen/Ngoai-that-04/5.png'} alt='' style={{ height: '100%' }} />
        <div className='divtext'>
          <div className='title'>{'Trải nghiệm nhà mẫu 3D'}</div>
        </div>
      </a>
    </div>
  );
}

export default WidgetBottom;
