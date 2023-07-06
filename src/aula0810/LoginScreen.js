import React, { useState } from 'react';
import { TextInput, View, Button, ActivityIndicator } from 'react-native';
import firebase from '../database/Firebase';

export default function LoginScreen({ navigation }) {
  const [ mail, onChangeMail ] = useState('');
  const [ password, onChangePassword ] = useState('');
  const [ loading, onLoading ] = useState(false);
 
  const renderButton=(()=>{
    if (!loading) {
      return (
        <Button
        color="#3f68d1"
        title="Entrar"
        onPress={tryLogin}/>
      )
    } else {
      return (<ActivityIndicator/>)
    }   
  })

  const tryLogin =(() => {
 //   alert(mail);
 //   alert(password);
      onLoading(true);
//promisse
      firebase.auth().signInWithEmailAndPassword(mail, password)
      .then(user => {
        alert('Usuário logado com sucesso');
        navigation.navigate('SecondScreen');
      })
      .catch(error => {
//        alert(error);
//        alert(error.code);
        if (error.code === 'auth/user-not-found') {
          onLoading(true);
          firebase.auth().createUserWithEmailAndPassword(mail, password)
          .then(user => {
            alert('Usuário cadastrado com sucesso');
            navigation.navigate('SecondScreen');
          })
          .catch(error =>{
            alert('Não foi possível cadastrar o usuário');
            alert(error);
          })
          .finally(()=>onLoading(false));
        } else {
          alert(error);
        }
      })
      .finally(()=>onLoading(false));

});


  return (
    <View>
        <TextInput placeholder="user@email.com"
        onChangeText = {texto => onChangeMail(texto)}
        />
        <TextInput placeholder="******"
        secureTextEntry
        onChangeText = {texto => onChangePassword(texto)}
        />
        { renderButton() }
       
    </View>
  );

}