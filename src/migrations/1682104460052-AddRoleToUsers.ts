import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { Role } from '../users/enums/role.enum';

export class AddRoleToUsers1682104460052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role',
        default: `'${Role.Regular}'`,
        isNullable: false,
        type: 'varchar',
        length: '256',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'role');
  }
}
