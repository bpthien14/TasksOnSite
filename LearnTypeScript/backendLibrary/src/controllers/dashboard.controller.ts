import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

/**
 * Lấy thống kê tổng quát cho dashboard
 */
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Lỗi khi lấy thống kê dashboard" });
  }
};

/**
 * Lấy danh sách hoạt động gần đây
 */
export const getRecentActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 10 } = req.query;
    const activities = await dashboardService.getRecentActivities(Number(limit));
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    res.status(500).json({ message: "Lỗi khi lấy hoạt động gần đây" });
  }
};

/**
 * Lấy thống kê mượn sách theo tháng
 */
export const getMonthlyCheckouts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { months = 6 } = req.query;
    const monthlyData = await dashboardService.getMonthlyCheckouts(Number(months));
    res.status(200).json(monthlyData);
  } catch (error) {
    console.error("Error fetching monthly checkouts:", error);
    res.status(500).json({ message: "Lỗi khi lấy thống kê mượn theo tháng" });
  }
};

/**
 * Lấy thống kê thể loại sách phổ biến
 */
export const getPopularGenres = async (req: Request, res: Response): Promise<void> => {
  try {
    const genres = await dashboardService.getPopularGenres();
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching popular genres:", error);
    res.status(500).json({ message: "Lỗi khi lấy thể loại phổ biến" });
  }
};