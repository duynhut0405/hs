import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import t from '../../../translation'

const propTypes = {
  data: PropTypes.array
};

function BreadCrumb({ data }) {
  return (
    <>
      {data !== undefined && (
        <div className="entry-breadcrumb">
          <div className="container">
            <ol className="breadcrumbs" itemScope itemType="#">
              <li itemProp="itemListElement" itemScope
                  itemType="/">
                <Link href="/">
                  <a itemProp="item"><span itemProp="name">{t('Home')}</span></a>
                </Link>

                <meta itemProp="position" content="1" />
              </li>
              {data.map((item, index) => (
                <li itemProp="itemListElement" itemScope
                itemType="#" key={index}>
                  {item.isActive ? (
                    <strong>{item.name}</strong>
                  ) : (
                    <Link href={item.link}>
                      <a itemScope itemType="#" itemProp="item" itemID={index+1}>
                        <span itemProp="name">{item.name}</span>
                      </a>
                    </Link>
                  )}
                  <meta itemProp="position" content={index+1} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

BreadCrumb.propTypes = propTypes;

export default BreadCrumb;
