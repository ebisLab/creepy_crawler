const axios=require("axios")
const cheerio=require("cheerio")

const crawl = async ({url})=>{
    const res = await axios(`http://localhost:8000/about/`)
    const html = await res.data
    console.log("html", html);
    //created cheerio lib to create an obj. to parse the html that we got back
    const $ = cheerio.load(html)

    //query for all the links similar to jquery

    //pass tag -> a
    //.map similar to js function
    //do a .get on this collection  to convert to normal js array
    const tags = $('a').map((index,tag)=>tag.attribs.href).get()
    console.log("tags-->", tags)

}

crawl({
    url:`http://localhost:8000/about/`
})


