import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useAuth } from "../../contexts/auth";
import Axios from "axios";


function SmallNoti({}) {
  const { totalNoti, isAuthenticated } = useAuth();

  return (
    <Link href={isAuthenticated ? "/account/notification" : "/login"}>
      <a href="#" className="btn-cart">
        <img style={{ position: "absolute", top: "20%", left: "30%" }} src="/images/svg/bell.svg"></img>
        <span className="count" style={{ marginRight: "5px" }}>
          {totalNoti}
        </span>
      </a>
    </Link>
  );
}


export default SmallNoti;
