import { DataTypes, QueryInterface } from "sequelize";

export interface ColumnDefinition {
  type: ReturnType<(typeof DataTypes)[keyof typeof DataTypes]>;
  allowNull?: boolean;
  unique?: boolean;
  defaultValue?: unknown;
  references?: {
    model: string;
    key: string;
  };
  onUpdate?: string;
  onDelete?: string;
}

export interface TableDefinition {
  [columnName: string]: ColumnDefinition;
}

export class MigrationHelper {
  constructor(private queryInterface: QueryInterface) {}

  async createTable(
    tableName: string,
    columns: TableDefinition,
  ): Promise<void> {
    await this.queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ...columns,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  }

  async addColumn(
    tableName: string,
    columnName: string,
    definition: ColumnDefinition,
  ): Promise<void> {
    await this.queryInterface.addColumn(tableName, columnName, definition);
  }

  async removeColumn(tableName: string, columnName: string): Promise<void> {
    await this.queryInterface.removeColumn(tableName, columnName);
  }

  async addIndex(
    tableName: string,
    fields: string[],
    options: { unique?: boolean; name?: string } = {},
  ): Promise<void> {
    await this.queryInterface.addIndex(tableName, fields, options);
  }

  async removeIndex(tableName: string, indexName: string): Promise<void> {
    await this.queryInterface.removeIndex(tableName, indexName);
  }
}
