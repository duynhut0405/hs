import { useEffect } from 'react';

function Sticky() {
  const isClient = typeof window === 'object';
  
  function getPosition( el ) {
    var x = 0;
    var y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
    }
    //return { top: y, left: x };
    return y;
  }

  function stickySidebar(windowTop, stopPoint, sticky, stickyTop, stickOffset) {
    if (windowTop < stopPoint) {
      if (windowTop > stickyTop) {
        sticky.style.cssText = 'position: fixed; bottom:initial;top:'+(stickOffset)+'px';
        return;
      } else {
        sticky.style.cssText = 'position: absolute; bottom:initial;top:initial'; 
        return;
      }
    }
    sticky.style.cssText = 'position: absolute; bottom:0;top:initial';
    return
  }

  function handleScroll() {
    let stickys = Array.from(document.getElementsByClassName('sidebar__inner__sticky'));
    stickys.forEach(element => {
      let sticky = element as HTMLElement;
      let offset = sticky.getAttribute('data-offset');
      let stickyContent = sticky.getAttribute('data-sync');
      let res = sticky.getAttribute('data-res');
      let header = sticky.getAttribute('data-header');
      if(!offset || offset==''){ offset = '20'; }
      if(!res || res==''){ res = '768'; }
      if(!header || header==''){ header = 'header'; }
      
      var stickyw = sticky.offsetWidth,
        stickyh = sticky.offsetHeight,
        stickOffset = document.getElementById(header).offsetHeight + parseInt(offset);
      let stickyContentHeight = document.getElementById(stickyContent).offsetHeight;
      var stickyTop = getPosition(sticky) - stickOffset;
      var stopPoint = (stickyContentHeight + stickyTop) - stickyh;
      var windowTop = document.documentElement.scrollTop;
      if(window.innerWidth >= parseInt(res) && stickyContentHeight > (stickyh + 100) ){
        stickySidebar(windowTop,stopPoint,sticky,stickyTop,stickOffset);
        sticky.style.width = stickyw+'px' ;

        window.onscroll = function() {
          var windowTop = document.documentElement.scrollTop;
          stickySidebar(windowTop,stopPoint,sticky,stickyTop,stickOffset);
          sticky.style.width = stickyw+'px' ;
        };
      }
    });
  }

  useEffect(() => {
    if (!isClient) {
      return;
    }
    handleScroll();
  }, []);

  return isClient;
}

export default Sticky;