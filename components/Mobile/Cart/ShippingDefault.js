import Link from 'next/link';
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useCommon } from '../../../contexts/common'
import { useForm } from 'react-hook-form'
import api from '../../../services/api'
import CheckoutCategory from './CheckoutCategory'
import { useAuth } from '../../../contexts/auth'
import LoginModalCheckOut from '../../Desktop/Common/LoginModalCheckOut'
import Cookies from 'js-cookie';
import SignUpModal from '../../Desktop/Common/SignUpModal'
import Modal from 'react-bootstrap/Modal'

const initCity = {
  value: "", label: "Tất cả Tỉnh/Thành Phố", country_id: "VN"
}

const initDistrict = {
  value: "",
  label: "Tất cả Quận Huyện",
  city_id: ""
}

const initWard = {
  value: "",
  label: "Tất cả Phường/Xã",
  city_id: ""
}

function ShippingDefault({ setCaculating, data, notConfirm, category, isPayNow, setCheckoutSuccess, setShippingAddress, setNotConfirm }) {
  const { getLoginOtp, login, setOpenModalCheckout, signUp } = useAuth();
  const [cities, setCites] = useState(null);
  const [districts, setDistricts] = useState([initDistrict]);
  const [wards, setWards] = useState([initWard]);
  const [currentCity, setCurrentCity] = useState(initCity);
  const [currentDistrict, setCurrentDistrict] = useState(initDistrict);
  const [currentWard, setCurrentWard] = useState(initWard);
  const { location } = useCommon();
  const { register, handleSubmit, errors } = useForm();
  const [shippingMethod, setShippingMethod] = useState(null);
  const [paymentMethodList, setPaymentMethod] = useState(null);
  const [currentState, setCurrentState] = useState(data.address);
  const [currentShippingMethod, setCurrentShippingMethod] = useState(null);
  const [setted, changeAlreadySetBefored] = useState(true);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [openModalLoginPhone, setOpenModalLoginPhone] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!notConfirm) {
      if (!shippingMethod && !setted) {
        alert("Hãy điền đầy đủ thông tin địa chỉ");
        setNotConfirm(true);
      }
    }
  }, [notConfirm])

  useEffect(async () => {
    if (isPayNow) {
      await setPayOrder()
    }
  }, [isPayNow])

  useEffect(() => {
    if (location) {
      setCites(location.cites);
      if (Cookie.get("location-data")) {
        const locationData = JSON.parse(Cookie.get("location-data"));
        if (locationData) {
          setCurrentCity(locationData.city);

          const findingDistricts = location.districts.filter(district => district.city_id == locationData.city.value);
          setDistricts(findingDistricts);

          const findingWards = location.wards.filter(ward => ward.district_id == locationData.district.value);
          setWards(findingWards);
          setCurrentDistrict(locationData.district);
          setCurrentWard(locationData.ward);
        }
      }
    }
  }, [location])

  useEffect(async () => {
    const guestId = Cookie.get("cardId");
    if (guestId) {
      try {
        const result = await api.get(`service/guest-carts/${guestId}/payment-methods`);
        setPaymentMethod(result.data);
        let lastPaymentmethod = Cookie.get('guestPaymentMethod');
        if (lastPaymentmethod && JSON.parse(lastPaymentmethod)) {
          setCurrentPayment(JSON.parse(lastPaymentmethod));
        } else {
          setCurrentPayment(result.data[0]);
          Cookie.set("guestPaymentMethod", result.data[0]);
        }
      } catch (error) {
        throw error
      }
    }
    if (data.address.firstname) {
      changeAlreadySetBefored(true);
      if (guestId) {
        try {
          const result = await api.post(`/guest-carts/${guestId}/estimate-shipping-methods`, {
            "address": {
              "city": currentCity.label,
              "company": null,
              "country_id": "VN",
              "custom_attributes": {
                "city_id": { "attribute_code": "city_id", "value": currentCity.value },
                "district": { "attribute_code": "district", "value": currentDistrict.label },
                "district_id": { "attribute_code": "district_id", "value": currentDistrict.value },
                "ward": { "attribute_code": "ward", "value": currentWard.label },
                "ward_id": { "attribute_code": "ward_id", "value": currentWard.value }
              },
              "firstname": data.address.firstname,
              "lastname": data.addresslastname,
              "postcode": null,
              "region": null,
              "save_in_address_book": 1,
              "street": data.address.street,
              "telephone": data.address.telephone
            }
          })
          setShippingMethod(result.data);
          if (data.method != null) {
            result.data.forEach(element => {
              if (`${element.method_code}_${element.carrier_code}` == data.method) {
                if (!currentPayment) {
                  let lastPaymentmethod = Cookie.get('guestPaymentMethod');
                  if (lastPaymentmethod && JSON.parse(lastPaymentmethod)) {
                    setCurrentPayment(JSON.parse(lastPaymentmethod));
                    let currentPay = JSON.parse(lastPaymentmethod);
                    setCurrentShippingMethod(element);
                    setShippingAddress({ city: data.address.city, payment_method: currentPay, shipping_carrier_code: element.carrier_code, shipping_method_code: element.method_code, shipping_address_line: data.address.street });
                  }
                } else {
                  setCurrentShippingMethod(element);
                  setShippingAddress({ city: data.address.city, payment_method: currentPayment, shipping_carrier_code: element.carrier_code, shipping_method_code: element.method_code, shipping_address_line: data.address.street });
                }
              }
            });
          } else {
            setShippingAddress({ city: data.address.city, payment_method: currentPayment, shipping_carrier_code: result.data[0].carrier_code, shipping_method_code: result.data[0].method_code, shipping_address_line: data.address.street });
            setCurrentShippingMethod(result.data[0]);
          }
        } catch (error) {
          throw error
        }
      }
    } else {
      changeAlreadySetBefored(false);
    }
  }, [])

  const setPayment = (item) => {
    setCurrentPayment(item);
    setShippingAddress({ city: currentState.city, payment_method: item, shipping_carrier_code: currentShippingMethod.carrier_code, shipping_method_code: currentShippingMethod.method_code, shipping_address_line: currentState.street });
    Cookie.set("guestPaymentMethod", item);
  }

  const changeCity = (e) => {
    const found = location.cites.find(city => city.value == e.target.value);
    let data = {
      ...currentCity,
      value: found.value,
      label: found.label,
      full_name: found.full_name
    }
    setCurrentCity(data);
    // Find district
    const findingDistricts = location.districts.filter(district => district.city_id == data.value || district.city_id == '');
    setDistricts(findingDistricts);
    setCurrentDistrict(initDistrict);
    setWards([initWard]);
  }

  const changeDistrict = (e) => {
    const found = districts.find(district => district.value == e.target.value);
    let data = {
      ...currentDistrict,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
      city_id: found.city_id
    }
    setCurrentDistrict(data);

    // Find ward
    const findingWards = location.wards.filter(ward => ward.district_id == data.value || ward.district_id == '');
    setWards(findingWards);
  }

  const changeWard = (e) => {
    const found = wards.find(ward => ward.value == e.target.value);
    let data = {
      ...currentWard,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
      district_id: found.district_id
    }
    setCurrentWard(data);
  }

  const setLocation = () => {
    let data = {
      city: currentCity,
      district: currentDistrict,
      ward: currentWard
    }
    Cookie.set("location-data", data)
  }

  const submit = async (data) => {
    data.cityObj = await cities.find(city => city.value == data.city);
    data.districtObj = await districts.find(district => district.value == data.district);
    data.wardObj = await wards.find(ward => ward.value == data.ward);
    let location = {
      city: data.cityObj,
      district: data.districtObj,
      ward: data.wardObj
    }
    Cookie.set("location-data", location);
    Cookies.set('guestShippingData', data);
    let isPhoneNew = false;
    setPhone(data.telephone);
    try {
      const result = await api.post('/service/customer/validate-telephone', {
        'phoneNumber': data.telephone
      })
      isPhoneNew = result.data;
    } catch (error) {
      console.log(error)
    }    
    if (isPhoneNew) {
      await checkUserByPhone (data);
    } else {
      setOpenModalLoginPhone(true);
    }
    return;
  }

  const forgotPassword = async () => {
    const result = await getLoginOtp(phone);
    if (result == 'Code Sent') {
      setOpenModalCheckout(true);
    }
  }

  const handlePhone = async (data) => {
    await login(phone, data.password);
    return;
  }

  const checkUserByPhone = async (data) => {
    const result = await getLoginOtp(data.telephone);
    if (result == 'Code Sent') {
      setOpenModalCheckout(true);
    } else {
      let registerData = {
        fullname: data.fullname,
        mail: '',
        dob: null,
        gender: 1,
        telephone: data.telephone,
        password: '@#adDVVVXXXqwerwerwer123'
      };

      await signUp(registerData);
      };
  }

  const changeShippingMethod = async (item) => {
    const guestId = Cookie.get('cardId');
    setCurrentShippingMethod(item);
    setShippingAddress({ city: currentCity.label, payment_method: currentPayment, shipping_carrier_code: item.carrier_code, shipping_method_code: item.method_code, shipping_address_line: currentState.street });
    if (guestId) {
      try {
        const result = await api.post(`/guest-carts/${guestId}/shipping-information`, {
          "addressInformation": {
            "shipping_address": {
              "city": currentCity.label,
              "company": null,
              "countryId": "VN",
              "customAttributes": [
                { "attribute_code": "ward_id", "value": currentWard.value },
                { "attribute_code": "ward", "value": currentWard.label },
                { "attribute_code": "district_id", "value": currentDistrict.value },
                { "attribute_code": "district", "value": currentDistrict.label },
                { "attribute_code": "city_id", "value": currentCity.value }
              ],
              "customerAddressId": null,
              "customerId": null,
              "fax": null,
              "firstname": currentState.firstname,
              "lastname": currentState.lastname,
              "middlename": null,
              "postcode": "12345",
              "prefix": null,
              "region": null,
              "regionCode": null,
              "saveInAddressBook": null,
              "street": currentState.street,
              "suffix": null,
              "telephone": currentState.telephone,
              "vatId": null
            },
            "shipping_carrier_code": item.method_code,
            "shipping_method_code": item.carrier_code
          }
        })
      } catch (error) {
        throw error;
      }
    }
  }

  const setPayOrder = async () => {
    const guestId = Cookie.get("cardId");
    setCaculating(true);
    if (currentPayment) {
      let payMethod = currentPayment;
      if (payMethod.code == 'checkmo') {
        try {
          const result = await api.post(`service/guest-carts/${guestId}/payment-information`, {
            "email": "example@gmail.com",
            "paymentMethod": {
              "additional_data": null,
              "method": "checkmo",
              "po_number": null
            }
          })
          Cookie.remove('cardId');
          setCheckoutSuccess(result.data);
          // createCartForGuest();
        } catch (error) {
          alert(error.response.data.message)
          return;
        }
      } else {
        try {
          const result = await api.post(`guest-carts/${guestId}/set-payment-information`, {
            "billingAddress": {
              "city": currentCity.label,
              "company": null,
              "countryId": "VN",
              "customAttributes": [
                { "attribute_code": "ward_id", "value": currentWard.value },
                { "attribute_code": "ward", "value": currentWard.label },
                { "attribute_code": "district_id", "value": currentDistrict.value },
                { "attribute_code": "district", "value": currentDistrict.label },
                { "attribute_code": "city_id", "value": currentCity.value }
              ],
              "firstname": currentState.firstname,
              "lastname": currentState.lastname,
              "postcode": "12345",
              "saveInAddressBook": null,
              "street": currentState.street,
              "suffix": null,
              "telephone": currentState.telephone,
              "vatId": null
            },
            "cardId": guestId,
            "email": "example@gmail.com",
            "paymentMethod": {
              "method": "vnpay"
            }
          })
        } catch (error) {
          alert(error.response.data.message)
          return;
        }
        await api.get(`guest-carts/${guestId}/vnpay?return=${encodeURI(window.location.href + '/success')}`).then((res) => {
          document.location.href = res.data;
        }).catch((error) => {
          throw error
        })
      }
      setCaculating(false);
    }
  }

  useEffect(() => {
    if (currentState && currentState.lastname && currentState.firstname && typeof (currentState.fullname) == "undefined") {
      let newState = currentState;
      let fullname = currentState.lastname + ' ' + currentState.firstname;
      setCurrentState({
        ...newState,
        fullname
      })
    }
  }, [currentState])

  const setStateInput = async (e) => {
    e.persist();
    setCurrentState({ ...currentState, fullname: e.target.value })
  }

  return (
    <>
      {notConfirm && setted && location && (
        <div className="pd-15   sec-bd-bottom box-cart-4">
          <h6 className="box-title">Thông tin nhận hàng</h6>
          <span className="w5">
            {currentState.lastname} {currentState.firstname}
          </span><br />
          {currentState.telephone} <br />
          {currentState.street}, {currentWard.label}, {currentDistrict.label}, {currentCity.label}
          <div className="action">
            <a className="cl1" onClick={() => { changeAlreadySetBefored(false) }} >Đổi địa chỉ</a>
          </div>
        </div>
      )}
      {notConfirm && !setted && location && (
        <>
          <div className="sec-bd-bottom  box-cart-5" style={{ display: "block" }}>
            <h6 className="box-title">Thông tin nhận hàng</h6>
            <form onSubmit={handleSubmit(submit)}>
              <div className="pd-15">
                <div className="row list-item-20">
                  <div className="col-md-12">
                    <label className="full">
                      <div className="input-title"> <span className="require">*</span> Họ và tên </div>
                      <input className="input style-2" placeholder="Họ và tên" defaultValue={currentState.fullname || ''} onChange={(e) => setStateInput(e)} name="fullname"
                        ref={register({
                          required: {
                            value: true,
                            message: "Vui lòng nhập họ và tên",
                          },
                          pattern: {
                            value: /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*( [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*)+/,
                            message: "Vui lòng nhập đầy đủ họ và tên",
                          },
                        })} />
                      {errors.fullname && <div className="error">Hãy nhập họ và tên của bạn</div>}
                    </label>
                  </div>
                  <div className="col-md-6">
                    <label className="full">
                      <div className="input-title"> <span className="require">*</span> Số điện thoại  </div>
                      <input className="input style-2" placeholder="Số điện thoại" name="telephone"
                        ref={register({
                          required: {
                            value: true,
                            message: "Vui lòng nhập số điện thoại",
                          },
                          pattern: {
                            value: /(03|05|07|08|09)+([0-9]{8})\b/,
                            message: "Số điện thoại không đúng",
                          }
                        })} defaultValue={currentState.telephone || ''} />
                      {errors.telephone && <div className="error">{errors.telephone.message}</div>}
                    </label>
                  </div>
                  <div className="col-md-6">
                    <label className="full">
                      <div className="input-title"> <span className="require">*</span> Số nhà, tên đường  </div>
                      <input className="input style-2" placeholder="Số nhà, tên đường" name="street" ref={register({
                            required: {
                              value: true,
                              message: "Hãy nhập tên đường của bạn",
                            }
                          })} defaultValue={currentState.street[0] || ''} onChange={(e) => setCurrentState({ ...currentState, street: [`${e.target.value}`] })} />
                      {errors.street && <div className="error">{errors.street.message}</div>}
                    </label>
                  </div>
                </div>

                <h6 className="title"><span className="require">*</span> Chọn khu vực</h6>
                <p className="cl4">VUI LÒNG NHẬP THÔNG TIN CHÍNH XÁC ĐỂ CHÚNG TÔI GIAO HÀNG SỚM NHẤT CHO BẠN</p>
                <div className="row list-item-20">
                  <div className="col-md-4">
                    <select id="address_Tinh" className="select select-tinh" defaultValue={currentCity.value} name="city" onChange={(e) => changeCity(e)} ref={register({ required: true })}>
                      {cities && cities.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {errors.city && <div className="error">Hãy nhập thành phố đúng</div>}
                  </div>
                  <div className="col-md-4">
                    <select id="address_QH" className="select select-quan" defaultValue={currentDistrict.value} name="district" onChange={(e) => changeDistrict(e)} ref={register({ required: true })}>
                      {districts.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {errors.district && <div className="error">Hãy nhập quận huyện đúng</div>}
                  </div>
                  <div className="col-md-4">
                    <select id="address_PX" className="select select-phuong" defaultValue={currentWard.value} name="ward" onChange={(e) => changeWard(e)} ref={register({ required: true })}>
                      {wards.map((item, index) => (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    {errors.ward && <div className="error">Hãy nhập phường xã đúng</div>}
                  </div>
                </div>
              </div>
              <div className="pd-15">
                <div><button className="btn btn-4  " type="submit">Giao hàng đến địa chỉ này</button></div>
              </div>
            </form>
          </div>
        </>
      )}
      {notConfirm && setted && shippingMethod && (<div className="pd-15  sec-bd-bottom box-cart-3">
        <h6 className="box-title-2">Hình thức vận chuyển</h6>
        <form>
          {currentShippingMethod && shippingMethod.map((item, index) => (
            <label htmlFor={item.method_code} className="radio full" key={index}>
              <input name={item.method_code} type="radio" id={item.method_code} value={item.method_code} checked={item.method_code == currentShippingMethod.method_code} onChange={() => changeShippingMethod(item)} />
              <span></span>
                <img src="/images/svg/t11.svg" alt="" /> {item.method_title}
            </label>
          ))}
        </form>
      </div>)}
      {notConfirm && setted && currentShippingMethod && paymentMethodList && (
        <div className="pd-15  sec-bd-bottom box-cart-3">
          <h6 className="box-title-2">Hình thức thanh toán</h6>

          {paymentMethodList.map((item, index) => (
            <label className="radio full" key={index}>
              <input name={item.code} type="radio" checked={currentPayment ? item.code == currentPayment.code : false} onChange={() => setPayment(item)} />
              <span></span>
              <img src="/images/svg/t11.svg" alt="" /> {item.title}
            </label>
          ))}

        </div>
      )}
      {!notConfirm && setted &&
        <>
          <div className="pd-15   sec-bd-bottom box-cart-4">
            <div className="mb-10 b w7">Thông tin người nhận</div>
            <div>
              <span className="w5">{currentState.lastname} {currentState.firstname}</span> <br />
              {currentState.telephone} <br />
              {currentState.street} {currentState.city}
            </div>
          </div>
          <div className="pd-15  sec-bd-bottom box-cart-3">
            <div className="mb-10 b w7">Hình thức vận chuyển</div>
            <div>
              <img src="/images/svg/t11.svg" alt="" />  &nbsp;
                {currentShippingMethod.method_title}
            </div>
          </div>
          <div className="pd-15  sec-bd-bottom box-cart-3">
            <div className="mb-10 b w7">Hình thức thanh toán</div>
            <div>
              <img src="/images/svg/t11.svg" alt="" />  &nbsp;
                {currentPayment.title}
            </div>
          </div>
          <>
            <div className="pd-15  sec-bd-bottom box-cart-3 ">
              <h6 className="box-title-2">Danh sách sản phẩm</h6>
            </div>
            {Object.keys(category).map((item, index) => (
              <CheckoutCategory data={category[item]} cate={item} key={index} />
            ))}
          </>
        </>
      }
      <LoginModalCheckOut/>
      <SignUpModal/>
        <Modal
          size="sm"
          show={openModalLoginPhone}
          onHide={() => setOpenModalLoginPhone(false)}
          centered>

          <div className={`pd-20 `}>
            <p className="text-center cl4">Đăng nhập</p>
            <div className="wtabs-login ">

              <form onSubmit={handleSubmit(handlePhone)}>
              <div>
                <label className="full text-center" style={{ fontWeight: 400 }} > Số điện thoại này đã được sử dụng cho một tài khoản, hãy nhập mật khẩu:</label>
                <label className="full mb-20">
                  <div className="input-title"><span className="require">*</span> Mật khẩu
                      <a className="link-right cl1" onClick={()=> forgotPassword()}>Gửi mã OTP?</a>
                  </div>
                  <input  className="input style-2 text-center" type="password" name="password"
                    ref={register({
                      required: {
                        value: true,
                        message: "Vui lòng nhập mật khẩu"
                      }
                    })} />
                  {errors.password && <div className="error">{errors.password.message}</div>}
                </label>
                <p><button className="btn full btn-4" type="submit">Đăng nhập</button></p>
              </div>
              </form>

            </div>
          </div>
        </Modal >
    </>
  )
}

export default ShippingDefault