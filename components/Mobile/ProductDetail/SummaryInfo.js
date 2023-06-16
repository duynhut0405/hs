import React, { ReactNode, useEffect, useState, useRouter } from 'react'
import t from '../../../translation'
import Link from 'next/link'

function SummaryInfo({ data, brand, category, brandID }) {
  // const [brandID, setBrandID] = useState(0);

  // useEffect(() => {
  //   if (data) {
  //     let brand = data.find(element => (element.attribute_code && element.attribute_code == "brand"));
  //     if (brand) setBrandID(brand.value)
  //   }
  // }, [data])

  return (
    <>
      <div className=" r3-c2 pd-15 line-bottom  widget-1">
        <h6 className="box-title-2">Thông tin chung</h6>
        <table>
          <tbody>
            {brand && (
              <tr>
                <th>{t('Brands')}</th>
                <td style={{ border: "none" }}>
                  <Link href={`/${category.path}?brand=${brandID}&page=1`}>
                    <span className="cl1 btnlike">{brand.name}</span>
                  </Link>
                </td>
              </tr>
            )}

            {category && (
              <tr>
                <th>{t('categories')}</th>
                <td style={{ border: "none" }}>
                  <Link href={`/${category.path}`}>
                    <span className="cl1 btnlike">{category.name}</span>
                  </Link>
                </td>
              </tr>
            )}
            {/* <tr>
              <th>Dạng sản phẩm</th>
              <td style={{border:"none"}}>Tôn</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      {/* <div className=" pd-15 sec-bd-bottom  widget-2">
        <h6 className="box-title-2">Chứng nhận hợp chuẩn, hợp quy</h6>
        <div className="pd-15">
          <div className="slick-res s-per s-nav s-dots"  >
            <?php for($i=1;$i<=12;$i++){ ?>
              <div>
                <div className="item">
                  <img data-lazy="assets/images/img-2.jpg" alt="" >
        </div>
                </div>
                <?php } ?>
    </div>
  </div>
        </div> */}
    </>
  )
}

export default SummaryInfo