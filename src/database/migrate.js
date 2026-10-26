
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { pool } from './pool.js';

const diretorioAtual = path.dirname(fileURLToPath(import.meta.url));
const diretorioMigrations = path.join(
  diretorioAtual,
  'migrations'
);

async function executarMigrations() {
  const cliente = await pool.connect();

  try {
    await cliente.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        nome_arquivo TEXT NOT NULL UNIQUE,
        aplicada_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const arquivos = (await readdir(diretorioMigrations))
      .filter((arquivo) => /^\d+_.+\.sql$/.test(arquivo))
      .sort();

    for (const arquivo of arquivos) {
      const jaAplicada = await cliente.query(
        'SELECT 1 FROM schema_migrations WHERE nome_arquivo = $1',
        [arquivo]
      );

      if (jaAplicada.rowCount > 0) {
        console.log(`Ja aplicada: ${arquivo}`);
        continue;
      }

      const caminhoArquivo = path.join(
        diretorioMigrations,
        arquivo
      );

      const sql = await readFile(caminhoArquivo, 'utf8');

      await cliente.query('BEGIN');

      try {
        await cliente.query(sql);

        await cliente.query(
          'INSERT INTO schema_migrations (nome_arquivo) VALUES ($1)',
          [arquivo]
        );

        await cliente.query('COMMIT');

        console.log(`Migration aplicada: ${arquivo}`);
      } catch (erro) {
        await cliente.query('ROLLBACK');
        throw erro;
      }
    }

    console.log('Processo de migrations concluido.');
  } finally {
    cliente.release();
    await pool.end();
  }
}

executarMigrations().catch((erro) => {
  console.error('Falha ao executar migrations:', erro.message);
  process.exitCode = 1;
});
