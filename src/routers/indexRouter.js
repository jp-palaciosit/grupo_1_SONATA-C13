const express = require("express")
const router = express.Router()
const indexController = require("../controllers/indexController")

router.get("/", indexController.index)
router.get("/home", indexController.home)
router.get("/productos/:id", indexController.details)
router.get("/search", indexController.search)

module.exports = router