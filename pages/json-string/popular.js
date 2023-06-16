
import api from '../../services/api'
import React, { ReactNode, useEffect, useState } from 'react'

const listProduct = [0,1,2,3,4,5];

function Popular({ popular }) {
  return (
    <>
      {JSON.stringify(popular)}
    </>
  )
}

// This gets called on every request
export async function getStaticProps(context) {
  let popular = [];
  try {
    const result = await Promise.all([
      api.get("/service/search/popular/1")
    ])
    popular =result[0].data[0];
  } catch (error) {
    console.log(error);
  }
  var fs = require('fs');
  try {
    
    const path = "public/json"
    await fs.promises.mkdir(path, { recursive: true })
    await fs.promises.writeFile("public/json/popular.json", JSON.stringify(popular, null, 2))
  } catch (error) {
    throw {
      error,
      message: `QRCodeError: ${error.message}`,
    }
  }
  return { props: { popular } }
}

export default Popular;