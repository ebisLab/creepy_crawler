const axios=require("axios")
const cheerio=require("cheerio")
const endpnt= ""
// const linkUrl= `http://localhost:8000/`
const linkUrl= `http://godchecker.com`


const seenUrl={

}
//helper fn that pass link and get the full url back
const  getUrl= (link)=>{
    //return full url 
    //if link that comes in doesnt have an http in it 

    if(link.includes('http') !== -1){
        return link //there's probably more edge cases i need to cover
    } 
    else if(link.startsWith("/")){
        return linkUrl+link
    }
    else {
        return linkUrl+link
    }
}

const crawl = async ({url})=>{
    
try{    if(seenUrl[url]) return;
    console.log("crawling-->", url)
    seenUrl[url] = true;
    const res = await axios(linkUrl+endpnt)
    const html = await res.data
    // console.log("html", html);
    //created cheerio lib to create an obj. to parse the html that we got back
    const $ = cheerio.load(html)

    //query for all the links similar to jquery

    //pass tag -> a
    //.map similar to js function
    //do a .get on this collection  to convert to normal js array
    const tags = $('a').map((index,tag)=>tag.attribs.href).get()
    // console.log("tags-->", tags)
    tags.forEach(tag=>{
        crawl({url:getUrl(tag)})
    })

    //recursively keep on crawling to get all the links that are in the web page
    //depth first search 
    //when you go to the page, click on the link, download that page, and the links on that page

    crawl({url:linkUrl+endpnt})

    // const err = await Promise.reject(new Error("whoops!"))

}
catch(err){
    console.log('That did not go so well', err)
    throw err
}

}

crawl({
    url: linkUrl
})


