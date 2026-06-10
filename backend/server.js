const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());

// aumenta limite porque imagens em base64 podem ser grandes
app.use(express.json({ limit: '50mb' }));


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
app.post('/usuarios', (req, res) => {

    const {
        nome,
        cpf,
        email,
        senha,
        logradouro,
        bairro,
        cidade
    } = req.body;

    const endereco =
        `${logradouro}, ${bairro}, ${cidade}`;

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
            senha
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
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});