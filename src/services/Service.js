import Storage from './Storage/Storage'
import StorageCloud from './StorageCloud/StorageCloud'
import { CONNECTION_TYPES, DATABASE_CONNECTION} from './Config/database-configuration'

var Service = {}

if(CONNECTION_TYPES.LOCAL === DATABASE_CONNECTION) {
    Service = {
        //ENTRIES----------------------------------------------------------------------------------------

        getEntries: async (days, category) => {
            return await Storage.getEntries(days, category)
        },

        getAllEntries: async () => {
            return await Storage.getAllEntries()
        },

        saveEntry: async (value, entry = {}) => {
            return await Storage.saveEntry(value, entry = {})
        },

        deleteEntry: async (entry) => {
            return await Storage.deleteEntry(entry)
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
} else {
    Service = {
        //ENTRIES----------------------------------------------------------------------------------------

        getEntries: async (days, category) => {
            return await StorageCloud.getEntries(days, category)
        },

        getAllEntries: async () => {
            return await StorageCloud.getAllEntries()
        },

        saveEntry: async (value, entry = {}) => {
            return await StorageCloud.saveEntry(value, entry = {})
        },

        deleteEntry: async (entry) => {
            return await StorageCloud.deleteEntry(entry)
        },

        //CATEGORIES----------------------------------------------------------------------------------------

        setDefaultCategories: async () => {
            return await StorageCloud.setDefaultCategories()
        },

        getDefaultCategories: async () => {
            return await StorageCloud.getDefaultCategories()
        },

        getDebitCategories: async () => {
            return StorageCloud.getDebitCategories()
        },

        getCreditCategories: async () => {
            return StorageCloud.getCreditCategories()
        },

        getAllCategories: async () => {
            return StorageCloud.getAllCategories()
        },

        getInitCategories: async () => {
            return StorageCloud.getInitCategories()
        },

        //BALANCE----------------------------------------------------------------------------------------

        getBalance: async (untilDays = 0) => {
            return StorageCloud.getBalance(untilDays)
        },

        getBalanceSumByDate: async (days) => {
            return StorageCloud.getBalanceSumByDate(days)
        },

        getBalanceSumByCategory: (days, showOthers = true) => {
            return StorageCloud.getBalanceSumByCategory(days, showOthers)
        }
    }
}
    
export default Service