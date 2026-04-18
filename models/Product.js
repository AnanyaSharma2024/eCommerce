const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            // what is this ? : this is a reference to the review model and it will store the id of the review in the product document and we can populate the review data using the id
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

const Product = mongoose.model('Product', productSchema)

module.exports = Product;