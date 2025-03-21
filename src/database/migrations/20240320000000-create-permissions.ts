import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Create permissions table
  await queryInterface.createTable('permissions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  });

  // Create role_permissions junction table
  await queryInterface.createTable('role_permissions', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'role'
      }
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'permissions',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  });

  await queryInterface.addConstraint('role_permissions', {
    fields: ['role', 'permission_id'],
    type: 'primary key',
    name: 'role_permissions_pkey'
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('role_permissions');
  await queryInterface.dropTable('permissions');
}