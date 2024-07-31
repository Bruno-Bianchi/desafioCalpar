# Desafio Calpar

1. API Consumida 
Os dados da API consumida são armazenados na tebela "cliente"
A tebala cliente possui como colunas:
{
    id_cliente: PK
    usuario_id: Usuário que criou o cliente (somente o usuário ADM)
    nome: 
    disponivel:
    created_at: data de criação do registro
}

2. Usuário Administrador - Autorização 
Somente este usuário pode realizar as atividades de: Criar, atualizar e deletar um cliente

Obs.:As demais atividades como, por exemplo, listar os clientes, poderão ser realizadas por quaisquer usuários do sistema

3. Criação de usuário do sistema 
Rota para criar usuário que fará o login no sistema
Autenticação com token

4. CRUD Cliente 
Rotas para criar, atualizar, ler/listar e deletar 

A requisição é atendida pela rota, posteriormente para para o Controller especificado na rota. Em seguida, o Controller verifica os dados que estão sendo passados pelo body e/o params e envia estes para o UseCase. O UseCase instancia o Repositório e dentro do Repositório são realizadas as operações de CRUD.

Para isso, foi utilizado o framework express para gerenciamento dos endpoints e utilizado o ORM Typeorm para interação com o banco de dados

5. Banco de Dados (PostgreSQL) 
Utilizado o typeorm para criar as tabelas do banco, utilizando migrations.

--------------------------------------------------------------------------------------------------------------------------------
# Instalar softwares necessários (via terminal) 
Obs.: SO utilizado - linux Ubuntu (última versão disponível)

1. Instalar o NVM

$ cd /tmp
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

2. Testar a instalação do NVM (abrir uma guia nova)

$ command -v nvm
retorno no terminal → :  nvm


3. Instalar Node e usar a versao 18.10.0

$ nvm install --lts

$ nvm install 18.10.0

$ nvm alias default 18.10.0

$ nvm use 18.10.0


4. Instalar Yarn

$ cd /tmp

$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

$ sudo apt update

$ sudo apt install yarn


5. Baixar docker 

$ sudo apt-get update

$ sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common libssl-dev libffi-dev git wget nano


6. Add user group

$ sudo groupadd docker

$ sudo usermod -aG docker ${USER}
Obs.: usar ${USER}, não alterar pelo seu usuário


7. Add docker key and repo
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

$ sudo apt-get update


8. Install docker and docker-compose

$ sudo apt-get install -y docker-ce [containerd.io](http://containerd.io/) docker-compose


9. ATENÇÃO SOMENTE SE APARECER O ERRO A SEGUIR 
`error getting credentials - err: exit status 1, out: GDBus.Error:org.freedesktop.DBus.Error.ServiceUnknown: The name org.freedesktop.secrets was not provided by any .service files`
digite o comando abaixo: 

$ sudo apt install gnupg2 pass

10. Deixa o ~/ como caminho padrao ao abrir o wsl 

$ echo "cd /" >> ~/.profile
$ source ~/.profile

11. Permissao pasta opt

$ chown <user_name> <file_name>

### PSQL
$ sudo apt-get install postgresql-client


# Rodar o projeto
1. Baixar o repositório e no local da pasta digitar o comando:
$ yarn

2. Iniciar os containers do Docker
$ sudo docker-compose up -d

3. Verificar se os containers do Docker estão rodando, com o comando:
$ docker ps -a 
STATUS -> deve estar UP

4. Conectar ao banco utilizando software DBeaver, por exemplo, ou similar:
Credenciais do banco estão no arquivo docker-compose.yml
- POSTGRES_USER=docker
- POSTGRES_PASSWORD=ignite   
- POSTGRES_DB=rentx 

5. Criar as tabelas, rodar o comando:
$ yarn typeorm migration: run

6. Criação do usuário ADM. Rodar o comando:
$ yarn seed:admin

Credenciais do usuario ADM estão no arquivo admin.ts, na pasta seed.
login{
    email: desafiocalpar@gmail.com
    senha: desafio
}

7. Rodar a aplicação com o comando:
$ yarn dev

8. Realizar as requisiçãoes via Insomnia
Disponibilizado arquivo de requisições na raiz do projeto, para importar ao Insomnia.
