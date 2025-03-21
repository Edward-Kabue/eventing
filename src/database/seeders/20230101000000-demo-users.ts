'use strict';

import type { QueryInterface } from 'sequelize';
import { UserRole } from '../../types';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    try {
      await queryInterface.bulkInsert('users', [
        {
          name: 'Admin User',
          email: 'admin@example.com',
          role: UserRole.ADMIN,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Vendor User',
          email: 'vendor@example.com',
          role: UserRole.VENDOR,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Customer User',
          email: 'customer@example.com',
          role: UserRole.CUSTOMER,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], {});
    } catch (error) {
      console.error('Demo users seeder error:', error);
      throw error;
    }
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('users', {});
  }
};