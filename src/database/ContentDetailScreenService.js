import firebase from './Firebase'
import Sqlite from './Sqlite'
import {CONNECTION_TYPES, DATABASE_CONNECTION} from './database-configuration'

const db = new Sqlite();

export const updateContentDB = (id,data, database) => {
    if(DATABASE_CONNECTION == CONNECTION_TYPES.LOCAL) {
        db.updateContent(id, data, database)
    }
    else if(DATABASE_CONNECTION == CONNECTION_TYPES.CLOUD) {
        firebase.firestore().collection('contents').doc(id).set(
            {
				name: data.name,
				desc: data.desc,
				img: data.img
            }
        )
		.then(()=>{
			console.log("documento atualizado com sucesso ", id);
		})
		.catch((error) =>{
			console.log("Erro ao atualizar o documento ", id, error);
			Alert.alert('Não foi possível atualizar o documento','',[{text:'OK'}]);
		})
    }
}

export const deleteContentDB = (id, database) => {
    if(DATABASE_CONNECTION == CONNECTION_TYPES.LOCAL) {
        db.deleteContent(id, database)
    }
    else if(DATABASE_CONNECTION == CONNECTION_TYPES.CLOUD) {
        firebase.firestore().collection('contents').doc(id).delete()
        .then(()=>{
			console.log("documento apagado com sucesso ", id);
        })
        .catch((error) =>{
			console.log("Erro ao apagar o documento ", id, error);
			Alert.alert('Não foi possível apagar o documento','',[{text:'OK'}]);
        })
    }
}