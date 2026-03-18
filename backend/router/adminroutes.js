const router = require("express").Router();
const { login, refreshToken,register } = require("../controller/loginRegisterController");
const cors = require("cors");


const corsWithCookies = cors({
  origin: "http://localhost:5173",
  credentials: true,
});
router.post("/register",corsWithCookies,register)
router.post("/login", corsWithCookies, login);
router.get("/refresh", corsWithCookies, refreshToken);

router.post("/logout", (req, res) => {
  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  });

  res.json({ message: "Logged out successfully" });
});

module.exports = router;