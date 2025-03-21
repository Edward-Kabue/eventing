import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationHelper } from '../helpers/migration-helper';

export async function up(queryInterface: QueryInterface) {
  const helper = new MigrationHelper(queryInterface);
  
  await helper.addColumn('users', 'role', {
    type: DataTypes.STRING(),
    allowNull: false,
    defaultValue: 'user'
  });

  // Add unique constraint to role column
  await queryInterface.addConstraint('users', {
    fields: ['role'],
    type: 'unique',
    name: 'users_role_unique'
  });

  await helper.addIndex('users', ['role'], { name: 'users_role_idx' });
}

export async function down(queryInterface: QueryInterface) {
  const helper = new MigrationHelper(queryInterface);
  
  try {
    await helper.removeIndex('users', 'users_role_idx');
  } catch (error) {
    console.log('Index users_role_idx might not exist, continuing...');
  }

  try {
    await queryInterface.removeConstraint('users', 'users_role_unique');
  } catch (error) {
    console.log('Constraint users_role_unique might not exist, continuing...');
  }

  await helper.removeColumn('users', 'role');
}



