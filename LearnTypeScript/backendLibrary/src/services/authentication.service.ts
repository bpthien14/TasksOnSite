import User from '../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Tài khoản không tồn tại' });
    }
    
    if (!user.password) {
        return res.status(401).json({ message: 'Lỗi xác thực mật khẩu' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Mật khẩu không chính xác' });
    }
    
}