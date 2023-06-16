import React, { useState, useEffect } from 'react';
import t from '../../../../translation';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';

import ToggleHeightContent from '../../../../components/Core/ToggleHeightContent';

function Description({ data }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('description');

  useEffect(async () => {
    let hasDes = false;
    data.forEach((element) => {
      if (element.attribute_code == 'description') {
        hasDes = true;
        return;
      }
    });
    if (!hasDes) {
      setActiveTab('specification');
    }
  }, []);
  const replaceURL = (url) => {
    let replace = process.env.DOMAIN_BASE + '/pub/media';
    let re = new RegExp(replace, 'g');
    let handleURL = url.replace(/{{media url=&quot;/g, 'https://cdn.hoasenhome.vn/');
    handleURL = handleURL.replace(re, 'https://cdn.hoasenhome.vn');
    handleURL = handleURL.replace(/&quot;}}/g, '');
    return handleURL;
  };
  return (
    <div className='box-shadow pd-20 entry-content'>
      <div className='wtabs-2'>
        <div className='menu-tabs'>
          {data.map((values, index) => {
            if (values.attribute_code !== null) {
              switch (values.attribute_code) {
                case 'description':
                  return (
                    <div className={`menu-tab h6 ${activeTab == 'description' ? 'active' : ''}`} key={index} onClick={() => setActiveTab('description')}>
                      {t('description')}
                    </div>
                  );
                case 'specification':
                  return (
                    <div className={`menu-tab h6 ${activeTab == 'specification' ? 'active' : ''}`} key={index} onClick={() => setActiveTab('specification')}>
                      {t('specification')}
                    </div>
                  );
                case 'warranty':
                  return (
                    <div className={`menu-tab h6 ${activeTab == 'warranty' ? 'active' : ''}`} key={index} onClick={() => setActiveTab('warranty')}>
                      Chế độ bảo hành
                    </div>
                  );
                case 'instruction':
                  return (
                    <div className={`menu-tab h6 ${activeTab == 'instruction' ? 'active' : ''}`} key={index} onClick={() => setActiveTab('instruction')}>
                      Hướng dẫn sử dụng
                    </div>
                  );
                default:
                  return null;
              }
            } else {
              return null;
            }
          })}
        </div>

        {data.map((values, index) => {
          if (values.attribute_code !== null) {
            switch (values.attribute_code) {
              case 'description':
                return (
                  <div key={index}>
                    {activeTab == 'description' && (
                      <ToggleHeightContent id='description' height='360'>
                        {ReactHtmlParser(replaceURL(values.value))}
                      </ToggleHeightContent>
                    )}
                  </div>
                );
              case 'specification':
                return (
                  <div key={index}>
                    {activeTab == 'specification' && (
                      <ToggleHeightContent id='specification' height='360'>
                        {ReactHtmlParser(replaceURL(values.value))}
                      </ToggleHeightContent>
                    )}
                  </div>
                );
              case 'warranty':
                return (
                  <div key={index}>
                    {activeTab == 'warranty' && (
                      <ToggleHeightContent id='description' height='360'>
                        {ReactHtmlParser(replaceURL(values.value))}
                      </ToggleHeightContent>
                    )}
                  </div>
                );
              case 'instruction':
                return (
                  <div key={index}>
                    {activeTab == 'instruction' && (
                      <ToggleHeightContent id='instruction' height='360'>
                        {ReactHtmlParser(replaceURL(values.value))}
                      </ToggleHeightContent>
                    )}
                  </div>
                );
              default:
                return null;
            }
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default Description;
