import React from "react";
import t from "../../../../translation";
import Link from "next/link";

function BannerBottom() {
  return (
    <div className="row c2-r2" style={{marginTop:"20px"}}>
      <div className="col-md-4">
        <Link href="/blog/post/chinh-sach-giao-hang">
          <a href="/blog/post/chinh-sach-giao-hang" className="item box-shadow">
            <i className="icon-t1"></i> Giao hàng toàn quốc
          </a>
        </Link>
      </div>
      <div className="col-md-4">
        <Link href="/blog/post/chinh-sach-thanh-toan">
          <a href="/blog/post/chinh-sach-thanh-toan" className="item box-shadow">
            <i className="icon-t2"></i> Thanh toán tiện lợi
          </a>
        </Link>
      </div>
      <div className="col-md-4">
        <Link href="/blog/category/chinh-sach-ho-tro">
          <a href="/blog/category/chinh-sach-ho-tro" className="item box-shadow">
            <i className="icon-t3"></i> Chăm sóc khách hàng
          </a>
        </Link>
      </div>
    </div>
  );
}

export default BannerBottom;
