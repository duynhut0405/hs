// import React from "react";
import React, { useState, useCallback } from 'react';
import Slider from 'react-slick';
import checkImageExist from '../../../utils/checkImageExist';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';

const initSetting = {
  className: 'slick-res s-dots s-per',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};
const initSetting2 = {
  className: 'slick-res s-dots s-per',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};
export default function SimpleMobileSlider({ data, promotion }) {
  const router = useRouter();
  const [setting, setSetting] = React.useState(initSetting);
  const [dragging, setDragging] = useState(false);
  const [openZoom, setOpenZoom] = useState(false);
  const [nav1, setNav1] = React.useState(null);
  const [nav2, setNav2] = React.useState(null);
  const handleClose = () => {
    setOpenZoom(false);
  };
  const sliderRef = React.useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    console.log(nav2?.current);
    setDragging(false);
  }, [setDragging]);

  const handleOnItemClick = useCallback(
    (e) => {
      if (dragging) e.stopPropagation();
    },
    [dragging]
  );
  React.useEffect(() => {
    if (openZoom && sliderRef?.current) {
      sliderRef?.current?.slickGoTo(currentIndex);
    }
  }, [openZoom]);

  const click = (index) => {
    setCurrentIndex(index);
    setOpenZoom(true);
  };

  return (
    <>
      <div className='pd-15 line-bottom'>
        {promotion && <img style={{ position: 'absolute', zIndex: 20, width: '100px', right: '0px' }} src={promotion}></img>}
        <div className='slick-res s-dots s-per'>
          <Slider ref={nav1} beforeChange={handleBeforeChange} afterChange={handleAfterChange} {...setting}>
            {data.map((item, index) => {
              if (item.media_type === '3D') {
                return (
                  <>
                    <div style={{ position: 'relative' }}>
                      <div className='item img' key={index} onClick={() => click(index)}>
                        <iframe src={item.link}></iframe>
                      </div>
                      <img onClick={() => click(index)} style={{ position: 'absolute', cursor: 'pointer', top: '5%', right: '10%' }} src='/images/zoom-in.png' width={30} height={30}></img>
                    </div>
                  </>
                );
              }

              if (item.media_type === 'external-video') {
                return (
                  <div className='item' key={index}>
                    <iframe width='100%' height='400' src={item.extension_attributes.video_content.video_url}></iframe>
                  </div>
                );
              }
              if (item.media_type === 'image') {
                return (
                  <div onClick={() => setOpenZoom(true)} className='item img' key={index}>
                    <a href='#'>
                      <img src={`${(process.env.DOMAIN_IMAGE + 'catalog/product/' + item.file).replace('product//', 'product/')}`} alt='' onError={async (e) => await checkImageExist(e)} />
                    </a>
                  </div>
                );
              }
            })}
          </Slider>
        </div>
      </div>
      {openZoom && (
        <Modal show={openZoom} fullscreen={true} centered onHide={handleClose} className='modal-image'>
          <Modal.Body>
            <h6 className='title'>
              <span onClick={() => setOpenZoom(false)} className='btnModal btn-close tx' style={{ position: 'absolute', right: '20px', color: '#8c110a' }}>
                Thoát
              </span>
            </h6>
            <div className='slick-res s-dots s-per'>
              <Slider ref={sliderRef} beforeChange={handleBeforeChange} afterChange={handleAfterChange} {...initSetting2}>
                {data.map((item, index) => (
                  <div className='item' key={index} onClickCapture={handleOnItemClick}>
                    {item.media_type === '3D' && router.query.id.toString().search('lavabo') !== -1 ? (
                      <iframe src={item.link}></iframe>
                    ) : (
                      <img src={`${(process.env.DOMAIN_IMAGE + 'catalog/product/' + item.file).replace('product//', 'product/')}`} alt='' onError={async (e) => await checkImageExist(e)} />
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
