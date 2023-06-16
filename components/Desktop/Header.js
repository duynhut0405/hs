import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import t from '../../translation';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import UserHeader from './Login/userHeader';
import SmallCart from './Common/SmallCart';
import SmallCartGuest from './Common/SmallCartGuest';
import SmallNoti from './Noti/SmallNoti';
import AddressModal from './Common/AddressModal';
import ReactHtmlParser from 'react-html-parser';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import checkImageExist from '../../utils/checkImageExist';
import { useMediaQuery } from 'react-responsive';
import { useCommon } from '../../contexts/common';
import MainMenu from './Menu/Mainmenu';

const menuData = require('../../public/json/menu.json');
const popularData = require('../../public/json/popular.json');

function Header({ setHeaderHeight, mainMenu }) {
  const { isAuthenticated, user } = useAuth();
  const { keyword, setKeyWord } = useCommon();
  const [searchPopular, setSearchPopular] = useState([]);
  const [menuRef, setMenuRef] = useState(React.useRef(null));
  const [menu, setMenu] = useState(null);
  const [suggestResult, setSuggestResult] = useState(null);
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [showMenu, setShowMenu] = useState(false);
  const timeoutRef = useRef(null);
  const isHasMenu = useMediaQuery({
    query: '(max-width: 960px)',
  });

  useEffect(() => {
    var body = document.getElementsByTagName('body')[0];
    if (showMenu) {
      body.classList.add('showMenu');
    } else {
      body.classList.remove('showMenu');
    }
  }, [showMenu]);

  // get all search popular
  const getPopular = async () => {
    try {
      if (popularData.items) {
        setSearchPopular(popularData.items);
      } else {
        const result = await api.get('/service/search/popular/1');
        if (result.status == 200 && !result.data.error) {
          setSearchPopular(result.data[0].items);
        }
      }
      if (menuData.menuItems) {
        setMenu(menuData.menuItems);
      } else {
        const result2 = await api.get('/service/stores/menus', { withCredentials: false });
        setMenu(result2.data[0].menuItems);
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    getPopular();
    setHeaderHeight(`${menuRef.current.clientHeight}px`);
  }, []);

  useEffect(() => {
    setHeaderHeight(`${menuRef.current.clientHeight}px`);
  }, [menuRef]);

  useEffect(async () => {
    onSearchInput();
  }, [keyword]);

  const onSearchInput = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      if (keyword.length >= 3) {
        try {
          const result = await api.get(`service/search/suggest/${keyword.replace(/\\|\/|-|\"|\'|\,|\.|\;|\(|\)|\_/g, '')}`);
          setSuggestResult(result.data[0]);
        } catch (error) {
          console.log(console.error);
        }
      }
    }, 500);
  };

  const setSearch = (value) => {
    let response = value.split('=')[1];
    let seatchText = decodeURI(response).replaceAll('+', ' ');
    setKeyWord(seatchText);
    onSearchClick(response?.length);
  };

  const submit = (data) => {
    if (data?.searchvalue) {
      onSearchClick(data?.searchvalue);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearchClick(keyword);
    }
  };

  const onSearchClick = (val) => {
    if (val?.length >= 3) router.push(`/search?q=${val.replace(/\\|\/|-|\"|\'|\,|\.|\;|\(|\)|\_/g, '')}&page=1`);
  };

  return (
    <>
      <header id='header' className='fixe sticky' role='banner' ref={menuRef} style={{ height: '70px' }}>
        <div className='container'>
          <Link href='/'>
            <a href='/' id='logo'>
              {' '}
              <img width='55px' height='55px' src='/images/logo.svg' alt='' />
            </a>
          </Link>
          <div className='group-header'>
            <div className='item item-1'>
              <form className='item-group form-search-header' onSubmit={handleSubmit(submit)}>
                <AddressModal />
                <div className='item-group-content'>
                  <input type='text' name='searchValue' placeholder={t('input_key')} value={keyword} onKeyDown={handleKeyDown} onChange={(e) => setKeyWord(e.target.value)} ref={register({ required: false })} />
                  <button onClick={() => onSearchClick(keyword)}>
                    <i className='icon-search'></i>
                  </button>
                  {keyword.length == 0 && (
                    <>
                      <div className='autocomplete box-shadow'>
                        <div className='items'>
                          <h6>{t('popular_search')}</h6>
                          <div className='row space-10 list-tag list-item-10'>
                            {searchPopular.map((item, index) => (
                              <div className='col-3' key={index} onClick={() => onSearchClick(item.query_text)}>
                                <a>
                                  {' '}
                                  <span className='line-2'>{item.query_text}</span>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                        {showMenu && menu && (
                          <div className='items'>
                            <h6>{t('popular_category')}</h6>
                            <div className='row space-10 list-p-2 list-item-10'>
                              {menu.map((item, index) => (
                                <div className='col-2' key={index}>
                                  <div className='item '>
                                    <Link href={item.additional_data && item.additional_data.request_path ? `/${item.additional_data.request_path.replace('.html', '')}` : '/'} prefetch={false}>
                                      <a href={item.additional_data && item.additional_data.request_path ? `/${item.additional_data.request_path.replace('.html', '')}` : '/'} className='img tRes'>
                                        <img src={item.additional_data ? process.env.DOMAIN_BASE + item.additional_data.thumbnail_image : '/images/hoasen-product.jpg'} alt={item.name} onError={async (e) => await checkImageExist(e)} />
                                      </a>
                                    </Link>
                                    <div className='line-3 title'>
                                      <Link href={item.additional_data && item.additional_data.request_path ? `/${item.additional_data.request_path.replace('.html', '')}` : '/'} prefetch={false}>
                                        <a href={item.additional_data && item.additional_data.request_path ? `/${item.additional_data.request_path.replace('.html', '')}` : '/'}>{item.name}</a>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {keyword.length != 0 && suggestResult && (
                    <>
                      <div className='autocomplete box-shadow'>
                        <div className='items'>
                          <h6>{t('popular_search')}</h6>
                          <div className='row space-10 list-tag list-item-10'>
                            {suggestResult.popular_searches &&
                              Object.keys(suggestResult.popular_searches.items).map((item, index) => (
                                <div className='col-3' key={index}>
                                  <a onClick={(e) => setSearch(suggestResult.popular_searches.items[item].url)}>
                                    <span className='line-2'>{ReactHtmlParser(suggestResult.popular_searches.items[item].title)}</span>
                                  </a>
                                </div>
                              ))}
                          </div>
                        </div>
                        {suggestResult.categories && (
                          <div className='items'>
                            <h6>{t('popular_category')}</h6>
                            <div className='row space-10 list-p-2 list-item-10'>
                              {suggestResult.categories.items &&
                                Object.keys(suggestResult.categories.items).map((item, index) => (
                                  <div className='col-2' key={index}>
                                    <div className='item '>
                                      <Link prefetch={false} href={suggestResult.categories.items[item].url}>
                                        <a href={suggestResult.categories.items[item].url} className='img tRes'>
                                          <img
                                            src={suggestResult.categories.items[item].thumbnail_image ? suggestResult.categories.items[item].thumbnail_image : '/images/hoasen-product.jpg'}
                                            alt={suggestResult.categories.items[item].title}
                                            onError={async (e) => await checkImageExist(e)}
                                          />
                                        </a>
                                      </Link>
                                      <div className='line-3 title'>
                                        <Link prefetch={false} href={suggestResult.categories.items[item].url}>
                                          <a href={suggestResult.categories.items[item].url}>{suggestResult.categories.items[item].title}</a>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
            <div className='item '>
              <a className='tx1' href='tel:18001515'>
                <i className='icon-phone'></i> <span className='tx2'>1800 1515</span>{' '}
              </a>
            </div>

            <div className='item '>
              <SmallNoti isAuthenticated={isAuthenticated} user={user} />
            </div>

            {isAuthenticated ? (
              <div className='item '>
                <SmallCart />
              </div>
            ) : (
              <div className='item '>
                <SmallCartGuest />
              </div>
            )}

            <div className='item '>
              {!isAuthenticated ? (
                <Link href='/login' prefetch={false}>
                  <a className='tx1'>
                    <i className='icon-login'></i> <span className='tx2'> {t('log_in')} </span>
                  </a>
                </Link>
              ) : (
                <UserHeader />
              )}
            </div>
            <div className='item '>
              <a className='tx1'>
                <span className=''>
                  <img src='/images/flags/vn.png' height='20px' width='30px' alt='' />
                </span>{' '}
              </a>
            </div>
            <div className='item imenu'>
              <span className='menu-btn x' onClick={() => setShowMenu(!showMenu)}>
                <span></span>
              </span>{' '}
            </div>
          </div>
        </div>
      </header>
      {isHasMenu && (
        <div className='wrap-menu-mb'>
          <div className='inner'>
            <MainMenu data={mainMenu} />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
