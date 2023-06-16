
function createElement(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}




/* Toggle 
---------------- */
Array.from(document.querySelectorAll('.toggleSibling > .toggle')).forEach(function(e){
  e.addEventListener('click', function() {
      var orthers = e.parentNode.querySelectorAll('.toggle');
      Array.prototype.forEach.call(orthers, function (orther) {
        orther.classList.remove('active');
      }); 
      e.classList.toggle('active');
      return false;
  }, false);
}); 



Array.from(document.querySelectorAll('.toggleClass > .toggle')).forEach(function(e){
  e.addEventListener('click', function() {
    if(e.parentNode.classList.contains('active')){
      e.parentNode.classList.remove('active');
      return false;
    }else {
      var orthers = document.querySelectorAll('.toggleClass');
      Array.prototype.forEach.call(orthers, function (orther) {
        orther.classList.remove('active');
      }); 
      e.parentNode.classList.toggle('active');
      return false;
    } 
  }, false);
}); 


/* Modal 
---------------- */
function myModal() {   
  Array.from(document.querySelectorAll('.myModal')).forEach(function(e){
    var over = createElement('<span class="btnModal overlay"></span>');
    var close = createElement('<span class="btnModal btn-close"><i class="icon-close"> </i></span>');
    var body = document.getElementsByTagName("body")[0];

    var c = e.querySelector('.contentModal'),
        hc = c.offsetHeight + 80;      
    if(window.innerHeight>hc && e.querySelector('.container')){e.querySelector('.container').classList.add('middle');}
    e.prepend(over);
    c.prepend(close);
    body.append(e);

  });   

  Array.from(document.querySelectorAll('.btnModal')).forEach(function(e){
    e.addEventListener('click',function(){
      var id = e.dataset['modal'],
          pr = e.closest('.myModal'),
          modal = document.getElementById(id),
          body= document.getElementsByTagName("body")[0];

      
      if(pr) {
        pr.classList.remove('active');
      }else {
        if(body.classList.contains('showModal')){
          modal.classList.remove('active');
        }else{
          modal.classList.add('active');
        }
      }
      body.classList.toggle('showModal');

    });
  });   
}
myModal();


/* TABS 
---------------- */

function lazyImgTab(tabItem) {
    Array.from(tabItem.querySelectorAll('.lazy-img-tab')).forEach(function(e){
      var src = e.getAttribute('data-src');
          e.setAttribute('src',src);
          e.classList.add('loaded');
          e.classList.remove('lazy-img-tab');
    }); 
}

function toggleTab() {
  const target = this;
  const item = target.classList.contains("menu-tab")
    ? target
    : target.parentElement;
  const group = item.dataset.actabGroup;
  const id = item.dataset.actabId;
  document.querySelectorAll(".menu-tab").forEach(function(tab) {
    if (tab.dataset.actabGroup === group) {
      if (tab.dataset.actabId === id) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    }
  });
  document.querySelectorAll(".content-tab").forEach(function(tabItem) {
    if (tabItem.dataset.actabGroup === group) {
      if (tabItem.dataset.actabId === id) {
        tabItem.classList.add("active");

        lazyImgTab(tabItem);

      } else {
        tabItem.classList.remove("active");
      }
    }
  });
}

// First load image
document.querySelectorAll(".content-tab.active").forEach(function(tabItem) {
    lazyImgTab(tabItem);
});
// Change tab
document.querySelectorAll(".menu-tab").forEach(function(tab) {
  tab.addEventListener("click", toggleTab);
});


//MENU MOBILE
// Array.from(document.querySelectorAll('.menu-btn')).forEach(function(e){
//   e.addEventListener('click',function(){
//     var body = document.getElementsByTagName("body")[0];
//       body.classList.toggle('showMenu');
//   });
// }); 

Array.from(document.querySelectorAll('.accordion li[class*="children"]')).forEach(function(e){
  var btn = createElement('<div class="showsubmenu icon-arrow-1">'); 
  e.prepend(btn);  

  btn.addEventListener('click',function(){
    if(e.classList.contains('parent-showsub')){
      e.classList.remove('parent-showsub');
    }else {
      var siblings = e.parentNode.getElementsByTagName('li');
      Array.prototype.forEach.call(siblings, function (sibling) {
        sibling.classList.remove('parent-showsub');
      }); 
      e.classList.add('parent-showsub');
    }  
  });
});   


/* Video 
----------------- */     
Array.from(document.querySelectorAll('.single_item_video')).forEach(function(e){
  var frame = createElement('<iframe width="1600" height="900" src="https://www.youtube.com/embed/'+ e.dataset["video"] +'?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
  var button = createElement('<div class=" btnvideo"><img class="lazy-hidden" data-lazy-type="image" data-lazy-src="'+e.dataset['img']+'" alt=""> <i class="icon-play">btn</i></div>');
  button.addEventListener('click',function(){
    e.append(frame);
    e.classList.add('active');
  });
  e.prepend(button);
});



 
/* SHOP 
----------------- */     


// LAZYLOAD
/*-----------------------------------------------------------------*/
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
window.addEventListener("load", BJLL.check, !1), window.addEventListener("scroll", BJLL.check, !1), window.addEventListener("resize", BJLL.check, !1), document.getElementsByTagName("body").item(0).addEventListener("post-load", BJLL.check, !1);


