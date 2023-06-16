import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import IconHome from '../components/Desktop/IconHome';
import firebaseConfig from '../services/firebaseConfig';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import api from '../services/api';
import Axios from 'axios';
const newApiFCM = Axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: 'bearer dxxfgvmg8dps2af7m0soo7iyehfx8d23',
  },
});

const AuthContext = createContext({});

function deleteAllCookies() {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const AuthProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [orderListTotal, setOrderListTotal] = useState(1);
  const [orderedProducts, setOrderedProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(null);
  const [cart, setCart] = useState(null);
  const [guestCartId, setGuestCartId] = useState(null);
  const [openLoginModal, setOpenModal] = useState(false);
  const [openLoginOtpModal, setOpenLoginOtpModal] = useState(false);
  const [openLoginModalCheckout, setOpenModalCheckout] = useState(false);
  const [openLoginModalCheckoutLogin, setOpenModalCheckoutLogin] = useState(false);
  const [openSignUpModal, setOpenModalSignup] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [numberphone, setNumberPhone] = useState('');
  const [counter, setCounter] = useState(0);
  const [getCartAgain, setGetCartAgain] = useState(false);
  const [currentCartState, setCurrentCartState] = useState(null);
  const [caculatedResultAll, setCaculateResultAll] = useState(null);
  const [totalNoti, setTotalNoti] = useState(0);
  const [dataSmallNoti, setDataSmallNoti] = useState([]);
  const [showNoti, setShowNoti] = useState(null);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'notifications' }).then(function (notificationPerm) {
        notificationPerm.onchange = function () {
          if (notificationPerm.state === 'granted') {
            OnCheck();
          }
        };
      });
    }
  }, []);

  const getWishlist = async () => {
    if (user) {
      try {
        const result = await api.get('service/wishlist/items');
        if (result.status == 200) {
          setWishlist(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
  };

  const onSetSmallNoti = async () => {
    if (user) {
      const result = await newApiFCM.get(
        `notification/getNotificationsByCustomerId?searchCriteria[currentPage]=1&searchCriteria[pageSize]=5&searchCriteria[filter_groups][0][filters][0][field]=customerId&searchCriteria[filter_groups][0][filters][0][value]=${user.id}&searchCriteria[filter_groups][0][filters][1][field]=notificationType&searchCriteria[filter_groups][0][filters][1][value]=1,2,3,4,5,6,7,8,9,10`
      );

      let length = result.data.length;
      setTotalNoti(result.data[length - 2].totalUnreadRecords);

      if (length < 2) return;
      if (length < 5) {
        setDataSmallNoti(result.data.splice(0, length - 2));
      } else {
        setDataSmallNoti(result.data.splice(0, 3));
      }
    }
  };

  function onMess(id) {
    const messaging = firebaseConfig.messaging();
    messaging
      .getToken({ vapidKey: 'BCoSzpSFG8GgLiFpKdJZURZxfyxkKzgB4PWKDFtB0PZ_5-0_sk5BQb-KVL7czDDC0FVWuR0iEwY2iPCd7Dvrx2o' })
      .then(async (currentToken) => {
        if (currentToken) {
          console.log('currentToken', currentToken);
          if (!Cookies.get('id-device')) {
            const fpPromise = FingerprintJS.load();
            const fp = await fpPromise;
            const idDevice = await fp.get();
            Cookies.set('id-device', idDevice.visitorId);
          }
          try {
            const device = Cookies.get('id-device');
            const result = await newApiFCM.post('notification/updateFCMToken', {
              customerId: id,
              deviceId: device,
              deviceName: 'web',
              fcmToken: currentToken,
            });
          } catch (error) {
            throw error;
          }
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ');
      });

    messaging.onMessage((payload) => {
      setShowNoti(payload);
      onSetSmallNoti();
    });
  }

  const OnCheck = async () => {
    if (Cookies.get('token')) {
      api.defaults.headers.Authorization = `bearer ${Cookies.get('token')}`;
      const result = await api.get('service/customers/me', { withCredentials: true });
      if (result.status == 200 && !result.data.error) {
        try {
          let dateObj = new Date();
          let month = dateObj.getUTCMonth() + 1; //months from 1-12
          if (month <= 9) month = '0' + month;
          let day = dateObj.getUTCDate();
          let year = dateObj.getUTCFullYear();
          let newdate = month + '/' + day + '/' + year;
          const apiSetLastLogin = await newApiFCM.post('notification/updateLastLoginDate', {
            customerId: result.data[0].customer_info.id,
            lastLoginDate: newdate,
          });
          if (!apiSetLastLogin) return;
        } catch (err) {
          console.log(err);
        }
        if (Notification.permission === 'granted') {
          onMess(result.data[0].customer_info.id);
        } else {
          if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(function (permission) {
              if (Notification.permission === 'granted') {
                onMess(result.data[0].customer_info.id);
              } else {
                onMess(result.data[0].customer_info.id);
              }
            });
          } else {
            onMess(result.data[0].customer_info.id);
          }
        }
      }
    }
  };

  useEffect(async () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js', {
            scope: '/', // <--- THIS BIT IS REQUIRED
          })
          .then(async (reg) => {
            OnCheck();
            reg.update();
          });
      });
    }

    const messaging = firebaseConfig.messaging();
    messaging.onMessage((payload) => {
      console.log('Message received. ', payload.data);
      setShowNoti(payload);
      onSetSmallNoti();
    });
  }, []);

  useEffect(() => {
    window.addEventListener('focus', function () {
      setFlag((pre) => pre + 1);
    });

    return () => {
      window.removeEventListener('focus', function () {
        setFlag((pre) => pre + 1);
      });
    };
  }, []);

  const createCartForGuest = async () => {
    const cartId = Cookies.get('cardId');
    if (!cartId) {
      try {
        delete api.defaults.headers.Authorization;
        delete api.defaults.headers.Cookie;
        const result = await api.post('/guest-carts');
        Cookies.set('cardId', result.data, { expires: 7 });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      // check if token has value
      if (token) {
        try {
          api.defaults.headers.Authorization = `bearer ${token}`;
          const result = await api.get('service/customers/me', { withCredentials: true });
          if (result.status == 200 && !result.data.error) {
            setUser(result.data[0].customer_info);
            setCart(result.data[0].cart);
            onSetSmallNoti();
          }

          const shippingAddress = result.data[0].customer_info.addresses.find((element) => element.default_shipping);
          const locationData = Cookies.get('location-data');
          if (shippingAddress != undefined && !locationData) {
            let data = {
              city: {
                country_id: 'VN',
                full_name: shippingAddress.city,
                label: shippingAddress.city,
                value: shippingAddress.custom_attributes.city_id.value,
              },
              district: {
                city_id: shippingAddress.custom_attributes.city_id.value,
                full_name: shippingAddress.custom_attributes.district.value,
                label: shippingAddress.custom_attributes.district.value,
                value: shippingAddress.custom_attributes.district_id.value,
              },
              ward: {
                city_id: shippingAddress.custom_attributes.city_id.value,
                district_id: shippingAddress.custom_attributes.district_id.value,
                full_name: shippingAddress.custom_attributes.ward.value,
                label: shippingAddress.custom_attributes.ward.value,
                value: shippingAddress.custom_attributes.ward_id.value,
              },
            };
            Cookies.set('location-data', data);
          }
        } catch (error) {
          createCartForGuest();
        }
      } else {
        // access people is guest
        await createCartForGuest();
      }

      setLoading(false);
    }
    loadUserFromCookies();
    getWishlist();
  }, []);

  const loadUserOrder = async (page) => {
    if (user != null) {
      try {
        const result = await api.get(`service/orders/p/${page}`);
        console.log('result', result);
        if (result.status == 200 && result.data[0].items != undefined) {
          setOrderList(result.data[0].items);
          setOrderListTotal(result.data[0].total_count);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    loadUserOrder(1);
    getWishlist();
    onSetSmallNoti();
  }, [user]);

  useEffect(() => {
    onSetSmallNoti();
  }, [showNoti]);

  useEffect(() => {
    onSetSmallNoti();
  }, [flag]);

  useEffect(() => {
    async function loadUserOrderProduct() {
      if (user != null && orderList.length != 0) {
        let products = [];
        orderList.forEach(async (element) => {
          try {
            const result = await api.get(`/service/order/${element.entity_id}`);

            if (result.data.items != undefined) {
              result.data.items.forEach((item) => {
                if (!products.includes(item) && !item.parent_item) {
                  products.push(item);
                }
              });
            }
            setOrderedProducts(products);
          } catch (error) {
            console.log(error);
          }
        });
      }
    }
    loadUserOrderProduct();
  }, [orderList]);

  const login = async (email, password) => {
    Cookies.remove('token');
    const cartId = Cookies.get('cardId');

    try {
      let result;
      if (parseInt(email)) {
        result = await api.post('service/customers/signin-with-telephone', { phoneNumber: email, password: password, guestQuoteId: cartId ? cartId : null });
      } else {
        result = await api.post('service/customers/signin', { email: email, password: password, guestQuoteId: cartId ? cartId : null });
      }

      if (result.status == 200 && !result.data.error) {
        try {
          const rs = await api.post('/cart-buy-later/update-token', {
            old_token: cartId,
            new_token: result.data[0].customer_info.id,
          });
        } catch (err) {
          console.log('🚀 ~ file: auth.js ~ line 339 ~ login ~ err', err);
        }

        Cookies.set('token', result.data[0].access_token);
        Cookies.set('PHPSESSID', result.data[0].customer_info.session_id);
        Cookies.remove('cardId');
        if (window.location.pathname == '/checkout') {
          api.defaults.headers.Authorization = `bearer ${result.data[0].access_token}`;
          const guestShippingData = Cookies.get('guestShippingData');
          if (guestShippingData) {
            const shippingDefault = JSON.parse(guestShippingData);
            let lname = shippingDefault.fullname.substr(0, shippingDefault.fullname.indexOf(' '));
            let fname = shippingDefault.fullname.substr(shippingDefault.fullname.indexOf(' ') + 1);

            let data = {
              default_billing: false,
              default_shipping: true,
              firstname: fname,
              lastname: lname,
              country_id: 'VN',
              street: [shippingDefault.street],
              telephone: shippingDefault.telephone,
              city: shippingDefault.cityObj.full_name,
              custom_attributes: {
                city_id: shippingDefault.cityObj.value,
                district: shippingDefault.districtObj.full_name,
                district_id: shippingDefault.districtObj.value,
                ward: shippingDefault.wardObj.full_name,
                ward_id: shippingDefault.wardObj.value,
              },
            };
            try {
              const result = await api.post('service/customers/address', { address: data });
              if (result.status == 200) {
                window.location.href = '/checkout';
              }
            } catch (error) {
              console.log(error);
              alert(error.response.data.message);
            }
          }
        } else {
          window.location.pathname = '/';
        }
      }
    } catch (error) {
      if (error.response.data.message == "The phone number isn't registered.") {
        alert('Số điện thoại chưa được đăng ký!');
      } else if (error.response.data.message == 'Invalid login or password.') {
        alert('Tài khoản hoặc mật khẩu không đúng!');
      } else if (error.response.data.message.includes('No such entity with email')) {
        alert('Email chưa được đăng ký!');
      } else if (error.response.data.message.search('The OTP code for register account was sent') != -1 || error.response.data.message.search('The OTP code for register account was expired') != -1) {
        var myPhone = error.response.data.message.substring(error.response.data.message.lastIndexOf('[') + 1, error.response.data.message.lastIndexOf(']'));
        setNumberPhone(myPhone);
        alert('Tài khoản của bạn chưa hoàn tất đăng ký. Vui lòng nhập mã OTP');
        await sendSingUpOtp(myPhone);
      } else {
        alert('Tài khoản của bạn đã gặp lỗi vui lòng liên hệ quản trị viên.');
      }
      console.log(error);
    }
  };

  const loginWithOtp = async (item) => {
    Cookies.remove('token');
    const cartId = Cookies.get('cardId');
    try {
      var data = {
        phoneNumber: item.phone,
        otpCode: item.otp,
        guestQuoteId: cartId,
      };

      const result = await api.post('/service/customers/sms/signin', data);
      if (result.status == 200 && !result.data.error) {
        setPhoneOtp('');
        Cookies.set('token', result.data[0].access_token);
        Cookies.set('PHPSESSID', result.data[0].customer_info.session_id);
        Cookies.remove('cardId');
        if (window.location.pathname == '/checkout') {
          window.location.reload();
        } else {
          window.location.pathname = '/';
        }
      }
    } catch (error) {
      alert('Mã OTP không hợp lệ.');
    }
  };

  const loginWithOtpCheckout = async (item) => {
    Cookies.remove('token');
    const cartId = Cookies.get('cardId');
    try {
      var data = {
        phoneNumber: item.phone,
        otpCode: item.otp,
        guestQuoteId: cartId,
      };

      const result = await api.post('/service/customers/sms/signin', data);
      if (result.status == 200 && !result.data.error) {
        setPhoneOtp('');
        Cookies.set('token', result.data[0].access_token);
        api.defaults.headers.Authorization = `bearer ${result.data[0].access_token}`;
        Cookies.set('PHPSESSID', result.data[0].customer_info.session_id);
        Cookies.remove('cardId');
        Cookies.remove('currentUserPayment');
      }
    } catch (error) {
      if (error.response.data.message == 'The OTP code invalid.') {
        alert('Mã OTP không hợp lệ.');
      } else {
        alert('Số điện thoại chưa được đăng ký.');
      }
    }
    const guestShippingData = Cookies.get('guestShippingData');
    if (guestShippingData) {
      const shippingDefault = JSON.parse(guestShippingData);
      let lname = shippingDefault.fullname.substr(0, shippingDefault.fullname.indexOf(' '));
      let fname = shippingDefault.fullname.substr(shippingDefault.fullname.indexOf(' ') + 1);

      let data = {
        default_billing: false,
        default_shipping: true,
        firstname: fname,
        lastname: lname,
        country_id: 'VN',
        street: [shippingDefault.street],
        telephone: shippingDefault.telephone,
        city: shippingDefault.cityObj.full_name,
        custom_attributes: {
          city_id: shippingDefault.cityObj.value,
          district: shippingDefault.districtObj.full_name,
          district_id: shippingDefault.districtObj.value,
          ward: shippingDefault.wardObj.full_name,
          ward_id: shippingDefault.wardObj.value,
        },
      };
      try {
        const result = await api.post('service/customers/address', { address: data });
        if (result.status == 200) {
          window.location.href = '/checkout';
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  const loginModal = async (email, password) => {
    Cookies.remove('token');
    const cartId = Cookies.get('cardId');
    try {
      let result;
      if (parseInt(email)) {
        result = await api.post('service/customers/signin-with-telephone', { phoneNumber: email, password: password, guestQuoteId: cartId ? cartId : null });
      } else {
        result = await api.post('service/customers/signin', { email: email, password: password, guestQuoteId: cartId ? cartId : null });
      }

      if (result.status == 200 && !result.data.error) {
        Cookies.set('token', result.data[0].access_token);
        Cookies.set('PHPSESSID', result.data[0].customer_info.session_id);
        Cookies.remove('cardId');
        api.defaults.headers.Authorization = `bearer ${result.data[0].access_token}`;
        setUser(result.data[0].customer_info);
        const shippingAddress = result.data[0].customer_info.addresses.find((element) => element.default_shipping);
        const locationData = Cookies.get('location-data');
        if (shippingAddress != undefined && !locationData) {
          let data = {
            city: {
              country_id: 'VN',
              full_name: shippingAddress.city,
              label: shippingAddress.city,
              value: shippingAddress.custom_attributes.city_id.value,
            },
            district: {
              city_id: shippingAddress.custom_attributes.city_id.value,
              full_name: shippingAddress.custom_attributes.district.value,
              label: shippingAddress.custom_attributes.district.value,
              value: shippingAddress.custom_attributes.district_id.value,
            },
            ward: {
              city_id: shippingAddress.custom_attributes.city_id.value,
              district_id: shippingAddress.custom_attributes.district_id.value,
              full_name: shippingAddress.custom_attributes.ward.value,
              label: shippingAddress.custom_attributes.ward.value,
              value: shippingAddress.custom_attributes.ward_id.value,
            },
          };
          Cookies.set('location-data', data);
        }
        setOpenModal(false);
      }
    } catch (error) {
      alert('Mật khẩu không đúng');
      console.log(error);
    }
  };

  const loginSocialModal = async (user, typeSocial) => {
    Cookies.remove('token');
    const cartId = Cookies.get('cardId');
    try {
      const result = await api.post('service/customer/social-login', {
        userProfile: {
          identifier: user.profile.id,
          email: user.profile.email,
          firstname: user.profile.firstName,
          lastname: user.profile.lastName,
          type: typeSocial,
          password: null,
        },
        guestQuoteId: cartId,
      });
      if (result.status == 200 && !result.data.error) {
        Cookies.set('token', result.data[0].access_token);
        Cookies.set('PHPSESSID', result.data[0].customer_info.session_id);
        Cookies.remove('cardId');
        api.defaults.headers.Authorization = `bearer ${result.data[0].access_token}`;
        setUser(result.data[0].customer_info);
      }
    } catch (error) {
      throw error;
    }
  };

  const loginFacebookSocial = async (user) => {
    Cookies.remove('token');
    const cartId = Cookies.get('cardId');
    try {
      const result = await api.post('service/customer/social-login', {
        userProfile: {
          identifier: user.profile.id,
          email: user.profile.email,
          firstname: user.profile.firstName,
          lastname: user.profile.lastName,
          type: 'Facebook',
          password: null,
        },
        guestQuoteId: cartId,
      });
      if (result.status == 200 && !result.data.error) {
        Cookies.set('token', result.data[0].access_token);
        Cookies.set('PHPSESSID', result.data[0].customer_info.session_id);
        Cookies.remove('cardId');
        window.location.pathname = '/';
      }
    } catch (error) {
      throw error;
    }
  };

  const loginGoogleSocial = async (user) => {
    Cookies.remove('token');
    const cartId = Cookies.get('cardId');
    try {
      const result = await api.post('service/customer/social-login', {
        userProfile: {
          identifier: user.profile.id,
          email: user.profile.email,
          firstname: user.profile.firstName,
          lastname: user.profile.lastName,
          type: 'Google',
          password: null,
        },
        guestQuoteId: cartId,
      });
      if (result.status == 200 && !result.data.error) {
        Cookies.set('token', result.data[0].access_token);
        Cookies.set('PHPSESSID', result.data[0].customer_info.session_id);
        Cookies.remove('cardId');
        window.location.pathname = '/';
      }
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (data) => {
    Cookies.remove('token');
    delete api.defaults.headers.Authorization;
    const cartId = Cookies.get('cardId');
    try {
      // let mail = "hs" + Date.now() + "@hoasen.com";
      let mail = '';
      if (data.email) mail = data.email;
      let lname = data.fullname.substr(0, data.fullname.indexOf(' '));
      let fname = data.fullname.substr(data.fullname.indexOf(' ') + 1);
      var obj = {
        customer: {
          email: mail,
          firstname: fname,
          lastname: lname,
          dob: data.dob,
          gender: data.gender,
          website_id: '1',
          extension_attributes: {
            telephone: data.telephone,
          },
        },
        password: data.password,
        guestQuoteId: cartId,
        isSubscribed: data.isSubscribed,
      };

      const result = await api.post('/service/customers/signup', obj);
      if (result.status == 200 && !result.data.error) {
        Cookies.set('token', result.data[0].access_token);
        alert('Đăng kí thành công');
        window.location.pathname = '/';
      }
    } catch (error) {
      if (error.response.data.message == 'A customer with the same email address already exists in an associated website.') {
        alert('Một khách hàng có cùng địa chỉ email đã tồn tại');
      } else if (error.response.data.message == 'The password needs at least %1 characters. Create a new password and try again.') {
        alert('Mật khẩu chưa đủ độ bảo mật. Tạo mật khẩu mới và thử lại.');
      } else if (error.response.data.message == 'Phone number is incorrect, please verify and try again.') {
        alert('Số điện thoại không chính xác, vui lòng xác minh và thử lại.');
      } else if (error.response.data.message == 'Số điện thoại đã được sử dụng để đăng ký cho một tài khoản khác.') {
        alert('Số điện thoại đã được sử dụng để đăng ký cho một tài khoản khác.');
      } else if (error.response.data.message.search('The OTP code for register account was sent') != -1) {
        setPhoneOtp(data.telephone);
        setOpenModalSignup(true);
        setCounter(60);
      } else {
        alert('Vui lòng thử lại sau.');
      }
    }
  };

  const resendOtp = async (phone) => {
    try {
      const result = await api.post('/customers/sms/registration', { phoneNumber: phone });
      if (result.status == 200 && !result.data.error) {
        console.log('Gui lai ma thanh cong');
        setCounter(60);
      }
    } catch (error) {
      alert('Số điện thoại chưa được đăng ký.');
    }
  };

  const sendSingUpOtp = async (phone) => {
    try {
      const result = await api.post('/customers/sms/registration', { phoneNumber: phone });
      if (result.status == 200 && !result.data.error) {
        console.log('Gui lai ma thanh cong');
      }
    } catch (error) {
      alert('Số điện thoại chưa được đăng ký.');
    }
  };
  const getLoginOtp = async (phone) => {
    try {
      const result = await api.post('/customers/sms/login', { phoneNumber: phone });
      if (result.status == 200 && !result.data.error) {
        setPhoneOtp(phone);
        setCounter(60);
      }
      return 'Code Sent';
    } catch (error) {
      return error.response.data.message;
    }
  };

  const getResetPasswordOtp = async (phone) => {
    try {
      const result = await api.post('/customers/sms/forgot-password', { phoneNumber: phone });
      if (result.status == 200 && !result.data.error) {
        setPhoneOtp(phone);
        setCounter(60);
      }
      return 'Code Sent';
    } catch (error) {
      return error.response.data.message;
    }
  };
  const activeOtp = async (item) => {
    Cookies.remove('token');
    delete api.defaults.headers.Authorization;
    const cartId = Cookies.get('cardId');
    try {
      var data = {
        phoneNumber: item.phone,
        otpCode: item.otp,
        guestQuoteId: cartId,
      };

      const result = await api.post('/service/customers/sms/activate', data);
      if (result.status == 200 && !result.data.error) {
        Cookies.set('token', result.data[0].access_token);
        setPhoneOtp('');
        Cookies.remove('cardId');
        window.location.pathname = '/';
      }
    } catch (error) {
      if (error.response.data.message == 'The OTP code invalid.') {
        alert('Mã OTP không hợp lệ.');
      } else {
        alert('Số điện thoại chưa được đăng ký.');
      }
    }
  };

  const activeOtpSingup = async (item) => {
    Cookies.remove('token');
    delete api.defaults.headers.Authorization;
    const cartId = Cookies.get('cardId');
    try {
      var data = {
        phoneNumber: item.phone,
        otpCode: item.otp,
        guestQuoteId: cartId,
      };

      const result = await api.post('/service/customers/sms/activate', data);
      if (result.status == 200 && !result.data.error) {
        Cookies.set('token', result.data[0].access_token);
        api.defaults.headers.Authorization = `bearer ${result.data[0].access_token}`;
        Cookies.set('PHPSESSID', result.data[0].customer_info.session_id);
        setPhoneOtp('');
        Cookies.remove('cardId');
      }
    } catch (error) {
      if (error.response.data.message == 'The OTP code invalid.') {
        alert('Mã OTP không hợp lệ.');
      } else {
        alert('Số điện thoại chưa được đăng ký.');
      }
    }
    const guestShippingData = Cookies.get('guestShippingData');
    if (guestShippingData) {
      const shippingDefault = JSON.parse(guestShippingData);
      console.log(shippingDefault);
      let lname = shippingDefault.fullname.substr(0, shippingDefault.fullname.indexOf(' '));
      let fname = shippingDefault.fullname.substr(shippingDefault.fullname.indexOf(' ') + 1);

      let data = {
        default_billing: false,
        default_shipping: true,
        firstname: fname,
        lastname: lname,
        country_id: 'VN',
        street: [shippingDefault.street],
        telephone: shippingDefault.telephone,
        city: shippingDefault.cityObj.full_name,
        custom_attributes: {
          city_id: shippingDefault.cityObj.value,
          district: shippingDefault.districtObj.full_name,
          district_id: shippingDefault.districtObj.value,
          ward: shippingDefault.wardObj.full_name,
          ward_id: shippingDefault.wardObj.value,
        },
      };
      try {
        const result = await api.post('service/customers/address', { address: data });
        if (result.status == 200) {
          window.location.href = '/checkout';
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };
  const setCheckAll = async (e) => {
    let data1 = {};
    if (currentCartState) {
      currentCartState.forEach((element) => {
        data1[element.item_id] = false;
      });
      let body = JSON.stringify(data1);
      try {
        const result = await api.post(`carts/mine/set-buy-latter`, {
          data: body,
        });
      } catch (error) {
        alert('Lỗi server');
      }
    }
  };

  const logout = async () => {
    const copy = Cookies.get('id-device');
    await setCheckAll();
    await Cookies.remove('token');
    await Cookies.remove('cardId');
    await Cookies.remove('PHPSESSID');
    await Cookies.remove('__cfduid');
    await Cookies.remove('first-login');
    setUser(null);
    await deleteAllCookies();
    Cookies.set('id-device', copy);

    if (copy) {
      const result = await newApiFCM.post('notification/updateFCMToken', {
        customerId: user.id,
        deviceName: 'web',
        deviceId: Cookies.get('id-device'),
        fcmToken: '',
      });
    }
    delete api.defaults.headers.Authorization;
    window.location.href = '/';
  };

  const getTotalGuestInfo = async () => {
    try {
      const guestId = Cookies.get('cardId');
      if (guestId) {
        try {
          const result = await api.post(`guest-carts/${guestId}/totals-information`, {
            addressInformation: {
              address: {
                countryId: 'VN',
                city: '<city>',
                extension_attributes: {
                  advanced_conditions: {
                    billing_address_country: null,
                    city: '<city>',
                    currency: 'VND',
                    payment_method: null,
                    shipping_address_line: [],
                  },
                },
                postcode: null,
                region: null,
              },
              shipping_carrier_code: 'freeshipping',
              shipping_method_code: 'freeshipping',
            },
          });
          setCaculateResultAll(result.data);
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const getTotalUserInfo = async () => {
    try {
      if (user) {
        try {
          const result = await api.post(`carts/mine/totals-information`, {
            addressInformation: {
              address: {
                countryId: 'VN',
                city: '<city>',
                extension_attributes: {
                  advanced_conditions: {
                    billing_address_country: null,
                    city: '<city>',
                    currency: 'VND',
                    payment_method: null,
                    shipping_address_line: [],
                  },
                },
                postcode: null,
                region: null,
              },
              shipping_carrier_code: 'freeshipping',
              shipping_method_code: 'freeshipping',
            },
          });
          setCaculateResultAll(result.data);
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        getTotalGuestInfo,
        getTotalUserInfo,
        caculatedResultAll,
        user,
        login,
        loginFacebookSocial,
        loginModal,
        loginSocialModal,
        loginGoogleSocial,
        loading,
        signUp,
        logout,
        orderedProducts,
        orderList,
        wishlist,
        getWishlist,
        cart,
        createCartForGuest,
        setOpenModal,
        openLoginModal,
        openLoginOtpModal,
        setOpenLoginOtpModal,
        openLoginModalCheckout,
        setOpenModalCheckout,
        loginWithOtpCheckout,
        openSignUpModal,
        setOpenModalSignup,
        activeOtpSingup,
        phoneOtp,
        setPhoneOtp,
        resendOtp,
        sendSingUpOtp,
        activeOtp,
        counter,
        setCounter,
        getLoginOtp,
        getResetPasswordOtp,
        loginWithOtp,
        setGetCartAgain,
        getCartAgain,
        setOpenModalCheckoutLogin,
        openLoginModalCheckoutLogin,
        setCurrentCartState,
        numberphone,
        orderListTotal,
        loadUserOrder,
        showPopup,
        setShowPopup,
        totalNoti,
        dataSmallNoti,
        onSetSmallNoti,
        showNoti,
        setShowNoti,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
