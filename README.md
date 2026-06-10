# CineFlow - Sistema de Cadastro de Filmes

## Integrantes

* Gabriel Igeski Donato
* Matheus Gomes da Rosa
* Pedro Henrique Alves de Souza Fagundes
* Rafael Luis Naslowski da Silva



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

---

## Configuração da Conexão com o Banco

Arquivo:

```text
backend/db.js
```

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
