// import the dotenv for configure the environmental files 
// automatically load env file to our app and use the comment config() to invoke
require('dotenv').config()

// import connection file
require('./db/connection')

// import router 
const router=require('./routes/router')

// import express
const express=require('express')

// import cors
const cors= require('cors')

//create server app
const server=express()

// to create a variable to store the port number
const PORT = 3000 || process.env.PORT

// use in server app 
server.use(cors())
// parser of json in express
server.use(express.json())

// use router to the server
 server.use(router)



// run the appilcation 
server.listen(PORT,()=>{
    console.log(`ecart server started at port ${PORT}`);
})