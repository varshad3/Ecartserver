const mongoose=require('mongoose')

// define schema for products collection to store data
const cartSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    granttotal:{
        type:Number,
        required:true
    }
})

//create model to store cartitems

const cartitems = new mongoose.model("cartitems",cartSchema)

// export the model

module.exports=cartitems