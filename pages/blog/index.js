import Layout from '../../components/Desktop/Layout'
import api from '../../services/api'
import BreadCrumb from '../../components/Desktop/Common/BreadCrumb'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import Pagination from "react-js-pagination"
import react, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import lazyLoad from '../../utils/lazyload'
import ViewedProduct from '../../components/Desktop/Home/ViewedProduct'
import IsMobile from '../../utils/detectMobile'
import LayoutMobile from '../../components/Mobile/LayoutMobile'
import HeaderMobile from '../../components/Mobile/HeaderMobile'
import SectionBreadcrumbMobile from '../../components/Mobile/Common/SectionBreadcrumbMobile'
import checkImageExist from '../../utils/checkImageExist'

function Blog({ data, sidebar, page, isMobile }) {
  const router = useRouter();
  lazyLoad();
  const handlePageChange = (pageNumber) => {
    router.push(`/blog?page=${pageNumber}`)
  }

  const setShowMenu = () => {
    var element = document.body;
    element.classList.toggle("showMenu");
  }
  // useEffect(() => {
  //   setShowMenu();
  // }, [router])
  return !isMobile ? (
    <Layout>
      <BreadCrumb data={[{ name: "Tin tức", link: "/blog", isActive: true }]} />
      <section className=" sec-tb  sec-bd-bottom">
        <div className="container">
          <div className="row ">
            <div className=" col-lg-9">
              <div className=" box-shadow">
                <h1 className="box-title-3">Tất cả tin tức</h1>
                <div className="pd-20">
                  <div className=" list-item list-b-7">
                    {data.posts.map((item, index) => (
                      <div className="item-group " key={index}>
                        <div className="item-group-addon">
                          <Link href={`/blog/post/${item.identifier}`}>
                            <a href={`/blog/post/${item.identifier}`} className="img tRes_66">
                              <img
                                className="lazy-hidden"
                                data-lazy-type="image"
                                data-lazy-src={item.first_image ? item.first_image : "/images/banner.jpg"}
                                src={item.first_image ? item.first_image : "/images/no-image.svg"}
                                alt={item.identifier}
                                onError={async (e) => await checkImageExist(e)}
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="item-group-content">
                          <div className="divtext">
                            <h5 className="title">
                              <Link href={`/blog/post/${item.identifier}`}>
                                <a href={`/blog/post/${item.identifier}`}>{item.title}</a>
                              </Link>
                            </h5>
                            {ReactHtmlParser(item.short_content)}
                            <div className="date">{item.publish_time.slice(0, 10)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pages text-center">
                    <Pagination
                      activePage={parseInt(page)}
                      itemsCountPerPage={10}
                      totalItemsCount={data.post_size}
                      pageRangeDisplayed={5}
                      innerClass={"page-numbers pagination"}
                      linkClass={"page-numbers"}
                      hideFirstLastPages={true}
                      activeLinkClass={"page-numbers current  active"}
                      onChange={handlePageChange.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-lg-3  sidebar-blog">
              <div className="sidebar-inner">
                <div className="widget box-shadow">
                  <h6 className="box-title-3">Danh mục tin tức</h6>
                  <ul className="accordion accordion-menu">
                    <li className="active">
                      <Link href="/blog">
                        <a href="/blog">Tất cả</a>
                      </Link>
                    </li>

                    {sidebar.categories &&
                      sidebar.categories.map((item, index) => (
                        <li className="children" key={index}>
                          <Link href={`/blog/category/${item.data.identifier}`}>
                            <a href={`/blog/category/${item.data.identifier}`}>{item.data.title}</a>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="widget box-shadow">
                  <h6 className="box-title-3">Tin tức nổi bật</h6>
                  <div className=" list-item list-b-8">
                    {sidebar.popular &&
                      sidebar.popular.map((item, index) => (
                        <div className="item-group " key={index}>
                          <div className="item-group-addon">
                            <Link href={`/blog/post/${item.identifier}`}>
                              <a href={`/blog/post/${item.identifier}`} className="img tRes_68">
                                <img
                                  className="lazy-hidden"
                                  data-lazy-type="image"
                                  data-lazy-src={item.firstImage ? item.firstImage : "/images/banner.jpg"}
                                  src="/images/no-image.svg"
                                  alt={item.identifier}
                                  onError={async (e) => await checkImageExist(e)}
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="item-group-content divtext">
                            <div className="title line-3">
                              <Link href={`/blog/post/${item.identifier}`}>
                                <a href={`/blog/post/${item.identifier}`}>{item.title}</a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ViewedProduct />
    </Layout>
  ) : (
    <LayoutMobile>
      <HeaderMobile />
      <SectionBreadcrumbMobile data={[{ name: "Tin tức", link: "/#", isActive: false }]} />
      <div className="blog-heading">
        <h1 className="h2">Tất cả tin tức</h1>
        <span className="menu-btn x" onClick={() => setShowMenu()}>
          <span></span>
        </span>
      </div>

      <div id="wmenu-blog">
        <div className=" widget-menu-category">
          <ul className="accordion accordion-menu">
            <li className="active">
              <Link href="/blog">
                <a href="/blog">Tất cả</a>
              </Link>
            </li>

            {sidebar.categories &&
              sidebar.categories.map((item, index) => (
                <li className="children" key={index}>
                  <Link href={`/blog/category/${item.data.identifier}`}>
                    <a href={`/blog/category/${item.data.identifier}`}>{item.data.title}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="pd-15  sec-bd-bottom">
        <div className=" pd-15 list-item list-b-7">
          {data.posts.map((item, index) => (
            <div className="item-group " key={index}>
              <div className="item-group-addon">
                <Link href={`/blog/post/${item.identifier}`}>
                  <a href={`/blog/post/${item.identifier}`} className="img tRes_66">
                    <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item.first_image ? item.first_image : "/images/banner.jpg"} src="/images/no-image.svg" alt={item.identifier} onError={async (e) => await checkImageExist(e)} />
                  </a>
                </Link>
              </div>
              <div className="item-group-content">
                <div className="divtext">
                  <h5 className="title">
                    <Link href={`/blog/post/${item.identifier}`}>
                      <a href={`/blog/post/${item.identifier}`}>{item.title}</a>
                    </Link>
                  </h5>
                  <div className="date">{item.publish_time.slice(0, 10)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pages text-center">
          <Pagination
            activePage={parseInt(page)}
            itemsCountPerPage={10}
            totalItemsCount={data.post_size}
            pageRangeDisplayed={5}
            innerClass={"page-numbers pagination"}
            linkClass={"page-numbers"}
            hideFirstLastPages={true}
            activeLinkClass={"page-numbers current  active"}
            onChange={handlePageChange.bind(this)}
          />
        </div>
      </div>
      <section className=" sec-post-feature  group-ef lazy-hidden">
        <h2 className="box-title   efch-1 ef-tx-t">Tin tức nổi bật</h2>
        <div className=" list-item list-b-8">
          {sidebar.popular &&
            sidebar.popular.map((item, index) => (
              <div className="item-group " key={index}>
                <div className="item-group-addon">
                  <Link href={`/blog/post/${item.identifier}`}>
                    <a href={`/blog/post/${item.identifier}`} className="img tRes_68">
                      <img className="lazy-hidden" data-lazy-type="image" data-lazy-src={item.firstImage ? item.firstImage : "/images/banner.jpg"} src="/images/no-image.svg" alt={item.identifier} onError={async (e) => await checkImageExist(e)} />
                    </a>
                  </Link>
                </div>
                <div className="item-group-content divtext">
                  <div className="title line-3">
                    <Link href={`/blog/post/${item.identifier}`}>
                      <a href={`/blog/post/${item.identifier}`}>{item.title}</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <br></br>
    </LayoutMobile>
  );
}
// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  let query = context.query;
  let data = null;
  let sidebar = null;
  let page = 1;
  if (query.page != undefined) {
    page = query.page;
  }
  try {
    const result = await Promise.all([
      api.get(`service/rewrite/entity/blog?p=${page}`),
      api.get('service/blog/sidebar')
    ]);
    data = result[0].data.blog_data[0];
    sidebar = result[1].data[0];
  } catch (error) {
    console.log(error);
  }
  const isMobile = IsMobile(context);
  return { props: { data, sidebar, page, isMobile } }
}

export default Blog;