const Crawler = require('crawler');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
function initCrawler(){
    let c = new Crawler({
  
        maxConnections: 10,
        rateLimit: 1500,
        callback : function(err,res,done){
          if(err){
            console.log(err);
          }
      
          else {
              
            let $ = res.$;
            $('ol li article').each(function(i,book){
                const title = $(book).find('h3 a').attr('title');
                const link =  $(book).find('h3 a ').attr('href');
                const image = $(book).find('.image_container a img').attr('src'); 
                let imgPath = 'https://books.toscrape.com'+ image.substring(2);
                Product
                .findOneAndUpdate({title: title}, {$set: {link: link},$set:{imgPath: imgPath}}, {
                    new: true,
                    upsert: true
                  })
                .then(result=>{
                    console.log('Adding/updating book: '+result.title);
                    result.save();
                })
                .catch(function(err){
                    console.log("tried inserting a duplicate product...");
                })
    
            })
          }
          done();
        }
      })
    for(let i =1;i<51;i++){
        c.queue('https://books.toscrape.com/catalogue/page-'+i+'.html');
    }

    c.on('drain',function(){
        console.log("Done.");
    });
}

module.exports = {
    initCrawler,
};