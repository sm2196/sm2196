const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const path = require('path');
const app = express();
const port = 5000;

const db = mysql.createConnection
    ({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });

db.connect((error) => {
    if (error) { console.log(error) }
    else { console.log('Mysql Connected....') }
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    // res.send ("<h1>HOMEPAGE</h1>")
    res.render("index");
});

app.get("/profile", (req, res) => {
    // res.send ("<h1>HOMEPAGE</h1>")
    res.render("profile");
});

app.get("/signup", (req, res) => {
    // res.send ("<h1>HOMEPAGE</h1>")
    res.render("signup");
});

app.get("/login", (req, res) => {
    // res.send ("<h1>HOMEPAGE</h1>")
    res.render("login");
});

app.get("/logout", (req, res) => {
    // res.send ("<h1>HOMEPAGE</h1>")
    res.render("logout");
});

app.listen(port, () => { console.log(`Server started on port ${ port }`); })