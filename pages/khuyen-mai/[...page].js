import Layout from '../../components/Desktop/Layout'

import api from '../../services/api'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Html2 from '../../components/Block/Html_bk'
import BlockRenderLP from '../../components/Block/BlockRenderLP'
import Tab1 from '../../components/Block/Tab1'
import Tab2 from '../../components/Block/Tab2'
import Tab3 from '../../components/Block/Tab3'


function LandingPage({ data }) {
  console.log(data); 
  return (
    <Layout>
      {data.map((value, index) => {
          return (
            <BlockRenderLP data={value.top_description} key={index}/>
          )
      })}
    </Layout>
  )
}


// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const { page } = context.query;

  let query = page[0];
  let data = [];

  try {

    const result = await api.get(`/service/rewrite/entity/${query}`);
    data = result.data.amasty_xlanding_page;

  } catch (error) {
    throw error;
  }



  return { props: {data} }
}


export default LandingPage;