import { Cliente } from "@modules/Menu/infra/typeorm/entities/Cliente";
import { IClienteRepository } from "@modules/Menu/repositories/IClienteRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    usuario_id: string;
    nome: string;
    disponivel: string; 
}


@injectable()
class CreateClienteUseCase {

    constructor(
        @inject("ClienteRepository")
        private clienteRepository: IClienteRepository
    ) {}

    async execute({
        usuario_id,
        nome,
        disponivel
    }: IRequest): Promise<Cliente>{

        const clientExist = await this.clienteRepository.findByName(nome);

        if(clientExist){
            throw new AppError("Cliente(s) já cadastrado(s)!", 500)
        }

        const cliente = await this.clienteRepository.create({
            usuario_id,
            nome,
            disponivel
        });

        return cliente;
    }

}

export { CreateClienteUseCase }