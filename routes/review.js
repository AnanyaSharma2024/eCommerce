const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router(); //mini server

//adding a review
router.post('/products/:idd/review' , async(req,res)=>{
    let {idd} = req.params;
    let {rating , comment} = req.body;
    let review = await Review.create({rating , comment})
    let product = await Product.findById(idd);// idd se product find karna hai
    product.reviews.push(review) //object id isme push ho jayega 
    await product.save(); // save karna zaruri hai nahi to database me update nahi hoga
    res.redirect(`/products/${product._id}`)// review add karne ke baad product ke page par redirect karna hai
})
// reviews show bhi krwane h toh populate karna padega product ke andar se review ko
// populate kya krta hai ki review ke andar se rating aur comment ko bhi show krwa deta hai product ke page par
   
module.exports = router;
