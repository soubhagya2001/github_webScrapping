let url = "https://github.com/topics";
const request = require("request");
const cheerio  = require("cheerio");
const getReposPageHtml = require('./repoPage');


request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        //console.log(html);
        getTopicLinks(html);
    }
}

function getTopicLinks(html){
    let $ = cheerio.load(html);
    // let linkElemArray = $(".no-underline.d-flex.flex-column.flex-justify-center");
    let linkElemArray = $(".no-underline.flex-1.d-flex.flex-column");
    for(let i=0;i<linkElemArray.length;i++){
        let href = $(linkElemArray[i]).attr("href");
        let topic = href.split("/").pop();
        let fullLink = `https://github.com/${href}`;
        //console.log(fullLink);
        getReposPageHtml(fullLink , topic);
    }
}