import { Router } from "express";
import { CreateUsuarioController } from "@modules/accounts/useCases/createUsuario/createUsuarioController";

const usuarioRoutes = Router();

const createUsuarioController =  new CreateUsuarioController();

usuarioRoutes.post("/", createUsuarioController.handle);

export { usuarioRoutes }