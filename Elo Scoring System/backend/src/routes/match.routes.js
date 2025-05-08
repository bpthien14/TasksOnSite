// src/routes/match.routes.js
const express = require('express');
const router = express.Router();
// TODO: Thêm matchController sau khi tạo

// Lấy danh sách trận đấu
router.get('/', function(req, res) {
  res.json({ message: 'GET danh sách trận đấu' });
});

// Tạo trận đấu mới
router.post('/', function(req, res) {
  res.json({ message: 'POST tạo trận đấu mới' });
});

// Lấy thông tin trận đấu theo ID
router.get('/:matchId', function(req, res) {
  res.json({ message: `GET thông tin trận đấu ${req.params.matchId}` });
});

// Cập nhật thông tin trận đấu
router.put('/:matchId', function(req, res) {
  res.json({ message: `PUT cập nhật trận đấu ${req.params.matchId}` });
});

// Tạo trận đấu ngẫu nhiên
router.post('/random', function(req, res) {
  res.json({ message: 'POST tạo trận đấu ngẫu nhiên' });
});

// Cập nhật kết quả trận đấu
router.post('/:matchId/result', function(req, res) {
  res.json({ message: `POST cập nhật kết quả trận đấu ${req.params.matchId}` });
});

module.exports = router;