


const express=require('express');
const serverResponse=require('../utilsServer/serverResponse');
const mongoose =require('mongoose');
const TradeModel=require('../models/Trades');
const UserModel=require('../models/User');
//const { use } = require('./auth');


const router=express.Router();


router.get('/getalltrade',async (req,res)=>{

   
    try{

        const trades=await TradeModel.find({})
        return serverResponse(res,200,{trades});


    }catch(e){

        return serverResponse(res,500,{message:"problem with gell all trades"});
    }



})

router.get('/getalltradeofuser/:userid',async (req,res)=>{

    const userid=req.params.userid;
    try{

        const user=await UserModel.findById({_id:userid})

        if(user){

        return serverResponse(res,200,{trades:user.trades});

        }else{

            return serverResponse(res,200,{message:"no such user"});
        }


    }catch(e){

        return serverResponse(res,500,{message:"problem with gell all trades"});
    }



})

router.get('/gettrade/:tradeid',async (req,res)=>{

    const tradeid=req.params.tradeid;
    try{

        const trade=await TradeModel.findById({_id:tradeid})

        if(trade){

        return serverResponse(res,200,{trade});

        }else{

            return serverResponse(res,200,{message:"no such trade"});
        }


    }catch(e){

        return serverResponse(res,500,{message:"problem with gell this trade"});
    }



})




router.post('/newTrade',async (req,res)=>{

   
    try{

        const newtrade=new TradeModel({...req.body})
        await newtrade.save();
        return serverResponse(res,200,{newtrade});


    }catch(e){

        return serverResponse(res,500,{message:"problem with save a new trades "});
    }



})


router.post('/newTrade/:userId',async (req,res)=>{

    const userId=req.params.userId;
    const newTradeid=req.body.tradeid;
     

   
    try{

        const user=await UserModel.findById({_id:userId});
        //console.log(user)
        user.trades.push(newTradeid);
       // console.log(user.trades)
        await user.save();
        return serverResponse(res,200,{trades:user.trades});


    }catch(e){

        return serverResponse(res,500,{message:"problem with save trades to the user"+e});
    }


 return serverResponse(res,500,{message:"problem with id"});



})

module.exports =router;