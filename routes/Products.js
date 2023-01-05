const express = require('express')
const router = express.Router();
const productController = require('../controllers/Products')

router.get('/', productController.getAllProducts);
router.get('/:slug', productController.getAProduct);
router.put('/:slug', productController.updateAProduct);
router.delete('/:slug', productController.deleteAProduct);
router.post('/add-product', productController.createAProduct);


module.exports = router