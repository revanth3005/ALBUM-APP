const express = require("express")

const router=express.Router()

const users= require("../users/user")

router.get("/users",users.getUsers)
router.get("/users/:id",users.getUserbyId)
router.post("/users",users.createUser)
router.put("/users/:id",users.userUpdate)
router.delete("/users/:id",users.userDelete)


module.exports = router
