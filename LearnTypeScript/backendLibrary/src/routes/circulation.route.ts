import { Router } from "express";
import * as circulationController from "../controllers/circulation.controller";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

const router = Router();

// ==================== BORROWING ROUTES ====================

// Lấy danh sách và chi tiết phiếu mượn (yêu cầu đăng nhập)
router.get("/borrowings", 
  authMiddleware, 
  circulationController.getBorrowings
);

router.get("/borrowings/:id", 
  authMiddleware, 
  circulationController.getBorrowingById
);

// Tạo phiếu mượn mới (yêu cầu quyền librarian/admin)
router.post("/borrow", 
  authMiddleware, 
  roleMiddleware(["admin", "librarian"]), 
  circulationController.createBorrowing
);

// Trả sách (yêu cầu quyền librarian/admin)
router.put("/return/:id", 
  authMiddleware, 
  roleMiddleware(["admin", "librarian"]), 
  circulationController.returnBorrowing
);

// Gia hạn mượn sách (yêu cầu đăng nhập - độc giả có thể tự gia hạn)
router.put("/renew/:id", 
  authMiddleware, 
  circulationController.renewBorrowing
);

// ==================== RESERVATION ROUTES ====================

// Lấy danh sách và chi tiết đặt trước (yêu cầu đăng nhập)
router.get("/reservations", 
  authMiddleware, 
  circulationController.getReservations
);

router.get("/reservations/:id", 
  authMiddleware, 
  circulationController.getReservationById
);

// Đặt trước sách (yêu cầu đăng nhập - độc giả có thể tự đặt)
router.post("/reserve", 
  authMiddleware, 
  circulationController.createReservation
);

// Cập nhật trạng thái đặt trước (yêu cầu quyền librarian/admin)
router.put("/reservations/:id/status", 
  authMiddleware, 
  roleMiddleware(["admin", "librarian"]), 
  circulationController.updateReservationStatus
);

// Gửi thông báo cho đơn đặt trước (yêu cầu quyền librarian/admin)
router.post("/reservations/:id/notify", 
  authMiddleware, 
  roleMiddleware(["admin", "librarian"]), 
  circulationController.sendReservationNotification
);

export default router;