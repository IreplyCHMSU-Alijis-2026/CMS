const router = require("express").Router();
const { login, refreshToken,register } = require("../controller/loginRegisterController");
const cors = require("cors");



router.post("/register",register)
router.post("/login", login);
router.get("/refresh", refreshToken);

router.post("/logout", (req, res) => {
  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.json({ message: "Logged out successfully" });
});

module.exports = router;