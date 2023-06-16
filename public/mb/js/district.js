var data_district = [{
  "id": "1",
  "name": "Tp Hồ Chí Minh",
  "qh": [
  {
      "id": "1",
      "name": "Quận 1",
  }, {
      "id": "2",
      "name": "Quận 3",
  }, {
      "id": "5",
      "name": "Phú Nhuận",
  }, {
      "id": "6",
      "name": "Tân Bình",
  }, {
      "id": "7",
      "name": "Bình Tân",
  }]
}, {
  "id": "2",
  "name": "Bình Dương",
  "qh": [{
      "id": "1",
      "name": "Thị xã Thuận An",
  }, {
      "id": "3",
      "name": "Tân Uyên",         
  }, {
      "id": "7",
      "name": "Bến Cát",                      
  }]
}];

data_district = vnJson;


function createElement(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}

function fillCity(id,sub) {
  for (var i = 0; i < data_district.length; i++) {
    var city = document.getElementById(id),
        option = createElement('<div class="city item-search"  data-value="' + data_district[i].id + '">' + data_district[i].name + '</div>');
    city.append(option);
  }    

  Array.from(city.querySelectorAll('.city')).forEach(function(e){
    e.addEventListener('click', function() {
      var val = e.getAttribute('data-value'),
          text = e.innerHTML,
          parent = e.closest('.wcountry');
          parent.querySelector('.wdistrict .top').innerHTML = text;

      parent.classList.add('active');

      var orthers = e.parentNode.querySelectorAll('.city');
      Array.prototype.forEach.call(orthers, function (orther) {
        orther.classList.remove('active');
      }); 

      e.classList.add('active');

      loadDistrict(val,sub);
      return false;
    }, false);
  });     
}   


function loadDistrict(val,subId) {
  var district = document.getElementById(subId);
  for (var i = 0; i < data_district.length; i++) {
    if (data_district[i].id == val) {
      
      district.innerHTML = '<div class="item-search active"  data-value="0">Tất cả quận, huyện</div>';
      for (var j = 0; j < data_district[i].qh.length; j++) {
        var option = createElement('<div class="item-search"  data-value="' + data_district[i].qh[j].id + '" data-parent="' + data_district[i].qh[j].pr + '">' + data_district[i].qh[j].name + '</div>');
        district.append(option);
      }
    }
  }

  var parent = district.closest('.wcountry');
  clickDistrict(parent);
}




fillCity('slb_city_top','slb_district_top');
fillCity('slb_city','slb_district');


function closeDistrict(e) {
  var parent = e.closest('.wcountry');
  parent.classList.remove('active');
}

function clickDistrict(parent) {
  Array.from(parent.querySelectorAll('.slb_district .item-search')).forEach(function(e){
    e.addEventListener('click', function() {
      closeDistrict(e);
      var idTinh = e.getAttribute('data-parent'),
          text = e.innerHTML;

          console.log(text);

      // Array.from(parent.querySelectorAll('.slb_city .item-search')).forEach(function(t){
      //   var val = t.getAttribute('data-value');
      //   if(idTinh==val){
      //     t.classList.add('active');
      //   }else {
      //     t.classList.remove('active');
      //   }
      // });
      return false;
    }, false);
  }); 

}


