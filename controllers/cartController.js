// import cart collections
const cartitems=require('../models/cartSchema')
const products = require('../models/productSchema')

// add to cart logic
exports.addtocart=async(req,res)=>{
// get product details
const {id,title,image,price,quantity}=req.body 

// logic
try{
    // (check product is in cart collection)
// id present in cart item increase the quantity of that item 
const product=await cartitems.findOne({id})

if(product){
    // product is in cart
    // increase the product quantity
    product.quantity+=1
    // update the granttotal
    product.granttotal=product.price*product.quantity
    // to save the changes in mongodb
    product.save()
    // send the response to client 
    res.status(200).json("items added to your cart...")
}
else{
    // id not present add the item to cartitem
    // add product to cart
    const newProduct=new cartitems({
        id,title,price,image,quantity,granttotal:price
    })

    // save new product to mongodb
    await newProduct.save()
     // send the response to client 
     res.status(200).json("item added to your cart...")
}   
}
catch(error){
res.status(401).json(error)
}
}

// get cart
exports.getCart=async(req,res)=>{
   try{
     // get all items from cart collections
     const allItems=await cartitems.find()
     res.status(200).json(allItems)

   }
   catch(error){
    res.status(401).json(error)
   }
}

// remove item from cart
exports.removefromCart = async(req,res)=>{
    // get id from req
    const {id} = req.params

    // remove product from given id from cart collections
    try{

        const removeItem = await cartitems.deleteOne({id})
        if(removeItem){
            // get all cart collections items aftre removing the perticular item 
            const allItems=await cartitems.find()
            res.status(200).json(allItems)

        }
        else{
            res.status(404).json("item not present in your cart")
 
        }
    }
    catch(error){
        res.status(401).json(error)

    }
}

// empty cart 
exports.emptycart=async(req,res)=>{
    try{
        await cartitems.deleteMany({})
        res.status(200).json("your cart is empty now!!!")

    }
    catch(error){
        res.status(401).json(error)

    }
}

// increment quantity
exports.incrementCount=async(req,res)=>{
    // get product id from req
    const {id}=req.params
    try{
    // check product is in cart collection
        const product=await cartitems.findOne({id})
        if(product){
            // item is in cart update quantity and granttotal
            product.quantity+=1
            product.granttotal=product.price*product.quantity
            // save the change from mongodb
            await product.save()
             // get all cart collections items aftre updating the perticular item count
             const allItems=await cartitems.find()
             res.status(200).json(allItems)
        }
        else{
            res.status(404).json("product is not in your cart!!!")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.decrementCount=async(req,res)=>{
    // get product id from req
    const {id}=req.params
    try{

        // check product is in cart collection
        const product=await cartitems.findOne({id})
        if(product){
            // item is in cart decrement quantity 
            product.quantity-=1
            // check the quantity is 0  
            if(product.quantity==0){
           //if 0 remove the product from cart collection
            await cartitems.deleteOne({id})
                // get all cart collections items aftre removing the perticular item count
                const allItems=await cartitems.find()
                res.status(200).json(allItems)
            }
            else{
                product.granttotal=product.price*product.quantity
                // save the change from mongodb
                await product.save()
                 // get all cart collections items aftre updating the perticular item count
                 const allItems=await cartitems.find()
                 res.status(200).json(allItems)
            }  
        }
        else{
            res.status(404).json("product is not in your cart!!!")
        }
    }
    catch(error){
        res.status(401).json(error)
  
    }
}