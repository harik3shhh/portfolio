require("dotenv").config();
const express = require ("express");
const app = express();
require("./db/conn");
const authRouter = require("./routes/auth-route");
const categoryRoutes = require("./routes/category-route");
const placeRoutes = require("./routes/place-route")
const formidable = require("express-formidable");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT;

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use(formidable());
app.use("/api/v1/place", placeRoutes);

app.get("/", (req, res)=>{
    res.send("home");
});

app.use(express.static(path.join(__dirname, "./client/build")))
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
