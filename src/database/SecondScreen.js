import React, { useState, useEffect }  from 'react';
import { Text, TouchableOpacity } from 'react-native';
import firebase from '../database/Firebase';
import { VieW, Fab, TexT } from '../styles/styles';
import Sqlite from '../database/Sqlite';


const db = new Sqlite();
let database;

export default function SecondScreen({ navigation }) {
  const [ contents, setContents ] = useState([]); 
/*
  const onContentUpdate = (querySnapshot) => {
    let contents = [];
    querySnapshot.forEach((doc)=>{
      //destructing
      const { name, desc, img } = doc.data();
      contents.push({
        name, desc, img, id: doc.id

      })
    });
    setContents(contents);
  }
*/

  const onContentUpdate = (database) => {
    console.log('contentUpdate');
    let contents = [];

    db.listContents(database).then((data) => {
        console.log("data ", data);
        contents = data;
        setContents(contents);
    }).catch((err) => {
        console.log(err);
    })
}


  useEffect(()=>{
  //  firebase.firestore().collection('contents').onSnapshot(onContentUpdate);
  database = db.initDB();
  onContentUpdate(database);
  });

  const onPress =(() => {
       alert('clicou');
  })  

  const renderContent=(()=>{
    return(
      contents.map((content, index) =>{
        return ( 
            <TouchableOpacity onPress={
              ()=>navigation.navigate('ContentScreen',
              {params: [content.id, content.name, content.desc,
              content.img]})
            }>
            <Text>{content.name}</Text>
            </TouchableOpacity>
        )
      })
    );
  })
  

  return (
    <VieW>
      { renderContent() }
      <Fab onPress={
              ()=>navigation.navigate('AddContentScreen', {params: [database]})}>
              <TexT>+</TexT>
      </Fab>
    </VieW>
  );
}