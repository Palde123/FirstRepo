import {createSlice} from '@reduxjs/toolkit';
import Completed from '../Screens/Main/Completed';

const initialState = {
  taskList: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.taskList.push({...action.payload, Completed: false});
    },
    markASCompleted: (state, action) => {
      const index = state.taskList.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        state.taskList[index].Completed = true;
      }
    },
    editTask: (state, action) => {
      const {id, title, description, selectedCategory} = action.payload;
      const index = state.taskList.findIndex(task => task.id === id);
      if (index !== -1) {
        state.taskList[index] = {
          ...state.taskList[index],
          title,
          description,
          selectedCategory,
        };
      }
    },
    deleteTask: (state, action) => {
      const idToDelete = action.payload;
      state.taskList = state.taskList.filter(task => task.id !== idToDelete);
    },
  },
});

export const {addTask, markASCompleted, editTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
