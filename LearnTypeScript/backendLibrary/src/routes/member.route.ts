import { Router } from "express";
import * as memberController from "../controllers/member.controller";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Route lấy danh sách độc giả
router.get("/", 
  authMiddleware, 
  memberController.getAllMembers
);

// Route lấy chi tiết độc giả
router.get("/:id", 
  authMiddleware, 
  memberController.getMemberById
);

// Route thêm độc giả mới
router.post("/", 
  authMiddleware, 
  roleMiddleware(["admin", "librarian"]), 
  memberController.createMember
);

// Route cập nhật thông tin độc giả
router.put("/:id", 
  authMiddleware, 
  roleMiddleware(["admin", "librarian"]), 
  memberController.updateMember
);

// Route xóa độc giả
router.delete("/:id", 
  authMiddleware, 
  roleMiddleware(["admin"]), 
  memberController.deleteMember
);

export default router;