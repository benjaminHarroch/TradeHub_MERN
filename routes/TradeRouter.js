

const express=require('express');
const serverResponse=require('../utilsServer/serverResponse');
const mongoose =require('mongoose');
const TradeModel=require('../models/Trades');
const UserModel=require('../models/User');



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

router.get('/gettrade/:tradeid', async (req, res) => {
    const tradeid = req.params.tradeid;
    try {
        const trade = await TradeModel.findById(tradeid);

        if (trade) {
            return serverResponse(res, 200, { trade });
        } else {
            return serverResponse(res, 404, { message: "No such trade found" });
        }
    } catch (e) {
        console.error("Error fetching trade:", e); // Enhanced error logging
        return serverResponse(res, 500, { message: "Problem with fetching this trade" });
    }
});





router.post('/newTrade',async (req,res)=>{


    try{

        const newtrade=new TradeModel({...req.body})
        await newtrade.save();
        return serverResponse(res,200,{newtrade});


    }catch(e){

        return serverResponse(res,500,{message:"problem with save a new trades "});
    }



})


router.post('/newTrade/:userId', async (req, res) => {
    const userId = req.params.userId;
    const newTrade = req.body;

    try {
        // Create a new trade
        const trade = new TradeModel(newTrade);
        await trade.save();

        // Find the user and add the new trade's id to their trades
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.trades.push(trade._id);
        await user.save();

        res.status(200).json({ trades: user.trades });
    } catch (e) {
        res.status(500).json({ message: "Problem saving trade to the user", error: e.message });
    }
});

module.exports =router;
