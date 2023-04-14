// const express= require("express");

// const bodyParser=require("body-parser");
// const mongoose=require("mongoose");

// const ejs=require("ejs");



// const app=express();
// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

// mongoose.connect('mongodb://127.0.0.1:27017/userDB');


// const userSchema={
//     email: String,
//     password:String
// }


// const User=new mongoose.model("User", userSchema)






//   // Route definitions



//   app.get("/", (req,res)=>{
//     res.render("home")
//   });

//   app.get("/login" , (req, res)=>{
//     res.render("login")
//   });

//   app.get("/register" ,(req ,res) =>{
//     res.render("register")
//   });

//   app.post("/register",(req ,res)=>{
//     res.render("secrets")
//   });

//   app.post("/register", (req,res)=>{
//     const newUser= new User({
//       email: req.body.username,
//       password: req.body.pssword
//     })
//     newUser.save(function(err){
//       if(err){
//          console.log(err) 
//       }else{
//           res.render("secrets")
//       }
//     })
//   });

//   app.post("/login",(req, res)=>{
//     const username=req.body.username;
//     const password=req.body.password;

//     User.findOne({email: username}).exec()
//       .then(function(foundUser){
//         if(foundUser){
//           if(foundUser.password===password){
//             res.render("secrets");
//           }
//         }
//       })
//       .catch(function(err){
//         console.log(err);
//       });
//   });



// // app.post("/login",(req, res)=>{
// //     const username=req.body.username;
// //     const password=req.body.password;


// //     User.findOne({email: username}, function(err,foundUser){
// //         if(err){
// //             console.log(err)
// //         }else{
// //             if(foundUser){
// //                 if(foundUser.password===password){
// //                 res.render("secrets");
// //                 }
// //             }
// //         }
// //     })

// // })







// //the ccck         


// app.post("/login",(req, res)=>{




//     const username=req.body.username;
//     const password=req.body.password;

//     User.findOne({email: username}).exec()
//         .then(function(foundUser){
//             if(foundUser){
//                 if(foundUser.password===password){
//                 res.render("secrets");
//                 }
//             }
//         })
//         .catch(function(err){
//             console.log(err);
//         });
// });


// app.listen(1010, function(error) {
//     if (error) {
//        console.log(error);
//    } else {
//         console.log("Server is running on port 1010");
//    }})




//new code


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bcrypt=require("bcrypt");
const path = require("path");

// ...
const app = express();
app.set("view engine", "ejs"); // Set the view engine to ejs
 app.set("views", path.join(__dirname, "/views")); // Set the path to the views directory
const saltRounds = 10;







app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = new mongoose.model("User", userSchema);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//    // res.status(500).send("Something broke!");
// });

// Route definitions
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("tes");
});

app.get("/tes", (req, res) =>{
    let errorMessage = "User not found";
      
    res.render("tes", { errorMessage: "" });       
        
})

app.post("/tes", (req, res)=>{
    
  
    res.render("register")
})

app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.username, 
            password: hash 
    
          
        });
        newUser.save()
            .then(function () {
                res.render("secrets");
            })
            .catch(function (err) {
                console.log(err);
                
            });
    });
   
});


app.post("/login", (req, res,next ) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username })
        .exec()
        
        .then(function (foundUser) {
            if (foundUser ) {
                bcrypt.compare(password, foundUser.password, function(err, result) {
                 if(result == true){
                  
                    res.render("secrets");
                    
                 }
                });
               
            } else {
          
              
                res.render("tes", { errorMessage: "User not found" });
                
                
                
               
            }
        })
        .catch(next);
})






app.listen(1011, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is running on port 1010");
    }
    
}) 
