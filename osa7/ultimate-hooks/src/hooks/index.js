import axios from 'axios'
import {
    useState,
    useEffect
} from 'react' 

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    useEffect(
        () => {
            // getResources()
            axios
            .get(baseUrl)
            .then(response => { 
                // console.log('Resources Response Data: ', response.data)
                setResources(response.data) 
            })
        }, [baseUrl])

    // function getResources() {
    //     axios
    //         .get(baseUrl)
    //         .then(response => { 
    //             // console.log('Resources Response Data: ', response.data)
    //             setResources(response.data) 
    //         })
    // } 
  
    const create = async (resource) => { 
        const response = axios.post(baseUrl, resource) 
        const responseAsync = await response
        setResources([...resources, responseAsync.data]) 
    } 
 
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }
  