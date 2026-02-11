const pool = require("../db/db");
// require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = process.env.SALT_ROUNDS;
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const [userQuery] = await pool.query("select * from users where email=?", [
      email,
    ]);
    console.log(userQuery[0]);
    const hashedPass = userQuery[0].password_hash;
    // console.log(hashedPass);
    try {
      const match = await bcrypt.compare(password, hashedPass);
      if (match) {
        const token = jwt.sign(
          {
            email: email,
            username: userQuery[0].name,
            id:userQuery[0].id
            
          },
          process.env.SECRET_KEY,
        );
        res.json({
          message: "login Success",
          token: token,
          user: {
            id: userQuery[0].id,
            name: userQuery[0].name,
            email: userQuery[0].email,
          },
        });
      } else {
        return res.status(401).send("Authotization Failed");
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
    return;
  }
}

/**@param {import('express').Request} req  */
async function Register(req, res) {
  // console.log(Number(saltRounds));
  //   console.log(req.body);
  try {
    const hashPass = await bcrypt.hash(req.body.password, Number(saltRounds));
    // console.log(hashPass);

    const [rows]=await pool.query("select name,email from users where name=? and email=?", [
      req.body.username,
      req.body.email,
    ]);

    if (rows.length > 0)
      return res.status(409).send("Email already Registered");

    await pool.query("INSERT INTO users(name,email,password_hash) VALUES(?,?,?)", [
      req.body.username,
      req.body.email,
      hashPass,
    ]);
    return res.status(200).send("User Successfully Registered");
  } catch (error) {
    

    return res.status(500).send("Email already Registered");
  }
}

module.exports = { Login, Register };
