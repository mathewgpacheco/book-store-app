require('dotenv').config();
const express =require('express');
const app = express();
const mongoose  = require('mongoose');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const port = process.env.PORT || 3000;
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/order');
const crawler = require('./crawler');


mongoose.connect(
   'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.xpgq3.mongodb.net/store?retryWrites=true&w=majority',
   {useUnifiedTopology:true},{autoIndex: false});
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const store = new MongoDBStore({
    uri:'mongodb+srv://' +process.env.DB_USER+ ':'+process.env.DB_PASS+'@cluster0.xpgq3.mongodb.net/sessions?retryWrites=true&w=majority',
    collection: 'sessiondata',
  });

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    sameSite: 'strict',
    httpOnly: true
}));




crawler.initCrawler(function(err){
  if(err) throw err;
  app.listen(port);
  console.log("Server listening at: " + port);
})
app.use(indexRoutes);
app.use('/user/',userRoutes);
app.use('/products/', productRoutes);
app.use('/order/',orderRoutes);