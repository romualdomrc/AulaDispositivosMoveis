export const SCRIPTS_SQLITE = {
    CATEGORY: `CREATE TABLE IF NOT EXISTS 
            category (
                id INTEGER primary key,
                name TEXT,
                color TEXT default #fff,
                isInit INTEGER  default 0,
                isCredit INTEGER  default 0,
                isDebit INTEGER  default 0,
                order INTEGER  default 0
            )`,
    
    ENTRY: `CREATE TABLE IF NOT EXISTS 
            entry (
                id INTEGER primary key,
                amount INTEGER ,
                description TEXT,
                entryAt date,
                latitude INTEGER ,
                longitude INTEGER ,
                address TEXT,
                photo TEXT,
                isInit INTEGER ,
                id_category INTEGER,
                FOREIGN KEY (id_category) REFERENCES category(id)
            )`
}
