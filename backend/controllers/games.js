const db = require("../config/db_config");

exports.getAllGames = async (req, res) => {
  const offset = req.params.offset;
  const sql = "SELECT * FROM games;"
  db.query(sql, (err, results) => {
    if (results.rowCount == 0) {
      res.status(400).json({ message: "No games found" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

exports.getCategories = async (req, res) => {};

exports.getOneGame = async (req, res) => {
  const game_id = req.params.game_id;

  const sql = "SELECT * FROM games where game_id = $1";
  db.query(sql, [game_id], (err, results) => {
    if (results.rowCount == 0) {
      res.status(400).json({ message: "No game found" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

exports.addToFavs = async (req, res) => {
  const { game_id, gametag } = req.params;

  const sql = "SELECT * FROM games where game_id = $1";
  db.query(sql, [game_id], (err, results) => {
    if (results.rowCount == 0) {
      res.status(400).json({ message: "No games found" });
    } else {
      db.query(
        "UPDATE gamers SET games = array_append(games, $1) where gametag = $2",
        [game_id, gametag],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(400).json({ message: "Query failed" });
          } else {
            res.status(200).json({ message: "Game added to favorites" });
          }
        }
      );
    }
  });
};

exports.getGamerFavs = async (req, res) => {
  const gametag = req.params.gametag;
  const sql = "SELECT games FROM gamers where gametag = $1";
  db.query(sql, [gametag], (err, results) => {
    if (results.rowCount == 0) {
      res.status(400).json({ message: "No games found" });
    } else {
      res.status(200).json(results.rows[0].games);
    }
  });
};
