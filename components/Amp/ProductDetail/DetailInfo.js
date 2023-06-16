import React, { useEffect, useState } from 'react'
import t from '../../../translation'
import ReactHtmlParser from 'react-html-parser';
// import Description from './ChildrenBLocks/Description'
import Description from '../../Desktop/Products/ChildrenBLocks/Description'
import ReviewBlock from '../../Desktop/Products/ChildrenBLocks/ReviewBlock'
import {useRouter} from 'next/router'


function DetailInfo({ data, extensionAttributes, productId, commonData, brand, category }) {
  const router = useRouter();
  const [showDes, setShowDes] = useState(true);
  const [descViewMore, setDescViewMore] = useState(false);

  const [activeTab, setActiveTab] = useState('1'); 



  useEffect(() => {
    let des = document.getElementById('toogle_description');
      if (des && des.offsetHeight > 300) {
        setDescViewMore(true);
      }
  }, [router.asPath])

  return (
    <>
      {/* {showDes && ( */}

    <div className="pd-15">

        <ul className="accordion-menu">


      {data.map(
        (values, index) => {
          if (values.attribute_code !== null) {
            switch (values.attribute_code) {
              case 'description':
                return (
                  <li >
                    <input className="full"  type="checkbox"  /><div className="showsubmenu icon-arrow-1 ib"></div>
                    <div className="item-menu" >{t("description")}</div>
                    <ul >
                      <li className="pd-15">
                        <div className="toggleAutoHeightCss mb-30" id="toogle_description" key={index}>
                          <input  checked={!descViewMore} type="checkbox" id={`toggleAutoHeightCss-description`}/>
                          {descViewMore && (
                            <label className="tgh-toggle" htmlFor="toggleAutoHeightCss-description">
                              <span className="m"> {t('view_more_detail')}</span>
                              <span className="l"> {t('view_less_detail')}</span>
                              <i className="icon-arrow-2 ib"></i>
                            </label>
                          )}
                          <div className="tgh-content">
                            {ReactHtmlParser(values.value)}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                )
              case 'specification':
                return (
                  <li>
                    <input  className="full" type="checkbox"  /><div className="showsubmenu icon-arrow-1 ib"></div>
                    <div className="item-menu" >{t("specification")}</div>
                    <ul >
                      <li className="pd-15">
                        <div className="toggleAutoHeightCss mb-30" key={index}>
                          <input  type="checkbox" id="toggleAutoHeightCss-specification" />
                          <label className="tgh-toggle" htmlFor="toggleAutoHeightCss-specification">
                            <span className="m"> {t('view_more_detail')}</span>
                            <span className="l"> {t('view_less_detail')}</span>
                            <i className="icon-arrow-2 ib"></i>
                          </label>
                          <div className="tgh-content">
                            {ReactHtmlParser(values.value)}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                )
              case 'catalogue':
                return (
                  <li>
                    <input  className="full" type="checkbox"  /><div className="showsubmenu icon-arrow-1 ib"></div>
                    <div className="item-menu" >Catalogue</div>
                    <ul >
                      <li className="pd-15">
                        <div className="toggleAutoHeightCss mb-30" key={index}>
                          <input  type="checkbox" id="toggleAutoHeightCss-catalogue" />
                          <label className="tgh-toggle" htmlFor="toggleAutoHeightCss-catalogue">
                            <span className="m"> {t('view_more_detail')}</span>
                            <span className="l"> {t('view_less_detail')}</span>
                            <i className="icon-arrow-2 ib"></i>
                          </label>
                          <div className="tgh-content">
                            {ReactHtmlParser(values.value)}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  )
              case 'typical_projects':
                return (
                  <li>
                    <input  className="full" type="checkbox"  /><div className="showsubmenu icon-arrow-1 ib"></div>
                    <div className="item-menu" >{t("typical_projects")}</div>
                    <ul >
                      <li className="pd-15">
                        <div className="toggleAutoHeightCss mb-30" key={index}>
                          <input  type="checkbox" id="toggleAutoHeightCss-typical_projects" />
                          <label className="tgh-toggle" htmlFor="toggleAutoHeightCss-typical_projects">
                            <span className="m"> {t('view_more_detail')}</span>
                            <span className="l"> {t('view_less_detail')}</span>
                            <i className="icon-arrow-2 ib"></i>
                          </label>
                          <div className="tgh-content">
                            {ReactHtmlParser(values.value)}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  )
              default:
                return null;
            }
          } else {
            return null;
          }
        }
      )}

      </ul>
      

      
    </div>




    </>
  )
}

export default DetailInfo