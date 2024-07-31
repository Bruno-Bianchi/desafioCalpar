import { Cliente } from "@modules/Menu/infra/typeorm/entities/Cliente";
import { IClienteRepository } from "@modules/Menu/repositories/IClienteRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id_cliente: string;
    usuario_id: string;
    nome: string;
    disponivel: boolean;
}

@injectable()
class UpdateClienteUseCase {
    constructor(
        @inject("ClienteRepository")
        private clienteRepository: IClienteRepository
    ) {}

    async execute({
        id_cliente,
        usuario_id,
        nome,
        disponivel
    }): Promise<Cliente> {
        const novoCliente = await this.clienteRepository.update({
            id_cliente,
            usuario_id,
            nome, 
            disponivel
        })

        return novoCliente
    }
}

export { UpdateClienteUseCase }
