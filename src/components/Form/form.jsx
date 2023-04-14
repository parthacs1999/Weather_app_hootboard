import React, { useState, useEffect } from 'react';
import classes from './form.module.css';
import WeatherData from '../WeatherDisplay/WeatherData';
const Form = () => {
    const [cityName, setCityName] = useState('');
    const [goToDataPage, setGoToDataPage] = useState(false);
    const [getData, setGetData] = useState(null);
    const[lat,setLat]=useState();
    const[lon,setLon]=useState();
    const displayDataHandler = () => {
        setGoToDataPage(!goToDataPage);
    }
    const getBackHandler=()=>{
        setGoToDataPage(!goToDataPage);
        setCityName('');
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position)=>{
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        })
    },[])
    console.log(lat,lon);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=bbf3b73712491269a21e35f1082714a1`);
            const data = await response.json();
            setGetData(data);
        };
        fetchApi();
    }, [cityName])
    
    const fetchApiForOwnLocation=async ()=>{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=bbf3b73712491269a21e35f1082714a1`);
        const data = await response.json();
        setGetData(data);
        setGoToDataPage(true);
    }
    return (
        <div className={classes.form__container}>
            {goToDataPage ? <WeatherData data={getData} toggle={getBackHandler}/> :
                <div>
                    <div className={classes.form__header}>
                        <p>Weather App</p>
                    </div>
                    <div className={classes.form__bar}></div>
                    <div className={classes.form__body}>
                        <form>
                            <input type="text" placeholder='Enter city name' className={classes.form__input} onChange={(e) => { setCityName(e.target.value) }} value={cityName} />
                        </form>
                    </div>
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
                    <div className={classes.form__separator}>
                        or
                    </div>
                    <div className={classes.form__button}>
                        <button onClick={fetchApiForOwnLocation}>Get Device Location</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Form;