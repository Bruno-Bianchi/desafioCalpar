import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateClients1722361723368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cliente",
                columns: [
                    {
                        name: "id_cliente",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "usuario_id",
                        type: "uuid"
                    },
                    {
                        name: "nome",
                        type: "varchar(50)"
                    },
                    {
                        name: "disponivel",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKClienteUsuario",
                        referencedTableName: "usuario",
                        referencedColumnNames: ["id_usuario"], 
                        columnNames: ["usuario_id"],
                        onDelete: "RESTRICT",
                        onUpdate: "RESTRICT" 
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cliente");
    }

}
