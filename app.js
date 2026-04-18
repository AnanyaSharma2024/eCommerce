const express = require('express');
const path = require('path');
const app =  express(); //instance
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/review')
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/titans')
.then(function(){
    console.log('DB CONNECTED SUCCESSFULLY');
})
.catch(function(err){
    console.log(err , "ERROR");
})

// setting up ejs reason : to render dynamic data in our html files we need a template engine and ejs is one of the most popular template engines for node js
app.set('view engine'  , 'ejs');
// setting up views directory reason : if we want to change the name of views directory to something else then we can do that by this line of code
app.set('views' , path.join(__dirname , 'views'));
// static files
// reason : to serve static files like css , js , images etc we need to use express.static middleware and we need to specify the path of the static files directory
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({extended:true}))//undefined na de body
app.use(methodOverride('_method'))

// seedDB()
// ye function db me products ko insert karega aur jab bhi hum app.js ko run karenge to ye function call hoga aur db me products insert ho jayenge
// seedDB() ko comment karna zaroori hai kyuki agar hum baar baar app.js ko run karenge to db me products baar baar insert hote rahenge aur db me duplicate products ho jayenge isliye ek baar db seed karne ke baad is function ko comment kar dena chahiye
app.use(productRoutes)
// review related routes ko alag se reviewRoutes me define kiya hai aur usko app.js me use kar diya hai taki code clean rahe aur maintainable rahe
app.use(reviewRoutes)



// export nhi kar sakte h app ko kyuki ek hi instance hota hai app ka isliye directly listen karenge server ko
// what is instance : instance is an object that is created from a class. it has all the properties and methods of the class. in this case app is an instance of express class and it has all the properties and methods of express class.
const PORT = 8080;
app.listen(PORT , function(){
    console.log(`SERVER CONNECTED AT PORT: ${PORT}`);
}) 