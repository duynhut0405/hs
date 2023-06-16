
import api from '../../services/api'
import React, { ReactNode, useEffect, useState } from 'react'
import { stringify } from 'himalaya';

const listProduct = [0,1,2,3,4,5];

function Home({}) {
  return (
    <>
      <div>
        Run to complile
      </div>
    </>
  )
}

// function OBJtoXML(obj) {
//   var xml = '';
//   for (var prop in obj) {
//     xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
//     if (obj[prop] instanceof Array) {
//       for (var array in obj[prop]) {
//         xml += "<" + prop + ">";
//         xml += OBJtoXML(new Object(obj[prop][array]));
//         xml += "</" + prop + ">";
//       }
//     } else if (typeof obj[prop] == "object") {
//       xml += OBJtoXML(new Object(obj[prop]));
//     } else {
//       xml += obj[prop];
//     }
//     xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
//   }
//   var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
//   return xml
// }

// This gets called on every request
// export async function getStaticProps(context) {
//   let data = 'dddd'
//   var fs = require('fs');
//   var parser = require('xml2json');
//   const formatXml = require("xml-formatter")
//   try {
//     const result = await api.get('https://admin.hoasenhome.vn/sitemap.xml'); 
//     var json = JSON.parse(parser.toJson(result.data, {reversible: true}));
//     console.log(result.data)
//     var urls = json["urlset"]["url"];
//     let newUrls = [];
//     for (let index = 0; index < urls.length; index++) {
//       let replaceData = urls[index]['priority']['$t'] == '1.0' ? 'https://hoasenhome.vn/product/' : 'https://hoasenhome.vn/';
//       let newData = {
//         ...urls[index],
//         loc: {
//           '$t': urls[index]['loc']['$t'].replace('https://admin.hoasenhome.vn/', replaceData)
//         } 
//       }
//       delete newData.PageMap;
//       delete newData['image:image'];
//       if (newData['priority']['$t'] == '1.0' || newData['priority']['$t'] == '0.5') {
//         newUrls.push(newData)
//       }
//     }
//     json["urlset"]["url"] = newUrls;
//     var stringified = JSON.stringify(json);
//     var xml = parser.toXml(stringified)
//     fs.writeFile('public/sitemap.xml', formatXml(xml, {collapseContent: true}), function(err, data) {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         console.log('updated!');
//       }
//     });
//   } catch (error) {
//     console.log(error)
//   }
//   return { props: { data } }
// }

export default Home;