import api from '../../services/api';
import React, { ReactNode, useEffect, useState } from 'react';

const listProduct = [0, 1, 2, 3, 4, 5];

function Home({ menu, homeTop, config }) {
  return <>{JSON.stringify(menu)}</>;
}

// This gets called on every request
export async function getStaticProps(context) {
  let menu = [];
  let homeTop = [];
  // let homeContent = [];
  let config = [];
  let address = [];
  try {
    const result = await Promise.all([api.get('/service/stores/menus')]);
    menu = result[0].data[0];
  } catch (error) {
    console.log(error);
  }
  var fs = require('fs');
  try {
    const path = 'public/json';
    await fs.promises.mkdir(path, { recursive: true });
    await fs.promises.writeFile('public/json/menu.json', JSON.stringify(menu, null, 2));
  } catch (error) {
    throw {
      error,
      message: `QRCodeError: ${error.message}`,
    };
  }
  return { props: { menu, homeTop, config } };
}

export default Home;
