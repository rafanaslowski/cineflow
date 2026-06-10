const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'PUC@1234',
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