import React from 'react'
import classes from './WeatherData.module.css';
import { IoArrowBackSharp } from 'react-icons/io5';
import { IoLocationOutline } from 'react-icons/io5';
import { BsThermometerSun } from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';
const WeatherData = ({data,toggle}) => {
  return (
    <div className={classes.data__Container}>
      {/* Main Header */}
      <div className={classes.data__header}>
        <p><IoArrowBackSharp className={classes.back__icon} onClick={()=>toggle()}/>{' '}Weather App</p>
      </div>
      {/* divider */}
      <div className={classes.data__bar}></div>
      {/* data display container */}
      <div className={classes.display__container}>
        {/* Logo coontainer */}
        <div className={classes.display__logo}>
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="logo" />
        </div>
        {/* Temperature container */}
        <div className={classes.display__temperature}>
            <p>{data.main.temp}&#8451;</p>
        </div>
        {/* Weather container */}
        <div className={classes.display__weather}>
          <p>{data.weather[0].description}</p>
        </div>
        {/* Location container */}
        <div className={classes.display__location}>
          <p><IoLocationOutline /> {data.name},{data.sys.country}</p>
        </div>
      </div>
      {/* divider */}
      <div className={classes.data__bar}></div>
      {/* Footer container */}
      <div className={classes.data__footer}>
        {/* Feels like container */}
        <div className={classes.display__feelslike}>
          <div><BsThermometerSun style={{ color:'#49b3dd',width:'20px',height:'20px'}}/></div>
          <div className={classes.footer__data}>
            <p style={{fontSize:'15px'}}>{data.main.feels_like}&#8451;</p>
            <p>Feels Like</p>
          </div>
        </div>
        {/* Humidity container */}
        <div className={classes.display__humidity}>
          <div><WiHumidity style={{ color: '#49b3dd' ,width:'20px',height:'20px'}} /></div>
          <div className={classes.footer__data}>
            <p style={{ fontSize: '15px' }}>{data.main.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherData;