import React, { useState, useEffect } from 'react';
import SessionPopularCatalog from '../Home/SessionPopularCatalog'
import SessionBestSeller from '../Home/SessionBestSeller'
import SessionNew from '../Home/SessionNew'
import SessionBigPromotion from '../Home/SessionBigPromotion'
import SessionTestimonial from '../Home/SessionTestimonial'
import ViewedProduct from '../Home/ViewedProduct'
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.array
};

function BlockRender({ data, config }) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    if (!display) {
      window.addEventListener("scroll", isScrolling);
      return () => window.removeEventListener("scroll", isScrolling);
    }
  }, [])

  const isScrolling = () => {
    setDisplay(true)
  }

  return (
    <>
      {data !== undefined && (
        <>
          {data.map(
            (values, index) => {
              if (values.content !== null) {
                switch (values.identify) {
                  case 'popular_catalog':
                    return <SessionPopularCatalog data={values} key={index} />;
                  case 'recently_viewed':
                    return <ViewedProduct key={index} poistion={index} />;
                  case 'best_seller':
                    return display ? <SessionBestSeller data={values} poistion={index} key={index} config={config} /> : null;
                  case 'category_products':
                    return <SessionBestSeller data={values} poistion={index} key={index} config={config} />;
                  case 'new':
                    return display ? <SessionNew data={values} key={index} /> : null;
                  case 'big_promotion':
                    return <SessionBigPromotion data={values} key={index}  poistion={index} />
                  // case 'testimonial':
                  //   return display ? <SessionTestimonial data={values} key={index} /> : null;
                  default:
                    return null;
                }
              } else {
                return null;
              }
            }
          )}
        </>
      )}
    </>
  );
}

BlockRender.propTypes = propTypes;

export default BlockRender;
