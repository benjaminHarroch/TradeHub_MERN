
const express =require('express');
const mongoose =require('mongoose');
const cors = require("cors");
const serverResponse=require('./utilsServer/serverResponse');
//const routerUser=require('./Controllers/');
const routerPost=require('./Controllers/postsRouter');
const routerComment=require('./Controllers/commentRouter');
const auth=require('./Controllers/auth');

const axios = require("axios");

const app=express();


//----- midellewire for the application 
app.use(cors());
app.use(express.json());
//app.use(express.static("client/build"));

app.use('/post',routerPost);
app.use('/comment',routerComment);
app.use('/auth',auth);



//--- mongoose connection -- 
mongoose.connect("mongodb://localhost:27017/JuniorTraders" ,function(err) {
  if (err) {
    console.log(err);
  }else{
    console.log("Connected to DB"); 
  }
});


app.get('*',(req,res)=>{

  console.log(__dirname);
  res.sendFile(`${__dirname}/ClientApp/public/index.html`);

})

app.listen('8000',()=>{
    console.log('the application is runnig on PORT 8000');
})