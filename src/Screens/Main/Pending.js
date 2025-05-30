import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ImageComponent,
} from 'react-native';
import React, {useState} from 'react';
import Color from '../../Assets/Color';
import responsive from '../../Helper.js/Responsive';
import {Picker} from '@react-native-picker/picker';
import Icon from '../../Assets/Icons/Icon';

import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  markASCompleted,
  editTask,
  deleteTask,
} from '../../Redux/taskSlice';
export default function Pending() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.taskList);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const handleSubmit = () => {
    if (isEditing) {
      dispatch(
        editTask({
          id: editingId,
          title,
          description,
          selectedCategory,
        }),
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newService = {
        id: Date.now().toString(),
        title,
        description,
        selectedCategory,
      };
      dispatch(addTask(newService));
    }
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setSelectedCategory('');
  };
  const handelComplete = id => {
    dispatch(markASCompleted(id));
  };
  const handleDelete = id => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteTask(id)),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.listContainer}>
      <View>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.selectedCategory}>{item.selectedCategory}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.selectedCategory}>Date:{formattedDate}</Text>
          <TouchableOpacity onPress={() => handelComplete(item.id)}>
            <Text style={styles.Completed}>Mark as Completed</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            setTitle(item.title);
            setDescription(item.description);
            setSelectedCategory(item.selectedCategory);
            setEditingId(item.id);
            setIsEditing(true);
            setModalVisible(true);
          }}>
          <Image source={Icon.Edit} style={styles.Edit} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Image source={Icon.Trash} style={styles.trash} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.main}>
      <View style={{marginTop: 40}}>
        
        <FlatList
          bounces={false}
          data={tasks.filter(t => !t.Completed)}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 100}}
        />

        <View>
          
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
                    onValueChange={itemValue => setSelectedCategory(itemValue)}>
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
                  style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
            style={styles.add}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.white,
    flex: 1,
  },
  ImageComponent:{
    marginHorizontal:10,
  },
  Image:{
    resizeMode:'contain',
    height:24,
    width:40,
  },
  listContainer: {
    //borderWidth:1,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 8,
    backgroundColor: Color.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: responsive.fontSize(16),
    fontWeight: '700',
    color: Color.black,
    margin: 5,
  },
  description: {
    fontSize: responsive.fontSize(15),
    margin: 5,
    color: Color.greyText,
    fontWeight: '400',
  },
  selectedCategory: {
    fontSize: responsive.fontSize(15),
    margin: 5,
    color: Color.greyText,
    fontWeight: '400',
  },
  Edit: {
    resizeMode: 'contain',
    height: 24,
    width: 40,
  },
  trash: {
    resizeMode: 'contain',
    height: 24,
    width: 18,
  },
  Completed: {
    fontSize: responsive.fontSize(15),
    margin: 5,
    color: Color.primaryColor,
    fontWeight: 'bold',
    left: 60,
  },

  add: {
  position: 'absolute',
  bottom: responsive.height(80),  
  right: responsive.width(20),   
  width: responsive.width(70),
  height: responsive.height(70),
  borderRadius: responsive.height(60),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Color.primaryColor,
  zIndex: 10,
},
  addButton: {
    fontSize: responsive.fontSize(45),
    fontWeight: 'bold',
    color: Color.white,
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
    borderColor: Color.borderColor,
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
    borderColor: Color.borderColor,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: Color.tintColor,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: Color.primaryColor,
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
});