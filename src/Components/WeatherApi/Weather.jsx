import React, { useEffect, useState } from "react";
import "./weather.css"
import axios from "axios";
// import { logDOM } from "@testing-library/react";
import img from "../Image/3842198.png"
// import img2 from "../Image/cloud-rain-weather-isolated-icon-vector-24625960.jpg"


const Weather = () => {
     const [storedata, getdata] = useState([])
     const [cityname, getcityname] = useState()
     const [currentData, setCurrentData] = useState()
     const [locationdata, getlocationdata] = useState()
     console.log(storedata);
     console.log(currentData);
     console.log(locationdata);
     useEffect(() => {
          const fetchData = async () => {
               try {
                    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=7ad027bb33e2810afeaf7a6c40ba355e`
                    const apidata = await axios.get(urlApi)
                    getdata(apidata.data)
                    // console.log(apidata);
                    // axios.get(urlApi).then((res) => {
                    //      console.log(res);
                    // })
               } catch (error) {
                    console.log(error);
               }
          }
          fetchData();
     }, [])
     console.log(storedata);

     useEffect(() => {

          navigator.geolocation.getCurrentPosition((postion) => {

               let url = `https://api.openweathermap.org/data/2.5/weather?lat=${postion.coords.latitude}&lon=${postion.coords.longitude}&appid=7ad027bb33e2810afeaf7a6c40ba355e`
               axios.get(url).then((resolve) => {
                    // debugger
                    const temp = Math.floor(resolve?.data?.main?.temp - 273.15)
                    const wind = Math.floor(resolve?.data?.wind?.speed)
                    const humidity = (resolve?.data?.main?.humidity)
                    const visibility = (resolve?.data?.visibility)
                    const name = (resolve?.data?.name)
                    const sunrises = resolve?.data?.sys?.sunrise;
                    const sunsets = resolve?.data?.sys?.sunset;
                    const sunrise = new Date(sunrises * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                    const sunset = new Date(sunsets * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    setCurrentData({ temp, wind, humidity, visibility, name, sunrise, sunset })
               }).catch((error) => {
                    console.log(error);
               })
          })
     }, [])


     const handelinput = (e) => {
          getcityname(e.target.value)

     }
     const submit = async () => {
          try {
               let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=7ad027bb33e2810afeaf7a6c40ba355e`
               const resolve = await axios.get(urlApi)
               getdata(resolve.data)
               // console.log(apidata);
               // axios.get(urlApi).then((res) => {
               //      console.log(res);
               // })
               const temp = Math.floor(resolve?.data?.main?.temp - 273.15)
               const wind = Math.floor(resolve?.data?.wind?.speed)
               const humidity = (resolve?.data?.main?.humidity)
               const visibility = (resolve?.data?.visibility)
               const name = (resolve?.data?.name)
               const sunrises = resolve?.data?.sys?.sunrise;
               const sunsets = resolve?.data?.sys?.sunset;
               const sunrise = new Date(sunrises * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
               const sunset = new Date(sunsets * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
               setCurrentData({ temp, wind, humidity, visibility, name, sunrise, sunset })
          } catch (error) {
               console.log(error);
          }
          getcityname("")
     }

     useEffect(() => {
          async function lanAndLat() {
               if (storedata && storedata?.coord) {
                    const lat = storedata.coord.lat;
                    const lon = storedata.coord.lon;
                    const apiKey = "3050828d775a7c1de9a5bc06bf111c01";
                    const res = await fetch(
                         `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&exclude=minutely&units=metric`
                    );
                    const data = await res.json();
                    getlocationdata(data);
               }
          }
          lanAndLat();
     }, [storedata]);


     // for getting real sunrise and senset time
     // let formattedSunriseTime;
     // let formattedSunsetTime;

     // const sunriseTiming = (data) => {
     //      // debugger
     //      const sunrise = data?.sys?.sunrise;
     //      const timezone = "IST";
     //      const date = new Date(sunrise * 1000);
     //      return date.toLocaleTimeString("IST", { timeZone: timezone, timeStyle: "short" });
     // };
     // const sunsetTiming = (data) => {
     //      // debugger
     //      const sunrise = data?.sys?.sunset;
     //      const timezone = "IST";
     //      const date = new Date(sunrise * 1000);
     //      return date.toLocaleTimeString("IST", { timeZone: timezone, timeStyle: "short" });
     // };
     return (
          <>

               <div className="weather-parent">
                    <div className="container">
                         <div className="weather">
                              <div className="part1">
                                   <div className="input" >
                                        <input type="text" value={cityname} onChange={(e) => handelinput(e)} />
                                        <button onClick={submit}>click</button>
                                   </div>
                                   <div className="name">{(currentData?.name)}</div>
                                   {/* <div className="settime">{storedata?.timezone}</div> */}
                                   <div className="temp">
                                        <span>{(currentData?.temp)}<span>°c</span></span>
                                   </div>
                              </div>
                              <div className="weather-details">
                                   <div className="detail1">
                                        <p>Apparent temperature</p>
                                        <span>{(currentData?.temp) + "°c"}</span>
                                        <p>Humidity</p>
                                        <span>{(currentData?.humidity)}%</span>
                                   </div>
                                   <div className="detail2">
                                        <p>Wind</p>
                                        <span>{(currentData?.wind)}<span>Km</span></span>
                                        <p>Visibility</p>
                                        <span>{(currentData?.visibility / 1000)}<span>Km</span></span>
                                   </div>
                              </div>
                              <div className="suntime">
                                   <p><span>sunrise</span>{currentData?.sunrise}</p>
                                   <p><span>sunset</span>{currentData?.sunset}</p>
                              </div>
                              <div className="currentData">

                              </div>
                         </div>

                         <div className="locationdata">
                              {
                                   locationdata?.daily?.map((item) => {
                                        // const  date=item.dt
                                        const formatDate = new Date(item.dt * 1000)
                                        // console.log(formatDate);
                                        const date = formatDate.toLocaleDateString("en-us", { day: "2-digit" })
                                        const month = formatDate.toLocaleDateString("en-us", { month: "2-digit" })
                                        const wek = formatDate.toLocaleDateString("en-us", { weekday: "short" })


                                        return (
                                             <>
                                                  <div className="day">{wek}-{date}<div className="image"><img src={img} alt="" /></div><div className="temp">{Math.floor(item?.temp?.day) + "°c"}</div></div>

                                             </>
                                        )
                                   })
                              }

                         </div>

                    </div>
               </div>
          </>
     )
}
export default Weather