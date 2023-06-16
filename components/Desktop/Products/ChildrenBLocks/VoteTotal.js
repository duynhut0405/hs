import React, { useEffect, useState } from 'react';

function VoteTotal({ data, total }) {
  const [five, setFive] = useState(0);
  const [four, setFour] = useState(0);
  const [three, setThree] = useState(0);
  const [two, setTwo] = useState(0);
  const [one, setOne] = useState(0);

  const [count, setCount] = useState({
    five: '',
    four: '',
    three: '',
    two: '',
    one: '',
  });
  useEffect(() => {
    data.forEach((element) => {
      if (element.value == 5) {
        setFive((element.count / total) * 100);
        setCount({ ...count, five: element.count });
      }
      if (element.value == 4) {
        setFour((element.count / total) * 100);
        setCount({ ...count, four: element.count });
      }
      if (element.value == 3) {
        setThree((element.count / total) * 100);
        setCount({ ...count, three: element.count });
      }
      if (element.value == 2) {
        setTwo((element.count / total) * 100);
        setCount({ ...count, two: element.count });
      }
      if (element.value == 1) {
        setOne((element.count / total) * 100);
        setCount({ ...count, one: element.count });
      }
    });

    return () => {
      setFive(0);
      setFour(0);
      setThree(0);
      setTwo(0);
      setOne(0);
    };
  }, [data]);
  return (
    <div className='rcrt'>
      <div className='r'>
        <span className='t'>
          5 <i className='icon-star'></i>
        </span>
        <div className='bgb'>
          <div className='bgb-in' style={{ width: `${five}%` }}></div>
        </div>
        <span className='c' data-buy='16'>
          <strong>{count.five}</strong> đánh giá
        </span>
      </div>
      <div className='r'>
        <span className='t'>
          4 <i className='icon-star'></i>
        </span>
        <div className='bgb'>
          <div className='bgb-in' style={{ width: `${four}%` }}></div>
        </div>
        <span className='c' data-buy='16'>
          <strong>{count.four}</strong> đánh giá
        </span>
      </div>
      <div className='r'>
        <span className='t'>
          3 <i className='icon-star'></i>
        </span>
        <div className='bgb'>
          <div className='bgb-in' style={{ width: `${three}%` }}></div>
        </div>
        <span className='c' data-buy='16'>
          <strong>{count.three}</strong> đánh giá
        </span>
      </div>
      <div className='r'>
        <span className='t'>
          2 <i className='icon-star'></i>
        </span>
        <div className='bgb'>
          <div className='bgb-in' style={{ width: `${two}%` }}></div>
        </div>
        <span className='c' data-buy='16'>
          <strong>{count.two}</strong> đánh giá
        </span>
      </div>
      <div className='r'>
        <span className='t'>
          1 <i className='icon-star'></i>
        </span>
        <div className='bgb'>
          <div className='bgb-in' style={{ width: `${one}%` }}></div>
        </div>
        <span className='c' data-buy='16'>
          <strong>{count.one}</strong> đánh giá
        </span>
      </div>
    </div>
  );
}

export default VoteTotal;
