const express = require("express");
const app = express();
const request = require("request");

        app.get("/", (req, res) => {
            res.render("search.ejs");
        });

        app.get("/results", (req, res) => {
            var search = req.query.name;
            request("http://www.omdbapi.com/?s="+search+"&apikey=thewdb", (error, response, body) => {
                if(!error && response.statusCode == 200){
                    const parsedData = JSON.parse(body);
                    //console.log(parsedData[0]);
                    console.log(search);
                    //res.redirect("")
                    res.render("home.ejs", {parsedData: parsedData.Search});
                }
            });
        });

        app.get("*", (req,res) => {
            res.send("ERR! 404 PAGE NOT FOUND!")
        });


        app.listen("3000", ()=>{
            console.log("server started on port 3000");
        });


