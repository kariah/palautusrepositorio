import axios from 'axios'
import {
    useState,
    useEffect
} from 'react'


export const useCountry = (name) => {
    const [countries, setCountries] = useState([])

    useEffect(
        () => {
            getCountries()
        }, [])

    function getCountries() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                /* console.log('promise fulfilled')*/
                console.log('Countries Response Data: ', response.data)
                setCountries(response.data)
                /* setShowAll(response.data)*/
            })
    }

    const country = countries.filter(country => country.name === name)

    if (country.length > 0) {
        console.log('Found Country ', country[0].name) 
    }
 
    return { 
        country
    }
}