const song = require("../models/song");

const router = require("express").Router();

//add songs
router.post("/createSongs", async (req, res) => {
    let newSongs;
    const existSongs = await song.findOne({ name: req.body.name })
    if (existSongs) {
        return res.status(400).send({ success: false, msg: "Songs is exist" });
    } else {
        newSongs = song({
            name: req.body.name,
            imageURL: req.body.imageURL,
            songURL: req.body.songURL,
            album: req.body.album,
            artist: req.body.artist,
            language: req.body.language,
            category: req.body.category
        })
    }

    try {
        const data = await newSongs.save();
        return res.status(200).send({ success: true, data });

    } catch (error) {
        return res.status(400).send({ success: false, msg: error });

    }
})

//edit songs
router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const option = {
        upsert: true,
        new: true
    }

    const result = await song.findOne(filter);
    if (result) {
        const data = await song.findOneAndUpdate(filter, {
            name: req.body.name,
            imageURL: req.body.imageURL,
            songURL: req.body.songURL,
            album: req.body.album,
            artist: req.body.artist,
            language: req.body.language,
            category: req.body.category
        }, option);
        return res.status(200).send({ success: true, data });
    } else {
        return res.status(400).send({ success: false, msg: "Songs isn't exist" });
    }
})

//delete songs
router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const result = await song.deleteOne(filter);
    if (result) {
        return res.status(200).send({ success: true, msg: "Data deleted successfully", data: result })
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" })
    }

})

//get one songs
router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await song.findOne(filter);
    if (data) {
        return res.status(200).send({ success: true, data })
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" })
    }
})

//get all
router.get("/getAll", async (req, res) => {
    const options = {
        // sort: {        }
    }

    const data = await song.find(options)
    if (data) {
        return res.status(200).send({ success: true, data })
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" })
    }
})

module.exports = router