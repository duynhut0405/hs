import React, {useState, useEffect} from 'react';
import NormalCarosel from '../Core/NormalCarosel';

const data = [
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
	{	},
];


function About({}) {
  return (
    <>
      <section className=" sec-tb  group-ef lazy-hidden">
        <div className="container">
          <div className="row center space-40">
            <div className="col-md-6">
              <div className="divtext text-justify">
                  <h2 className="ht efch-2 ef-tx-l">HỆ THỐNG SIÊU THỊ VẬT LIỆU XÂY DỰNG & NỘI THẤT HOA SEN HOME NƠI CUNG CẤP TẤT CẢ VẬT TƯ CHO NGÔI NHÀ CỦA BẠN</h2>                    
                  <p className="desc efch-3 ef-tx-l" >
                  Với các sản phẩm phong phú và đa dạng từ những vật liệu xây dựng cơ bản như: tôn, ống thép, ống nhựa, thép xây dựng, thép hình, xi măng, gạch nung, cát, đá xây dựng,... cho đến vật liệu xây dựng hoàn thiện như: gạch ốp lát, thiết bị vệ sinh, sơn các loại; và thiết bị điện dân dụng, dụng cụ cầm tay,...Tất cả sản phẩm đều được trải qua quy trình kiểm tra nghiêm ngặt và được bảo chứng chất lượng bằng thương hiệu của Tập đoàn Hoa Sen.
                  </p>
                  <p className="desc efch-4 ef-tx-l" >
                  Đến với siêu thị Hoa Sen Home, khách hàng sẽ được tư vấn, tham quan và lựa chọn những sản phẩm chất lượng với mẫu mã đa dạng từ những thương hiệu đối tác lớn trên thế giới.
Thông qua việc thoả thuận hợp tác lâu dài với các đối tác, cũng như khai thác nguồn nhân lực sẵn có cùng hệ thống gần 600 cửa hàng và 10 nhà máy đang đặt gần các kho bãi lớn, cảng biển trên khắp cả nước giúp cho Hoa Sen Home tối ưu việc lưu kho, vận chuyển và xuất nhập hàng hóa, đảm bảo tốc độ giao hàng nhanh chóng đến tận chân công trình, chi phí giá thành cạnh tranh nhất trên thị trường. Đảm bảo với khách hàng 4 cam kết vàng trong bán hàng là: ĐÚNG GIÁ – ĐÚNG TIÊU CHUẨN – ĐÚNG CHẤT LƯỢNG - ĐƯỢC BẢO HÀNH.
                  </p>

              </div>      
            </div>
            <div className="col-md-6">
              <div className=""> 
                <img className="lazy-hidden" data-lazy-type="image"   data-lazy-src="/images/gioi-thieu.jpg" alt="" /> 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className=" sec-tb   group-ef lazy-hidden">
        <div className="container">
          <h2  className="ht ">TẦM NHÌN SỨ MỆNH</h2>
          <div className="row list-item">
            <div className="col-sm-6 col-lg-3 efch-4 ef-img-t">
              <div className="divtext ">
                  <h4  >GIÁ TRỊ CỐT LÕI</h4>                    
                  <p className="desc" >
                    
                    <strong>Trung thực - Cộng đồng - Phát triển</strong>
                  </p>
              </div>      
            </div>
            <div className="col-sm-6 col-lg-3 efch-5 ef-img-t">
              <div className="divtext ">
                  <h4  >TRIẾT LÝ KINH DOANH</h4>                    
                  <p className="desc" >
                  Chất lượng sản phẩm là trọng tâm <br />
                  Lợi ích khách hàng là then chốt <br />
                  Thu nhập nhân viên là trách nhiệm <br />
                  Chia sẻ cộng đồng là nghĩa vụ
                  </p>
              </div>      
            </div>
                                 
            <div className="col-sm-6 col-lg-3 efch-2 ef-img-t">
              <div className="divtext ">
                  <h4  >TẦM NHÌN</h4>                    
                  <p className="desc" >
                    Trở thành Tập đoàn kinh tế hàng đầu Việt Nam và khu vực. Trong đó, lĩnh vực trọng tâm là sản xuất và phân phối các sản phẩm vật liệu xây dựng thông qua chiến lược phát triển bền vững dựa trên chuỗi lợi thế cạnh tranh cốt lõi, song song với mục tiêu phát triển cộng đồng, bảo vệ môi trường, góp phần mang lại giá trị cao nhất cho cổ đông, người lao động, người tiêu dùng và xã hội.
                  </p>
              </div>      
            </div>
            <div className="col-sm-6 col-lg-3 efch-3 ef-img-t">
              <div className="divtext ">
                  <h4  >SỨ MỆNH</h4>                    
                  <p className="desc" >
                  Cung cấp những sản phẩm và dịch vụ gắn liền với thương hiệu Hoa Sen, đảm bảo chất lượng quốc tế, giá cả hợp lý, mẫu mã đa dạng, thân thiện môi trường, đáp ứng nhu cầu người tiêu dùng, góp phần thay đổi diện mạo kiến trúc đất nước và phát triển cộng đồng. Không ngừng đổi mới và phát triển để khẳng định tầm vóc và sứ mệnh của một doanh nghiệp Việt Nam năng động, sáng tạo, tiên phong trong cả lĩnh vực kinh doanh và các hoạt động cộng đồng, vươn cao vị thế trên thị trường quốc tế.

                  </p>
              </div>      
            </div>


          </div>
        </div>
      </section> */}

      

      <section className=" sec-tb ">
        <div className="container">
          <NormalCarosel 
            arrow={true}
            dot={false}
            loop= {true}
            autoplay={true}
            res={[3,3,2,1]}
          >
            {
              data.map((item,index) => (
                <div key={index} className="tRes_60"><img src={`/images/about/${index}.jpg`} alt="" /> </div>
              )
              )}



          </NormalCarosel>

          

        </div>
      </section>

    </>
  );
}

export default About;
