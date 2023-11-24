const mysql = require("mysql");   //variable declaration
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});


exports.signup = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirmed } = req.body;

  if (!name || !email || !password || !passwordConfirmed) {   
    return res.render("signup", { message: "All fields are required." });  
  }

  db.query(
    "SELECT email FROM userdata WHERE email=?",   
    [email],
    async (error, result) => {
      if (error) {   
        console.log(error);
        return res.render("signup", {
          message: "An error occurred while checking email availability.",
        });
      }

      if (result.length > 0) {   
        return res.render("signup", {
          message: "This email is already in use.",  
        });
      } else if (password !== passwordConfirmed) {   
        return res.render("signup", { message: "Passwords do not match." });   
      }

      let hashedPassword = await bcrypt.hash(password, 8);   
      console.log(hashedPassword);  

      db.query("INSERT INTO userdata SET ?", {  
        username: name,
        email: email,
        password: hashedPassword,
      });

      if (error) {     
        console.log(error);
      } else {   
        console.log(result);
        return res.render("signup", { message: "User Signed up" });
      }
    }
  );
};


exports.login = (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {   
    return res.render("login", { message: "Email and password are required." });  
  }

  db.query(
    "SELECT * FROM userdata WHERE email = ?",  
    [email],
    async (error, results) => {
      if (error) {  
        console.log(error);
        return res.render("login", { 
          message: "An error occurred while fetching user.",  
        });
      }

      if (results.length === 0) {  
        return res.render("login", {
          message: "Email or password is incorrect.", 
        });
      }

      const isPasswordMatch = await bcrypt.compare(   
        password,
        results[0].password
      );

      if (!isPasswordMatch) {    
        return res.render("login", {
          message: "Email or password is incorrect.",  
        });
      } else {
        console.log("User information:", results[0]);
        return res.render("profile", { user: results[0] }); 
      }
    }
  );
};


exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) { 
      console.error("Error destroying session:", error);  
      return res.status(500).send("Internal Server Error");
    }

    res.redirect("/logout");  
  });
};