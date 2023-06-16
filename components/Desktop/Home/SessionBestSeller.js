import React, { ReactNode, useEffect, useState } from 'react';
import t from '../../../translation';
import Product from '../ProductBox/Product';
import Link from 'next/link';

function SessionBestSeller({ data, config, poistion }) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (data.link) {
      setUrl(data.link);
    }
  }, [data]);
  return (
    <>
      {data.details != undefined && data.details?.length > 0 ? (
        <section className={`sec-h-3 sec-b  lazy-hidden group-ef`}>
          <div className='container'>
            <div className={`entry-head lazy-hidden group-ef ef-tx-t center ${data.title === 'DEAL SỐC MỖI TUẦN' ? 'flex' : ''}`}>
              {data.title === 'DEAL SỐC MỖI TUẦN' ? <img style={{ objectFit: 'contain' }} width={500} height={50} src='images/deal.png' alt='icon' /> : <h2 className='ht'>{data.title}</h2>}

              {url && (
                <Link href={url.replace('.html', '')}>
                  <a href={url.replace('.html', '')} className='viewall'>
                    Xem tất cả danh mục sản phẩm <i className='icon-arrow-2'></i>
                  </a>
                </Link>
              )}
            </div>
            <div className='row list-item list-p-1'>
              {data.details != undefined &&
                data.details.map((item, index) => (
                  <div className={`col-md-2 col-4 efch-${index + 1} ef-tx-t`} key={index}>
                    <Product data={item} config={config} />
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

export default SessionBestSeller;
