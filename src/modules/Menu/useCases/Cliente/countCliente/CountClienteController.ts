import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountClienteUseCase } from './CountClienteUseCase'


class CountClienteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countClienteUseCase = container.resolve(CountClienteUseCase)

    const clientesCount = await countClienteUseCase.execute({
      search: search as string
    })

    return response.status(201).json(clientesCount)
  }
}

export { CountClienteController }