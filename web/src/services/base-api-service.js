import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  withCredentials: true
})

http.interceptors.request.use(
  (request) => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position)=> {
            resolve([position.coords.latitude, position.coords.longitude])
          },
          (error) => {
            console.error(error)
            resolve([])
          }
        )
      } else {
        resolve([])
      }
    })
    .then((location) => {
      request.headers["x-location"] = location.join()
      return request
    })
  },
  (error) => Promise.reject(error)
)  

http.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, 
  (error) => {
    if (error?.response?.status === 401 && window.location.pathname !== "/signup" && window.location.pathname !== "/login") {
      localStorage.removeItem('user');
      window.location.replace('/login')
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default http;