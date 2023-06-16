import Link from 'next/link';
import ToggleHeightContent from '../../../Core/ToggleHeightContent';
import ReactHtmlParser from 'react-html-parser';
import formatVND from '../../../../utils/formatVND';
import ShowStar from '../../Review/ShowStar';
import t from '../../../../translation';

export default function ProductInfor({ sku, name, attributes, custom_attributes, isInWishlist, basePrice, category, brandID, finalPrice, unit, plus, rate }) {
  return (
    <div className='pd-20'>
      {attributes && attributes.brand && (
        <div className='mb-10'>
          {t('Brands')} &nbsp;
          <Link href={`/${category.path}?brand=${brandID}&page=1`}>
            <span className='cl1 b'>{attributes.brand.name}</span>
          </Link>
        </div>
      )}
      <h1 className='h3'>{name}</h1>

      {custom_attributes?.map((values, index) => {
        if (values.attribute_code !== null) {
          switch (values.attribute_code) {
            case 'short_description':
              return (
                <ToggleHeightContent id='sort' height='100' more='left' key={index}>
                  {ReactHtmlParser(values.value)}
                </ToggleHeightContent>
              );
            default:
              return null;
          }
        } else {
          return null;
        }
      })}
      <div className='ratingresult mb-10'>
        <ShowStar rating={attributes.review.review_summary[0].rating_summary != null ? attributes.review.review_summary[0].rating_summary : '0'} />
      </div>
      <div className='price-group mb-10'>
        <span className='price red'>
          {formatVND((finalPrice + plus) * rate)} <span>{unit}</span>
        </span>
        {basePrice != 0 && parseInt(basePrice) != parseInt(finalPrice) && (
          <>
            <span className='price-old'>{formatVND(basePrice)}</span>
            <span className='off fs15 red'>{Math.round(((finalPrice - basePrice) / basePrice) * 100)} % </span>
          </>
        )}
        <span className={`btnlike ${isInWishlist ? 'active' : ''}`} onClick={() => handleWishlist()}>
          <i className='icon-like'></i>
        </span>
      </div>
    </div>
  );
}
