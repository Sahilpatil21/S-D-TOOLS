const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const URL = 'mongodb+srv://sahil09patil:3MBWlB6XrDwLRuwR@cluster0.dkdxri5.mongodb.net/Company?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(URL)
  .then(() => console.log('Connected to your database'))
  .catch(err => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use contact routes
const contactRoutes = require("./contact"); // make sure path is correct
app.use("/contact", contactRoutes); // All /contact routes handled by contact.js

// Other routes
app.get("/", (req, res) => res.render("Home", { user: null }));
app.get("/about", (req, res) => res.render("About"));
app.get("/register", (req, res) => res.render("Register"));
app.get("/login", (req, res) => res.render("Login"));
app.get("/products", (req, res) => res.render("Products"));
app.get("/services", (req, res) => res.render("Services"));

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
