import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native'; 
import firebase from '../database/Firebase'

import { MarginView } from "../styles/styles";



export default function ContentScreen({ navigation, route }) {
  const [ id, setId ] = useState(route.params.params[0]);
  const [ name, setName ] = useState(route.params.params[1]);
  const [ desc, setDesc ] = useState(route.params.params[2]);
  const [ img, setImg ] = useState(route.params.params[3]);
 

  const updateContent = (() =>{
    firebase.firestore().collection('contents').doc(id).set(
      {
        name, desc, img
      }
    )
    .then(()=>{
      console.log("documento atualizado com sucesso ", id);
      navigation.navigate('SecondScreen');
    })
    .catch((error) =>{
      console.log("Erro ao atualizar o documento ", id, error);
      Alert.alert('Não foi possível atualizar o documento','',[{text:'OK'}]);
    })
  })

  const deleteContent = (()=>{ 
    firebase.firestore().collection('contents').doc(id).delete()
    .then(()=>{
      console.log("documento apagado com sucesso ", id);
      navigation.navigate('SecondScreen');
    })
    .catch((error) =>{
      console.log("Erro ao apagar o documento ", id, error);
      Alert.alert('Não foi possível apagar o documento','',[{text:'OK'}]);
    })
 
  })


    return (
      <View>
        <TextInput value={name}
        onChangeText = {(texto) => setName(texto)}/>
        <TextInput value={desc}
        onChangeText = {(texto) => setDesc(texto)}/>
        <TextInput value={img}
        onChangeText = {(texto) => setImg(texto)}/>
      
      <MarginView>
        <Button 
                   color="#4473ba" 
                   title="Salvar" 
                   onPress={updateContent}/>
      </MarginView>
      <MarginView>           
        <Button 
                   color="#4473ba" 
                   title="Apagar" 
                   onPress={deleteContent}/>
      </MarginView>  
      </View>
    )  
}

