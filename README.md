# CineFlow - Sistema de Cadastro de Filmes

## Integrantes

* Matheus Gomes da Rosa
* (Adicionar demais integrantes)

---

## Tecnologias Utilizadas

### Frontend

* React
* Axios

### Backend

* Node.js
* Express
* Cors
* MySQL2

### Banco de Dados

* MySQL

---

## Configuração do Banco de Dados

Execute o script SQL abaixo no MySQL Workbench:

```sql
DROP DATABASE IF EXISTS Cineflow;
CREATE DATABASE IF NOT EXISTS Cineflow;
USE Cineflow;

-- =========================
-- TABELA DE USUÁRIOS
-- =========================
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    endereco VARCHAR(200) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL
);

-- =========================
-- TABELA DE FILMES
-- =========================
CREATE TABLE filme (
    id_filme INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    ano YEAR NOT NULL,
    genero VARCHAR(50) NOT NULL,
    capa LONGBLOB
);
```

---

## Configuração da Conexão com o Banco

Arquivo:

```text
backend/db.js
```

Configurar conforme o MySQL instalado na máquina:

```js
const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'SUA_SENHA_MYSQL',
    database: 'Cineflow'
});

conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar:', erro);
    } else {
        console.log('Conectado ao MySQL');
    }
});

module.exports = conexao;
```

---

## Instalação das Dependências

### Frontend

Na pasta principal:

```bash
npm install
```

### Backend

Entrar na pasta backend:

```bash
cd backend
```

Instalar dependências:

```bash
npm install express cors mysql2
```

---

## Executando o Projeto

### Iniciar Backend

Abrir um terminal:

```bash
cd backend
node server.js
```

Resultado esperado:

```text
Servidor rodando na porta 3001
Conectado ao MySQL
```

---

### Iniciar Frontend

Abrir outro terminal:

```bash
npm start
```

O React abrirá automaticamente em:

```text
http://localhost:3000
```

---

## Funcionalidades

### Cadastro de Filmes

Permite cadastrar:

* Título
* Ano
* Gênero
* Capa (imagem armazenada em LONGBLOB)

Os dados são gravados na tabela:

```sql
filme
```

---

### Cadastro de Usuários

Permite cadastrar:

* Nome
* CPF
* E-mail
* Senha
* CEP

O endereço é preenchido automaticamente através da API ViaCEP.

Os dados são gravados na tabela:

```sql
usuario
```

---

## Testes da API

Listar filmes:

```text
http://localhost:3001/filmes
```

Listar usuários:

```text
http://localhost:3001/usuarios
```

---

## Estrutura do Projeto

```text
cineflow/
│
├── src/
├── public/
├── package.json
│
├── backend/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
└── cineflow.sql
```
