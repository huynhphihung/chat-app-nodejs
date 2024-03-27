export const userLogout = (req, res) => {
  try {
    res.cookie("jwt", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error in logout controller", err.message);
    res.status(500).json({ err: "Internal Server Error" });
  }
};
