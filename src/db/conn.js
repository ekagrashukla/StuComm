const mongoose = require('mongoose');
const dotenv=require('dotenv');
const express = require('express');

dotenv.config();
const uri = process.env.SECRET_URL

mongoose.connect(uri)
.then(()=>console.log("Connection to StudentAPI Database Successful.."))
.catch((err)=>console.log(err));