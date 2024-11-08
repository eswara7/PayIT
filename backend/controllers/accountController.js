const mongoose = require("mongoose");
const { Account } = require("../dbSchema");
const getBalance = async (req,res,next)=>{
    const account = await Account.findOne({
        userId:req.userId
    });
    if(!account){
        return res.status(403).json({messege:"account not found"})
    }
    res.json({balance:account.balance})
}
const transferBalance = async(req,res)=>{
    const session = await Account.startSession();
    session.startTransaction();
    const {amount,toAccountId}  = req.body;
    if (!amount || amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Please enter a valid amount greater than 0"
            });
        }
    const account = await Account.findOne({userId:req.userId}).session(session)
    if(!account || account.balance == null || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({success:false,message:"insuffiecient balance"})
    }
    const toAccount = await Account.findOne({userId:toAccountId}).session(session);
    if(!toAccount|| toAccount.balance == null){
        await session.abortTransaction();
        return res.status(400).json({success:false,message:"account not found"})
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:toAccountId},{$inc:{balance:amount}}).session(session)
    await session.commitTransaction()
    return res.status(200).json({
        success:true,
        message:"transfer successful"
    })
}
module.exports ={
    getBalance,
    transferBalance
}