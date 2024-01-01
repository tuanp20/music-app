const album = require("../models/album");

const router = require("express").Router();


//add album
router.post("/createAlbum", async (req, res) => {
    let newAlbum;
    const existAlbum = await album.findOne({ name: req.body.name })
    if (existAlbum) {
        return res.status(400).send({ success: false, msg: "Album is exist" });
    } else {
        newAlbum = album({
            name: req.body.name,
            imageURL: req.body.imageURL,
        })
    }

    try {
        const data = await newAlbum.save();
        return res.status(200).send({ success: true, data });

    } catch (error) {
        return res.status(400).send({ success: false, msg: error });

    }
})

//edit album
router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const option = {
        upsert: true,
        new: true
    }

    const result = await album.findOne(filter);
    if (result) {
        const data = await album.findOneAndUpdate(filter, {
            name: req.body.name,
            imageURL: req.body.imageURL
        }, option);
        return res.status(200).send({ success: true, data });
    } else {
        return res.status(400).send({ success: false, msg: "Album isn't exist" });
    }
})

//delete album
router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const result = await album.deleteOne(filter);
    if (result) {
        return res.status(200).send({ success: true, msg: "Data deleted successfully", data: result })
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" })
    }

})

//get one album
router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await album.findOne(filter);
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

    const data = await album.find(options)
    if (data) {
        return res.status(200).send({ success: true, data })
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" })
    }
})


module.exports = router