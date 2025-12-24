import * as AuthService from "../services/auth.service.js";

export const registerUser=async (req,res)=>{
    try {
        const result =await AuthService.register(req.body);
        res.status(201).json(result);
    } catch (err){
        res.status(400).json({error:err.message});  
    }
};

export const loginUser=async(req,res)=>{
    try{
        const result = await AuthService.login(req.body);
        res.status(200).json(result);
    }catch (err){
        res.status(400).json({error: err.messgae});
    }
};

export const getMe = async (req, res) => {
  try {
    const user = await AuthService.getUserById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};