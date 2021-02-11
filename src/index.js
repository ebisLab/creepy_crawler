const axios=require("axios")
const cheerio=require("cheerio")

const crawl = async ({url})=>{
    const res = await axios(`http://localhost:8000/about/`)
    const html = await res
    console.log("html", html);
}

crawl({
    url:`http://localhost:8000/about/`
})

