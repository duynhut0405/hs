import React from "react";
import Slider from "react-slick";
import checkImageExist from '../../../utils/checkImageExist'

export default function ZoomImage({ src }) {
  const [backgroundPosition, setBackgroundPosition] = React.useState('0% 0%');
  const [size, setSize] = React.useState('0px');
  
  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setBackgroundPosition(`${x}% ${y}%`)
    setSize('1000px');
  }

  const onMouseOut=() => {setSize('0px')};

    return (
      <div style={{padding:'30px', textAlign:'center', margin: 'auto', maxHeight: '600px'}}>
        <figure className="zoom-figure" onMouseMove={handleMouseMove} onMouseOut={onMouseOut} style={{
          backgroundImage: `url(${src})`, 
          backgroundPosition: backgroundPosition,
          backgroundRepeat: 'no-repeat',
          zIndex: '300',
          backgroundSize: size,
          margin: 'auto',
          maxHeight: '500px'
        }}>
          <img style={{margin: 'auto', maxHeight: '500px'}} src={src} />
        </figure>
      </div>
    );
}
