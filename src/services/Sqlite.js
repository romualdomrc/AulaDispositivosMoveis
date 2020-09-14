import * as SQLite from "expo-sqlite"
import {SCRIPTS_SQLITE} from './create-table-scripts'

const database_name = "ReactNative.db"
const database_version = "1.0"
const database_displayname = "SQLite React Offline Database"
const database_size = 200000

export default class Sqlite {
    initDB() {
        const db = SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
        )
        
        // db.transaction(tx => {
        //     tx.executeSql(SCRIPTS_SQLITE.CATEGORY)
        // })
        // db.transaction(tx => {
        //     tx.executeSql(SCRIPTS_SQLITE.CATEGORY)
        // })

        
        return db
    }


    closeDatabase(db) {
        if (db) {
            console.log("Closing DB")
            db.close()
        }  
    }

    // listContents(db) {
    //     return new Promise((resolve)=> {

    //         const contents = []

    //         db.transaction((tx) => {
    //           tx.executeSql('SELECT c.id, c.name, c.img, c.desc FROM Content c',[],
    //             (_, { rows }) => {
    //             // console.log("Retornou corretamente", rows)
                
    //             var len = rows.length
    //             for (let i = 0; i < len; i++) {
    //               let row = rows.item(i)
    //             //   console.log(`Content ID: ${row.id}, Content Name: ${row.name}`)
                  
    //               const { id, name, img, desc } = row
                  
    //               contents.push({
    //                 id,
    //                 name,
    //                 img,
    //                 desc
    //               })
    //             }

    //             // console.log(contents)

    //             resolve(contents)
    //           })
    //         })
    //     })
    // }

    // addContent(content, db) {  
    //     db.transaction(tx => {
    //         tx.executeSql('INSERT INTO Content VALUES (null, ?, ?, ?)', 
    //         [content.name, content.desc, content.img],
    //         ()=>{console.log("sucesso")},
    //         ()=>{console.log("erro", content)})
    //     })  
    // }

    // updateContent(id, content, db) {
    //     db.transaction(tx => {
    //         tx.executeSql('UPDATE Content SET name = ?, desc = ?, img = ? WHERE id = ?', 
    //         [content.name, content.desc, content.img, id],
    //         ()=>{console.log("sucesso")},
    //         ()=>{console.log("erro", content)})
    //     }) 
    // }

    // deleteContent(id, db) {
    //     db.transaction(tx => {
    //         tx.executeSql('DELETE FROM Content WHERE id = ?', 
    //         [id],
    //         ()=>{console.log("sucesso")},
    //         ()=>{console.log("erro", content)})
    //     }) 
    // }

    async testar(database) {
        console.log('aqui o endereco')
        let teste = await database.transaction(tx => {
            tx.executeSql(`Select * from category (1,'dasd', #fff, 0, 0, 0, 0)`,
            ()=>{console.log("sucesso")},
            ()=>{console.log("erro", content)})
        })

        console.log(teste)
        // let teste = await database.transaction(tx => {
        //     tx.executeSql(`SELECT * FROM category`,
        //     ()=>{console.log("sucesso")},
        //     ()=>{console.log("erro", content)})
        // })
    }

}