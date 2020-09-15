// import firebase from './Firebase'
import Sqlite from './Sqlite'
import {CONNECTION_TYPES, DATABASE_CONNECTION} from '../Config/database-configuration'

// else if(DATABASE_CONNECTION == CONNECTION_TYPES.CLOUD) {
//     updateContentDB = (id,data, database) => {
//         firebase.firestore().collection('contents').doc(id).set(
//             {
//                 name: data.name,
//                 desc: data.desc,
//                 img: data.img
//             }
//         )
//         .then(()=>{
//             console.log("documento atualizado com sucesso ", id);
//         })
//         .catch((error) =>{
//             console.log("Erro ao atualizar o documento ", id, error);
//             Alert.alert('Não foi possível atualizar o documento','',[{text:'OK'}]);
//         })
//     }

//     deleteContentDB = (id, database) => {
//         firebase.firestore().collection('contents').doc(id).delete()
//         .then(()=>{
// 			console.log("documento apagado com sucesso ", id);
//         })
//         .catch((error) =>{
// 			console.log("Erro ao apagar o documento ", id, error);
// 			Alert.alert('Não foi possível apagar o documento','',[{text:'OK'}]);
//         })
//     }

//     findContentList = async () => {
//         try {
//             return new Promise(async function (resolve, reject) {
//                 firebase.firestore().collection('contents').onSnapshot(async (query) => {
//                     const list = await contentUpdate(query)
//                     const data = {database: firebase, list: list}
//                     resolve(data)
//                 })
//             })
//         } catch(e) {
//             console.error(e)
//             throw e
//         }
//     }

//     saveContentDB = (data, database) => {
//         firebase.firestore().collection('contents').add(
//             {
//               name:data.name,
//               desc:data.desc,
//               img:data.img,
//             }
//         )
//         .then(()=>{
//             console.log("Salvou");
//         })
//         .catch((error)=>{
//             console.log("Erro ao salvar o conteudo", error);
//             Alert.alert('Não foi possível salvar o documento','',[{text:'OK'}]);      
//         })
//     }
    
// }

// function contentUpdate(query) {
//     const contents = [];
//     query.forEach((doc) => {
//         const { name, desc, img } = doc.data();
//         contents.push({
//             id: doc.id,
//             name,
//             desc,
//             img
//         }) 
//     })
//     return contents
// }

autoAuthenticate = (mail, password) => {
    firebase.auth().signInWithEmailAndPassword(mail, password)
    .then(user => {
        console.log("usuario logado ", user)
    })
    .catch(error => {
        console.log("erro ", error)
    })
    .finally(() => {
        console.log("terminou")
    })
}

authenticate = (mail, password, navigation) => {
    firebase.auth().signInWithEmailAndPassword(mail, password)
    .then(user => {
        console.log("usuario logado ", user);
        navigation.navigate('ContentScreen');
        Alert.alert('Usuário logado com sucesso','',[{text:'OK'}]);
    })
    .catch(error => {
        console.log("erro ", error)
        //if (error.code === 'auth/user-not-found')
    })
    .finally(() => {
        console.log("terminou")
    })
}

export let updateContentDB
export let deleteContentDB
export let findContentList
export let saveContentDB

export let autoAuthenticate
export let authenticate
export let testar