const port = process.env.PORT || 3000;
var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var morgan = require("morgan");
var bodyParser = require("body-parser");
var router = express.Router();
var appRoutes = require("./app/routes/api")(router);
const mongoose = require("mongoose");
var mongodbUri = "mongodb://@ds347467.mlab.com:47467/abits-db";
const redis = require("redis");
const client = redis.createClient();
app.use(morgan("dev"));

app.use(function (req, res, next) {
  var allowedOrigins = ['http://localhost:8080']
  var origin = req.headers.origin
  console.log(origin)
  if (allowedOrigins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, HEAD')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, x-access-token, Content-Type, Accept-Ranges'
  )
  next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", appRoutes);

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  auth: {
    user: "rashid",
    password: "qwerty123"
  }
});
var conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));

conn.once("open", () => {
  console.log("connected to adatabase");
});

app.get("*", function(req, res) {
  res.send("Welcome, from backend!!");
});

io.on("connection", function(socket) {
  socket.on('userJoined', function(user){
    console.log('User joined: ', JSON.stringify(user));
    client.set(user.email, JSON.stringify(user));
    socket.emit('userJoined', user)
  });
  socket.on("disconnect", function(socket) {
    console.log("user disconnected", socket.id);
    io.emit('userLeft')
  });
});

http.listen(port, () => console.log(`App listening on port ${port}!`));
