import Storage from './Storage/Storage'
import { CONNECTION_TYPES, DATABASE_CONNECTION} from './Config/database-configuration'

var Service = {}

if(CONNECTION_TYPES.LOCAL === DATABASE_CONNECTION) {
    Service = {
        saveEntry: async (entry) => {
            return await Storage.saveEntry(entry)
        },

        findEntry: async () => {
            return await Storage.findEntry()
        }
        
        // const setInitialized = async () => {
        // 	await AsyncStorage.setItem('openingBalance', 'true')
        // }
        
        // const cleanInitialized = async () => {
        // 	await AsyncStorage.removeItem('openingBalance')
        // }
    
    }
}

    
export default Service