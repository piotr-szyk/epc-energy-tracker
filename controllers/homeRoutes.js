const router = require('express').Router();
const { Favorite, Recommendation } = require('../models'); 

router.get('/', async (req, res) => {
  try {
    // 1. Get all favorites AND their associated recommendations
    const favoriteData = await Favorite.findAll({
      include: [
        {
          model: Recommendation,
          // This ensures we get the description and cost for each property
        }
      ]
    });

    // 2. Serialize data
    // Because we used 'include', fav.get({ plain: true }) will 
    // now automatically include a 'recommendations' array inside each favorite object.
    const favorites = favoriteData.map((fav) => fav.get({ plain: true }));

    // 3. Render 'homepage'
    res.render('homepage', { 
      favorites,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;