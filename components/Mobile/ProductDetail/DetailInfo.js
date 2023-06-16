import React, { useEffect, useState } from 'react';
import t from '../../../translation';
import ReactHtmlParser from 'react-html-parser';

import ToggleHeightContent from '../../Core/ToggleHeightContent';

import { useRouter } from 'next/router';

function DetailInfo({ data, extensionAttributes, productId, commonData, brand, category }) {
  const router = useRouter();
  const [showDes, setShowDes] = useState(true);

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
    let handleURL = url.replace(/{{media url=&quot;/g, 'https://cdn.hoasenhome.vn/');
    handleURL = handleURL.replace(/admin-hoasen.mangoads.com.vn\/pub\/media\//g, 'cdn.hoasenhome.vn/');
    handleURL = handleURL.replace(/&quot;}}/g, '');
    return handleURL;
  };
  return (
    <>
      {/* {showDes && ( */}
      <div className='wtabs-2 sec-bd-bottom'>
        <div className='menu-tabs menu-tabs-custom'>
          {showDes &&
            data &&
            data.map((values, index) => {
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
        <div className='pd-15'>
          {data.map((values, index) => {
            if (values.attribute_code !== null) {
              switch (values.attribute_code) {
                case 'description':
                  return (
                    <>
                      {activeTab == 'description' && (
                        <ToggleHeightContent id='description' height='360' key={index}>
                          {ReactHtmlParser(replaceURL(values.value))}
                        </ToggleHeightContent>
                      )}
                    </>
                  );
                case 'specification':
                  return (
                    <>
                      {activeTab == 'specification' && (
                        <ToggleHeightContent id='specification' height='360' key={index}>
                          {ReactHtmlParser(replaceURL(values.value))}
                        </ToggleHeightContent>
                      )}
                    </>
                  );
                case 'warranty':
                  return (
                    <>
                      {activeTab == 'warranty' && (
                        <ToggleHeightContent id='description' height='360' key={index}>
                          {ReactHtmlParser(replaceURL(values.value))}
                        </ToggleHeightContent>
                      )}
                    </>
                  );
                case 'instruction':
                  return (
                    <>
                      {activeTab == 'instruction' && (
                        <ToggleHeightContent id='instruction' height='360' key={index}>
                          {ReactHtmlParser(replaceURL(values.value))}
                        </ToggleHeightContent>
                      )}
                    </>
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
      {/* )} */}
    </>
  );
}

export default DetailInfo;
