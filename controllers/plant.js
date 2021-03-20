const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")

// GET /plant/new/:userId - show form to add new plant to user's garden
// router.get("/plant/new/:userId", isLoggedIn, (req, res) => {
router.get("/plant/new/:userId", (req, res) => {
    res.send("form to add new plant to user's garden")
})

// POST /plant/new/:userId - show form to add new plant to user's garden
router.post("/plant/new/:userId", isLoggedIn, (req, res) => {
    res.send("saving queried plant to garden")
})


module.exports = router