import { createSlice } from "@reduxjs/toolkit";
import Completed from "../Screens/Main/Completed";

const initialState ={
    taskList:[],
};

const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        addTask :(state,action)=>{
            state.taskList.push({...action.payload,Completed:false});
        },
        markASCompleted:(state,action)=>{
            const index = state.taskList.findIndex(t =>t.id === action.payload);
            if(index !== -1){
                state.taskList[index].Completed = true;
            }
        },

    },
});

export const {addTask,markASCompleted} = taskSlice.actions;
export default taskSlice.reducer;