const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    try {
         if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
      }
        await mongoose.connect(process.env.MONGO_URI);

        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected Successfully")
        })

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected")
        })

        mongoose.connection.on("error", (err) => {
            console.log("MongoDB error", err)
        })

    } catch (error) {
        console.log("Error while connecting to mongodb", error)
    }
} 

module.exports = connectDB;