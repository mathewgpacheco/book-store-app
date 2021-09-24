require('dotenv').config();
const express =require('express');
const app = express();
const mongoose  = require('mongoose');
const uri = process.env.DB_URI;
const PORT = process.env.PORT || 3000;

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users')


mongoose.connect(uri, {useUnifiedTopology:true},{autoIndex: false});
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(indexRoutes);
app.use('/user/',userRoutes);

app.listen(PORT);
console.log("Server listening at: " + PORT);
