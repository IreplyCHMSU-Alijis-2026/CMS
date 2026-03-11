const router = require("express").Router()
const multer = require("multer")

const auth = require("../middleware/auth")

const {
uploadContent,
getAllContent,
deleteContent
} = require("../controller/contentController")

const upload = multer({dest:"uploads/"})

router.post("/upload",auth,upload.single("file"),uploadContent)

router.get("/content",auth,getAllContent)

router.delete("/content/:id",auth,deleteContent)

module.exports = router