const user_model=require("../schemas/user.schema")
const album_model=require("../schemas/album.schema")
const album_Name_model=require("../schemas/albumNames")
const{
    isValidString,
    isValid,
    isValidObject,
    isValidObjectId
    }=require("../utils/validators")

//using-one
const getAlbums=async(req,res)=>{
        try{
            const albumsData=await album_Name_model.find({isDeleted:false,createdBy:res.locals.userId})
            if(albumsData){
                return res.status(200).send({
                    success:true,
                    code:200,
                    error:null,
                    messsage:"retrived all ALBUMS FROM DB",
                    data:{albums:albumsData},
                    resource:req.originalUrl
                })
            } 
        }catch(err){
            return res.status(500).send({
                success:false,
                code:500,
                error:err,
                message:err.message,
                data:null,
                resource:req.originalUrl
            })
        }
               
}

//using-one
const getalbumById=async(req,res)=>{
    const albumId=req.params.id
    try{
        const albumid=await album_Name_model.findById(albumId)
        if(albumid){
            return res.status(200).send({
                success:true,
                code:200,
                message:"album was fetched with their ID",
                error:null,
                data:{album:albumid},
                resource:req.originalUrl
            })
        }else{
            return res.status(500).send({
                success:false,
                code:500,
                message:"album id not found",
                error:"invalid id",
                data:null,
                resource:req.originalUrl
            })   
        }
    }catch(err){
        return res.status(500).send({
            success:false,
            code:500,
            message:err.message,
            error:err,
            data:null,
            resource:req.originalUrl
        })
    }
}

//postman-testing (not-using)//-----------------------------------------------------------------------------------------------------
// const createAlbum=async(req,res)=>{
//     const data=req.body
//     if(!isValid(data) || !isValidObject(data)){
//         return res.status(500).send({
//             success:false,
//             code:500,
//             error:"INVALID FORMAT",
//             message:"invalid sending data",
//             data:null,
//             resource:req.originalUrl
//         })
//     }
//     if(!isValid(data.createdBy) || !isValidString(data.createdBy)){
//         return res.status(500).send({
//             success:false,
//             code:500,
//             error:"INVALID FORMAT",
//             message:"invalid sending product-createdBy is required",
//             data:null,
//             resource:req.originalUrl
//         })
//     }
//     if(!isValid(data.name) || !isValidString(data.name)){
//         return res.status(500).send({
//             success:false,
//             code:500,
//             error:"INVALID FORMAT",
//             message:"invalid sending album-NAME is required",
//             data:null,
//             resource:req.originalUrl
//         })
//     }
//     if(!isValid(data.description) || !isValidString(data.description)){
//         return res.status(500).send({
//             success:false,
//             code:500,
//             error:"INVALID FORMAT",
//             message:"invalid sending DESCRIPTION is required",
//             data:null,
//             resource:req.originalUrl
//         })
//     }
//     if(!isValid(data.images) ){
//         return res.status(500).send({
//             success:false,
//             code:500,
//             error:"INVALID FORMAT",
//             message:"invalid sending image is required",
//             data:null,
//             resource:req.originalUrl
//         })
//     }
//     try{
//         // const userId=data.createdBy
//         const userid=await user_model.findOne({_id:data.createdBy})
//         if(!userid){
//             return res.status(400).send({
//                 success:false,
//                 code:400,
//                 error:"provide a valid user-id at createdBy",
//                 message:"user id not found",
//                 data:null,
//                 message:req.originalUrl
//             }) 
//         }
//     }catch(err){
//         return res.status(500).send({
//             success:false,
//                 code:500,
//                 error:err,
//                 message:`${err} error-While-handling the try block`,
//                 data:null,
//                 message:req.originalUrl
//         })
//     }
    
//     try{
//         const jwt=require("jsonwebtoken")
//         const token=req.header("authorization")
//         const decode=jwt.verify(token,"sai-revanth-neelam")
//         if(decode.userid !== data.createdBy){
//             return res.status(500).send({
//                 success:false,
//                 code:500,
//                 error:"invalid userid",
//                 message:"unauthorised access to create",
//                 data:null,
//                 resource:req.originalUrl
//             })
//         }
//     }catch(err){
//         return res.status(500).send({
//             success:false,
//                 code:500,
//                 error:err,
//                 message:`${err} error-While-handling the try block`,
//                 data:null,
//                 message:req.originalUrl
//         })   
//     }
//     const newAlbumData={
//         createdBy:req.body.createdBy,
//         name:req.body.name,
//         description:req.body.description,
//         images:req.body.images,
//         tags:req.body.tags
//     }
//     try{
//         const newAlbum=new album_model(newAlbumData)
//         await newAlbum.save()
//         return res.status(200).send({
//             success:true,
//             code:200,
//             error:null,
//             message:"ALBUM WAS CREATED",
//             data:{ALBUM:newAlbum},
//             resource:req.originalUrl 
//         })
//     }catch(err){
//         return res.status(500).send({
//             success:false,
//             code:500,
//             error:err,
//             message:err.message,
//             data:null,
//             resource:req.originalUrl 
//         })
//     }
    

// }
//----------------------------------------------------------------------------------------------------------------------------------



//updating album NAME & remaining fields--(using-one)
const updateAlbumName=async(req,res)=>{
    const albumId=req.params.id
    const data=req.body
    const name=req.body.name
    const images=req.body.images
    const tags=req.body.tags
    const description=req.body.description
if(!name || (name && name.trim().length === 0) || (typeof name!=="string")){
    return res.status(500).json({
        success:false,
        code:500,
        message:"should provide the name----data",
        error:"invalid formart sending the data",
        resource:req.url
    })
}
if(isValid(data.name) && isValidString(data.name)){
    try{
        const nameExist=await album_model.findOne({
            name:data.name
        })
        if(nameExist){
            return res.status(400).send({
                success: false,
                code: 400,
                message: "name exist",
                error: "provide new name",
                data: null,
                resource: req.originalUrl,

            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            code: 500,
            message: err.message,
            error: err.message,
            data: null,
            resource: req.originalUrl,
          });
    }
    try{
        const modifiedname= await album_Name_model.findById(albumId)
        modifiedname.name=name
        modifiedname.images=images
        modifiedname.description=description
        modifiedname.tags=tags
        const modifiedData= await modifiedname.save()
        res.status(200).send({
            success:true,
            code:200,
            message:"Book updated",
            error:null,
            data:{modifiedData},
            resource:req.url
        })
    }catch(err){
        res.status(500).send({
            success:false,
            code:500,
            message:err.message,
            error:err+"======",
            data:null,
            resource:req.url
        })  
    }
}


}

//------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------update-images testing-purpose only
// const updateImages=async(req,res)=>{
//     const albumId=req.params.id
//     const data=req.body
//     const images=req.body.images
//     if(!isValid(images) || !isValidString(images)){
//         return res.status(400).send({
//             success: false,
//             code: 400,
//             message: "provide image details",
//             error: "provide image link",
//             data: null,
//             resource: req.originalUrl,

//         })
//     }
//     try{
//         const jwt=require("jsonwebtoken")
//         const token=req.header("authorization")
//         const decode=jwt.verify(token,"sai-revanth-neelam")
//         const userIdPresent= await album_model.findOne({albumId})
//         console.log(decode.userid)
//         console.log(userIdPresent.createdBy);
//         if(decode.userid !== userIdPresent.createdBy){
//             return res.staus(400).send({
//                 success:false,
//                 code:400,
//                 error:"invalid userid",
//                 message:"unauthorized userid to update a book",
//                 data:null,
//                 resource:req.originalUrl
//             })
//         }
//     }catch(err){
//         return res.status(500).json({
//             success:false,
//                 code:500,
//                 error:err,
//                 message:err.message,
//                 data:null,
//                 resource:req.originalUrl
//         })
//     }
//     try{
//         const modifiedImage=await album_model.findById(albumId)
//         modifiedImage.images=images
//         const updatedImages=await modifiedImage.save()
//         res.status(200).json({
//             success:true,
//             code:200,
//             message:"IMAGE updated",
//             error:null,
//             data:{updated:updatedImages},
//             resource:req.url
//         })
//     }catch(err){
//         res.status(500).json({
//             success:false,
//             code:500,
//             message:err.message,
//             error:err,
//             data:null,
//             resource:req.url
//         })  
//     }
// }
//--------------------------------------------------------------------------------------------------------------------------------


//deleting ALBUM (USING-one)
const deleteAlbum=async(req,res)=>{
    const albumId=req.params.id
    const findID=await album_Name_model.findById(albumId)
    console.log(findID)
    if(!findID){
        return res.status(400).send({
            success:false,
                code:400,
                error:"invalid userid",
                message:"userid not found or deleted",
                data:null,
                resource:req.originalUrl
        })
    }
    try{
        const album=await album_Name_model.findOne({_id:albumId,isDeleted:false})
        if(!album){
            return res.status(400).json({
                success:false,
                code:400,
                data:null,
                error:"invalid userid or not present",
                resource:req.originalUrl
            })
        }
        if(album.createdBy.toString() !== res.locals.userId){
            console.log(album.createdBy);
            return res.status(403).json({
                success:false,
                code:403,
                message:"invalid forbidden",
                data:null,
                error:null,
                resource:req.originalUrl
            })
        }
        album.isDeleted=true;
        album.deletedAt=new Date().toISOString()
        await album.save()
        return res.status(200).json({
            success:true,
            code:200,
            message:"ALBUM DELETED",
            data:{album},
            error:null,
            resource:req.originalUrl
        })
    }catch(err){
        return res.status(500).send({
            success:false,
            code:500,
            error:err,
            message:err.message,
            data:null,
            resource:req.originalUrl
    })
    }
}


//creating Album Name---(using-one)
const CreateAlbumName=async(req,res)=>{
    const album=req.body
    if(!isValid(album) || !isValidObject(album)){
        return res.status(400).json({
            success:false,
            code:400,
            error:"invalid format",
            data:null,
            message:"error invalid format",
            resource:req.originalUrl
        })
    }
    if(!isValid(album.name) || !isValidString(album.name)){
        return res.status(400).json({
            success:false,
            code:400,
            error:"invalid format",
            data:null,
            message:"error album name is required",
            resource:req.originalUrl
        })
    }
    if(!isValid(album.description) || !isValidString(album.description)){
        return res.status(400).json({
            success:false,
            code:400,
            error:"invalid format",
            data:null,
            message:"error description is required",
            resource:req.originalUrl
        })
    }
    if(!isValid(album.images) || !isValidString(album.images)){
        return res.status(400).json({
            success:false,
            code:400,
            error:"invalid format",
            data:null,
            message:"error description is required",
            resource:req.originalUrl
        })
    }
    try{
        const albumName=await album_Name_model.create({
            name:req.body.name,
            description:req.body.description,
            images:req.body.images,
            tags:req.body.tags,
            createdBy:res.locals.userId
        })
        return res.status(200).json({
            success:true,
            code:201,
            message:"Album Name Created Succesfully",
            data:{albumName},
            error:null,
            resource:req.originalUrl
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            code:500,
            error:error,
            data:"nodata",
            message:error.message,
            resource:req.originalUrl
        })
    }
}



module.exports={
    getAlbums,
    getalbumById,
    //createAlbum,
    updateAlbumName,
    //updateImages,
    deleteAlbum,
    CreateAlbumName
}