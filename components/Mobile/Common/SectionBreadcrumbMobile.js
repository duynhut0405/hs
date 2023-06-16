import React, { useEffect, useState } from 'react'
import ShowStar from '../../Desktop/Review/ShowStar'
import formatVND from '../../../utils/formatVND'
import Link from 'next/link'
import { useAuth } from '../../../contexts/auth'
import api from '../../../services/api'

function SectionBreadcrumbMobile({ data }) {
  return (
    <div className="entry-breadcrumb">
      <div className="container">
        <ol className="breadcrumbs" itemScope itemType="#">
          <li itemProp="itemListElement" itemScope
            itemType="#">
            <Link href="/">
              <a itemProp="item" ><span itemProp="name" className="icon-home"></span></a>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          {data.map((item, index) => {
            if (index == data.length - 1) {
              return (
                <li key={index} itemProp="itemListElement" itemScope
                  itemType="https://schema.org/ListItem">
                  <strong> {item.name} </strong>
                  <meta itemProp="position" content="3" />
                </li>
              )
            } else {
              return (
                <li key={index} itemProp="itemListElement" itemScope
                  itemType="#">
                  <Link href={item.link}>
                    <a itemScope itemType="#" itemProp="item" itemid="#">
                      <span itemProp="name"> {item.name} </span></a>
                  </Link>

                  <meta itemProp="position" content="2" />
                </li>
              )
            }
          }
          )}
        </ol>
      </div>
    </div>
  )
}

export default SectionBreadcrumbMobile