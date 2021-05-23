import React from 'react'


const Countries = (props) => {

    const countries = props.countries
    const setSelectedCountry = props.setSelectedCountry
    const weatherInformation = props.weatherInformation

   /* console.log("weather ", weatherInformation)*/


    const Language = ({ language }) => {
        return <li>{language.name}</li>;
    }

    const Languages = ({ languages }) => {
        return (
            <ul>
                {languages.map((language) =>
                    <Language key={language.name}
                        language={language} />
                )}
            </ul>
        )
    }

    const showCountry = country => () => {
      /*  console.log("selected ", country)*/
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

    const Weather = ({ weatherInformation }) => {

      /*  console.log("weather ", weatherInformation)*/

        if (weatherInformation === undefined || weatherInformation.length === 0) {
            return (<></>)
        }
        else {
            let location = weatherInformation.location
            let current = weatherInformation.current
            let unit = weatherInformation.request.unit
            if (unit === "m") {
                unit = "celsius"
            }
            else {
                unit = "fahrenheit"
            }

            console.log("current ", weatherInformation.current)

            return (
                <div>
                    <h3>Weather in {location.country}</h3>
                    <div>
                        <b>Temperature</b> {current.temperature} {unit}
                    </div>
                    <div className="weather_icons">
                        <img src={current.weather_icons} alt="Weather icon" />
                    </div>
                    <div>
                        <b>Wind</b> {current.wind_speed} mph direction {current.wind_dir}
                    </div>
                </div>
            )
        }
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
                <div className="flag">
                    <img src={country.flag} alt="Flag" />
                </div>
                <Weather weatherInformation={weatherInformation} />
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
