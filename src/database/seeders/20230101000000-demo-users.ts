import { QueryInterface } from 'sequelize';

export async function up({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.bulkInsert('users', [
    {
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.bulkDelete('users', {});
}