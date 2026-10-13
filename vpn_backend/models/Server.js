const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    ipAddress: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    port: {
        type: Number,
        default: 1194
    },

    protocol: {
        type: String,
        default: "WireGuard"
    },

    status: {
        type: String,
        default: "active"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model("Server", serverSchema);