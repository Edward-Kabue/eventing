"use strict";

import type { QueryInterface } from "sequelize";
import { UserRole } from "../../types";

interface Permission {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    try {
      // Insert default permissions
      await queryInterface.bulkInsert(
        "permissions",
        [
          {
            name: "create:event",
            description: "Create events",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "edit:event",
            description: "Edit events",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "delete:event",
            description: "Delete events",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "view:event",
            description: "View events",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "manage:users",
            description: "Manage users",
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "book:event",
            description: "Book events",
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {},
      );

      const [insertedPermissions] = (await queryInterface.sequelize.query(
        "SELECT * FROM permissions",
      )) as [Permission[], unknown];

      const rolePermissions = [
        // Admin has all permissions
        ...insertedPermissions.map((permission) => ({
          role: UserRole.ADMIN,
          permission_id: permission.id,
          created_at: new Date(),
          updated_at: new Date(),
        })),
        // Vendor can manage their events
        ...insertedPermissions
          .filter((p) =>
            [
              "create:event",
              "edit:event",
              "delete:event",
              "view:event",
            ].includes(p.name),
          )
          .map((permission) => ({
            role: UserRole.VENDOR,
            permission_id: permission.id,
            created_at: new Date(),
            updated_at: new Date(),
          })),
        // Customer can view and book events
        ...insertedPermissions
          .filter((p) => ["view:event", "book:event"].includes(p.name))
          .map((permission) => ({
            role: UserRole.CUSTOMER,
            permission_id: permission.id,
            created_at: new Date(),
            updated_at: new Date(),
          })),
      ];

      await queryInterface.bulkInsert("role_permissions", rolePermissions, {});
    } catch (error) {
      console.error("Seeder error:", error);
      throw error;
    }
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete("role_permissions", {});
    await queryInterface.bulkDelete("permissions", {});
  },
};
