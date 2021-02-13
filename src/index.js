const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const fs = require('fs');
const path =require('path')
// const siteUrl ="http://localhost:4000/"
// const siteUrl="https://blisswalls.netlify.app"
// const siteUrl="https://ijeamaka-anyene.netlify.app/"





const seenUrl={}
const getUrl=(link)=>{
    if (link.includes('http')){
        return link
    }else if(link.startsWith("/")){
        return `http://localhost:5000${link}`
    }
    else{
        return `http://localhost:5000/${link}`
    }
}

const crawl = async ({url})=>{

    try{
        if(seenUrl[url])return;
        // console.log('crawling', url)
        seenUrl[url]=true;
        // console.log('Crawling', url)
        const {data} = await axios.get(url)
        // console.log('data', data)
        const $ =cheerio.load(data)
        const links = $('a').map((i,tag)=>tag.attribs.href).get()
        const imageUrl = $('img').map((index,tag)=>tag.attribs.src).get()

        // console.log(imageUrl)

        links.forEach(link=>{crawl({url:getUrl(link)})})
        // imageUrl.forEach(link=>{crawl({url:getUrl(link)})})
        imageUrl.forEach(imglink=> {
            console.log("imglink", getUrl(imglink))

            axios({
                method: 'get',
                url: getUrl(imglink),
                responseType: 'stream'
              })
                .then((res)=> {
                    // console.log("res")
                const filename=path.basename(imageUrl.toString())
                // console.log(`images/${filename}`)
                  res.data.pipe(fs.createWriteStream(`images/${filename}`))
                });

            // axios.get(getUrl(imglink)).then(res=>{
            //     const dest=fs.createWriteStream('images/fortune.jpg');
            //     console.log("dest", res.data.pipe)
            //     res.data.pipe(dest)
            // })
        })


        // imageUrl.forEach(imageurl=>{
        //     axios.post(getUrl(imageurl)).then(res=>{
        //         const dest = fs.createWriteStream("images/myimage.jpg")
        //     //    console.log("res-->",res)
        //     //    res.data.pipe(dest)
        //     })
        // })

        // console.log("$$$$", images)

        // const links = $('a').map((index,tag)=>tag.attribs.href).get()
        // links.forEach(link=>{crawl({url:getUrl(link)})})
        // console.log("$$$$", links)



    

    }
    catch(err){
        console.log(err)
    }
}


crawl({url:"http://localhost:5000"})