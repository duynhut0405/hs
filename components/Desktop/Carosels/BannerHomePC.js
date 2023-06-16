import React from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import checkImageExist from '../../../utils/checkImageExist';

import Image from 'next/image';

export default function SyncSlider({ data }) {
  const [nav1, setNav1] = React.useState(null);
  const [nav2, setNav2] = React.useState(null);
  const [quantity, setQuantity] = React.useState(data.length);
  let slider1 = [];
  let slider2 = [];
  const initSetting = {
    className: 'slider-for',
    arrows: false,
    dots: false,
    slidesToShow: 1,
    infinite: true,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
  };
  const initSetting2 = {
    className: 'slider-nav ',
    // nextArrow: '<span className="nextArrow"><i className="icon-arrow-1 "></i></span>',
    // prevArrow: '<span className="prevArrow"><i className="icon-arrow-1 ix"></i></span>',
    slidesToShow: quantity,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    infinite: false,
    lazyLoad: true,
  };
  const [setting, setSetting] = React.useState(initSetting);
  const [setting2, setSetting2] = React.useState(initSetting2);
  const [isRender, setRender] = React.useState(false);

  React.useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  React.useEffect(() => {
    setQuantity(data.length);
  }, [data]);
  return (
    <div className='wrap-sync-slider-home '>
      <Slider asNavFor={nav2} ref={(slider) => (slider1 = slider)} {...setting}>
        {data
          ? data.map((item, index) => (
              <div key={index}>
                <Link href={item.click_url ? item.click_url : '#'} key={index}>
                  <a href={item.click_url ? item.click_url : '#'}>
                    <Image preload={index == 0} height={344} width={733} src={`${process.env.DOMAIN_IMAGE + item.image}`} alt={item.name} />
                  </a>
                </Link>
              </div>
            ))
          : ''}
      </Slider>
      <Slider asNavFor={nav1} ref={(slider) => (slider2 = slider)} {...setting2}>
        {data
          ? data.map((item, index) => (
              <div className='item img' key={index}>
                {item.name}
              </div>
            ))
          : ''}
      </Slider>
    </div>
  );
}
