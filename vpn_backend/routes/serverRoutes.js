const express = require("express");
const router = express.Router();

const Server = require("../models/Server");

const authMiddleware = require("../middleware/authMiddleware");


// Get all VPN servers

router.get("/", authMiddleware, async (req,res)=>{

    try{

        const servers = await Server.find();

        res.json({

            success:true,
            servers

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

});




// Add VPN Server (Admin)

router.post("/", authMiddleware, async(req,res)=>{

    try{


        const server = await Server.create(req.body);


        res.status(201).json({

            success:true,
            message:"Server Added",
            server

        });


    }catch(error){


        res.status(500).json({

            success:false,
            message:error.message

        });


    }


});



module.exports = router;