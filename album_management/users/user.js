const user_model=require("../schemas/user.schema")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const{
    isValidString,
    isValid,
    isValidObject,
    isValidEmail,
    SALT
    }=require("../utils/validators")
const { isValidObjectId } = require("mongoose")

const getUsers=async(req,res)=>{
        try{
        const data=await user_model.find()
        const count=await user_model.find().count()
        if(data){
            return res.status(200).send({
                success:true,
                code:200,
                users_COUNT:count,
                message:"ALL USERS RETRIVED FROM DB",
                data:{users:data},
                error:null,
                resource:req.originalUrl
            }) 
        }
        }catch(error){
            return res.status(500).send({
                success: false,
                code: 500,
                message: error.message,
                error: error,
                data: null,
                resource: req.originalUrl,
            })
        }
        
}


const getUserbyId=async (req,res)=>{
        try{
        const userid=req.params.id
        const userId=await user_model.findById(userid)
        if(userId){
            return res.status(200).send({
                success:true,
                code:200,
                message:"USER RETRIVED FROM DB",
                data:{user:userId},
                error:null,
                resource:req.originalUrl
            })
        }else{
            return res.status(400).send({
                success:true,
                code:400,
                message:"USER ID NOT FOUND",
                data:null,
                error:"INVALID USER-ID",
                resource:req.originalUrl
            })
        }
        }catch(error){
            return res.status(500).send({
                success: false,
                code: 500,
                message: error.message,
                error: error,
                data: null,
                resource: req.originalUrl,
            })
        }


    
}

const createUser=async (req,res)=>{
    const data=req.body

    if(!isValid(data) || !isValidObject(data)){
        return res.status(400).send({
            success:false,
            code:400,
            data:null,
            message:"INVALID PROVIDE THE REQUIRED DETAILS",
            error:"INVALID FORMAT OF SENDING DATA",
            resource:req.originalUrl
        })
    }
    if(!isValid(data.title) || !isValidString(data.title)){
        return res.status(400).send({
            success:false,
            code:400,
            data:null,
            message:"INVALID TITLE IS REQUIRED",
            error:"INVALID FORMAT OF SENDING DATA",
            resource:req.originalUrl
        })
    }
    let c=0
    const titles=["Mr","Ms","Miss"]
    for(let i=0; i<titles.length; i++){
        if(data.title === titles[i]){
            c++;
            break;
        }
    }
    if(c!==1){
        return res.status(400).send({
            success:false,
            code:400,
            message:`TITLE SHOULD BE "Mr" or "Ms" "Miss" `,
            error:"INVALID FORMAT",
            resource:req.url
        })
    }else{
        title=data.title
    }
    if(!isValid(data.name) || !isValidString(data.name)){
        return res.status(400).send({
            success:false,
            code:400,
            data:null,
            message:"INVALID NAME IS REQUIRED",
            error:"INVALID FORMAT OF SENDING DATA",
            resource:req.originalUrl
        })
    }
    if(!isValid(data.email) || !isValidEmail(data.email)){
        return res.status(400).send({
            success:false,
            code:400,
            data:null,
            message:"INVALID EMAIL IS REQUIRED",
            error:"INVALID FORMAT OF SENDING DATA",
            resource:req.originalUrl
        })
    }
    if(!isValid(data.password) || !isValidString(data.password)){
        return res.status(400).send({
            success:false,
            code:400,
            data:null,
            message:"INVALID PASSWORD IS REQUIRED",
            error:"INVALID FORMAT OF SENDING DATA",
            resource:req.originalUrl
        })
    }
    //checking for name is present or not 
    try{
        const isname_exist= await user_model.findOne({name:data.name})
        if(isname_exist){
            return res.status(400).send({
                success:false,
                code:400,
                message:`NAME IS EXIST ${data.name} PROVIDE NEW NAME`,
                data:null,
                error:"PROVIDE NEW NAME",
                resource:req.url
            })  
        }
    }catch(err){
        return res.status(500).send({
            success: false,
            code: 500,
            message: "error",
            error: "error",
            data: null,
            resource: req.originalUrl,
        })
    }
    //checking for email
    try{
        const mailexist= await user_model.findOne({email:data.email})
        if(mailexist){
            return res.status(400).send({
                success:false,
                code:400,
                message:`MAIL ID IS EXIST ${data.email} PROVIDE NEW MAIL`,
                data:null,
                error:"PROVIDE NEW MAIL ID",
                resource:req.url
            })
        }
    }catch(err){
        return res.status(500).send({
            success: false,
            code: 500,
            message: err.message,
            error: err,
            data: null,
            resource: req.originalUrl,
        }) 
    }
    const hashPassword = await bcrypt.hash(data.password.trim(), SALT);
    const newUser={
        title:data.title.trim(),
        name:data.name.trim(),
        email:data.email.trim(),
        password:hashPassword
    }
    try{
        const userCreated= new user_model(newUser)
        await userCreated.save()
        console.log(userCreated);
        return res.status(200).send({
            success:true,
            code:200,
            message:"USER REGISTERED-SUCCESFULLY",
            data:{
                user:userCreated
            },
            error:null,
            resource:req.originalUrl
        })
    }catch(err){
        return res.status(500).send({
            success:false,
            code:500,
            data:null,
            message:err.message,
            error:err,
            resource:req.originalUrl
        })
    }
}

const userUpdate =async(req,res)=>{
    const dataid=req.params.id
    const data=req.body
    console.log(dataid)
    const email=req.body.email
    console.log(email)
    if(!email || (email && email.trim().length === 0) || (typeof email!=="string")){
        return res.status(500).json({
            success:false,
            code:500,
            message:"should provide the email----data",
            error:"invalid formart sending the data",
            resource:req.url
        })
    }
    if(isValid(data.email) && isValidEmail(data.email)){
        try{
            const mailExist=await user_model.findOne({
                email:data.email
            })
            if(mailExist){
                return res.status(500).send({
                    success: false,
                    code: 400,
                    message: "maild id exist",
                    error: "provide new mail id",
                    data: null,
                    resource: req.originalUrl,

                })
            }
        }catch(err){
            res.status(400).json({
                success: false,
                code: 400,
                message: err.message,
                error: err,
                data: null,
                resource: req.originalUrl,
              });
        }
    }
    const updatedUser={
        email:req.body.email
    }
    console.log(updatedUser);
    try{
        const userUP=await user_model.findById(dataid)
        userUP.email=email
        const updatedUse=await userUP.save()
        
        return res.status(200).send({
            success:true,
            code:200,
            message:"updated-succesfully",
            data:{updated:updatedUse},
            resource:req.originalUrl
        })
    }catch(err){
        return res.send(err.message)
    }

}

const userDelete=async (req,res)=>{
    const userid=req.params.id
    if(!isValidObjectId(userid)){
        return res.status(400).json({
            success:false,
            code:400,
            meessage:"user id INVALID",
            data:null,
            error:"Invalid id",
            resource:req.url
        })
    }
    try{
        const deleted=await user_model.findOne({_id:userid,isDeleted:false})
        console.log(deleted);
        if(!deleted){
            return res.status(400).json({
                success:false,
                code:400,
                meessage:"user id is deleted or not found",
                data:null,
                error:"Invalid id",
                resource:req.url
            })
        }
        deleted.isDeleted = true
        deleted.deletedAt = new Date().toISOString()
        await deleted.save()
        return res.status(200).json({
            success:true,
            code:200,
            message:"user deleted succesfully",
            data:{user:deleted},
            error:null,
            resource:req.originalUrl
        })
    }catch(err){
        return res.status(500).send({
            success:false,
            code:500,
            meessage:err.message,
            data:null,
            error:err,
            resource:req.url
        })
    }
}




    module.exports={
        getUsers,
        getUserbyId,
        createUser,
        userUpdate,
        userDelete
    }
