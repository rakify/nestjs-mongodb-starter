import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntitiesFinal1687321948805 implements MigrationInterface {
  name = 'EntitiesFinal1687321948805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`User\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`createdBy\` varchar(36) NOT NULL DEFAULT 'default_user', \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updatedBy\` varchar(36) NOT NULL DEFAULT 'default_user', \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` text NOT NULL COMMENT 'hashed password of the user', \`avatarLink\` varchar(255) NULL, \`coverLink\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`country\` varchar(10) NULL, \`accessRole\` enum ('customer', 'salesman', 'admin', 'super-admin') NOT NULL DEFAULT 'customer', UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``,
    );
    await queryRunner.query(`DROP TABLE \`User\``);
  }
}
