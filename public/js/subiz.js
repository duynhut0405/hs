!function(s,u,b,i,z){var o,t,r,y;s[i]||(s._sbzaccid=z,s[i]=function(){s[i].q.push(arguments)},s[i].q=[],s[i]("setAccount",z),r=["widget.subiz.net","storage.googleapis"+(t=".com"),"app.sbz.workers.dev",i+"a"+(o=function(k,t){var n=t<=6?5:o(k,t-1)+o(k,t-3);return k!==t?n:n.toString(32)})(20,20)+t,i+"b"+o(30,30)+t,i+"c"+o(40,40)+t],(y=function(k){var t,n;s._subiz_init_2094850928430||r[k]&&(t=u.createElement(b),n=u.getElementsByTagName(b)[0],t.async=1,t.src="https://"+r[k]+"/sbz/app.js?accid="+z,n.parentNode.insertBefore(t,n),setTimeout(y,2e3,k+1))})(0))}(window,document,"script","subiz","acprznusspjgymi9b74d");

const idVar = window.setInterval(function ()
{
  timer();
}, 3500);

function timer() {    
  let e = document.getElementById('wpwidget');
  if (e) {
    if (document.getElementsByClassName('mobile')[0]) {
      console.log(e);
      addNewStyle('#wpwidget .chat-button.chat-button--right {display: none !important;} .widget-header--wrap-button-back widget-header--has-convo-unred {display: none !important;}')
    }
    clearInterval(idVar);
  }
}

function myStopFunction() {
  clearInterval(idVar);
}

function addNewStyle(newStyle) {
  var styleElement = document.getElementById('styles_js');
  if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.id = 'styles_js';
      styleElement.id = 'styles_js';
      // styleElement.href = '/js/mb/main-custom';
      document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  styleElement.appendChild(document.createTextNode(newStyle));
}