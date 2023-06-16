import React, { useEffect, useState } from 'react';
import t from '../../../translation';
import Link from 'next/link';
import StripHtmlTag from '../../../utils/stripHtmlTag';
import NormalCarosel from '../../Desktop/Carosels/NormalCarosel';
import Image from 'next/image';

function SectionBannerMobile({ banners, menu }) {
  const [display, setDisplay] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayCarosel, setDisplayCarosel] = useState(false);
  const [fakeBanner, setFakeBanner] = useState([banners[0]]);

  useEffect(async () => {
    await setTimeout(() => {
      setFakeBanner(banners);
    }, 4000);
  }, []);

  // var menu1 = menu.slice(0, 9);
  var item_count = menu.length;
  var first_cataglog_line = 0;
  if (item_count % 2 !== 0) {
    first_cataglog_line = item_count / 2 + 1;
  } else {
    first_cataglog_line = item_count / 2;
  }
  var ctl_list = [];
  var ctl1 = menu.slice(0, first_cataglog_line);
  var ctl2 = menu.slice(first_cataglog_line);
  for (var i = 0; i < ctl1.length; i++) {
    let col = [];
    col.push(ctl1[i]);
    if (ctl2[i]) col.push(ctl2[i]);

    ctl_list.push(col);
  }

  const setting = {
    className: 'banner-home  ',
    arrows: false,
    lazyLoad: false,
    dots: true,
    slidesToShow: 1,
    infinite: true,
    slidesToScroll: 1,
  };

  return (
    <section className=' sec-h-1 sec-b sec-bd-bottom' style={{ height: '569px' }}>
      <div className='container'>
        <div style={{ height: '275px' }}>
          <NormalCarosel setting={setting}>
            {fakeBanner.map((item, index) => (
              <div style={{ padding: '30px' }} className={`content-tab ${index == activeIndex ? 'active' : ''}`} data-actab-group='0' data-actab-id={index + 1} key={index}>
                <Link href={item.click_url ? item.click_url : '#'} key={index} prefetch={false}>
                  <a href={item.click_url ? item.click_url : '#'}>
                    <Image placeholder='blur' quality={30} priority={fakeBanner.length < 1} loading={index == 0 ? 'eager' : 'lazy'} height={188} width={399} src={`${process.env.DOMAIN_IMAGE + item.image}`} alt={item?.name} />
                  </a>
                </Link>
                <h2 className='desc text-center'>{StripHtmlTag(item.caption)}</h2>
              </div>
            ))}
          </NormalCarosel>
        </div>

        <div className='entry-head ef ef-tx-t loaded'>
          <h2 className='ht'>{t('categories_title')}</h2>
        </div>
        <div style={{ height: '226px' }} className='list-scroll-74   list-b-2  group-ef loaded' onScroll={() => setDisplay(true)}>
          {ctl_list.map((item, index) => {
            if (item[1]) {
              if (index > 4 && !display) {
                return (
                  <div className={`items efch-${index} ef-img-t`} key={index}>
                    <Link href={item[0].additional_data ? '/' + item[0].additional_data.request_path.replace('.html', '') : '/'} prefetch={false}>
                      <a className=''>
                        <Image height={'64px'} width={'64px'} src={'/images/no-image.svg'} alt='' />
                        <div className='title line-2'> {item[0].name} </div>
                      </a>
                    </Link>
                    <Link href={item[1].additional_data ? '/' + item[1].additional_data.request_path.replace('.html', '') : '/'} prefetch={false}>
                      <a className=''>
                        <Image height={'64px'} width={'64px'} src={'/images/no-image.svg'} alt='' />
                        <div className='title line-2'> {item[1].name} </div>
                      </a>
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div className={`items efch-${index} ef-img-t`} key={index}>
                    <Link href={item[0].additional_data ? '/' + item[0].additional_data.request_path.replace('.html', '') : '/'} prefetch={false}>
                      <a className=''>
                        <Image height={'64px'} width={'64px'} src={item[0].additional_data ? item[0].additional_data.thumbnail_image : '/images/no-image.svg'} alt='' />
                        <div className='title line-2'> {item[0].name} </div>
                      </a>
                    </Link>
                    <Link href={item[1].additional_data ? '/' + item[1].additional_data.request_path.replace('.html', '') : '/'} prefetch={false}>
                      <a className=''>
                        <Image height={'64px'} width={'64px'} src={item[1].additional_data ? item[1].additional_data.thumbnail_image : '/images/no-image.svg'} alt='' />
                        <div className='title line-2'> {item[1].name} </div>
                      </a>
                    </Link>
                  </div>
                );
              }
            } else {
              if (index > 4 && !display) {
                return (
                  <div className={`items efch-${index} ef-img-t`} key={index}>
                    <Link href={item[0].additional_data ? '/' + item[0].additional_data.request_path.replace('.html', '') : '/'} prefetch={false}>
                      <a className=''>
                        <Image height={'64px'} width={'64px'} src={'/images/no-image.svg'} alt='' />
                        <div className='title line-2'> {item[0].name} </div>
                      </a>
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div className={`items efch-${index} ef-img-t`} key={index}>
                    <Link href={item[0].additional_data ? '/' + item[0].additional_data.request_path.replace('.html', '') : '/'} prefetch={false}>
                      <a className=''>
                        <Image height={'64px'} width={'64px'} src={item[0].additional_data ? item[0].additional_data.thumbnail_image : '/images/no-image.svg'} alt='' />
                        <div className='title line-2'> {item[0].name} </div>
                      </a>
                    </Link>
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </section>
  );
}

export default SectionBannerMobile;
