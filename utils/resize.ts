import { Console } from 'console';
import { useState, useEffect } from 'react';

function UseWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  function handleResize() {
    setWindowSize(getSize());
  }

  const handleClickOutside = (): any => {
    document.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('resize', handleResize);
    };
  };

  useEffect(() => {
    if (isClient) {
      handleClickOutside();
    }
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default UseWindowSize;