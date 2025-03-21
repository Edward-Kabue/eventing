"use strict";

import type { QueryInterface } from "sequelize";
import { UserRole } from "../../types";
import bcrypt from "bcryptjs";

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    try {
      // Create a default hashed password for demo users
      const salt = await bcrypt.genSalt(10);
      const defaultPassword = await bcrypt.hash("ChangeMe123!", salt);

      await queryInterface.bulkInsert(
        "users",
        [
          {
            name: "Admin User",
            email: "admin@example.com",
            password: defaultPassword,
            role: UserRole.ADMIN,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "Vendor User",
            email: "vendor@example.com",
            password: defaultPassword,
            role: UserRole.VENDOR,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "Customer User",
            email: "customer@example.com",
            password: defaultPassword,
            role: UserRole.CUSTOMER,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {},
      );
    } catch (error) {
      console.error("Demo users seeder error:", error);
      throw error;
    }
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete("users", {});
  },
};
