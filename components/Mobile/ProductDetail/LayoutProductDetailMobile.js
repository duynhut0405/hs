import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Proptypes from 'prop-types';
import lazyload from '../../../utils/lazyload';
import lazyImage from '../../../utils/lazyImage';
import AddressModalMobile from '../Common/MobileModal/AddressModalMobile';
import AddressModalDetailMobile from '../Common/MobileModal/AddressModalDetailMobile';
import { useCommon } from '../../../contexts/common';
import Link from 'next/link';
import { useAuth } from '../../../contexts/auth';
import SmallCartGuest from '../SmallCartGuest';
import SmallCart from '../SmallCart';
import Modal from 'react-bootstrap/Modal';

const propTypes = {
  children: Proptypes.node,
};

function LayoutProductDetailMobile({ children, menu, homeTop, homeContent }) {
  const { productDetailUserModal, setProductDetailUserModal } = useCommon();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [menuRef, setMenuRef] = useState(React.useRef(null));

  lazyload();
  lazyImage();

  const handleClick = (e) => {
    if (!menuRef.current.contains(e.target)) {
      setProductDetailUserModal(false);
      document.getElementsByTagName('body')[0].classList.remove('showMenuScrollOff');
    }
  };

  const handleReturn = (e) => {
    router.back();
    setProductDetailUserModal(!productDetailUserModal);
    document.getElementsByTagName('body')[0].classList.remove('showMenuScrollOff');
  };

  useEffect(() => {
    if (productDetailUserModal) {
      document.getElementsByTagName('body')[0].classList.add('showMenuScrollOff');
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [productDetailUserModal]);

  return (
    <div id='wrapper'>
      <Head>
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <title>Hoa Sen Home</title>
        <link rel='shortcut icon' href='/Logo-Hoa-Sen.svg' />
        <link rel='stylesheet' href='/mb/fonts/icomoon/style.css' type='text/css' media='all' />
        <link rel='stylesheet' href='/mb/css/product_detail/modal.css' type='text/css' media='all' />

        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,400&display=swap' rel='stylesheet' media='all' />
        <meta property='og:locale' content='vi_VN' />

        {/* <!-- META FOR FACEBOOK --> */}
        <meta property='og:site_name' content='Hoasenhome' />
        <meta property='og:url' itemProp='url' content='http://hoasenhome.vn/' />
        <meta property='og:image' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/images/gioi-thieu.jpg'} />
        <meta property='og:image' content={'https://hoasenhome.vn/images/gioi-thieu.jpg'} />
        <meta property='og:image:secure_url' itemProp='thumbnailUrl' content={'https://hoasenhome.vn/images/gioi-thieu.jpg'} />
        <meta property='og:title' content='Hoa Sen Home' itemProp='headline' />
        <meta property='og:description' content='' itemProp='description' />
        {/* <!-- END META FOR FACEBOOK --> */}
      </Head>

      <header id='header' className='header-detail' role='banner'>
        <div className='container '>
          <div className='row '>
            <div className='col-auto'>
              <div className='row center'>
                <div className='col-auto'>
                  <Link href='/#'>
                    <a id='logo'>
                      {' '}
                      <img style={{ height: '50px' }} src='/Logo-Hoa-Sen.svg' alt='' />
                    </a>
                  </Link>
                </div>
                <div className='col'>
                  <AddressModalMobile showLocation={false} />
                  <div id='modalAddress' className='myModal modalAddress'>
                    <div className='container '>
                      <div className='contentModal '>
                        <h6 className='title'>Chọn khu vực</h6>
                        <p>VUI LÒNG NHẬP THÔNG TIN CHÍNH XÁC ĐỂ CHÚNG TÔI GIAO HÀNG SỚM NHẤT CHO BẠN</p>
                        <a className='btn btnModal full' href='#'>
                          Giao hàng đến địa chỉ này
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col'>
              <div className='group-header'>
                <div className='item  '>
                  <Link href='/search'>
                    <a className='btn-search'>
                      <i className='icon-search'></i>
                    </a>
                  </Link>
                </div>
                {isAuthenticated ? (
                  <div className='item  '>
                    <SmallCart />
                  </div>
                ) : (
                  <div className='item   '>
                    <SmallCartGuest />
                  </div>
                )}

                <div className='item item-menu  '>
                  <span
                    className='btnModal'
                    data-modal='modalMenuDetail'
                    onClick={() => {
                      setProductDetailUserModal(!productDetailUserModal);
                    }}
                  >
                    <i className='icon-t23'></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {children}

      {/* User Modal */}
      {/* {productDetailUserModal && (
        <> */}
      <div id='modalMenuDetail' className={`myModal modalMenuDetail ${productDetailUserModal ? 'active' : ''}`}>
        <div className='contentModal ' ref={menuRef}>
          <ul className='menu-user-info'>
            <li onClick={() => handleReturn()}>
              <a>
                <i className='icon-arrow-4 ix'></i>Về trang trước
              </a>
            </li>
            <li onClick={() => setProductDetailUserModal(!productDetailUserModal)}>
              <Link href='/'>
                <a>
                  <i className='icon-home'></i>Về trang chủ
                </a>
              </Link>
            </li>
            <li onClick={() => setProductDetailUserModal(!productDetailUserModal)}>
              <Link href='/categories'>
                <a>
                  <i className='icon-t17'></i>Danh mục sản phẩm
                </a>
              </Link>
            </li>
            {/* <li><Link href="/login"><a><i className="icon-t24 "></i>Cá nhân</a></Link></li> */}
            {isAuthenticated ? (
              <li>
                <Link href='/account/my-review'>
                  <a>
                    <i className='icon-login2'></i>Đánh giá của tôi
                  </a>
                </Link>
              </li>
            ) : null}

            {isAuthenticated ? (
              <li onClick={() => setProductDetailUserModal(!productDetailUserModal)}>
                <Link href='/account'>
                  <a>
                    <i className='icon-t24 '></i>Cá nhân
                  </a>
                </Link>
              </li>
            ) : (
              <li onClick={() => setProductDetailUserModal(!productDetailUserModal)}>
                <Link href='/login' prefetch={false}>
                  <a>
                    <i className='icon-t24 '></i>Cá nhân
                  </a>
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li onClick={() => setProductDetailUserModal(!productDetailUserModal)}>
                <Link href='/wishlist'>
                  <a>
                    <i className='icon-like'></i>Yêu thích{' '}
                  </a>
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li onClick={() => setProductDetailUserModal(!productDetailUserModal)}>
                <Link href='/#'>
                  <a>
                    <i className='icon-t25 '></i>Chia Sẻ
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* </> */}
      {/* ) */}
      {/* } */}

      <AddressModalDetailMobile />
    </div>
  );
}

LayoutProductDetailMobile.propTypes = propTypes;

export default LayoutProductDetailMobile;
