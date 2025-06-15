import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";
import { set } from "mongoose";


const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

/**
 * Stores a refresh token in the Redis datastore with an expiration time of 7 days.
 *
 * @param {string} userid - The ID of the user for whom the refresh token is being stored.
 * @param {string} refreshToken - The refresh token to be stored.
 */

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); //7days
};

/**
 * Sets cookies on the response object for the access token and refresh token.
 *
 * @param {http.ServerResponse} res - The response object.
 * @param {string} accessToken - The access token to be set as a cookie.
 * @param {string} refreshToken - The refresh token to be set as a cookie.
 */
const setCookie = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  });
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ email, password, name });

    //authenticate user
    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);
    setCookie(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Some error occured" });

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //authenticate user
    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);5
    setCookie(res, accessToken, refreshToken);

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(204);

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

    if (!decoded) return res.sendStatus(403);

    await redis.del(`refresh_token:${decoded.userId}`);
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

/**
 * This API endpoint is used to refresh an access token.
 *
 * @param {http.IncomingMessage} req - The request object.
 * @param {http.ServerResponse} res - The response object.
 *
 * @returns {Promise<void>}
 */

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(401).json({ message: "token not found" });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    if (!decoded) return res.sendStatus(403);

    const isRefreshTokenValid = await redis.get(
      `refresh_token:${decoded.userId}`
    );

    if (!isRefreshTokenValid) return res.sendStatus(403);

    if (isRefreshTokenValid !== refreshToken) {
      return res.sendStatus(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "15m",
      }
    );

    //store refresh token
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.json({ accessToken, message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refresh token controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODA0YTQ3ZjA5MzQ3ZGM1NTliMTJiMTciLCJpYXQiOjE3NDUxNDkwMTcsImV4cCI6MTc0NTE0OTkxN30.EYKG3TDj2Uzh01-41gaxPCfYq42QroUE9s3jlWDKNhI; Path=/; HttpOnly; Expires=Sun, 20 Apr 2025 11:51:57 GMT;

//accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODA0YTQ3ZjA5MzQ3ZGM1NTliMTJiMTciLCJpYXQiOjE3NDUxNDkxODEsImV4cCI6MTc0NTE1MDA4MX0.9MvCDbdZtcha_otfwEEyNWBCkipCVl6g3tIPzZFK6zc; Path=/; HttpOnly; Expires=Sun, 20 Apr 2025 11:54:41 GMT;


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in getProfile controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};