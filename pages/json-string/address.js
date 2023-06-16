import api from '../../services/api';
import React, { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';

const listProduct = [0, 1, 2, 3, 4, 5];

function Address({ address }) {
  console.log('🚀 ~ file: address.js ~ line 8 ~ Address ~ address', address);
  return <>{JSON.stringify(address)}</>;
}

// This gets called on every request
export async function getStaticProps(context) {
  let address = [];
  try {
    const result = await Promise.all([axios.get('https://admin.hoasenhome.vn/rest/V1/service/stores/directory/name')]);
    address = result[0].data[0];
  } catch (error) {
    console.log(error);
  }
  var fs = require('fs');
  try {
    const path = 'public/json';
    await fs.promises.mkdir(path, { recursive: true });
    await fs.promises.writeFile('public/json/address.json', JSON.stringify(address, null, 2));
  } catch (error) {
    throw {
      error,
      message: `error: ${error.message}`,
    };
  }
  return { props: { address } };
}

export default Address;
