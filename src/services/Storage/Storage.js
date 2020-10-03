import AsyncStorage from '@react-native-community/async-storage'
import EntryListItem from '../../components/EntryList/EntryListItem'
import _ from 'lodash';
import moment from 'moment'

//Esses comandos limpam o storage
//const keys = await AsyncStorage.getAllKeys()
// await AsyncStorage.multiRemove(keys)

export default Storage = {
	//ENTRIES----------------------------------------------------------------------------------------

	getEntries: async (days, category) => {
		// const keys = await AsyncStorage.getAllKeys()
		// await AsyncStorage.multiRemove(keys)

		var entries = JSON.parse(await AsyncStorage.getItem('entries'))

		if (days > 0) {
			const date = moment().subtract(days, 'days').toDate()

			entries = entries?.filter(entry => new Date(entry.entryAt) >= date)
		}

		if (category && category.id && category.id !== 666) {
			entries = entries?.filter(entry => entry.category.id === category.id)
		}

		entries = entries?.sort((e1, e2) => new Date(e2.entryAt) - new Date(e1.entryAt))

		return entries
	},

	getAllEntries: async () => {
		var entries = JSON.parse(await AsyncStorage.getItem('entries'))

		entries = entries?.sort((e1, e2) => new Date(e2.entryAt) - new Date(e1.entryAt))
		return entries
	},

	saveEntry: async (value, entry) => {
		let dadoTratado = {
			id: value?.id || entry?.id,
			amount: value?.amount || entry?.amount || 0,
			entryAt: value?.entryAt || entry?.entryAt || new Date(),
			description: value?.category?.name,
			photo: value?.photo,
			address: value?.address,
			latitude: value?.latitude,
			longitude: value?.longitude,
			isInit: value?.isInit || false,
			category: value?.category || entry?.category
		}

		let data = await AsyncStorage.getItem('entries')

		let listaEntries = JSON.parse(data) || []

		listaEntries?.push(dadoTratado)

		await AsyncStorage.setItem('entries', JSON.stringify(listaEntries))
		return listaEntries
	},

	deleteEntry: async (delEntry) => {
		var entries = JSON.parse(await AsyncStorage.getItem('entries'))
		entries = entries?.filter(entry => JSON.stringify(entry) !== JSON.stringify(delEntry))

		await AsyncStorage.setItem('entries', JSON.stringify(entries))

		return entries
	},

	//CATEGORIES----------------------------------------------------------------------------------------

	setDefaultCategories: async () => {
		AsyncStorage.setItem('categories', JSON.stringify([
			{
				id: 666,
				name: 'Todas Categorias',
				color: '#ecf0f1',
				isDebit: false,
				isCredit: false,
				isInit: false,
			},
			{
				id: 1,
				name: 'Alimentação',
				color: '#1abc9c',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 2,
				name: 'Restaurantes e Bares',
				color: '#2ecc71',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 3,
				name: 'Casa',
				color: '#3498db',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 4,
				name: 'Compras',
				color: '#9b59b6',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 5,
				name: 'Cuidados Pessoais',
				color: '#f1c40f',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 6,
				name: 'Dívidas e Empréstimos',
				color: '#f39c12',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 7,
				name: 'Educação',
				color: '#e67e22',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 8,
				name: 'Família e Filhos',
				color: '#d35400',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 9,
				name: 'Impostos e Taxas',
				color: '#e74c3c',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 10,
				name: 'Investimentos',
				color: '#c0392b',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 11,
				name: 'Lazer',
				color: '#ecf0f1',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 12,
				name: 'Mercado',
				color: '#bdc3c7',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
			{
				id: 13,
				name: 'Outras Despesas',
				color: '#95a5a6',
				isDebit: true,
				isCredit: false,
				isInit: false,
			},
		
			{
				id: 14,
				name: 'Empréstimos',
				color: '#273c75',
				isDebit: false,
				isCredit: true,
				isInit: false,
			},
			{
				id: 15,
				name: 'Investimentos',
				color: '#4cd137',
				isDebit: false,
				isCredit: true,
				isInit: false,
			},
			{
				id: 16,
				name: 'Salário',
				color: '#487eb0',
				isDebit: false,
				isCredit: true,
				isInit: false,
			},
			{
				id: 17,
				name: 'Outras Receitas',
				color: '#8c7ae6',
				isDebit: false,
				isCredit: true,
				isInit: false,
			},
			{
				id: 18,
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
	},

	//BALANCE----------------------------------------------------------------------------------------

	getBalance: async (untilDays) => {
		var entries = JSON.parse(await AsyncStorage.getItem('entries'))
          
		if (untilDays > 0) {
			const date = moment().subtract(untilDays, 'days').toDate()
		
			entries = entries?.filter(entry => new Date(entry.entryAt) < date)
		}
		let resultado = entries?.reduce( ( soma, { amount } ) => soma+amount,0)

		return Number((resultado).toFixed(2))
	},

	getBalanceSumByDate: async (days) => {
		const startBalance = await Storage.getBalance(days) || 0
		var entries = JSON.parse(await AsyncStorage.getItem('entries'))

		if (days > 0) {
			const date = moment().subtract(days, 'days').toDate()

			entries = entries?.filter(entry => new Date(entry.entryAt) >= date)
		}

		entries = entries?.sort((e1, e2) => new Date(e2.entryAt) - new Date(e1.entryAt))

		entries = _(entries)
			.groupBy(({entryAt}) => moment(entryAt).format('YYYYMMDD'))
			.map(entry => _.sumBy(entry, 'amount'))
			.map((amount, index, collection) => {
			return (
				(index === 0 ? startBalance : 0) +
				_.sum(_.slice(collection, 0, index)) +
				amount
			)
			})

		return entries

	},

	getBalanceSumByCategory: async (days, showOthers) => {
		var entries = JSON.parse(await AsyncStorage.getItem('entries'))

		if (days > 0) {
			const date = moment().subtract(days, 'days').toDate()

			entries = entries?.filter(entry => new Date(entry.entryAt) >= date)
		}

		entries = _(entries)
			.groupBy(({category: {id}}) => id)
			.map(entry => ({category: _.omit(entry[0].category, 'entries'), amount: Math.abs(_.sumBy(entry, 'amount'))}))
			.filter(({amount}) => amount > 0)
			.orderBy('amount', 'desc')

		const othersLimit = 5

		if (showOthers && _(entries).size() > othersLimit) {
			const data1 = _(entries).slice(0, othersLimit)
			const data2 = [
				{
					category: {id: JSON.parse(await AsyncStorage.getItem('categories')).sort((e1, e2) => e2.id - e1.id)[0].id, name: 'Outros', color: Colors.metal},
					amount: _(entries)
						.slice(othersLimit)
						.map(({amount}) => amount)
						.sum(),
				}
			]
		
			entries = [...data1, ...data2]
		}
		
		return entries
	}
}



