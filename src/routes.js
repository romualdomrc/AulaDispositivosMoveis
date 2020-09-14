import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import Loading from './pages/Loading'
import Welcome from './pages/Welcome'
import Main from './pages/Main'
import NewEntry from './pages/NewEntry'
import Reports from './pages/Reports'

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Loading">
                <AppStack.Screen name="Loading" component={Loading} />
                <AppStack.Screen name="Welcome" component={Welcome} />
                <AppStack.Screen name="Main" component={Main} />
                <AppStack.Screen name="NewEntry" component={NewEntry} initialParams={{
                    entry: {
                        id: null,
                        amount: 0,
                        entryAt: new Date(),
                        photo: null,
                        address: null,
                        latitude: null,
                        longitude: null,
                        category: {id: null, name: 'Selecione'},
                    }
                }}/>
                <AppStack.Screen name="Reports" component={Reports} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}