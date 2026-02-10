const router = require('express').Router();
const { Favorite } = require('../models'); 

router.get('/', async (req, res) => {
  try {
    // 1. Get all favorites from the database
    const favoriteData = await Favorite.findAll();

    // 2. Serialize data so Handlebars can use it
    const favorites = favoriteData.map((fav) => fav.get({ plain: true }));

    // 3. Render 'homepage' and pass the favorites array
    res.render('homepage', { 
      favorites,
      // logged_in: req.session.logged_in (We can add this later)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;