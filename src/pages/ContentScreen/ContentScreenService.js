import firebase from '../../database/Firebase'
import Sqlite from '../../database/Sqlite'
import {CONNECTION_TYPES, DATABASE_CONNECTION} from '../../database/database-configuration'

const db = new Sqlite();
let database;

export const findContentList = async () => {
    if(DATABASE_CONNECTION == CONNECTION_TYPES.LOCAL) {
        database = await db.initDB();
        const list = await db.listContents(database)
        const data = {database: database, list: list}
        return data
    }
    else if(DATABASE_CONNECTION == CONNECTION_TYPES.CLOUD) {
        
        const prom =  new Promise(async function (resolve, reject) {
            firebase.firestore().collection('contents').onSnapshot(async (query) => {
                const list = contentUpdate(query)
                const data = {database: firebase, list: list}
                resolve(data)
            })
        })
        
        return prom.then(dat => dat)
    }
}

function contentUpdate(query){
    const contents = [];
    query.forEach((doc) => {
        const { name, desc, img } = doc.data();
        contents.push({
            id: doc.id,
            name,
            desc,
            img
        }) 
    })
    return contents
}