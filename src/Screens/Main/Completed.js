import { StyleSheet, Text, View,FlatList ,TouchableOpacity,Image,Alert} from 'react-native'
import React from 'react'
import Color from '../../Assets/Color'
import { useSelector,useDispatch } from 'react-redux'
import Icon from '../../Assets/Icons/Icon'
import responsive from '../../Helper.js/Responsive'
import { deleteTask } from '../../Redux/taskSlice'
export default function Completed() {
  
 const dispatch = useDispatch();
  const tasks = useSelector(state =>state.tasks.taskList);
  const completedTasks = tasks.filter(t => t.Completed);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

   const handleDelete = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => dispatch(deleteTask(id)),
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };
   const renderItem =({item})=>(
      <View style={styles.listContainer}>
          <View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.selectedCategory}>{item.selectedCategory}</Text>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between'
          }}>
          <Text style={styles.selectedCategory}>Date:{formattedDate}</Text>
          
          <Text style={styles.Completed}>Completed</Text>
       
          </View>
          </View>
      
          <View style={{
              flexDirection:'row'
          }}>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Image source={Icon.Trash} style={styles.trash}/>
              </TouchableOpacity>
          </View>
         
      </View>
      
   )
  return (
    <View style={styles.main}>
      <View style={{marginTop:40}}>
     <FlatList
             bounces={false}
             data={completedTasks}
             keyExtractor={item => item.id.toString()}
             renderItem={renderItem}
             contentContainerStyle={{ paddingBottom: 100 }}
             />
        </View>
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
      marginTop:20,
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
      height:24,
      width:40
  },
  trash:{
    resizeMode:'contain',
      height:24,
      width:18
  },
  Completed:{
    fontSize:responsive.fontSize(15),
    margin:5,
    color:Color.green,
    fontWeight:'bold',
    left:115
  },
})