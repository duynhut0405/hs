import React, { useEffect, useState } from "react";
import Link from "next/link";
import t from "../../translation";
const range = [0, 1, 2, 3, 4, 5, 6];
const range2 = [7, 8, 9, 10, 11, 12, 13];
const range3 = [14, 15, 16, 17, 18, 19, 20];

function Footer(mainMenu) {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    if (mainMenu.length != 0) {
      setMenu(mainMenu);
    }
  }, [mainMenu]);

  return (
    <>
      <footer id="footer" className="sec-t group-ef lazy-hidden">
        <div className="container">
          <div className="row row-1">
            <div className="col-md-4 efch-1 ef-img-t">
              <div className="widget widget-about">
                <h3 className="widget-title">THÔNG TIN LIÊN HỆ</h3>
                <h6>CÔNG TY CỔ PHẦN TẬP ĐOÀN HOA SEN</h6>
                <div className="b cl3">Địa chỉ trụ sở chính </div>
                <div>Số 9, Đại lộ Thống Nhất, Khu công nghiệp Sóng Thần II, Phường Dĩ An, Thành phố Dĩ An, Tỉnh Bình Dương, Việt Nam.</div>
                <div className="b cl3">Văn phòng đại diện:</div>
                <div>183 Nguyễn Văn Trỗi, Phường 10, Quận Phú Nhuận, TP. Hồ Chí Minh.</div>
                <div>
                  Email: <strong>banhangtructuyen@hoasengroup.vn</strong>
                </div>
                <div>
                  Hotline: <strong>1800 1515 </strong>{" "}
                </div>
              </div>
              <p className="logo-resgiter">
                <img className="lazy-hidden" data-lazy-type="image" data-lazy-src="/images/paymen.png" alt="" />
              </p>
            </div>

            <div className={`col-md-4 col-lg-2 col-6 efch-0 ef-img-t`}>
              <div className="widget">
                <span>
                  <h3 className="widget-title"> Về chúng tôi </h3>
                </span>

                <ul className="menu">
                  <li>
                    <Link href="/about">
                      <a href="/about"> Giới thiệu </a>
                    </Link>
                  </li>
                  <li>
                    <a href="/distribution"> Phân phối </a>
                  </li>
                </ul>
              </div>
              <div className="widget">
                <Link href="/blog/category/chinh-sach-ho-tro">
                  <a href="/blog/category/chinh-sach-ho-tro">
                    <h3 className="widget-title"> Chính sách </h3>
                  </a>
                </Link>
                <ul className="menu">
                  <li>
                    <Link href="/blog/post/chinh-sach-bao-mat-thong-tin-ca-nhan">
                      <a href="/blog/post/chinh-sach-bao-mat-thong-tin-ca-nhan"> {t("policy_personal_secure")} </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/post/chinh-sach-bao-mat-thanh-toan">
                      <a href="/blog/post/chinh-sach-bao-mat-thanh-toan"> {t("policy_payment_secure")} </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/post/chinh-sach-giao-hang">
                      <a href="/blog/post/chinh-sach-giao-hang"> Chính sách giao hàng </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/post/chinh-sach-bao-hanh-doi-tra">
                      <a href="/blog/post/chinh-sach-bao-hanh-doi-tra"> Chính sách bảo hành đổi trả </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/post/chinh-sach-thanh-toan">
                      <a href="/blog/post/chinh-sach-thanh-toan"> Chính sách thanh toán </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className={`col-md-4 col-lg-2 col-6 efch-1 ef-img-t`}>
              <ul className="menu">
                {menu &&
                  menu.mainMenu &&
                  menu.mainMenu.length > 0 &&
                  range.map((item, index) => (
                    <li key={index}>
                      {menu.mainMenu[item] && (
                        <Link href={menu.mainMenu[item].additional_data && menu.mainMenu[item].additional_data.request_path ? `/${menu.mainMenu[item].additional_data.request_path.replace(".html", "")}` : "/"}>
                          <a href={menu.mainMenu[item].additional_data && menu.mainMenu[item].additional_data.request_path ? `/${menu.mainMenu[item].additional_data.request_path.replace(".html", "")}` : "/"}>{menu.mainMenu[item].name}</a>
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={`col-md-4 col-lg-2 col-6 efch-2 ef-img-t`}>
              <ul className="menu">
                {menu &&
                  menu.mainMenu &&
                  menu.mainMenu.length > 0 &&
                  range2.map((item, index) => (
                    <li key={index}>
                      {menu.mainMenu[item] && (
                        <Link href={menu.mainMenu[item].additional_data && menu.mainMenu[item].additional_data.request_path ? `/${menu.mainMenu[item].additional_data.request_path.replace(".html", "")}` : "/"}>
                          <a href={menu.mainMenu[item].additional_data && menu.mainMenu[item].additional_data.request_path ? `/${menu.mainMenu[item].additional_data.request_path.replace(".html", "")}` : "/"}>{menu.mainMenu[item].name}</a>
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={`col-md-4 col-lg-2 col-6 efch-2 ef-img-t`}>
              <ul className="menu">
                {menu &&
                  menu.mainMenu &&
                  menu.mainMenu.length > 0 &&
                  range3.map((item, index) => (
                    <li key={index}>
                      {menu.mainMenu[item] && (
                        <Link href={menu.mainMenu[item].additional_data && menu.mainMenu[item].additional_data.request_path ? `/${menu.mainMenu[item].additional_data.request_path.replace(".html", "")}` : "/"}>
                          <a href={menu.mainMenu[item].additional_data && menu.mainMenu[item].additional_data.request_path ? `/${menu.mainMenu[item].additional_data.request_path.replace(".html", "")}` : "/"}>{menu.mainMenu[item].name}</a>
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>

              <br />
              <p className="mb-10">
                <a href="https://apps.apple.com/vn/app/hoa-sen-home/id1556965501?l=vi" target="_blank" className="cl1">
                  <img className="lazy-hidden" height="40px" width="134px" data-lazy-type="image" data-lazy-src="/images/appstore.png" />
                </a>
              </p>
              <p>
                <a href="https://play.google.com/store/apps/details?id=com.hoasen" target="_blank" className="cl1">
                  <img className="lazy-hidden" height="40px" width="134px" data-lazy-type="image" data-lazy-src="/images/playstore.png" />
                </a>
              </p>
              <p>
                <a href="http://online.gov.vn/Home/WebDetails/79758" target="_blank">
                  <img className="lazy-hidden" data-lazy-type="image" data-lazy-src="/images/logoSaleNoti.png" width="134px" height="51px" alt="" />
                </a>
              </p>
            </div>
          </div>
          <div id="copyright" style={{ borderTop: "none" }}>
            <strong>© 2021 - Bản quyền của Công ty Cổ phần Tập đoàn Hoa Sen</strong>
            <br />
            Giấy CNĐKDN số: 3700381324 - Ngày cấp: 08/08/2001, được sửa đổi lần thứ 37 ngày 28/10/2021
            <br />
            Cơ quan cấp: Phòng đăng ký kinh doanh - Sở kế hoạch và đầu tư tỉnh Bình Dương
            <br />
            Địa chỉ đăng ký kinh doanh: Số 09, Đại lộ Thống Nhất, Khu công nghiệp Sóng Thần II, Phường Dĩ An, Thành phố Dĩ An, Tỉnh Bình Dương, Việt Nam
          </div>

          <div id="copyright">
            <div>Hoa Sen Group © 2021. All Rights Reserved</div>
          </div>
        </div>
      </footer>
      <div className="list-social-2 sticky">
        <a href="https://info.hoasengroup.vn/" target="_blank">
          <i className="icon-home"></i>
        </a>
        <a href="https://www.youtube.com/channel/UC21EzMtcfXUBXl-Ziq8ZCLg/featured" target="_blank">
          <img width="32px" height="32px" className="lazy-hidden" data-lazy-type="image" data-lazy-src="/images/youtube.svg" alt="Youtube" />
        </a>
        <a href="https://www.facebook.com/www.hoasenhome.vn/" target="_blank">
          <img width="32px" height="32px" className="lazy-hidden" data-lazy-type="image" data-lazy-src="/images/fb.svg" alt="Facebook" />
        </a>
        <a href="https://zalo.me/4150200724651839217" target="_blank">
          <img width="32px" height="32px" className="lazy-hidden" data-lazy-type="image" data-lazy-src="/images/zalo.svg" alt="Zalo" />
        </a>
      </div>
    </>
  );
}

export default Footer;
