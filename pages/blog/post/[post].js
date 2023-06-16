import Layout from "../../../components/Desktop/Layout";
import api from "../../../services/api";
import BreadCrumb from "../../../components/Desktop/Common/BreadCrumb";
import Link from "next/link";
import ReactHtmlParser from "react-html-parser";
import Pagination from "react-js-pagination";
import react, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import lazyLoad from "../../../utils/lazyload";
import ViewedProduct from "../../../components/Desktop/Home/ViewedProduct";
import Head from "next/head";
import { FacebookShareButton } from "react-share";
import IsMobile from "../../../utils/detectMobile";
import LayoutMobile from "../../../components/Mobile/LayoutMobile";
import HeaderMobile from "../../../components/Mobile/HeaderMobile";
import SectionBreadcrumbMobile from "../../../components/Mobile/Common/SectionBreadcrumbMobile";
import ViewedProductMobile from "../../../components/Mobile/Common/ViewedProductMobile";
import checkImageExist from "../../../utils/checkImageExist";
import StripHtmlTag from "../../../utils/stripHtmlTag";
import NormalCarosel from "../../../components/Core/NormalCarosel";
import { cssNumber } from "jquery";
function Blog({ data, sidebar, post, isMobile }) {
  const router = useRouter();
  const [url, setUrl] = useState(null);
  const [isCopied, setCopied] = useState(false);
  const [anotherPost, setAnotherPost] = useState(null);
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(async () => {
    if (data?.categories[data?.categories.length - 1]?.identifier) {
      console.log(data?.categories[data?.categories.length - 1]?.identifier)
      try {
        const result = await api.get(`service/rewrite/entity/blog*category*${encodeURI(data?.categories[data?.categories.length - 1]?.identifier)}?p=1`);
        const {blog_data} = result.data;
        console.log(blog_data)
        if (blog_data[0].posts) {
          let posts = blog_data[0].posts.length > 4 ? blog_data[0].posts.slice(0, 4) : blog_data[0].posts;
          setAnotherPost(posts)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }, [data]);

  lazyLoad();

  const copyUrl = () => {
    let dummy = document.createElement("input");
    let text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setCopied(true);
  };

  return !isMobile ? (
    <Layout>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{data.title}</title>
        <meta name="description" content={StripHtmlTag(data?.meta_description ? data?.meta_description : data?.content)} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Bhome" />
        <meta property="og:url" itemProp="url" content={"https://hoasenhome.vn" + router.asPath.split("?")[0]} />
        <meta property="og:image" itemProp="thumbnailUrl" content={data.first_image ? data.first_image : "https://hoasenhome.vn/images/gioi-thieu.jpg"} />
        <meta property="og:title" content={data.title} itemProp="headline" />
        <meta property="og:description" content={StripHtmlTag(data?.meta_description ? data?.meta_description : data?.content)} itemProp="description" />
      </Head>
      <BreadCrumb
        data={[
          { name: "Tin tức", link: "/blog", isActive: false },
          { name: data.categories[0].title, link: `/blog/category/${data.categories[0].identifier}`, isActive: false },
          { name: data.title, link: `/blog/post/${data.identifier}`, isActive: true },
        ]}
      />
      <main className=" sec-tb sec-bd-bottom page-blog-detail">
        <div className="container">
          <div id="copied" className={`copied ${isCopied ? "active" : ""}`}>
            *Đã sao chép đường dẫn bài viết{" "}
            <span className="close" onClick={() => setCopied(false)}>
              <i className="icon-close"></i>
            </span>
          </div>
          <div className="row ">
            <div className=" col-lg-9">
              <div className="pd-20 entry-content box-shadow">
                <div className="maincontent">
                  <h1 className=" ">{data.title}</h1>
                  <p className="date cl4 mb-40 fs-12">{data.publish_time.slice(0, 10)}</p>
                  {ReactHtmlParser(data.content)}
                  <div className="tools">
                    <FacebookShareButton url={url}>
                      <a className="item" href="#">
                        <i className="icon-fb"></i> <span>Chia sẻ</span>
                      </a>
                    </FacebookShareButton>
                    <span className="item " onClick={() => copyUrl()} href="#">
                      <i className="icon-t15"></i> <span>Sao chép</span>
                    </span>
                  </div>

                  {data?.gallery && (
                    <section className=" sec-tb ">
                      <div className="container">
                        <NormalCarosel arrow={true} dot={false} loop={true} autoplay={true} res={[2, 2, 2, 1]}>
                          {data?.gallery?.map((item, index) => (
                            <div className="tRes_60" key={index}>
                              <img src={item} alt="ton-hoa-sen" />{" "}
                            </div>
                          ))}
                        </NormalCarosel>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
            <div className=" col-lg-3  sidebar-blog">
              <div className="sidebar-inner">
                <div className="widget box-shadow">
                  <h6 className="box-title-3">Danh mục tin tức</h6>
                  <ul className="accordion accordion-menu">
                    <li className="">
                      <Link href="/blog">
                        <a href="/blog">Tất cả</a>
                      </Link>
                    </li>

                    {sidebar.categories &&
                      sidebar.categories.map((item, index) => (
                        <li className={`children ${item.data.identifier == data.categories[0].identifier ? "active" : ""}`} key={index}>
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
                  <div className="pd-20">
                    <Link href="/blog">
                      <a href="/blog" className="viewall">
                        Xem tất cả <i className="icon-arrow-2"></i>
                      </a>
                    </Link>
                  </div>
                </div>
                {anotherPost && (
                  <div className="widget box-shadow">
                    <h6 className="box-title-3">{data?.categories[data?.categories.length - 1]?.title}</h6>
                    <div className=" list-item list-b-8">
                      {anotherPost &&
                        anotherPost.map((item, index) => (
                          <div className="item-group " key={item.identifier}>
                            <div className="item-group-addon">
                              <Link href={`/blog/post/${item.identifier}`}>
                                <a href={`/blog/post/${item.identifier}`} className="img tRes_68">
                                  <img src={item.first_image} alt={item.identifier} />
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
                    <div className="pd-20">
                      <Link href={`/blog/category/${data.categories[data.categories.length - 1].identifier}`}>
                        <a href={`/blog/category/${data.categories[data.categories.length - 1].identifier}`} className="viewall">
                          Xem tất cả <i className="icon-arrow-2"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <ViewedProduct />
    </Layout>
  ) : (
    <LayoutMobile>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{data.title}</title>
        <meta name="description" content={StripHtmlTag(data?.meta_description ? data?.meta_description : data?.content)} />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:site_name" content="Bhome" />
        <meta property="og:url" itemProp="url" content={data.first_image ? data.first_image : "https://hoasenhome.vn/images/gioi-thieu.jpg"} />
        <meta property="og:image" itemProp="thumbnailUrl" content={data.first_image ? data.first_image : "https://hoasenhome.vn/images/gioi-thieu.jpg"} />
        <meta property="og:title" content={data.title} itemProp="headline" />
        <meta property="og:description" content={StripHtmlTag(data?.meta_description ? data?.meta_description : data?.content)} itemProp="description" />
      </Head>
      <HeaderMobile />
      <div id="copied" className={`copied ${isCopied ? "active" : ""}`}>
        *Đã sao chép đường dẫn bài viết{" "}
        <span className="close" onClick={() => setCopied(false)}>
          <i className="icon-close"></i>
        </span>
      </div>
      <SectionBreadcrumbMobile
        data={[
          { name: "Tin tức", link: "/blog", isActive: false },
          { name: data.categories[0].title, link: `/blog/category/${data.categories[0].identifier}`, isActive: false },
          { name: data.title, link: `/blog/post/${data.identifier}`, isActive: true },
        ]}
      />
      <main className=" sec-bd-bottom page-blog-detail">
        <div className="container">
          <div className="maincontent entry-content">
            <h1 className=" ">{data.title}</h1>
            <p className="date cl4  fs-12">{data.publish_time.slice(0, 10)}</p>
            <div className="tools">
              <FacebookShareButton url={url}>
                <a className="item" href="#">
                  <span>Chia sẻ</span> <i className="icon-fb mobile"></i>{" "}
                </a>
              </FacebookShareButton>
              &nbsp;&nbsp;
              <span className="item " onClick={() => copyUrl()} href="#">
                <span>Sao chép</span> <i className="icon-t15 mobile"></i>
              </span>
            </div>
            {ReactHtmlParser(data.content)}
            {data?.gallery && (
              <section className=" sec-tb ">
                <div className="container">
                  <NormalCarosel arrow={true} dot={false} loop={true} autoplay={true} res={[3, 3, 2, 1]}>
                    {data?.gallery?.map((item, index) => (
                      <div className="tRes_60" key={index}>
                        <img src={item} alt="ton-hoa-sen" />{" "}
                      </div>
                    ))}
                  </NormalCarosel>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <section className=" sec-post-feature  group-ef lazy-hidden">
        <br />
        <h2 className="box-title   efch-1 ef-tx-t" style={{ paddingLeft: "10px" }}>
          Tin tức nổi bật
        </h2>
        <div className=" pd-15 list-item list-b-7">
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
        <div className="pd-15 text-center">
          <Link href="/blog">
            <a href="/blog" className="viewall cl1">
              Xem tất cả <i className="icon-arrow-2"></i>
            </a>
          </Link>
        </div>
      </section>
      {anotherPost && (
        <section className=" sec-post-feature  group-ef lazy-hidden">
          <br />
          <h2 className="box-title   efch-1 ef-tx-t" style={{ paddingLeft: "10px" }}>
            {data?.categories[data?.categories.length - 1]?.title}
          </h2>
          <div className=" pd-15 list-item list-b-7">
            {anotherPost &&
              anotherPost.map((item, index) => (
                <div className="item-group " key={index}>
                  <div className="item-group-addon">
                    <Link href={`/blog/post/${item.identifier}`}>
                      <a href={`/blog/post/${item.identifier}`} className="img tRes_68">
                        <img src={item.first_image} alt={item.identifier} />
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
          <div className="pd-15 text-center">
            <Link href={`/blog/category/${data.categories[data.categories.length - 1].identifier}`}>
              <a href={`/blog/category/${data.categories[data.categories.length - 1].identifier}`} className="viewall cl1">
                Xem tất cả <i className="icon-arrow-2"></i>
              </a>
            </Link>
          </div>
        </section>
      )}
      <br></br>
      <ViewedProductMobile />
    </LayoutMobile>
  );
}
// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  let query = context.query;
  let data = null;
  let sidebar = null;
  let post = "";
  if (query.post != undefined) {
    post = query.post;
  }
  try {
    const result = await Promise.all([api.get(`service/rewrite/entity/blog*post*${encodeURI(post)}`), api.get("service/blog/sidebar")]);
    data = result[0].data.blog_data[0];
    sidebar = result[1].data[0];
  } catch (error) {
    console.log(error);
  }
  if (!data) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  const isMobile = IsMobile(context);
  return { props: { data, sidebar, post, isMobile } };
}

export default Blog;
