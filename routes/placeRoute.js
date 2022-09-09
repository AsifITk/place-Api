let express = require('express');
const placeModel = require('../models/placeModel');
let router = express.Router();

// middleware that is specific to this router
// Create a place
// Get a specific place
// List places and filter them by name or city
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.post('/', async function (req, res) {
    const { name, city, state } = req.body;
    if (!name || !city || !state) {
        return res.status(400).json({ msg: "Please fill all fields" });
    }
    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w-]+/g, '')       // Remove all non-word chars
            .replace(/--+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
    let newPlace = new placeModel({
        name: name,
        city: city,
        state: state,
        slug: slugify(name + city + state)

    })
    await newPlace.save(async (err, place) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log(place)
            res.send(place)
        }

    })



});
// !search with slug

router.get("/:slug", async (req, res) => {
    try {
        let place = await placeModel.find({ slug: req.params.slug });
        return res.status(200).send(place);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

router.get('/city/:name', async (req, res) => {
    try {
        let place = await PlaceModel.find({ city: req.params.name });
        return res.status(200).send(place);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})


router.get('/name/:name', async (req, res) => {
    try {
        let place = await Place.find({ name: req.params.name });
        return res.status(200).send(place);
    } catch (e) {
        return res.send(e.message);
    }
})






module.exports = router;