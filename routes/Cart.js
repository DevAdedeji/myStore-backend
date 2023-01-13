const express = require('express')
const router = express.Router();
const cartController = require('../controllers/Cart');


router.get('/', cartController.getAllCartItems)
router.post('/:slug', cartController.addToCart);
router.delete('/:id', cartController.removeFromCart)

module.exports = router;