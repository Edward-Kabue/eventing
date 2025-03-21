import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationHelper } from '../helpers/migration-helper';

export async function up(queryInterface: QueryInterface) {
  const helper = new MigrationHelper(queryInterface);
  
  await helper.addColumn('users', 'role', {
    type: DataTypes.STRING(),
    allowNull: false,
    defaultValue: 'user'
  });

  await helper.addIndex('users', ['role'], { name: 'users_role_idx' });
}

export async function down(queryInterface: QueryInterface) {
  const helper = new MigrationHelper(queryInterface);
  
  await helper.removeIndex('users', 'users_role_idx');
  await helper.removeColumn('users', 'role');
}

