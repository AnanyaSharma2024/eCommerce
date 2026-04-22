const express = require('express');
const Product = require('../models/Product');
// mini server kyu bana rhe h kyuki app.js ka ek hi instance hota hai aur usme saare routes ko define karna thoda messy ho jata hai isliye hum alag se ek router bana lete hain aur usme saare product related routes ko define kar lete hain aur phir us router ko app.js me use kar lete hain
const router = express.Router(); //mini server

// all the products
router.get('/products' , async(req,res)=>{
    let allProducts =  await Product.find({});
    res.render('product/index' , {allProducts})// this will render the index.ejs file and pass the allProducts variable to it
})

// form for adding new product
router.get('/product/new', (req,res)=>{
    res.render('products/new')// this will render the form for adding new product
})

// actually adding the product
router.post('/products' , async(req,res)=>{
    let {name,img,price,desc} = req.body;
    await Product.create({name,img,price,desc});
    res.redirect('/products')// after adding the product we want to redirect the user to the products page
})

// particular product
router.get('/products/:idd' , async(req,res)=>{
    let {idd} = req.params;// req.param`s is used to get the value of the idd parameter from the url
    //  populate is used to get the reviews of the product along with the product details when we are showing the product details page because we want to show the reviews of the product on the product details page so we need to populate the reviews field of the product model to get the reviews of the product along with the product details
    let foundProduct  = await Product.findById(idd).populate('reviews');
    // console.log(foundProduct , "review too");
    res.render('product/show' , {foundProduct})// this will render the show.ejs file and pass the foundProduct variable to it
})

// form for editing the products
router.get('/products/:idd/edit', async(req,res)=>{
    let {idd} = req.params;
    let foundProduct = await Product.findById(idd);
    res.render('product/edit', {foundProduct})// only the product that we want to edit will be passed to the edit.ejs file and then we can use that product to pre-fill the form fields in the edit.ejs file
})

// actually editing the product
router.patch('/products/:idd', async(req,res)=>{
    let {idd} = req.params;
    let {name,img,price,desc} = req.body;
    await Product.findByIdAndUpdate(idd,{name,img,price,desc});
    res.redirect(`/products/${idd}`)// after editing the product we want to redirect the user to the show page of that product
})

// delete
router.delete('/products/:idd', async (req, res) => {
    let { idd } = req.params;
    const product = await Product.findById(idd);
    if (!product) {
        return res.send("Product not found");}
    for (let id of product.reviews) {
        await Review.findByIdAndDelete(id);}
    await Product.findByIdAndDelete(idd);
    res.redirect('/products');
});

module.exports = router;
