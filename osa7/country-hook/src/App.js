/* eslint-disable react/prop-types */
import React, { useState, } from 'react'
import  { useCountry } from './hooks'
// import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
} 

// const useCountry = (name) => {
//   const [country, setCountry] = useState(null)

//   // useEffect(() => {})
//   useEffect(
//     () => {
//       const subscription = props.source.subscribe();
//       return () => {
//         subscription.unsubscribe();
//       };
//     },
//     [props.source],
//   );

//   return country
// }

// eslint-disable-next-line react/prop-types
const Country = ({ country }) => {   

  if (!country) {
    return null
  }  

  console.log("country 2a: ", country) 
  console.log("country 2b: ",country.country[0])
  //console.log("country 2c: ", country.country[0].name) 

  if (country.country[0] === undefined) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.country[0].name} </h3>
      <div>capital {country.country[0].capital} </div>
      <div>population {country.country[0].population}</div> 
      <img src={country.country[0].flag} height='100' alt={`flag of ${country.country[0].name}`}/>  
    </div>
  )
 
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')  
  const country = useCountry(name) 
   
  // console.log('country 1a: ', country)
  // console.log("country 1b: ", country[0])
  // if (country.country[0] != null)
  // {
  //     console.log("country 1c: ", country.country[0].name) 
  // } 

  const fetch = (e) => {
    e.preventDefault() 

    setName(nameInput.value)  
   
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
