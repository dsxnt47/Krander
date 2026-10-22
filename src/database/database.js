import { pool } from './pool.js'

export async function verificarConexao(){
    const resultado = await pool.query(
        'SELECT current_database() AS banco, current_user AS usuarios'
    )

    return resultado.rows[0]
}