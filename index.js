const { faker } = require('@faker-js/faker');
const mysql=require('mysql2');
const express = require("express");
const app =express();
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'Shravani143@'
  });



  let getRandomUser=()=> {
    return [
       faker.string.uuid(),
       faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
       faker.internet.password(),
    ];
  }

// let q="INSERT INTO user(id,username,email,password) VALUES ?";
// let data =[];
// for(let i =1 ;i<=100; i++){
//   data.push(getRandomUser());
// }

 

  // connection.end();
app.get("/",(req,res)=>{
  let q =`SELECT count(*)FROM user;`
   try{
    connection.query(q,(err,result)=>{
        if(err)throw err;
        let count=(result[0]["count(*)"]);
        res.render("home.ejs",{count});
    });

  }catch(err){
    console.log(err);
    res.send("success")
  }
 
})

app.listen(8080,()=>{
  console.log("server is listening to the port")
})