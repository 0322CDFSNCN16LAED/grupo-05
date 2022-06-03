const express = require("express");
const productController = require('../controllers/productController')

let router = express.Router();

router.get('/options', productController.options);
router.get('/detail/:id', productController.detail)

module.exports = router;