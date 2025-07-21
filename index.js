const express = require("express");
const axios = require("axios")

const app = express();
const port = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// main route = this will be starting place of my app - it will use the index.ejs to show the webpage
app.get("/", (req, res) => {
    res.render("index");
});



app.listen(port, () => {
    console.log(`Listen on the port ${port}!`);
    console.log(`The app is now LIVE! Please head to http://localhost:${port}`);
})