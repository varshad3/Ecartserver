const wishlists=require('../models/wishlistSchema')

// add to wishlist logic

exports.addtoWishlist = async(req,res)=>{

    // get product details from request
    // using destructuring
    const{id,title,price,image} = req.body

    // logic
    try{
        //check product is in wishlist 
        const item=await wishlists.findOne({id})
        if(item){
            res.status(402).json("item already present in your wishlist!!!")
        }
        else{
            // add item to wishlist collection
            const newproduct=new wishlists({
                id,title,price,image
            })
            // to store the newproducts
            await newproduct.save()
            res.status(200).json("item added to  your wishlist!!!")

        }
    }
    catch(error){
        res.status(401).json(error)
    }

}


// get wishlist 

exports.getWishlistItems = async(req,res)=>{
// logic 
try {
    // get all products from wishlist collection in mongodb
   const allProducts = await wishlists.find()
   res.status(200).json(allProducts)
    }
catch(error){
res.status(401).json(error)
}
}

//remove item from wishlist

exports.removefromWishlist = async(req,res)=>{
    // get id from req
    const {id} = req.params

    // remove id from wishlist collections
    try{

        const removeItem = await wishlists.deleteOne({id})
        if(removeItem){
            // get all wishlist items aftre removing the perticular item 
            const allItems=await wishlists.find()
            res.status(200).json(allItems)

        }
        else{
            res.status(404).json("item not present in the wishlist")
 
        }
    }
    catch(error){
        res.status(401).json(error)

    }
}

 