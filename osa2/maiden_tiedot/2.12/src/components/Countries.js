import React from 'react'


function Language({ language }) {
    console.log("lang ", language)

    return <li>{language.name}</li>;
}


function Languages({ languages }) { 
    return (  
        <ul>
            {languages.map((language) =>
                <Language key={languages.name}
                    language={language} />
            )}
        </ul>
    )
}

const CountryListItem = ({ country }) => {
    return (
        <p>{country.name}</p>
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



const Countries = (props) => {
    const countries = props.countries

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
