import React, { useEffect, useState } from 'react'
import Layout from '../../components/Desktop/Layout'
import BreadCrumb from '../../components/Desktop/Common/BreadCrumb'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import IsMobile from '../../utils/detectMobile'
import formatVND from '../../utils/formatVND'
import CategoryPaintProducts from '../../components/Desktop/Products/CategoryPaintProducts'

const paintList = [
  {
    id: 1,
    name: 'SuperShield',
    images: 'https://www.toagroup.com.vn/uploads/product/e22aabab5da30c-sssb.png',
    value: 11,
  },
  {
    id: 2,
    name: 'SuperShield',
    images: 'https://www.toagroup.com.vn/uploads/product/b8e5211357b405-ssbm.png',
    value: 11,
  },
  {
    id: 3,
    name: 'TOA 7in1',
    images: 'https://www.toagroup.com.vn/uploads/product/2b55285854bbb7-7in1.png',
    value: 5,
  },
  {
    id: 4,
    name: 'TOA NanoShield',
    images: 'https://www.toagroup.com.vn/uploads/product/cc9aaa0eaa959f-nanoshieldsb.png',
    value: 11,
  },
  {
    id: 5,
    name: 'TOA NanoShield',
    images: 'https://www.toagroup.com.vn/uploads/product/2c418667706386-nanoshieldbm.png',
    value: 11,
  },
  {
    id: 6,
    name: 'Sơn Nước Ngoại Thất TOA 4 Seasons Bóng Mờ',
    images: 'https://www.toagroup.com.vn/uploads/product/d843cb4f45c921-4ssext.png',
    value: 0,
  },
  {
    id: 7,
    name: 'TOA 4 Seasons Exterior Satin Glo High Sheen',
    images: 'https://www.toagroup.com.vn/uploads/product/6e47fe4700e878-extsatinglohighsheen18l.png',
    value: 10,
  },
  {
    id: 8,
    name: 'TOA 4 Seasons Exterior Satin Glo',
    images: 'https://www.toagroup.com.vn/uploads/product/6ff53708dbcdfa-4sssatinglo.png',
    value: 12,
  },
  {
    id: 9,
    name: 'TOA 4 Seasons Exterior Tropic Shield',
    images: 'https://www.toagroup.com.vn/uploads/product/ce1b21ceec6406-4ssexttropicshield.png',
    value: 10,
  },
  {
    id: 10,
    name: 'Supertech Pro Exterior',
    images: 'https://www.toagroup.com.vn/uploads/product/9518d96fda4232-supertechext.png',
    value: 11,
  },
  {
    id: 11,
    name: 'Sơn lót SuperShield Super Sealer (18L)',
    images: 'https://www.toagroup.com.vn/uploads/product/61a27f45882301-supershieldsealer18lwebsite.jpg',
    value: 10,
  },
  {
    id: 12,
    name: 'Sơn lót TOA NanoShield',
    images: 'https://www.toagroup.com.vn/uploads/product/002f88a5a70ca2-sonlotnanoshield.png',
    value: 10,
  },
  {
    id: 13,
    name: 'Sơn lót SuperShield Super Sealer (5L)',
    images: 'https://www.toagroup.com.vn/uploads/product/d0a2d42f285cc5-supershieldsealer5lpng.png',
    value: 10,
  },
  {
    id: 14,
    name: 'TOA Extra Wet Primer',
    images: 'https://www.toagroup.com.vn/uploads/product/83602474f39e82-extrawetprimer.png',
    value: 8,
  },
  {
    id: 16,
    name: 'TOA 4 Seasons Interior and Exterior Alkali Sealer',
    images: 'https://www.toagroup.com.vn/uploads/product/173578ec03b24b-4ssintextalkalisealer.png',
    value: 10,
  },
  {
    id: 17,
    name: 'TOA 4 Seasons Super Contact Sealer',
    images: 'https://www.toagroup.com.vn/uploads/product/e491b632dd0a10-4sssupercontactsealer.png',
    value: 9,
  },
  {
    id: 18,
    name: 'Supertech Pro Alkali Sealer',
    images: 'https://www.toagroup.com.vn/uploads/product/4e55b216eee3eb-supertechproalkalisealer.png',
    value: 9,
  }
]


function sonNgoaiThat({ isMobile }) {
  const { register, handleSubmit, errors } = useForm();
  const [updating, setupdating ] = useState(false);
  const [caculated, setCaculated] = useState(false);
  const [square, setTotalSquare] = useState(0);
  const [product, setProduct] = useState(null);
  const submit = async (data) => {
    // noi that
    let window = data.windowSquare ? parseFloat(data.windowSquare) : 0;
    let totalSquare = (parseFloat(data.length) * parseFloat(data.height) * 2) + (parseFloat(data.width) * parseFloat(data.height) * 2) - window;
    setTotalSquare(totalSquare);
    const found = paintList.find(element => element.id ==  data.product);
    setProduct(found);
    setCaculated(true);
  }

  return (
      <Layout>
        <BreadCrumb data={[{ name: 'công cụ tính lượng sơn', link: '/tools/son-noi-that', isActive: true }]} />
        <main className="sec-tb page-user-info">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="box-shadow box-edit">
                  <ul className="box-menu">
                    <li>
                      <Link href="/tools/son-noi-that">
                        <a>{'Công cụ tính lượng sơn nội thất'}</a>
                      </Link>
                    </li>
                    <li className="active">
                      <Link href="/tools/son-ngoai-that">
                        <a>{'Công cụ tính lượng sơn ngoại thất'}</a>
                      </Link>
                    </li>
                  </ul>
                  <div className="box-content">
                    <form className={updating ? "row loading" : "row"} onSubmit={handleSubmit(submit)}>
                      <div className="col-sm-4">
                        <div className="mb-20">
                          <div className="input-title"><span className="require">*</span> Chiều rộng</div>
                          <input className="input" type='number'
                            placeholder="(m)" name="width"
                            ref={register({
                              required: {
                                value: true,
                                message: "Vui lòng nhập chiều rộng",
                              },
                            })} />
                          {errors.width && <div className="error">Vui lòng nhập chiều rộng</div>}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-20">
                          <div className="input-title"><span className="require">*</span> Chiều dài</div>
                          <input className="input" type='number'
                            placeholder="(m)" name="length"
                            ref={register({
                              required: {
                                value: true,
                                message: "Vui lòng nhập chiều dài",
                              },
                            })} />
                          {errors.length && <div className="error">{errors.length.message}</div>}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-20">
                          <div className="input-title"><span className="require">*</span> Chiều cao</div>
                          <input className="input" type='number'
                            placeholder="(m)" name="height"
                            ref={register({
                              required: {
                                value: true,
                                message: "Vui lòng nhập chiều cao",
                              },
                            })} />
                          {errors.height && <div className="error">{errors.height.message}</div>}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-20">
                          <div className="input-title">Tổng diện tích cửa (Nếu có)</div>
                          <input className="input" type='number'
                            placeholder="(m²)" name="windowSquare"
                            ref={register} />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-20">
                        <div className="input-title"><span className="require">*</span> Hãy chọn loại sơn của bạn</div>
                            <select ref={register({ required: true })} name='product'>
                            {paintList && paintList.map((item, index) => (
                                <option value={item.id} key={index}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            {errors.product && <div className="error">Hãy chọn sản phẩm ở trên</div>}
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-4" type="submit">Xem kết quả</button>
                      </div>
                    </form>
                  </div>
                </div>
                {square != 0 && 
                  <div className="box-shadow box-edit">
                    <div className="pd-20">
                    <h2 className="title">Kết quả tính toán</h2>
                    </div>
                    {product && (
                      <div className="row">
                      <div className="col-sm-4 r1-c1">
                        <div className="colorful" style={{padding: '40px'}}>
                          <img src={product.images} style={{maxWidth: '300px'}}></img>
                        </div>
                      </div>
                        <div className="col-sm-6 r1-c1">
                          <div className="pd-20">
                            <h1 className="h1">{product.name}</h1>
                          </div>
                          <div className="box-shadow pd-20 active">
                            <h1 className="h3">Tổng diện tích cần sơn: <span className="cl1">{formatVND(square)} m²</span></h1>
                            <h1 className="h3">Độ phủ sơn: <span className="cl1">{product.value} m²/L</span></h1>
                            <h1 className="h3">Lượng sơn cần mua: <span className="cl1">{formatVND(square/product.value)} L</span></h1>
                            
                          <span>
                            (Đây là kết quả áp dụng cho 1 lớp sơn nhà. Kết quả chỉ mang tính chất tham khảo, chưa bao gồm chỉ số hao hụt)
                          </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                }
              </div>
            </div>
            <CategoryPaintProducts/>
          </div>
        </main>
      </Layout>
  )
}

export async function getServerSideProps(context) {
  const isMobile = IsMobile(context);
  // Fetch data from external API
  return { props: { isMobile } }
}

export default sonNgoaiThat;