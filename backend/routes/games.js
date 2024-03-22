const express = require("express");

const games = require("../controllers/games");
const comments = require("../controllers/comments");

const router = express.Router();

//routes here
//Games
router.get("/getGames", games.getAllGames);

router.get("/getGames/:gametag", games.getGamerFavs);

router.get("/getGame/:game_id", games.getOneGame);

router.patch("/addToFavs/:gametag/:game_id", games.addToFavs);

//Comments
router.get("/getComments/:game_id", comments.getComments);

router.post("/comment/:game_id/:gametag", comments.addComment);

router.patch("/comment/:comment_id", comments.editComment);

router.patch("/delete-comment/:comment_id", comments.deleteComment);

module.exports = router;