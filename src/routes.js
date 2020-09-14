import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import Loading from './pages/Loading'
import Main from './pages/Main'
import NewEntry from './pages/NewEntry'
import Reports from './pages/Reports'
import Welcome from './pages/Welcome'

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
                <AppStack.Screen name="Welcome" component={Welcome} />
                <AppStack.Screen name="Loading" component={Loading} />
                <AppStack.Screen name="Main" component={Main} />
                <AppStack.Screen name="NewEntry" component={NewEntry} />
                <AppStack.Screen name="Reports" component={Reports} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}