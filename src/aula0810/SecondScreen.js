import React, { useState, useEffect }  from 'react';
import { Text, TouchableOpacity } from 'react-native';
import firebase from '../database/Firebase';
import { VieW, Fab, TexT } from '../styles/styles';



export default function SecondScreen({ navigation }) {
  const [ contents, setContents ] = useState([]); 

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


  useEffect(()=>{
    firebase.firestore().collection('contents').onSnapshot(onContentUpdate);
  });

  const onPress =(() => {
       alert('clicou');
  })  

  const renderContent=(()=>{
    return(
      contents.map((content, index) =>{
        return (
            <TouchableOpacity onPress={
              () => navigation.navigate('ContentScreen'
              , { params: [content.id, content.name, content.desc, content.img]})
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

      <Fab onPress={() => navigation.navigate('AddContentScreen')}><TexT>+</TexT></Fab>
    </VieW>
  );
}