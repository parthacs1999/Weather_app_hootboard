import React, { useState, useEffect } from 'react';
import classes from './form.module.css';
import WeatherData from '../WeatherDisplay/WeatherData';
const Form = () => {
    // state variables for generating city names,toggling,gettind data from weather api
    const [cityName, setCityName] = useState('');
    const [goToDataPage, setGoToDataPage] = useState(false);
    const [getData, setGetData] = useState(null);
    const[lat,setLat]=useState();
    const[lon,setLon]=useState();

    // function to toogle between pages
    const displayDataHandler = () => {
        setGoToDataPage(!goToDataPage);
    }

    // function to get back to previous page from data showing page
    const getBackHandler=()=>{
        setGoToDataPage(!goToDataPage);
        setCityName('');
    }

    // useEffect for getting latitude and longitude of the device
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position)=>{
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        })
    },[])

    // useEffect for getting data from weather api with city name
    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=bbf3b73712491269a21e35f1082714a1`);
            const data = await response.json();
            setGetData(data);
        };
        fetchApi();
    }, [cityName])
    
    // useEffect for getting data from weather api with latitude and longitude values
    const fetchApiForOwnLocation=async ()=>{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=bbf3b73712491269a21e35f1082714a1`);
        const data = await response.json();
        setGetData(data);
        setGoToDataPage(true);
    }
    return (
        <div className={classes.form__container}>
            {/* Toggling pages */}
            {goToDataPage ? <WeatherData data={getData} toggle={getBackHandler}/> :
                <div>
                    {/* Header */}
                    <div className={classes.form__header}>
                        <p>Weather App</p>
                    </div>
                    {/* divider */}
                    <div className={classes.form__bar}></div>
                    {/* Form container */}
                    <form className={classes.form__body}>
                        {/* <form> */}
                            <input type="text" placeholder='Enter city name' className={classes.form__input} onChange={(e) => { setCityName(e.target.value) }} value={cityName} />
                        {/* </form> */}
                    </form>
                    {/* Error handling logic */}
                    <div className={cityName !== '' ? '' : classes.hide}>
                        {getData === null ? (
                            <ul className={classes.form__data} >
                                <li>No Data Found</li>
                            </ul>
                        ) : (
                            <ul className={classes.form__data} >
                                {getData.cod === '404' ? (
                                    <li style={{ color: "red" }}>No Data Found!!!</li>
                                ) : (
                                    <div onClick={displayDataHandler}>
                                        <li>{cityName}</li>
                                        <li>&gt;&gt;&gt;</li>
                                    </div>
                                )
                                }
                            </ul>
                        )
                        }

                    </div>
                    {/* Divider */}
                    <div className={classes.form__separator}>
                        or
                    </div>
                    {/* Button component */}
                    <div className={classes.form__button}>
                        <button onClick={fetchApiForOwnLocation}>Get Device Location</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Form;