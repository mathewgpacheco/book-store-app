const Crawler = require('crawler');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');

function initCrawler(cb){
    let c = new Crawler({
  
        maxConnections: 10,
        rateLimit: 1500,
        callback : function(err,res,done){
          if(err){
            console.log(err);
          }
      
          else {
              
            let $ = res.$;
            content= $('ol li article h3 a');
            $('ol li article').each(function(i,book){
                const title = $(book).find('h3 a').text();
                const price = ($(book).find('.product_price .price_color').text()).replace(/[^0-9.]/g, '');
                const link =  $(book).find('h3 a ').attr('href');
    
                Product
                .create({
                    _id: mongoose.Types.ObjectId(),
                    title:title,
                    price: parseFloat(price),
                    link: link
                })
                .then(result=>{
                    console.log('Adding book... '+result.title);
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

    for(let i =0;i<50;i++){
        c.queue('https://books.toscrape.com/catalogue/page-'+i+'.html');
    }

    c.on('drain',function(){
        console.log("Done.");
        return cb();
    });
}

module.exports = {
    initCrawler,
};