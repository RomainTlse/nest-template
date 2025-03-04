import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIconHullable1741076188944 implements MigrationInterface {
    name = 'UserIconHullable1741076188944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`icon\` \`icon\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`icon\` \`icon\` varchar(255) NOT NULL`);
    }

}
