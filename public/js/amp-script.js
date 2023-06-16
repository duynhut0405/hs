var url = window.location.href;
url = url.replace("/amp/", "/");
const button = document.getElementById('buynow');
button.href=url;