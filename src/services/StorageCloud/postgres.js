// const Pool = require('pg').Pool
import pg from 'pg'
const { POSTGRES_CONFIG } = require('../Config/database-configuration')

const pgPool = pg.Pool

const pool = new pgPool(POSTGRES_CONFIG)

module.exports = {
    pool
}