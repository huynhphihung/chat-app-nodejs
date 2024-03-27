import bcrypt from "bcryptjs";
import { userModel } from "../model/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ err: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    console.log("Error in login controller", err.message);
    res.status(500).json({ err: "Internal Server Error" });
  }
};
