// console.log("sup")
// import axios from 'axios'
const axios = require('axios')

axios(`http://localhost:8000/about/`)
.then(res=>res)
.then(html=>console.log("html", html))

const crawl = ({url})=>{
}