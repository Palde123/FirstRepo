import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './Screens/Main/Dashboard'
import Search from './Screens/Main/Search';
export default function Routes() {
const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='ToDo' component={Dashboard}
        options={{
            headerShown:false,
        }}
        />
        <Stack.Screen name='Search' component={Search}
          options={{
            headerShown:false,
        }}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

const styles = StyleSheet.create({})