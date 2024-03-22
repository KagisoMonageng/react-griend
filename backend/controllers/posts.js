const db = require("../config/db_config");
exports.getAllPosts = async (req, res) => {
    const sql = "SELECT * FROM posts WHERE isDeleted = false";
    db.query(sql, (err, results) => {
        if (results.rowCount == 0) {
            res.status(400).json({ message: "No new posts" });
        } else {
            res.status(200).json(results.rows);
        }
    });
};

exports.addPost = async (req, res) => {
    const gametag = req.params.gametag;
    const { media, caption } = req.body;
    const created_on = new Date().toLocaleDateString();

    db.query("Select * from gamers where gametag = $1", [gametag], (gamerErr, gamerRes) => {
        if (gamerErr) {
            console.log(gamerErr)
            res.status(400).json({ message: "No user found with this gametag" })

        } else {
            const sql = "INSERT INTO posts (gametag,media,caption,created_on,isDeleted,gamer_image) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *"
            db.query(sql, [gametag, media, caption, created_on, false, gamerRes.rows[0].image], (err, result) => {

                if (err) {
                    console.log(err)
                    res.status(400).json({ message: "Failed to add post" })
                } else {
                    res.status(201).json({ message: "Post added successfully" })
                }
            })
        }
    })

}

exports.deletePost = async (req, res) => {
    const post_id = req.params.post_id;
    const sql = "UPDATE posts SET isDeleted = true WHERE post_id = $1"
    db.query(sql, [post_id], (err, result) => {

        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to delete post" })
        } else {
            res.status(201).json({ message: "Post deleted" })
        }
    })

}

exports.editPost = async (req, res) => {
    const post_id = req.params.post_id;
    const caption = req.body.caption;
    const sql = "UPDATE posts SET caption = $1 WHERE post_id = $2"
    db.query(sql, [caption, post_id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to edit post" })
        } else {
            res.status(201).json({ message: "Post edited" })
        }
    })

}
