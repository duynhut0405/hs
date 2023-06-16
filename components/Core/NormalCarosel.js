import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <span
      className="nextArrow  slick-arrow"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="icon-arrow-1 "></i>
    </span>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <span
      className="prevArrow slick-arrow"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="icon-arrow-1 ix"></i>
    </span>
  );
}

function NormalCarosel({ arrow,dot,res,loop,autoplay,autoplaySpeed,speed, children }) {
  const setting = {
    className: "slick-res ",
    arrows: arrow,
    dots: dot,
    slidesToShow: res ? res['0'] : 1,
    infinite: loop,
    slidesToScroll: res ? res['0'] : 1,
    speed: speed ? speed : 500,
    autoplay: autoplay==1 ? true : false,
    autoplaySpeed: autoplaySpeed ? autoplaySpeed : 4000,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: res ? res['1'] : 1,
            slidesToScroll: res ? res['1'] : 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: res ? res['2'] : 1,
            slidesToScroll: res ? res['2'] : 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: res ? res['3'] : 1,
            slidesToScroll: res ? res['3'] : 1,
          }
        }
      ]

  };


  const settings = {...setting,
    nextArrow: setting.arrows ? <SampleNextArrow/> : null,
    prevArrow:  setting.arrows ? <SamplePrevArrow/> : null
  };
  return (
    <Slider {...settings}>
      {children}
    </Slider>
  )
}

export default NormalCarosel