const jwt=require("jsonwebtoken")
const model_user=require("../schemas/user.schema")

const bcrypt=require('bcrypt')
const{
    isValidString,
    isValid,
    isValidObject,
    isValidEmail
    }=require("../utils/validators")




    const login=async (req,res)=>{
        const data=req.body;
        console.log(data);
        if(!isValid(data) || !isValidObject(data)){
            return res.status(500).send({
                success:false,
                code:500,
                message:"provide required-details",
                error:"invalid format",
                data:null,
                resource:req.originalUrl
            })
        }
        if(!isValid(data.email) || !isValidEmail(data.email)){
            return res.status(500).send({
                success:false,
                code:500,
                message:"provide email",
                error:"invalid format",
                data:null,
                resource:req.originalUrl
            })
        }
        if(!isValid(data.password) || !isValidString(data.password)){
            return res.status(500).send({
                success:false,
                code:500,
                message:"provide password",
                error:"provide a valid password or invalid",
                data:null,
                resource:req.originalUrl
            })
        }
        try{
            const user= await model_user.findOne({email:data.email})
            if(!user){
             return res.status(500).send({
                 success:false,
                 code:500,
                 message:`user email details not found `,
                 error:"error",
                 data:null,
                 resource:req.url
             })
            }
          const pass= await bcrypt.compare(data.password,user.password) 
            if(!pass){
             return res.status(500).send({
                 success:false,
                 code:500,
                 message:`user password details not found `,
                 error:"invalid password",
                 data:null,
                 resource:req.url
             })
            }
            const token=jwt.sign({userId:user._id},"sai-revanth-neelam")
            return res.status(200).send({
             success:true,
             code:200,
             message:`LOGIN SUCCESSFUL`,
             error:null,
             data:{user,token},
             resource:req.url
            })
         }catch(err){
             console.log(err)
             return res.status(500).send({
                 success:false,
                 code:500,
                 message:err.message,
                 error:err,
                 data:null,
                 resource:req.url
             })
         }

    }


    module.exports.login=login
