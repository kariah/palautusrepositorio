import React, { useState } from 'react'


const Countries = (props) => {

    const countries = props.countries
    const setShowAll = props.setShowAll  

    const [selectedCountry, setSelectedCountry] = useState("")

    //select country clicked from link
    if (selectedCountry.length > 0) {
        const country = countries.filter(country => country.name === selectedCountry)  
        setShowAll(country); 
        setSelectedCountry('')
    } 

    //console.log("Countries ", selectedCountry)

    const Language = ({ language }) => { 
        return <li>{language.name}</li>;
    } 

    const Languages = ({ languages }) => {
        return (
            <ul>
                {languages.map((language) =>
                    <Language key={languages.name}
                        language={language} />
                )}
            </ul>
        )
    }

    const showCountry = country => () => {
        /*console.log(country)*/  
        setSelectedCountry(country) 
    }


    const CountryListItem = ({ country }) => {
        return (
            <div>
                {country.name}
                <button onClick={showCountry(country.name)}>Show
            </button>
            </div>
        )
    }


    const Country = ({ country }) => {
        return (
            <div>
                <h2>{country.name}</h2>
                <div>
                    <p>Capital {country.capital}</p>
                    <p>Population {country.population}</p>
                </div>
                <h3>Languages</h3>
                <div>
                    <Languages languages={country.languages} />
                </div>
                <div class="flag">
                    <img src={country.flag} alt="Flag" />
                </div>
            </div>
        )
    }


    if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} />
            </div>
        )
    }
    else {
        return (
            <div>
                {countries.map(country =>
                    <CountryListItem key={country.name} country={country} />
                )}
            </div>
        )
    }
}

export default Countries
