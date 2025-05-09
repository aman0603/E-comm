import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no access token" });
    }
    try{
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    if (!decoded) 
        {
            return res.status(401).json({ message: "Unauthorized - invalid token" });
        }
    const user = await User.findById(decoded.userId).select("-password");//deselelct password
    if (!user) {    
        return res.status(401).json({ message: "Unauthorized - user not found" });
    }
    req.user = user;
    next();
    }catch(error){
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({ message: "Unauthorized - token expired" });
        }
        throw error;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
  }
};
export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role == "admin") {
        next();
    }else{
        res.status(401).json({ message: "Access denied - user is not an admin" });
    }
};
