// const router = require("express").Router()
// const multer = require("multer")

// const auth = require("../middleware/auth")

// const {
// uploadContent,
// getAllContent,
// deleteContent,
// updateContent
// } = require("../controller/contentController")

// const upload = multer({dest:"uploads/"})


// router.post("/upload",auth,upload.single("file"),uploadContent)

// router.get("/content",auth,getAllContent)

// router.delete("/content/:id",auth,deleteContent)

// router.put("/content/:id", auth, upload.single("file"), updateContent)



// module.exports = router


const router = require("express").Router();
const multer = require("multer");
const auth = require("../middleware/auth");

const cors = require("cors");
const {
  uploadContent,
  getAllContent,
  deleteContent,
  updateContent,
  getPublicContent,
} = require("../controller/contentController");



// const corsWithCookies = cors({
//   origin: "http://localhost:5173", 
//   credentials: true,
// });


const corsPublic = cors(); 

const upload = multer({ dest: "uploads/" });

router.post("/upload", auth, upload.single("file"), uploadContent);
router.get("/content", auth, getAllContent);
router.delete("/content/:id", auth, deleteContent);
router.put("/content/:id", auth, upload.single("file"), updateContent)



router.get("/public/content", corsPublic, getPublicContent);

module.exports = router;