import { StyleSheet, Text, View,Image,TouchableOpacity,Modal,TextInput } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pending from './Pending';
import Completed from './Completed';
import Icon from '../../Assets/Icons/Icon';
import Color from '../../Assets/Color';
import { useState } from 'react';
import responsive from '../../Helper.js/Responsive';
export default function Dashboard() {
     const [modalVisible, setModalVisible] = useState(false);
    const Tab = createMaterialTopTabNavigator()
  return (
    <>
    <View style={styles.main}>
    <View style={styles.Header}>
    <Text style={styles.headerText}>To-Do Daily</Text>
    <TouchableOpacity style={styles.Search}  onPress={() => setModalVisible(true)}>
    <Image source={Icon.Search}/>
    </TouchableOpacity>
    </View>
    </View>
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.title}>Add To-Do Task</Text>
                <View style={styles.descriptionconatiner}>
                  <TextInput
                    style={styles.input}
                    placeholder="Write Description"
                    multiline
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.cancelButton}>
                    <Text style={styles.Text1}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}>
                    <Text style={styles.Text}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
   <Tab.Navigator
    screenOptions={{
    tabBarStyle: styles.tabBar,
    tabBarLabelStyle: styles.tabLabel,
    tabBarIndicatorStyle: styles.tabIndicator,
   }}>
    <Tab.Screen name='Pending' component={Pending}/>
    <Tab.Screen name='Completed' component={Completed}/>
   </Tab.Navigator>

   </>
  )
}

const styles = StyleSheet.create({
    Header:{
        marginTop:responsive.margin(55),
        //alignItems:'center',
        marginLeft:responsive.margin(100),
        marginBottom:responsive.margin(3),
        flexDirection:'row',
        justifyContent:'space-around',
       
       
    },
    main:{
       backgroundColor: Color.primaryColor,
    },
    headerText:{
        fontSize:22,
        fontWeight:'bold',
       // position:'static',
        textAlign:'center',
        color:Color.white,
        
    },
    Search:{
        left:responsive.margin(30),
    },
    tabBar: {
        backgroundColor: Color.primaryColor,
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
       // height: 100, 
        justifyContent: 'flex-end', 
      },
    tabLabel: {
        fontSize: 18,
        color: Color.white,
         fontWeight:'600'
      },
      tabIndicator: {
        backgroundColor: Color.white,
        height: 3,
      },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        width: 400,
        //height: 300,
        flex:0.8,
        backgroundColor: Color.white,
        borderRadius: 10,
        alignItems: 'center',
      },
})