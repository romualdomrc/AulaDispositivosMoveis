import AsyncStorage from '@react-native-community/async-storage'

export default Storage = {

	saveEntry: async (entry) => {
		const openingBalance = await AsyncStorage.setItem('entry', entry)
		return openingBalance !== null && openingBalance === 'true'
	},

	findEntry: async () => {
		const data = await AsyncStorage.getItem('entry')
		return JSON.parse(data)
	}
	
	// const setInitialized = async () => {
	// 	await AsyncStorage.setItem('openingBalance', 'true')
	// }
	
	// const cleanInitialized = async () => {
	// 	await AsyncStorage.removeItem('openingBalance')
	// }
  
}



