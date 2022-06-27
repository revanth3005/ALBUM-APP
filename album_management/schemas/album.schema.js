const mongoose=require("mongoose");

const albumSchema=new mongoose.Schema(
    {  
        createdBy:{type:String,required:true},
        name:{type:String,required:true},
        description:{type:String,required:true},
        images:[{type:String,required:true,default:[]}],
        tags:[{type:String,default:[]}],
        deletedAt:{type:Date,default:null}
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("album",albumSchema)


//checking purpose----------------------=========================on postman
