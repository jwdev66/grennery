db.user.create({
    username: "plantlovr",
    password: "dirtydata",
    email: "beleaf_itf@email.com"
})

db.plant.create({
    name: "french lavender",
    scientificName: "lavandula stoechas",
    nickname: null,
    slug: "lavender",
    image: "img-string",
    userId: 1
}).then((createdPlant) => {
  console.log(createdPlant.get())
  console.log("here it is:", createdPlant)
}).catch((err) => {
    console.log("errrrrrrr!!!!:", err)
})

db.plant.findOne({
    where: { id: 1 },
    include: [db.user]
}).then((plant) => {
// by using eager loading, the article model should have a comments key
    console.log(plant.user)
}).catch((err) => {
    console.log("errrrrrrr!!!!:", err)
})