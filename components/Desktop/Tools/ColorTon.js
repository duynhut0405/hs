import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Toa from '../../../Data/Toa.json'
const propTypes = {
  category: PropTypes.string
};

const color = [
  {
    HEXCODE: '#944743',
    Code: 'Màu đỏ'
  },
  {
    HEXCODE: '#badac2',
    Code: 'BGL01'
  },
  {
    HEXCODE: '#56a379',
    Code: 'BGL02 - Xanh rêu'
  },
  {
    HEXCODE: '#2b4b33',
    Code: 'BGL03 - Xanh rêu'
  },
  {
    HEXCODE: '#85989c',
    Code: 'MDL01'
  },
  {
    HEXCODE: '#7a5751',
    Code: 'MRL03'
  }
];

function ColorTon({ category, setColor }) {
  const [currentColors, setCurrentColors] = useState(color);

  return (
    <>
      <div className="row">
      {currentColors.length > 0 && currentColors.map((item, index) => (
        <div className="col-3" key={index}>
          <div className="item tRes" style={{backgroundColor: item.HEXCODE}} onClick={() => setColor(item)}>
            <span className="t1"></span>
          </div>

        </div>
      ))}
      </div>
    </>
    
  );
}

ColorTon.propTypes = propTypes;

export default ColorTon;
