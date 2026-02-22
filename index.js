const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://mongo:27017/nutrition")
.then(()=>console.log("Mongo connected"))
.catch(err=>console.log(err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

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

app.post("/submit",(req,res)=>{
    let {height,weight}=req.body;
    let r=calculate(Number(height),Number(weight));

    res.json({bmi:r.bmi.toFixed(2),cal:r.calories,diet:r.diet});
});

app.listen(3000,()=>console.log("Server running"));