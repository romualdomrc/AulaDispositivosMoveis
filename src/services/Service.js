import Storage from './Storage/Storage'
import { CONNECTION_TYPES, DATABASE_CONNECTION} from './Config/database-configuration'

var Service = {}

if(CONNECTION_TYPES.LOCAL === DATABASE_CONNECTION) {
    Service = {
        //ENTRIES----------------------------------------------------------------------------------------
        getEntries: async (days, category) => {
            return await Storage.getEntries(days, category)
        },

        saveEntry: async (value, entry = {}) => {
            return await Storage.saveEntry(value, entry = {})
        },

        deleteEntry: async (entry) => {
            return await Storage.findEntry(entry)
        },

        //CATEGORIES----------------------------------------------------------------------------------------
        setDefaultCategories: async () => {
            return await Storage.setDefaultCategories()
        },

        getDefaultCategories: async () => {
            return await Storage.getDefaultCategories()
        },

        getDebitCategories: async () => {
            return Service.getDebitCategories()
        },

        getCreditCategories: async () => {
            return Service.getCreditCategories()
        },

        getAllCategories: async () => {
            return Service.getAllCategories()
        },

        getInitCategories: async () => {
            return Service.getInitCategories()
        }

        //CATEGORIES----------------------------------------------------------------------------------------
    }
}
    
export default Service