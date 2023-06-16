import React from 'react'
import Link from 'next/link'
const render = [0, 1, 2];
function WidgetMobile({ commonData }) {
  return (
    <>
      {commonData.services && (

        <div className="sec-bd-bottom  r1-c3 accodion accodion-1">

          <div className="accodion-tab widget-1">
            <input  type="checkbox" id="chck_1_1" />
            <label className="accodion-title" htmlFor="chck_1_1" >
              <span>Ưu đãi từ Hoa Sen Group</span> <span className="triangle" ><i className="icon-arrow-1 ib"></i></span>
            </label>
            <div className="accodion-content entry-content" >
              <div className="inner">

                <ul>
                  {/* <li><i className="icon-login2"></i> Tư vấn trực tiếp tại công trình miễn phí</li>
                  <li><i className="icon-t4"></i> Hướng dẫn lắp đặt</li>
                  <li><i className="icon-t1"></i> Miễn phí vận chuyển</li>
                  <li><i className="icon-t6"></i> Đổi trả nhanh chóng</li>
                  <li><i className="icon-t3"></i> Bảo hàng chính hãng 10 năm</li>
                  <li><i className="icon-t7"></i> Tổng đài tư vấn 1800 1515 hỗ trợ miễn phí suốt thời gian sử dụng sản phẩm.</li> */}
                  {commonData.services.map((item, index) => {
                    switch (item.index) {
                      case 'consult':
                        return (
                          <li key={index}><i className="icon-login2"></i> {item.title}</li>
                        );
                      case 'installation':
                        return (
                          <li key={index}><i className="icon-t4"></i> {item.title}</li>
                        );
                      case 'shipping':
                        return (
                          <li key={index}><i className="icon-t1"></i> {item.title}</li>
                        );
                      case 'return':
                        return (
                          <li key={index}><i className="icon-t6"></i> {item.title}</li>
                        );
                      case 'guarantee':
                        return (
                          <li key={index}><i className="icon-t3"></i> {item.title}</li>
                        );
                      case 'help_center':
                        return (
                          <li key={index}><i className="icon-t7"></i> {item.title}</li>
                        );
                      default:
                        return null;
                    }
                  })}
                </ul>

              </div>
            </div>
          </div>


          {/* <div className="accodion-tab widget-2">
            <input  type="checkbox" id="chck_1_2" />
            <label className="accodion-title" htmlFor="chck_1_2" >
              <span>Khuyến mãi hot</span> <span className="triangle" ><i className="icon-arrow-1 ib"></i></span>
            </label>
            <div className="accodion-content entry-content" >
              <div className="inner">
                <ul>
                  <li>Giảm ngay 300.000đ cho đơn từ 10 triệu đồng</li>
                  <li>Tặng combo vật tư (Dây điện, ống nhựa, đinh vít, …) cho đơn hàng từ 2 triệu đồng</li>
                </ul>
              </div>
            </div>
          </div> */}

          {Object.keys(commonData.posts).map((i, index) => (
            commonData.posts[i].posts.length != 0 && (
              <div className="accodion-tab widget-2" key={index}>
                <input  type="checkbox" id="chck_1_2" />
                <label className="accodion-title" htmlFor="chck_1_2" >
                  <span>{commonData.posts[i].label}</span> <span className="triangle" ><i className="icon-arrow-1 ib"></i></span>
                </label>
                <div className="accodion-content entry-content" >
                  <div className="inner">
                    <ul>
                      {commonData.posts[i].posts.map((item, index) => (
                        <li key={index}>
                          <Link href={item.request_path}>
                            <a>
                              {item.title}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          ))}



        </div>


      )}
    </>
  )
}

export default WidgetMobile