import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React from 'react'
import Routes from './Routes'
import { store } from './Redux/store'
import { Provider } from 'react-redux';
export default function App() {
  return(
    <Provider store={store}>
   <Routes/>
   </Provider>
  );
}

const styles = StyleSheet.create({})