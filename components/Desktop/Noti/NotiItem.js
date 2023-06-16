import React, { useState } from 'react';
import Link from 'next/link';
import checkImageExist from '../../../utils/checkImageExist';
import api from '../../../services/api';
import { useRouter } from 'next/router';
import convertDateTime from '../../../utils/convertDateTime';
import ReactHtmlParser from 'react-html-parser';
function NotiItem({ data }) {
  const router = useRouter();

  const setIsRead = async () => {
    api.defaults.headers.Authorization = 'bearer dxxfgvmg8dps2af7m0soo7iyehfx8d23';
    const result = await api.post('notification/markNotificationAsRead', { notificationId: data.id });
    if ((result.status = 200)) {
      try {
        if (!data.data_url.includes('https://')) {
          window.location.href = process.env.URL_NOTIFICATION + data.data_url;
          return;
        }

        if (!data.data_url) {
          window.location.href = process.env.URL_NOTIFICATION;
          return;
        }

        window.location.href = data.data_url;
      } catch (err) {
        window.location.href = process.env.URL_NOTIFICATION + 'account/notification';
      }
    }
  };

  return (
    <div className={`item ${data.is_read !== '1' ? 'isRead' : ''}`}>
      <div onClick={() => setIsRead()}>
        <a className='img tRes_68 btnlike img-small-noti'>
          <img style={{}} src={data.notification_thumbnail ? data.notification_thumbnail : 'https://hoasenhome.vn/images/logo.png'} onError={async (e) => await checkImageExist(e)}></img>
        </a>
      </div>

      <div className='divtext'>
        <div className='line-3 title'>
          <div onClick={() => setIsRead()}>
            <a className={`b btnlike`}>{data.message_title}</a>
          </div>
        </div>
        <div className='price'>
          <div onClick={() => setIsRead()}>
            <a className='btnlike'>
              <div className='line-3'>{ReactHtmlParser(data.message_body)}</div>
            </a>
          </div>
        </div>
        <div className='action'>
          <div onClick={() => setIsRead()}>
            <a className='noti-text-date btnlike'>{convertDateTime(data.created_at, 'DD/MM/YYYY HH:mm')}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotiItem;
