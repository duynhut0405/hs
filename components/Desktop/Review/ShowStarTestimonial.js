import React from 'react'

const renderStar = (number) => {

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
function ShowStarTestimonial({ rating }) {
  return (
    <span className="stars">
      {renderStar(rating)}
    </span>
  )
}

export default ShowStarTestimonial