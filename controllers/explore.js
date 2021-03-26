const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")
const axios = require("axios")


// GET /explore/index - shows a form to users to search through
router.get("/index", (req, res) => {
    res.render("explore/index")
})

// GET /explore/plants
// Trefle's global plant database; renders query results from db
router.get("/plants", (req, res) => {
    let plant = req.query.q
    var qs = {
        params: {
            token: `${process.env.ACCESS_TOKEN}`,
            q: plant
        }
    }
    const plantUrl = "https://trefle.io/api/v1/plants/search"

    axios.get(plantUrl, qs)
    .then(response => {
        const results = response.data.data
        res.render('explore/plants', { plant: results })
    })
    .catch(err => {
        console.log("errrrr!!!:", err)
    })
})


// GET /explore/:id - lists more info about a plant and
// an option to save the plant to a user's garden 
// if user is logged in
router.get("/:id", (req, res) => {
    let id = req.params.id

    const plantUrl = `https://trefle.io/api/v1/plants/${id}?&token=${process.env.ACCESS_TOKEN}`

    axios.get(plantUrl)
    .then(response => {
        const results = response.data.data
        const plantDis = response.data.data.main_species.distribution
        const plantSpecs = response.data.data.main_species.specifications
        const growSpecs= response.data.data.main_species.growth

        console.log(results)
        res.render('explore/plant', { plant: results, native: plantDis, grow: plantSpecs, growth: growSpecs })
    })
    .catch(err => {
        console.log("errrrr!!!:", err)
    })
})

module.exports = router