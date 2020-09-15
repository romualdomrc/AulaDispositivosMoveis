import {useEffect, useState} from 'react'
import Service from '../services/Service'

const useCategories = () => {
	const [debitCategories, setDebitCategories] = useState([])
	const [creditCategories, setCreditCategories] = useState([])
	const [allCategories, setAllCategories] = useState([])
	const [initCategories, setInitCategories] = useState([])

	useEffect(() => {
		const loadDebitCategories = async () => {
			const data = await Service.getDebitCategories()
			setDebitCategories(data)
		}

		const loadCreditCategories = async () => {
			const data = await Service.getCreditCategories()
			setCreditCategories(data)
		}

		const loadAllCategories = async () => {
			const data = await Service.getAllCategories()
			setAllCategories(data)
		}

		const loadInitCategory = async () => {
			const data = await Service.getInitCategories()
			setInitCategories(data)
		}

		loadDebitCategories()
		loadCreditCategories()
		loadAllCategories()
		loadInitCategory()
	}, [])

	return [debitCategories, creditCategories, allCategories, initCategories]
}

export default useCategories
