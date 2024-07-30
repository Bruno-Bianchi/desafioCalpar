import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTokens1722353026664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usuario_token",
                columns: [
                    {
                        name: "id_usuario_token",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "usuario_id",
                        type: "uuid"
                    },
                    {
                        name: "refresh_token",
                        type: "varchar(255)"
                    },
                    {
                        name: "expires_date",
                        type: "timestamp"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUsuarioToken",
                        referencedTableName: "usuario",
                        referencedColumnNames: ["id_usuario"], 
                        columnNames: ["usuario_id"],
                        onDelete: "RESTRICT",
                        onUpdate: "RESTRICT" 
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuario_token");
    }

}
