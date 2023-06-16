import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
//api here is an axios instance which has the baseURL set according to the env.
import api from '../services/api';


const CurrentCategoryContext = createContext({});

export const CurrentCategoryProvider = ({ children }) => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);


  useEffect(async () => {
    if (category) {
      try {
        let initParams = `searchCriteria[filterGroups][0][filters][0][field]=cat&searchCriteria[filterGroups][0][filters][0][value]=${category}`;
        initParams += `&searchCriteria[filterGroups][0][filters][1}][field]=p&searchCriteria[filterGroups][0][filters][1}][value]=1`;
        const locationData1 = Cookies.get("location-data");
        if (locationData1) {
          const currentLocation = JSON.parse(locationData1);
          initParams += `&city=${currentLocation.city.value}`;
        } else {
          console.log("locationData1 null")
        }
        const result = await api.get(`service/products?${initParams}`);
        if (result.status == 200) {
          setProducts(result?.data?.search_result?.items);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }, [category])

    return (
    <CurrentCategoryContext.Provider value={{
      category,
      setCategory,
      products,
      setProducts
    }}>
      {children}
    </CurrentCategoryContext.Provider>
  )
}



export const useCurrentCategory = () => useContext(CurrentCategoryContext)
