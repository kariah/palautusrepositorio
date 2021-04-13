import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter' 
import Countries from './components/Countries'
import './App.css'; 
 


const App = () => { 
    const [countries, setCountries] = useState([])
    const [showAll, setShowAll] = useState([]) 

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                console.log('response data ', response.data)

                setCountries(response.data)
               /* setShowAll(response.data)*/
            })
    }, [])
    console.log('render', countries.length, 'countries') 

    return ( 
        <div>
            <h1>Countries</h1>
            <Filter countries={countries} setShowAll={setShowAll} />  
            <Countries countries={showAll} />
        </div>
    )
}

export default App
