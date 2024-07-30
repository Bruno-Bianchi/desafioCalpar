import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1722351610151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usuario",
                columns: [
                    {
                        name: "id_usuario",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nome",
                        type: "varchar(100)",
                        isNullable: false
                    },
                    {
                        name: "isAdmin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "senha",
                        type: "varchar(255)",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar(50)",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usuario");
    }

}
