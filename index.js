const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Mongo
mongoose.connect("mongodb://localhost:27017/nutrition")
.then(()=>console.log("Mongo connected"))
.catch(err=>console.log(err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Schema
const userSchema = new mongoose.Schema({
    height:Number,
    weight:Number,
    bmi:Number,
    calories:Number,
    diet:String
});
const User = mongoose.model("User", userSchema);

// Logic
function calculate(height,weight){
    let h=height/100;
    let bmi=weight/(h*h);
    let calories=weight*30;

    let diet="";
    if(bmi<18.5) diet="Eat banana milk nuts";
    else if(bmi<25) diet="Balanced diet roti dal sabji";
    else diet="Low carb salad protein";

    return {bmi,calories,diet};
}

// API
app.post("/submit", async (req,res)=>{
    let {height,weight}=req.body;
    let r=calculate(Number(height),Number(weight));

    await User.create({
        height,weight,
        bmi:r.bmi,
        calories:r.calories,
        diet:r.diet
    });

    res.json({bmi:r.bmi.toFixed(2),cal:r.calories,diet:r.diet});
});

app.listen(3000,()=>console.log("Server running on 3000"));