const express = require("express");
const router = express.Router();

const tagController=require('../Controllers/TagController');
const authController=require('../Controllers/AuthController');


router.get('/getall',tagController.getAllTag);
router.post('/add',tagController.addTag);
router.delete('/delete/:id',tagController.deleteTag);
router.get('/get/:id',tagController.getTag);
module.exports = router;