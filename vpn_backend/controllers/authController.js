const User = require("../module/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =====================
// REGISTER
// =====================

const register = async(req,res)=>{

    try{


        const {
            name,
            email,
            password
        } = req.body;



        if(!name || !email || !password){

            return res.status(400).json({

                success:false,
                message:"Please fill all fields"

            });

        }



        const existUser = await User.findOne({
            email
        });



        if(existUser){

            return res.status(400).json({

                success:false,
                message:"Email already exists"

            });

        }



        const hashPassword = await bcrypt.hash(
            password,
            10
        );



        const user = await User.create({

            name,
            email,
            password:hashPassword

        });



        res.json({

            success:true,

            message:"Registration Successful",

            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }

        });



    }
    catch(error){


        res.status(500).json({

            success:false,
            message:error.message

        });


    }


};







// =====================
// LOGIN
// =====================


const login = async(req,res)=>{


    try{


        const {
            email,
            password
        } = req.body;



        const user = await User.findOne({

            email

        });



        if(!user){


            return res.status(404).json({

                success:false,
                message:"User not found"

            });


        }





        console.log(
            "ENTER PASSWORD:",
            password
        );


        console.log(
            "DATABASE HASH:",
            user.password
        );




        const match = await bcrypt.compare(

            password,

            user.password

        );



        console.log(
            "PASSWORD MATCH:",
            match
        );





        if(!match){


            return res.status(400).json({

                success:false,

                message:"Invalid password"

            });


        }






        const token = jwt.sign(

            {
                id:user._id,
                role:user.role
            },


            process.env.JWT_SECRET,


            {
                expiresIn:"7d"
            }


        );






        res.json({

            success:true,

            message:"Login Successful",


            token,


            user:{


                id:user._id,

                name:user.name,

                email:user.email,

                role:user.role


            }


        });





    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }



};






module.exports={

    register,
    login

};