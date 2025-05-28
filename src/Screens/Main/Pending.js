import { StyleSheet, Text, View,FlatList,Modal,TouchableOpacity,TextInput, Image } from 'react-native'
import React from 'react'
import Color from '../../Assets/Color'
import { useState } from 'react'
import responsive from '../../Helper.js/Responsive';
import { Picker } from '@react-native-picker/picker';
import Icon from '../../Assets/Icons/Icon';

export default function Pending() {
 const [modalVisible, setModalVisible] = useState(false);
 const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [task, setTask] = useState('');

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const handleSubmit = () => {
    console.log('Description:', selectedCategory);
    
    const newService = {id: task.length + 1, title, description,selectedCategory};
    setTask([...task, newService]);
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setSelectedCategory('');
  };

 const renderItem =({item})=>(
    <View style={styles.listContainer}>
        <View>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.selectedCategory}>{item.selectedCategory}</Text>
        <Text style={styles.selectedCategory}>Date:{formattedDate}</Text>
        </View>
        <View style={{
            flexDirection:'row'
        }}>
            <TouchableOpacity>
                <Image source={Icon.Edit} style={styles.Edit}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={Icon.Trash}/>
            </TouchableOpacity>
        </View>
    </View>
 )

  return (
    <View style={styles.main}>
        <View>
        <FlatList
        bounces={false}
        data={task}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        />

        </View>
      <View>
        <TouchableOpacity style={styles.add} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add To-Do Task</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Write Title"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Write Description"
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Work" value="work" />
                <Picker.Item label="Personal" value="personal" />
                <Picker.Item label="Shopping" value="shopping" />
                <Picker.Item label="Others" value="others" />
              </Picker>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
            backgroundColor:Color.white,
            flex:1
        },
        listContainer:{
            //borderWidth:1,
            marginTop:80,
            marginHorizontal:20,
            padding:14,
            borderRadius:8,
            backgroundColor:Color.grey,
            flexDirection:'row',
            justifyContent:'space-between'
            
        },
        titleText:{
            fontSize:responsive.fontSize(16),
            fontWeight:'700',
            color:Color.black,
            margin:5
        },
        description:{
            fontSize:responsive.fontSize(15),
            margin:5,
            color:Color.greyText,
            fontWeight:'400',

        },
        selectedCategory:{
            fontSize:responsive.fontSize(15),
            margin:5,
            color:Color.greyText,
            fontWeight:'400',
        },
        Edit:{
            resizeMode:'contain',
            height:22,
            width:40
        },

    add:{
        //borderWidth:1,
       position:'absolute',
       marginTop:responsive.height(400),
       left:responsive.width(300),
       width:responsive.width(70),
       height:responsive.height(70),
       borderRadius:responsive.height(60),
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:Color.primaryColor,
       zIndex:10,
    } ,
    addButton:{
        fontSize:responsive.fontSize(45),
        fontWeight:'bold',
        color:Color.white

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        width: 350,
        height: 400,
        backgroundColor: Color.white,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        margin: 20,
        backgroundColor: Color.white,
        borderRadius: 10,
        padding: 20,
        elevation: 5,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
      },
      inputContainer: {
        marginBottom: 20,
      },
      label: {
        marginBottom: 5,
        fontWeight: '600',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
      },
      descriptionInput: {
        height: 80,
        textAlignVertical: 'top',
      },
      pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
      },
      submitButton: {
        backgroundColor:Color.primaryColor,
        padding: 10,
        borderRadius: 5,
        flex: 1,
      },
      cancelText: {
        textAlign: 'center',
        fontWeight: '600',
      },
      submitText: {
        textAlign: 'center',
        color: Color.white,
        fontWeight: '600',
      },

})