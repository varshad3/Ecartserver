// to define  routes for client request,create routes folder and router.js file 

// import express
const express=require('express')
// import product controller
const productController = require('../controllers/productController')

// import wishlist controller
const wishlistController = require('../controllers/wishlistController')

// import cartcontroller
const cartcontroller=require('../controllers/cartController')

//using express create object for router class  inorder to setup path
const router = new express.Router()

// resolve client request in various server routes


// api
// get-all products
router.get('/products/all-products',productController.getallProducts)

// view products/id
router.get('/products/view-product/:id',productController.viewProduct)

// add to wishlist
router.post('/wishlist/add-product',wishlistController.addtoWishlist)

// get-wishlist-items
router.get('/wishlist/get-items',wishlistController.getWishlistItems)

// remove wishlist item
router.delete('/wishlist/remove-item/:id',wishlistController.removefromWishlist)

// add to cart
router.post('/cart/add-product',cartcontroller.addtocart)

// get cart
router.get('/cart/all-products',cartcontroller.getCart)

// remove cart item
router.delete('/cart/remove-item/:id',cartcontroller.removefromCart)

//empty cart
router.delete('/cart/remove-all-items',cartcontroller.emptycart)

// increment quantity
router.get('/cart/increment-item/:id',cartcontroller.incrementCount)

// decrement quantity
router.get('/cart/decrement-item/:id',cartcontroller.decrementCount)
// export router
module.exports=router