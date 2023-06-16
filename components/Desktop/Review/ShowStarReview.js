import React from 'react'

const renderStar = (rating) => {
  const number = Math.ceil((rating/100)*process.env.MAX_NUMBER);
  const item = [];
  for (let i = 0; i < number; i++) {
    item.push(<i className="icon-star rated" style={{marginRight:"2px"}} key={i}></i>);
  }
  if (number < 5) {
    for (let i = number; i < 5; i++) {
      item.push(<i className="icon-star" style={{marginRight:"2px"}} key={i}></i>);
    }
  }
  return item;
}
function ShowStar({ rating }) {
  return (
    <span className="ratingresult">
      {renderStar(rating)}
    </span>
  )
}

export default ShowStar