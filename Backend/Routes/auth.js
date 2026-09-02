/* eslint-disable no-undef */
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {userModel} from '../models/users.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/refresh',(req, res)=>{//request will get redirected here if: there was no token sent or it was invalid
    const oldToken = req.cookies.refreshToken;

    try{
        const decoded = jwt.verify(oldToken, process.env.JWT_REFRESH_SECRET);

        if(!decoded.email){
            return res.status(401).json({
                message:"User not found."
            })
        }

        const newAccessToken = jwt.sign({
            userId:decoded.userId,
            email:decoded.email,
        },process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: '15m'
        })

        return res.status(201).json({
            accessToken:newAccessToken
        })
        
    }catch(error){
        res.status(401).json({
            message: "User logged out. Please login again",
            error: error,
        })
    }

    
})

router.post ('/signup', async (req, res)=>{
    try{
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            res.status(400).json({
                message:"All fields are required"
            })
        }

        const existingUser = await userModel.findOne({email});

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await userModel.create({
            username,
            email,
            password:hashedPass,
        });

        return res.status(201).json({
            message:"Account created successfully"
        })

    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error:error
        })
    }
})

router.post('/login', async(req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Please fill out all the fields"
            })
        }
    
        const user = await userModel.findOne({email});//findOne takes filter object, we can have multiple conditions like {email:xyz@gmail.com, age:25} and 
        if(!user){
            return res.status(401).json({
                message:"Incorrect email or password"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Incorrect email or password"
            })
        }
        
        const accessToken = jwt.sign({
                userId:user._id,
                email:user.email,
            },// eslint-disable-next-line no-undef
                process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: '15m'
            }
        );

        const refreshToken = jwt.sign({
                userId:user._id,
                email:user.email,
            },// eslint-disable-next-line no-undef
                process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: '7d'
            }
        );

        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message:"Login successful",
            accessToken,
            username:user.username,
            email:user.email,
            userId:user._id
        })

    }catch(error){
        res.status(500).json({
            message: "Internal server error",
            error:error
        })
    }

})

router.post('/logout',authenticateToken, ( req, res )=>{
    try{
        res.clearCookie('refreshToken',{
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 1000 * 60 * 24
        })
        res.status(200).json({message:'User logged out'});
    }catch(error){
        res.status(500).json({error:error})
    }
})

export {router as authRouter};