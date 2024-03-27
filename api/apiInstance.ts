import axios from 'axios'
// ничего потому что работаем с внутренними роутами Next
// Next понимает к какому домену нужно обратится
const instance = axios.create({
  baseURL: '',
})

export default instance
