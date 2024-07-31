import { AppError } from "@shared/errors/AppError";
import  { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateClienteUseCase } from "./CreateClienteUseCase";

class CreateClienteController {
    async handle(request: Request, response: Response): Promise<Response>{
        
        let dadosClientes = [];
        let result = [];

        const { id } = request.user;

        const createClienteUseCase = container.resolve(CreateClienteUseCase);

        // api
        try {
            const apiResponse = await fetch('https://09441c3d-9208-4fa9-a576-ba237af6b17c.mock.pstmn.io/');
            
            if (!apiResponse.ok) {
                throw new AppError('Erro ao obter dados da requisição!');
            }

            const data = await apiResponse.json();
            dadosClientes = data.Dados;

            for (let i = 0; i < dadosClientes.length; i++) {
                result[i] = await createClienteUseCase.execute({
                    usuario_id: id,
                    nome: dadosClientes[i].Nome,
                    disponivel: dadosClientes[i].Disponivel
                });
            }

            return response.status(201).json(result);
            
        } catch (error) {
            return response.status(500).json({ error: error });
        }
    }
}

export { CreateClienteController }