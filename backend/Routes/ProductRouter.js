
const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth')




router.get('/', ensureAuthenticated, (req, res) => {
  console.log('-----  logged in user detain -------',req.user)
  res.status(200).json([
    {
      name: "mobile",
      price: 5000,
      description: "A powerful smartphone"
    },
    {
      name: "tv",
      price: 20000,
      description: "best tv"
    },



  ])
});




module.exports = router
