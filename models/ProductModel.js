const mongoose = require('mongoose');
const  Schema = mongoose.Schema; 

const productSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
        
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number,
        default: 0
    },
    imgPath: {
        type: String
    },
    link: {
        type: String
    },
    reviews:[{type: mongoose.SchemaTypes.ObjectId, ref: 'Review'}],
    genre: {
        type: String
    }

});

productSchema.pre('save', async function(next){
    const product = this;
    //random value between 1 and 10
    const random = Math.floor(Math.random() * (10-1 + 1)) + 1;
    this.stock = random;

    let genres = ["Travel",
    "Mystery",
    "Historical Fiction",
   "Sequential Art",
    "Classics",
    "Philosophy",
    "Romance",
    "Womens Fiction",
    "Fiction",
    "Childrens",
    "Religion",
    "Nonfiction",
    "Music",
    "Science Fiction",
    "Sports and Games",
    "Fantasy",
    "New Adult",
    "Young Adult",
    "Science",
    "Poetry",
    "Paranormal",
    "Art",
    "Psychology",
    "Autobiography",
    "Parenting",
    "Adult Fiction",
    "Humor",
    "Horror",
    "History",
    "Food and Drink",
    "Christian Fiction",
    "Business",
    "Biography",
    "Thriller",
    "Contemporary",
    "Spirituality",
    "Academic",
    "Self Help",
    "Historical",
    "Christian",
    "Suspense",
    "Short Stories",
    "Novels",
    "Health",
    "Politics",
    "Cultural",
    "Erotica",
    "Crime"];

    this.genre = (genres[Math.floor(Math.random() * genres.length)]);
    next();
})

module.exports = mongoose.model('Product', productSchema,'products');