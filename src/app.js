const express = require("express");
const path = require("path");
require("./db/conn");
const Student = require('./models/register')
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000;

const static_path = (path.join(__dirname, "../public"));
const template_path = (path.join(__dirname, "../templates/views"));
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index")
});

app.get("/register", (req,res) => {
    res.render("register")
});

// Creating a new user

app.post("/register", async (req,res) => {
    try {
        console.log(req.body.username);
        const registerStudent = new Student({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: req.body.addr
        })
        const reg = await registerStudent.save();
        res.status(201).send("Registration Successful!!! We'll contact you soon");
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get("/login", (req,res) => {
    res.render("login")
});

app.post("/login", async (req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user_ = await Student.findOne({email:email});
        
        if(user_.password == password){
            res.status(201).send("Login Successful")
            console.log("login successful")
        }
        else{
            res.send("Wrong Credentials")
            console.log(user_.password)

        }

    } catch (error) {
        res.status(400).send("Invalid email")
    }
});

app.listen(port, () => {
    console.log("Express Running")
})