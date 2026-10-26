

CREATE TABLE escritorios (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE usuarios (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    escritorio_id BIGINT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL,
    senha_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'usuario',
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_usuarios_escritorio
        FOREIGN KEY (escritorio_id)
        REFERENCES escritorios(id)
        ON DELETE RESTRICT,

    CONSTRAINT uq_usuarios_escritorio_email
        UNIQUE (escritorio_id, email),

    CONSTRAINT ck_usuarios_role
        CHECK (role IN ('admin', 'usuario'))
);

CREATE TABLE empresas_clientes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    escritorio_id BIGINT NOT NULL,
    razao_social VARCHAR(200) NOT NULL,
    nome_fantasia VARCHAR(200),
    cnpj VARCHAR(14),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_empresas_escritorio
        FOREIGN KEY (escritorio_id)
        REFERENCES escritorios(id)
        ON DELETE RESTRICT,

    CONSTRAINT uq_empresas_escritorio_cnpj
        UNIQUE (escritorio_id, cnpj)
);

CREATE INDEX idx_usuarios_escritorio
    ON usuarios(escritorio_id);

CREATE INDEX idx_empresas_escritorio
    ON empresas_clientes(escritorio_id);


