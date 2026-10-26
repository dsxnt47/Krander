import { pool } from '../../database/pool.js'

export async function listarEscritorios() {
    const resultado = await pool.query(`
        SELECT id, nome, criado_em
        FROM escritorios
        ORDER BY id ASC`
    )
    return resultado.rows
}


export async function criarEscritorios(nome){
    const resultado = await pool.query(`
        INSERT INTO escritorios (nome)
        VALUES ($1)
        RETURNING id, nome, criado_em`,
        [nome]
    )
    return resultado.rows[0]
}