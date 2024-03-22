const jwt = require("jsonwebtoken");
const transporter = require("../config/email.config")
const db = require("../config/db_config");

const { randomInt } = require("crypto");

emailDetails = {
  from: "griend.gamer@zohomail.com", //where the email is from
  to: "", //where the email is to
  subject: "", //email subject
  text: "", //email
};

const image =
  "https://res.cloudinary.com/dev-lab/image/upload/v1669475311/vecteezy_game-shop-vector-logo-design-shopping-bag-combination_10949766_hgwhg1.jpg";
users = [];

exports.register = async (req, res) => {
  const { email, password, name, surname, gender, birthday } = req.body;

  const sql = "SELECT * FROM gamers WHERE email = $1";
  db.query(sql, [email], (err, results) => {
    if (results.rowCount == 0) {
      let number = Math.floor(Math.random() * (2000 - 100) + 100);
      let gametag = name.toLowerCase() + number;

      db.query(
        "INSERT INTO gamers (name,surname,email,password,gender,image,birthday,gametag) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
        [name, surname, email, password, gender, image, birthday, gametag],
        (db_err, results) => {
          if (db_err) {
            res.status(400).json({ message: db_err.message });
          } else {
            
            const token = jwt.sign(
              {
                gamer_id: results.rows[0].gamer_id,
                email: results.rows[0].email,
                gametag: results.rows[0].gametag,
                name: results.rows[0].name,
                surname: results.rows[0].surname,
                image: results.rows[0].image,
              },
              'iwgiuwfbocw cwo78wc7tcuwiob73obfcwiygcwyicb',
              {
                algorithm: "HS256",
                expiresIn: '24h',
              }
            );

            emailDetails.to = results.rows[0].email;
            emailDetails.text =
              "Welcome! " +
              results.rows[0].name +
              "\n\nThis is your generated gametag \n" +
              results.rows[0].gametag +
              "\nUse it to sign in to your account along with your password. \n\nGriend\nYour Gamer Friend.";
            emailDetails.subject = "Welcome to Griend";

            transporter.sendMail(emailDetails, (emailErr) => {
              if(emailErr)
              {
                console.log(emailErr)
                res.status(400).json({
                  message: "Error sending email"
                })
              }else{
                res.status(200).json({
                  message: "Account successully registered",
                  token: token
                }); 
              }
            });
            
            db.query(
              "UPDATE gamers SET games = array_append(games, $1) where gametag = $2",
              [0, results.rows[0].gametag],
              (err, results) => {
                if (err) {
                  console.log(err);
                }
              }
            );

          }
        }
      );
    } else {
      res.status(400).json({ message: "Email already exists." });
    }
  });
};

exports.login = async (req, res) =>  {
  const { cred, password } = req.body;
  const sql = "SELECT * FROM gamers WHERE email = $1 OR gametag = $1";
  db.query(sql, [cred], (err, results) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      if (results.rowCount == 0) {
        res
          .status(400)
          .json({ message: "User does not exist, Please register" });
      } else {
        if (password != results.rows[0].password) {
          res
            .status(400)
            .json({ message: "Invalid Credentials, Please try again" });
        } else {
          const token = jwt.sign(
            {
              gamer_id: results.rows[0].gamer_id,
              email: results.rows[0].email,
              gametag: results.rows[0].gametag,
              name: results.rows[0].name,
              surname: results.rows[0].surname,
              image: results.rows[0].image,
            },
            'sfnbowsnbfwnvksnpkvnsivosiopv8t6w8gvownbvop',
            {
              algorithm: "HS256",
              expiresIn: '24h',
            }
          );

          res.status(200).json({
            message: "Welcome! " + results.rows[0].name,
            token: token,
          });
        }
      }
    }
  });
};

exports.searchGamers = (req, res) => {
  const currentGamer = req.params.gametag;

  const sql = "SELECT * FROM gamers WHERE gametag != $1";
  db.query(sql, [currentGamer], (err, results) => {
    if (err) {
      res.status(400).json({ message: "Query failed" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.getOneGamer = (req, res) => {
  const gametag = req.params.gametag;
  const sql = "SELECT * FROM gamers WHERE gametag = $1";
  db.query(sql, [gametag], (err, results) => {
    if (err) {
      res.status(400).json({ message: "Query failed" });
    } else {
      if (results.rowCount == 0) {
        res.status(400).json({ message: "No gamer found" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  });
};

exports.forgotPassword = (req, res) => {
  const email = req.body.email;
  const sql = "SELECT * FROM gamers WHERE email = $1";
  db.query(sql, [email], (err, results) => {
    if (results.rowCount == 0) {
      res
        .status(400)
        .json({ message: "No gamer registered with this email address" });
    } else {
      emailDetails.to = results.rows[0].email;
      emailDetails.text =
        "Good day " +
        results.rows[0].name +
        "\n\nAs per request, please find your gametag and password below \nGametag: " +
        results.rows[0].gametag +
        "\nPassword: " +
        results.rows[0].password +
        "\nUse the credentials to sign in to your account. \n\nGriend\nYour Gamer Friend.";

      emailDetails.subject = "Credentials request";

      transporter.sendMail(emailDetails, (emailErr) => {
        if (emailErr) {
          res.status(400).json(emailErr);
        } else {
          res.status(200).json({
            message:
              "Your password has been sent to your to your email address",
          });
        }
      });
    }
  });
};

exports.updateImage = async (req, res) => {
  const link = req.body.link;
  const gametag = req.params.gametag;

  db.query(
    "UPDATE gamers SET image = $1 WHERE gametag = $2 RETURNING *",
    [link, gametag],
    (err, results) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        const token = jwt.sign(
          {
            gamer_id: results.rows[0].gamer_id,
            email: results.rows[0].email,
            gametag: results.rows[0].gametag,
            name: results.rows[0].name,
            surname: results.rows[0].surname,
            image: results.rows[0].image,
          },
          process.env.SECRET_KEY,
          {
            algorithm: "HS256",
            expiresIn: '24h',
          }
        );
        res.status(200).json({
          message: "Your profile picture was updated successfully",
          token: token,
        });
      }
    }
  );
};

exports.updateGamer = async (req, res) => {
  const gametag = req.params.gametag;

  const { password, name, surname } = req.body;
  db.query(
    "UPDATE gamers SET password = $1 ,name = $2 ,surname = $3 WHERE gametag = $4 RETURNING *",
    [password, name, surname, gametag],
    (error, results) => {
      if (error) {
        res.status(400).json({ message: "Query failed" });
      } else {
        const token = jwt.sign(
          {
            gamer_id: results.rows[0].gamer_id,
            email: results.rows[0].email,
            gametag: results.rows[0].gametag,
            name: results.rows[0].name,
            surname: results.rows[0].surname,
            image: results.rows[0].image,
          },
          process.env.SECRET_KEY,
          {
            algorithm: "HS256",
            expiresIn: '24h',
          }
        );
        res.status(200).json({
          message: "Your profile was updated successfully",
          token: token,
        });
      }
    }
  );
};




