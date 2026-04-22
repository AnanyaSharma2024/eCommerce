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
        //min:0,
        required:true
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[// array h kyuki bahot saare ho sakte h ek product ke
        {
            // what is this ? : this is a reference to the review model and it will store the id of the review in the product document and we can populate the review data using the id
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

//middleware jo mongo db ke operatiions krwane m use hota h 
//pre and post middleware hote h pre middleware operation se pehle chalta h aur post middleware operation ke baad chalta h
productSchema.post('findOneAndDelete' , async function(product){
    if(product.reviews.length > 0){
        // isse ensure hoga ki jab bhi koi product delete hoga to uske saare reviews bhi delete ho jayenge kyuki reviews ka reference product ke andar stored hota h to jab product delete hoga to uske saare reviews bhi delete ho jayenge
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
});


const Product = mongoose.model('Product', productSchema)

module.exports = Product;