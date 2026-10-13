const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    // Connected User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // VPN Server
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      required: true,
    },

    // Connection Status
    status: {
      type: String,
      enum: ["CONNECTED", "DISCONNECTED"],
      default: "CONNECTED",
    },

    // Public IP after connection
    ipAddress: {
      type: String,
      default: "",
    },

    // Device Information
    device: {
      type: String,
      default: "",
    },

    // Data Usage (MB)
    upload: {
      type: Number,
      default: 0,
    },

    download: {
      type: Number,
      default: 0,
    },

    // Connection Time
    connectedAt: {
      type: Date,
      default: Date.now,
    },

    disconnectedAt: {
      type: Date,
      default: null,
    },

    // Duration (Seconds)
    duration: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Connection", connectionSchema);