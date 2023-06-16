import Slider from "react-slick";

function SampleNextArrow(props) {
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

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <span
      className="nextArrow slick-arrow"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <i className="icon-arrow-1"></i>
    </span>
  );
}

function NormalCarosel({ setting, children }) {
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