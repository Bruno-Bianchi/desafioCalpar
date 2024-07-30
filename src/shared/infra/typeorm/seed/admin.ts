import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import  createConnection  from "../index"

async function create() {

  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("desafio", 8);

  await connection.query(
    `INSERT INTO USUARIO(id_usuario,nome,"isAdmin",senha,email,created_at) 
    values ('${id}','admin', true,'${password}','desafiocalpar@gmail.com','now()')
    `
  )
}

create().then(() => console.log("Usuário administrado criado com sucesso!")); 