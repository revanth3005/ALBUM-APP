const express= require("express")
const router=express.Router()
const albums=require("../albums/album")
const {authMiddleware}= require("../middleware/middleware")

router.get("/albums",authMiddleware,albums.getAlbums)//------using
router.get("/albums/:id",authMiddleware,albums.getalbumById)//---using
router.post("/album-name",authMiddleware,albums.CreateAlbumName)//creating Album name---
router.put("/albums/:id",authMiddleware,albums.updateAlbumName)//----using
router.delete("/albums/:id",authMiddleware,albums.deleteAlbum)//----using

// router.post("/albums",albums.createAlbum)//testing on postman
// router.put("/images/:id",albums.updateImages)testing on postman

module.exports=router