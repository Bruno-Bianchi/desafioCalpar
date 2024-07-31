import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteClienteUseCase } from './DeleteClienteUseCase';

class DeleteClienteController {
    async handle(request: Request, response: Response): Promise<Response>{
        const id_cliente  = request.params.id_cliente;

        const deleteClienteUseCase = container.resolve(DeleteClienteUseCase);
        await deleteClienteUseCase.execute(id_cliente);

        return response.status(204).send();
    }
}

export { DeleteClienteController }
