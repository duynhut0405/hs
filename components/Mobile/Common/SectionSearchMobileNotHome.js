import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import t from "../../../translation";
import { useCommon } from "../../../contexts/common";
import { useAuth } from "../../../contexts/auth";
import SmallCartGuest from "../SmallCartGuest";
import SmallCart from "../SmallCart";

const propTypes = {
  data: PropTypes.array,
};

function SectionSearchMobileNotHome({ page }) {
  const { setActiveSearchModal } = useCommon();
  const { keyword, setKeyWord } = useCommon();
  const { isAuthenticated } = useAuth();

  return (
    <section id="header" role="banner">
      <div className="container ">
        <div className="row center">
          <div className="col-auto">
            <Link href="/">
              <a id="logo">
                {" "}
                <img style={{ height: "50px" }} src="/Logo-Hoa-Sen.svg" alt="" />
              </a>
            </Link>
          </div>
          <div className="col">
            <div className="item-group item-search">
              <div className="item-group-content">
                <div className="form-search-header">
                  <input
                    className="btnModal"
                    data-modal="modalSearch"
                    type=""
                    name=""
                    value={keyword}
                    onClick={() => {
                      setActiveSearchModal(true);
                    }}
                    placeholder="Nhập từ khoá tìm kiếm"
                    onChange={(e) => setKeyWord(e.target.value)}
                  />
                  <button type="submit">
                    <i className="icon-search"></i>
                  </button>
                </div>
              </div>
              {isAuthenticated ? (
                <div className="item-group-addon ">
                  <SmallCart />
                </div>
              ) : (
                <div className="item-group-addon ">
                  <SmallCartGuest />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


SectionSearchMobileNotHome.propTypes = propTypes;

export default SectionSearchMobileNotHome;
