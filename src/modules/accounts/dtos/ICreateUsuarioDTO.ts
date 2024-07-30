interface ICreateUsuarioDTO {
  nome: string;
  isAdmin: boolean;
  senha: string;
  email: string;
  id_usuario?: string;
}

export { ICreateUsuarioDTO }