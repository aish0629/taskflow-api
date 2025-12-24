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
        res.status(200).json(reuslt);
    }catch (err){
        res.status(400).json({error: err.messgae});
    }
};