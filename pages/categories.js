import Layout from '../components/Desktop/Layout'
import LayoutMobile from '../components/Mobile/LayoutMobile'
import api from '../services/api'
import { isMobile } from 'react-device-detect';
import SectionSearchMobile from '../components/Mobile/Common/SectionSearchMobile'
import HeaderMobile from '../components/Mobile/HeaderMobile'
import Link from 'next/link'
import checkImageExist from '../utils/checkImageExist'

function categories({ menu }) {
  return (
    <LayoutMobile menu={menu} >
      <HeaderMobile />
      {/* <SectionSearchMobile page='categoriesMobile' /> */}
      <br/>
      <section className=" sec-b " >
        <div className="container">
          <div className=" entry-head lazy-hidden ef ef-tx-t">
            <h2 className="ht">Danh mục sản phẩm</h2>
          </div>
          <div className="row list-item-10  list-b-2  lazy-hidden group-ef">
            {menu && menu.map((item, index) => (
              <div className={`col-md-2 col-xs-4 col-3 efch-${index + 1} ef-img-t`} key={index}>
                <Link href={'/' + item?.additional_data?.request_path?.replace(".html", "")}>
                  <a className="item " href={'/' + item?.additional_data?.request_path?.replace(".html", "")}>
                    <div className="img tRes">
                      <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item?.additional_data?.thumbnail_image} src="/images/no-image.svg" alt="" onError={async (e) => await checkImageExist(e)}/>
                    </div>
                    <div className="title">{item.name} </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayoutMobile>
  )
}
// This gets called on every request
export async function getStaticProps(context) {
  // Fetch data from external API
  let menu = [];
  try {
    const result = await Promise.all([
      api.get('/service/stores/menus', {withCredentials: false}),
    ])
    menu = result[0].data[0].menuItems;
  } catch (error) {
    console.log(error);
  }
  return { props: { menu }, revalidate: 60 }
}

export default categories;