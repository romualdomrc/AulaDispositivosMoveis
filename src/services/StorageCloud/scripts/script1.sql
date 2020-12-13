--linha 11, mudei order para order_category, 
--pois order e _order são palavras reservadas no postgres, e ele me bloqueou de criar, diferente do name, etc, que deixou.

CREATE TABLE category(
	id INTEGER NOT NULL,
	name TEXT,
	color TEXT DEFAULT '#fff',
	isDebit BOOLEAN DEFAULT false,
	isCredit BOOLEAN DEFAULT false,
	isInit BOOLEAN DEFAULT false,
	order_category INTEGER DEFAULT 0,
	CONSTRAINT pk_category PRIMARY KEY (id)
);

CREATE TABLE entry(
	id INTEGER NOT NULL,
	amount INTEGER,
	description TEXT,
	entryAt DATE,
	latitude INTEGER,
    longitude INTEGER,
	address TEXT,
    photo TEXT,
    isInit BOOLEAN,
    id_category INTEGER,
	CONSTRAINT pk_entry PRIMARY KEY (id),
	CONSTRAINT fk_entry_category FOREIGN KEY (id_category) REFERENCES category (id)
);

INSERT INTO category 
VALUES (666, 'Todas Categorias', '#ecf0f1', false, false, false),
(1, 'Alimentação', '#1abc9c', true, false, false),
(2, 'Restaurantes e Bares', '#2ecc71', true, false, false),
(3, 'Restaurantes e Bares', '#2ecc71', true, false, false),
(4, 'Compras', '#9b59b6', true, false, false),
(5, 'Cuidados Pessoais', '#f1c4falsef', true, false, false),
(6, 'Dívidas e Empréstimos', '#f39c12', true, false, false),
(7, 'Educação', '#e67e22', true, false, false),
(8, 'Família e Filhos', '#d35400', true, false, false),
(9, 'Impostos e Taxas', '#e74c3c', true, false, false),
(10, 'Investimentos', '#c0392b', true, false, false),
(11, 'Lazer', '#ecf0f1', true, false, false),
(12, 'Mercado', '#bdc3c7', true, false, false),
(13, 'Outras Despesas', '#95a5a6', true, false, false),
(14, 'Empréstimos', '#273c75', false, true, false),
(15, 'Investimentos', '#4cd137', false, true, false),
(16, 'Salário', '#487eb0', false, true, false),
(17, 'Outras Receitas', '#8c7ae6', false, true, false),
(18, 'Saldo Inicial', '#27ae60', false, false, true);