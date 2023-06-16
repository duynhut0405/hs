import React, {useState, useEffect} from 'react';
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser';
import lazyLoad from '../../../utils/lazyload';
import checkImageExist from '../../../utils/checkImageExist'

function BlogBox({ item }) {
  const [image, setImage] = useState("/images/no-image.svg");
  lazyLoad();
  useEffect(() => {
    if (item.first_image) {
      setImage(item.first_image);
    }
  }, [item.first_image])
  return (
    <>
      {item !== undefined && (
        <div className="item-group ">
          <div className="item-group-addon">
          <Link href={`/blog/post/${item.identifier}`}>
            <a href={`/blog/post/${item.identifier}`} className="img tRes_66">
              <img src={image}  alt={item.identifier} onError={async (e) => await checkImageExist(e)}/>
            </a>
          </Link>
          </div>
          <div className="item-group-content">
            <div className="divtext">
              <h5 className="title"> <Link href={`/blog/post/${item.identifier}`}><a href={`/blog/post/${item.identifier}`}>{item.title}</a></Link></h5>
              {ReactHtmlParser(item.short_content)}
              <div className="date">{(item.publish_time.slice(0, 10))}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default BlogBox;
