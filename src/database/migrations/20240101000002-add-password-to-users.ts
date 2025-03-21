import { QueryInterface, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

export async function up(queryInterface: QueryInterface) {
  // First add the column as nullable
  await queryInterface.addColumn('users', 'password', {
    type: DataTypes.STRING,
    allowNull: true
  });

  // Set a default hashed password for existing users
  const salt = await bcrypt.genSalt(10);
  const defaultPassword = await bcrypt.hash('ChangeMe123!', salt);
  
  await queryInterface.sequelize.query(`
    UPDATE users 
    SET password = '${defaultPassword}' 
    WHERE password IS NULL
  `);

  // Now make the column non-nullable
  await queryInterface.changeColumn('users', 'password', {
    type: DataTypes.STRING,
    allowNull: false
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn('users', 'password');
}
