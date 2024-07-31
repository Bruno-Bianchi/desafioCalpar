import { inject, injectable } from "tsyringe";
import { Cliente } from "@modules/Menu/infra/typeorm/entities/Cliente";
import { IClienteRepository } from "@modules/Menu/repositories/IClienteRepository";
import { AppError } from "@shared/errors/AppError";
import { ICreateClienteDTO } from "@modules/Menu/dtos/ICreateClienteDTO";

interface IRequest {
    search: string,
    page: number,
    rowsPerPage: number, 
    order: string,
    filter?: string
}

interface ResponseProps {
    itens: ICreateClienteDTO[],
    hasNext: boolean
}

@injectable()
class ListClienteUseCase {
    constructor( 
        @inject("ClienteRepository")
        private clienteRepository: IClienteRepository
    ) {}

    // async execute(): Promise<Cliente[]> {
    //     const clientes = await this.clienteRepository.list();

    //     if(clientes.length === 0) {
    //         throw new AppError("Não há clientes cadastrados!")
    //     }
    //     return clientes
    // }  

    async execute({
        search = '',
        page = 0,
        rowsPerPage = 50,
        order = '',
        filter
      }: IRequest): Promise<ResponseProps> {
        const newPage = page !== 0 ? page - 1 : 0
    
        const clientes = await this.clienteRepository.list(
          search,
          newPage,
          rowsPerPage,
          order,
          filter
        )
    
        const countClientes = await this.clienteRepository.count(
          search,
          filter
        )
    
        const numeroCliente = page * rowsPerPage
    
        const clientesResponse = {
          itens: clientes,
          hasNext: numeroCliente < countClientes
        }
    
        return clientesResponse
      }
}

export { ListClienteUseCase }
