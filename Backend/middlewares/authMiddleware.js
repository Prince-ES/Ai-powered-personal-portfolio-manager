/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'

export function authenticateToken (req, res, next){
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(' ')[1];

    //When token is missing (made request from external source or refreshed app)
    if(!accessToken){
        return res.status(401).json({
            message:"Access token required",
        })
    }

    try{
        const decoded = jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET);

        if (!decoded.userId) {//ensuring userId was used during signature.
            return res.status(401).json({
                message: "Invalid access token"
            });
        }

        req.user = decoded;
        next()
    }catch(error){
        res.status(401).json({
            message: "Invalid or Expired token",
            error:error
        })
    }

    // two cases: token is invalid (user sent anything as token or it just expired)/ token is valid. 
    
}