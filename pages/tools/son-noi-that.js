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
    name: 'SuperShield DuraClean A+',
    images: 'https://www.toagroup.com.vn/uploads/product/a26c6eb5492033-ssduracleanasb.png',
    value: 9,
  },
  {
    id: 2,
    name: 'SuperShield DuraClean',
    images: 'https://www.toagroup.com.vn/uploads/product/5c100ba48510a9-ssduraclean.png',
    value: 11,
  },
  {
    id: 3,
    name: 'TOA NanoClean',
    images: 'https://www.toagroup.com.vn/uploads/product/26e3c5a1a318cf-nanocleansb.png',
    value: 13,
  },
  {
    id: 4,
    name: 'TOA NanoClean',
    images: 'https://www.toagroup.com.vn/uploads/product/893a575581490a-nanocleanbm.png',
    value: 13,
  },
  {
    id: 5,
    name: 'TOA Thoải Mái Lau Chùi',
    images: 'https://www.toagroup.com.vn/uploads/product/38c5211434160d-tmlcsb.png',
    value: 13,
  },
  {
    id: 6,
    name: 'TOA Thoải Mái Lau Chùi',
    images: 'https://www.toagroup.com.vn/uploads/product/de1fd68c25f5eb-tmlcbm.png',
    value: 13,
  },
  {
    id: 7,
    name: 'TOA 4 Seasons Interior Top Silk Sheen',
    images: 'https://www.toagroup.com.vn/uploads/product/e032f1cd7922d5-4ssinttopsilksheen.png',
    value: 9,
  },
  {
    id: 8,
    name: 'TOA 4 Seasons Interior Top Silk',
    images: 'https://www.toagroup.com.vn/uploads/product/0153bd0e17c04e-4ssinttopsilk.png',
    value: 10,
  },
  {
    id: 9,
    name: 'Supertech Pro Interior',
    images: 'https://www.toagroup.com.vn/uploads/product/f8571c04bafa0c-supertechint.png',
    value: 10,
  },
  {
    id: 10,
    name: 'Sơn Nước Nội Thất Siêu Trắng Supertech Pro',
    images: 'https://www.toagroup.com.vn/uploads/product/303fe1bc432a51-supertechintst.png',
    value: 10,
  },
  {
    id: 11,
    name: 'Homecote Interior',
    images: 'https://www.toagroup.com.vn/uploads/product/5114d0a02cb254-homecoteint.png',
    value: 9,
  },
  {
    id: 12,
    name: 'Sơn Nước Nội Thất Nitto Extra',
    images: 'https://www.toagroup.com.vn/uploads/product/f696aef3be27c6-nittoint.png',
    value: 10,
  },
  // {
  //   id: 13,
  //   name: 'Sơn Nước Nội Thất Nitto Extra',
  //   images: 'https://www.toagroup.com.vn/uploads/product/16e907ff3a8d02-nittoextrabasea.png',
  //   value: 0,
  // },
  {
    id: 14,
    name: 'Sơn lót TOA NanoClean',
    images: 'https://www.toagroup.com.vn/uploads/product/c8c46061653993-sonlotnanoclean.png',
    value: 11,
  },
  {
    id: 15,
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
  },
  // {
  //   id: 19,
  //   name: 'Sơn Lót Chống Kiềm Nội Thất Supertech Pro',
  //   images: 'https://www.toagroup.com.vn/uploads/product/54522f11d93d2b-toasupertechproprimer18l2naptrang.png',
  //   value: 0,
  // },
]


function sonNoiThat({ isMobile }) {
  const { register, handleSubmit, errors } = useForm();
  const [updating, setupdating ] = useState(false);
  const [caculated, setCaculated] = useState(false);
  const [square, setTotalSquare] = useState(0);
  const [product, setProduct] = useState(null);
  const submit = async (data) => {
    console.log(data)
    // noi that
    let rate = 1;
    let height = parseFloat(data.height);
    if (height >= 2 && height <= 4) {
      rate = 4.5;
    } else if (height >= 4.1 && height <= 8) {
      rate = 9;
    } else if (height >= 8.1 && height <= 12) {
      rate = 13.5;
    } else if (height >= 12.1 && height <= 15) {
      rate = 18;
    }
    let window = data.windowSquare ? parseFloat(data.windowSquare) : 0;
    let totalSquare = (parseFloat(data.length) * parseFloat(data.width) * rate) - window;
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
                    <li className="active">
                      <Link href="/tools/son-noi-that">
                        <a>{'Công cụ tính lượng sơn nội thất'}</a>
                      </Link>
                    </li>
                    <li>
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

export default sonNoiThat;