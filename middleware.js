//middleware kya hote h toh basically middleware ek aise function hote hain jo request aur response ke beech me execute hote hain aur unka kaam hota hai ki wo request ko process karein aur response ko modify karein ya phir request ko validate karein ya phir authentication karne ke liye use hote hain toh basically middleware ek aise function hote hain jo request aur response ke beech me execute hote hain aur unka kaam hota hai ki wo request ko process karein aur response ko modify karein ya phir request ko validate karein ya phir authentication karne ke liye use hote hain toh basically middleware ek aise function hote hain jo request aur response ke beech me execute hote hain aur unka kaam hota hai ki wo request ko process karein aur response ko modify karein ya phir request ko validate karein ya phir authentication karne ke liye use hote hain toh basically middleware ek aise function hote hain jo request aur response ke beech me execute hote hain aur unka kaam hota hai ki wo request ko process karein aur response ko modify karein ya phir request ko validate karein ya phir authentication karne ke liye use hote hain toh basically middleware ek aise function hote hain jo request aur response ke beech me execute hote hain aur unka kaam hota hai ki wo request ko process karein aur response ko modify karein ya phir request ko validate karein ya phir authentication karne ke liye use hote hain toh basically middleware ek aise function hote hain jo request aur response ke beech me execute hote hain aur unka kaam hota hai ki wo request ko process karein aur response ko modify karein ya phir request ko validate karein ya phir authentication karne ke liye use hote hain toh basically middleware ek aise function hote hain jo request aur response ke beech me execute hote hain aur unka kaam hota hai ki wo request ko process karein aur response ko modify karein ya phir request ko validate karein ya phir authentication karne ke liye use hote hain toh basically middleware ek aise function hote hain jo request aur response ke beech me execute hote hain aur unka kaam hota hai ki wo request ko process karein aur response ko modify karein ya phir request ko validate karein
const {productSchema , reviewSchema} = require('./schema.js');
//const ExpressError = require('./utils/ExpressError');
const Product = require('./models/Product');
const Review = require('./models/Review'); 

// middleware for validating the product data that we are getting from the client side when we are adding a new product or editing a product because we want to make sure that the data that we are getting from the client side is valid and it is not missing any required fields and it is in the correct format so that we can save it to the database without any issues and also we want to show the user a proper error message if the data is not valid instead of just showing a generic error message so that the user can understand what went wrong and how to fix it
const validateProduct = (req,res,next)=>{
    const {name, img,price,desc} = req.body;
    const {error} = productSchema.validate({name, img,price,desc});            
    if(error){
        return res.render('users/error', {err: error.message});
    }
    else{
        next();
    }
}

// middleware for validating the review data that we are getting from the client side when we are adding a new review because we want to make sure that the data that we are getting from the client side is valid and it is not missing any required fields and it is in the correct format so that we can save it to the database without any issues and also we want to show the user a proper error message if the data is not valid instead of just showing a generic error message so that the user can understand what went wrong and how to fix it
const validateReview = (req,res,next)=>{
    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating, comment});
    if(error){
        return res.render('users/error', {err: error.message});
    }
    else{
        next();
    }
}

module.exports = {validateProduct , validateReview}


