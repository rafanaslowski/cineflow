-- cineflow.sql

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