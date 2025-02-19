import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserProfil1739957272203 implements MigrationInterface {
    name = 'AddUserProfil1739957272203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profil\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`mail\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`firstname\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`profilId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_3200d8e220989852c169aff7cc3\` FOREIGN KEY (\`profilId\`) REFERENCES \`profil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_3200d8e220989852c169aff7cc3\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`profil\``);
    }

}
