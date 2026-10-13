const mongoose = require("mongoose");


const vpnConnectionSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    serverName:{
        type:String,
        required:true
    },


    location:{
        type:String,
        required:true
    },


    status:{
        type:String,
        enum:[
            "connected",
            "disconnected"
        ],
        default:"disconnected"
    },


    connectedAt:{
        type:Date,
        default:Date.now
    }


});


module.exports = mongoose.model(
    "VPNConnection",
    vpnConnectionSchema
);