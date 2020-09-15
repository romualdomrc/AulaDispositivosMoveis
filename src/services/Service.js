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
            return Storage.getDebitCategories()
        },

        getCreditCategories: async () => {
            return Storage.getCreditCategories()
        },

        getAllCategories: async () => {
            return Storage.getAllCategories()
        },

        getInitCategories: async () => {
            return Storage.getInitCategories()
        },

        //BALANCE----------------------------------------------------------------------------------------

        getBalance: async (untilDays = 0) => {
            return Storage.getBalance(untilDays)
        },

        getBalanceSumByDate: async (days) => {
            return Storage.getBalanceSumByDate(days)
        },

        getBalanceSumByCategory: (days, showOthers = true) => {
            return Storage.getBalanceSumByCategory(days, showOthers)
        }
    }
}
    
export default Service