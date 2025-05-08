// src/routes/season.routes.js
const express = require('express');
const router = express.Router();
// TODO: Thêm seasonController sau khi tạo

// Lấy danh sách mùa giải
router.get('/', function(req, res) {
  res.json({ message: 'GET danh sách mùa giải' });
});

// Tạo mùa giải mới
router.post('/', function(req, res) {
  res.json({ message: 'POST tạo mùa giải mới' });
});

// Lấy thông tin mùa giải theo ID
router.get('/:seasonId', function(req, res) {
  res.json({ message: `GET thông tin mùa giải ${req.params.seasonId}` });
});

// Cập nhật thông tin mùa giải
router.put('/:seasonId', function(req, res) {
  res.json({ message: `PUT cập nhật mùa giải ${req.params.seasonId}` });
});

// Lấy mùa giải hiện tại
router.get('/active', function(req, res) {
  res.json({ message: 'GET mùa giải đang hoạt động' });
});

// Kết thúc mùa giải
router.post('/:seasonId/end', function(req, res) {
  res.json({ message: `POST kết thúc mùa giải ${req.params.seasonId}` });
});

// Lấy bảng xếp hạng mùa giải
router.get('/:seasonId/rankings', function(req, res) {
  res.json({ message: `GET bảng xếp hạng mùa giải ${req.params.seasonId}` });
});

// Cập nhật cài đặt mùa giải
router.put('/:seasonId/settings', function(req, res) {
  res.json({ message: `PUT cập nhật cài đặt mùa giải ${req.params.seasonId}` });
});

module.exports = router;