import pg from 'pg';

import { env }  from '../config/env.js'

const { Pool } = pg;

export const pool = new Pool({
    host: env.database.host,
    port: env.database.port,
    user: env.database.user,
    password: env.database.password,
    database: env.database.name,


    max: 10,
    idleTimeoutMillis:30_000,
    connectionTimeoutMillis: 5_000,
})