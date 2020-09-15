import { useEffect, useState } from 'react'

import Service from '../services/Service'

const useEntries = (days = 7, category) => {
	const [entries, setEntries] = useState([])

	useEffect(() => {
		const loadEntries = async () => {
			const data = await Service.getEntries(days, category)
			setEntries(data)
		}
		loadEntries()
	}, [days, category])

	return [entries, Service.saveEntry, Service.deleteEntry]
}

export default useEntries
