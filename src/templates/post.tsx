import '../styles'

import React, { ReactNode } from 'react'
import { graphql } from 'gatsby'

// import hljs from 'highlightjs';
import HeadList from '../components/post/HeadList'
import TopBtn from '../components/TopBtn'
import SideNav from '../components/SideNav'
import Pagination from '../components/post/Pagination'
import Footer from '../layout/Footer'
import PostDefaultData from '../types/post'

function escape2Html(str: string): string {
  const arrEntities: any = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' }
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, (_, t): string => arrEntities[t])
}

export default class PostDetail extends React.Component<PostDefaultData> {
  componentDidMount(): void {
    for (let i = 1; i <= 5; i += 1) {
      const el: any = document.getElementsByTagName(`h${i}`)

      for (let j = 0; j < el.length; j += 1) {
        el[j].setAttribute('id', escape2Html(el[j].innerHTML))
        el[j].dataset.offset = String(el[j].offsetTop)
      }
    }

    const leftCover = document.getElementById('leftCover') as HTMLElement
    leftCover.style.width = `${leftCover.offsetWidth}px`
    leftCover.style.position = 'fixed'
    leftCover.style.top = '0'
    leftCover.style.left = String(leftCover.offsetLeft)
  }

  render(): ReactNode {
    const { data, location } = this.props;
    const { headings, html, frontmatter } = data.markdownRemark
    const { title, date, category } = frontmatter
    const { pageContext } = this.props
    const postPath = `http://kiit.wang${location.pathname}`

    return (
      <div className="post-detail">
        <div className="row">
          <div className="row__left">
            <div id="leftCover">
              <SideNav />
              <HeadList listData={headings} />
            </div>
          </div>

          <div className="row__right">
            <div className="post-detail__header">{title}</div>
            <div className="post-detail__meta">
              <div className="post-detail__meta-item">
                <i className="ion-android-calendar" />
                <span>{`发表于 ${date}`}</span>
              </div>
              <div className="post-detail__meta-item">
                <i className="ion-android-folder-open" />
                <span>{`发表于 ${category}`}</span>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />

            <div className="copyright">
              <li>
                <span className="title">本文作者: </span>
                <span>Kitwang Chen</span>
              </li>
              <li>
                <span className="title">本文链接: </span>
                <span>
                  <a href={postPath}>{postPath}</a>
                </span>
              </li>
              <li>
                <span className="title">版权声明: </span>
                <span>
                  本博客所有文章除特别声明外，均采用
                  <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/cn/">
                    CC BY-NC-SA 3.0 CN
                  </a>
                  许可协议。转载请注明出处！
                </span>
              </li>
            </div>

            <Pagination prev={pageContext.prev} next={pageContext.next} />
          </div>
        </div>
        <Footer className="post-footer" />
        <TopBtn delay={2000} />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      headings {
        depth
        value
      }
    }
  }
`