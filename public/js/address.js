var data_district_min = [{
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



var data_district = vnJson;


function createElement(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}

//Load Tinh
Array.from(document.querySelectorAll('.select-tinh')).forEach(function(e){
  for (var i = 0; i < data_district.length; i++) {
    var option = createElement('<option value="' + data_district[i].id + '">' + data_district[i].name + '</option>');
    e.append(option);
  }   
}); 

//Load QH
Array.from(document.querySelectorAll('.select-quan')).forEach(function(e){
  for (var j = 0; j < data_district[0].qh.length; j++) {
    var option = createElement('<option value="' + data_district[0].qh[j].id + '">' + data_district[0].qh[j].name + '</option>');
    e.append(option);
  } 
}); 

//Load PX
Array.from(document.querySelectorAll('.select-phuong')).forEach(function(e){
  for (var k = 0; k < data_district[0].qh[0].px.length; k++) {
    var option = createElement('<option value="' + data_district[0].qh[0].px[k].id + '">' + data_district[0].qh[0].px[k].name + '</option>');
    e.append(option);            
  } 
}); 


function loadQH(e) {
  var id = e.value,
      idQH = e.getAttribute('data-child1'),
      idPX = e.getAttribute('data-child2'),
      aQH = document.getElementById(idQH);
    if(idPX){
       aPX = document.getElementById(idPX);
       aPX.innerHTML = '<option  value="0">Tất cả phường/xã</option>';
    }

  aQH.innerHTML = '<option  value="0">Tất cả quận/huyện</option>';
  for (var i = 0; i < data_district.length; i++) {
    if (data_district[i].id == id) {
      for (var j = 0; j < data_district[i].qh.length; j++) {
        var option = createElement('<option value="' + data_district[i].qh[j].id + '">' + data_district[i].qh[j].name + '</option>');
        aQH.append(option);
      }   
    }
  }
}

function loadPX(e) {
  var id = e.value,
      idPX = e.getAttribute('data-child1'),
      idTinh = e.getAttribute('data-parent'),
      aTinh = document.getElementById(idTinh),
      aPX = document.getElementById(idPX),

      tinh = aTinh.value;

  aPX.innerHTML = '<option  value="0">Tất cả phường/xã</option>';
    for (var i = 0; i < data_district.length; i++) {
      if (data_district[i].id == tinh) {
      for (var j = 0; j < data_district[i].qh.length; j++) {
        if (data_district[i].qh[j].id == id) {
          for (var k = 0; k < data_district[i].qh[j].px.length; k++) {
            var option = createElement('<option value="' + data_district[i].qh[j].px[k].id + '">' + data_district[i].qh[j].px[k].name + '</option>');
            aPX.append(option);            
          }
        }
      }   
    }
  }
}

function setAddress() {
  var address = '',
    v1 = address_Tinh.value;
    address +=''+address_Tinh.options[address_Tinh.selectedIndex].text;
  document.getElementById('inputAddress').innerHTML=address;
}
