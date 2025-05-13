import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Yêu cầu xác thực cho tất cả các API dashboard
router.use(authMiddleware);

// Thống kê tổng quát cho dashboard
router.get("/stats", dashboardController.getDashboardStats);

// Hoạt động gần đây
router.get("/recent-activities", dashboardController.getRecentActivities);

// Thống kê mượn theo tháng
router.get("/monthly-checkouts", dashboardController.getMonthlyCheckouts);

// Thể loại phổ biến
router.get("/popular-genres", dashboardController.getPopularGenres);

export default router;