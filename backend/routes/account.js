const express = require("express");
const gamer = require("../controllers/account");
const games = require("../controllers/games");
const comments = require("../controllers/comments");

const router = express.Router();

//Authorization
router.post("/register", gamer.register);
router.post("/login", gamer.login);

//User Functions


router.get("/searchGamers/:gametag", gamer.searchGamers);

router.get("/search/:gametag", gamer.getOneGamer);

router.post("/forgotPassword", gamer.forgotPassword);

router.patch("/update/:gametag", gamer.updateGamer);

router.patch("/updateProfilePicture/:gametag", gamer.updateImage);

module.exports = router;
