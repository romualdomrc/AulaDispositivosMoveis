import AsyncStorage from '@react-native-community/async-storage'

export default Storage = {
	//ENTRIES----------------------------------------------------------------------------------------
	getEntries: async (days, category) => {
		const data = await AsyncStorage.getItem('entries')
		return JSON.parse(data)
	},

	saveEntry: async (value, entry = {}) => {

		let dadoTratado = {
			id: value.id || entry.id,
			amount: value.amount || entry.amount || 0,
			entryAt: value.entryAt || entry.entryAt || new Date(),
			description: value.category.name,
			photo: value.photo,
			address: value.address,
			latitude: value.latitude,
			longitude: value.longitude,
			isInit: value.isInit || false,
			category: value.category || entry.category
		}

		let data = await AsyncStorage.getItem('entries')

		let listaEntries = JSON.parse(data) || []

		listaEntries.push(dadoTratado)

		await AsyncStorage.setItem('entries', JSON.stringify(listaEntries))
		return listaEntries
	},

	deleteEntry: async (entry) => {
		const data = await AsyncStorage.getItem('entry')
		return JSON.parse(data)
	},

	//CATEGORIES----------------------------------------------------------------------------------------

	setDefaultCategories: async () => {
		AsyncStorage.setItem('categories', JSON.stringify([
			{
				id: 0,
				name: 'Alimentação',
				color: '#1abc9c',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 1,
				name: 'Restaurantes e Bares',
				color: '#2ecc71',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 2,
				name: 'Casa',
				color: '#3498db',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 3,
				name: 'Compras',
				color: '#9b59b6',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 4,
				name: 'Cuidados Pessoais',
				color: '#f1c40f',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 5,
				name: 'Dívidas e Empréstimos',
				color: '#f39c12',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 6,
				name: 'Educação',
				color: '#e67e22',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 7,
				name: 'Família e Filhos',
				color: '#d35400',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 8,
				name: 'Impostos e Taxas',
				color: '#e74c3c',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 9,
				name: 'Investimentos',
				color: '#c0392b',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 10,
				name: 'Lazer',
				color: '#ecf0f1',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 11,
				name: 'Mercado',
				color: '#bdc3c7',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 12,
				name: 'Outras Despesas',
				color: '#95a5a6',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
		
			{
				id: 13,
				name: 'Empréstimos',
				color: '#273c75',
				isDebit: false,
				isCredit: true,
				isInit: false,
			},
			{
				id: 14,
				name: 'Investimentos',
				color: '#4cd137',
				isDebit: false,
				isCredit: true,
				isInit: false,
			},
			{
				id: 15,
				name: 'Salário',
				color: '#487eb0',
				isDebit: false,
				isCredit: true,
				isInit: false,
			},
			{
				id: 16,
				name: 'Outras Receitas',
				color: '#8c7ae6',
				isDebit: false,
				isCredit: true,
				isInit: false,
			},
			{
				id: 17,
				name: 'Saldo Inicial',
				color: '#27ae60',
				isDebit: false,
				isCredit: false,
				isInit: true,
			},
		]))
	},

	getDefaultCategories: async () => JSON.parse(await AsyncStorage.getItem('categories')),

	getDebitCategories: async () => {
		const data = JSON.parse(await AsyncStorage.getItem('categories'))
		return data.filter(category => category.isDebit && !category.isInit)
	},

	getCreditCategories: async () => {
		const data = JSON.parse(await AsyncStorage.getItem('categories'))
		return data.filter(category => category.isCredit && !category.isInit)
	},

	getAllCategories: async () => JSON.parse(await AsyncStorage.getItem('categories')),

	getInitCategories: async () => {
		const data = JSON.parse(await AsyncStorage.getItem('categories'))
		return data.filter(category => category.isInit)
	}
	// const setInitialized = async () => {
	// 	await AsyncStorage.setItem('openingBalance', 'true')
	// }
	
	// const cleanInitialized = async () => {
	// 	await AsyncStorage.removeItem('openingBalance')
	// }
  
}



