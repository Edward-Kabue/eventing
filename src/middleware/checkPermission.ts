import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user';
import PermissionModel from '../models/permission';
import { User } from '../types';

// Extend the Express Request interface
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

export const checkPermission = (requiredPermission: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        });
      }

      const user = await UserModel.findByPk(userId);
      if (!user) {
        return res.status(401).json({
          code: 'UNAUTHORIZED',
          message: 'User not found'
        });
      }

      const permissions = await PermissionModel.findAll({
        include: [{
          model: UserModel,
          where: { role: user.role },
          attributes: []
        }]
      });

      const hasPermission = permissions.some(p => p.name === requiredPermission);
      if (!hasPermission) {
        return res.status(403).json({
          code: 'FORBIDDEN',
          message: 'Insufficient permissions'
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
