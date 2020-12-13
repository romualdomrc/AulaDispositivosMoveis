--linha 10, mudei order para order_category, pois order e _order são palavras reservadas no postgres

CREATE TABLE category(
	id serial NOT NULL,
	name text,
	color TEXT DEFAULT '#fff',
	isInit INTEGER DEFAULT 0,
	isCredit INTEGER DEFAULT 0,
	isDebit INTEGER DEFAULT 0,
	order_category INTEGER DEFAULT 0,
	CONSTRAINT pk_category PRIMARY KEY (id)
);

CREATE TABLE entry(
	id serial NOT NULL,
	amount INTEGER,
	description TEXT,
	entryAt DATE,
	latitude INTEGER,
    longitude INTEGER,
	address TEXT,
    photo TEXT,
    isInit INTEGER,
    id_category INTEGER,
	CONSTRAINT pk_entry PRIMARY KEY (id),
	CONSTRAINT fk_entry_category FOREIGN KEY (id_category) REFERENCES category (id)
);