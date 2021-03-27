const express = require("express")
const router = express.Router()
const db = require("../models")
const isLoggedIn = require("../middleware/isLoggedIn")


// DELETE /plant/:id - delete user's plant
router.delete("/:id", isLoggedIn, (req, res) => {
    let id = req.params.id
    let userId = req.user.id
    db.plant.destroy({
        include: [db.user],
        where: { id: id }
    })
    .then((deletedPlant) => {
        console.log("deleting saved plant:", deletedPlant)
        res.redirect(`/garden/index/${userId}`)
    })
    .catch((err) => {
        console.log("errrrrrrr!!!!:", err)
    })
})

router.put("/:id", isLoggedIn, (req, res) => {
    let id = req.params.id
    let userId = req.user.id
    db.plant.findOne({
        id: id
    })
    .then(foundPlant => {
        foundPlant.updateAttributes({
            nickname: req.body.nickname
        })
    })
    .catch((err) => {
        console.log("errrrrrrr!!!!:", err)
    })
})
module.exports = router