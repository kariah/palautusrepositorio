import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import './App.css';


const App = () => {
    const [countries, setCountries] = useState([])
    const [showAll, setShowAll] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("")
    const [weatherInformation, setWeatherInformation] = useState([])


    const api_key = process.env.REACT_APP_API_KEY 

    //console.log("App ", selectedCountry)

    useEffect(
        () => { 
            getCountries()
        }, [])

    function getCountries() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                /* console.log('promise fulfilled')*/
                //console.log('response data ', response.data) 
                setCountries(response.data)
                /* setShowAll(response.data)*/
            })
    }

    function getWeatherInformation(country) {
        console.log("getWeatherInformation ", country)

        const setWeatherApiUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${selectedCountry}`;
        console.log(setWeatherApiUrl)

        axios
            .get(setWeatherApiUrl)
            .then(response => {
                /* console.log('promise fulfilled')*/ 
                setWeatherInformation(response.data) 
            })
    } 
     
    if (selectedCountry.length > 0) {
        const country = countries.filter(country => country.name === selectedCountry)

        console.log("selected 2 ", country);
        getWeatherInformation(country)  
        setShowAll(country);
        setSelectedCountry('')
    }
     

    return (
        <div>
            <h1>Countries</h1>
            <Filter countries={countries} setShowAll={setShowAll} />
            <Countries countries={showAll} setShowAll={setShowAll} setSelectedCountry={setSelectedCountry} weatherInformation={weatherInformation} />
        </div>
    )
}

export default App
