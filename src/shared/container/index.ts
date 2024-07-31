import { container } from "tsyringe";

import "@shared/container/providers"

import { IUsuarioRepository } from "@modules/accounts/repositories/IUsuarioRepository";
import { UsuarioRepository } from "@modules/accounts/infra/typeorm/repositories/UsuarioRepository";

import { IUsuarioTokenRepository } from "@modules/accounts/repositories/IUsuarioTokenRepository";
import { UsuarioTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsuarioTokenRepository";

import { IClienteRepository } from "@modules/Menu/repositories/IClienteRepository";
import { ClienteRepository } from "@modules/Menu/infra/typeorm/repositories/ClienteRepository";

container.registerSingleton<IUsuarioRepository>(
  "UsuarioRepository",
  UsuarioRepository
);

container.registerSingleton<IUsuarioTokenRepository>(
  "UsuarioTokenRepository",
  UsuarioTokenRepository
);

container.registerSingleton<IClienteRepository>(
  "ClienteRepository",
  ClienteRepository
);
