const express = require("express");
const app = express();
require("dotenv/config");

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

//user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

//Artist routes
const artistRoute = require("./routes/artist");
app.use("/api/artist/", artistRoute);

//Albums routes
const albumRoute = require("./routes/album");
app.use("/api/albums/", albumRoute);

//Songs routes
const songsRoute = require("./routes/songs");
app.use("/api/songs/", songsRoute);

//connect mongodb
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });

mongoose.connection
    .once("open", () => console.log("Connected"))
    .on("error", (error) => console.log(`ERROR: ${error}`));

app.listen(4000, () => console.log("Listening on port 4000"));
