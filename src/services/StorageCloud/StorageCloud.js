import _ from 'lodash';
import moment from 'moment'
import { pool } from './postgres'

export default Storage = {
	//ENTRIES----------------------------------------------------------------------------------------

	getEntries: async (days, category) => {
        const response = await pool.query(`
            SELECT * from entry
        `)

        var entries = response.rows

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
		const response = await pool.query(`
            SELECT * from entry
        `)

        var entries = response.rows

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

		await pool.query(`
            INSERT INTO entry
            VALUES (${dadoTratado.id}, ${dadoTratado.amount}, '${dadoTratado.entryAt}', 
                '${dadoTratado.description}, '${dadoTratado.photo}', '${dadoTratado.address}', 
                ${dadoTratado.latitude}, ${dadoTratado.longitude}, ${dadoTratado.isInit}, 
                ${dadoTratado.category})
        `)

        var allEntries = await getAllEntries()

        return allEntries
	},

	deleteEntry: async (delEntry) => {
        await pool.query(`
            DELETE FROM entry 
            WHERE id = ${delEntry.id}
        `)

        var allEntries = await getAllEntries()

        return allEntries
	},

	//CATEGORIES----------------------------------------------------------------------------------------

	setDefaultCategories: async () => {console.log()},
		
	getDefaultCategories: async () => {
        const response = await pool.query(`
            SELECT * from category
        `)

        return response.rows
    },

	getDebitCategories: async () => {
        const response = await pool.query(`
            SELECT * FROM category 
            WHERE isCredit AND NOT isInit
        `)

        return response.rows
	},

	getCreditCategories: async () => {
		const response = await pool.query(`
            SELECT * FROM category 
            WHERE isCredit AND NOT isInit
        `)

        return response.rows
	},

	getAllCategories: async () => {
        const response = await pool.query(`
            SELECT * from category
        `)

        return response.rows
    },

	getInitCategories: async () => {
		const response = await pool.query(`
            SELECT * FROM category 
            WHERE isInit
        `)

        return response.rows
    },
    
	//BALANCE----------------------------------------------------------------------------------------

	getBalance: async (untilDays) => {
		var entries = await getAllEntries()
          
		if (untilDays > 0) {
			const date = moment().subtract(untilDays, 'days').toDate()
		
			entries = entries?.filter(entry => new Date(entry.entryAt) < date)
		}
		let resultado = entries?.reduce( ( soma, { amount } ) => soma+amount,0)

		return Number((resultado)?.toFixed(2))
	},

	getBalanceSumByDate: async (days) => {
		const startBalance = await Storage.getBalance(days) || 0
		var entries = await getAllEntries()

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
		var entries = await getAllEntries()

		if (days > 0) {
			const date = moment().subtract(days, 'days').toDate()

			entries = entries?.filter(entry => new Date(entry.entryAt) >= date)
		}

		entries = _(entries)
			.groupBy(({category: {id}}) => id)
			.map(entry => (
				{	
					entryAt: entry[0].entryAt,
					category: _.omit(entry[0].category, 'entries'),
					amount: Math.abs(_.sumBy(entry, 'amount'))
				}
			))
			.filter(({amount}) => amount > 0)
			.orderBy('amount', 'desc')

        var allCategories = await getAllCategories()
        
		const othersLimit = 5

		if (showOthers && _(entries).size() > othersLimit) {
			const data1 = _(entries).slice(0, othersLimit)
			const data2 = [
				{
					category: {id: allCategories.sort((e1, e2) => e2.id - e1.id)[0].id, name: 'Outros', color: Colors.metal},
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



