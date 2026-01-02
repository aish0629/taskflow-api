import * as AuthService from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";


export const registerUser = async (req, res, next) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body);
    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = AuthService.getUserById(req.user.userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};
