const jwt = require("jsonwebtoken");
const User = require("../module/User");


const authMiddleware = async (req, res, next) => {

    try {

        // Get token from header
        const authHeader = req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "No token provided"
            });

        }


        // Bearer TOKEN
        const token = authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({
                success:false,
                message:"Invalid token format"
            });

        }



        // Verify JWT

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );



        // Find user

        const user = await User.findById(decoded.id)
            .select("-password");



        if(!user){

            return res.status(404).json({
                success:false,
                message:"User not found"
            });

        }



        // Add user to request

        req.user = user;


        next();



    } catch(error) {


        return res.status(401).json({

            success:false,
            message:"Unauthorized Access",
            error:error.message

        });


    }

};


module.exports = authMiddleware;