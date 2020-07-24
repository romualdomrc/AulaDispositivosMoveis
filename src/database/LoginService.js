import firebase from './Firebase'

export const autoAuthenticate = (mail, password) => {
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

export const authenticate = (mail, password, navigation) => {
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