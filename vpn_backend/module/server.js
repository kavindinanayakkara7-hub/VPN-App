require("dotenv").config();

const express = require("express");
const cors = require("cors");


// Database Connection
const connectDB = require("../config/db");

// const User = require("./module/User");


// Routes
const authRoutes = require("../routes/authRoutes");
const serverRoutes = require("../routes/serverRoutes");
const vpnRoutes = require("../routes/vpnRoutes");

console.log("authRoutes:", authRoutes);
console.log("serverRoutes:", serverRoutes);
console.log("vpnRoutes:", vpnRoutes);



const app = express();



// Connect MongoDB
connectDB();



// Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));




// Test Route

app.get("/", (req,res)=>{

    res.status(200).json({

        success:true,

        message:"VPN Backend API is Running 🚀"

    });

});




// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/servers", serverRoutes);

app.use("/api/vpn", vpnRoutes);




// 404 Error

app.use((req,res)=>{

    res.status(404).json({

        success:false,

        message:"API Route Not Found"

    });

});




// Server Start

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );

});