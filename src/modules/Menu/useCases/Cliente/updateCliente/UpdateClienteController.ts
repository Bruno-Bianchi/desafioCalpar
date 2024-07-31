import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateClienteUseCase } from './UpdateClienteUseCase';

class UpdateClienteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_cliente } = request.params;
        const { id } = request.user;
        const { nome, disponivel } = request.body;


        const updateClienteUseCase = container.resolve(UpdateClienteUseCase);

        const novoCliente = await updateClienteUseCase.execute({
            id_cliente,
            usuario_id: id,
            nome,
            disponivel
        });

        return response.status(200).json(novoCliente);
    }
}

export { UpdateClienteController }