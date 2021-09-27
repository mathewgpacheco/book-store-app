const Crawler = require('crawler');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
const app = require('./app');
let pageNum = 0;

let c = new Crawler({
  
    maxConnections: 10,
    callback : function(err,res,done){
      if(err){
        console.log(err);
      }
  
      else {
        let $ = res.$;
        content= $('ol li article h3 a');
        $('ol li article').each(function(i,book){
            const title = $(book).find('h3 a').text();
            console.log('Adding book... '+title);
            const price = ($(book).find('.product_price .price_color').text()).replace(/[^0-9.]/g, '');
            const link =  $(book).find('h3 a ').attr('href');
            const product = new Product({
                _id: mongoose.Types.ObjectId(),
                title:title,
                price: parseFloat(price),
                link: link
            })
            product.save();
        })

        if(pageNum < 50){
            c.queue('https://books.toscrape.com/catalogue/page-'+ pageNum +'.html');
            pageNum++;
        }
      }
      done();
    }
  })


c.on('drain',function(){
    console.log("Done.");
    app.init();
});

function initCrawler(){
    c.queue('https://books.toscrape.com/catalogue/page-'+pageNum+'.html');
}
module.exports = {
    initCrawler
};