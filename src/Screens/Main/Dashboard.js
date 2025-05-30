import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Pending from './Pending';
import Completed from './Completed';
import Icon from '../../Assets/Icons/Icon';
import Color from '../../Assets/Color';
import {useState} from 'react';
import responsive from '../../Helper.js/Responsive';
import { useNavigation } from '@react-navigation/native';
export default function Dashboard() {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  
  return (
    <>
      <View style={styles.main}>
        <View style={styles.Header}>
          <TouchableOpacity style={styles.ImageComponent}>
                      <Image source={Icon.Filter} style={styles.Image2}/>
                    </TouchableOpacity>
          <Text style={styles.headerText}>To-Do Daily</Text>
          <TouchableOpacity
            style={styles.Search}
            onPress={() => {
              navigation.navigate('Search')
            }}>
            <Image source={Icon.Search} style={styles.Image}/>
          </TouchableOpacity>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIndicatorStyle: styles.tabIndicator,
        }}>
        <Tab.Screen name="Pending" component={Pending} />
        <Tab.Screen name="Completed" component={Completed} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  Header: {
    marginTop: responsive.margin(55),
    //alignItems:'center',
    //marginLeft: responsive.margin(30),
    marginBottom: responsive.margin(3),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  main: {
    backgroundColor: Color.primaryColor,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    // position:'static',
    textAlign: 'center',
    color: Color.white,
  },
  Image:{
    resizeMode:'contain',
    height:24,
    width:40,  
  },
  Image2:{
    resizeMode:'contain',
    height:24,
    width:40,  
    tintColor:Color.white,
  },
  ImageComponent:{
    right:20,
  },
  Search: {
    left: responsive.margin(30),
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
    fontWeight: '600',
  },
  tabIndicator: {
    backgroundColor: Color.white,
    height: 4,
  },
  
  Text1: {
    fontWeight: 'bold',
  },
});