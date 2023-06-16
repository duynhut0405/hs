import React, { ReactNode, useEffect, useState, useRouter } from 'react'
import t from '../../../translation'
import Link from 'next/link'

function CommonData({ brandID, data, brand, category }) {

  // const [brandID, setBrandID] = useState(0);

  // useEffect(() => {
  //   if (data) {
  //     let brand = data.find(element => (element.attribute_code && element.attribute_code == "brand"));
  //     if (brand) setBrandID(brand.value)
  //   }
  // }, [data])

  return (
    <>
      <div className="widget box-shadow  widget-1">
        <h6 className="box-title-2 uppercase">Thông tin chung</h6>
        <div className="pd-20">
          <table>
            <thead>
              {brand && (<tr>
                <th>{t('Brands')}</th>
                <td style={{ border: "none" }}>
                  <Link href={`/${category.path}?brand=${brandID}&page=1`}>
                    <span className="cl4 w6 btnlike">{brand.name}</span>
                  </Link>
                </td>
              </tr>)}
              {category && (
                <tr>
                  <th>{t('categories')}</th>
                  <td style={{ border: "none" }}>
                    <Link href={`/${category.path}`}>
                      <span className="cl4 w6 btnlike">{category.name}</span>
                    </Link>
                  </td>
                </tr>
              )}
              {/* <tr>
              <th>Dạng sản phẩm</th>
              <td style={{border:"none"}}>Tôn</td>
            </tr> */}
            </thead>
          </table>
        </div>
      </div>
    </>
  )
}

export default CommonData