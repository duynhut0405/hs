import { useEffect } from 'react';
import { useRouter } from 'next/router'

function lazyImgTab() {
  let allElement = document.getElementsByClassName('lazy-img-tab');
  Array.from(allElement).forEach(function(e){
    let src = e.getAttribute('data-src');
    e.setAttribute('src',src);
    e.classList.add('loaded');
    e.classList.remove('lazy-img-tab');
  })
}

function lazyImg() {
  const isClient = typeof window === 'object';
  useEffect(() => {
    if (!isClient) {
      return;
    }
    lazyImgTab();
  }, [useRouter.asPath]);
}

export default lazyImg;