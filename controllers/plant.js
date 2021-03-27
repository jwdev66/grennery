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

// UPDATE /plant/:id - update a user's plant's nickname
router.put("/:id", isLoggedIn, (req, res) => {
    let id = req.params.id
    let userId = req.user.id
    db.plant.update({
        nickname: req.body.nickname,
    },{
        where: {userId: userId},
        include: [db.user]
    })
    .then((updatedPlant) => {
        console.log("Here's the updated tip:", updatedPlant)
        res.redirect(`/garden/index/${userId}`)
    })
    .catch((err) => {
        console.log("errrrrrrrr!!!", err)
    })
})




module.exports = router