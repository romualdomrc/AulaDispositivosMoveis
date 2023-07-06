import React from 'react';
 
import LoginScreen from './src/pages/LoginScreen/LoginScreen';
import ContentScreen from './src/pages/ContentScreen/ContentScreen';
import SecondScreen from './src/pages/SecondScreen/SecondScreen';
import ContentDetailScreen from './src/pages/ContentDetailScreen/ContentDetailScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen name="ContentScreen" component={ContentScreen}
        options={{ 
          title: 'Conteúdo',
          headerStyle: {
            backgroundColor: '#3f68d1',
            borderBottomColor: '#fff',
            borderBottomWidth: 1
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30
        }, }}/> 
        <Stack.Screen name="LoginScreen" component={LoginScreen} 
          options={{ 
            title: 'My App',
            headerStyle: {
              backgroundColor: '#3f68d1',
              borderBottomColor: '#fff',
              borderBottomWidth: 1
            },
            headerTitleStyle: {
              color: '#fff',
              fontSize: 30
          }, }}/>
        <Stack.Screen name="SecondScreen" component={SecondScreen} options={{ 
            title: 'Adicionar',
            headerStyle: {
              backgroundColor: '#3f68d1',
              borderBottomColor: '#fff',
              borderBottomWidth: 1
            },
            headerTitleStyle: {
              color: '#fff',
              fontSize: 30
          }, }}/>
          <Stack.Screen name="ContentDetailScreen" component={ContentDetailScreen} options={{ 
            title: 'Editar',
            headerStyle: {
              backgroundColor: '#3f68d1',
              borderBottomColor: '#fff',
              borderBottomWidth: 1
            },
            headerTitleStyle: {
              color: '#fff',
              fontSize: 30
          }, }}/> 

      </Stack.Navigator>

    </NavigationContainer>
  );
}


