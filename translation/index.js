import vi from './locales/vi.json';
// import en from '../public/static/locales/en/common.json';
// import { getLang } from '../utils/cookie';

function t(key) {
  const data = { vi: vi };
  // const location = getLang();
  // return data[location][key] || data.vi[key];
  return vi[key];
}

export default t;
