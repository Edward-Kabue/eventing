import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user";
import PermissionModel from "../models/permission";

// Extend the Express Request interface
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

export const checkPermission = (requiredPermission: string) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          code: "UNAUTHORIZED",
          message: "Authentication required",
        });
        return;
      }

      const user = await UserModel.findByPk(userId);
      if (!user) {
        res.status(401).json({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
        return;
      }

      const permissions = await PermissionModel.findAll({
        include: [
          {
            model: UserModel,
            where: { role: user.role },
            attributes: [],
          },
        ],
      });

      const hasPermission = permissions.some(
        (p) => p.name === requiredPermission,
      );
      if (!hasPermission) {
        res.status(403).json({
          code: "FORBIDDEN",
          message: "Insufficient permissions",
        });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

