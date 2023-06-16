import Axios from "axios";

// let urls = {
//     test: `https://magento2.mangoads.com.vn/rest/V1/`,
//     development: 'https://magento2.mangoads.com.vn/rest/V1/',
//     production: 'https://magento2.mangoads.com.vn/rest/V1/'
// }
const intergrationApi = Axios.create({
    baseURL: process.env.BASE_API,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'bearer ' + process.env.BEARER,
    }
});

export default intergrationApi;