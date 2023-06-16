import React from 'react';
import Slider from 'react-slick';
import checkImageExist from '../../../utils/checkImageExist';
import Modal from 'react-bootstrap/Modal';
import ZoomImage from './ZoomImage';
import router, { useRouter } from 'next/router';

function SampleNextArrow(props) {
  const { onClick } = props;

  return (
    <span className='nextArrow slick-arrow' onClick={onClick}>
      <i className='icon-arrow-1 '></i>
    </span>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <span className='prevArrow slick-arrow' onClick={onClick}>
      <i className='icon-arrow-1 ix'></i>
    </span>
  );
}

const initSetting = {
  className: 'slider-for box-shadow slick-initialized slick-slider',
  arrows: false,
  dots: false,
  slidesToShow: 1,
  infinite: false,
  slidesToScroll: 1,
  lazyLoad: true,
};

const initSetting2 = {
  className: 'slider-nav slide-item-shadow',
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  slidesToShow: 4,
  slidesToScroll: 1,
  focusOnSelect: true,
  arrows: true,
  infinite: false,
};

export default function SyncSlider({ promotion, data }) {
  const router = useRouter();
  const [nav1, setNav1] = React.useState(null);
  const [nav2, setNav2] = React.useState(null);
  const [nav3, setNav3] = React.useState(null);
  const [nav4, setNav4] = React.useState(null);
  let slider1 = [];
  let slider2 = [];
  const [setting, setSetting] = React.useState(initSetting);
  const [setting2, setSetting2] = React.useState(initSetting2);
  const [openZoom, setOpenZoom] = React.useState(false);
  const handleClose = () => {
    setOpenZoom(false);
  };

  React.useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
    setNav3(slider1);
    setNav4(slider2);
  }, [slider1, slider2]);

  return (
    <>
      <div className='wrap-sync-slider'>
        {promotion && <img style={{ position: 'absolute', zIndex: 20, width: '100px', right: '10px' }} src={promotion}></img>}
        <Slider asNavFor={nav2} ref={(slider) => (slider1 = slider)} {...setting}>
          {data.length != 0 ? (
            data.map((item, index) => {
              if (item.media_type === '3D') {
                return (
                  <>
                    <div style={{ position: 'relative' }}>
                      <div className='item img'>
                        <iframe src={item.link}></iframe>
                      </div>
                      <img onClick={() => setOpenZoom(true)} style={{ position: 'absolute', cursor: 'pointer', top: '5%', right: '5%' }} src='/images/zoom-in.png' width={30} height={30}></img>
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
            })
          ) : (
            <div className='item img'>
              <a href='#'>
                <img src={'/images/hoasen-product.jpg'} alt='' />
              </a>
            </div>
          )}
        </Slider>

        <Slider asNavFor={nav1} ref={(slider) => (slider2 = slider)} {...setting2}>
          {data.length != 0 ? (
            data.map((item, index) => (
              <div key={index}>
                <div className='img box-shadow'>
                  <a>
                    {item.media_type === '3D' ? (
                      <iframe style={{ pointerEvents: 'none' }} src={item.link}></iframe>
                    ) : (
                      <img src={`${(process.env.DOMAIN_IMAGE + 'catalog/product/' + item.file).replace('product//', 'product/')}`} alt='' onError={async (e) => await checkImageExist(e)} />
                    )}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className='img box-shadow'>
                <a>
                  <img src={'/images/hoasen-product.jpg'} alt='' />
                </a>
              </div>
            </div>
          )}
        </Slider>
      </div>
      {openZoom && (
        <Modal show={openZoom} size={'lg'} onHide={handleClose} className='modal-image'>
          <Modal.Body>
            <h6 className='title'>
              <span onClick={() => setOpenZoom(false)} className='btnModal btn-close tx' style={{ position: 'absolute', right: '20px', color: '#8c110a' }}>
                Thoát
              </span>
            </h6>
            <div className='wrap-sync-slider' style={{ marginTop: '30px' }}>
              <Slider asNavFor={nav4} ref={(slider) => (slider1 = slider)} {...setting}>
                {data.length != 0 ? (
                  data.map((item, index) => (
                    <div key={index}>
                      {item.media_type === '3D' ? (
                        <div className='item img'>
                          <iframe src={item.link}></iframe>
                        </div>
                      ) : (
                        <ZoomImage src={`${(process.env.DOMAIN_IMAGE + 'catalog/product/' + item.file).replace('product//', 'product/')}`} />
                      )}
                    </div>
                  ))
                ) : (
                  <div className='item img'>
                    <a href='#'>
                      <ZoomImage src={'/images/hoasen-product.jpg'} />
                    </a>
                  </div>
                )}
              </Slider>
              <Slider asNavFor={nav3} ref={(slider) => (slider2 = slider)} {...setting2}>
                {data.length != 0 ? (
                  data.map((item, index) => (
                    <div key={index}>
                      <div className='img box-shadow'>
                        <a>
                          {item.media_type === '3D' ? (
                            <iframe style={{ pointerEvents: 'none' }} src={item.link}></iframe>
                          ) : (
                            <img src={`${(process.env.DOMAIN_IMAGE + 'catalog/product/' + item.file).replace('product//', 'product/')}`} alt='' onError={async (e) => await checkImageExist(e)} />
                          )}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className='img box-shadow'>
                      <a>
                        <img src={'/images/hoasen-product.jpg'} alt='' />
                      </a>
                    </div>
                  </div>
                )}
              </Slider>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
