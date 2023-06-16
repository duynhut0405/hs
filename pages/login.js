import React, { useState, useEffect } from "react";
import Layout from "../components/Desktop/Layout";
import LoginBlock from "../components/Desktop/Login/login";
import RegisterBlock from "../components/Desktop/Login/register";
import LoginBlockMobile from "../components/Mobile/Login/login";
import RegisterBlockMobile from "../components/Mobile/Login/register";
import LayoutMobile from "../components/Mobile/LayoutMobile";
import { useAuth } from "../contexts/auth";
import IsMobile from "../utils/detectMobile";
import HeaderMobile from "../components/Mobile/HeaderMobile";
import { useRouter } from "next/router";

function Logi({ isMobile }) {
  const [activeTab, setActiveTab] = useState("login");
  const { isAuthenticated, createCartForGuest } = useAuth();
  const router = useRouter();

  useEffect(async () => {
    if (!isAuthenticated) {
      await createCartForGuest();
    } else {
      router.push("/account");
    }
  }, [isAuthenticated]);
  return isMobile ? (
    <LayoutMobile>
      <HeaderMobile />
      <main className="page-login">
        {/* <a className="top-back" onClick={() => router.back()}>
            <i className="icon-arrow-1 ix"></i> Quay lại trang trước
      </a> */}
        <div className="wtabs-login">
          <div className="menu-tabs">
            <div className={`menu-tab ${activeTab == "login" ? "active" : ""}`} data-actab-group="1" data-actab-id="1" onClick={() => setActiveTab("login")}>
              {" "}
              Đăng nhập{" "}
            </div>
            <div className={`menu-tab ${activeTab == "register" ? "active" : ""}`} data-actab-group="1" data-actab-id="2" onClick={() => setActiveTab("register")}>
              {" "}
              Đăng ký{" "}
            </div>
          </div>
          <div className="content-tabs">
            {activeTab == "login" && <LoginBlockMobile />}
            {activeTab == "register" && <RegisterBlockMobile />}
          </div>
        </div>
      </main>
    </LayoutMobile>
  ) : (
    <Layout>
      <main className="sec-tb page-login">
        <div className="container">
          <div className="wtabs-login">
            <div className="menu-tabs">
              <div className={`menu-tab ${activeTab == "login" ? "active" : ""}`} data-actab-group="1" data-actab-id="1" onClick={() => setActiveTab("login")}>
                {" "}
                Đăng nhập{" "}
              </div>
              <div className={`menu-tab ${activeTab == "register" ? "active" : ""}`} data-actab-group="1" data-actab-id="2" onClick={() => setActiveTab("register")}>
                {" "}
                Đăng ký{" "}
              </div>
            </div>
            <div className="content-tabs box-shadow">
              {activeTab == "login" && <LoginBlock />}
              {activeTab == "register" && <RegisterBlock />}
            </div>
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

export default Logi;
