import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Color from '../../Assets/Color'

export default function Completed() {
  return (
    <View style={styles.main}>
      <Text>Completed</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:Color.white,
        flex:1
    }
})