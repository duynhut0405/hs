import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import t from "../../../../translation";
import { useCommon } from "../../../../contexts/common";
import { useAuth } from "../../../../contexts/auth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ReactHtmlParser from 'react-html-parser'
import Cookie from "js-cookie";
import api from "../../../../services/api";

const propTypes = {
  data: PropTypes.array,
};

const menuData = require('../../../../public/json/menu.json')
const popular = require('../../../../public/json/popular.json')

function SearchModalDetailMobile({ menu }) {
  const [searchPopular, setSearchPopular] = useState([]);
  const [menuRef, setMenuRef] = useState(React.useRef(null));
  const [isActive, setActiveModal] = useState(false);
  const [menuSearch, setMenuSearch] = useState(menu);
  const { activeSearchModal, setActiveSearchModal, keyword, setKeyWord } = useCommon();
  const { isAuthenticated } = useAuth();
  // const [keyword, setKeyWord] = useState('');
  const [suggestResult, setSuggestResult] = useState(null);
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  // get all search popular
  const getPopular = async () => {
    try {
      if (popular.items) {
        setSearchPopular(popular.items);
      } else {
        const result = await api.get("/service/search/popular/1");
        if (result.status == 200 && !result.data.error) {
          setSearchPopular(result.data[0].items);
        }
      }
      if (menuData) {
        setMenuSearch(menu);  
      } else {
        const result2 = await api.get("/service/stores/menus");
        setMenuSearch(result2.data[0].menuItems);   
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
    return;
  };

  useEffect(() => {
    getPopular();
  }, []);

  useEffect(() => {
    setActiveSearchModal(false)
  }, [router.query]);

  useEffect(async () => {
    if (activeSearchModal && document.getElementById("search-modal-input")) {
      document.getElementById("search-modal-input").focus();
    }

    if (keyword.length != 0) {
      try {
        const result = await api.get(`service/search/suggest/${keyword}`);
        setSuggestResult(result.data[0]);
      } catch (error) {
        console.log(console.error);
      }
    }
  }, [keyword]);

  useEffect(() => {
    getPopular();
  }, []);

  const setSearch = (value) => {
    let response = value.split("=")[1];
    let seatchText = decodeURI(response).replaceAll("+", " ");
    setKeyWord(seatchText);
    router.push(`/search?q=${response}&page=1`);
  };

  const submit = (data) => {
    if (data.searchvalue) {
      router.push(`/search?q=${data.searchvalue}&page=1`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("sett modal off 1");
      setKeyWord(e.target.value);
      router.push(`/search?q=${e.target.value}&page=1`);
      setActiveSearchModal(false);
    }
  };

  const search = () => {
    console.log("sett modal off 2");
    router.push(`/search?q=${keyword}&page=1`);
    setActiveSearchModal(false);
  };

  const submitText = (data) => {
    console.log("sett modal off 3");
    setKeyWord(data);
    router.push(`/search?q=${data}&page=1`);
    setActiveSearchModal(false);
  };

  return (
    activeSearchModal && (
      <div id="modalSearch" className={`myModal modalSearch ${activeSearchModal ? "active" : ""}`}>
        <div className="container ">
          <div className="contentModal ">
            <div className="items item-search">
              <div className="item-group ">
                <div className="item-group-content">
                  <form className="form-search-header" onSubmit={handleSubmit(submit)}>
                    <input 
                      id="search-modal-input"
                      type=""
                      name="search-modal-input"
                      placeholder={t("input_key")}
                      value={keyword}
                      onKeyDown={(e) => handleKeyDown(e)}
                      onChange={(e) => setKeyWord(e.target.value)}
                      autoFocus
                    />
                    <button type="submit">
                      <i className="icon-search" onClick={() => search()}></i>
                    </button>
                  </form>
                </div>
                <div className="item-group-addon text-right center">
                  <span
                    className="btnModal tx btn-close"
                    onClick={() => {
                      setActiveSearchModal(false);
                    }}>
                    {t("exit")}
                  </span>
                </div>
              </div>
            </div>

            {keyword.length == 0 && <>
              <div className="items  sec-bd-bottom">
                <h6>{t("popular_search")}</h6>
                <div className="row space-10 list-tag list-item-10">
                  {searchPopular.map((item, index) => (
                    <div className="col-4" key={index} onClick={() => {
                      submitText(item.query_text);
                    }}>
                      <a>
                        {" "}
                        <span className="line-2">{item.query_text}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="items">
                <h6> {t("popular_category")} </h6>
                <div className="row space-10 list-p-2 list-item-10">
                  {menuSearch != undefined &&
                    menuSearch.map((item, index) => (
                      <div className="col-3" key={index}>
                        <div className="item ">
                          <Link href={item.additional_data != undefined ? "/" + item.additional_data.request_path.replace(".html", "") : "/"}>
                            <a className="img tRes">
                              <img src={item.additional_data ? process.env.DOMAIN_BASE + item.additional_data.thumbnail_image : "/images/no-image.svg"} />
                            </a>
                          </Link>
                          <div className="line-3 title"> {item.name} </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
            }

            {keyword.length != 0 && suggestResult && <>
              <div className="items  sec-bd-bottom">
                <h6>{t("popular_search")}</h6>
                <div className="row space-10 list-tag list-item-10">
                  {suggestResult.popular_searches && (
                    Object.keys(suggestResult.popular_searches.items).map((item, index) => (
                      <div className="col-4" key={index}>
                        <a onClick={(e) => (setSearch(suggestResult.popular_searches.items[item].url))}> <span className="line-2">{ReactHtmlParser(suggestResult.popular_searches.items[item].title)}</span></a>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {suggestResult.categories && (
                <div className="items">
                  <h6> {t("popular_category")} </h6>
                  <div className="row space-10 list-p-2 list-item-10">
                    {suggestResult.categories.items && (Object.keys(suggestResult.categories.items).map((item, index) => (
                      <div className="col-3" key={index}>
                        <div className="item ">
                          <Link href={suggestResult.categories.items[item].url}>
                            <a className="img tRes">
                              <img src={suggestResult.categories.items[item].thumbnail_image ? suggestResult.categories.items[item].thumbnail_image : '/images/hoasen-product.jpg'} alt={suggestResult.categories.items[item].title} />
                            </a>
                          </Link>
                          <div className="line-3 title"> {suggestResult.categories.items[item].title} </div>
                        </div>
                      </div>
                    )))}
                  </div>
                </div>
              )}
            </>
            }
          </div>
        </div>
      </div>
    )
  )
}

SearchModalDetailMobile.propTypes = propTypes;

export default SearchModalDetailMobile;
