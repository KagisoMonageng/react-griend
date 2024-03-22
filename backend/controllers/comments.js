const db = require("../config/db_config");

exports.getComments = async (req, res) => {
  const game_id = req.params.game_id;

  const sql = "SELECT * FROM comments where game_id = $1 and hidden = $2";
  db.query(sql, [game_id, false], (err, results) => {
    if (err) {
      res.status(400).json({ message: "Database connection error" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.addComment = async (req, res) => {
  const { game_id, gametag } = req.params; //saved in the sessionStorage
  const { comment, date, image } = req.body;
  //console.log(req.body);

  const sql =
    "Insert INTO comments (game_id,gametag,comment,date,image,hidden) VALUES ($1,$2,$3,$4,$5,$6)";
  db.query(
    sql,
    [game_id, gametag, comment, date, image, false],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Database connection error" });
      } else {
        res.status(200).json({ message: "Comment posted" });
      }
    }
  );
};

exports.editComment = async (req, res) => {
  const { comment_id } = req.params; //saved in the sessionStorage
  const { comment } = req.body;

  const sql = "Update comments SET comment = $2 where comment_id = $1";
  db.query(sql, [comment_id, comment], (err, results) => {
    if (err) {
      res.status(400).json({ message: "Database connection error" });
    } else {
      res.status(200).json({ message: "Comment edited" });
    }
  });
};

exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params; //saved in the sessionStorage

  const sql = "Update comments SET hidden = $2 where comment_id = $1";
  db.query(sql, [comment_id, true], (err, results) => {
    if (err) {
      res.status(400).json({ message: "Database connection error" });
    } else {
      res.status(200).json({ message: "Comment deleted" });
    }
  });
};
