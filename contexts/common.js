import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
//api here is an axios instance which has the baseURL set according to the env.
import api from '../services/api';
import { useRouter } from 'next/router'

const CommonContext = createContext({});
const address = require('../public/json/address.json');
const home = require('../public/json/home.json');

export const CommonProvider = ({ children }) => {
  const [activeSearchModal, setActiveSearchModal] = useState(false);
  const [activeLocationModal, setActiveLocationModal] = useState(false);
  const [productDetailUserModal, setProductDetailUserModal] = useState(false);
  const [activeFilterModal, setActiveFilterModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [keyword, setKeyWord] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [currentRegion, setRegion] = useState(null);
  const router = useRouter();
  const [dataContent, setDataContent] = useState(null);
  const [checkLocationAgain, setCheckLocationAgain] = useState(false);

  useEffect(async () => {
    let loca = Cookies.get("location-data");
    if (loca) {
      const locationData = JSON.parse(Cookies.get("location-data"));
      let data1 = null;
      if (locationData) {
        try {
          let cityID = locationData.city.value;
          if (cityID) {
            const result = await api.get(`/service/stores/home-content?city=${cityID}`);
            if (result?.data[0]) {
              data1 = result.data[0].content;
            }
          }
        } catch (error) {
          console.log(error);
        }
        if (data1) setDataContent(data1);
      }
    } else {
      let data1 = null;
      try {
        if (home.homeContent) {
          data1 = home.homeContent;
        }
      } catch (error) {
        console.log(error);
      }
      if (data1) setDataContent(data1);
    }
    async function loadLocation() {
      if (address && address != []) {
        setLocation(address);
      } else {
        try {
          const result = await api.get('service/stores/directory/name');
          if (result.status == 200) {
            setLocation(result.data[0]);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setLocationLoading(false);
    }
    loadLocation();
    if (Cookies.get("location-data")) {
      setLocationData(JSON.parse(Cookies.get("location-data")));
    }
  }, [])

  useEffect(async () => {
    if (location && location.cites && locationData) {
      const res = location.cites.find(element => (element.value == locationData.city.value));
      setRegion(res.region);
    }
  }, [locationData, location])

    return (
    <CommonContext.Provider value={{
      location,
      activeLocationModal,
      setActiveLocationModal,
      activeSearchModal,
      setActiveSearchModal,
      activeFilterModal,
      setActiveFilterModal,
      productDetailUserModal,
      setProductDetailUserModal,
      keyword,
      setKeyWord,
      locationData,
      setLocationData,
      currentRegion,
      dataContent,
      setDataContent,
      setCheckLocationAgain,
      checkLocationAgain
    }}>
      {children}
    </CommonContext.Provider>
  )
}



export const useCommon = () => useContext(CommonContext)