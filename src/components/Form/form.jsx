import React from 'react';
import classes from './form.module.css';
const Form = () => {
    return (
        <div className={classes.form__container}>
            <div className={classes.form__header}>
                <p>Weather App</p>   
            </div>
            <div className={classes.form__bar}></div>
            <div className={classes.form__body}>
                <form action="">
                    <input type="text" placeholder='Enter city name' className={classes.form__input}/>
                </form>
            </div>
            <div className={classes.form__separator}>
                or
            </div>
            <div className={classes.form__button}>
                <button>Get Device Location</button>
            </div>
        </div>
    )
}

export default Form;