import React, { useEffect, useState } from "react";
import Layout from "../../../components/Desktop/Layout";
import BreadCrumb from "../../../components/Desktop/Common/BreadCrumb";
import t from "../../../translation";
import MenuUser from "../../../components/Desktop/Common/MenuUser";
import { useAuth } from "../../../contexts/auth";
import { useCommon } from "../../../contexts/common";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import Link from "next/link";
import IsMobile from "../../../utils/detectMobile";
import LayoutMobileOnlyHead from "../../../components/Mobile/LayoutMobileOnlyHead";

const initDistrict = {
  value: "",
  label: "Tất cả Quận Huyện",
  city_id: "",
};

const initWard = {
  value: "",
  label: "Tất cả Phường/Xã",
  city_id: "",
};

function BillingDefault({ isMobile }) {
  const { user } = useAuth();
  const [state, setState] = useState(null);
  const { location } = useCommon();
  const [cities, setCites] = useState(null);
  const [districts, setDistricts] = useState([initDistrict]);
  const [wards, setWards] = useState([initWard]);
  const [currentCity, setCurrentCity] = useState({
    value: "",
    label: "Tất cả Tỉnh/Thành Phố",
    country_id: "VN",
  });
  const [currentDistrict, setCurrentDistrict] = useState(initDistrict);
  const [currentWard, setCurrentWard] = useState(initWard);
  const [updating, setUpdating] = useState(false);
  const [isAdding, setAdding] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (user != undefined && location) {
      const billingAddress = user.addresses.find((element) => element.default_billing);
      setCites(location.cites);
      if (billingAddress != undefined) {
        setCurrentCity({
          value: billingAddress.custom_attributes.city_id.value,
          label: billingAddress.city,
        });

        const findingDistricts = location.districts.filter((district) => district.city_id == billingAddress.custom_attributes.city_id.value);
        setDistricts(findingDistricts);

        setCurrentDistrict({
          value: billingAddress.custom_attributes.district_id.value,
          label: billingAddress.custom_attributes.district.value,
        });

        const findingWards = location.wards.filter((ward) => ward.district_id == billingAddress.custom_attributes.district_id.value);
        setWards(findingWards);
        if (billingAddress.custom_attributes.ward_id && billingAddress.custom_attributes.ward.value) {
          setCurrentWard({
            value: billingAddress.custom_attributes.ward_id.value,
            label: billingAddress.custom_attributes.ward.value,
          });
        }

        let data = {
          ...state,
          id: billingAddress.id,
          firstname: billingAddress.firstname,
          lastname: billingAddress.lastname,
          fullname: billingAddress.lastname + " " + billingAddress.firstname,
          country_id: billingAddress.country_id,
          street: billingAddress.street,
          telephone: billingAddress.telephone,
          city: billingAddress.city,
          default_billing: true,
          default_shipping: false,
          custom_attributes: {
            city_id: billingAddress.custom_attributes.city_id.value,
            district: billingAddress.custom_attributes.district.value,
            district_id: billingAddress.custom_attributes.district_id.value,
            ward: billingAddress.custom_attributes.ward ? billingAddress.custom_attributes.ward.value : null,
            ward_id: billingAddress.custom_attributes.ward_id ? billingAddress.custom_attributes.ward_id.value : null,
          },
        };
        setState(data);
      } else {
        let data = {
          ...state,
          firstname: "",
          lastname: "",
          country_id: "VN",
          street: [],
          telephone: "",
          city: "",
          default_billing: true,
          default_shipping: false,
          custom_attributes: {
            city_id: "",
            district: "",
            district_id: "",
            ward: "",
            ward_id: "",
          },
        };
        setState(data);
        setAdding(true);
      }
    }
  }, [user, location]);

  const changeCity = (e) => {
    const found = cities.find((city) => city.value == e.target.value);
    let data = {
      ...currentCity,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
    };
    setCurrentCity(data);

    // Find district
    const findingDistricts = location.districts.filter((district) => district.city_id == data.value);
    setDistricts(findingDistricts);
  };

  const changeDistrict = (e) => {
    const found = districts.find((district) => district.value == e.target.value);
    let data = {
      ...currentDistrict,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
      city_id: found.city_id,
    };
    setCurrentDistrict(data);

    // Find ward
    const findingWards = location.wards.filter((ward) => ward.district_id == data.value);
    setWards(findingWards);
  };

  const changeWard = (e) => {
    const found = wards.find((ward) => ward.value == e.target.value);
    let data = {
      ...currentWard,
      value: found.value,
      label: found.label,
      full_name: found.full_name,
      district_id: found.district_id,
    };
    setCurrentWard(data);
  };

  const updateState = (e) => {
    let data = {
      ...state,
      [e.target.name]: e.target.value,
    };
    setState(data);
  };

  const updateStreet = (e) => {
    let data = {
      ...state,
      street: [e.target.value],
    };
    setState(data);
  };

  const submit = async (item) => {
    let lname = item.fullname.substr(0, item.fullname.indexOf(" "));
    let fname = item.fullname.substr(item.fullname.indexOf(" ") + 1);

    let data = {
      ...state,
      telephone: item.telephone,
      firstname: fname,
      lastname: lname,
      city: currentCity.label,
      custom_attributes: {
        city_id: currentCity.value,
        district: currentDistrict.label,
        district_id: currentDistrict.value,
        ward: currentWard.label,
        ward_id: currentWard.value,
      },
    };

    delete data.fullname;
    try {
      setUpdating(true);
      const result = await api.post("service/customers/address", { address: data });
      if (result.status == 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
    setUpdating(false);
  };

  const setStateInput = async (e) => {
    e.persist();
    setState({ ...state, fullname: e.target.value });
  };

  return isMobile ? (
    <>
      <LayoutMobileOnlyHead />
      <Link href='/account'>
        <div className='page-top-heading'>
          <a className='back icon-arrow-1 ix'></a>
          <h1>Chỉnh sửa thông tin tài khoản</h1>
        </div>
      </Link>
      {state != null && (
        <form className={updating ? 'page-user-info loading' : 'page-user-info'} onSubmit={handleSubmit(submit)}>
          <div className='pd-15 sec-bd-bottom'>
            <div className='mb-20'>
              <div className='input-title'>
                <span className='require'>*</span> Họ và tên
              </div>
              <input
                className='input style-2'
                defaultValue={`${user?.firstname} ${user?.lastname}`}
                placeholder='Họ và tên'
                name='fullname'
                onChange={(e) => {
                  setStateInput(e);
                }}
                ref={register({
                  required: {
                    value: true,
                    message: 'Vui lòng nhập họ và tên',
                  },
                  pattern: {
                    value:
                      /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*( [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*)+/,
                    message: 'Vui lòng nhập đầy đủ họ và tên',
                  },
                })}
              />
              {errors.fullname && <div className='error'>Hãy nhập họ và tên của bạn</div>}
            </div>
            <div className='mb-20'>
              <div className='input-title'>
                <span className='require'>*</span> {t('phone')}
              </div>
              <input
                className='input style-2'
                defaultValue={user?.telephone}
                placeholder='Số Điện thoại'
                name='telephone'
                onChange={(e) => {
                  updateState(e);
                }}
                ref={register({
                  required: {
                    value: true,
                    message: 'Vui lòng nhập số điện thoại',
                  },
                  pattern: {
                    value: /(03|05|07|08|09)+([0-9]{8})\b/,
                    message: 'Số điện thoại không đúng',
                  },
                })}
              />
              {errors.telephone && <div className='error'>{errors.telephone.message}</div>}
            </div>
            <div className='mb-20'>
              <div className='input-title'>
                <span className='require'>*</span> {t('street')}
              </div>
              <input
                className='input style-2'
                defaultValue={state.street[0]}
                placeholder='Địa chỉ'
                name='street'
                onChange={(e) => {
                  updateStreet(e);
                }}
                ref={register({
                  required: {
                    value: true,
                    message: 'Hãy nhập tên đường của bạn',
                  },
                })}
              />
              {errors.street && <div className='error'>{errors.street.message}</div>}
            </div>
            {cities && (
              <div className='mb-20'>
                <div className='input-title'>
                  <span className='require'>*</span> {t('choise_city')}
                </div>
                <select id='address_Tinh2' className='select select-tinh' value={currentCity.value} name='city' onChange={(e) => changeCity(e)} ref={register({ required: true })}>
                  {cities.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.city && <div className='error'>Hãy nhập thành phố đúng</div>}
              </div>
            )}
            {districts && (
              <div className='mb-20'>
                <div className='input-title'>
                  <span className='require'>*</span>
                  {t('choise_district')}
                </div>
                <select id='address_Tinh2' className='select select-tinh' value={currentDistrict.value} name='district' onChange={(e) => changeDistrict(e)} ref={register({ required: true })}>
                  {districts.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.district && <div className='error'>Hãy nhập quận huyện đúng</div>}
              </div>
            )}
            {wards && (
              <div className='mb-20'>
                <div className='input-title'>
                  <span className='require'>*</span>
                  {t('choise_ward')}
                </div>
                <select id='address_Tinh2' className='select select-tinh' value={currentWard.value} name='ward' onChange={(e) => changeWard(e)} ref={register({ required: true })}>
                  {wards.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.ward && <div className='error'>Hãy nhập phường xã đúng</div>}
              </div>
            )}
          </div>
          <div className='pd-15'>
            <div>
              <label className='checkbox '>
                <input type='checkbox' />
                <span></span>
                Địa chỉ công ty
              </label>
            </div>
          </div>
          <button className='btn btn-4' type='submit'>
            {isAdding ? t('adding') : t('save_changed_info')}
          </button>
        </form>
      )}
    </>
  ) : (
    <Layout>
      <BreadCrumb
        data={[
          { name: t('account_info'), link: '/account', isActive: false },
          { name: t('default_user_billing_address'), link: '/account/address/billing-default', isActive: true },
        ]}
      />
      <main className='sec-tb page-user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3 sidebar-user'>
              <MenuUser />
            </div>
            {state != null ? (
              <div className='col-12 col-md-9'>
                <div className='box-shadow box-edit'>
                  <ul className='box-menu'>
                    <li className='active'>
                      <Link href='/account/address/billing-default'>
                        <a>{t('default_user_billing_address')}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href='/account/address/shipping-default'>
                        <a>{t('default_user_shipping_address')}</a>
                      </Link>
                    </li>
                  </ul>
                  <div className='box-content'>
                    <p>{t('account_info')}</p>
                    <form className={updating ? 'row loading' : 'row'} onSubmit={handleSubmit(submit)}>
                      {/* user info */}
                      <div className='col-sm-6'>
                        <div className='mb-20'>
                          <div className='input-title'>
                            <span className='require'>*</span> Họ và tên
                          </div>
                          <input
                            className='input'
                            defaultValue={`${user?.firstname} ${user?.lastname}`}
                            placeholder='Họ và tên'
                            name='fullname'
                            onChange={(e) => {
                              setStateInput(e);
                            }}
                            ref={register({
                              required: {
                                value: true,
                                message: 'Vui lòng nhập họ và tên',
                              },
                              pattern: {
                                value:
                                  /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*( [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]([-']?[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴaàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)*)+/,
                                message: 'Vui lòng nhập đầy đủ họ và tên',
                              },
                            })}
                          />
                          {errors.fullname && <div className='error'>Hãy nhập họ và tên của bạn</div>}
                        </div>
                        <div className='mb-20'>
                          <div className='input-title'>
                            <span className='require'>*</span> {t('phone')}
                          </div>
                          <input
                            className='input'
                            defaultValue={user?.telephone}
                            placeholder='Số Điện thoại'
                            name='telephone'
                            onChange={(e) => {
                              updateState(e);
                            }}
                            ref={register({
                              required: {
                                value: true,
                                message: 'Vui lòng nhập số điện thoại',
                              },
                              pattern: {
                                value: /(03|05|07|08|09)+([0-9]{8})\b/,
                                message: 'Số điện thoại không đúng',
                              },
                            })}
                          />
                          {errors.telephone && <div className='error'>{errors.telephone.message}</div>}
                        </div>
                        <div className='mb-20'>
                          <div className='input-title'>
                            <span className='require'>*</span> {t('street')}
                          </div>
                          <input
                            className='input'
                            defaultValue={state.street[0]}
                            placeholder='Địa chỉ'
                            name='street'
                            onChange={(e) => {
                              updateStreet(e);
                            }}
                            ref={register({
                              required: {
                                value: true,
                                message: 'Hãy nhập tên đường của bạn',
                              },
                            })}
                          />
                          {errors.street && <div className='error'>{errors.street.message}</div>}
                        </div>
                      </div>
                      {/* user address */}
                      <div className='col-sm-6'>
                        {cities && (
                          <div className='mb-20'>
                            <div className='input-title'>
                              <span className='require'>*</span> {t('choise_city')}
                            </div>
                            <select id='address_Tinh2' className='select select-tinh' value={currentCity.value} name='city' onChange={(e) => changeCity(e)} ref={register({ required: true })}>
                              {cities.map((item, index) => (
                                <option value={item.value} key={index}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            {errors.city && <div className='error'>Hãy nhập thành phố đúng</div>}
                          </div>
                        )}
                        {districts && (
                          <div className='mb-20'>
                            <div className='input-title'>
                              <span className='require'>*</span>
                              {t('choise_district')}
                            </div>
                            <select id='address_Tinh2' className='select select-tinh' value={currentDistrict.value} name='district' onChange={(e) => changeDistrict(e)} ref={register({ required: true })}>
                              {districts.map((item, index) => (
                                <option value={item.value} key={index}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            {errors.district && <div className='error'>Hãy nhập quận huyện đúng</div>}
                          </div>
                        )}
                        {wards && (
                          <div className='mb-20'>
                            <div className='input-title'>
                              <span className='require'>*</span>
                              {t('choise_ward')}
                            </div>
                            <select id='address_Tinh2' className='select select-tinh' value={currentWard.value} name='ward' onChange={(e) => changeWard(e)} ref={register({ required: true })}>
                              {wards.map((item, index) => (
                                <option value={item.value} key={index}>
                                  {item.label}
                                </option>
                              ))}
                            </select>
                            {errors.ward && <div className='error'>Hãy nhập phường xã đúng</div>}
                          </div>
                        )}
                      </div>
                      <div className='col-12'>
                        <button className='btn btn-4' type='submit'>
                          {isAdding ? t('adding') : t('save_changed_info')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className='col-12 col-md-9 loading' />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } };
}

export default BillingDefault;
