const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());

// aumenta limite porque imagens em base64 podem ser grandes
app.use(express.json({ limit: '50mb' }));

// Chave secreta para assinar o token JWT exigido pela professora Lisiane
const JWT_SECRET = "CINEFLOW_CHAVE_SECRETA_SUPER_PROTEGIDA_PUCPR";


// LISTAR FILMES
app.get('/filmes', (req, res) => {

    const sql = 'SELECT * FROM filme';

    db.query(sql, (erro, resultado) => {

        if (erro) {
            return res.status(500).json(erro);
        }

        const filmes = resultado.map(filme => ({
            ...filme,
            capa: filme.capa
                ? `data:image/jpeg;base64,${filme.capa.toString('base64')}`
                : null
        }));

        res.json(filmes);
    });
});


// CADASTRAR FILME
app.post('/filmes', (req, res) => {

    const { titulo, ano, genero, capa } = req.body;

    let imagemBuffer = null;

    if (capa) {
        imagemBuffer = Buffer.from(
            capa.split(',')[1],
            'base64'
        );
    }

    const sql = `
        INSERT INTO filme
        (titulo, ano, genero, capa)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [titulo, ano, genero, imagemBuffer],
        (erro, resultado) => {

            if (erro) {
                console.error(erro);
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: 'Filme cadastrado com sucesso!',
                id: resultado.insertId
            });
        }
    );
});


// CADASTRAR USUÁRIO (AGORA COM HASH DE SENHA REAL)
app.post('/usuarios', async (req, res) => {

    const {
        nome,
        cpf,
        email,
        senha,
        logradouro,
        bairro,
        cidade
    } = req.body;

    const endereco = `${logradouro}, ${bairro}, ${cidade}`;

    try {
        // Criptografa a senha antes de mandar para o banco de dados
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const sql = `
            INSERT INTO usuario
            (nome, cpf, email, endereco, senha_hash)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                nome,
                cpf,
                email,
                endereco,
                senhaHash // Salvando a senha criptografada de forma segura
            ],
            (erro, resultado) => {

                if (erro) {
                    console.error(erro);
                    return res.status(500).json(erro);
                }

                res.json({
                    mensagem: 'Usuário cadastrado com sucesso!',
                    id: resultado.insertId
                });
            }
        );
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao processar a criptografia da senha." });
    }
});


// ROTA DE LOGIN REAL VALIDANDO NO MYSQL E GERANDO JWT
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuario WHERE email = ?';

    db.query(sql, [email], async (erro, resultados) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        // 1. Verifica se encontrou o usuário pelo e-mail
        if (resultados.length === 0) {
            return res.status(401).json({ auth: false, mensagem: 'E-mail ou senha incorretos.' });
        }

        const usuario = resultados[0];

        // 2. Compara a senha digitada com a senha criptografada (senha_hash) do MySQL
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaValida) {
            return res.status(401).json({ auth: false, mensagem: 'E-mail ou senha incorretos.' });
        }

        // 3. Se a senha bater, gera o Token JWT assinado com validade de 1 hora
        const token = jwt.sign(
            { id: usuario.id_usuario, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Retorna os dados para o Frontend atualizar o estado global
        res.json({
            auth: true,
            token_jwt: token,
            email: usuario.email,
            nome: usuario.nome
        });
    });
});


app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});