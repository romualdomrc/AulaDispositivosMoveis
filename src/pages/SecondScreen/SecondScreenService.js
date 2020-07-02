import firebase from '../../database/Firebase'
import Sqlite from '../../database/Sqlite';
import {CONNECTION_TYPES, DATABASE_CONNECTION} from '../../database/database-configuration'

const db = new Sqlite();

export const saveContentDB = (data, database) => {
    if(DATABASE_CONNECTION == CONNECTION_TYPES.LOCAL) {
        db.addContent(data, database);
    }
    else if(DATABASE_CONNECTION == CONNECTION_TYPES.CLOUD) {
        firebase.firestore().collection('contents').add(
            {
              name:data.name,
              desc:data.desc,
              img:data.img,
            }
        )
        .then(()=>{
            console.log("Salvou");
            navigation.navigate("ContentScreen");
        })
        .catch((error)=>{
            console.log("Erro ao salvar o conteudo", error);
            Alert.alert('Não foi possível salvar o documento','',[{text:'OK'}]);      
        })
    }
}