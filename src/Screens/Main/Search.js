import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  Alert,
  Modal,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../Assets/Icons/Icon';
import Color from '../../Assets/Color';
import responsive from '../../Helper.js/Responsive';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {selectFilteredTasks} from '../../Redux/Selector/taskSelectors';
import {
  revertTask,
  deleteTask,
  markASCompleted,
  editTask,
  addTask,
} from '../../Redux/taskSlice';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.taskList);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const filteredSelector = useMemo(
    () => selectFilteredTasks(searchText),
    [searchText],
  );
  const filteredTasks = useSelector(filteredSelector);
  const handleClearSearch = () => {
    setSearchText('');
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const handleRevert = id => {
    Alert.alert(
      'Revert Task',
      'Do you want to move this task back to pending?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Revert',
          onPress: () => dispatch(revertTask(id)),
          style: 'default',
        },
      ],
      {cancelable: true},
    );
  };

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
  const renderItem = ({item}) => {
    const isCompleted = item.Completed;

    return (
      <View
        style={[
          styles.listContainer,
          isCompleted ? styles.completedContainer : styles.pendingContainer,
        ]}>
        <View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.selectedCategory}>{item.selectedCategory}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.selectedCategory}>Date: {formattedDate}</Text>
            {isCompleted ? (
              <Text style={styles.completedText}>Completed</Text>
            ) : (
              <TouchableOpacity onPress={() => handelComplete(item.id)}>
                <Text style={styles.Completed}>Mark as Completed</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          {!isCompleted && (
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
          )}
          {isCompleted ? (
            <TouchableOpacity onPress={() => handleRevert(item.id)}>
              <Image source={Icon.revert} style={styles.trash} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Image source={Icon.Trash} style={styles.trash} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Icon.BackArrow} style={styles.iconButton} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Image source={Icon.Search} style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Search here"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Image source={Icon.SearchCancel} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchText.length > 0 && (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
          
              <Text style={styles.noResults}>No matching tasks found.</Text>
              
  
          }
        />
      )}
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    paddingTop: 70,
    paddingHorizontal: 15,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: Color.black,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Color.grey,
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 55,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: Color.tintColor,
    resizeMode: 'contain',
  },
  clearIcon: {
    width: 18,
    height: 18,
    tintColor: Color.tintColor,
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Color.black,
  },
  listContainer: {
    marginTop: 20,
    //marginHorizontal: 20,
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
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    color: Color.greyText,
    fontSize: 16,
  },
  completedContainer: {
    backgroundColor: Color.greenBackground,
    //borderColor: '#c3e6cb',
  },

  pendingContainer: {
    backgroundColor: Color.grey,
  },

  completedText: {
    fontSize: responsive.fontSize(15),
    margin: 5,
    color: Color.green,
    fontWeight: 'bold',
    textAlign: 'right',
    left: 135,
  },

  Completed: {
    fontSize: responsive.fontSize(15),
    margin: 5,
    color: Color.primaryColor,
    fontWeight: 'bold',
    textAlign: 'right',
    left: 65,
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
      backgroundColor: Color.borderColor,
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
