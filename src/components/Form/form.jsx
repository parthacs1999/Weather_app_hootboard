import React, { useState, useEffect } from 'react';
import classes from './form.module.css';
import WeatherData from '../WeatherDisplay/WeatherData';
const Form = () => {
    const [cityName, setCityName] = useState('');
    const [goToDataPage, setGoToDataPage] = useState(false);
    const [getData,setGetData] = useState('');
    const displayDataHandler = () => {
        setGoToDataPage(true);
    }
    useEffect(()=>{
        const fetchApi=async()=>{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid={bbf3b73712491269a21e35f1082714a1}`);
            const data = await response.json();
            console.log(data)
            setGetData(data);
        };
        fetchApi();
    },[cityName])
    return (
        <div className={classes.form__container}>
            {goToDataPage?<WeatherData/>:
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
                        <ul className={classes.form__data} onClick={displayDataHandler}>
                            <li>{cityName}</li>
                            <li>&gt;&gt;&gt;</li>
                        </ul>
                    </div>
                    <div className={classes.form__separator}>
                        or
                    </div>
                    <div className={classes.form__button}>
                        <button>Get Device Location</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Form;