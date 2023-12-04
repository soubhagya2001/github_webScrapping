const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require('./issues');
function getReposPageHtml(url,topic){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else{
            getReposLink(html);
        }
        
        function getReposLink(html){
            //console.log(html);
            let $ = cheerio.load(html);
            let headingsArr = $(".Link.text-bold.wb-break-word");
            //console.log(topic);
            for(let i=0 ; i<8;i++ ){
                // let twoAnchors = $(headingsArr[i]).find("a");
                // let link = $(twoAnchors[0]).attr("href");
                let link = $(headingsArr[i]).attr("href");
                //console.log(link);
                let fullLink = `https://github.com${link}/issues`;
                let repoName = link.split("/").pop();
                getIssuesPageHtml(fullLink,topic,repoName);
            }
            //console.log('--------------------------');
        }
    }
}
module.exports = getReposPageHtml;