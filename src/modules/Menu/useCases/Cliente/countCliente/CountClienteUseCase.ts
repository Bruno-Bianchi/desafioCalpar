import { Cliente } from '@modules/Menu/infra/typeorm/entities/Cliente'
import { IClienteRepository } from '@modules/Menu/repositories/IClienteRepository'
import { inject, injectable } from 'tsyringe'


interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountClienteUseCase {
  constructor(@inject('ClienteRepository')
    private clienteRepository: IClienteRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<number> {
    const clientesCount = await this.clienteRepository.count(
      search,
      filter
    )

    return clientesCount
  }
}

export { CountClienteUseCase }