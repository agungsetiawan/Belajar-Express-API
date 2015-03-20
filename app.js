var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var dbConfig=require("./config/database");
var app=express();

mongoose.connect(dbConfig.url);

//app.use(bodyParser.urlencoded({"extended":true}));
app.use(bodyParser.json());

require("./routes/book")(app);

app.listen(1234);
console.log("listen on port 1234");