var XLSX = require('xlsx');
var workbook = XLSX.readFile('link-404-hoasenhome.xlsx');
var sheet_name_list = workbook.SheetNames;
var fs = require('fs');
sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for(z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var col = z.substring(0,1);
        var row = parseInt(z.substring(1));
        var value = worksheet[z].v;

        //store header names
        if(row == 1) {
            headers[col] = value;
            continue;
        }

        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    let result = data.filter(data => !!data['LINK MỚI'] && data['LINK MỚI'] != 'không có' && data['LINK LỖI 404'] != 'https://www.hoasenhome.vn/404');
    const map1 = result.map(function(x) { 
      x['destination'] = x['LINK MỚI'].replace('https://hoasenhome.vn', '').replace('https://www.hoasenhome.vn', '');
      x['source'] = x['LINK LỖI 404'].replace('https://hoasenhome.vn', '').replace('https://www.hoasenhome.vn', '');
      delete x['LINK LỖI 404'];
      delete x['LINK MỚI'];
      delete x['status code'];
      delete x['status'];
      delete x['indexability'];
      delete x['indexability status'];
      x['permanent'] = true;
      return x
    });
    console.log(map1)
    fs.promises.writeFile("./redirect.json", JSON.stringify(map1, null, 2))
});