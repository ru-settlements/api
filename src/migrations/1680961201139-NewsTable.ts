import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewsTable1680961201139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
        ALTER TABLE news
            ADD CONSTRAINT news_type_fk
                FOREIGN KEY (type_id)
                    REFERENCES news_types (id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE news
        DROP CONSTRAINT news_type_fk;
    `);
  }
}
