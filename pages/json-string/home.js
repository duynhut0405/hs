
import api from '../../services/api'
import React, { ReactNode, useEffect, useState } from 'react'

const listProduct = [0,1,2,3,4,5];

function Home({ menu, homeTop, config }) {
  return (
    <>
      {JSON.stringify(menu)}
    </>
  )
}

// This gets called on every request
export async function getStaticProps(context) {
  let menu = {};
  let homeTop = {};
  let homeContent = {};
  let config = {};
  try {
    const result = await Promise.all([
      api.get('/service/stores/menus'),
      api.get('/service/stores/home-top'),
      api.get(`/service/stores/home-content`)
    ])
    menu = result[0].data[0]?.menuItems;
    homeTop = result[1].data[0];
    homeContent = result[2].data[0]?.content;
  } catch (error) {
    console.log(error);
  }
  let data = {
    menu : menu,
    homeTop: homeTop,
    homeContent: homeContent
  }
  var fs = require('fs');
  try {
    
    const path = "public/json"
    await fs.promises.mkdir(path, { recursive: true })
    await fs.promises.writeFile("public/json/home.json", JSON.stringify(data, null, 2))
  } catch (error) {
    throw {
      error,
      message: `QRCodeError: ${error.message}`,
    }
  }
  return { props: { menu, homeTop, config } }
}

export default Home;