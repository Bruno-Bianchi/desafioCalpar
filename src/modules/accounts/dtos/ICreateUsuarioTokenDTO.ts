interface ICreateUsuarioTokenDTO {
    usuario_id: string;
    expires_date: Date;
    refresh_token: string
  }
  
  export { ICreateUsuarioTokenDTO }
  