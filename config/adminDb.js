const mongoose = require("mongoose");

const db = async()=>{
  try {
    await mongoose.connect("mongodb+srv://TusharData:0123456789@cluster0.o1la21q.mongodb.net/E-commerce");
    console.log("Database is Connected..."); 
  } catch (error) {
    console.log("Database can't be Connected...");
  }
}

module.exports = db;