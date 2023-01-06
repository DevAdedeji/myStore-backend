const express = require('express')
const router = express.Router();
const productController = require('../controllers/Products')
const upload = require('../multer');

router.get('/', productController.getAllProducts);
router.get('/:slug', productController.getAProduct);
router.put('/:slug', productController.updateAProduct);
router.delete('/:slug', productController.deleteAProduct);
router.post('/add-product',upload.single('file') ,productController.createAProduct);
// router.delete('/', productController.deleteAllProducts);

module.exports = router