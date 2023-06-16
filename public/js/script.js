
function createElement(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}

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

Array.from(document.querySelectorAll('.accordion li[class*="children"]')).forEach(function(e){
  var btn = createElement('<div class="showsubmenu icon-arrow-1 ib">'); 
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

// !function(s,u,b,i,z){var o,t,r,y;s[i]||(s._sbzaccid=z,s[i]=function(){s[i].q.push(arguments)},s[i].q=[],s[i]("setAccount",z),r=["widget.subiz.net","storage.googleapis"+(t=".com"),"app.sbz.workers.dev",i+"a"+(o=function(k,t){var n=t<=6?5:o(k,t-1)+o(k,t-3);return k!==t?n:n.toString(32)})(20,20)+t,i+"b"+o(30,30)+t,i+"c"+o(40,40)+t],(y=function(k){var t,n;s._subiz_init_2094850928430||r[k]&&(t=u.createElement(b),n=u.getElementsByTagName(b)[0],t.async=1,t.src="https://"+r[k]+"/sbz/app.js?accid="+z,n.parentNode.insertBefore(t,n),setTimeout(y,2e3,k+1))})(0))}(window,document,"script","subiz","acprznusspjgymi9b74d");

// const idVar = window.setInterval(function ()
// {
//   timer();
// }, 3500);

// function timer() {    
//   let e = document.getElementById('wpwidget');
//   if (e) {
//     if (document.getElementsByClassName('mobile')[0]) {
//       console.log(e);
//       addNewStyle('#wpwidget .chat-button.chat-button--right {display: none !important;} .widget-header--wrap-button-back widget-header--has-convo-unred {display: none !important;}')
//     }
//     clearInterval(idVar);
//   }
// }

// function myStopFunction() {
//   clearInterval(idVar);
// }

// function addNewStyle(newStyle) {
//   var styleElement = document.getElementById('styles_js');
//   if (!styleElement) {
//       styleElement = document.createElement('style');
//       styleElement.type = 'text/css';
//       styleElement.id = 'styles_js';
//       styleElement.id = 'styles_js';
//       // styleElement.href = '/js/mb/main-custom';
//       document.getElementsByTagName('head')[0].appendChild(styleElement);
//   }
//   styleElement.appendChild(document.createTextNode(newStyle));
// }