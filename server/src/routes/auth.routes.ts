import { Request, Response } from "express";
import { prisma } from "@configs/prisma.config";
import jwt from "jsonwebtoken";
import passport from "passport";

export const login = async (req: Request, res: Response) => {
    const genrateToken = (userId) => {
        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        });
    }
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
        email,
        },
    });
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
    }
    
    return res.status(200).json({ user });
    }