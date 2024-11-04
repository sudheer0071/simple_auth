const express = require('express');
const {
  signup,
  login,
  getUsers,
  getCurrentUser,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', authMiddleware, getUsers);
router.get('/current-user', getCurrentUser);
module.exports = router;
