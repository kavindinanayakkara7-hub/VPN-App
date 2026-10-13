const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");

const Connection = require("../module/Connection");




// ===============================
// CONNECT VPN
// ===============================

router.post(
    "/connect",
    authMiddleware,
    async(req,res)=>{


        try{


            const {
                serverId
            } = req.body;



            if(!serverId){

                return res.status(400).json({

                    success:false,

                    message:"Server ID is required"

                });

            }



            // Check already connected

            const activeConnection =
            await Connection.findOne({

                user:req.user._id,

                status:"CONNECTED"

            });



            if(activeConnection){


                return res.status(400).json({

                    success:false,

                    message:"VPN is already connected"

                });


            }




            const connection =
            await Connection.create({


                user:req.user._id,


                server:serverId,


                status:"CONNECTED",


                connectedAt:new Date()


            });





            res.status(200).json({


                success:true,


                message:"VPN Connected Successfully",


                connection


            });



        }
        catch(error){


            res.status(500).json({

                success:false,

                message:error.message

            });


        }


    }

);









// ===============================
// DISCONNECT VPN
// ===============================


router.post(
    "/disconnect",
    authMiddleware,
    async(req,res)=>{


        try{


            const connection =
            await Connection.findOne({


                user:req.user._id,


                status:"CONNECTED"


            });





            if(!connection){


                return res.status(404).json({

                    success:false,

                    message:"No Active VPN Connection"

                });


            }






            connection.status="DISCONNECTED";


            connection.disconnectedAt=new Date();



            await connection.save();





            res.status(200).json({


                success:true,


                message:"VPN Disconnected Successfully"



            });




        }
        catch(error){



            res.status(500).json({


                success:false,

                message:error.message


            });



        }



    }

);









// ===============================
// GET VPN STATUS
// ===============================


router.get(
    "/status",
    authMiddleware,
    async(req,res)=>{


        try{


            const connection =
            await Connection.findOne({


                user:req.user._id


            })
            .sort({

                connectedAt:-1

            })
            .populate(
                "server"
            );




            res.json({


                success:true,


                connection



            });




        }
        catch(error){



            res.status(500).json({


                success:false,

                message:error.message


            });



        }



    }

);








module.exports = router;