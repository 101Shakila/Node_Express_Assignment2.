const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, userController.dashboard);
router.get('/g', authMiddleware, userController.gPage);
router.post('/g', authMiddleware, userController.updateCarInfo);
router.get('/g2', authMiddleware, userController.g2Page);
router.post('/g2', authMiddleware, userController.g2Post);

module.exports = router;
