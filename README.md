## Book-store-app

A basic eCommerce web application which contains a web crawler, a RESTful server, and a browser-based client that will allow a user to create an account, view products, perform searches, and create orders.

Technologies Used: Express, Node, Mongoose, Mongodb, Pug, CSS

app is live @: https://book-store-mp.herokuapp.com

## Features

### Web-Scraped Data

The products being used are crawled from a website: https://books.toscrape.com and its contents is stored using a database: MongoDB Atlas.

### Data Persistance

User's data is stored on the database; this involve their login information as well as products that they have purchased, rated, and comments that they may have left on certain items. Users can review their purchases from previous sessions as well as view comments from other users that belong to a product.

### Real-Time Database Transactions

Once a user decides to purchase an item, the items corresponding quantity decreases by the number of units being sold. This change is reflected client side through the change in stock of that item.

### Search Engine

Users are able to search for products where the engine returns items that are relatively close to the query.
