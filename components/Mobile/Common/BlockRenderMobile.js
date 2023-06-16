import React from 'react';
import SectionPopularCatalogMobile from '../../Mobile/Home/SectionPopularCatalogMobile'
import SectionBestSellerMobile from '../../Mobile/Home/SectionBestSellerMobile'
import SectionProductMobile from '../../Mobile/Home/SectionProductMobile'
import SectionNewMobile from '../../Mobile/Home/SectionNewMobile'
import SectionBigPromotionMobile from '../../Mobile/Home/SectionBigPromotionMobile'
import SectionTestimonialMobile from '../../Mobile/Home/SectionTestimonialMobile'
import ViewedProductMobile from '../../Mobile/Common/ViewedProductMobile'
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.array
};

function BlockRenderMobile({ data, menu, config }) {
  return (
    <>
      {data !== undefined && (
        <>
          {data.map(
            (values, index) => {
              if (values.content !== null) {
                switch (values.identify) {
                  case 'popular_catalog':
                    return <SectionPopularCatalogMobile data={values} menu={menu} key={index} />;
                  case 'recently_viewed':
                    return <ViewedProductMobile key={index} />;
                  case 'category_products':
                    return <SectionProductMobile data={values} key={index} menu={menu} config={config}/>;
                  // case 'new':
                  //   return <SectionNewMobile data={values} key={index} />;
                  case 'big_promotion':
                    return <SectionBigPromotionMobile data={values} key={index} />;
                  // case 'testimonial':
                  //   return <SectionTestimonialMobile data={values} key={index} />;
                  case 'best_seller':
                    return <SectionBestSellerMobile data={values} key={index} />;
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

BlockRenderMobile.propTypes = propTypes;

export default BlockRenderMobile;
