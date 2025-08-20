const express = require("express");
const axios = require("axios")

const app = express();
const port = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const API_URL = "https://v2.jokeapi.dev/joke"

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
        secondData: blacklistOptions,
        joke: null
    }

    res.render("index", dataToSend);
});


app.post("/response", async (req, res) => {
    try {
        let categoryChoices = req.body.category;
        let blackListChoices = req.body.blacklistCategory || [];

        if (!Array.isArray(categoryChoices)) {
            categoryChoices = [categoryChoices];
        }

        if (!Array.isArray(blackListChoices)) {
            blackListChoices = [blackListChoices];
        }

        // this is to determine if Any is chosen or not
        // if Any chosen, does NOT require the rest
        if (categoryChoices.includes("Any")) {
            categoryPath = "Any";
        }
        else {
            categoryPath = categoryChoices.join(",");
        }

        // this would determine adding the options checked for the blacklist flags because it seems to be optional
        // if one or more choices are selected, they are added to the URL sent, if NONE --> then nothing is attached
        let url = `${API_URL}/${categoryPath}`;
        if (blackListChoices.length > 0) {
            url += `?blacklistFlags${blackListChoices.join(',')};`
        }

        const result = axios.get(url);
        console.log(result);

        res.render("index", {
            firstData: categoryChoices,
            secondData: blackListChoices,
            joke: result
        });
    }
    catch (err) {
        res.render("index.ejs", { err: "No activities matched your criteria!" })
    }
})


app.listen(port, () => {
    console.log(`Listen on the port ${port}!`);
    console.log(`The app is now LIVE! Please head to http://localhost:${port}`);
})