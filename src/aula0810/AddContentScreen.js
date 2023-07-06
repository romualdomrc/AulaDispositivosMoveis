import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native'; 
import firebase from '../database/Firebase'

import { MarginView } from "../styles/styles";



export default function ContentScreen({ navigation, route }) {
  const [ name, setName ] = useState('');
  const [ desc, setDesc ] = useState('');
  const [ img, setImg ] = useState('');
 
  const saveContent = (() =>{
    firebase.firestore().collection('contents').add(
      {
        name, desc, img
      }
    )
    .then(()=>{
      console.log("Salvou");
      navigation.navigate("SecondScreen");
    })
    .catch((error)=>{
      console.log("Erro ao salvar o conteudo", error);
      Alert.alert('Não foi possível salvar o documento','',[{text:'OK'}]);      
    })
  })  


    return (
      <View>
        <TextInput placeholder='Nome'
        onChangeText = {(texto) => setName(texto)}/>
        <TextInput placeholder='Descrição'
        onChangeText = {(texto) => setDesc(texto)}/>
        <TextInput placeholder='Caminho da Imagem'
        onChangeText = {(texto) => setImg(texto)}/>
      
      <MarginView>
        <Button 
                   color="#4473ba" 
                   title="Salvar" 
                   onPress={saveContent}/>
      </MarginView>
      </View>
    )  
}


