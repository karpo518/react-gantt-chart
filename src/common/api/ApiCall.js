import qs from 'query-string'
import { FakeResponse } from './FakeResponse'
import { endpoints, methods } from './ParamsCreator'

const DOMAIN = process.env.AEON_REST_API

class ApiCall {

  constructor(domain) {
    this.domain = domain
  }

  stringifyQueryParams (queryParams) {
    
    if(queryParams && Object.keys(queryParams).length) {
      
      for (const [key, value] of Object.entries(queryParams)) {
        if(typeof value === 'object') {
          queryParams[key] = JSON.stringify(value)
        }
      }
      
      return `?${qs.stringify(queryParams)}`
    }

    return ''
  }

  async request (params) {
    
    const {url, queryParams, ...fetchOptions} = params

/*     if(url === endpoints.CHART && fetchParams.method === methods.GET) {
      return this.fakeRequest(FakeResponse.getChart, 500)
    } */
    
    const queryString = this.stringifyQueryParams(queryParams)

    const currentOptions = {...fetchOptions}
  
    if(currentOptions.body) {
      currentOptions.body = JSON.stringify(currentOptions.body)
    }
    
    const response = await fetch(`${this.domain}${url}${queryString}`, currentOptions)



    try {  
      if(response.ok) {
        const jsonData = await response.json()
        return Promise.resolve(jsonData)
      }
      else {
        throw new Error(response.statusText)
      }
    }
    catch (error) {
      throw new Error((error).message)
    }
  }

  async fakeRequest (response, delay) {
    return new Promise((resolve) => setTimeout(() => resolve(response), delay))
  }
}

export const api = new ApiCall(DOMAIN)

export const useApiCall = (requestParams) => {
  
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchData = async (requestParams) => {
    if(response === null) {
      setError(false)
      setLoading(true)
      try {
        const newResponse = await api.request(requestParams)
        setResponse(newResponse)
      }
      catch {
        setError(true)
      }

      setLoading(false)
    }
  } 

  useEffect(() => {
    fetchData(requestParams)
  },[requestParams])

  return {response, loading, error}
}