const router = require('express').Router();
const axios = require('axios');
const encodeAPIKey = require('../../utils/epc-auth');
// ADD Recommendation to the import list!
const { Favorite, User, Recommendation } = require('../../models');

// 1. POST Search - (Remains the same)
router.post('/', async (req, res) => {
  try {
    const { postcode } = req.body;
    const authHeader = {
      'Authorization': `Basic ${encodeAPIKey()}`,
      'Accept': 'application/json'
    };

    const response = await axios.get(`https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${postcode}`, { headers: authHeader });
    const properties = response.data.rows;

    const enhancedProperties = await Promise.all(properties.slice(0, 10).map(async (prop) => {
      try {
        const recRes = await axios.get(`https://epc.opendatacommunities.org/api/v1/domestic/recommendations/${prop['lmk-key']}`, { headers: authHeader });
        return { ...prop, recommendations: recRes.data.rows };
      } catch (err) {
        return { ...prop, recommendations: [] };
      }
    }));

    res.json(enhancedProperties);
  } catch (err) {
    console.error('Search Error:', err);
    res.status(500).json({ message: 'Error fetching from Government API' });
  }
});

// 2. POST Save - UPDATED to handle Recommendation mapping
router.post('/save', async (req, res) => {
  try {
    await User.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: 'Demo User',
        email: 'demo@test.com',
        password: 'password123'
      }
    });

    // We take the recommendations array from the frontend and map it
    // to match our Recommendation model column names (description, indicative_cost)
    const recommendationData = req.body.recommendations ? req.body.recommendations.map(rec => ({
      description: rec['improvement-descr-text'],
      indicative_cost: rec['indicative-cost']
    })) : [];

    const newFav = await Favorite.create({
      address: req.body.address,
      postcode: req.body.postcode,
      current_rating: req.body.current_rating,
      current_score: req.body.current_score,
      potential_rating: req.body.potential_rating,
      potential_score: req.body.potential_score,
      lmk_key: req.body.lmk_key,
      user_id: 1,
      // Pass the mapped array here
      recommendations: recommendationData 
    }, {
      // VITAL: This tells Sequelize to create records in the Recommendation table too
      include: [Recommendation] 
    });

    res.status(200).json(newFav);
  } catch (err) {
    console.error('Save Error:', err);
    res.status(500).json(err);
  }
});

// 3. DELETE remains the same
router.delete('/:id', async (req, res) => {
  try {
    const favoriteData = await Favorite.destroy({ where: { id: req.params.id } });
    if (!favoriteData) {
      res.status(404).json({ message: 'No property found with this id!' });
      return;
    }
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;