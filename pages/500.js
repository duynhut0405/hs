import Link from 'next/link'
import Layout from '../components/Desktop/Layout'

export default function FiveOhFive() {
  return (
    <Layout>
      <main className="sec-tb page-login">
        <div className="container">
        <img src="/images/404.jpg"/>
        <div className="pd-20 text-center">
          <div className="row">
            <div className="col-sm-12">
              <Link href="/">
                <a href="/" className="btn btn-4">
                  Quay lại trang chủ
                </a>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}