import Book from "../models/book.model";
import Member from "../models/member.model";
import Borrowing from "../models/borrowing.model";
import Reservation from "../models/reservation.model";
import { DashboardStats, RecentActivity, MonthlyCheckout, PopularGenre } from "../types/dashboard.types";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const totalBooks = await Book.countDocuments();
    
    const totalMembers = await Member.countDocuments();
    
    const totalBorrowings = await Borrowing.countDocuments();
    
    // Đếm số đặt trước đang hoạt động
    const activeReservations = await Reservation.countDocuments({ status: 'Đang chờ' });
    
    // Đếm số sách quá hạn
    const today = new Date();
    const overdueItems = await Borrowing.countDocuments({
      status: 'Đang mượn',
      dueDate: { $lt: today }
    });
    
    // Đếm số sách có sẵn
    const availableBooks = await Book.aggregate([
      { $unwind: "$copies" },
      { $match: { "copies.status": "Có sẵn" } },
      { $count: "count" }
    ]).then(result => result.length > 0 ? result[0].count : 0);
    
    // Lấy sách phổ biến nhất (dựa trên số lần mượn)
    const popularBooks = await Borrowing.aggregate([
      { $group: { 
        _id: "$bookCopy.bookId", 
        title: { $first: "$bookCopy.title" },
        borrowCount: { $sum: 1 }
      }},
      { $sort: { borrowCount: -1 } },
      { $limit: 5 },
      { $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails"
      }},
      { $addFields: {
        author: { $arrayElemAt: ["$bookDetails.author.name", 0] },
        coverImage: { $arrayElemAt: ["$bookDetails.coverImage", 0] }
      }},
      { $project: {
        _id: 1,
        title: 1,
        author: 1,
        borrowCount: 1,
        coverImage: 1
      }}
    ]);
    
    return {
      totalBooks,
      totalMembers,
      totalBorrowings,
      activeReservations,
      overdueItems,
      availableBooks,
      popularBooks
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

/**
 * Lấy danh sách hoạt động gần đây
 * @param limit Số lượng hoạt động trả về
 */
export const getRecentActivities = async (limit: number = 10): Promise<RecentActivity[]> => {
  try {
    const activities: RecentActivity[] = [];
    
    // Lấy phiếu mượn gần đây
    const recentBorrowings = await Borrowing.find({ status: 'Đang mượn' })
      .sort({ borrowDate: -1 })
      .limit(limit);
      
    recentBorrowings.forEach(borrowing => {
      activities.push({
        _id: String(borrowing._id),
        type: 'borrow',
        timestamp: borrowing.borrowDate,
        details: {
          memberName: borrowing.member.fullName,
          memberId: borrowing.member.memberId,
          bookTitle: borrowing.bookCopy.title,
          bookId: borrowing.bookCopy.bookId.toString(),
          staffName: borrowing.issuedBy?.fullName
        }
      });
    });
    
    // Lấy phiếu trả gần đây
    const recentReturns = await Borrowing.find({ status: 'Đã trả', returnDate: { $exists: true } })
      .sort({ returnDate: -1 })
      .limit(limit);
      
    recentReturns.forEach(borrowing => {
      activities.push({
        _id: String(borrowing._id) + '-return',
        type: 'return',
        timestamp: borrowing.returnDate as Date,
        details: {
          memberName: borrowing.member.fullName,
          memberId: borrowing.member.memberId,
          bookTitle: borrowing.bookCopy.title,
          bookId: borrowing.bookCopy.bookId.toString(),
          staffName: borrowing.returnedTo?.fullName
        }
      });
    });
    
    // Lấy đặt trước gần đây
    const recentReservations = await Reservation.find({ status: 'Đang chờ' })
      .sort({ reservationDate: -1 })
      .limit(limit);
      
    recentReservations.forEach(reservation => {
      activities.push({
        _id: String(reservation._id),
        type: 'reservation',
        timestamp: reservation.reservationDate,
        details: {
          memberName: reservation.member.fullName,
          memberId: reservation.member.memberId,
          bookTitle: reservation.book.title,
          bookId: reservation.book._id.toString()
        }
      });
    });
    
    // Lấy độc giả mới
    const recentMembers = await Member.find()
      .sort({ createdAt: -1 })
      .limit(limit);
      
    recentMembers.forEach(member => {
      activities.push({
        _id: String(member._id),
        type: 'new_member',
        timestamp: member.createdAt || new Date(),
        details: {
          memberName: member.fullName,
          memberId: member.memberId
        }
      });
    });
    
    // Lấy sách mới
    const recentBooks = await Book.find()
      .sort({ createdAt: -1 })
      .limit(limit);
      
    recentBooks.forEach(book => {
      activities.push({
        _id: String(book._id),
        type: 'new_book',
        timestamp: book.createdAt || new Date(),
        details: {
          bookTitle: book.title,
          bookId: String(book._id)
        }
      });
    });
    
    // Sắp xếp theo thời gian và giới hạn số lượng
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
      
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    throw error;
  }
};

/**
 * Lấy thống kê mượn sách theo tháng
 * @param months Số tháng cần lấy dữ liệu
 */
export const getMonthlyCheckouts = async (months: number = 6): Promise<MonthlyCheckout[]> => {
  try {
    const result: MonthlyCheckout[] = [];
    const today = new Date();
    
    // Tạo mảng các tháng cần lấy dữ liệu
    for (let i = 0; i < months; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
      
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      
      // Đếm số lượng mượn trong tháng
      const checkouts = await Borrowing.countDocuments({
        borrowDate: { $gte: startDate, $lte: endDate }
      });
      
      // Đếm số lượng trả trong tháng
      const returns = await Borrowing.countDocuments({
        returnDate: { $gte: startDate, $lte: endDate }
      });
      
      // Format tên tháng
      const monthName = new Intl.DateTimeFormat('vi-VN', { month: 'long' }).format(date);
      
      result.push({
        month: monthName,
        year,
        checkouts,
        returns
      });
    }
    
    // Sắp xếp theo thời gian tăng dần
    return result.reverse();
    
  } catch (error) {
    console.error("Error fetching monthly checkouts:", error);
    throw error;
  }
};

/**
 * Lấy thống kê thể loại sách phổ biến
 */
export const getPopularGenres = async (): Promise<PopularGenre[]> => {
  try {
    // Tạo pipeline aggregate để lấy thể loại phổ biến nhất
    const popularGenres = await Borrowing.aggregate([
      // Kết nối với bảng books để lấy thông tin thể loại
      { $lookup: {
        from: "books",
        localField: "bookCopy.bookId",
        foreignField: "_id",
        as: "bookDetails"
      }},
      // Unwind để làm phẳng dữ liệu
      { $unwind: "$bookDetails" },
      { $unwind: "$bookDetails.categories" },
      // Group theo id của thể loại
      { $group: {
        _id: "$bookDetails.categories._id",
        name: { $first: "$bookDetails.categories.name" },
        count: { $sum: 1 }
      }},
      // Sắp xếp theo số lượng
      { $sort: { count: -1 } },
      // Giới hạn chỉ lấy 6 thể loại phổ biến nhất
      { $limit: 6 }
    ]);
    
    // Tính tổng số lượt mượn để tính phần trăm
    const totalBorrowings = popularGenres.reduce((sum, genre) => sum + genre.count, 0);
    
    // Thêm trường phần trăm
    return popularGenres.map(genre => ({
      _id: genre._id.toString(),
      name: genre.name,
      count: genre.count,
      percentage: Math.round((genre.count / totalBorrowings) * 100)
    }));
    
  } catch (error) {
    console.error("Error fetching popular genres:", error);
    throw error;
  }
};