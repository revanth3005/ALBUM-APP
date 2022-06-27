const mongoose=require("mongoose");

const albumNameSchema=new mongoose.Schema(
    {  
        name:{type:String,required:true},
        description:{type:String,required:true},
        images:[{type:String,required:true}],
        createdBy:{type: mongoose.SchemaTypes.ObjectId, ref: "users"},
        tags:[{type:String,default:[]}],
        deletedAt:{type:String,default:null},
        isDeleted:{type:Boolean,default:false}
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("albumNames",albumNameSchema)



