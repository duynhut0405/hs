import React, { useEffect, useState } from "react";
import Head from "next/head";
import Proptypes from "prop-types";
import { useRouter } from "next/router";

const propTypes = {
  children: Proptypes.node,
};

function LayoutIntro({ children }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Hoa Sen Home</title>
        <link rel="shortcut icon" href="/Logo-Hoa-Sen.svg"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" media="all" />
        <link rel="canonical" content={"https://hoasenhome.vn" + router.asPath.split("?")[0]} />
        <meta name="description" content="Vật liệu xây dựng 4.0 - Công nghệ thay đổi cuộc sống" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="/fonts/icomoon/style.css" type="text/css" media="all" />
        <link rel="stylesheet" href="/css/main.css" type="text/css" media="all" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:site_name" content="Bhome" />
        <meta property="og:url" itemProp="url" content={"https://hoasenhome.vn" + router.asPath.split("?")[0]} />
        <meta property="og:image" itemProp="thumbnailUrl" content={"https://hoasenhome.vn/images/gioi-thieu.jpg "} />
        <meta property="og:image" content={"https://hoasenhome.vn/images/gioi-thieu.jpg "} />
        <meta property="og:image:secure_url" itemProp="thumbnailUrl" content={"https://hoasenhome.vn/images/gioi-thieu.jpg "} />
      </Head>

      {children}
    </>
  );
}

LayoutIntro.propTypes = propTypes;

export default LayoutIntro;
