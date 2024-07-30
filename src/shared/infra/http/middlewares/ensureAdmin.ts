import { Request, Response, NextFunction } from "express";
import { UsuarioRepository } from "@modules/accounts/infra/typeorm/repositories/UsuarioRepository";
import { AppError } from "@shared/errors/AppError"

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsuarioRepository();
  const user = await usersRepository.findById(id);

  if(!user.isAdmin) {
    throw new AppError("Usuário não é administrador!")
  }

  return next();
}



