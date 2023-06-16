import React, { useEffect, useState } from "react";
import ShowStar from "../Review/ShowStar";
import formatVND from "../../../utils/formatVND";
import Link from "next/link";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";
import Modal from "react-bootstrap/Modal";
import { useCommon } from "../../../contexts/common";
import checkImageExist from '../../../utils/checkImageExist'

function FakeProduct({ data }) {
  return (
    <div className="item box-shadow">
      <Link href={`#`}>
        <a href={`#`} className="img tRes_68">
          <img src="/images/hoasen-product.jpg"/>
        </a>
      </Link>
      <div className="divtext">
        <h3 className="line-3 title">
          <Link href={`#`}>
            <a href={`#`}>&nbsp;&nbsp;&nbsp;&nbsp;</a>
          </Link>
          <br/>
          <br/>
        </h3>
      </div>
      <div className="divtext bottom">
        <div className="ratingresult">
          <ShowStar rating={"0"} />
          <strong className="cl1">&nbsp;&nbsp;&nbsp;&nbsp;</strong>
        </div>
        <div className="price">
          <strong>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </strong>
        </div>
        <span className={`btnlike`}>
          {" "}
          <i className="icon-like"></i>{" "}
        </span>
      </div>
    </div>
  );
}

export default FakeProduct;
