import axios from 'axios';

// let urls = {
//     test: `https://magento2.mangoads.com.vn/rest/V1/`,
//     development: 'https://magento2.mangoads.com.vn/rest/V1/',
//     production: 'https://magento2.mangoads.com.vn/rest/V1/'
// }

// console.log(urls[process.env.NODE_ENV]);
const api = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 1000 * 60 * 5,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Requested-Store': 'default',
  },
});

export default api;
