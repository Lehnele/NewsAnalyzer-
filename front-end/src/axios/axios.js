import axios from 'axios';
export default axios.create({
  baseURL: 'http://localhost:8000/',
  // accept: 'application/json',
  // browserBaseURL: 'http://localhost:8000/'
  // ContentType: 'application/json'
})