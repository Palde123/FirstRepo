import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React from 'react'
import Routes from './Routes'
import { store,persistor } from './Redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
export default function App() {
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
   <Routes/>
   </PersistGate>
   </Provider>
  );
}

const styles = StyleSheet.create({})