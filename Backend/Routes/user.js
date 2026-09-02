import express from 'express';
import {userModel} from '../models/users.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/',authenticateToken, (async(req, res)=>{
    try{
        const userInfo = await userModel.findOne({email: req.user.email});

        if(userInfo){
            return res.status(200).json({username:userInfo.username, email:userInfo.email, userId:userInfo._id});

        }
    }catch(error){
        res.status(500).json({message: "user not found", error: error});
    }
    
}))

export {router as userRouter};