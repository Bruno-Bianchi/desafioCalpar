import { IClienteRepository } from "@modules/Menu/repositories/IClienteRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteClienteUseCase {
    constructor(
        @inject("ClienteRepository")
        private clienteRepository: IClienteRepository
    ) {}

    async execute(id_cliente: string): Promise<void> {
        await this.clienteRepository.delete(id_cliente);
        return
    }

}

export { DeleteClienteUseCase }