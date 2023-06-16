import React, { useState } from "react";
import Layout from "../../components/Desktop/Layout";
import BreadCrumb from "../../components/Desktop/Common/BreadCrumb";
import t from "../../translation";
import MenuUser from "../../components/Desktop/Common/MenuUser";
import { useAuth } from "../../contexts/auth";
import Link from "next/link";
import IsMobile from "../../utils/detectMobile";
import LayoutMobile from "../../components/Mobile/LayoutMobile";
import formatVND from "../../utils/formatVND";
import convertDateTime from "../../utils/convertDateTime";
import Pagination from "react-js-pagination";

function OrderList({ isMobile }) {
  const { orderList, orderListTotal, loadUserOrder } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (data) => {
    setCurrentPage(data);
    loadUserOrder(data);
  };
  return isMobile ? (
    <LayoutMobile>
      <Link href="/account">
        <div className="page-top-heading">
          <a className="back icon-arrow-1 ix"></a>
          <h1>Quản lý đơn hàng</h1>
        </div>
      </Link>
      <div className=" list-order">
        {orderList &&
          orderList.length != 0 &&
          orderList.map((item, index) => (
            <div className="item pd-15" key={index}>
              <div>
                Mã đơn hàng: <span className="w5">{item.increment_id}</span>
              </div>
              <div>
                Ngày mua: <span className="w5">{convertDateTime(item.created_at)}</span>
              </div>
              <div>
                Người nhận: <span className="w5">{item.shipping_name}</span>
              </div>
              <div>
                Tổng tiền: <span className="w5">{formatVND(parseInt(item.grand_total))}</span> đ
              </div>
              <div className="mb-10">
                Trạng thái: <span className="w5">{item.status_label}</span>
              </div>
              <div>
                <Link href={`/account/orders/${item.entity_id}`}>
                  <a className="cl1">{t("view_more")}</a>
                </Link>
              </div>
            </div>
          ))}
        {orderListTotal > 10 && (
          <div className="pages text-center" style={{ minHeight: "80px" }}>
            <br />
            <Pagination
              activePage={parseInt(currentPage)}
              itemsCountPerPage={10}
              totalItemsCount={orderListTotal}
              pageRangeDisplayed={5}
              innerClass={"page-numbers pagination"}
              linkClass={"page-numbers"}
              hideFirstLastPages={true}
              activeLinkClass={"page-numbers current  active"}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </LayoutMobile>
  ) : (
    <Layout>
      <BreadCrumb
        data={[
          { name: t("account_info"), link: "/account", isActive: false },
          { name: t("order_manage"), link: "/account/order-list", isActive: true },
        ]}
      />
      <main className="sec-tb page-user-order">
        <div className="container">
          <div className="row ">
            <div className="col-md-3 sidebar-user">
              <MenuUser/>
            </div>
            {orderList && orderList.length != 0 && (
              <div className="col-12 col-md-9">
                <div className="table-responsive box-shadow">
                  <table className="table table-line   table-order">
                    <thead>
                      <tr>
                        <th>{t("order_code")}</th>
                        <th>{t("bought_date")}</th>
                        <th>Người nhận</th>
                        <th className="col-price">{t("total_cost")}</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderList.map((item, index) => (
                        <tr key={index}>
                          <td>{item.increment_id}</td>
                          <td>{convertDateTime(item.created_at)}</td>
                          <td>{item.shipping_name}</td>
                          <td className="b">{formatVND(parseInt(item.grand_total))} đ</td>
                          <td>{item.status_label}</td>
                          <td>
                            <Link href={`/account/orders/${item.entity_id}`}>
                              <a>{t("view_more")}</a>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {orderListTotal > 10 && (
                  <div className="pages text-center">
                    <br />
                    <Pagination
                      activePage={parseInt(currentPage)}
                      itemsCountPerPage={10}
                      totalItemsCount={orderListTotal}
                      pageRangeDisplayed={5}
                      innerClass={"page-numbers pagination"}
                      linkClass={"page-numbers"}
                      hideFirstLastPages={true}
                      activeLinkClass={"page-numbers current  active"}
                      onChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            )}
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

export default OrderList;
