export const CONNECTION_TYPES = {LOCAL: 'LOCAL', CLOUD: 'CLOUD'}
export const DATABASE_CONNECTION = CONNECTION_TYPES.LOCAL

export const POSTGRES_CONFIG = {
    user: 'oudywunabhbrhg',
    host: 'ec2-54-235-116-235.compute-1.amazonaws.com',
    database: 'dd4l43upfkkmd8',
    password: '4174a7c152fca9a148b52b03d30c3110028893705ab38346c1aa499e7a64c676',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000
}