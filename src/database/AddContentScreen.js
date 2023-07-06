import React, {useState, useEffect} from 'react';
import { View, TextInput, Button } from 'react-native';
import firebase from '../database/Firebase';
import Sqlite from '../database/Sqlite';

const db = new Sqlite();
let database;


export default function ContentScreeen({ navigation, route }) {
    const [ name, setName ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ img, setImg ] = useState('');

    useEffect(()=>{
        database = route.params.params[0];
    });
      

    const addContent = (()=>{
         //promisse
/*
         firebase.firestore().collection('contents').add(
           { name, desc, img }
        )
        .then(()=>{
           
            navigation.navigate('SecondScreen');
        })
        .catch((error) =>{
           
            alert('Erro ao apagar o documento',error);
        })
*/
        const data = {
            name: name,
            desc: desc,
            img: img,
        }
        db.save(data, database);
        navigation.navigate('SecondScreen');

    })
    
    
    return (
        <View>
            <TextInput placeholder='Nome' value={name}
                onChangeText = {texto => setName(texto)}/>
            <TextInput placeholder='Descrição' value={desc}
                onChangeText = {texto => setDesc(texto)}/>
            <TextInput placeholder='Caminho da Imagem' value={img}
                onChangeText = {texto => setImg(texto)}/>
            
            <Button
                color="#3f68d1"
                title="Salvar"
                onPress={addContent}/>
        </View>
    )
}