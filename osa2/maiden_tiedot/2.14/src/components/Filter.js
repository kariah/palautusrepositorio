import React, { useState } from 'react'

const Filter = (props) => {
    const countries = props.countries
    const setShowAll = props.setShowAll   
    const setSelectedCountry = props.setSelectedCountry
    const [filterMessage, setFilterMessage] = useState("") 


    const filterCountries = (event) => { 

        let filterValue = event.target.value 
        setFilterMessage("")
         
        if (event.target.value.length === 0) {
            setFilterMessage(""); return;
        }

        if (countries.length > 0) {
            const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filterValue.toLowerCase()))

            //console.log("filteredCountries count ", filteredCountries.length)

            if (filteredCountries.length === 0) {

                setFilterMessage("Countries not found")
                setShowAll([])
            }
            else if (filteredCountries.length > 0 && filteredCountries.length < 11) {

                setShowAll(filteredCountries)
            }
            else {
                setFilterMessage("Too many matches, specify another filter")
                setShowAll([])
            }

            if (filteredCountries != undefined && filteredCountries.length === 1) { 
                setSelectedCountry(filteredCountries[0].name)
            }
        }
        else {
            setFilterMessage("Countries not found")
        } 


    }

     
    return (
        <div>
            Find countries
            <input onChange={filterCountries}>
            </input>
            <div><p>
                {filterMessage}</p>
            </div>
        </div>
    )
}

export default Filter