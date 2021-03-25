const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")
const axios = require("axios")


// GET /explore - shows a form to users to search through
// Trefle's global plant database; renders query results 
router.get("/index", (req, res) => {
    axios.get(`https://trefle.io/api/v1/plants?&token=${process.env.ACCESS_TOKEN}`)
    .then(response => {
        res.send(response.data)
    })
    .catch(err => {
        console.log("errrrrrr!!:", err)
    })
})

// GET /explore/:id - lists more info about a plant and
// an option to save the plant to a user's garden 
// if user is logged in
router.get("/:id", (req, res) => {
    res.send("more details about a plant")
})

module.exports = router