const express = require("express");
const axios = require("axios")

const app = express();
const port = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const API_URL = "https://v2.jokeapi.dev/"

// main route = this will be starting place of my app - it will use the index.ejs to show the webpage
app.get("/", (req, res) => {
    const categoryOptions = [
        {id: 1, value: 'Any', label: 'Any'},
        {id: 2, value: 'Programming', label: 'Programming'},
        {id: 3, value: 'Miscellaneous', label: 'Misc'},
        {id: 4, value: 'Dark', label: 'Dark'},
        {id: 5, value: 'Pun', label: 'Pun'},
        {id: 6, value: 'Spooky', label: 'Spooky'},
        {id: 7, value: 'Christmas', label: 'Christmas'}
    ]

    const blacklistOptions = [
        {id: "b1", value: 'nsfw', label: 'nsfw'},
        {id: "b2", value: 'religious', label: 'religious'},
        {id: "b3", value: 'political', label: 'political'},
        {id: "b4", value: 'racist', label: 'racist'},
        {id: "b5", value: 'sexist', label: 'sexist'},
        {id: "b6", value: 'explicit', label: 'explicit'}
    ]

    const dataToSend = {
        firstData: categoryOptions,
        secondData: blacklistOptions
    }

    res.render("index", dataToSend);
});





app.listen(port, () => {
    console.log(`Listen on the port ${port}!`);
    console.log(`The app is now LIVE! Please head to http://localhost:${port}`);
})