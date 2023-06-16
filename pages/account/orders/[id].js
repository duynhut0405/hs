import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Desktop/Layout';
import BreadCrumb from '../../../components/Desktop/Common/BreadCrumb';
import t from '../../../translation';
import MenuUser from '../../../components/Desktop/Common/MenuUser';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import formatVND from '../../../utils/formatVND';
import IsMobile from '../../../utils/detectMobile';
import LayoutMobile from '../../../components/Mobile/LayoutMobile';
import Link from 'next/link';
import convertDateTime from '../../../utils/convertDateTime';
import CheckoutUserSuccessProduct from '../../../components/Desktop/Cart/CheckoutUserSuccessProduct';
import CheckoutUserSuccessMobile from '../../../components/Mobile/Cart/CheckoutUserSuccessMobile';
import Axios from 'axios';
import Cookies from 'js-cookie';
import ReviewBlock from '../../../components/Desktop/Products/ChildrenBLocks/ReviewBlock';

const newApiFCM = Axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: 'bearer dxxfgvmg8dps2af7m0soo7iyehfx8d23',
  },
});

function OrderDetail({ isMobile }) {
  const { user, setGetCartAgain } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [reason, setReason] = useState([]);
  const [reasonSend, setReasonSend] = useState('');
  const [reasonIndex, setReasonIndex] = useState(-1);
  const [order, setOrder] = useState(null);
  const [listProduct, setListProduct] = useState(null);
  const [activeStatus, setActiveStatus] = useState(1);
  const [textOne, setTextOne] = useState('Chờ xác nhận');
  const [textTwo, setTextTwo] = useState('giao hàng');
  const [textTimeDelivery, setTextTimeDelivery] = useState(null);
  const [textThree, setTextThree] = useState('');
  const [textFour, setTextFour] = useState('');
  const [address, setAddress] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [product, setProduct] = useState(null);
  const listShipment = {
    GHTK: 'https://i.ghtk.vn/',
    'J&T': 'https://jtexpress.vn/track?billcodes=',
    VIETTEL: 'https://viettelpost.com.vn/tra-cuu-hanh-trinh-don/',
    BESTIN: 'https://best-inc.vn/track?bills=',
    VNPOST: 'http://www.vnpost.vn/vi-vn/dinh-vi/buu-pham?key=',
  };

  const addAgain = async (value, token) => {
    const locationData = Cookies.get('location-data');
    const currentLocation = JSON.parse(locationData);

    api.defaults.headers['X-Requested-Details'] = true;
    api.defaults.headers = {
      ...api.defaults.headers,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    };
    const resultProduct = await api.get('service/rewrite/entity/' + value.extension_attributes.url_key + '?city=' + currentLocation.city.value);
    const product = resultProduct.data.product;

    const data = {
      cartItem: {
        sku: product.sku,
        qty: value.qty_ordered,
        product_option: {
          extension_attributes: {
            is_buy_latter: false,
          },
        },
      },
    };

    if (value.product_type !== 'simple') {
      data.cartItem.product_option.extension_attributes['configurable_item_options'] = value.product_option.extension_attributes.configurable_item_options;
      if (product?.extension_attributes?.colors) {
        const index = value.extension_attributes.options.findIndex((item) => item.label === 'Màu sơn');
        product?.extension_attributes?.colors.map((color) => {
          if (value.extension_attributes.options[index].value.toString().search(color.label) !== -1) {
            data.cartItem.product_option.extension_attributes['paint_color'] = color.id;
          }
        });
      }
      if (value.name?.search('Tôn ') !== -1) {
        const index = value.extension_attributes.options.findIndex((item) => item.label === 'Chiều dài');
        const length = value.extension_attributes.options[index].value.split('> ')[1].split(' mét')[0];
        data.cartItem.product_option.extension_attributes['advanced_quantity'] = [
          {
            data: {
              qty: value.qty_ordered,
              length: Number(length),
            },
          },
        ];
        data.cartItem.qty = 1;
      }
    }

    const result = await api.post('service/carts/mine/items', data);
    if (result) {
      setGetCartAgain(true);
      alert('Đã thêm sản phẩm vào giỏ hàng');
    }
  };

  const cancelOrder = async () => {
    if (order.extension_attributes.is_sent_cancel_order == 0) {
      try {
        await api.post(`service/orders/cancel`, {
          orderId: id,
          cancelReason: 'Cancel Reason: ' + reasonSend,
        });
        setModalShow(false);
        setModalShow2(true);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
        return;
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const setShowModalCalcel = () => {
    setModalShow(true);
  };
  //Get order base on request
  useEffect(async () => {
    let initOrder = {};
    if (user != null) {
      try {
        const result = await api.get(`/service/order/${id}`);
        if (result.status === 200) {
          initOrder = result.data;
        }
      } catch (error) {
        console.log(error);
      }
      setOrder(initOrder);
    }
  }, [user]);

  useEffect(async () => {
    try {
      const result = await newApiFCM.get(`notification/getOrderCancelReasons`);
      if (result) {
        setReason(result.data);
      }

      let initOrder = {};
      if (user != null) {
        try {
          const result = await api.get(`/service/order/${id}`);
          if (result.status === 200) {
            initOrder = result.data;
          }
        } catch (error) {
          console.log(error);
        }
        setOrder(initOrder);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Get category id list base on order product
  useEffect(async () => {
    if (order != null) {
      var categoryIdList = [];
      console.log(order.status);

      if (order.items) {
        const cp = JSON.parse(JSON.stringify(order.items));
        await Promise.all(
          cp?.map(async (element, index) => {
            if (element?.price == 0) return;
            const check = await checkReview(element.product_id, element.order_id);
            element.isReviewed = check;
          })
        );
        setListProduct([...cp]);
      }

      if (order.status) {
        switch (order.status) {
          case 'processing':
            setActiveStatus(2);
            setTextOne('Xác nhận');
            setTextTwo(order?.extension_attributes?.status_label);
            setTextThree('Giao hàng');
            setTextFour('Hoàn thành');
            break;
          case 'shipping':
            setActiveStatus(3);
            setTextOne('Xác nhận');
            setTextTwo('Soạn hàng');
            setTextThree(order?.extension_attributes?.status_label);
            setTextFour('Hoàn thành');
            //setTextTimeDelivery("từ 3-5 ngày");
            break;
          case 'canceled':
            setActiveStatus(2);
            setTextOne('Xác nhận');
            setTextTwo('Đơn hàng bị huỷ');
            break;
          case 'pending':
            setActiveStatus(1);
            setTextTwo('Soạn hàng');
            setTextThree('Giao hàng');
            setTextFour('Hoàn thành');
            break;
          case 'complete':
            setActiveStatus(4);
            setTextOne('Xác nhận');
            setTextTwo('Soạn hàng');
            setTextThree('Giao hàng');
            setTextFour(order?.extension_attributes?.status_label);
            break;
          case 'closed':
            setActiveStatus(4);
            setTextOne('Xác nhận');
            setTextTwo('Soạn hàng');
            setTextThree('Giao hàng');
            setTextFour(order?.extension_attributes?.status_label);
            break;
          default:
            break;
        }
      }
      let data1 = order?.extension_attributes?.shipping_assignments[0]?.shipping?.address && order.extension_attributes.shipping_assignments[0].shipping.address;
      setAddress(data1);
    }
  }, [order]);

  const _renderModalReview = () => {
    return (
      <Modal size='lg' centered show={modalShow3} onHide={() => setModalShow3(false)}>
        <div style={{ padding: 20 }}>
          <h3 className='red2'>KHÁCH HÀNG NHẬN XÉT</h3>
          <div style={{ padding: 20, backgroundColor: '#F5F5F5', borderRadius: 10 }}>
            <strong>{product?.name}</strong>
          </div>
          <ReviewBlock
            cb={() => {
              setModalShow3(false);
              window.location.reload();
            }}
            productId={product?.product_id}
            order_id={router?.query?.id}
            isModal={true}
          />
        </div>
      </Modal>
    );
  };

  const _renderAlertCancel = () => {
    return (
      <Modal centered show={modalShow2} onHide={() => setModalShow2(false)}>
        <div style={{ display: 'flex', justifyContent: 'end', padding: '6px' }} onClick={() => setModalShow2(false)}>
          <i className='icon-close' />
        </div>
        <div className='text-center'>
          <p className='modal-status-text-color w9 mb-20'>Lưu ý</p>
          <p style={{ marginTop: '16px' }}>Yêu cầu hủy đơn của bạn cần được Quản trị viên chấp nhận vì đơn hàng đang được chuẩn bị để giao cho đơn vị vận chuyển.</p>
        </div>
      </Modal>
    );
  };

  const _renderModalCancel = () => {
    return (
      <Modal size='lg' centered show={modalShow} onHide={() => setModalShow(false)}>
        <div className='modal-cancel'>
          <div className='modal-cancel-header border-bottom'>
            <h3>Lý do hủy đơn hàng</h3>
          </div>
          <div className='modal-cancel-body'>
            {reason.map((item, index) => {
              return (
                <div key={index} className='d-flex mb-20'>
                  <input
                    style={{ marginTop: '4px' }}
                    type='radio'
                    name='reason'
                    checked={index === reasonIndex}
                    onClick={() => {
                      setReasonSend(item.reason);
                      setReasonIndex(index);
                    }}
                  />
                  <p>{item.reason}</p>
                </div>
              );
            })}
            <div className='modal-cancel-last-row '>
              <p style={{ fontWeight: 800, alignSelf: 'center' }}>Lý do khác:</p>
              <input
                type='text'
                style={{ padding: '8px', flex: 1, border: '1px solid #999999', borderRadius: '5px', width: '100%' }}
                onClick={() => {
                  setReasonIndex(-1);
                }}
                onChange={(e) => setReasonSend(e.target.value)}
                placeholder='Lý do hủy đơn hàng của bạn...'
              />
            </div>
          </div>
          <div className='modal-cancel-footer'>
            <button className='btn-send-canel btnlike' onClick={cancelOrder}>
              Gởi yêu cầu
            </button>
            <button className='btn-not-send-canel btnlike' onClick={() => setModalShow(false)}>
              Không phải bây giờ
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const onClickReview = async (value) => {
    setProduct(value);
    setModalShow3(true);
  };

  const checkReview = async (product_id, order_id) => {
    const result = await api.get(`/service/product/isReviewed/${product_id}/order/${order_id}`);
    if (result.status == 200) {
      return result?.data;
    }
    return false;
  };

  return isMobile ? (
    <LayoutMobile>
      <Link href='/account/order-list'>
        <div className='page-top-heading'>
          <a className='back icon-arrow-1 ix' href='/account/order-list'></a>
          <h1>Đơn hàng</h1>
        </div>
      </Link>
      {order != null && (
        <div className='pd-15 sec-bd-bottom'>
          <h6 className='box-title-2'>{t('order_detail')}</h6>

          <div className='steps-order' style={{ marginBottom: '75px' }}>
            <div className={`step ${activeStatus == '1' || activeStatus == '2' || activeStatus == '3' || activeStatus == '4' ? 'active' : ''}`}>
              <span className='num'>1</span> <span className='title bs-popover-top'>{textOne}</span>
            </div>
            <div className={`step ${activeStatus == '2' || activeStatus == '3' || activeStatus == '4' ? 'active' : ''}`}>
              <span className='num'>2</span>
              <span className='title bs-popover-top'>{textTwo}</span>
            </div>
            {order.status != 'canceled' && (
              <>
                <div className={`step ${activeStatus == '3' || activeStatus == '4' ? 'active' : ''}`}>
                  <span className='num'>3</span>{' '}
                  <span className='title bs-popover-top' style={{ marginTop: '0.5rem' }}>
                    {textThree}
                  </span>
                </div>
                <div className={`step ${activeStatus == '4' ? 'active' : ''}`}>
                  <span className='num'>4</span> <span className='title bs-popover-top'>{textFour}</span>
                </div>
              </>
            )}
          </div>
          {textTimeDelivery && <span className={activeStatus == '2' ? 'cl1' : 'text-center'}>Thời gian giao hàng: {textTimeDelivery}</span>}

          <ul className='table-1'>
            {order?.extension_attributes?.shipment_tracks[0] && (
              <li>
                <div>Mã vận đơn: </div>
                <div>
                  {order?.extension_attributes?.shipment_tracks[0]?.number}
                  <Link href={`${listShipment[order?.extension_attributes?.shipment_tracks[0]?.title] + order?.extension_attributes?.shipment_tracks[0]?.number}`}>
                    <a className='bs-popover-right' href={`${listShipment[order?.extension_attributes?.shipment_tracks[0]?.title] + order?.extension_attributes?.shipment_tracks[0]?.number}`} target='_blank'>
                      ( <span className='underline'>Xem chi tiết</span> )
                    </a>
                  </Link>
                </div>
              </li>
            )}
            <li>
              <div>{t('order_code')}: </div>
              <div>{order.increment_id}</div>
            </li>
            <li>
              <div>{t('bought_date')}:</div>
              <div>{convertDateTime(order.created_at)}</div>
            </li>
            <li>
              <div>{t('total_cost')}:</div>
              <div>{formatVND(order.base_grand_total ? order.base_grand_total : order.base_grand_total)} đ </div>
            </li>
            <li>
              <div>Thông tin xuất hóa đơn GTGT:</div>
              <div>Không có</div>
            </li>
            <li>
              <div>Ghi chú:</div>
              <div>Không có</div>
            </li>
          </ul>
        </div>
      )}
      {listProduct !== null && (
        <div className='box-shadow sec-bd-bottom box-product mb-20'>
          <h6 className='box-title-2'>{t('product_list')}</h6>
          <div className=' list-p-3'>
            {listProduct?.map(
              (value, i) =>
                !value.parent_item && (
                  <div>
                    <CheckoutUserSuccessMobile item={value} key={i} />
                    {order.status === 'complete' && value.price != 0 && 'isReviewed' in value && !value?.isReviewed && (
                      <div style={{ marginLeft: 124, marginBottom: 10 }}>
                        <button
                          onClick={async () => {
                            await onClickReview(value);
                            window.location.reload();
                          }}
                          className='btn-review'
                        >
                          Viết đánh giá
                        </button>
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      )}
      {order != null && (
        <div className='box-shadow box-order-detail-3'>
          <div className='pd-20'>
            <div className='mb-10 b w7'>{t('recieved_info')}</div>
            <div>
              <span className='w5'>
                {order.billing_address.lastname} {order.billing_address.firstname}
              </span>{' '}
              <br />
              {order.billing_address.telephone} <br />
              {address?.extension_attributes && `${address.street && address.street[0]}, ${address.extension_attributes.ward}, ${address.extension_attributes.district}, ${address.city}`}
            </div>
          </div>
          <div className='pd-20'>
            <div className='mb-10 b w7'>Hình thức thanh toán</div>
            <div>
              <img src='/images/svg/t11.svg' alt='' />
              &nbsp;&nbsp;
              {order.payment.additional_information[0]}
            </div>
          </div>
          <div className='pd-20'>
            <ul className='table-1'>
              <li>
                <div>Tạm tính</div>
                <div>{formatVND(order.subtotal_incl_tax)} đ </div>
              </li>
              <li>
                <div>{parseInt(order.shipping_amount) >= 0 ? 'Phí vận chuyển' : 'Hỗ trợ vận chuyển'}</div>
                <div>{formatVND(order.shipping_amount)} đ </div>
              </li>
              <li>
                <div>Giảm</div>
                <div>{formatVND(order.discount_amount)} đ </div>
              </li>
              {order.extension_attributes?.segments &&
                order.extension_attributes.segments.map((item, index) => {
                  switch (item.code) {
                    case 'vnpay_amount':
                      return (
                        <li>
                          <div>Phụ Phí VNPAY</div>
                          <div key={index}>{formatVND(item.value)} đ</div>
                        </li>
                      );
                    default:
                      return null;
                  }
                })}
              <li className='b'>
                <div> Tổng tiền </div>
                <div className='cl1'>{formatVND(order.base_grand_total ? order.base_grand_total : order.base_grand_total)} đ </div>
              </li>
              {(order.status === 'pending' || order.status === 'processing') && (
                <li className='b'>
                  <button
                    disabled={order.extension_attributes.is_sent_cancel_order || order.status === 'processing'}
                    className={`btn btn4 ${order.extension_attributes.is_sent_cancel_order === 1 || order.status === 'processing' ? 'disable' : ''}`}
                    onClick={() => setShowModalCalcel()}
                  >
                    Yêu cầu hủy
                  </button>
                  <br />
                  <br />
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {_renderModalCancel()}
      {_renderAlertCancel()}
      {_renderModalReview()}
    </LayoutMobile>
  ) : (
    <Layout>
      <BreadCrumb
        data={[
          { name: t('account_info'), link: '/account', isActive: false },
          { name: t('order_manage'), link: '/account/order-list', isActive: false },
          { name: t('order_detail'), link: '/account/order-list', isActive: true },
        ]}
      />
      <main className='sec-tb page-user-order'>
        <div className='container'>
          <div className='row '>
            <div className='col-md-3 sidebar-user'>
              <MenuUser />
            </div>
            <div className='col-12 col-md-9'>
              {order != null && (
                <div className='box-shadow mb-20'>
                  <h6 className='box-title-2'>{t('order_detail')}</h6>
                  <div className='pd-20'>
                    <div className='steps-order' style={{ marginBottom: '30x' }}>
                      <div className={`step ${activeStatus == '1' || activeStatus == '2' || activeStatus == '3' || activeStatus == '4' ? 'active' : ''}`}>
                        <span className='num'>1</span> <span className='title'>{textOne}</span>
                      </div>
                      <div className={`step ${activeStatus == '2' || activeStatus == '3' || activeStatus == '4' ? 'active' : ''}`}>
                        <span className='num'>2</span>
                        <span className='title'>{textTwo}</span>
                      </div>
                      <div className={`step ${activeStatus == '3' || activeStatus == '4' ? 'active' : ''}`}>
                        <span className='num'>3</span> <span className='title'>{textThree}</span>
                        {textTimeDelivery && (
                          <span className={activeStatus == '3' ? 'title cl1' : 'title'} style={{ marginTop: '45px' }}>
                            {textTimeDelivery}
                          </span>
                        )}
                      </div>
                      <div className={`step ${activeStatus == '4' ? 'active' : ''}`}>
                        <span className='num'>4</span> <span className='title'>{textFour}</span>
                      </div>
                    </div>
                    <ul className='table-1' style={{ paddingTop: textTimeDelivery ? '0px' : '10px' }}>
                      {order?.extension_attributes?.shipment_tracks[0] && (
                        <li>
                          <div>Mã vận đơn:</div>
                          <div>
                            {order?.extension_attributes?.shipment_tracks[0]?.number}
                            <Link
                              href={`
                              ${listShipment[order?.extension_attributes?.shipment_tracks[0]?.title] + order?.extension_attributes?.shipment_tracks[0]?.number}`}
                            >
                              <a className='bs-popover-right' href={`${listShipment[order?.extension_attributes?.shipment_tracks[0]?.title] + order?.extension_attributes?.shipment_tracks[0]?.number}`} target='_blank'>
                                ( <span className='underline btnlike active'>Xem chi tiết</span> )
                              </a>
                            </Link>
                          </div>
                        </li>
                      )}
                      <li>
                        <div>{t('order_code')}: </div>
                        <div>{order.increment_id}</div>
                      </li>
                      <li>
                        <div>{t('bought_date')}:</div>
                        <div>{convertDateTime(order.created_at)}</div>
                      </li>
                      <li>
                        <div>{t('total_cost')}:</div>
                        <div>{formatVND(order.base_grand_total ? order.base_grand_total : order.base_grand_total)} đ </div>
                      </li>
                      <li>
                        <div>Thông tin xuất hóa đơn GTGT:</div>
                        <div>Không có</div>
                      </li>
                      <li>
                        <div>Ghi chú:</div>
                        <div>Không có</div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {listProduct != null && (
                <div className='box-shadow sec-bd-bottom box-product mb-20'>
                  <h6 className='box-title-2'>{t('product_list')}</h6>
                  <div className=' list-p-3'>
                    {listProduct?.map(
                      (value, i) =>
                        !value.parent_item && (
                          <div key={i}>
                            <CheckoutUserSuccessProduct item={value} />
                            <div style={{ display: 'flex', paddingLeft: 130, marginBottom: 10, gap: 30 }}>
                              {order.status === 'complete' && value.price != 0 && 'isReviewed' in value && !value?.isReviewed && (
                                <div>
                                  <button onClick={() => onClickReview(value)} className='btn-review'>
                                    Viết đánh giá
                                  </button>
                                </div>
                              )}
                              {value.price != 0 && (
                                <div>
                                  <button
                                    onClick={() => {
                                      addAgain(value, user.id);
                                    }}
                                    className='btn-review'
                                  >
                                    Mua lại
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
              {order != null && (
                <div className='box-shadow box-order-detail-3'>
                  <div className='pd-20'>
                    <div className='mb-10 b w7'>{t('recieved_info')}</div>
                    <div>
                      <span className='w5'>
                        {order.billing_address.lastname} {order.billing_address.firstname}
                      </span>{' '}
                      <br />
                      {order.billing_address.telephone} <br />
                      {address?.extension_attributes && `${address.street && address.street[0]}, ${address.extension_attributes.ward}, ${address.extension_attributes.district}, ${address.city}`}
                    </div>
                  </div>
                  <div className='pd-20'>
                    <div className='mb-10 b w7'>Hình thức thanh toán</div>
                    <div>
                      <img src='/images/svg/t11.svg' alt='' />
                      &nbsp;&nbsp;
                      {order.payment.additional_information[0]}
                    </div>
                  </div>
                  <div className='pd-20'>
                    <ul className='table-1'>
                      <li>
                        <div>Tạm tính</div>
                        <div>{formatVND(order.subtotal_incl_tax)} đ </div>
                      </li>
                      <li>
                        {/* <div >Phí vận chuyển</div> */}
                        <div>{parseInt(order.shipping_amount) >= 0 ? 'Phí vận chuyển' : 'Hỗ trợ vận chuyển'}</div>
                        <div>{formatVND(order.shipping_amount)} đ </div>
                      </li>
                      <li>
                        <div>Giảm</div>
                        <div> {formatVND(order.discount_amount)} đ </div>
                      </li>
                      {order.extension_attributes?.segments &&
                        order.extension_attributes.segments.map((item, index) => {
                          switch (item.code) {
                            case 'vnpay_amount':
                              return (
                                <li>
                                  <div>Phụ Phí VNPAY</div>
                                  <div key={index}>{formatVND(item.value)} đ</div>
                                </li>
                              );
                            default:
                              return null;
                          }
                        })}
                      <li className='b'>
                        <div> Tổng tiền </div>
                        <div className='cl1'>{formatVND(order.base_grand_total ? order.base_grand_total : order.base_grand_total)} đ </div>
                      </li>
                      {(order.status === 'pending' || order.status === 'processing' || order.status === 'pending_vnpay_payment') && (
                        <li className='b'>
                          <br />
                          <button
                            disabled={order.extension_attributes.is_sent_cancel_order || order.status === 'processing'}
                            className={`btn btn4 ${order.extension_attributes.is_sent_cancel_order === 1 || order.status === 'processing' ? 'disable' : ''}`}
                            onClick={() => setShowModalCalcel()}
                          >
                            Yêu cầu hủy
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {_renderModalCancel()}
        {_renderAlertCancel()}
        {_renderModalReview()}
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } };
}

export default OrderDetail;
