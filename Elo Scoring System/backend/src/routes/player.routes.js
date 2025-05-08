// src/routes/player.routes.js
const express = require('express');
const playerController = require('../controllers/player.controller');
const router = express.Router();

// Lấy danh sách người chơi
router.get('/', playerController.getPlayers);

// Tạo người chơi mới
router.post('/', playerController.createPlayer);

// Lấy thông tin người chơi theo ID
router.get('/:playerId', playerController.getPlayer);

// Cập nhật thông tin người chơi
router.put('/:playerId', playerController.updatePlayer);

// Xóa người chơi
router.delete('/:playerId', playerController.deletePlayer);

// Lấy thống kê của người chơi
router.get('/:playerId/stats', playerController.getPlayerStats);

module.exports = router;