// console.log("sup")
// import axios from 'axios'
const axios = require('axios');
const cheerio =require("cheerio")

axios(`http://localhost:8000/about/`)
.then(res=>res)
.then(html=>{
    // console.log("html", html)
    const $=cheerio.load(html.data)
const links= $('img').map((i, link)=> link.attribs.alt).get(); //convert it to the array
console.log("links", links)
})
// const $=cheerio.load('<h2 class="title">Hello world</h2>')

// const links= $('a').map((i, link)=> link.attribs.href).get(); //convert it to the array
// const stuff=$(h2.title).text('Hello there');
// $.html()

// console.log("links", links)

console.log("stuff")

// const crawl = ({url})=>{
// }