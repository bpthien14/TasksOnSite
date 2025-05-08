// src/routes/statistic.routes.js
const express = require('express');
const router = express.Router();
// TODO: Thêm statisticController sau khi tạo

// Lấy bảng xếp hạng tổng thể
router.get('/rankings', function(req, res) {
  res.json({ message: 'GET bảng xếp hạng tổng thể' });
});

// Lấy thống kê theo vị trí
router.get('/positions', function(req, res) {
  res.json({ message: 'GET thống kê theo vị trí' });
});

// Lấy lịch sử thay đổi ELO
router.get('/elo-history', function(req, res) {
  res.json({ message: 'GET lịch sử thay đổi ELO' });
});

// Lấy thống kê mùa giải
router.get('/seasons/:seasonId', function(req, res) {
  res.json({ message: `GET thống kê mùa giải ${req.params.seasonId}` });
});

// Lấy thống kê win rate theo vị trí
router.get('/win-rates', function(req, res) {
  res.json({ message: 'GET thống kê win rate theo vị trí' });
});

// Lấy dự đoán kết quả trận đấu
router.post('/predict', function(req, res) {
  res.json({ message: 'POST dự đoán kết quả trận đấu' });
});

module.exports = router;