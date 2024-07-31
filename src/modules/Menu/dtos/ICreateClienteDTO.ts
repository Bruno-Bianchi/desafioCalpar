interface ICreateClienteDTO {
  usuario_id: string
  nome: string;
  disponivel: string;
  id_cliente?: string;
  created_at?: Date;
}
  
export { ICreateClienteDTO }