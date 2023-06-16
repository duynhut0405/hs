import { useEffect } from 'react';
import { useRouter } from 'next/router'
var offdefault = 50;  //BJLL.threshold;
var BJLL_options = BJLL_options || {},
    BJLL = {
      _ticking: !1,
      check: function() {
          if (!BJLL._ticking) {
              BJLL._ticking = !0, void 0 === BJLL.threshold && (void 0 !== BJLL_options.threshold ? BJLL.threshold = parseInt(BJLL_options.threshold) : BJLL.threshold = 200);
              var e = document.documentElement.clientHeight || body.clientHeight,
                  t = !1,
                  n = document.getElementsByClassName("lazy-hidden");
              [].forEach.call(n, function(n, a, i) {
                  var s = n.getBoundingClientRect(),
                      offset = parseFloat(n.getAttribute('offset'));
                  let o = 0;
                  if(offset) o = 0 - offset;
                  else o = offdefault;
                  e - s.top + o > 0 && (BJLL.show(n), t = !0)
              }), BJLL._ticking = !1, t && BJLL.check()
          }
      },
      show: function(e) {
          e.className = e.className.replace(/(?:^|\s)lazy-hidden(?!\S)/g, ""), e.addEventListener("load", function() {
              e.className += " lazy-loaded", BJLL.customEvent(e, "lazyloaded");
          }, !1);
          var t = e.getAttribute("data-lazy-type");
          e.className += ' loaded';
          if ("image" == t) null != e.getAttribute("data-lazy-srcset") && e.setAttribute("srcset", e.getAttribute("data-lazy-srcset")), null != e.getAttribute("data-lazy-sizes") && e.setAttribute("sizes", e.getAttribute("data-lazy-sizes")), e.setAttribute("src", e.getAttribute("data-lazy-src"));

          else if ("bg" == t) {
              var n = e.getAttribute("data-lazy-src");
              e.style.backgroundImage = 'url(' + n + ')';
          }
          else if ("iframe" == t) {
              var n = e.getAttribute("data-lazy-src");

              e.setAttribute('src', n);
          }
          else if ("mp4" == t) {
              var n = e.getAttribute("data-lazy-src"),
                  a = '<source src="'+n+'" type="video/mp4">';
              e.innerHTML += a;
          }                        
      },
      customEvent: function(e, t) {
          var n;
          document.createEvent ? (n = document.createEvent("HTMLEvents")).initEvent(t, !0, !0) : (n = document.createEventObject()).eventType = t, n.eventName = t, document.createEvent ? e.dispatchEvent(n) : e.fireEvent("on" + n.eventType, n)
      }
  };

function lazyload() {
  const isClient = typeof window === 'object';
  const router = useRouter();
  useEffect(() => {
    if (!isClient) {
      return;
    }
    BJLL.check();
    window.addEventListener("load", BJLL.check, !1), window.addEventListener("scroll", BJLL.check, !1), window.addEventListener("resize", BJLL.check, !1), document.getElementsByTagName("body").item(0).addEventListener("post-load", BJLL.check, !1);
  }, [router.asPath]);
}
    
export default lazyload;